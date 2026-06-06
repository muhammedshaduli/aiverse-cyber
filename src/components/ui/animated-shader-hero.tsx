import React, { useRef, useEffect } from 'react';

// Types for component props
interface HeroProps {
  theme?: "dark" | "light"; // Dynamic background support
  trustBadge?: {
    text: string;
    icons?: string[];
  };
  headline: {
    line1: string;
    line2: string;
  };
  subtitle: string;
  buttons?: {
    primary?: {
      text: string;
      onClick?: () => void;
    };
    secondary?: {
      text: string;
      onClick?: () => void;
    };
  };
  className?: string;
  children?: React.ReactNode;
}

// Reusable Shader Background Hook supporting dark and light themes
const useShaderBackground = (theme: "dark" | "light" = "dark") => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const pointersRef = useRef<PointerHandler | null>(null);

  // WebGL Renderer class
  class WebGLRenderer {
    private canvas: HTMLCanvasElement;
    private gl: WebGL2RenderingContext;
    private program: WebGLProgram | null = null;
    private vs: WebGLShader | null = null;
    private fs: WebGLShader | null = null;
    private buffer: WebGLBuffer | null = null;
    private scale: number;
    private shaderSource: string;
    private mouseMove = [0, 0];
    private mouseCoords = [0, 0];
    private pointerCoords = [0, 0];
    private nbrOfPointers = 0;

    private vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

    private vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

    constructor(canvas: HTMLCanvasElement, scale: number) {
      this.canvas = canvas;
      this.scale = scale;
      this.gl = canvas.getContext('webgl2')!;
      if (this.gl) {
        this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
      }
      this.shaderSource = getShaderSourceByTheme(theme);
    }

    updateShader(source: string) {
      this.reset();
      this.shaderSource = source;
      this.setup();
      this.init();
    }

    updateMove(deltas: number[]) {
      this.mouseMove = deltas;
    }

    updateMouse(coords: number[]) {
      this.mouseCoords = coords;
    }

    updatePointerCoords(coords: number[]) {
      this.pointerCoords = coords;
    }

    updatePointerCount(nbr: number) {
      this.nbrOfPointers = nbr;
    }

    updateScale(scale: number) {
      this.scale = scale;
      if (this.gl) {
        this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale);
      }
    }

    compile(shader: WebGLShader, source: string) {
      const gl = this.gl;
      if (!gl) return;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const error = gl.getShaderInfoLog(shader);
        console.error('Shader compilation error:', error);
      }
    }

    test(source: string) {
      const gl = this.gl;
      if (!gl) return "No WebGL context";
      let result = null;
      const shader = gl.createShader(gl.FRAGMENT_SHADER)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        result = gl.getShaderInfoLog(shader);
      }
      gl.deleteShader(shader);
      return result;
    }

    reset() {
      const gl = this.gl;
      if (!gl) return;
      if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
        if (this.vs) {
          gl.detachShader(this.program, this.vs);
          gl.deleteShader(this.vs);
        }
        if (this.fs) {
          gl.detachShader(this.program, this.fs);
          gl.deleteShader(this.fs);
        }
        gl.deleteProgram(this.program);
      }
    }

    setup() {
      const gl = this.gl;
      if (!gl) return;
      this.vs = gl.createShader(gl.VERTEX_SHADER)!;
      this.fs = gl.createShader(gl.FRAGMENT_SHADER)!;
      this.compile(this.vs, this.vertexSrc);
      this.compile(this.fs, this.shaderSource);
      this.program = gl.createProgram()!;
      gl.attachShader(this.program, this.vs);
      gl.attachShader(this.program, this.fs);
      gl.linkProgram(this.program);

      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(this.program));
      }
    }

    init() {
      const gl = this.gl;
      if (!gl) return;
      const program = this.program!;
      
      this.buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

      const position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      (program as any).resolution = gl.getUniformLocation(program, 'resolution');
      (program as any).time = gl.getUniformLocation(program, 'time');
      (program as any).move = gl.getUniformLocation(program, 'move');
      (program as any).touch = gl.getUniformLocation(program, 'touch');
      (program as any).pointerCount = gl.getUniformLocation(program, 'pointerCount');
      (program as any).pointers = gl.getUniformLocation(program, 'pointers');
    }

    render(now = 0) {
      const gl = this.gl;
      if (!gl) return;
      const program = this.program;
      
      if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;

      if (theme === "light") {
        gl.clearColor(0.97, 0.98, 1.0, 1.0); // Slate soft white background
      } else {
        gl.clearColor(0, 0, 0, 1);
      }
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      
      gl.uniform2f((program as any).resolution, this.canvas.width, this.canvas.height);
      gl.uniform1f((program as any).time, now * 1e-3);
      gl.uniform2f((program as any).move, this.mouseMove[0] || 0, this.mouseMove[1] || 0);
      gl.uniform2f((program as any).touch, this.mouseCoords[0] || 0, this.mouseCoords[1] || 0);
      gl.uniform1i((program as any).pointerCount, this.nbrOfPointers);
      gl.uniform2fv((program as any).pointers, this.pointerCoords);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
  }

  // Pointer Handler class with pointer support
  class PointerHandler {
    private scale: number;
    private active = false;
    private pointers = new Map<number, number[]>();
    private lastCoords = [0, 0];
    private moves = [0, 0];

    constructor(element: HTMLCanvasElement, scale: number) {
      this.scale = scale;
      
      const map = (element: HTMLCanvasElement, scaleVal: number, x: number, y: number) => 
        [x * scaleVal, element.height - y * scaleVal];

      element.addEventListener('pointerdown', (e) => {
        this.active = true;
        this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
      });

      const handlePointerUp = (e: PointerEvent) => {
        if (this.count === 1) {
          this.lastCoords = this.first;
        }
        this.pointers.delete(e.pointerId);
        this.active = this.pointers.size > 0;
      };

      element.addEventListener('pointerup', handlePointerUp);
      element.addEventListener('pointerleave', handlePointerUp);

      element.addEventListener('pointermove', (e) => {
        if (!this.active) return;
        this.lastCoords = [e.clientX, e.clientY];
        this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
        this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];
      });
    }

    getScale() {
      return this.scale;
    }

    updateScale(scaleVal: number) {
      this.scale = scaleVal;
    }

    get count() {
      return this.pointers.size;
    }

    get move() {
      return this.moves;
    }

    get coords() {
      return this.pointers.size > 0 
        ? Array.from(this.pointers.values()).flat() 
        : [0, 0];
    }

    get first() {
      return this.pointers.size > 0 
        ? (Array.from(this.pointers.values())[0] || this.lastCoords)
        : this.lastCoords;
    }
  }

  const resize = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    
    if (rendererRef.current) {
      rendererRef.current.updateScale(dpr);
    }
  };

  const loop = (now: number) => {
    if (!rendererRef.current || !pointersRef.current) return;
    
    rendererRef.current.updateMouse(pointersRef.current.first);
    rendererRef.current.updatePointerCount(pointersRef.current.count);
    rendererRef.current.updatePointerCoords(pointersRef.current.coords);
    rendererRef.current.updateMove(pointersRef.current.move);
    rendererRef.current.render(now);
    animationFrameRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    
    rendererRef.current = new WebGLRenderer(canvas, dpr);
    pointersRef.current = new PointerHandler(canvas, dpr);
    
    rendererRef.current.setup();
    rendererRef.current.init();
    
    resize();
    
    const currentShaderSource = getShaderSourceByTheme(theme);
    if (rendererRef.current.test(currentShaderSource) === null) {
      rendererRef.current.updateShader(currentShaderSource);
    }
    
    loop(0);
    
    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.reset();
      }
    };
  }, [theme]);

  return canvasRef;
};

// Returns fragment shader source with dynamic calculation for dark vs light color scheme
const getShaderSourceByTheme = (theme: "dark" | "light") => {
  const isLight = theme === "light";
  return `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}

float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float
  a=rnd(i),
  b=rnd(i+vec2(1,0)),
  c=rnd(i+vec2(0,1)),
  d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}

float clouds(vec2 p) {
	float d=1., t=.0;
	for (float i=.0; i<3.; i++) {
		float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
		t=mix(t,d,a);
		d=a;
		p*=2./(i+1.);
	}
	return t;
}

void main(void) {
	vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
	vec3 col=vec3(0);
	float bg=clouds(vec2(st.x+T*.5,-st.y));
	uv*=1.-.3*(sin(T*.2)*.5+.5);
	for (float i=1.; i<12.; i++) {
		uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
		vec2 p=uv;
		float d=length(p);
		col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
		float b=noise(i+p+bg*1.731);
		col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
		col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
	}
  ${isLight ? 'O=vec4(1.0 - col * 0.75, 1.0);' : 'O=vec4(col,1.0);'}
}`;
};

// Reusable Hero Component
const Hero: React.FC<HeroProps> = ({
  theme = "dark",
  trustBadge,
  headline,
  subtitle,
  buttons,
  className = "",
  children
}) => {
  const canvasRef = useShaderBackground(theme === "light" ? "light" : "dark");
  const isLight = theme === "light";

  return (
    <div className={`relative w-full min-h-[680px] lg:min-h-screen flex items-center justify-center overflow-hidden ${isLight ? 'bg-slate-50' : 'bg-black'} ${className}`}>
      <style>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover touch-none"
        style={{ background: isLight ? '#f8fafc' : '#000000' }}
      />
      
      {/* Hero Content Overlay */}
      <div className="relative z-10 w-full">
        {children ? (
          children
        ) : (
          <div className={`flex flex-col items-center justify-center ${isLight ? 'text-slate-900' : 'text-white'} px-4 py-20`}>
            {/* Trust Badge */}
            {trustBadge && (
              <div className="mb-8 animate-fade-in-down">
                <div className={`flex items-center gap-2 px-6 py-2.5 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider border transition-colors ${
                  isLight 
                    ? 'bg-blue-50/70 text-blue-800 border-blue-200/60' 
                    : 'bg-orange-500/10 text-orange-150 border-orange-300/20'
                }`}>
                  {trustBadge.icons && (
                    <div className="flex">
                      {trustBadge.icons.map((icon, index) => (
                        <span key={index} className={isLight ? 'text-blue-600 mr-1' : 'text-orange-300 mr-1'}>
                          {icon}
                        </span>
                      ))}
                    </div>
                  )}
                  <span>{trustBadge.text}</span>
                </div>
              </div>
            )}

            <div className="text-center space-y-6 max-w-5xl mx-auto px-4">
              {/* Main Heading with Animation */}
              <div className="space-y-3">
                <h1 className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] animate-fade-in-up animation-delay-200 ${
                  isLight 
                    ? 'bg-gradient-to-r from-blue-700 via-indigo-600 to-indigo-800 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent'
                }`}>
                  {headline.line1}
                </h1>
                <h2 className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] animate-fade-in-up animation-delay-400 ${
                  isLight 
                    ? 'bg-gradient-to-r from-indigo-700 via-sky-600 to-blue-800 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent'
                }`}>
                  {headline.line2}
                </h2>
              </div>
              
              {/* Subtitle with Animation */}
              <div className="max-w-3xl mx-auto animate-fade-in-up animation-delay-600">
                <p className={`text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-orange-100/90'
                }`}>
                  {subtitle}
                </p>
              </div>
              
              {/* CTA Buttons with Animation */}
              {buttons && (
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10 animate-fade-in-up animation-delay-800 w-full max-w-sm sm:max-w-none mx-auto">
                  {buttons.primary && (
                    <button 
                      onClick={buttons.primary.onClick}
                      className={`px-8 py-3.5 rounded-full font-bold text-sm tracking-tight transition-all duration-300 hover:scale-[1.03] shadow-lg cursor-pointer ${
                        isLight 
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/20' 
                          : 'bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-black shadow-orange-500/25'
                      }`}
                    >
                      {buttons.primary.text}
                    </button>
                  )}
                  {buttons.secondary && (
                    <button 
                      onClick={buttons.secondary.onClick}
                      className={`px-8 py-3.5 border rounded-full font-bold text-sm tracking-tight transition-all duration-300 hover:scale-[1.03] backdrop-blur-sm cursor-pointer ${
                        isLight 
                          ? 'bg-white/75 hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300' 
                          : 'bg-orange-500/10 hover:bg-orange-500/20 text-orange-100 border-orange-300/30 hover:border-orange-300/50'
                      }`}
                    >
                      {buttons.secondary.text}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;

import { useEffect, useRef, useState } from "react";
import { Cpu, GitMerge, Layers, ShieldCheck, Zap } from "lucide-react";

interface BrainNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  intensity: number;
}

export default function Ecosystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>("trust");
  const [ripplePulse, setRipplePulse] = useState(false);

  const productsList = [
    { id: "trust", label: "AiVerse Trust", desc: "Verifies the physical/digital authenticity of imagery, video streams, and facial structure mesh." },
    { id: "shield", label: "AiVerse Shield", desc: "Endpoint filters isolating malicious automated adversarial packets, ransomware, and injection protocols." },
    { id: "guardian", label: "AiVerse Guardian", desc: "Personal biometric sweep tracker protecting personal voice matching, likeness, and executive profiles." },
    { id: "watch", label: "AiVerse Watch", desc: "Tracks coordinate news amplification waves, isolating automated bot networks before virality." },
    { id: "verify", label: "AiVerse Verify", desc: "Cryptographic ledger records directly verifying RAW original cameras with decentralized stamps." },
    { id: "sentinel", label: "AiVerse Sentinel", desc: "Public sector mission intelligence tracking state-sponsored networks, deepfake campaigns, and election safety." },
  ];

  // Neural network simulation effect
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId: number;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        canvas.width = width;
        canvas.height = height;
      }
    });
    resizeObserver.observe(containerRef.current);

    // Initialize random nodes representation
    const nodes: BrainNode[] = [];
    const numNodes = 32;
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * 400,
        y: Math.random() * 300,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2 + 1.5,
        intensity: Math.random()
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw faint grid alignment lines
      ctx.strokeStyle = "rgba(37, 99, 235, 0.03)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw circular boundary limits
      ctx.strokeStyle = "rgba(37, 99, 235, 0.05)";
      ctx.beginPath();
      ctx.arc(cx, cy, 110, 0, Math.PI * 2);
      ctx.stroke();

      // Brain central node (AiVerse ONE Brain)
      const pulseSize = 14 + Math.sin(Date.now() / 400) * 1.5;
      const coreGlow = ctx.createRadialGradient(cx, cy, 2, cx, cy, pulseSize * 2.5);
      coreGlow.addColorStop(0, "rgba(37, 99, 235, 0.9)");
      coreGlow.addColorStop(0.4, "rgba(20, 184, 166, 0.3)");
      coreGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseSize * 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#2563eb";
      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.fill();

      // Draw central label text
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 11px Space Grotesk, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("AiVerse ONE", cx, cy - 22);
      ctx.font = "normal 8px Fira Code, monospace";
      ctx.fillStyle = "#10b981";
      ctx.fillText("NEURAL BRAIN ONLINE", cx, cy - 12);

      // Map nodes mapped in a radius around core
      nodes.forEach((node, index) => {
        // Move nodes inside container bounds
        node.x += node.vx;
        node.y += node.vy;

        // Keep inside canvas sphere orbit range
        const dx = node.x - cx;
        const dy = node.y - cy;
        const distance = Math.hypot(dx, dy);

        if (distance > 130) {
          // pull back gently
          node.vx -= dx * 0.0001;
          node.vy -= dy * 0.0001;
        }

        // Connect nodes to neighboring nodes
        nodes.forEach((otherNode, otherIndex) => {
          if (index === otherIndex) return;
          const odx = otherNode.x - node.x;
          const ody = otherNode.y - node.y;
          const odist = Math.hypot(odx, ody);

          if (odist < 75) {
            const alpha = (75 - odist) / 75 * 0.15;
            ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
          }
        });

        // Connect some nodes directly to Central Core
        if (index % 5 === 0) {
          ctx.strokeStyle = "rgba(20, 184, 166, 0.12)";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(cx, cy);
          ctx.stroke();

          // Flow pulses along connections back to core
          const progress = (Date.now() / 1500 + index) % 1;
          const px = node.x + (cx - node.x) * progress;
          const py = node.y + (cy - node.y) * progress;
          ctx.fillStyle = "#14b8a6";
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw node points
        ctx.fillStyle = index % 8 === 0 ? "#14b8a6" : "#2563eb";
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  const triggerRipples = (prodId: string) => {
    setSelectedProduct(prodId);
    setRipplePulse(true);
    setTimeout(() => setRipplePulse(false), 800);
  };

  return (
    <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-6 md:p-10 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          AIVERSE ONE SYSTEM TOPOLOGY
        </div>
        <h3 className="text-2xl md:text-3.5xl font-display font-semibold text-zinc-900 tracking-tight">
          Central AI Operating System
        </h3>
        <p className="text-zinc-500 text-sm max-w-2xl mx-auto">
          Every sub-module feeds raw telemetry back to the unified AiVerse ONE brain. Learn how all systems compile to form court-admissible trust data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left pane: Module trigger menus */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-[10px] tracking-widest font-mono text-zinc-400 font-bold uppercase mb-2">
            Integrated Solutions Platform
          </div>
          {productsList.map((prod) => {
            const isSelected = selectedProduct === prod.id;
            return (
              <button
                key={prod.id}
                onClick={() => triggerRipples(prod.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-3.5 ${
                  isSelected 
                    ? "bg-blue-600/5 border-blue-200 shadow-sm font-semibold text-zinc-900" 
                    : "bg-transparent border-transparent text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
                }`}
              >
                <div className={`mt-0.5 w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs ${isSelected ? "bg-blue-600 text-white shadow animate-pulse" : "bg-zinc-150 text-zinc-500"}`}>
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className={`text-sm ${isSelected ? "text-blue-900 font-bold" : "text-zinc-800 font-semibold"}`}>
                    {prod.label}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5 line-clamp-2">
                    {prod.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Center Canvas: Rotating Brain Net Node */}
        <div ref={containerRef} className="lg:col-span-8 h-[360px] md:h-[420px] bg-zinc-50 border rounded-2xl relative overflow-hidden flex flex-col justify-between p-5">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 border-b pb-2">
            <span>CORE: AIVERSE ONE NEURAL SYSTEM</span>
            <span className="text-emerald-500 font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 animate-pulse" /> Active Shield
            </span>
          </div>

          <canvas ref={canvasRef} className="absolute inset-0 block pointer-events-none" />

          {/* Trigger animated signal ripple visualization */}
          {ripplePulse && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-44 w-44 rounded-full border border-blue-500 animate-ping opacity-60 pointer-events-none" />
          )}

          <div className="mt-auto bg-white/85 backdrop-blur border rounded-xl p-4 text-xs max-w-lg mx-auto z-20 text-center shadow-md">
            <span className="block text-[10px] font-mono text-blue-600 font-bold uppercase mb-1">
              Currently Selected Node: {productsList.find(p => p.id === selectedProduct)?.label}
            </span>
            <p className="text-zinc-600 leading-relaxed">
              {productsList.find(p => p.id === selectedProduct)?.desc}
            </p>
          </div>
        </div>

      </div>

      {/* SECTION 15: RELATION FLOW DIAGRAM */}
      <div className="mt-14 pt-10 border-t border-zinc-100">
        <div className="text-center max-w-sm mx-auto mb-6 text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
          <GitMerge className="w-4 h-4" /> Relational Architecture Ecosystem
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center text-xs font-mono font-medium max-w-5xl mx-auto">
          <div className="bg-zinc-900 text-white rounded-xl py-3 px-5 border shadow-sm flex-1 min-w-[140px]">
            <span className="text-[10px] block opacity-40 text-zinc-300 uppercase">Organization Group</span>
            <strong>AiVerse by Shaduli</strong>
          </div>
          
          <div className="text-zinc-400 font-bold rotate-90 md:rotate-0">→</div>

          <div className="bg-blue-50 border border-blue-100 text-blue-900 rounded-xl py-3 px-5 flex-1 min-w-[140px]">
            <span className="text-[10px] block opacity-60 text-slate-600 uppercase">Core Platform</span>
            <strong>AiVerseOS</strong>
          </div>

          <div className="text-blue-550 font-bold rotate-90 md:rotate-0">→</div>

          <div className="bg-emerald-50 border border-emerald-100 text-emerald-900 rounded-xl py-3 px-5 flex-1 min-w-[140px]">
            <span className="text-[10px] block opacity-60 text-zinc-600 uppercase font-bold">Unifying Brain</span>
            <strong>AiVerse ONE</strong>
          </div>

          <div className="text-emerald-300 font-bold rotate-90 md:rotate-0">→</div>

          <div className="bg-white border rounded-xl py-3 px-5 flex-2 max-w-md text-zinc-600 font-bold font-sans">
            <div className="mb-1 text-[9px] font-mono text-zinc-400 uppercase">Deployable Verticals (SaaS Platform)</div>
            <div className="grid grid-cols-3 gap-1.5 text-[10px] font-semibold text-zinc-800">
              <span className="bg-zinc-100 px-1 py-0.5 rounded">Trust</span>
              <span className="bg-zinc-100 px-1 py-0.5 rounded">Shield</span>
              <span className="bg-zinc-100 px-1 py-0.5 rounded">Watch</span>
              <span className="bg-zinc-100 px-1 py-0.5 rounded">Verify</span>
              <span className="bg-zinc-100 px-1 py-0.5 rounded">Guardian</span>
              <span className="bg-zinc-100 px-1 py-0.5 rounded">Sentinel</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

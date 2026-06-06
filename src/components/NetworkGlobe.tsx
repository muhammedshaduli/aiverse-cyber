import { useEffect, useRef, useState } from "react";
import { Shield, CheckCircle, AlertTriangle, Cpu, Globe, Radio } from "lucide-react";

interface NodePoint {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  color: string;
  size: number;
  pulseSpeed: number;
  pulsePhase: number;
  label?: string;
  type?: "verified" | "threat" | "critical";
}

interface Connection {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
}

export default function NetworkGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeSignal, setActiveSignal] = useState<string>("Initializing Global Guardian Ledger...");
  
  // Custom floating badges overlay
  const [floatingBadges] = useState<{
    id: number;
    text: string;
    icon: any;
    color: string;
    top: string;
    left?: string;
    right?: string;
  }[]>([
    { id: 1, text: "AI Voice Verified", icon: CheckCircle, color: "text-emerald-700 bg-emerald-50 border-emerald-150", top: "12%", left: "10%" },
    { id: 2, text: "Deepfake Detected", icon: AlertTriangle, color: "text-rose-700 bg-rose-50 border-rose-150", top: "70%", left: "12%" },
    { id: 3, text: "Authentic Image Badge", icon: Shield, color: "text-blue-700 bg-blue-50 border-blue-150", top: "22%", right: "8%" },
    { id: 4, text: "Media Verification", icon: Cpu, color: "text-amber-700 bg-amber-50 border-amber-150", top: "65%", right: "12%" },
  ]);

  // Live telemetry feed
  useEffect(() => {
    const feeds = [
      "Securing communication channel on Node #892... SECURE",
      "Analyzing suspicious viral image metadata in Berlin-West... MANIPULATION DETECTED (94.2% AI)",
      "Syncing authenticity credentials for news wire Reuters... REAL TIME TRUST RECORDED",
      "Deepfake voice signal filtered and isolated from CEO call impersonation... THREAT MITIGATED",
      "Scanning X broadcast channel for election fraud deepfakes... SCAN COMPLETE",
      "Ecosystem integrity metric: 99.87% authenticated traffic worldwide."
    ];
    const interval = setInterval(() => {
      const randomFeed = feeds[Math.floor(Math.random() * feeds.length)];
      setActiveSignal(randomFeed);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;
    
    // Globe configuration
    let globeRadius = 180;
    let rotationX = 0.003;
    let rotationY = 0.005;
    let angleY = 0;
    let angleX = 0;
    
    // Node generator
    const nodes: NodePoint[] = [];
    const numNodes = 45;
    
    // Build sphere distribution of points
    for (let i = 0; i < numNodes; i++) {
      const phi = Math.acos(-1 + (2 * i) / numNodes);
      const theta = Math.sqrt(numNodes * Math.PI) * phi;
      
      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.sin(phi) * Math.sin(theta);
      const z = Math.cos(phi);
      
      let type: "verified" | "threat" | "critical" = "verified";
      let color = "#10b981"; // Emerald
      let label = "";
      
      if (i % 6 === 0) {
        type = "threat";
        color = "#f59e0b"; // Orange
        label = "Cyber Threat " + (100 + i);
      } else if (i % 11 === 0) {
        type = "critical";
        color = "#ef4444"; // Red
        label = "Deepfake Blocked";
      } else if (i % 5 === 0) {
        label = "Verified Sovereign Node";
      }

      nodes.push({
        x: x * globeRadius,
        y: y * globeRadius,
        z: z * globeRadius,
        baseX: x * globeRadius,
        baseY: y * globeRadius,
        baseZ: z * globeRadius,
        color,
        size: Math.random() * 3 + 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulsePhase: Math.random() * Math.PI,
        label,
        type
      });
    }

    // Build connections list
    const connections: Connection[] = [];
    for (let i = 0; i < nodes.length; i++) {
      // Connect to 2 nearest neighbors
      const neighbors = nodes
        .map((n, idx) => ({ idx, dist: Math.hypot(n.baseX - nodes[i].baseX, n.baseY - nodes[i].baseY, n.baseZ - nodes[i].baseZ) }))
        .filter(entry => entry.idx !== i)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 2);
        
      neighbors.forEach(n => {
        if (!connections.some(c => (c.fromIndex === i && c.toIndex === n.idx) || (c.fromIndex === n.idx && c.toIndex === i))) {
          connections.push({
            fromIndex: i,
            toIndex: n.idx,
            progress: Math.random(),
            speed: 0.005 + Math.random() * 0.008
          });
        }
      });
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        width = newWidth;
        height = newHeight;
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        // Dynamic radius
        globeRadius = Math.min(newWidth, newHeight) * 0.35;
        // Re-scale sphere mapping
        for (let i = 0; i < nodes.length; i++) {
          const phi = Math.acos(-1 + (2 * i) / numNodes);
          const theta = Math.sqrt(numNodes * Math.PI) * phi;
          const x = Math.sin(phi) * Math.cos(theta);
          const y = Math.sin(phi) * Math.sin(theta);
          const z = Math.cos(phi);
          
          nodes[i].baseX = x * globeRadius;
          nodes[i].baseY = y * globeRadius;
          nodes[i].baseZ = z * globeRadius;
        }
      }
    });

    resizeObserver.observe(containerRef.current);
    
    // Main render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height / 2;
      
      // Update cumulative active angles
      angleY += rotationY;
      angleX += rotationX;
      
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      
      // Rotate coordinates in 3D
      const rotatedNodes = nodes.map(node => {
        // Y-axis rotation
        let x1 = node.baseX * cosY - node.baseZ * sinY;
        let z1 = node.baseX * sinY + node.baseZ * cosY;
        
        // X-axis rotation
        let y2 = node.baseY * cosX - z1 * sinX;
        let z2 = node.baseY * sinX + z1 * cosX;
        
        return {
          ...node,
          x: x1,
          y: y2,
          z: z2
        };
      });

      // Draw faint background glow
      const radialGlow = ctx.createRadialGradient(cx, cy, globeRadius * 0.2, cx, cy, globeRadius * 1.5);
      radialGlow.addColorStop(0, "rgba(99, 102, 241, 0.05)");
      radialGlow.addColorStop(0.5, "rgba(20, 184, 166, 0.03)");
      radialGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Draw latitude/longitude grid wireframes on the sphere
      ctx.strokeStyle = "rgba(99, 102, 241, 0.08)";
      ctx.lineWidth = 1;
      
      // Horizontal circles (latitudes)
      for (let lat = -5; lat <= 5; lat++) {
        const h = (lat / 6) * globeRadius;
        const rad = Math.sqrt(globeRadius * globeRadius - h * h);
        
        ctx.beginPath();
        // project coordinates
        for (let a = 0; a <= Math.PI * 2; a += 0.1) {
          const rx = rad * Math.cos(a + angleY);
          const rz = rad * Math.sin(a + angleY);
          
          // Apply X-rotation to horizontal circles too
          const py = h * cosX - rz * sinX;
          const pz = h * sinX + rz * cosX;
          
          if (pz > -30) { // front-facing mostly
            if (a === 0) ctx.moveTo(cx + rx, cy + py);
            else ctx.lineTo(cx + rx, cy + py);
          }
        }
        ctx.stroke();
      }

      // Draw Connection lines with alpha gradient based on remote depth (Z)
      connections.forEach(conn => {
        const p1 = rotatedNodes[conn.fromIndex];
        const p2 = rotatedNodes[conn.toIndex];
        
        // Skip drawing if connection is totally on back side for visuals
        if (p1.z < -40 && p2.z < -40) return;
        
        // Calculate dynamic line style
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.min(1, Math.max(0.05, (avgZ + globeRadius) / (globeRadius * 2))) * 0.25;
        
        // Check threat connection
        let strokeColor = `rgba(99, 102, 241, ${alpha})`;
        if (p1.type === "critical" || p2.type === "critical") {
          strokeColor = `rgba(239, 68, 68, ${alpha})`;
        } else if (p1.type === "threat" || p2.type === "threat") {
          strokeColor = `rgba(245, 158, 11, ${alpha})`;
        }
        
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1 + (avgZ + globeRadius) / globeRadius;
        
        ctx.beginPath();
        ctx.moveTo(cx + p1.x, cy + p1.y);
        ctx.lineTo(cx + p2.x, cy + p2.y);
        ctx.stroke();

        // Draw flowing data packet signal along connections
        conn.progress += conn.speed;
        if (conn.progress > 1) conn.progress = 0;
        
        const signalX = p1.x + (p2.x - p1.x) * conn.progress;
        const signalY = p1.y + (p2.y - p1.y) * conn.progress;
        const signalZ = p1.z + (p2.z - p1.z) * conn.progress;
        
        if (signalZ > -20) {
          const packetSize = 2.5 + (signalZ + globeRadius) / globeRadius * 1.5;
          ctx.fillStyle = p1.type === "critical" ? "#ef4444" : (p1.type === "threat" ? "#f59e0b" : "#22d3ee");
          ctx.shadowBlur = 8;
          ctx.shadowColor = ctx.fillStyle as string;
          ctx.beginPath();
          ctx.arc(cx + signalX, cy + signalY, packetSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // Restore shadow
        }
      });

      // Draw Nodes
      rotatedNodes.forEach(node => {
        // Perspective sorting representation
        const scale = (node.z + globeRadius) / (globeRadius * 2);
        const radius = Math.max(0.8, node.size * (0.4 + scale * 0.9));
        
        // Depth-based transparency
        const alpha = Math.min(1, Math.max(0.1, scale));
        
        // Pulsing radius offset
        node.pulsePhase += node.pulseSpeed;
        const pulseRatio = 1 + Math.sin(node.pulsePhase) * 0.25;
        
        const px = cx + node.x;
        const py = cy + node.y;
        
        // Outer halo ring
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(px, py, radius * 2.2 * pulseRatio, 0, Math.PI * 2);
        ctx.stroke();

        // Fill inner point
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();

        // If highly interactive front node and has label, draw clean HUD text
        if (node.z > globeRadius * 0.45 && node.label) {
          ctx.fillStyle = "#1e293b";
          ctx.font = "normal 10px Fira Code, monospace";
          ctx.textAlign = "center";
          
          // Background box for clarity
          const txtWidth = ctx.measureText(node.label).width;
          ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
          ctx.fillRect(px - txtWidth/2 - 4, py - radius - 18, txtWidth + 8, 14);
          ctx.strokeStyle = "rgba(0, 0, 0, 0.05)";
          ctx.strokeRect(px - txtWidth/2 - 4, py - radius - 18, txtWidth + 8, 14);
          
          ctx.fillStyle = node.color === "#ef4444" ? "#ef4444" : "#475569";
          ctx.fillText(node.label, px, py - radius - 8);
          
          // Threat vector line
          ctx.beginPath();
          ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
          ctx.moveTo(px, py);
          ctx.lineTo(px, py - 6);
          ctx.stroke();
        }
      });

      // Radar sweep outer graphic ring
      ctx.strokeStyle = "rgba(20, 184, 166, 0.04)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius * 1.35, 0, Math.PI * 2);
      ctx.stroke();
      
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[500px] md:h-[600px] relative select-none">
      {/* Dynamic Earth System Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating Badges Overlay (Micro animations) */}
      {floatingBadges.map((badge) => {
        const Icon = badge.icon;
        return (
          <div
            key={badge.id}
            id={`badge-${badge.id}`}
            style={{ top: badge.top, left: badge.left, right: badge.right }}
            className={`absolute flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-sm text-xs font-medium glass-panel pulse-ring-slow transition-all duration-300 hidden md:flex`}
          >
            <Icon className="w-3.5 h-3.5 animate-pulse" />
            <span>{badge.text}</span>
          </div>
        );
      })}

      {/* Real-time Telemetry Bar HUD bottom offset */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/70 backdrop-blur-md rounded-xl p-3.5 border border-zinc-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
          <span className="font-mono tracking-wider font-semibold">LEDGER LIVE</span>
        </div>
        <div className="font-mono text-[11px] text-zinc-600 truncate flex-1 text-right max-w-2xl">
          {activeSignal}
        </div>
      </div>
    </div>
  );
}

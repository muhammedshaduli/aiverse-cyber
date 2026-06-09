import React, { useState, useEffect, useRef } from "react";
import { 
  ShieldCheck, Lock, Key, UserPlus, LogIn, ChevronRight, 
  HelpCircle, Sparkles, Fingerprint, Eye, EyeOff, CheckCircle2,
  AlertTriangle, ArrowLeft, RefreshCw, Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useFirebase } from "../context/FirebaseContext";

interface ModuleSecurityGatewayProps {
  sectionId: "mindsync" | "aiverse_one" | "admin" | "cyber_privacy" | "trust_scanner" | "social_fake";
  sectionTitle: string;
  onUnlock: () => void;
  onClose?: () => void;
}

export default function ModuleSecurityGateway({ 
  sectionId, 
  sectionTitle, 
  onUnlock, 
  onClose 
}: ModuleSecurityGatewayProps) {
  const { currentUser, userProfile, triggerGoogleLogin } = useFirebase();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Analyst");
  const [secureKey, setSecureKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const switchToModule = (targetSectionId: string) => {
    if (onClose) {
      onClose();
    }
    const eventMap: Record<string, string> = {
      mindsync: "openMindSync",
      aiverse_one: "openAiVerseOne",
      admin: "openAdminConsole",
      cyber_privacy: "openSovereignPortal",
      trust_scanner: "openScanWorkspace",
      social_fake: "openSocialFakeDetector",
    };
    const eventName = eventMap[targetSectionId];
    if (eventName) {
      window.dispatchEvent(new CustomEvent(eventName));
    }
  };

  // Canvas ref for the custom 3D model simulation
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, px: 0, py: 0, isDown: false });

  // Handle local storage session preservation
  useEffect(() => {
    const sessionKey = `sec_session_${sectionId}`;
    const token = localStorage.getItem(sessionKey);
    if (token) {
      // Auto unlock if session exists
      onUnlock();
    }
  }, [sectionId, onUnlock]);

  // Integrated API handles
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const endpoints = isRegister ? "/api/module-access/register" : "/api/module-access/login";
    const payload = isRegister 
      ? { email, password, name, role, sectionId, secureKey }
      : { email, password, sectionId };

    try {
      const response = await fetch(endpoints, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      setSuccessMessage(isRegister ? "Registration successful! Proceeding..." : "Access granted! Sockets configured.");
      
      // Persist modular session
      localStorage.setItem(`sec_session_${sectionId}`, data.token || `tok_sim_${Date.now()}`);
      if (data.user) {
        localStorage.setItem(`sec_user_${sectionId}`, JSON.stringify(data.user));
      }

      setTimeout(() => {
        setIsLoading(false);
        onUnlock();
      }, 1200);

    } catch (err: any) {
      console.error("Section Authorization error:", err);
      setErrorMessage(err.message || "Network exception during gateway validation.");
      setIsLoading(false);
    }
  };

  // Google Single-Sign-On sync option
  const handleGoogleSync = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await triggerGoogleLogin();
      // On success, sync with the backend
      const response = await fetch("/api/module-access/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: currentUser?.email || "auth_google@domain.com",
          name: currentUser?.displayName || "Verified Executive",
          role: "Organization Admin",
          sectionId,
          isGoogleLinked: true
        })
      });
      const data = await response.json();
      localStorage.setItem(`sec_session_${sectionId}`, data.token || `tok_g_${Date.now()}`);
      
      setSuccessMessage("Handshake completed with Google session.");
      setTimeout(() => {
        setIsLoading(false);
        onUnlock();
      }, 1000);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed sync. Registering local keys instead.");
      setIsLoading(false);
    }
  };

  // Setup custom 3D Math Model Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth || 400);
    let height = (canvas.height = canvas.offsetHeight || 400);
    let animateId: number;

    // Handles resizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = canvas.width = entry.contentRect.width || 400;
        height = canvas.height = entry.contentRect.height || 400;
      }
    });
    resizeObserver.observe(canvas);

    // Initial 3D Rotation coordinates mapping
    let angleX = 0.5;
    let angleY = 0.5;
    let rotSpeedX = 0.005;
    let rotSpeedY = 0.007;

    // Generate 3D point nodes depending on Section Theme
    interface Point3D {
      x: number;
      y: number;
      z: number;
      connections?: number[];
      color?: string;
    }

    const points: Point3D[] = [];
    const numPoints = sectionId === "mindsync" ? 90 : sectionId === "aiverse_one" ? 110 : 80;

    // Build unique geometric systems
    if (sectionId === "mindsync") {
      // 1. Brain Network model (Two lobes linked by nodes)
      for (let i = 0; i < numPoints; i++) {
        const isLeft = i < numPoints / 2;
        const centerX = isLeft ? -45 : 45;
        const radius = 50 + Math.random() * 30;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        points.push({
          x: centerX + radius * Math.sin(phi) * Math.cos(theta),
          y: radius * Math.sin(phi) * Math.sin(theta) * 0.8,
          z: radius * Math.cos(phi),
          color: isLeft ? "rgba(244, 63, 94, 0.75)" : "rgba(14, 165, 233, 0.75)"
        });
      }
    } else if (sectionId === "aiverse_one") {
      // 2. Multi-Agent shield (rotating layered sphere with outer shielding orbital)
      for (let i = 0; i < numPoints; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const radius = i > numPoints - 20 ? 110 : 70; // Outer rings vs core shield
        
        points.push({
          x: radius * Math.sin(phi) * Math.cos(theta),
          y: radius * Math.sin(phi) * Math.sin(theta),
          z: radius * Math.cos(phi),
          color: i > numPoints - 20 ? "rgba(6, 182, 212, 0.8)" : "rgba(59, 130, 246, 0.6)"
        });
      }
    } else if (sectionId === "admin") {
      // 3. Cryptographic block matrix (rotating 3D cube vertices)
      const size = 65;
      // Cube vertices
      const cubeVertices = [
        { x: -size, y: -size, z: -size },
        { x: size, y: -size, z: -size },
        { x: size, y: size, z: -size },
        { x: -size, y: size, z: -size },
        { x: -size, y: -size, z: size },
        { x: size, y: -size, z: size },
        { x: size, y: size, z: size },
        { x: -size, y: size, z: size },
      ];
      cubeVertices.forEach(v => points.push({ ...v, color: "rgba(99, 102, 241, 0.85)" }));

      // Add interior glowing block cluster
      for (let i = 0; i < 40; i++) {
        points.push({
          x: (Math.random() - 0.5) * size * 1.5,
          y: (Math.random() - 0.5) * size * 1.5,
          z: (Math.random() - 0.5) * size * 1.5,
          color: "rgba(249, 115, 22, 0.6)"
        });
      }
    } else if (sectionId === "cyber_privacy") {
      // 4. Concentric concentric orbits
      for (let r = 50; r <= 110; r += 30) {
        const dPoints = r === 50 ? 20 : r === 80 ? 30 : 40;
        for (let i = 0; i < dPoints; i++) {
          const theta = (i / dPoints) * Math.PI * 2;
          points.push({
            x: r * Math.cos(theta),
            y: r * Math.sin(theta) * 0.3, // flattened orbit
            z: Math.sin(theta) * 15 + (r === 80 ? 30 : r === 50 ? -30 : 0),
            color: r === 50 ? "rgba(59, 130, 246, 0.7)" : r === 80 ? "rgba(168, 85, 247, 0.7)" : "rgba(236, 72, 153, 0.7)"
          });
        }
      }
    } else {
      // 5. Helical vertical coordinates DNA (Trust & Fake detectors)
      for (let i = 0; i < 80; i++) {
        const theta = i * 0.25;
        const y = (i - 40) * 3;
        points.push({
          x: 60 * Math.sin(theta),
          y,
          z: 60 * Math.cos(theta),
          color: i % 2 === 0 ? "rgba(16, 185, 129, 0.8)" : "rgba(14, 165, 233, 0.8)"
        });
      }
    }

    // Dynamic rendering math loop
    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse drag rotation input
      if (mouseRef.current.isDown) {
        angleY += (mouseRef.current.x - mouseRef.current.px) * 0.01;
        angleX += (mouseRef.current.y - mouseRef.current.py) * 0.01;
      } else {
        angleY += rotSpeedY;
        angleX += rotSpeedX;
      }
      mouseRef.current.px = mouseRef.current.x;
      mouseRef.current.py = mouseRef.current.y;

      // Project points with rotation matrix mappings
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Temporary arrays to sort points by Z (depth buffer rendering)
      const projected = points.map((p) => {
        // Rotate Y
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        // Rotate X
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        // Simple perspective scaling
        const dist = 320;
        const scale = dist / (dist + z2);
        const screenX = width / 2 + x1 * scale * 1.5;
        const screenY = height / 2 + y2 * scale * 1.5;

        return {
          sx: screenX,
          sy: screenY,
          z: z2,
          orig: p,
          scale: scale * 1.5
        };
      });

      // Draw faint connections mesh
      if (sectionId === "admin") {
        // Draw cube layout skeleton wireframe (Vertices 0-7)
        ctx.strokeStyle = "rgba(99, 102, 241, 0.22)";
        ctx.lineWidth = 1;
        const connections = [
          [0,1], [1,2], [2,3], [3,0], // back
          [4,5], [5,6], [6,7], [7,4], // front
          [0,4], [1,5], [2,6], [3,7]  // depths
        ];
        connections.forEach(([i, j]) => {
          if (projected[i] && projected[j]) {
            ctx.beginPath();
            ctx.moveTo(projected[i].sx, projected[i].sy);
            ctx.lineTo(projected[j].sx, projected[j].sy);
            ctx.stroke();
          }
        });
      } else if (sectionId === "mindsync" || sectionId === "aiverse_one" || sectionId === "cyber_privacy") {
        // Find nearest nodes to link automatically
        const maxDist = sectionId === "cyber_privacy" ? 35 : 45;
        for (let i = 0; i < projected.length; i += 2) {
          const p1 = projected[i];
          for (let j = i + 1; j < projected.length; j += 3) {
            const p2 = projected[j];
            const dx = p1.sx - p2.sx;
            const dy = p1.sy - p2.sy;
            const screenDist = Math.hypot(dx, dy);
            if (screenDist < maxDist) {
              const alpha = (1 - screenDist / maxDist) * 0.18;
              ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(p1.sx, p1.sy);
              ctx.lineTo(p2.sx, p2.sy);
              ctx.stroke();
            }
          }
        }
      }

      // Draw projected nodes
      projected.sort((a, b) => b.z - a.z); // render backwards for natural 3D depth overlay
      projected.forEach((p) => {
        const radius = Math.max(0.5, p.orig.color?.includes("cyan") ? 2.5 : p.scale * 1.8);
        ctx.fillStyle = p.orig.color || "rgba(59, 130, 246, 0.75)";
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, radius, 0, Math.PI * 2);
        ctx.fill();

        // Extra outer circle glow on important nodes
        if (radius > 2 && Math.random() > 0.992) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, radius * 2.8, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Canvas ambient text coordinates label
      ctx.font = "bold 9px monospace";
      ctx.fillStyle = "rgba(100, 116, 139, 0.4)";
      ctx.textAlign = "start";
      ctx.fillText(`${sectionId.toUpperCase()}_MODEL // RES_3D_GRID // X=${angleX.toFixed(2)} Y=${angleY.toFixed(2)}`, 16, height - 16);

      animateId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animateId);
      resizeObserver.disconnect();
    };
  }, [sectionId]);

  return (
    <div className="fixed inset-0 bg-[#090D16] z-50 flex flex-col overflow-y-auto min-h-screen">
      
      {/* PERSISTENT SUITE HEADER & SWITCHING MENU BAR */}
      <header className="w-full border-b border-slate-800/80 bg-[#080B15]/95 backdrop-blur-md px-6 py-4 flex flex-col md:flex-row items-center justify-between sticky top-0 z-50 gap-4">
        {/* Left: Brand + Exit button */}
        <div className="flex items-center gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300 hover:text-white transition bg-slate-900 hover:bg-slate-850 border border-slate-800 px-3.5 py-2 rounded-xl cursor-pointer shadow-md select-none"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-400" />
              <span>EXIT GATESPACE</span>
            </button>
          )}
          <div className="h-6 w-[1px] bg-slate-850 hidden md:block" />
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono tracking-wider font-extrabold text-slate-400 uppercase">
              AIVERSE SOVEREIGN NODE // ONLINE
            </span>
          </div>
        </div>

        {/* Center: Real top header menu bar to switch between logins/modules seamlessly */}
        <div className="flex flex-wrap items-center justify-center gap-1 py-1 px-2.5 bg-slate-950/60 rounded-2xl border border-slate-850">
          {[
            { id: "mindsync", label: "MindSync" },
            { id: "aiverse_one", label: "AiVerse ONE" },
            { id: "cyber_privacy", label: "Cyber & Privacy" },
            { id: "trust_scanner", label: "Trust Scanner" },
            { id: "social_fake", label: "Social Fake" },
            { id: "admin", label: "Admin Console" }
          ].map((item) => {
            const isActive = item.id === sectionId;
            return (
              <button
                key={item.id}
                onClick={() => switchToModule(item.id)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-mono font-black tracking-tight uppercase transition cursor-pointer select-none ${
                  isActive 
                    ? "bg-gradient-to-r from-indigo-500/30 to-blue-500/20 text-white border border-indigo-500/40 shadow-sm shadow-indigo-500/10"
                    : "text-slate-400 hover:text-white hover:bg-slate-900/50 border border-transparent"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right: Quick system metadata label */}
        <div className="hidden lg:flex items-center gap-2 font-mono text-[9px] text-slate-500 select-none">
          <span>PORT: 3000 // HANDSHAKE CERTIFIED</span>
        </div>
      </header>

      {/* Main Form Center Layout container */}
      <div className="flex-1 w-full flex items-center justify-center p-4 md:p-8 relative">
        {/* Absolute back aesthetic elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500/5 blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(17,24,39,0)_0%,rgba(9,13,22,0.85)_100%)] pointer-events-none" />
        
        {/* Outer Glow Grid Panel Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-[#0D1222] border border-slate-800/80 rounded-[32px] w-full max-w-5xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10"
        >
          
          {/* LEFT COLUMN: Premium 3D Math Projection Sandbox (lg:col-span-6) */}
          <div className="lg:col-span-6 bg-[#080B15]/90 border-r border-slate-850 p-8 flex flex-col justify-between relative min-h-[400px] lg:min-h-[550px] select-none">
            {/* Sectional header brand info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${
                  sectionId === "mindsync" ? "from-pink-500/20 to-rose-600/30 border-pink-500/40 text-pink-500" :
                  sectionId === "aiverse_one" ? "from-cyan-500/20 to-blue-600/30 border-cyan-500/40 text-cyan-500" :
                  "from-indigo-500/20 to-indigo-600/30 border-indigo-500/40 text-indigo-500"
                } border flex items-center justify-center shadow-lg`}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] uppercase font-mono text-slate-500 font-bold tracking-widest block leading-none pb-0.5">SOVEREIGN SUITE GATEWAY</span>
                  <span className="text-xs font-mono font-black text-slate-300">AiVerse Command Network</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-4">
                <span className="inline-block px-2 py-0.5 rounded text-[8px] font-mono font-bold tracking-widest uppercase bg-slate-900 border border-slate-800 text-slate-400">
                  MODULE IDENTIFICATION
                </span>
                <h2 className="text-3xl font-display font-medium text-slate-100 tracking-tight">
                  {sectionTitle}
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-md">
                  Active node authorization is required to access sensitive files. Stamped records are synced chronologically to the global Air-gapped trust ledger.
                </p>
              </div>
            </div>

            {/* Interactive Mouse rotation stage canvas */}
            <div 
              className="flex-1 w-full relative flex items-center justify-center overflow-hidden cursor-move my-4 border border-slate-900 bg-slate-950/20 rounded-2xl"
              onMouseDown={(e) => {
                mouseRef.current.isDown = true;
                mouseRef.current.x = mouseRef.current.px = e.clientX;
                mouseRef.current.y = mouseRef.current.py = e.clientY;
              }}
              onMouseMove={(e) => {
                if (mouseRef.current.isDown) {
                  mouseRef.current.x = e.clientX;
                  mouseRef.current.y = e.clientY;
                }
              }}
              onMouseUp={() => mouseRef.current.isDown = false}
              onMouseLeave={() => mouseRef.current.isDown = false}
            >
              <canvas ref={canvasRef} className="w-full h-full max-h-[300px]" />
              <div className="absolute top-2.5 right-3 bg-slate-950/80 border border-slate-900 px-2 py-1 rounded text-[8px] font-mono text-slate-400 select-all leading-normal flex items-center gap-1.5 select-none opacity-85">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                DRAG TO ROTATE 3D PERSPECTIVE
              </div>
            </div>

            {/* Bottom security telemetry and links */}
            <div className="border-t border-slate-850/60 pt-4 flex items-center justify-between font-mono text-[9px] text-slate-500">
              <span>AUDIT STATUS // 100% UNCLASSIFIED</span>
              <span className="text-emerald-500 uppercase tracking-widest font-extrabold flex items-center gap-1">
                <Fingerprint className="w-3.5 h-3.5" /> SECURE HANDSHAKE V4
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Authentic Login / Registrations Form (lg:col-span-6) */}
          <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-between bg-[#0C1120]">
            
            {/* Header option button Close */}
            <div className="flex justify-between items-center pb-8 border-b border-slate-850/60 mb-8">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-slate-400">
                {isRegister ? "SOVEREIGN AGENT ENROLLMENT" : "VERIFY SECURITY CLEARANCE"}
              </span>
              {onClose && (
                <button 
                  onClick={onClose}
                  className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition group cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  <span>Return Dashboard</span>
                </button>
              )}
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              
              {/* Feedback Notifications Alerts */}
              <AnimatePresence mode="wait">
                {errorMessage && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl text-xs font-semibold flex items-start gap-2"
                  >
                    <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
                {successMessage && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-semibold flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{successMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {isRegister && (
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block font-bold">Agent Full Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      required
                      placeholder="Chief Inspector Vance" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs font-mono text-slate-200 bg-slate-950 border border-slate-800 focus:border-slate-650 rounded-xl px-4 py-3 outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block font-bold">System Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="officer@aiverse-command.gov" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs font-mono text-slate-200 bg-slate-950 border border-slate-800 focus:border-slate-650 rounded-xl px-4 py-3 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block font-bold">Clearance Key (Password)</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    placeholder="••••••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs font-mono text-slate-205 bg-slate-950 border border-slate-800 focus:border-slate-650 rounded-xl px-4 py-3 pr-10 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-350"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isRegister && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block font-bold">Assigned Security Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full text-xs font-mono text-slate-200 bg-slate-950 border border-slate-800 focus:border-slate-650 rounded-xl px-3 py-3 outline-none cursor-pointer font-sans"
                    >
                      <option value="Super Admin">Super Admin</option>
                      <option value="Organization Admin">Organization Admin</option>
                      <option value="Security Manager">Security Manager</option>
                      <option value="Analyst">Analyst</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 block font-bold">Decentralized Passkey</label>
                    <input 
                      type="text" 
                      placeholder="SEC-ZURICH-778" 
                      value={secureKey}
                      onChange={(e) => setSecureKey(e.target.value)}
                      className="w-full text-xs font-mono text-slate-202 bg-slate-950 border border-slate-800 focus:border-slate-650 rounded-xl px-4 py-3 outline-none uppercase"
                    />
                  </div>
                </div>
              )}

              {/* In-app secure toggle login methods */}
              <div className="flex items-center justify-between font-mono text-[10px] pt-1">
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-indigo-400 hover:text-indigo-305 hover:underline font-bold"
                >
                  {isRegister ? "Already hold a credential key?" : "Don't hold credential codes? Register Here"}
                </button>
                
                {!isRegister && (
                  <span className="text-slate-500 cursor-help hover:text-slate-400 flex items-center gap-1">
                    <HelpCircle className="w-3 h-3" /> Forgot credentials?
                  </span>
                )}
              </div>

              {/* Main validation trigger button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition ${
                  sectionId === "mindsync" ? "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700" :
                  sectionId === "aiverse_one" ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700" :
                  "bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
                } text-white shadow-lg shadow-blue-500/5 mt-4 flex items-center justify-center gap-2 cursor-pointer`}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>NEGOTIATING HANDSHAKE CODES...</span>
                  </>
                ) : (
                  <>
                    {isRegister ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                    <span>{isRegister ? "Register & Activate Secure Keys" : "Verify Secret Keys & Launch Section"}</span>
                  </>
                )}
              </button>
            </form>

            {/* Alternative google active session integration */}
            <div className="mt-8 space-y-4">
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-850/60"></div>
                <span className="flex-shrink mx-4 text-[9px] uppercase tracking-widest font-mono text-slate-500">OR REGISTER VIA INSTANT ACTIVE HANDSHAKE</span>
                <div className="flex-grow border-t border-slate-850/60"></div>
              </div>

              {/* Google Coop session */}
              <button
                type="button"
                disabled={isLoading}
                onClick={handleGoogleSync}
                className="w-full py-3 border border-slate-800 bg-slate-950/40 hover:bg-slate-900 text-slate-300 font-mono font-black text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-blue-500" />
                <span>COOP RUNNING SESSION VIA GOOGLE AUTH</span>
              </button>
            </div>

            <div className="pt-8 text-center text-slate-500 text-[10px] font-mono leading-relaxed border-t border-slate-850/60 mt-8">
              🛡️ ALL USER LOGINS REPLICATED TO ACTIVE TELEMETRY STACK FOR FORENSIC REVIEW // END USE COMPLIANT UNDER ZURICH COMPACT AMENDMENTS.
            </div>

          </div>

        </motion.div>
      </div>
    </div>
  );
}

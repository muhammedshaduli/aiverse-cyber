import { useState, ComponentType } from "react";
import { Eye, ShieldAlert, HeartHandshake, Bell, Key, Radio, Check, Globe, HelpCircle, Shield, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

interface ModuleConfig {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  icon: ComponentType<any>;
  themeColor: string;
  features: string[];
  kpi: string;
  kpiLabel: string;
}

export default function PlatformModules() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const modules: ModuleConfig[] = [
    {
      id: "trust",
      title: "AiVerse Trust",
      badge: "Deepfake Intelligence",
      tagline: "Deepfake Detection Platform",
      description: "Automated analysis system detecting synthetic digital faces, lips, eyelids, and synthesized speech vectors across corporate channels.",
      icon: Eye,
      themeColor: "from-blue-500 to-blue-700",
      features: ["Fine-grained facial mesh analysis", "Synthetic voice fingerprinting", "Video metadata EXIF verification", "Automatic audio phase alignment check"],
      kpi: "99.85%",
      kpiLabel: "AI Video Accuracy"
    },
    {
      id: "shield",
      title: "AiVerse Shield",
      badge: "Cyber Defense",
      tagline: "Cybersecurity Intelligence",
      description: "Next-generation endpoint firewall tailored for AI threats, blocking mass phishing attempts and malicious deepfake injection packets.",
      icon: ShieldAlert,
      themeColor: "from-rose-500 to-orange-600",
      features: ["Active model spoof rejection", "Ransomware autopilot isolation", "Automatic sandbox testing", "LLM jailbreak defenses"],
      kpi: "50ms",
      kpiLabel: "Mean Block Response Time"
    },
    {
      id: "guardian",
      title: "AiVerse Guardian",
      badge: "Identity Defense",
      tagline: "Personal Protection AI",
      description: "Preemptively sweeps public search chains to check if your brand voice or face profile is being duplicated or exploited.",
      icon: HeartHandshake,
      themeColor: "from-emerald-500 to-teal-600",
      features: ["Automatic facial signature mapping", "Voice biometrics registration", "DMCA auto-takedown requests", "Realtime brand alert feeds"],
      kpi: "24/7",
      kpiLabel: "Identity Sweeping"
    },
    {
      id: "watch",
      title: "AiVerse Watch",
      badge: "Media Watchdog",
      tagline: "Social Media Monitoring",
      description: "Sovereign intelligence cluster monitoring X, YouTube, and TikTok channels to halt coordinated bot disinformation campaigns.",
      icon: Bell,
      themeColor: "from-amber-500 to-orange-500",
      features: ["Coordinated narrative detection", "Network amplification mapping", "Account metadata validation", "Pre-viral trigger alarms"],
      kpi: "< 3m",
      kpiLabel: "Bot Disinformation Alerts"
    },
    {
      id: "verify",
      title: "AiVerse Verify",
      badge: "Authenticity Ledger",
      tagline: "Content Authenticity Verification",
      description: "Cryptographically stamp original media with transparent metadata directly at ingestion, recording proofs on the decentralized trust ledger.",
      icon: Key,
      themeColor: "from-blue-600 to-slate-700",
      features: ["C2PA metadata encoding", "Decentralized cryptographic proofing", "Public verification reader", "Tamper-proof storage integration"],
      kpi: "100%",
      kpiLabel: "Cryptographic Integrity"
    },
    {
      id: "sentinel",
      title: "AiVerse Sentinel",
      badge: "Sovereign Monitoring",
      tagline: "Enterprise Threat Intelligence",
      description: "Premium control center tailored for public sectors, tracking threat levels, critical elections interference, and state-sponsored cyber networks.",
      icon: Radio,
      themeColor: "from-sky-500 to-blue-700",
      features: ["Election infrastructure armor", "State-sponsored actor tracker", "Classified threat packages", "Admissible evidence compiling"],
      kpi: "120+",
      kpiLabel: "Global Governments Protected"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((mod) => {
        const Icon = mod.icon;
        const isHovered = hoveredId === mod.id;

        return (
          <div
            key={mod.id}
            onMouseEnter={() => setHoveredId(mod.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative bg-white border border-slate-100 rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1.5 overflow-hidden"
          >
            {/* Soft decorative background glow on hover */}
            <div 
              className={`absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br ${mod.themeColor} opacity-[0.03] transition-all duration-500 group-hover:scale-150 group-hover:opacity-[0.08]`} 
            />

            <div>
              {/* Header section with icon styling */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100/80">
                <span className="text-[10px] font-mono leading-none tracking-widest bg-zinc-100 text-zinc-600 font-bold px-2.5 py-1 rounded-md uppercase">
                  {mod.badge}
                </span>
                
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mod.themeColor} text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Tagline / Module Identity */}
              <div className="mt-5 space-y-1">
                <h4 className="text-xl font-display font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {mod.title}
                </h4>
                <p className="text-xs font-mono text-zinc-400 font-semibold">{mod.tagline}</p>
              </div>

              {/* Product description */}
              <p className="text-zinc-500 text-xs mt-3 leading-relaxed">
                {mod.description}
              </p>

              {/* Dynamic Expandable Details Area */}
              <div className={`mt-5 space-y-2.5 transition-all duration-500 overflow-hidden ${isHovered ? "max-h-56 opacity-100" : "max-h-16 opacity-75"}`}>
                <div className="text-[10px] uppercase tracking-wider font-mono text-zinc-400 font-bold">
                  Core Module Features
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {mod.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-650">
                      <Check className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Micro stats dashboard counter footer */}
            <div className="mt-8 pt-4 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-wider font-mono text-zinc-400 block font-semibold">
                  {mod.kpiLabel}
                </span>
                <span className={`text-lg font-bold font-display bg-gradient-to-r ${mod.themeColor} bg-clip-text text-transparent`}>
                  {mod.kpi}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}

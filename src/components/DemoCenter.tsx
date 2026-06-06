import { useState, useEffect, useRef } from "react";
import { 
  Eye, Video, Shield, Radio, Search, AlertTriangle, CheckCircle, 
  RefreshCw, Play, Pause, Send, Briefcase, Landmark, GitFork, 
  Mail, FileWarning, Fingerprint, RefreshCcw, BellRing, Share2, Layers 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types for Demo Center
type DemoTab = "images" | "videos" | "voice" | "social" | "source" | "cyber" | "guardian" | "executive";

export default function DemoCenter() {
  const [activeTab, setActiveTab] = useState<DemoTab>("images");

  // State 1: Fake Image Forensics
  const [imgPayload, setImgPayload] = useState<"fake_ceo" | "real_press">("fake_ceo");
  const [isImgScanning, setIsImgScanning] = useState(false);
  const [imgScanDone, setImgScanDone] = useState(false);
  const [heatmapIntensity, setHeatmapIntensity] = useState(30);

  // State 2: Deepfake Video Frame-by-Frame Scrubbing
  const [videoFrame, setVideoFrame] = useState(42);
  const [lipMismatch, setLipMismatch] = useState(87);
  const [eyeTrackerLog, setEyeTrackerLog] = useState("Non-natural blink rate: 0.2/min");

  useEffect(() => {
    // Generate simulated fluctuation based on frame index
    const seed = (videoFrame * 17) % 100;
    setLipMismatch(Math.floor(65 + (seed % 35)));
    setEyeTrackerLog(
      seed > 50 
        ? "Blink absent for 180 frames (AI hallmark)" 
        : "Pixel seam artifacts on chin detected"
    );
  }, [videoFrame]);

  // State 3: Voice Spectrum
  const [voiceFile, setVoiceFile] = useState<"fake_voice" | "real_voice">("fake_voice");
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [voiceLogs, setVoiceLogs] = useState<string[]>([]);
  const voiceInterval = useRef<any>(null);

  useEffect(() => {
    if (isPlayingVoice) {
      voiceInterval.current = setInterval(() => {
        const noiseText = voiceFile === "fake_voice" 
          ? `[ANOMALY] Synthesizer fingerprint matched Vocoder-22 at freq ${(Math.random() * 2000 + 1000).toFixed(1)}Hz`
          : `[SECURE] Harmonic speech coherence standard matches verified profile.`;
        setVoiceLogs(p => [noiseText, ...p.slice(0, 4)]);
      }, 1500);
    } else {
      clearInterval(voiceInterval.current);
    }
    return () => clearInterval(voiceInterval.current);
  }, [isPlayingVoice, voiceFile]);

  // State 4: Social Media command logs
  const [socialFilter, setSocialFilter] = useState<"all" | "high" | "critical">("all");
  const [socialAlerts, setSocialAlerts] = useState([
    { id: 1, platform: "TikTok", source: "@deep_patriot_4", reach: "1.2M", score: 86, risk: "High", narrative: "Generated prime minister deepfake resign speech" },
    { id: 2, platform: "X", source: "@narrative_spawner", reach: "450K", score: 94, risk: "Critical", narrative: "Automated fake banking runs rumor" },
    { id: 3, platform: "YouTube", source: "@crypto_guru_ai", reach: "2.1M", score: 98, risk: "Critical", narrative: "Coordinated AI voice clone staking fraud" },
    { id: 4, platform: "Facebook", source: "@daily_news_cloned", reach: "80K", score: 55, risk: "Medium", narrative: "Mislabeled old factory fire as rocket attack" },
  ]);

  // State 5: Source Tracing Nodes
  const [tracingStep, setTracingStep] = useState(0);
  const [isTracing, setIsTracing] = useState(false);

  const startTracingCycle = () => {
    setIsTracing(true);
    setTracingStep(0);
  };

  useEffect(() => {
    if (!isTracing) return;
    if (tracingStep < 4) {
      const t = setTimeout(() => setTracingStep(p => p + 1), 1200);
      return () => clearTimeout(t);
    } else {
      setIsTracing(false);
    }
  }, [isTracing, tracingStep]);

  // State 6: Cyber Threat Core (Phishing detector)
  const [isPhishingChecked, setIsPhishingChecked] = useState(false);
  const [selectedPhishEmail, setSelectedPhishEmail] = useState<"scam" | "normal">("scam");

  // State 7: Guardian Chat agent interface
  const [guardianChat, setGuardianChat] = useState<{sender: "user" | "guardian", text: string, list?: string[], tags?: string[]}[]>([
    { sender: "guardian", text: "Secure channels active. Ask me to sweep biometric records, brand assets, or review public sources for malicious AI content." }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatProcessing, setIsChatProcessing] = useState(false);

  const sendGuardianMessage = (preText?: string) => {
    const textToSend = preText || chatInput;
    if (!textToSend.trim()) return;

    setGuardianChat(p => [...p, { sender: "user", text: textToSend }]);
    setChatInput("");
    setIsChatProcessing(true);

    setTimeout(() => {
      let responseText = "";
      let recommendations: string[] = [];
      let detectedTags: string[] = [];

      if (textToSend.toLowerCase().includes("brand") || textToSend.toLowerCase().includes("face") || textToSend.toLowerCase().includes("someone")) {
        responseText = "I have initiated an instantaneous multi-channel trust sweep. Searching facial index records, TikTok streams, and YouTube uploads for brand duplicates...";
        recommendations = [
          "Initiate automated DMCA takedown with Google Registry",
          "Log incident hash into secure cryptographic ledger",
          "Alert executive stakeholders of identity spoofing",
        ];
        detectedTags = ["IDENTITY CLONED", "TIKTOK REPLICATOR BLOCKED"];
      } else {
        responseText = "Request securely received. Deploying AiVerse Sentinel agents to track EXIF coordinates, speech envelope profiles, and viral distribution streams.";
        recommendations = [
          "Enable high-risk brand monitoring on YouTube",
          "Wholesale C2PA metadata tagging on authentic company assets",
        ];
        detectedTags = ["SECURITY SWEEP COMPLETE"];
      }

      setGuardianChat(p => [
        ...p, 
        { sender: "guardian", text: responseText, list: recommendations, tags: detectedTags }
      ]);
      setIsChatProcessing(false);
    }, 2000);
  };

  return (
    <div className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-6 md:p-10 shadow-sm max-w-7xl mx-auto">
      
      {/* Navigation Sub-Menu for Demo Modules */}
      <div className="flex overflow-x-auto gap-2 pb-4 mb-8 scrollbar-none border-b border-zinc-200">
        {[
          { id: "images", name: "Fake Images", icon: Eye, badge: "Sec. 5" },
          { id: "videos", name: "Deepfake Video", icon: Fingerprint, badge: "Sec. 6" },
          { id: "voice", name: "Voice Cloning", icon: Radio, badge: "Sec. 7" },
          { id: "social", name: "Social Monitoring", icon: BellRing, badge: "Sec. 8" },
          { id: "source", name: "Source Tracing", icon: GitFork, badge: "Sec. 9" },
          { id: "cyber", name: "Cyber Armor", icon: Mail, badge: "Sec. 10" },
          { id: "guardian", name: "Protection Agent", icon: Send, badge: "Sec. 11" },
          { id: "executive", name: "Enterprise Hub", icon: Briefcase, badge: "Sec. 12 & 13" },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as DemoTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                isActive 
                  ? "bg-white text-blue-600 border-slate-200 shadow-sm" 
                  : "bg-transparent text-slate-500 hover:text-slate-800 border-transparent"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.name}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200">
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid Content based on active tab */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-100 shadow-sm min-h-[460px] flex flex-col justify-between">
        
        {/* TAB 1: FAKE IMAGE FORENSICS */}
        {activeTab === "images" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 rounded-full font-bold uppercase tracking-wider">
                Module: AiVerse Trust Forensic
              </span>
              <h4 className="text-xl font-display font-semibold text-zinc-900">
                Sartorial Pixel & GAN Forensic Scanner
              </h4>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Generative networks leave distinct mathematically traceable artifacts. Select a payload and execute the pixel scanner to isolate GAN mesh grids.
              </p>

              {/* Selector */}
              <div className="flex gap-2 bg-zinc-50 border border-zinc-200 p-1.5 rounded-xl text-xs">
                <button
                  onClick={() => {
                    setImgPayload("fake_ceo");
                    setImgScanDone(false);
                  }}
                  className={`flex-1 py-2 rounded-lg font-semibold transition ${imgPayload === "fake_ceo" ? "bg-white border text-rose-600 border-zinc-200 shadow-mini" : "text-zinc-600 hover:text-rose-600"}`}
                >
                  📸 Fake Executive Headshot
                </button>
                <button
                  onClick={() => {
                    setImgPayload("real_press");
                    setImgScanDone(false);
                  }}
                  className={`flex-1 py-2 rounded-lg font-semibold transition ${imgPayload === "real_press" ? "bg-white border text-emerald-600 border-zinc-200 shadow-mini" : "text-zinc-600 hover:text-emerald-600"}`}
                >
                  📸 RAW Authentic Document
                </button>
              </div>

              {/* Controls */}
              <div className="space-y-4 pt-4 border-t border-zinc-100">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-zinc-500 font-mono">
                    <span>FORENSIC GAIN SCAN INTENSITY</span>
                    <span>{heatmapIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={heatmapIntensity}
                    onChange={(e) => setHeatmapIntensity(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-ew-resize h-1 bg-slate-100 rounded-lg appearance-none"
                  />
                </div>

                <button
                  onClick={() => {
                    setIsImgScanning(true);
                    setTimeout(() => {
                      setIsImgScanning(false);
                      setImgScanDone(true);
                    }, 2000);
                  }}
                  disabled={isImgScanning}
                  className="w-full py-2.5 bg-zinc-950 text-white font-semibold text-xs rounded-xl hover:bg-zinc-800 transition flex items-center justify-center gap-2 font-mono shadow-mini"
                >
                  {isImgScanning ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> SCANNING PIXEL CORRELATION...
                    </>
                  ) : (
                    <>RUN PIXEL FORENSIC ANALYSIS</>
                  )}
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 bg-zinc-50 border border-zinc-200/60 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500 border-b border-zinc-200 pb-3">
                <span>STAGE: RASTER INTENSITY GRAPH</span>
                <span>METADATA STAMP: {imgPayload === "real_press" ? "SECURE_C2PA" : "NO_EXIF"}</span>
              </div>

              {/* Simulated Scanning Viewfinder */}
              <div className="my-6 h-56 w-full bg-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center border border-zinc-800 shadow-inner">
                {/* Live Scanning Wire overlay */}
                {isImgScanning && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none">
                    <div className="h-0.5 bg-cyan-400 absolute left-0 right-0 bg-cyan-400/50 animate-scan font-bold shadow-glow" />
                  </div>
                )}

                {/* Simulated Heatmap Display */}
                <div className="text-center p-6 space-y-2">
                  <div className={`space-y-1 transition-all ${isImgScanning ? "blur-[2px]" : ""}`}>
                    {imgPayload === "fake_ceo" ? (
                      <>
                        <div 
                          style={{ textShadow: `0 0 ${heatmapIntensity / 10}px rgba(239, 68, 68, 0.8)` }}
                          className="font-mono text-xs text-rose-500 font-bold"
                        >
                          GAN RECONSTRUCTION WAVE DISPARITY DETECTED
                        </div>
                        <p className="text-[10px] text-zinc-400 font-mono">
                          Interpolation Factor: 0.942 | Pixel Coherence: Low
                        </p>
                        <div className="mt-2 inline-block border-2 border-rose-500 text-[10px] bg-rose-500/10 text-rose-500 font-mono py-1 px-2.5 rounded font-bold animate-pulse">
                          ARTIFICIAL GENERATIVE SOURCE KEY
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="font-mono text-xs text-emerald-400 font-bold">
                          RAW IMAGE METADATA ALIGNED PERFECTLY
                        </div>
                        <p className="text-[10px] text-zinc-400 font-mono">
                          Sony α7R V | Lens: FE 24-70mm | Cryptographic C2PA signed
                        </p>
                        <div className="mt-2 inline-block border border-emerald-500 text-[10px] bg-emerald-500/10 text-emerald-400 font-mono py-1 px-2.5 rounded font-bold">
                          VERIFIED AUTHENTIC HISTORIC DOCUMENT
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {imgScanDone && (
                <div className="bg-white border rounded-xl p-3.5 text-xs flex items-center justify-between shadow-mini">
                  <div className="flex items-center gap-2">
                    {imgPayload === "fake_ceo" ? (
                      <>
                        <AlertTriangle className="w-4 h-4 text-rose-500" />
                        <div>
                          <p className="font-bold text-zinc-800">Trust Index: 12.8% (CRITICAL RISK)</p>
                          <p className="text-[10px] text-zinc-400">Classified as Synthesized Midjourney/Flux Artifact V4.</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <div>
                          <p className="font-bold text-zinc-800">Trust Index: 98.7% (AUTHENTIC)</p>
                          <p className="text-[10px] text-zinc-400">Perfect digital registry ledger confirmation.</p>
                        </div>
                      </>
                    )}
                  </div>
                  <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold ${imgPayload === "fake_ceo" ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"}`}>
                    {imgPayload === "fake_ceo" ? "ISOLATE" : "PASS TRUSTED"}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: DEEPFAKE VIDEO FRAME-BY-FRAME */}
        {activeTab === "videos" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-mono bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Module: AiVerse Video Watch
              </span>
              <h4 className="text-xl font-display font-semibold text-zinc-900">
                Lip Sync, Eye Blink, & Frame Forensics
              </h4>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Drag the scrubber slider below to examine frame-level artifacts of the suspect deepfake video. Notice facial seam divergence on specific keyframes.
              </p>

              <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200/60 space-y-3.5">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-zinc-600 font-bold">
                    <span>SCRUB KEYFRAMES INDEX</span>
                    <span>FRAME #{videoFrame} / 120</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="120"
                    value={videoFrame}
                    onChange={(e) => setVideoFrame(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-[11px] font-mono">
                  <div className="p-2 border rounded bg-white font-semibold">
                    Lip Coherence
                    <span className="block font-bold text-rose-600 text-sm mt-0.5">{lipMismatch}% error</span>
                  </div>
                  <div className="p-2 border rounded bg-white font-semibold">
                    FPS Check
                    <span className="block font-bold text-zinc-800 text-sm mt-0.5">30.00 (Sync)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-zinc-50 p-6 rounded-2xl border border-zinc-200 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-zinc-200 pb-3">
                <span>ACTIVE HUD SURFACE GRAPHIC</span>
                <span className="text-rose-600 font-bold flex items-center gap-1 animate-pulse">
                  <AlertTriangle className="w-3.5 h-3.5" /> CRITICAL VECTOR DEEPMESH
                </span>
              </div>

              <div className="h-44 bg-zinc-950 rounded-xl my-4 flex flex-col justify-center items-center relative overflow-hidden border border-zinc-850">
                <div className="absolute top-2.5 left-2.5 text-[9px] font-mono text-zinc-400 bg-white/5 py-1 px-2 rounded">
                  SYNTHETIC REPLICATOR TRACKING [ACTIVE]
                </div>

                {/* Simulated facial box tracking overlay */}
                <div className="w-24 h-24 border border-dashed border-rose-500 rounded-full flex flex-col justify-center items-center text-rose-500 animate-pulse bg-rose-500/5">
                  <div className="text-[8px] font-mono tracking-widest font-bold">MESH ARTIFACT</div>
                  <div className="font-mono text-[14px] font-extrabold mt-0.5">{lipMismatch}%</div>
                </div>

                <div className="absolute bottom-2.5 left-2.5 text-[10px] font-mono text-zinc-500">
                  Indicator: {eyeTrackerLog}
                </div>
              </div>

              <p className="text-xs text-zinc-500 leading-relaxed font-mono bg-white p-3 border rounded-xl">
                <strong>Forensic Conclusion:</strong> Lip boundary vectors do not correspond to synthesized English consonant models. Highly anomalous audio mapping aligns with clone software.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: VOICE SPECTRUM */}
        {activeTab === "voice" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Module: AiVerse Shield Acoustics
              </span>
              <h4 className="text-xl font-display font-semibold text-zinc-900">
                Voice Impersonator SPECTRUM Analysis
              </h4>
              <p className="text-sm text-zinc-500 leading-relaxed">
                CEO deepfake calls represent a catastrophic corporate threat vector. Select standard speech profile mockups and trigger the voice spectrum checker.
              </p>

              <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200/60 space-y-3.5">
                <div className="text-xs font-mono text-zinc-600 block mb-1">SELECT AUDIO SIGNALS:</div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setVoiceFile("fake_voice");
                      setVoiceLogs([]);
                    }}
                    className={`p-3 rounded-lg border text-left text-xs font-semibold flex items-center justify-between ${voiceFile === "fake_voice" ? "bg-white border-rose-200 text-rose-700" : "bg-transparent text-zinc-600"}`}
                  >
                    <span>🎙️ Executive Impersonator Speech (.wav)</span>
                    <span className="text-[9px] uppercase tracking-wider bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded-sm">CLONED</span>
                  </button>
                  <button
                    onClick={() => {
                      setVoiceFile("real_voice");
                      setVoiceLogs([]);
                    }}
                    className={`p-3 rounded-lg border text-left text-xs font-semibold flex items-center justify-between ${voiceFile === "real_voice" ? "bg-white border-emerald-200 text-emerald-700" : "bg-transparent text-zinc-600"}`}
                  >
                    <span>🎙️ Authentic Biometric Speech Profile</span>
                    <span className="text-[9px] uppercase tracking-wider bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-sm">SECURE</span>
                  </button>
                </div>

                <button
                  onClick={() => setIsPlayingVoice(!isPlayingVoice)}
                  className={`w-full py-2.5 rounded-xl font-mono text-xs font-semibold transition flex items-center justify-center gap-2 ${isPlayingVoice ? "bg-rose-600 text-white hover:bg-rose-700" : "bg-zinc-950 text-white hover:bg-zinc-800"}`}
                >
                  {isPlayingVoice ? (
                    <>
                      <Pause className="w-4 h-4 fill-white" /> PAUSE COMPONENT SPECTRUM
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" /> ACTIVATE SOUNDWAVE SPECTRUM
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 bg-zinc-50 border border-zinc-200 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-zinc-600">DYNAMIC DEEP ANALYSIS SPECTRION MONITOR</span>
                <div className="h-28 bg-white border border-zinc-100 rounded-xl mt-4 flex items-end justify-between px-6 py-4 overflow-hidden relative shadow-inner">
                  {isPlayingVoice && (
                    <div className="absolute inset-0 bg-blue-50/10 pointer-events-none" />
                  )}
                  {/* Waveform graphic bars */}
                  {[32, 54, 12, 76, 89, 45, 12, 60, 45, 95, 23, 76, 54, 21, 67, 34, 45, 12, 90, 42, 11].map((bar, idx) => {
                    const animationScalar = isPlayingVoice ? `[animation-duration:${0.5 + (idx % 3) * 0.2}s]` : "";
                    return (
                      <span
                        key={idx}
                        style={{ height: isPlayingVoice ? `${Math.min(100, bar * (0.4 + Math.random() * 0.6))}%` : "16%" }}
                        className={`w-2 rounded-full transition-all duration-300 ${voiceFile === "fake_voice" ? "bg-rose-500" : "bg-emerald-500"} ${isPlayingVoice ? "animate-pulse" : ""}`}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 flex-1 space-y-1.5 overflow-y-auto max-h-[140px] border-t border-zinc-200 pt-4 font-mono text-[10px] text-zinc-500">
                {voiceLogs.length === 0 ? (
                  <div className="text-center text-zinc-400 py-4">
                    [Awaiting speech signal playback to compile log metrics...]
                  </div>
                ) : (
                  voiceLogs.map((log, i) => (
                    <div key={i} className="truncate select-none">
                      <span className="text-zinc-400">#&gt;</span> {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SOCIAL MEDIA MONITORING */}
        {activeTab === "social" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] font-mono bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Module: AiVerse Watch Alert
              </span>
              <h4 className="text-xl font-display font-semibold text-zinc-900">
                Sovereign Disinformation CommandCenter
              </h4>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Tracks coordination spikes on major networks. AiVerse algorithms flag high-risk deepfake posts and bot distributions before they reach critical viral loops.
              </p>

              <div className="flex gap-2 p-1 bg-zinc-100 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setSocialFilter("all")}
                  className={`flex-1 py-1.5 rounded transition ${socialFilter === "all" ? "bg-white text-zinc-800 shadow-mini" : "text-zinc-500"}`}
                >
                  All Alerts
                </button>
                <button
                  onClick={() => setSocialFilter("high")}
                  className={`flex-1 py-1.5 rounded transition ${socialFilter === "high" ? "bg-white text-amber-700 shadow-mini" : "text-zinc-500"}`}
                >
                  High
                </button>
                <button
                  onClick={() => setSocialFilter("critical")}
                  className={`flex-1 py-1.5 rounded transition ${socialFilter === "critical" ? "bg-white text-rose-700 shadow-mini" : "text-zinc-500"}`}
                >
                  Critical
                </button>
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
              <div className="text-xs font-semibold font-mono text-zinc-600 flex justify-between">
                <span>INSTANTANEOUS DISINFORMATION HARVEST ALERTS</span>
                <span className="text-rose-500">4 SOURCE STREAMS MONITORED</span>
              </div>

              <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
                {socialAlerts
                  .filter(alert => {
                    if (socialFilter === "high") return alert.risk === "High" || alert.risk === "Critical";
                    if (socialFilter === "critical") return alert.risk === "Critical";
                    return true;
                  })
                  .map(alert => (
                    <div key={alert.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/60 hover:bg-zinc-100/50 transition">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded border">
                            {alert.platform}
                          </span>
                          <span className="text-xs font-semibold text-zinc-800">{alert.source}</span>
                          <span className="text-[10px] text-zinc-400 font-mono">Reach: {alert.reach}</span>
                        </div>
                        <p className="text-xs text-zinc-500 font-mono">{alert.narrative}</p>
                      </div>

                      <div className="flex items-center gap-3.5 mt-2 sm:mt-0">
                        <div className="text-right">
                          <div className="text-[9px] text-zinc-400 font-mono">Risk Match</div>
                          <span className={`text-xs font-extrabold font-mono ${alert.risk === "Critical" ? "text-rose-600" : "text-amber-600"}`}>
                            {alert.score}% ({alert.risk})
                          </span>
                        </div>
                        <button className="text-[10px] font-mono px-2.5 py-1.5 bg-zinc-900 text-white rounded hover:bg-zinc-800 transition">
                          Isolate Bot Network
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SOURCE TRACING NETWORK */}
        {activeTab === "source" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Module: AiVerse Sentinel Trace
              </span>
              <h4 className="text-xl font-display font-semibold text-zinc-900">
                Interactive Global Source Tracing
              </h4>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Trace deepfakes from amplification bot nets back to the original ingestion node. Watch the trace network chart generate node connections in real-time.
              </p>

              <button
                disabled={isTracing}
                onClick={startTracingCycle}
                className="w-full py-2.5 bg-zinc-950 text-white font-semibold text-xs rounded-xl hover:bg-zinc-800 transition flex items-center justify-center gap-1.5 shadow-mini font-mono"
              >
                {isTracing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" strokeWidth={3} />
                    RUNNING HEURSTIC TRACE STEP {tracingStep+1}/4
                  </>
                ) : (
                  <>COMPILE SOURCE NETWORK TRACE</>
                )}
              </button>
            </div>

            <div className="lg:col-span-7 bg-zinc-50 border border-zinc-200 p-5 rounded-2xl flex flex-col justify-between">
              <span className="text-xs font-mono text-zinc-500 border-b pb-2">SOURCE VERICATION CONNECTORS DETAILED</span>

              {/* Dynamic Connecting Node Flow Graph */}
              <div className="my-6 min-h-[220px] flex flex-col justify-around relative px-4 text-xs font-mono">
                
                {/* Connector line graphic vertically with conditional sizes */}
                <div className="absolute left-10 top-6 bottom-6 w-0.5 bg-zinc-200" />
                {tracingStep > 0 && (
                  <div 
                    style={{ height: `${(tracingStep / 3) * 100}%` }}
                    className="absolute left-10 top-6 w-0.5 bg-blue-600 transition-all duration-500" 
                  />
                )}

                {[
                  { step: 1, title: "Original Synthesis Node", detail: "Server located in offshore hosting sandbox (IP block parsed)", stateIndex: 0 },
                  { step: 2, title: "Narrative Cascader Node", detail: "Initial seed upload onto unmoderated forum networks", stateIndex: 1 },
                  { step: 3, title: "Viral Coordination Point", detail: "Spanning across 400 automated bot channels simultaneously", stateIndex: 2 },
                  { step: 4, title: "Sovereign Risk Isolated", detail: "Ecosystem warning flagged on X & TikTok APIs automatically", stateIndex: 3 }
                ].map((node) => {
                  const activeClass = tracingStep >= node.stateIndex;
                  return (
                    <div 
                      key={node.step} 
                      className={`flex items-start gap-4 transition-all duration-300 ${activeClass ? "opacity-100" : "opacity-30"}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 ${
                        tracingStep === node.stateIndex 
                          ? "bg-blue-600 text-white animate-pulse" 
                          : tracingStep > node.stateIndex 
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-500" 
                          : "bg-white text-zinc-400 border border-zinc-200"
                      }`}>
                        {node.step}
                      </div>
                      <div>
                        <strong className={`block text-[11px] ${tracingStep === node.stateIndex ? "text-blue-600 font-bold" : "text-zinc-800"}`}>
                          {node.title}
                        </strong>
                        <span className="text-[10px] text-zinc-500">{node.detail}</span>
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>
          </div>
        )}

        {/* TAB 6: CYBER ARMOR INTELLIGENCE */}
        {activeTab === "cyber" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Module: AiVerse Sentinel Threat
                </span>
                <h4 className="text-xl font-display font-semibold text-zinc-900">
                  Phishing, Malware & Synthetic Cyber Scam Engine
                </h4>
                <p className="text-sm text-zinc-500 leading-relaxed mt-2">
                  Social engineering emails are now generated by malignant LLM clusters. AiVerse automatically analyzes payload semantics, server registry, and tone mismatch.
                </p>
                
                <div className="flex gap-2 bg-zinc-50 p-1.5 border rounded-xl text-xs font-semibold my-4">
                  <button
                    onClick={() => {
                      setSelectedPhishEmail("scam");
                      setIsPhishingChecked(false);
                    }}
                    className={`flex-1 py-1.5 rounded-md transition ${selectedPhishEmail === "scam" ? "bg-white text-rose-600 shadow-mini" : "text-zinc-600"}`}
                  >
                    📩 Scamp Spear-Phish Email
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPhishEmail("normal");
                      setIsPhishingChecked(false);
                    }}
                    className={`flex-1 py-1.5 rounded-md transition ${selectedPhishEmail === "normal" ? "bg-white text-emerald-600 shadow-mini" : "text-zinc-600"}`}
                  >
                    📩 Clean Vendor PurchaseOrder
                  </button>
                </div>
              </div>

              <button
                onClick={() => setIsPhishingChecked(true)}
                className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-xs rounded-xl transition shadow-mini font-mono"
              >
                AUDIT CONTENT SEMANTICS
              </button>
            </div>

            <div className="lg:col-span-7 bg-zinc-50 border border-zinc-200.60 p-5 rounded-2xl flex flex-col justify-between">
              <span className="text-xs font-mono text-zinc-600">SANDBOX MAIL AUDIT SIMULATION</span>

              <div className="bg-white border text-xs font-mono p-4 rounded-xl my-4 space-y-2 text-zinc-700 shadow-mini min-h-[180px]">
                <div>From: <span className="text-zinc-500">{selectedPhishEmail === "scam" ? "ceo-alert-urgency-desk@protonmail-office-update.xyz" : "accounts@authentic-firm-partner.com"}</span></div>
                <div>To: <span className="text-zinc-500">financial-wireteam@yourorg.com</span></div>
                <div className="border-t border-b py-2 my-2 font-semibold">
                  Subject: {selectedPhishEmail === "scam" ? "🚨 ACTION REQUIRED: IMMEDIATE TRANSIT SWIFT FOR M&A DECORUM" : "Invoice #8928: System Infrastructure Materials"}
                </div>
                
                {isPhishingChecked ? (
                  selectedPhishEmail === "scam" ? (
                    <p className="text-zinc-600 bg-rose-50 border border-rose-200 p-2.5 rounded leading-relaxed text-[11px]">
                      <strong className="text-rose-600">AI SEMANTIC SCARP FLAG:</strong> Urgent transactional language triggered. Synthesised with High Likelihood using GPT-4-Phish parameters. <strong className="text-rose-600">[REJECT ENTRY GATE]</strong>
                    </p>
                  ) : (
                    <p className="text-zinc-600 bg-emerald-50 border border-emerald-200 p-2.5 rounded leading-relaxed text-[11px]">
                      <strong className="text-emerald-600">SECURE PASS:</strong> Verified supplier purchase protocol aligned. EXIF and DKIM keys match verified server list.
                    </p>
                  )
                ) : (
                  <p className="text-zinc-400 italic">
                    Click "Audit Content Semantics" above to check signature alignment and detect malicious semantic cues.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: AIVERSE GUARDIAN PERSONAL AGENT */}
        {activeTab === "guardian" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Module: AiVerse Guardian Assistant
              </span>
              <h4 className="text-xl font-display font-semibold text-zinc-900">
                Personal AI Protection Assistant
              </h4>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Meet your personal brand guardian. Command the AI to sweep TikTok reels, biometrics databases, and unauthorized deepfakes of your personnel.
              </p>

              <div className="space-y-2 pt-4">
                <span className="text-[10px] font-mono text-zinc-400 font-bold block">PRESCRIPTED ENQUIRY DEMOS:</span>
                <button
                  disabled={isChatProcessing}
                  onClick={() => sendGuardianMessage("Is someone unauthorized copying my personal brand or face on TikTok?")}
                  className="w-full text-left p-2.5 border rounded-lg text-[11px] text-zinc-700 hover:bg-zinc-50 transition"
                >
                  "Check if someone is utilizing my face in fake video campaigns."
                </button>
                <button
                  disabled={isChatProcessing}
                  onClick={() => sendGuardianMessage("Run biometrics protection sweep and file takedowns.")}
                  className="w-full text-left p-2.5 border rounded-lg text-[11px] text-zinc-700 hover:bg-zinc-50 transition"
                >
                  "Initiate automated takedown sweeps of cloned materials."
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 bg-zinc-50 border border-zinc-200 p-4 rounded-xl flex flex-col justify-between min-h-[300px]">
              {/* Chat Viewport */}
              <div className="flex-1 space-y-3 overflow-y-auto max-h-[220px] pb-4">
                {guardianChat.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed ${
                      msg.sender === "user" 
                        ? "bg-blue-600 text-white" 
                        : "bg-white border text-zinc-800"
                    }`}>
                      {msg.text}

                      {/* Optional Interactive tags and checklists */}
                      {msg.list && (
                        <div className="mt-2 pt-2 border-t border-zinc-100 space-y-1">
                          {msg.list.map((recom, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-blue-600 font-medium font-mono text-[10px]">
                              <span className="h-1 w-1 rounded-full bg-blue-600" />
                              <span>{recom}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {msg.tags && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {msg.tags.map((tg, i) => (
                            <span key={i} className="text-[9px] font-mono tracking-wider px-1.5 py-0.5 rounded bg-rose-50 text-rose-600 font-semibold uppercase">
                              {tg}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isChatProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-white border rounded-xl p-3 flex items-center gap-2 text-xs text-zinc-400 font-mono">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Deep sweeping files...
                    </div>
                  </div>
                )}
              </div>

              {/* Chat input box */}
              <div className="border-t pt-3 flex items-center gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Ask Sentinel Guardian to track synthetic items..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendGuardianMessage()}
                  className="flex-1 bg-white border px-3 py-2 rounded-lg text-xs outline-none focus:border-blue-400 font-mono"
                />
                <button
                  onClick={() => sendGuardianMessage()}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <Send className="w-4 h-4 fill-white" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: ENTERPRISE & GOVT SHOWCASE */}
        {activeTab === "executive" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-mono bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Module: Corporate & State Governance Hub
              </span>
              <h4 className="text-xl font-display font-semibold text-zinc-900">
                Mission-Control Corporate Security Dashboard
              </h4>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Protect global organizations and public sectors from election deepfakes, disinformation cascades, staff credential malware, and unauthorized brand phishing.
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 border rounded-xl bg-zinc-50 text-center">
                  <span className="block text-zinc-400 font-mono text-[9px]">ELECTION THREATS STOPPED</span>
                  <strong className="text-lg font-bold text-zinc-800">1,240 cases</strong>
                </div>
                <div className="p-3 border rounded-xl bg-zinc-50 text-center">
                  <span className="block text-zinc-400 font-mono text-[9px]">ENTERPRISES COVERED</span>
                  <strong className="text-lg font-bold text-blue-600">4,800 orgs</strong>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-zinc-50 border border-zinc-200.60 p-6 rounded-2xl flex flex-col justify-between">
              <div className="flex items-center gap-2 justify-between pb-3 border-b border-zinc-200 text-xs font-mono">
                <span className="text-zinc-600">Sovereign State & Company Shield</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> ELECTION SECURITY READY
                </span>
              </div>

              <div className="space-y-2.5 my-4">
                <div className="flex items-center justify-between p-3 bg-white border rounded-lg text-xs leading-normal font-mono shadow-sm">
                  <div>
                    <strong className="block text-zinc-800">State Election Disinfo Cascade Isolated</strong>
                    <span className="text-[10px] text-zinc-400">Targeting Berlin Municipal Balloting narratives</span>
                  </div>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[10px]">VERIFIED OK</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white border rounded-lg text-xs leading-normal font-mono shadow-sm">
                  <div>
                    <strong className="block text-zinc-800">Executive CEO Audio Impersonation Blocked</strong>
                    <span className="text-[10px] text-zinc-400">Attempted wire authorization fake isolated in Sandbox v4</span>
                  </div>
                  <span className="font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded text-[10px]">MITIGATED</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white border rounded-lg text-xs leading-normal font-mono shadow-sm">
                  <div>
                    <strong className="block text-zinc-800">Fake Website Clone Takedown Active</strong>
                    <span className="text-[10px] text-zinc-400">DNS registry alerted automatically for scam domain takedown</span>
                  </div>
                  <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-[10px]">ACTIVE TASK</span>
                </div>
              </div>

              <span className="text-[11px] font-mono text-zinc-400 text-center">
                Certified compliance with international sovereignty records, EU AI act parameters, and SOC2/ISO27001 requirements.
              </span>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

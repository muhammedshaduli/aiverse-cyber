import { useState, useMemo, ChangeEvent } from "react";
import { 
  ShieldCheck, ShieldAlert, ArrowLeft, RefreshCw, Search, Sparkles, User, Users,
  MessageSquare, Radio, Calendar, Info, Globe, Cpu, MapPin, Layers, Server, Activity, 
  ExternalLink, CheckCircle, AlertTriangle, Play, Flame, Check, HelpCircle, AlertOctagon, 
  FileText, Send, Lock, Eye, Trash, Ban, Download, Share2,
  Twitter, Instagram, Facebook, Linkedin, Youtube, Ghost, Music, Bot, AtSign,
  Grid, Film, Bookmark, Heart, Mail, Link2, Award, Shield, MoreHorizontal, Repeat
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ModuleSecurityGateway from "./ModuleSecurityGateway";

// Platform Account model layout
export interface AccountDetail {
  id: string;
  platform: string;
  username: string;
  displayName: string;
  avatarSeed: string;
  bio: string;
  followers: number;
  following: number;
  postCount: number;
  riskScore: number; // 0 - 100
  verdict: "genuine" | "bot" | "clone" | "scam";
  riskDetails: string[];
  anomalies: {
    syntheticFaceProb: number;
    behavioralAutomation: number;
    coordinatedInauthentic: number;
    temporalJitterIndex: number;
  };
  geographicOrigin: string;
  registrationDate: string;
  postingCadence: number[]; // 24 values
  recentPosts: {
    id: string;
    text: string;
    timestamp: string;
    engagement: string;
    isGenerativeFlag: boolean;
    generativeDetails?: string;
  }[];
}

// Helper to get real Lucide icons for each social platform
export function getPlatformIcon(id: string, className = "w-4 h-4") {
  switch (id) {
    case "twitter":
      return <Twitter className={`${className} text-sky-450`} />;
    case "instagram":
      return <Instagram className={`${className} text-pink-400`} />;
    case "tiktok":
      return <Music className={`${className} text-teal-400`} />;
    case "facebook":
      return <Facebook className={`${className} text-blue-500`} />;
    case "linkedin":
      return <Linkedin className={`${className} text-blue-400`} />;
    case "reddit":
      return <Bot className={`${className} text-orange-500`} />;
    case "youtube":
      return <Youtube className={`${className} text-red-500`} />;
    case "discord":
      return <MessageSquare className={`${className} text-indigo-400`} />;
    case "telegram":
      return <Send className={`${className} text-sky-400`} />;
    case "threads":
      return <AtSign className={`${className} text-slate-350`} />;
    case "snapchat":
      return <Ghost className={`${className} text-yellow-400`} />;
    default:
      return <Globe className={className} />;
  }
}

// List of all current major worldwide social media platforms
const WORLDWIDE_PLATFORMS = [
  { id: "twitter", name: "X (formerly Twitter)", desc: "Microblogging, active bots and botnet clusters" },
  { id: "instagram", name: "Instagram", desc: "Visual media, synthetic faces, influencer clones" },
  { id: "tiktok", name: "TikTok", desc: "Short video, deepfake vocal overlays, video sync scams" },
  { id: "facebook", name: "Facebook", desc: "Social discovery, coordinate fake news profiles" },
  { id: "linkedin", name: "LinkedIn", desc: "Professional network, fake recruiters, AI executive clones" },
  { id: "reddit", name: "Reddit", desc: "Aggregator hubs, automated vote manipulation pools" },
  { id: "youtube", name: "YouTube", desc: "Video portal, synthetic commentary, fake livestream streams" },
  { id: "discord", name: "Discord", desc: "Private server networks, coordinated sybil raiders" },
  { id: "telegram", name: "Telegram", desc: "Encrypted messaging, clone support bots, phishing vectors" },
  { id: "threads", name: "Threads", desc: "Text-based engagement, automated activity mirroring" },
  { id: "snapchat", name: "Snapchat", desc: "Ephemeral chats, automated profile creators" },
  { id: "pinterest", name: "Pinterest", desc: "Visual curation arrays, affiliate redirection masking" },
  { id: "whatsapp", name: "WhatsApp", desc: "Bulk automated broadcast loops, custom malware relays" },
  { id: "wechat", name: "WeChat", desc: "Super-app ecosystems, targeted state profile mirroring" },
  { id: "mastodon", name: "Mastodon", desc: "Decentralized federation spam rigs and feed sync pools" },
  { id: "bluesky", name: "Bluesky", desc: "Protocol-driven microblogs, coordinated handle farms" },
  { id: "weibo", name: "Sina Weibo", desc: "Sina microblogging, automated post scrub bots" },
  { id: "line", name: "LINE Messenger", desc: "Direct threads, fake verified gift sweepstakes" },
  { id: "quora", name: "Quora", desc: "Q&A channels, automated low-quality GPT answers" },
  { id: "twitch", name: "Twitch", desc: "Live streams, view-count multiplier farm scripts" },
  { id: "tumblr", name: "Tumblr", desc: "Blogging arrays, timeline scrapers and automated reblog triggers" },
  { id: "medium", name: "Medium", desc: "Article publishing networks, synthesized AI columnists" }
];

export default function SocialFakeDetectorWorkspace({ onClose }: { onClose: () => void }) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("twitter");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [profileList, setProfileList] = useState<AccountDetail[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<AccountDetail | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isQuarantined, setIsQuarantined] = useState<Record<string, boolean>>({});
  const [isActionLogged, setIsActionLogged] = useState<string | null>(null);
  const [dossierMode, setDossierMode] = useState<"profile" | "data">("profile");

  // Core asynchronous live API forensic lookup engine
  const executeLiveForensicScan = async (queryVal: string, platformId: string) => {
    const trimmed = queryVal.trim();
    if (!trimmed) {
      setProfileList([]);
      setSelectedAccount(null);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const response = await fetch("/api/detect-fake-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: trimmed,
          platform: platformId,
        }),
      });

      if (!response.ok) {
        throw new Error("Target verification node responded with a non-optimal state.");
      }

      const decoded = await response.json();
      if (decoded && decoded.accounts) {
        setProfileList(decoded.accounts);
        // Automatically select the first generated account profile details
        if (decoded.accounts.length > 0) {
          setSelectedAccount(decoded.accounts[0]);
        } else {
          setSelectedAccount(null);
        }
      } else {
        throw new Error("Malformed telemetry data structure received.");
      }
    } catch (err: any) {
      console.error("Forensic scan error:", err);
      setSearchError("Temporal transmission jitter detected. Retrying search lookup...");
    } finally {
      setIsSearching(false);
    }
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);

    // If query has some text, trigger debounced dynamic model fetch
    if (val.trim().length > 1) {
      const timeoutId = setTimeout(() => {
        executeLiveForensicScan(val, selectedPlatform);
      }, 700);
      return () => clearTimeout(timeoutId);
    } else {
      setProfileList([]);
      setSelectedAccount(null);
    }
  };

  const handlePlatformSelect = (platId: string) => {
    setSelectedPlatform(platId);
    // Automatically trigger forensic scan on newly chosen platform if there is a target query
    if (searchQuery.trim()) {
      executeLiveForensicScan(searchQuery, platId);
    } else {
      setProfileList([]);
      setSelectedAccount(null);
    }
  };

  const handleAccountSelect = (acc: AccountDetail) => {
    setSelectedAccount(acc);
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  const triggerSecurityAction = (action: string) => {
    if (!selectedAccount) return;
    
    if (action === "quarantine") {
      setIsQuarantined(prev => ({ ...prev, [selectedAccount.id]: true }));
      setIsActionLogged(`Action Executed: Account ${selectedAccount.username} has been isolated in the local firewall database.`);
    } else {
      setIsActionLogged(`Report Transmitted: Incident submitted to NIST/UAE PDPL cybersecurity centers for ${selectedAccount.username}.`);
    }

    setTimeout(() => {
      setIsActionLogged(null);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between relative overflow-hidden bg-grid">
      
      {/* Dynamic Background visual glows */}
      <div className="absolute top-0 left-1/4 w-[450px] h-[450px] bg-blue-950/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-950/10 rounded-full blur-[140px] pointer-events-none" />

      {/* TOP HEADER */}
      <header className="border-b border-slate-900 bg-slate-950/85 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="w-full flex items-center justify-between">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition group bg-slate-900/50 border border-slate-800 px-3 py-2 rounded-lg cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Go Back to Landing page</span>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <span className="font-mono text-[10px] tracking-widest text-cyan-405 font-bold uppercase">
              COGNITIVE DEFENSE WORKSPACE
            </span>
          </div>
        </div>
      </header>

      {/* BODY CONTENT */}
      <main className="flex-1 w-full px-6 py-10 space-y-12 z-10 relative">
        
        {/* HERO TITLE BLOCK */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-805/50 text-indigo-300 text-xs font-semibold select-none">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span>Worldwide Multi-Platform Social Forensic Intel</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white leading-tight">
            Social Media <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">Fake Profile Detector</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed font-normal">
            Identify bots, cloned public figures, synthesized profile images, and malicious deepfake audio arrays across the global social media topology before they leak.
          </p>
        </div>

        {/* INTERACTIVE WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SELECTOR PORTAL (col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* STEP 1: SELECT PLATFORM CARD */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-500 to-indigo-600" />
              
              <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-slate-400 tracking-wider mb-4 border-b border-slate-800 pb-3">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>1. Select Worldwide Social Platform</span>
              </div>

              {/* Styled select dropdown for current platform */}
              <div className="relative">
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase block tracking-wider mb-2">
                  Active Platform Universe
                </label>
                <div className="relative select-none">
                  <select
                    value={selectedPlatform}
                    onChange={(e) => handlePlatformSelect(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-4 py-3 pl-11 text-xs font-mono focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all cursor-pointer appearance-none"
                  >
                    {WORLDWIDE_PLATFORMS.map((plat) => (
                      <option key={plat.id} value={plat.id} className="bg-slate-900 text-slate-300">
                        {plat.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute left-3.5 top-3.5 text-slate-400">
                    {getPlatformIcon(selectedPlatform, "w-4 h-4")}
                  </div>
                  <div className="absolute right-4 top-3.5 pointer-events-none text-slate-500">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {/* Dynamically display active description below */}
                <p className="mt-2.5 text-[9.5px] font-mono text-slate-500 flex items-center gap-1.5 leading-normal">
                  <Info className="w-3 h-3 text-cyan-400/85 flex-shrink-0" />
                  <span>
                    Detected Platform Vector Risk: {WORLDWIDE_PLATFORMS.find((p) => p.id === selectedPlatform)?.desc}
                  </span>
                </p>
              </div>
            </div>

            {/* STEP 2: SEARCH PROFILE AREA */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-slate-400 tracking-wider border-b border-slate-800 pb-3">
                <Search className="w-4 h-4 text-cyan-400" />
                <span>2. Search / Query Profile Name</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase block tracking-wider">
                    Target Username or Profile Name Part
                  </label>
                  {searchError && (
                    <span className="text-[9px] font-mono text-rose-400 font-bold">
                      Connection Delayed
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleQueryChange}
                      placeholder="Enter eg. elon_scam, realdonaldtrump, admin"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-4 py-3 pl-10 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all font-bold"
                    />
                    <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-3.5" />
                    
                    {isSearching && (
                      <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin absolute right-3.5 top-3.5" />
                    )}
                  </div>
                  
                  {/* Explicit Trigger Forensic Scan Button */}
                  <button
                    onClick={() => executeLiveForensicScan(searchQuery, selectedPlatform)}
                    disabled={isSearching || !searchQuery.trim()}
                    className="px-4 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-650 text-slate-950 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Scan</span>
                  </button>
                </div>

                <p className="text-[9.5px] text-slate-500 leading-normal font-mono">
                  💡 This applet queries a LIVE forensic node via Gemini. No cached mock profiles are utilized. Type any handle matching query criteria.
                </p>
              </div>

              {/* SEARCH RESULTS LIST */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block tracking-wider">
                    Search Results & Targets Listed ({profileList.length})
                  </span>
                  {isSearching && (
                    <span className="text-[8.5px] font-mono text-cyan-400 font-bold animate-pulse">
                      Analyzing Web Topology...
                    </span>
                  )}
                </div>

                <div className="space-y-2 max-h-[290px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                  {/* Dynamic Loader Display when querying model */}
                  {isSearching && profileList.length === 0 && (
                    <div className="p-6 bg-slate-950/60 border border-slate-850 rounded-xl space-y-3 flex flex-col items-center justify-center">
                      <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
                      <div className="text-center space-y-1">
                        <span className="text-[10px] font-mono font-black uppercase text-cyan-300 block tracking-wider animate-pulse">
                          Syncing Decoupled API Solvers...
                        </span>
                        <p className="text-[8.5px] font-mono text-slate-500 leading-relaxed max-w-[200px]">
                          Compiling image indicators, behavioral timelines & structural NLP pattern sets...
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Rendering active search items */}
                  {!isSearching && profileList.map((acc) => {
                    const isSecured = acc.riskScore < 30;
                    const isCritical = acc.riskScore > 75;

                    return (
                      <button
                        key={acc.id}
                        onClick={() => handleAccountSelect(acc)}
                        className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                          selectedAccount?.id === acc.id
                            ? "bg-slate-850 border-cyan-500/70 text-white shadow-md font-bold"
                            : "bg-slate-950/60 border-slate-850/80 hover:bg-slate-900 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Simulated Avatar Visual Core */}
                          <div className={`w-9 h-9 rounded-full border flex items-center justify-center font-bold text-xs select-none shadow-sm flex-shrink-0 ${
                            isSecured 
                              ? "bg-emerald-950/40 border-emerald-800/80 text-emerald-400" 
                              : isCritical 
                                ? "bg-rose-950/40 border-rose-800/80 text-rose-400" 
                                : "bg-amber-950/40 border-amber-800/80 text-amber-400"
                          }`}>
                            {acc.username.substring(0, 3).toUpperCase().replace("@", "")}
                          </div>

                          <div className="min-w-0 leading-none">
                            <span className="text-xs font-bold text-slate-100 block truncate leading-normal">
                              {acc.displayName}
                            </span>
                            <span className="font-mono text-[9px] text-slate-500 block truncate mt-0.5">
                              {acc.username}
                            </span>
                          </div>
                        </div>

                        {/* Status Label badge */}
                        <div className="text-right flex-shrink-0 ml-2">
                          <span className={`px-2 py-0.5 rounded text-[8.5px] font-mono font-black uppercase inline-block border ${
                            isSecured 
                              ? "bg-emerald-950/50 text-emerald-400 border-emerald-900" 
                              : isCritical 
                                ? "bg-rose-900/40 text-rose-400 border-rose-900 animate-pulse" 
                                : "bg-amber-950/50 text-amber-400 border-amber-900"
                          }`}>
                            {isSecured ? "GENUINE" : isCritical ? "SCAM ALERT" : acc.verdict.toUpperCase()}
                          </span>
                          <span className="block text-[8px] font-mono text-slate-500 mt-1">
                            Risk Index: {acc.riskScore}%
                          </span>
                        </div>
                      </button>
                    );
                  })}

                  {!isSearching && profileList.length === 0 && (
                    <div className="p-6 bg-slate-950/40 border border-slate-850/70 text-center rounded-xl font-mono text-[10px] text-slate-500 leading-relaxed">
                      {searchQuery ? (
                        <span>
                          No live specimens returned for "{searchQuery}". <br/>
                          <button 
                            onClick={() => executeLiveForensicScan(searchQuery, selectedPlatform)}
                            className="text-cyan-400 hover:underline font-bold mt-1.5 inline-block cursor-pointer"
                          >
                            Click to Force Trigger Dynamic AI Scan
                          </button>
                        </span>
                      ) : (
                        "Awaiting scan. Please enter a profile username handle above to query live nodes."
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT DETAILED AUDIT DOSSIER PANEL (col-span-7) */}
          <div className="lg:col-span-7">
            
            <AnimatePresence mode="wait">
              {selectedAccount ? (
                <motion.div
                  key={selectedAccount.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative space-y-6 overflow-hidden"
                >
                  
                  {/* Subtle top background highlight based on verdict status */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                    selectedAccount.riskScore < 30 ? "bg-emerald-500" : selectedAccount.riskScore > 75 ? "bg-rose-500 animate-pulse" : "bg-amber-500"
                  }`} />

                  {/* ACTION TRIGGER EXECUTED BANNER DISPLAY */}
                  {isActionLogged && (
                    <div className="bg-slate-950 border border-cyan-800/70 p-3 rounded-xl flex items-center gap-2.5 text-[10px] font-mono text-cyan-400 animate-pulse">
                      <Server className="w-4 h-4 text-cyan-400 animate-spin" />
                      <span>{isActionLogged}</span>
                    </div>
                  )}

                  {/* UNIFIED FORENSIC STATUS HEADER CARD */}
                  <div className="bg-slate-950/65 border border-slate-850 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl border ${
                        selectedAccount.riskScore < 30 
                          ? "bg-emerald-950/30 border-emerald-800/80 text-emerald-400" 
                          : selectedAccount.riskScore > 75 
                            ? "bg-rose-950/40 border-rose-800/80 text-rose-400 animate-pulse" 
                            : "bg-amber-950/30 border-amber-800/80 text-amber-400"
                      }`}>
                        {selectedAccount.riskScore < 30 ? (
                          <ShieldCheck className="w-6 h-6 text-emerald-400" />
                        ) : selectedAccount.riskScore > 75 ? (
                          <ShieldAlert className="w-6 h-6 text-rose-400" />
                        ) : (
                          <Activity className="w-6 h-6 text-amber-405" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold leading-none">
                            Intelligence Verdict
                          </span>
                        </div>
                        <h3 className={`text-sm font-bold font-mono tracking-tight mt-1 ${
                          selectedAccount.riskScore < 30 ? "text-emerald-400" : selectedAccount.riskScore > 75 ? "text-rose-400" : "text-amber-400"
                        }`}>
                          {selectedAccount.riskScore < 30 ? "VERIFIED GENUINE ACCOUNT" : selectedAccount.riskScore > 75 ? "ALERT: FRAUD PROFILE RIG" : `SUSPICIOUS ${selectedAccount.verdict.toUpperCase()}`}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-left sm:text-right">
                      <div className="font-mono">
                        <span className="text-[9px] text-slate-500 uppercase block leading-none mb-1">Risk Score Index</span>
                        <span className="text-xl font-bold tracking-tight text-white block">
                          {selectedAccount.riskScore}%
                        </span>
                      </div>
                      <div className="w-[1px] h-8 bg-slate-800" />
                      <div className="font-mono">
                        <span className="text-[9px] text-slate-500 uppercase block leading-none mb-1">Signal Confidence</span>
                        <span className="text-xl font-bold tracking-tight text-white block">
                          {(100 - selectedAccount.riskScore).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* COGNITIVE TAB SELECTORS */}
                  <div className="flex gap-1.5 p-1 bg-slate-950/70 border border-slate-850 rounded-xl">
                    <button
                      onClick={() => setDossierMode("profile")}
                      className={`flex-1 py-2.5 px-3 rounded-lg text-center text-xs font-mono font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                        dossierMode === "profile"
                          ? "bg-slate-850 text-cyan-300 shadow-md border-cyan-805/35"
                          : "text-slate-500 hover:text-slate-300 border-transparent"
                      }`}
                    >
                      <User className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Social Profile Layout</span>
                    </button>
                    <button
                      onClick={() => setDossierMode("data")}
                      className={`flex-1 py-2.5 px-3 rounded-lg text-center text-xs font-mono font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                        dossierMode === "data"
                          ? "bg-slate-850 text-cyan-300 shadow-md border-cyan-805/35"
                          : "text-slate-500 hover:text-slate-300 border-transparent"
                      }`}
                    >
                      <Activity className="w-3.5 h-3.5 text-cyan-405 animate-pulse" />
                      <span>Dossier Metrics Summary</span>
                    </button>
                  </div>

                  {/* TAB CONTENT BLOCK CONTAINER */}
                  <div className="space-y-6">
                    {dossierMode === "profile" ? (
                      selectedAccount.platform === "instagram" ? (
                        /* INSTAGRAM HIGH FIDELITY MOCK PROFILE SECTION */
                        <div className="bg-slate-950/45 p-5 rounded-3xl border border-slate-850/80 space-y-6">
                          {/* IG Header representation */}
                          <div className="flex flex-col md:flex-row gap-5 items-start md:items-center pb-5 border-b border-slate-850/60">
                            
                            {/* Instagram Story Gradient Ring around Profile Icon */}
                            <div className="relative mx-auto md:mx-0 flex-shrink-0">
                              <div className={`p-[3px] rounded-full bg-gradient-to-tr ${
                                selectedAccount.riskScore < 30 
                                  ? "from-emerald-550 via-teal-400 to-green-500" 
                                  : selectedAccount.riskScore > 75 
                                    ? "from-rose-600 via-pink-600 to-orange-500" 
                                    : "from-amber-500 via-yellow-405 to-orange-400"
                              }`}>
                                <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-950 flex items-center justify-center font-bold text-2xl text-white">
                                  {selectedAccount.username.substring(1, 3).toUpperCase()}
                                </div>
                              </div>
                              {selectedAccount.riskScore > 75 && (
                                <span className="absolute bottom-0 right-0 bg-rose-650 text-white p-1 rounded-full text-[10px] font-bold border border-slate-955 shadow">
                                  ⚠️
                                </span>
                              )}
                            </div>

                            {/* IG Username group and metrics */}
                            <div className="flex-1 space-y-3.5 w-full">
                              <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                                <h2 className="text-lg font-bold text-white tracking-tight">
                                  {selectedAccount.username}
                                </h2>
                                
                                {selectedAccount.riskScore < 30 && (
                                  <CheckCircle className="w-4 h-4 text-sky-450 fill-sky-400" title="Instagram Verified Check" />
                                )}

                                {selectedAccount.riskScore > 75 && (
                                  <span className="px-2 py-0.5 bg-rose-950 border border-rose-900 text-rose-450 text-[8px] font-mono font-black uppercase rounded-full">
                                    SUSPECTED IMPOSTOR
                                  </span>
                                )}
                                
                                <div className="flex items-center gap-1.5 ml-2">
                                  <button className="px-5 py-1.5 bg-slate-800 hover:bg-slate-750 transition-all font-semibold text-xs text-slate-100 rounded-lg cursor-pointer">
                                    Follow
                                  </button>
                                  <button className="px-5 py-1.5 bg-slate-800 hover:bg-slate-750 transition-all font-semibold text-xs text-slate-100 rounded-lg cursor-pointer">
                                    Message
                                  </button>
                                  <button className="p-1.5 bg-slate-800 hover:bg-slate-750 rounded-lg text-slate-300">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              {/* Followers & Following horizontal metrics */}
                              <div className="flex items-center justify-around md:justify-start gap-8 font-sans text-xs border-y md:border-y-0 border-slate-900 py-2.5 md:py-0">
                                <div>
                                  <span className="font-bold text-white pr-1">{selectedAccount.postCount}</span> 
                                  <span className="text-slate-400">posts</span>
                                </div>
                                <div>
                                  <span className="font-bold text-white pr-1">
                                    {selectedAccount.followers >= 1000000 
                                      ? `${(selectedAccount.followers / 1000000).toFixed(1)}M` 
                                      : selectedAccount.followers >= 1000 
                                        ? `${(selectedAccount.followers / 1000).toFixed(1)}K` 
                                        : selectedAccount.followers}
                                  </span> 
                                  <span className="text-slate-400">followers</span>
                                </div>
                                <div>
                                  <span className="font-bold text-white pr-1">{selectedAccount.following.toLocaleString()}</span> 
                                  <span className="text-slate-400">following</span>
                                </div>
                              </div>

                              {/* IG Display Name, Bio description with links */}
                              <div className="text-xs space-y-1.5 text-center md:text-left leading-relaxed">
                                <h3 className="font-bold text-slate-200">{selectedAccount.displayName}</h3>
                                <p className="text-slate-350 italic">"{selectedAccount.bio}"</p>
                                <span className="text-sky-400 inline-flex items-center gap-1 font-semibold">
                                  <Link2 className="w-3 h-3 text-sky-400" />
                                  <span>linktr.ee/{selectedAccount.username.replace("@", "")}_official</span>
                                </span>
                              </div>
                            </div>

                          </div>

                          {/* Story Highlights mockup circles */}
                          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-850">
                            <div className="flex flex-col items-center gap-1 flex-shrink-0">
                              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-400 p-0.5 hover:border-slate-700 transition">
                                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-lg">🎁</div>
                              </div>
                              <span className="text-[9px] font-mono text-slate-400">Giveaways</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 flex-shrink-0">
                              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-400 p-0.5 hover:border-slate-700 transition">
                                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-lg">📢</div>
                              </div>
                              <span className="text-[9px] font-mono text-slate-400">Promo</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 flex-shrink-0">
                              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-400 p-0.5 hover:border-slate-700 transition">
                                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-lg">✅</div>
                              </div>
                              <span className="text-[9px] font-mono text-slate-400">Proofs</span>
                            </div>
                          </div>

                          {/* Grid Tabs selection header */}
                          <div className="flex justify-center border-t border-slate-900 pt-1 text-slate-400">
                            <div className="flex items-center gap-1 text-[10px] font-mono font-bold tracking-wider uppercase py-3 border-t border-white text-white px-8">
                              <Grid className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Posts</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-mono font-bold tracking-wider uppercase py-3 text-slate-500 px-8">
                              <Film className="w-3.5 h-3.5" />
                              <span>Reels</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-mono font-bold tracking-wider uppercase py-3 text-slate-500 px-8">
                              <Bookmark className="w-3.5 h-3.5" />
                              <span>Saved</span>
                            </div>
                          </div>

                          {/* Beautiful instagram grid layout of posts */}
                          <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                            {Array.from({ length: 6 }).map((_, i) => {
                              const post = selectedAccount.recentPosts[i % selectedAccount.recentPosts.length];
                              const gradColors = selectedAccount.riskScore > 75 
                                ? ["from-rose-950/80 to-slate-955", "from-red-950/60 to-slate-900", "from-slate-955 to-orange-955/70"]
                                : ["from-indigo-950/70 to-slate-955", "from-emerald-955/60 to-slate-900/40", "from-slate-955 to-cyan-955/20"];
                              const selectedGrad = gradColors[i % gradColors.length];
                              
                              return (
                                <div 
                                  key={i} 
                                  className={`relative aspect-square rounded-lg border border-slate-900 bg-gradient-to-br ${selectedGrad} p-3 flex flex-col justify-between overflow-hidden group hover:border-slate-700 transition duration-205 cursor-pointer`}
                                >
                                  <div className="flex justify-between items-start">
                                    <span className="text-[7.5px] font-mono text-slate-600 block leading-tight">#IG_0{i+1}</span>
                                    {selectedAccount.riskScore > 75 && post.isGenerativeFlag ? (
                                      <span className="px-1.5 py-0.5 bg-rose-900 text-rose-300 font-bold font-mono text-[6.5px] rounded border border-rose-800 animate-pulse">
                                        AI FRAUD
                                      </span>
                                    ) : selectedAccount.riskScore < 30 ? (
                                      <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-300 font-bold font-mono text-[6.5px] rounded border border-emerald-850">
                                        VERIFIED
                                      </span>
                                    ) : (
                                      <span className="px-1.5 py-0.5 bg-slate-800 text-slate-404 font-bold font-mono text-[6.5px] rounded">
                                        PROXIED
                                      </span>
                                    )}
                                  </div>

                                  <p className="text-[8.5px] text-slate-300 leading-normal line-clamp-3 select-none mb-1 group-hover:text-white transition">
                                    {post.text}
                                  </p>

                                  <div className="flex items-center justify-between text-[7.5px] font-mono text-slate-500 border-t border-slate-900/60 pt-1">
                                    <span className="flex items-center gap-0.5 leading-none">
                                      <Heart className="w-2.5 h-2.5 text-rose-500 animate-pulse" /> 
                                      {Math.floor(selectedAccount.followers * 0.04 - i * 15).toLocaleString().split(".")[0]}
                                    </span>
                                    <span className="leading-none">
                                      💬 {Math.floor(selectedAccount.followers * 0.005 - i * 2).toLocaleString().split(".")[0]}
                                    </span>
                                  </div>

                                  {/* Deep details float panel on hover */}
                                  <div className="absolute inset-0 bg-slate-950/95 flex flex-col justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center space-y-2">
                                    <span className="text-[10px] font-mono font-bold text-cyan-300 block">Forensic Scan Output</span>
                                    <p className="text-[8.5px] text-slate-350 leading-relaxed line-clamp-4">
                                      "{post.text}"
                                    </p>
                                    <div className="border-t border-slate-900 pt-1.5">
                                      <span className={`text-[7px] font-mono px-1.5 py-0.5 rounded leading-none ${post.isGenerativeFlag ? "bg-rose-950 text-rose-400" : "bg-slate-900 text-slate-400"}`}>
                                        {post.isGenerativeFlag ? `GEN AI DETECTED: ${post.generativeDetails || "FLAGGED"}` : "Unaltered Human signature"}
                                      </span>
                                    </div>
                                  </div>

                                </div>
                              );
                            })}
                          </div>

                        </div>
                      ) : (
                        /* TWITTER / X HIGH FIDELITY MOCK PROFILE SECTION */
                        <div className="bg-slate-955 rounded-3xl border border-slate-850/80 overflow-hidden space-y-4 pb-5">
                          {/* Wide cover banner */}
                          <div className="h-28 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-950 relative">
                            <div className="absolute inset-0 bg-grid opacity-20" />
                            <span className="absolute top-2.5 right-3.5 px-2 py-0.5 bg-slate-950/80 text-[7.5px] font-mono rounded text-slate-400 font-bold border border-slate-900">
                              ACTIVE CAPTURE LOGS
                            </span>
                          </div>

                          {/* Avatar Overlapping */}
                          <div className="px-5 -mt-11 relative flex justify-between items-end">
                            <div className="w-18 h-18 rounded-full bg-slate-950 border-4 border-slate-900 p-0.5 relative">
                              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center font-bold text-lg text-slate-300">
                                {selectedAccount.username.substring(0, 3).toUpperCase().replace("@", "")}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button className="px-4 py-1.5 border border-slate-800 hover:bg-slate-900 rounded-full text-xs font-bold text-slate-203 transition">
                                Message
                              </button>
                              <button className="px-4 py-1.5 bg-white hover:bg-slate-100 text-slate-950 rounded-full text-xs font-black transition">
                                Follow
                              </button>
                            </div>
                          </div>

                          {/* Account details, metadata */}
                          <div className="px-5 space-y-3">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h3 className="text-base font-bold text-white tracking-tight leading-none">{selectedAccount.displayName}</h3>
                                {selectedAccount.riskScore < 30 && (
                                  <CheckCircle className="w-4 h-4 text-sky-450 fill-sky-400" />
                                )}
                              </div>
                              <span className="text-xs font-mono text-slate-500 block">{selectedAccount.username}</span>
                            </div>

                            <p className="text-xs text-slate-350 leading-relaxed font-sans">"{selectedAccount.bio}"</p>

                            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] font-mono text-slate-500 border-b border-slate-900 pb-3">
                              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-cyan-400" /> {selectedAccount.geographicOrigin}</span>
                              <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-500" /> Joined {selectedAccount.registrationDate}</span>
                            </div>

                            <div className="flex gap-4 text-xs font-sans">
                              <span><strong className="text-white font-bold">{selectedAccount.following.toLocaleString()}</strong> <span className="text-slate-500">Following</span></span>
                              <span><strong className="text-white font-bold">{selectedAccount.followers >= 1000000 ? `${(selectedAccount.followers / 1000000).toFixed(1)}M` : selectedAccount.followers.toLocaleString()}</strong> <span className="text-slate-500">Followers</span></span>
                            </div>
                          </div>

                          {/* Twitter timeline tabs */}
                          <div className="flex border-t border-slate-900 text-center text-xs font-bold text-slate-500">
                            <span className="flex-1 py-3 text-cyan-404 border-b-2 border-cyan-500">Posts</span>
                            <span className="flex-1 py-3">Replies</span>
                            <span className="flex-1 py-3">Media</span>
                            <span className="flex-1 py-3">Likes</span>
                          </div>

                          {/* Timeline Tweet posts listing */}
                          <div className="px-5 space-y-3 pt-2">
                            {selectedAccount.recentPosts.map((post) => (
                              <div key={post.id} className="p-3 bg-slate-900/65 border border-slate-850/60 rounded-xl space-y-2 relative hover:border-slate-700 transition">
                                <div className="flex justify-between items-center text-[8.5px] font-mono text-slate-500">
                                  <span className="font-bold text-slate-350">{selectedAccount.displayName}</span>
                                  <span>{post.timestamp}</span>
                                </div>
                                <p className="text-xs text-slate-203 leading-normal font-sans">
                                  {post.text}
                                </p>
                                
                                <div className="flex justify-between items-center border-t border-slate-900/60 pt-2 text-[8px] font-mono text-slate-500">
                                  <span>{post.engagement}</span>
                                  {post.isGenerativeFlag && (
                                    <span className="text-rose-455 font-bold animate-pulse leading-none">
                                      ⚠️ AI COGNITIVE SIGNATURE PRESENT
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                        </div>
                      )
                    ) : (
                      /* FORENSIC DETAILED DATA WORKSPACE SUMMARY */
                      <div className="space-y-6">
                        
                        {/* SECTION 2: BIOMETRIC SCORE METERS */}
                        <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-4">
                          <span className="text-[9px] font-mono tracking-widest text-slate-400 font-bold uppercase block border-b border-slate-900 pb-2">
                            Cognitive Evaluation Metrics
                          </span>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                            {/* Metric 1 */}
                            <div className="space-y-1.5">
                              <div className="flex justify-between text-[9px] font-mono text-slate-400">
                                <span>Synthetic Face / Generative Image Prob</span>
                                <span className={selectedAccount.anomalies.syntheticFaceProb > 50 ? "text-rose-450 font-bold" : "text-emerald-400"}>
                                  {selectedAccount.anomalies.syntheticFaceProb}%
                                </span>
                              </div>
                              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                <div 
                                  style={{ width: `${selectedAccount.anomalies.syntheticFaceProb}%` }}
                                  className={`h-full rounded-full ${selectedAccount.anomalies.syntheticFaceProb > 50 ? "bg-rose-500" : "bg-emerald-500"}`}
                                />
                              </div>
                            </div>

                            {/* Metric 2 */}
                            <div className="space-y-1.5">
                              <div className="flex justify-between text-[9px] font-mono text-slate-400">
                                <span>Behavioral Scripting / NLP Automation</span>
                                <span className={selectedAccount.anomalies.behavioralAutomation > 50 ? "text-rose-450 font-bold" : "text-emerald-400"}>
                                  {selectedAccount.anomalies.behavioralAutomation}%
                                </span>
                              </div>
                              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                <div 
                                  style={{ width: `${selectedAccount.anomalies.behavioralAutomation}%` }}
                                  className={`h-full rounded-full ${selectedAccount.anomalies.behavioralAutomation > 50 ? "bg-rose-500" : "bg-emerald-500"}`}
                                />
                              </div>
                            </div>

                            {/* Metric 3 */}
                            <div className="space-y-1.5">
                              <div className="flex justify-between text-[9px] font-mono text-slate-400">
                                <span>Coordinated Inauthentic Behavior Index</span>
                                <span className={selectedAccount.anomalies.coordinatedInauthentic > 50 ? "text-rose-450 font-bold" : "text-emerald-400"}>
                                  {selectedAccount.anomalies.coordinatedInauthentic}%
                                </span>
                              </div>
                              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                <div 
                                  style={{ width: `${selectedAccount.anomalies.coordinatedInauthentic}%` }}
                                  className={`h-full rounded-full ${selectedAccount.anomalies.coordinatedInauthentic > 50 ? "bg-rose-500" : "bg-emerald-500"}`}
                                />
                              </div>
                            </div>

                            {/* Metric 4 */}
                            <div className="space-y-1.5">
                              <div className="flex justify-between text-[9px] font-mono text-slate-400">
                                <span>Temporal Network Jitter / Frequency Score</span>
                                <span className={selectedAccount.anomalies.temporalJitterIndex > 50 ? "text-cyan-400 font-bold" : "text-slate-400"}>
                                  {selectedAccount.anomalies.temporalJitterIndex}%
                                </span>
                              </div>
                              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                <div 
                                  style={{ width: `${selectedAccount.anomalies.temporalJitterIndex}%` }}
                                  className="h-full rounded-full bg-cyan-500"
                                />
                              </div>
                            </div>

                          </div>
                        </div>

                        {/* SECTION 3: RECENT ACTIVITY POSTS SUMMARY */}
                        <div className="space-y-3">
                          <span className="text-[9px] font-mono tracking-widest text-slate-500 font-bold uppercase block border-b border-slate-900 pb-2">
                            Technical Session Meta Registers
                          </span>
                          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                            <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl">
                              <span className="text-slate-500 block text-[9.5px]">ORIGIN HOST ADDRESS</span>
                              <strong className="text-slate-300 block">{selectedAccount.geographicOrigin}</strong>
                            </div>
                            <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl">
                              <span className="text-slate-500 block text-[9.5px]">FIRST CAPTURED INDEX</span>
                              <strong className="text-slate-300 block">{selectedAccount.registrationDate}</strong>
                            </div>
                          </div>
                        </div>

                        {/* SECTION 4: HISTORICAL POSTING CADENCE CHART */}
                        <div className="space-y-2.5">
                          <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-slate-400 font-bold uppercase border-b border-slate-800 pb-2">
                            <span>24-Hour Automated Posting Density Rate</span>
                            <span className={selectedAccount.riskScore > 70 ? "text-rose-450 font-bold animate-pulse" : "text-emerald-400"}>
                              {selectedAccount.riskScore > 70 ? "POTENTIAL 24H LIVE BATCHING CYCLE" : "HUMAN CADENCE"}
                            </span>
                          </div>

                          <div className="h-16 bg-slate-955 rounded-xl p-3 flex items-end justify-between gap-[3.5px] border border-slate-855/80 relative overflow-hidden">
                            <div className="absolute inset-x-0 top-3 h-[1px] bg-slate-900/50 border-dashed border-b border-slate-900" />
                            <div className="absolute inset-x-0 bottom-6 h-[1px] bg-slate-900/50 border-dashed border-b border-slate-900" />

                            {selectedAccount.postingCadence.map((height, idx) => {
                              const isHighlyAutomated = selectedAccount.riskScore > 70 && height > 60;
                              return (
                                <div key={idx} className="flex-1 flex flex-col justify-end h-full relative group">
                                  <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${height}%` }}
                                    transition={{ delay: idx * 0.01, duration: 0.5, ease: "easeOut" }}
                                    className={`w-full rounded-t-sm transition-all duration-300 relative ${
                                      isHighlyAutomated 
                                        ? "bg-rose-500 shadow-sm shadow-rose-900/40" 
                                        : selectedAccount.riskScore < 30 
                                          ? "bg-emerald-500/70 hover:bg-emerald-400"
                                          : "bg-indigo-500/50 hover:bg-indigo-400"
                                    }`}
                                  />
                                  <div className="absolute opacity-0 group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-1 bg-slate-950 border border-slate-800 px-1 py-0.5 rounded text-[7px] font-mono text-slate-330 pointer-events-none z-30 font-bold leading-none">
                                    {height}%
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex justify-between items-center text-[7.5px] font-mono text-slate-550">
                            <span>00:00 (Midnight UTC)</span>
                            <span>12:00 (Noon Peak)</span>
                            <span>23:59 (Cycle reset)</span>
                          </div>
                        </div>

                        {/* SECTION 5: SIGNATURES CHECKLIST */}
                        <div className="bg-slate-955/70 p-4 border border-slate-800/80 rounded-2xl space-y-3">
                          <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-slate-400 block border-b border-slate-900 pb-2">
                            Incidence Risk Verdict & Signatures
                          </span>

                          <ul className="space-y-2 font-mono text-[9.5px]">
                            {selectedAccount.riskDetails.map((detail, dIdx) => (
                              <li key={dIdx} className="flex items-start gap-2 text-slate-300 leading-normal">
                                {selectedAccount.riskScore > 75 ? (
                                  <AlertOctagon className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                                ) : selectedAccount.riskScore < 30 ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                ) : (
                                  <Info className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                                )}
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>
                    )}
                  </div>

                  {/* COGNITIVE ACTION BUTTONS AREA TRACES OVERALL CONTROL (VISIBLE IN BOTH MODES) */}
                  <div className="border-t border-slate-800 pt-4 space-y-2">
                    <span className="text-[8.5px] font-mono uppercase text-slate-500 tracking-wider font-bold block">
                      Shield Actions Management
                    </span>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {/* Action 1: Quarantine */}
                      <button
                        onClick={() => triggerSecurityAction("quarantine")}
                        disabled={isQuarantined[selectedAccount.id]}
                        className={`flex-1 py-3 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition cursor-pointer border ${
                          isQuarantined[selectedAccount.id]
                            ? "bg-slate-950 border-slate-850 text-slate-655 cursor-not-allowed"
                            : "bg-gradient-to-r from-red-650 to-rose-650 text-white border-red-700/50 hover:opacity-90 shadow-md shadow-red-950/20"
                        }`}
                      >
                        <Ban className="w-4 h-4" />
                        <span>{isQuarantined[selectedAccount.id] ? "Account Quarantined // isolated" : "Quarantine & Block account"}</span>
                      </button>

                      {/* Action 2: Transmit official report */}
                      <button
                        onClick={() => triggerSecurityAction("report")}
                        className="flex-1 py-3 px-4 bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-mono text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 rounded-xl transition cursor-pointer"
                      >
                        <Send className="w-4 h-4 text-cyan-400" />
                        <span>Transmit incident to UAE-PDPL</span>
                      </button>
                    </div>
                  </div>

                </motion.div>
              ) : (
                <div className="h-full min-h-[450px] bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col justify-center items-center text-center space-y-4">
                  <Globe className="w-12 h-12 text-slate-600 animate-pulse" />
                  <strong className="text-slate-300 text-sm font-mono uppercase tracking-wider block">
                    No Selected Social Profile Specimen
                  </strong>
                  <p className="text-slate-500 text-xs max-w-sm leading-relaxed">
                    Select any platform on the left matching card suite, and query or click a mapped user profile to trigger cognitive threat telemetry details.
                  </p>
                </div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-6 px-6 font-mono text-[9px] text-slate-500">
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>AI-VERSE TRUST ENGINE // CERTIFICATION INCUMBENT 2026</span>
          <div className="flex gap-4">
            <span className="text-emerald-500">NIST STANDARDS ALIGNED</span>
            <span>UAE PDPL CLOUD INGRESS DEPLOYMENT</span>
            <span>SECURE CRYPTOGRAPHIC BOUNDARY CONFIRMED</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

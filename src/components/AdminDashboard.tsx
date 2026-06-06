import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, Cpu, Key, Database, ChevronRight, Activity, 
  Settings, Power, AlertTriangle, Play, RefreshCw, X, Search, Filter, 
  BarChart, Download, Plus, Server, LayoutDashboard, Sliders, CheckCircle, 
  LogOut, ShieldAlert, BadgeCheck, FileWarning, HelpCircle,
  Globe, Smartphone, MapPin, Wifi, Share2, Compass, Crosshair, Radio, Network, Terminal,
  Heart, MessageCircle, Users, ArrowLeft, Volume2, Lock, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AdminDashboardProps {
  onClose: () => void;
}

interface ApiKey {
  id: string;
  name: string;
  token: string;
  status: "active" | "suspended";
  rateLimit: number; // requests per minute
  scansMade: number;
  threatsCaught: number;
}

interface IngestLog {
  id: string;
  timestamp: string;
  specimenName: string;
  type: "image" | "voice" | "video" | "email";
  score: number;
  status: "authentic" | "manipulated";
  model: string;
  clientAppName: string;
}

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"operations" | "credentials" | "policies" | "ledger" | "tracking">("tracking");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "image" | "voice" | "video" | "email">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "authentic" | "manipulated">("all");

  // --- FORENSIC INTEL TRACKING STATES ---
  const [trackingCategory, setTrackingCategory] = useState<"social" | "whatsapp" | "website" | "phone_ip" | "internet_ip" | "gps">("social");
  const [trackingTarget, setTrackingTarget] = useState("");
  const [isScanningTracker, setIsScanningTracker] = useState(false);
  const [scanningProgress, setScanningProgress] = useState(0);
  const [activeScanSignal, setActiveScanSignal] = useState<string | null>(null);

  // Social account trace mock database
  const [socialTraces, setSocialTraces] = useState([
    { 
      username: "@insta_deep_clone", 
      platform: "Instagram profile", 
      riskLevel: "High", 
      originCountry: "United Kingdom", 
      nodeIp: "82.165.19.45", 
      isLinkedToSpoof: true, 
      matchedBiometric: "Midjourney Raster Signature", 
      reportId: "SOC-TR-8812",
      fullName: "Marc Walder (Impersonator)",
      bio: "CEO & Publisher @ Ringier Group. Innovation, Media & Digital Assets leadership. Swiss-based Global Executive. For secret direct inquiries DM directly.",
      followers: "18.2K",
      following: "402",
      postsCount: 6,
      avatarColor: "bg-indigo-950 border-pink-500",
      isLiveScraping: true,
      syntheticRatio: 94,
      verifiedBadge: false,
      lastSeen: "12 min ago",
      platformType: "instagram",
      posts: [
        { id: 1, type: "image", src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=60", text: "Proud to present our newest liquid core assets dashboard at European Capital Summit 2026. Swiss delegation in London. #fintech", time: "18 min ago", likes: "1.2K", comments: "41", fingerprint: "Midjourney GenV6 Pattern Coordinates MATCH (98.4%)" },
        { id: 2, type: "image", src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=60", text: "Operations headquarters in Zurich continuing scale. Accessing secondary ledger assets is our prime objective.", time: "5 hrs ago", likes: "890", comments: "22", fingerprint: "Focal plane distortion detected. Source camera tags stripped." },
        { id: 3, type: "image", src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=60", text: "Evening discussions regarding cross-border banking tokens with major Swiss stakeholders.", time: "1 day ago", likes: "2.4K", comments: "182", fingerprint: "GAN synthesis artifacts match around facial region bounds." }
      ],
      networkTrace: [
        { node: "Proxy Node: London Broadband Edge", status: "Injected Header", delay: "22ms" },
        { node: "VPN: ServerGroup-UK-7", status: "Active Trace Spoof", delay: "16ms" }
      ]
    },
    { 
      username: "@x_leak_source", 
      platform: "X/Twitter", 
      riskLevel: "Critical", 
      originCountry: "Switzerland", 
      nodeIp: "45.138.16.22", 
      isLinkedToSpoof: true, 
      matchedBiometric: "Audio Hash Match EL-19", 
      reportId: "SOC-TR-9102",
      fullName: "Sovereign Swiss Leaks Info",
      bio: "Uncovering corporate financial corridors. Sharing executive voicemails and board transcripts from Geneva & Basel. Cryptographically verified files.",
      followers: "44.9K",
      following: "12",
      postsCount: 142,
      avatarColor: "bg-slate-900 border border-slate-705",
      isLiveScraping: true,
      syntheticRatio: 88,
      verifiedBadge: true,
      lastSeen: "7 min ago",
      platformType: "x",
      posts: [
        { id: 1, type: "audio", text: "🚨 ALERT: Audio leak from closed board session confirming asset liquidation. Spectrogram analysis indicates direct Elevenlabs generation flow.", time: "12 min ago", likes: "1.4K", comments: "209", fingerprint: "ElevenLabs Voice Swap Signature Match 99.1%" },
        { id: 2, type: "text", text: "All corporate audits are spoofed. Official PDF certificates linked in Bio are using pre-signed keys.", time: "2 hrs ago", likes: "890", comments: "45", fingerprint: "LLM Narrative Injection Pattern" },
        { id: 3, type: "text", text: "Swiss National Cyber response plans for multi-sig failures are fully outdated. We have established permanent intercept channels.", time: "1 day ago", likes: "2.1K", comments: "189", fingerprint: "Unnatural linguistic cadence match" }
      ],
      networkTrace: [
        { node: "VPN: Proton Switzerland", status: "Secure", delay: "12ms" },
        { node: "Tor Relay: Swiss-Backbone-Alpha", status: "Untraceable", delay: "48ms" },
        { node: "Target Server IP: Switzerland (Geneva)", status: "Active Intercept", delay: "6ms" }
      ]
    },
    { 
      username: "@tg_shadow_claims", 
      platform: "Telegram Channel", 
      riskLevel: "High", 
      originCountry: "Zurich VPN Node", 
      nodeIp: "109.202.107.199", 
      isLinkedToSpoof: true, 
      matchedBiometric: "Voice Clone ID V2-A", 
      reportId: "SOC-TR-1404",
      fullName: "Shadow Asset Claims",
      bio: "Encrypted gateway channel for Swiss private bankers. Distributing deep-audio memo archives and unauthorized escrow settlement guidelines. Join VIP bot.",
      followers: "105.1K",
      following: "0",
      postsCount: 19,
      avatarColor: "bg-cyan-600",
      isLiveScraping: true,
      syntheticRatio: 74,
      verifiedBadge: false,
      lastSeen: "2 min ago",
      platformType: "telegram",
      posts: [
        { id: 1, type: "voice_note", fileTitle: "cfo_emergency_board_brief.ogg", bytes: "1.4 MB", text: "🔊 VOICE TRANSMISSION SECURED: Voice deepfake directive for emergency liquid allocation bypassing Basel security protocol.", time: "5 min ago", likes: "4.8K", comments: "122", fingerprint: "Voice clone signature match (Confidence 96%)" },
        { id: 2, type: "image", src: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=400&auto=format&fit=crop&q=60", text: "Cloned admin panel image shared to demonstrate access. EXIF metadata contains fabricated focal parameters.", time: "1 day ago", likes: "12.1K", comments: "405", fingerprint: "Generative canvas pattern coordinates match" }
      ],
      networkTrace: [
        { node: "Telegram CDN Proxy", status: "Secure Relay", delay: "8ms" },
        { node: "ISP: Zürich Telecom Services LLC", status: "Monitored", delay: "14ms" },
        { node: "Tor Entry: Tor-Router-CH-82", status: "Egress Bypass", delay: "35ms" }
      ]
    },
    { 
      username: "@meta_press_agent", 
      platform: "Facebook Meta Space", 
      riskLevel: "Low", 
      originCountry: "France", 
      nodeIp: "194.254.120.4", 
      isLinkedToSpoof: false, 
      matchedBiometric: "N/A - Clean Origin", 
      reportId: "SOC-TR-0044",
      fullName: "Sovereign Press Agency CH",
      bio: "Official verification press portal for Swiss financial corridors and cyber defense regulatory framework insights. Certified journalistic channel.",
      followers: "2.1K",
      following: "891",
      postsCount: 530,
      avatarColor: "bg-slate-800 border-indigo-700",
      isLiveScraping: false,
      syntheticRatio: 1.2,
      verifiedBadge: true,
      lastSeen: "4 hrs ago",
      platformType: "facebook",
      posts: [
        { id: 1, type: "image", src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=60", text: "Press Briefing: Federal Cyber Security office releases strict protocols for executive-level voice authentication standards and deepfake audit systems.", time: "4 hrs ago", likes: "89", comments: "4", fingerprint: "Authentic Camera Signature. Safe Certified SSL." },
        { id: 2, type: "text", text: "Deep dive report into social engineering tactics representing Swiss executive identity theft vectors. Validated legacy credentials verified.", time: "3 days ago", likes: "112", comments: "15", fingerprint: "N/A - Legitimate Editorial Team" }
      ],
      networkTrace: [
        { node: "Meta CDN Paris Core", status: "Verified Root IP", delay: "4ms" },
        { node: "DNS: Switzerland Cloudflare Resolver", status: "Safe Clean Zone", delay: "8ms" }
      ]
    },
  ]);

  // Website clones mock database
  const [websiteTraces, setWebsiteTraces] = useState([
    { domain: "swiss-union-bank-security.com", suspectUrl: "http://swiss-union-bank-security.com/login", trackingState: "Quarantined", certificateRoot: "Let's Encrypt Spoof Certificate", cloneType: "Interactive Login Phish", riskScore: 98.4, redirectIp: "185.112.144.12" },
    { domain: "zurich-ai-gateway-renewals.net", suspectUrl: "https://zurich-ai-gateway-renewals.net/pay", trackingState: "Active Tracker Inline", certificateRoot: "Self-signed Untrusted Root", cloneType: "API Key Harvesting UI", riskScore: 94.1, redirectIp: "91.240.118.89" },
    { domain: "bbc-news-executive-interview.co", domainAgeDays: 4, trackingState: "Takedown Order Placed", certificateRoot: "Cloudflare Spoof Shield", cloneType: "Sora Artificial News Reel Hub", riskScore: 89.2, redirectIp: "193.109.244.15" },
  ]);

  // WhatsApp forensic analysis database
  const [whatsappChats, setWhatsappChats] = useState([
    { sender: "+41 78 910 24 55", alias: "Suspected Swiss Bank CEO Clone", riskVerdict: "Manipulated Voicemail Injection", groupTarget: "Executive Multi-Sig Transfer Board", dateTrace: "2026-06-06 18:02:11", totalPayloads: 4, isMitigated: true, signalPower: "88% matching spoof signature" },
    { sender: "+44 7911 123456", alias: "Claimed Reuters UK Desk", riskVerdict: "Synthetic Audio Phish Message", groupTarget: "Zurich PR Broadcast Hub", dateTrace: "2026-06-06 17:15:40", totalPayloads: 2, isMitigated: false, signalPower: "92% ElevenLabs match" },
    { sender: "+1 (555) 0192-349", alias: "Anonymous whistleblower", riskVerdict: "Secure Validated Voice Biometric", groupTarget: "Confidential Forensic Ingestion Node", dateTrace: "2026-06-06 14:02:12", totalPayloads: 1, isMitigated: true, signalPower: "99.4% Verified Physical Mic Shape" },
  ]);

  // Phone cellular / IP Tracker state database
  const [phoneTraces, setPhoneTraces] = useState([
    { phoneNum: "+41 78 910 24 55", targetCarrier: "Swisscom", signalCellId: "ZUR-CENT-Tower 89B", lastActiveIp: "179.43.155.101", reverseDns: "host-101.swiss-vpn-node.com", ispHost: "Core Backbone Zurich-A", gpsLon: "8.5417", gpsLat: "47.3769", precisionMeters: 4 },
    { phoneNum: "+44 7911 123456", targetCarrier: "Vodafone UK", signalCellId: "LON-SHORE-Tower 11", lastActiveIp: "82.165.19.45", reverseDns: "crawler.vodafone-partner.net", ispHost: "Vodafone United Kingdom", gpsLon: "-0.1278", gpsLat: "51.5074", precisionMeters: 12 },
    { phoneNum: "+1 (555) 0192-349", targetCarrier: "T-Mobile USA", signalCellId: "NYC-MANH-Tower 402", lastActiveIp: "72.229.28.185", reverseDns: "dynamic-nyc.tmobile.com", ispHost: "T-Mobile USA Edge Fiber", gpsLon: "-74.0060", gpsLat: "40.7128", precisionMeters: 3 },
  ]);

  // General internet IP Tracking state database
  const [internetIps, setInternetIps] = useState([
    { ip: "179.43.155.101", allocation: "Swiss Secure Hosting LLC", connectionType: "Virtual Private Server (VPS)", activityLog: "Batch payload requests through API Key av_shk_4eac8927f8a1", country: "Switzerland", threatScore: 92 },
    { ip: "109.112.44.89", allocation: "Comcast Commercial", connectionType: "Fiber Subscriber Node", activityLog: "Continuous admin console probing logs", country: "United States", threatScore: 45 },
    { ip: "185.112.144.12", allocation: "Belgrade Bulk Dialup Host", connectionType: "Dynamic Residential Proxy Pool", activityLog: "Website logins credential forwarding route", country: "Serbia", threatScore: 99 },
  ]);

  // GPS navigation interactive target state
  const [gpsSelectedPoint, setGpsSelectedPoint] = useState({ lat: "47.3769", lon: "8.5417", place: "Zurich, Switzerland Central Exchange", status: "Secured Node", signalDb: "-42 dBm" });

  // System statistics states (live simulation)
  const [cpuUsage, setCpuUsage] = useState(48.2);
  const [requestsPerSec, setRequestsPerSec] = useState(128.5);
  const [apiLatency, setApiLatency] = useState(42);
  const [activeNodes, setActiveNodes] = useState(14);
  const [totalScans, setTotalScans] = useState(48120610);
  const [threatsIsolated, setThreatsIsolated] = useState(1951430);

  // Dynamic state for policies & triggers
  const [biometricSThreshold, setBiometricSThreshold] = useState(65);
  const [rasterTolerance, setRasterTolerance] = useState(40);
  const [emailPoisonAlert, setEmailPoisonAlert] = useState(55);
  const [isNistAutoCert, setIsNistAutoCert] = useState(true);
  const [isSoc2ScrubField, setIsSoc2ScrubField] = useState(true);
  const [isAutoShuntUpstream, setIsAutoShuntUpstream] = useState(false);

  // Active selected social identity for live forensic profile view
  const [activeSocialProfile, setActiveSocialProfile] = useState<any | null>(null);

  // Active selected post inside social profile for pixel/voice deconstruction
  const [activePostInspect, setActivePostInspect] = useState<any | null>(null);

  // Api Keys State
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { id: "key-1", name: "Zurich HQ Core Gateway", token: "av_shk_4eac8927f8a1...", status: "active", rateLimit: 600, scansMade: 1420500, threatsCaught: 48900 },
    { id: "key-2", name: "Mobile App Client Production", token: "av_shk_1289dfb38e0c...", status: "active", rateLimit: 1200, scansMade: 29801000, threatsCaught: 1042300 },
    { id: "key-3", name: "Corporate Legal Archives Hub", token: "av_shk_90bca2d8f99e...", status: "active", rateLimit: 300, scansMade: 450100, threatsCaught: 1200 },
    { id: "key-4", name: "Finance Intercept Endpoint", token: "av_shk_7fe023c59cf0...", status: "active", rateLimit: 450, scansMade: 8219000, threatsCaught: 549500 },
    { id: "key-5", name: "APAC External Partner Sandbox", token: "av_shk_fa201bcfc8e1...", status: "suspended", rateLimit: 100, scansMade: 89000, threatsCaught: 840 },
  ]);

  // Modal key creator state
  const [isNewKeyOpen, setIsNewKeyOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyRate, setNewKeyRate] = useState(300);

  // Verified Logs State
  const [logs, setLogs] = useState<IngestLog[]>([
    { id: "log-1", timestamp: "2026-06-06 17:42:01", specimenName: "pres_speech.wav", type: "voice", score: 3.2, status: "manipulated", model: "ElevenLabs Voice V2", clientAppName: "Mobile App Client Production" },
    { id: "log-2", timestamp: "2026-06-06 16:15:33", specimenName: "cfo_corporate.jpg", type: "image", score: 98.4, status: "authentic", model: "Original Camera Metadata", clientAppName: "Zurich HQ Core Gateway" },
    { id: "log-3", timestamp: "2026-06-06 15:02:12", specimenName: "finance_report.eml", type: "email", score: 12.8, status: "manipulated", model: "PhishGPT-4 v2", clientAppName: "Finance Intercept Endpoint" },
    { id: "log-4", timestamp: "2026-06-06 14:22:45", specimenName: "ceo_press_briefing.mp4", type: "video", score: 2.1, status: "manipulated", model: "Sora Video Engine Alpha", clientAppName: "Mobile App Client Production" },
    { id: "log-5", timestamp: "2026-06-06 12:05:59", specimenName: "audit_manifest_v2.jpg", type: "image", score: 99.1, status: "authentic", model: "Original Camera Metadata", clientAppName: "Corporate Legal Archives Hub" },
    { id: "log-6", timestamp: "2026-06-05 23:59:11", specimenName: "board_room_briefing.eml", type: "email", score: 87.5, status: "authentic", model: "SMTP Node Direct Hash", clientAppName: "Zurich HQ Core Gateway" },
    { id: "log-7", timestamp: "2026-06-05 21:11:42", specimenName: "marketing_spot_en.mp4", type: "video", score: 4.8, status: "manipulated", model: "Runway Gen-3 Engine", clientAppName: "Mobile App Client Production" },
    { id: "log-8", timestamp: "2026-06-05 19:04:15", specimenName: "exec_voice_mail.wav", type: "voice", score: 96.5, status: "authentic", model: "SIP Secure Biometrics", clientAppName: "Zurich HQ Core Gateway" },
  ]);

  // Expand log row
  const [selectedLogDetails, setSelectedLogDetails] = useState<IngestLog | null>(null);

  // Live telemetry stream simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.min(100, Math.max(10, +(prev + (Math.random() * 6 - 3)).toFixed(1))));
      setRequestsPerSec(prev => Math.min(250, Math.max(50, +(prev + (Math.random() * 12 - 6)).toFixed(1))));
      setApiLatency(prev => Math.min(120, Math.max(15, +(prev + (Math.random() * 4 - 2)).toFixed(0))));
      setTotalScans(prev => prev + Math.floor(Math.random() * 8 + 1));
      
      if (Math.random() > 0.85) {
        setThreatsIsolated(prev => prev + 1);
        // Add dynamic log occasionally
        const types: IngestLog["type"][] = ["voice", "image", "video", "email"];
        const selectedType = types[Math.floor(Math.random() * 4)];
        const isMal = Math.random() > 0.4;
        const score = isMal ? +(Math.random() * 15).toFixed(1) : +(Math.random() * 30 + 70).toFixed(1);
        const models = {
          voice: ["ElevenLabs Engine", "VALL-E Synthesizer"],
          image: ["Stable Diffusion XL", "Midjourney v6", "Original Camera"],
          video: ["Sora DeepVideo", "Hedra AI Studio"],
          email: ["PhishGPT-4", "Direct Node SMTP"]
        };
        const activeModelLst = models[selectedType];
        const modelName = isMal ? activeModelLst[0] : activeModelLst[activeModelLst.length - 1];
        
        const newLog: IngestLog = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
          specimenName: `live_stream_${Math.floor(Math.random() * 899 + 100)}.${selectedType === "voice" ? "wav" : selectedType === "video" ? "mp4" : selectedType === "email" ? "eml" : "jpg"}`,
          type: selectedType,
          score,
          status: isMal ? "manipulated" : "authentic",
          model: modelName,
          clientAppName: "Mobile App Client Production"
        };
        setLogs(prev => [newLog, ...prev.slice(0, 19)]);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // Filter logs list
  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.specimenName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          log.clientAppName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || log.type === typeFilter;
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Action: Toggles Key Active/Inactive status
  const toggleKeyStatus = (id: string) => {
    setApiKeys(prev => prev.map(k => {
      if (k.id === id) {
        return { ...k, status: k.status === "active" ? "suspended" : "active" };
      }
      return k;
    }));
  };

  // Action: Changes key rate limit
  const handleRateLimitChange = (id: string, limit: number) => {
    setApiKeys(prev => prev.map(k => {
      if (k.id === id) {
        return { ...k, rateLimit: limit };
      }
      return k;
    }));
  };

  // Action: Generates a new API Key
  const createApiKeyToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const hash = Array.from({length: 12}, () => Math.floor(Math.random()*16).toString(16)).join("");
    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      name: newKeyName,
      token: `av_shk_${hash}cef09df...`,
      status: "active",
      rateLimit: newKeyRate,
      scansMade: 0,
      threatsCaught: 0,
    };

    setApiKeys(prev => [...prev, newKey]);
    setNewKeyName("");
    setIsNewKeyOpen(false);
  };

  // Action: Exports logs list
  const handleExportLogs = () => {
    const content = JSON.stringify(filteredLogs, null, 2);
    const blob = new Blob([content], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `aiverse_governance_admin_logs_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Action: Simulates custom high-precision OSINT Signal analysis sweep
  const handleStartTrackingScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingTarget.trim()) return;

    setIsScanningTracker(true);
    setScanningProgress(5);
    setActiveScanSignal("Securing Administrative Gateway Socket Tunnel...");

    const progressInterval = setInterval(() => {
      setScanningProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const step = Math.floor(Math.random() * 20 + 20);
        const next = Math.min(100, prev + step);
        
        if (next < 30) {
          setActiveScanSignal("Broadcasting reverse-resolver recursive DNS query...");
        } else if (next < 60) {
          setActiveScanSignal("Mapping open-source biometric matching vectors...");
        } else if (next < 90) {
          setActiveScanSignal("Contacting physical Basel sovereign cellular tower cluster...");
        } else {
          setActiveScanSignal("Assembling signal logs & producing Cryptographic Hash Block...");
        }

        return next;
      });
    }, 400);

    setTimeout(() => {
      setIsScanningTracker(false);
      setScanningProgress(0);
      setActiveScanSignal(null);

      const target = trackingTarget.trim();
      const now = new Date().toISOString().replace('T', ' ').slice(0, 19);

      if (trackingCategory === "social") {
        const handleValue = target.startsWith("@") ? target : `@${target.toLowerCase()}`;
        const cleanTarget = target.toLowerCase();
        const displayAlias = target.replace("@", "").split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        const randomIp = `185.${Math.floor(Math.random()*150 + 50)}.${Math.floor(Math.random()*200 + 10)}.${Math.floor(Math.random()*254 + 1)}`;
        const reportIdVal = `SOC-TR-${Math.floor(Math.random()*9000 + 1000)}`;
        
        // Detect likely platform type based on keywords
        const isInstagram = cleanTarget.includes("insta") || cleanTarget.includes("gram") || Math.random() > 0.67;
        const isTelegram = cleanTarget.includes("tg") || cleanTarget.includes("tele") || cleanTarget.includes("shadow") || Math.random() > 0.5;
        const assignedPlatform = isInstagram ? "Instagram profile" : isTelegram ? "Telegram Channel" : "X/Twitter";
        const assignedPlatformType = isInstagram ? "instagram" : isTelegram ? "telegram" : "x";

        const newTrace = {
          username: handleValue,
          platform: assignedPlatform,
          riskLevel: Math.random() > 0.4 ? "Critical" : "High",
          originCountry: "Switzerland (Secured)",
          nodeIp: randomIp,
          isLinkedToSpoof: true,
          matchedBiometric: "Audio Hash Match EL-19",
          reportId: reportIdVal,
          fullName: `${displayAlias} (Investigated Unit)`,
          bio: `OSINT automated scan of ${handleValue} on ${assignedPlatform}. Target is propagating unverified executive briefings under sovereign mimicking headers.`,
          followers: `${(Math.random() * 25 + 5).toFixed(1)}K`,
          following: `${Math.floor(Math.random() * 500 + 50)}`,
          postsCount: Math.floor(Math.random() * 8 + 3),
          avatarColor: "bg-emerald-950 border-emerald-500",
          isLiveScraping: true,
          syntheticRatio: Math.floor(Math.random() * 25 + 70),
          verifiedBadge: Math.random() > 0.5,
          lastSeen: "Just now",
          platformType: assignedPlatformType,
          posts: [
            { id: 1, type: "text", text: `Emergency directive compiled for ${handleValue}. Verify all biometric hash keys before running any escrow payouts.`, time: "1 min ago", likes: "124", comments: "12", fingerprint: "LLM prompted syntactic mimicry (94.2% match)" },
            { id: 2, type: "image", src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop&q=60", text: `Zurich financial core networks monitoring update. Verified multi-loop infrastructure is secure.`, time: "1 hr ago", likes: "89", comments: "3", fingerprint: "Focal grain patterns match known Midjourney noise channels." }
          ],
          networkTrace: [
            { node: "Active OSINT Capture Node", status: "Connected", delay: "15ms" },
            { node: `Proxy Gateway: ${randomIp}`, status: "Direct Log Tap", delay: "24ms" }
          ]
        };

        setSocialTraces(prev => [newTrace, ...prev]);
        setActiveSocialProfile(newTrace);
      } else if (trackingCategory === "website") {
        setWebsiteTraces(prev => [
          {
            domain: target.toLowerCase(),
            suspectUrl: `https://${target.toLowerCase()}/forensic-mirror-inspect`,
            trackingState: "Active Real-Time Audit",
            certificateRoot: "Self-Signed Scam Cert Authority",
            cloneType: "Executive Cloned Asset Portal",
            riskScore: +(Math.random() * 15 + 85).toFixed(1),
            redirectIp: `45.138.${Math.floor(Math.random()*100 + 20)}.${Math.floor(Math.random()*254)}`
          },
          ...prev
        ]);
      } else if (trackingCategory === "whatsapp") {
        setWhatsappChats(prev => [
          {
            sender: target,
            alias: "Queried Broadcast Account",
            riskVerdict: "Mass Viral Deepfake Audio Share",
            groupTarget: "External Corporate Stakeholders Forum",
            dateTrace: now,
            totalPayloads: Math.floor(Math.random() * 8 + 3),
            isMitigated: false,
            signalPower: "Voice synthetic clone mismatch verified"
          },
          ...prev
        ]);
      } else if (trackingCategory === "phone_ip") {
        setPhoneTraces(prev => [
          {
            phoneNum: target,
            targetCarrier: "Dynamic Roaming Edge",
            signalCellId: `ZUR-CELL-CATCH-${Math.floor(Math.random()*900 + 100)}`,
            lastActiveIp: `179.43.${Math.floor(Math.random()*150 + 100)}.${Math.floor(Math.random()*254)}`,
            reverseDns: "dynamic-host-lease.security-core.ch",
            ispHost: "Sovereign Swiss Intercept Core",
            gpsLon: (8.54 + Math.random() * 0.1 - 0.05).toFixed(4),
            gpsLat: (47.37 + Math.random() * 0.1 - 0.05).toFixed(4),
            precisionMeters: Math.floor(Math.random() * 10 + 1)
          },
          ...prev
        ]);
      } else if (trackingCategory === "internet_ip") {
        setInternetIps(prev => [
          {
            ip: target,
            allocation: "Identified Dedicated VPN Host",
            connectionType: "Hosting VPN / Tor Relay Node",
            activityLog: "Query scan bursts directed at secure admin endpoints",
            country: "Global Proxied Subnet",
            threatScore: Math.floor(Math.random() * 30 + 70)
          },
          ...prev
        ]);
      } else if (trackingCategory === "gps") {
        const coords = target.split(",");
        const lat = coords[0] ? coords[0].trim() : "47.3769";
        const lon = coords[1] ? coords[1].trim() : "8.5417";
        setGpsSelectedPoint({
          lat,
          lon,
          place: "Manual GPS Coords Override Pinpoint",
          status: "Triangulated Active GPS Target Node",
          signalDb: `-${Math.floor(Math.random() * 45 + 35)} dBm`
        });
      }

      setTrackingTarget("");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-950 text-slate-100 z-50 flex flex-col md:flex-row overflow-hidden font-sans select-none">
      
      {/* SIDE CONTROL NAVIGATION RAIL */}
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between flex-shrink-0">
        <div className="flex flex-col">
          {/* Dashboard Title Branding */}
          <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-900/30">
                <ShieldCheck className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div>
                <strong className="text-sm font-bold tracking-tight text-white block leading-none">
                  AiVerse Admin
                </strong>
                <span className="text-[8px] font-mono font-bold text-blue-500 block uppercase tracking-widest mt-0.5">
                  SECURITY CONSOLE
                </span>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="md:hidden p-1 bg-slate-800 rounded text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav Rail Buttons list */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-1.5 text-[8.5px] font-mono text-slate-505 uppercase font-bold tracking-widest">
              Core Modules
            </div>

            <button
              onClick={() => setActiveTab("operations")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold font-mono tracking-tight transition cursor-pointer ${
                activeTab === "operations" 
                  ? "bg-slate-800 text-white border border-slate-700/80 font-bold" 
                  : "text-slate-400 hover:text-slate-100"
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-blue-500" />
              <span>Operations Panel</span>
            </button>

            <button
              onClick={() => setActiveTab("credentials")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold font-mono tracking-tight transition cursor-pointer ${
                activeTab === "credentials" 
                  ? "bg-slate-800 text-white border border-slate-700/80 font-bold" 
                  : "text-slate-400 hover:text-slate-100"
              }`}
            >
              <Key className="w-4 h-4 text-indigo-400" />
              <span>API Gateway Keys</span>
              <span className="ml-auto text-[8px] font-sans bg-slate-950 font-bold px-1.5 py-0.2 border border-slate-800 rounded-full text-slate-400">
                {apiKeys.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("policies")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold font-mono tracking-tight transition cursor-pointer ${
                activeTab === "policies" 
                  ? "bg-slate-800 text-white border border-slate-700/80 font-bold" 
                  : "text-slate-400 hover:text-slate-100"
              }`}
            >
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Threshold Policies</span>
            </button>

            <button
              onClick={() => setActiveTab("ledger")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold font-mono tracking-tight transition cursor-pointer ${
                activeTab === "ledger" 
                  ? "bg-slate-800 text-white border border-slate-700/80 font-bold" 
                  : "text-slate-400 hover:text-slate-100"
              }`}
            >
              <Database className="w-4 h-4 text-emerald-450" />
              <span>Verification Ledger</span>
              <span className="ml-auto text-[9px] font-sans bg-slate-950 font-black text-emerald-400 px-1.5 py-0.2 border border-slate-800/80 rounded">
                LIVE
              </span>
            </button>

            <button
              onClick={() => setActiveTab("tracking")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold font-mono tracking-tight transition cursor-pointer ${
                activeTab === "tracking" 
                  ? "bg-slate-800 text-white border border-slate-700/80 font-bold" 
                  : "text-slate-400 hover:text-slate-100"
              }`}
            >
              <Compass className="w-4 h-4 text-rose-500 animate-spin-slow" />
              <span>Forensic Tracking</span>
              <span className="ml-auto text-[9px] font-sans bg-rose-950 font-semibold text-rose-400 px-1.5 py-0.2 border border-rose-900/50 rounded animate-pulse">
                INTEL
              </span>
            </button>
          </nav>
        </div>

        {/* Footer Area with exit link */}
        <div className="p-4 border-t border-slate-800/60 bg-slate-950/60 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 font-bold">NODE INTEGRITY</span>
            <span className="text-emerald-500 text-[10px] font-mono font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              SECURED SHA-256
            </span>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-[10px] uppercase font-mono font-bold bg-slate-800 hover:bg-rose-900 border border-slate-700/60 px-3 py-1.5 hover:text-white rounded-lg transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Exit
          </button>
        </div>
      </aside>

      {/* HEADER & MAIN CONTAINER WORKSPACE */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* TOP LIVE SYSTEM META RECONNAISSANCE STRIP */}
        <header className="p-5 border-b border-slate-900 bg-slate-950/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 flex-shrink-0">
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold tracking-tight text-white font-mono flex items-center gap-2">
              <Server className="w-4.5 h-4.5 text-blue-500" />
              Corporate Executive Security Console
            </h2>
            <p className="text-xs text-slate-500">
              Live parallel machine learning pipelines analysis & API gateway shunts controls.
            </p>
          </div>

          {/* Quick Stats Meters Row */}
          <div className="flex gap-4 scrollbar-none overflow-x-auto w-full md:w-auto">
            {/* Meter 1: Queries CPU */}
            <div className="bg-slate-900 p-2 border border-slate-850 rounded-xl flex items-center gap-2.5 min-w-[125px] font-mono select-none">
              <div className="w-1 h-8 bg-blue-600 rounded"></div>
              <div>
                <span className="text-[8px] text-slate-550 uppercase font-bold block leading-none">CPU THREAD LOGIC</span>
                <strong className="text-xs text-slate-205">{cpuUsage.toFixed(1)}%</strong>
              </div>
            </div>

            {/* Meter 2: Ingress TPS */}
            <div className="bg-slate-900 p-2 border border-slate-850 rounded-xl flex items-center gap-2.5 min-w-[125px] font-mono select-none">
              <div className="w-1 h-8 bg-indigo-500 rounded"></div>
              <div>
                <span className="text-[8px] text-slate-550 uppercase font-bold block leading-none">INGRESS LATENCY</span>
                <strong className="text-xs text-slate-205">{apiLatency} ms</strong>
              </div>
            </div>

            {/* Meter 3: Secured Nodes */}
            <div className="bg-slate-900 p-2 border border-slate-850 rounded-xl flex items-center gap-2.5 min-w-[125px] font-mono select-none">
              <div className="w-1 h-8 bg-cyan-400 rounded"></div>
              <div>
                <span className="text-[8px] text-slate-550 uppercase font-bold block leading-none">SECURE DIRECT NODES</span>
                <strong className="text-xs text-slate-205">{activeNodes} Global</strong>
              </div>
            </div>
          </div>
        </header>

        {/* WORKSPACE CONTENTS */}
        <section className="flex-1 p-6 space-y-6">
          
          {/* TAB CONTENT A: OPERATIONS PANEL */}
          {activeTab === "operations" && (
            <div className="space-y-6">
              {/* Dynamic Counters Dials Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
                <div className="bg-slate-900 border border-slate-850 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-slate-450 uppercase block">Total Scans Audit Trail</span>
                    <strong className="text-2xl font-mono tracking-tight text-white block mt-1">
                      {totalScans.toLocaleString()}
                    </strong>
                    <span className="text-[8.5px] text-emerald-500 font-bold block font-mono">↑ 14.5% INGEST RATE</span>
                  </div>
                  <Database className="w-9 h-9 text-slate-700" />
                </div>

                <div className="bg-slate-900 border border-slate-850 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-slate-450 uppercase block">AI Threat Vectors Intercepted</span>
                    <strong className="text-2xl font-mono tracking-tight text-rose-500 block mt-1">
                      {threatsIsolated.toLocaleString()}
                    </strong>
                    <span className="text-[8.5px] text-rose-450 font-bold block font-mono">↑ 3.2% THIS HOUR</span>
                  </div>
                  <ShieldAlert className="w-9 h-9 text-rose-950" />
                </div>

                <div className="bg-slate-900 border border-slate-850 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-slate-450 uppercase block">Current Load Volume</span>
                    <strong className="text-2xl font-mono tracking-tight text-blue-450 block mt-1">
                      {requestsPerSec.toFixed(1)}/s
                    </strong>
                    <span className="text-[8.5px] text-slate-500 block font-mono font-bold">142/s peak limits</span>
                  </div>
                  <Activity className="w-9 h-9 text-blue-900/40 animate-pulse" />
                </div>

                <div className="bg-slate-900 border border-slate-850 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-slate-450 uppercase block">Active Gateway Rules</span>
                    <strong className="text-2xl font-mono tracking-tight text-cyan-450 block mt-1">
                      24 Active
                    </strong>
                    <span className="text-[8.5px] text-emerald-500 block font-mono font-bold">99.8% CERT CONFIDENCE</span>
                  </div>
                  <Settings className="w-9 h-9 text-slate-700" />
                </div>
              </div>

              {/* Bespoke Interactive Charts Segment */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Visualizer 1: Central Requests/s Ingress Rate spline layout */}
                <div className="bg-slate-900 rounded-2xl border border-slate-850 p-5 lg:col-span-2 space-y-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                    <div>
                      <span className="text-[9px] font-mono text-slate-505 uppercase tracking-widest block font-bold">Real-Time Ingestion Traffic</span>
                      <strong className="text-xs text-white">Requests/Hour Spline Analytics Matrix</strong>
                    </div>
                    <span className="text-[8px] font-mono bg-blue-950 text-blue-400 border border-blue-900 px-2 py-0.5 rounded font-black">
                      MONITORING NET
                    </span>
                  </div>

                  {/* interactive custom SVG Chart */}
                  <div className="h-56 w-full bg-slate-950/80 rounded-xl border border-slate-900 p-4 font-mono relative">
                    {/* SVG Spline */}
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Grid lines */}
                      <line x1="0" y1="20" x2="400" y2="20" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="0.5" />
                      <line x1="0" y1="60" x2="400" y2="60" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="0.5" />
                      <line x1="0" y1="100" x2="400" y2="100" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="0.5" />
                      <line x1="0" y1="140" x2="400" y2="140" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="0.5" />

                      {/* Area Fill path */}
                      <path 
                        d="M 0 140 Q 50 110, 100 120 T 200 40 T 300 80 T 400 30 L 400 150 L 0 150 Z" 
                        fill="url(#chartGrad)" 
                      />

                      {/* Line path */}
                      <path 
                        d="M 0 140 Q 50 110, 100 120 T 200 40 T 300 80 T 400 30" 
                        fill="transparent" 
                        stroke="#3b82f6" 
                        strokeWidth="2.5" 
                      />

                      {/* Alert points marker mock */}
                      <circle cx="200" cy="40" r="4.5" fill="#f43f5e" className="animate-ping" />
                      <circle cx="200" cy="40" r="3.5" fill="#f43f5e" />

                      <circle cx="400" cy="30" r="4" fill="#3b82f6" />
                    </svg>

                    {/* Chart axis labels absolute */}
                    <div className="absolute left-2.5 top-2.5 text-[8.5px] text-slate-550">140 queries/s</div>
                    <div className="absolute left-2.5 top-[58px] text-[8.5px] text-slate-550">80 queries/s</div>
                    <div className="absolute left-2.5 bottom-2.5 text-[8.5px] text-slate-550">Node Standby</div>

                    <div className="absolute bottom-2 right-4 text-[8px] text-slate-500 uppercase tracking-wider flex gap-4">
                      <span>16:00 UTC</span>
                      <span>17:00 UTC</span>
                      <span className="font-extrabold text-blue-400">18:00 UTC (Current)</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-500 font-mono">
                    ⚠️ <strong className="text-slate-400 uppercase">Detection Alert Spike at 17:34</strong>: API Key <span className="bg-slate-950 px-1 rounded">Mobile App Client</span> flagged an incoming wave of 48 deepfake voicemail payloads. AI Shield shunted all requests.
                  </p>
                </div>

                {/* Visualizer 2: Accuracy Calibration Scatter Gauge */}
                <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-850/70 pb-3">
                    <div>
                      <span className="text-[9px] font-mono text-slate-505 uppercase tracking-widest block font-bold">Calibration Gauge</span>
                      <strong className="text-xs text-white">Pipeline Accuracy vs. Target Specimen Weight</strong>
                    </div>
                  </div>

                  <div className="h-56 bg-slate-950 rounded-xl border border-slate-900 p-4 font-mono flex items-center justify-center relative">
                    {/* Concentric Gauge circles */}
                    <div className="relative w-36 h-36 border border-dashed border-slate-800 rounded-full flex items-center justify-center">
                      <div className="w-28 h-28 border border-slate-850 rounded-full flex items-center justify-center">
                        <div className="w-20 h-20 border border-double border-slate-900 rounded-full flex flex-col items-center justify-center text-center">
                          <span className="text-[8px] text-slate-500 block leading-none font-bold uppercase">Average</span>
                          <strong className="text-lg text-emerald-450 font-black block leading-none">99.1%</strong>
                          <span className="text-[8px] text-slate-500 block leading-none uppercase mt-1">Accuracy</span>
                        </div>
                      </div>

                      {/* Interactive dot plotters */}
                      <span className="absolute top-[22%] left-[18%] w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="absolute top-[35%] right-[12%] w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span className="absolute bottom-[28%] left-[25%] w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      <span className="absolute bottom-[20%] right-[32%] w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      <span className="absolute top-[5%] right-[42%] w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                      <span className="absolute top-[5%] right-[42%] w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    </div>

                    <div className="absolute right-4.5 top-4.5 flex flex-col text-[8px] text-slate-500 space-y-0.5">
                      <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Genuine</div>
                      <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Mismatch</div>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-450 leading-relaxed font-mono">
                    Accuracy index reflects ROC-Curve calibration over 800 parallel validation epochs completed today. High precision standard SOC-2 verified.
                  </p>
                </div>

              </div>

              {/* Server Nodes grid diagnostics */}
              <div className="bg-slate-900 border border-slate-850 rounded-2xl p-4 space-y-3 select-none">
                <span className="text-[9px] font-mono tracking-widest text-slate-550 uppercase font-black block">
                  Active GPU / Model Node Clusters status
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const statusVal = i === 4 ? "critical" : i === 7 ? "overload" : "active";
                    return (
                      <div key={i} className="bg-slate-950 p-2.5 rounded-xl border border-slate-850/50 flex flex-col justify-between min-h-[75px] font-mono">
                        <div className="flex items-center justify-between text-[8px] text-slate-500 uppercase font-black tracking-wider border-b border-slate-900 pb-1 flex-shrink-0">
                          <span>NODE 0x{100 + i}</span>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusVal === "critical" ? "bg-red-500 animate-pulse" : statusVal === "overload" ? "bg-amber-400" : "bg-emerald-500 animate-pulse"}`}></span>
                        </div>
                        <div className="pt-2 text-center flex-1 flex flex-col justify-center">
                          <strong className="text-[11px] text-slate-300 block">{statusVal === "critical" ? "OFFLINE" : statusVal === "overload" ? "92% LOAD" : "SECURE"}</strong>
                          <span className="text-[8px] text-slate-550 block">{statusVal === "critical" ? "0 ms" : statusVal === "overload" ? "108 ms" : `${(22 + (i * 2)).toFixed(0)} ms`} latency</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT B: API CREDENTIALS CONTROL */}
          {activeTab === "credentials" && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-850 pb-4">
                  <div>
                    <strong className="text-base text-white block">Corporate APIGateway Keys Authority</strong>
                    <p className="text-xs text-slate-500">
                      Provision tokens, assign rate limits, and suspend access to secure communication channels.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsNewKeyOpen(true)}
                    className="px-4 py-2 bg-blue-606 hover:bg-blue-650 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition uppercase font-mono tracking-widest cursor-pointer shadow-md shadow-blue-900"
                  >
                    <Plus className="w-4 h-4" />
                    Create Token
                  </button>
                </div>

                {/* API KEYS LEDGER */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs select-none">
                    <thead>
                      <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-500 uppercase font-black">
                        <th className="py-2.5 px-3">Client Gateway Name</th>
                        <th className="py-2.5 px-3">Token Private Key Hash</th>
                        <th className="py-2.5 px-3 uppercase text-center">Status</th>
                        <th className="py-2.5 px-3 uppercase text-center">Active Rate Limit</th>
                        <th className="py-2.5 px-3 text-right">Scans Total</th>
                        <th className="py-2.5 px-3 text-right text-rose-500">Threats Blocked</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850 font-mono text-[11px]">
                      {apiKeys.map((key) => {
                        return (
                          <tr key={key.id} className="hover:bg-slate-950/20 transition">
                            <td className="py-3 px-3">
                              <span className="font-bold text-slate-200 block">{key.name}</span>
                              <span className="text-[8.5px] text-slate-550 block">Registered: SOC2-Vault Core</span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="text-[10px] font-mono text-slate-400 select-all font-bold block">{key.token}</span>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <button
                                onClick={() => toggleKeyStatus(key.id)}
                                className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase transition border cursor-pointer inline-flex items-center gap-1 ${
                                  key.status === "active" 
                                    ? "bg-emerald-950/60 text-emerald-400 border-emerald-900" 
                                    : "bg-red-950/60 text-red-400 border-red-900"
                                }`}
                              >
                                <Power className="w-2.5 h-2.5" />
                                {key.status}
                              </button>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <div className="flex flex-col items-center gap-1">
                                <span className="font-black text-slate-200">{key.rateLimit} req/min</span>
                                <input 
                                  type="range" 
                                  min="60" 
                                  max="2000" 
                                  step="50"
                                  value={key.rateLimit}
                                  onChange={(e) => handleRateLimitChange(key.id, parseInt(e.target.value))}
                                  disabled={key.status !== "active"}
                                  className="w-24 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                                />
                              </div>
                            </td>
                            <td className="py-3 px-3 text-right text-slate-400">
                              {(key.scansMade).toLocaleString()}
                            </td>
                            <td className="py-3 px-3 text-right text-rose-400 font-bold">
                              {(key.threatsCaught).toLocaleString()}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-between text-[10.5px] text-slate-500 font-mono">
                  <span>ℹ️ <span className="text-slate-400 uppercase font-black">RATE LIMITING NOTES</span>: Rate limits are enforced instantaneously by the Cloud Run Nginx gateway proxy tier without requiring server reboot. All violations trigger isolated 10-minute shunts.</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT C: POLICIES RULES ENGINE */}
          {activeTab === "policies" && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 space-y-6">
                <div>
                  <strong className="text-base text-white block">Interactive System Policy Configurations Rules</strong>
                  <p className="text-xs text-slate-500">
                    Fine-tune parallel classification model thresholds and configure automated mitigation procedures.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
                  {/* Slider Thresholds */}
                  <div className="space-y-4 bg-slate-950 p-4 border border-slate-850 rounded-xl">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black block border-b border-slate-900 pb-11.5 mb-2">
                      1. Security Scoring Tolerances
                    </span>

                    {/* Policy Slider 1 */}
                    <div className="space-y-2 font-mono">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-[10.5px] font-bold text-slate-350 block leading-none">Biometric Verification Scrutiny</span>
                          <span className="text-[8px] text-slate-550">Tolerance for speech acoustic synthesis</span>
                        </div>
                        <strong className="text-xs text-blue-400 font-black">{biometricSThreshold}%</strong>
                      </div>
                      <input 
                        type="range" 
                        min="20" 
                        max="95" 
                        value={biometricSThreshold}
                        onChange={(e) => setBiometricSThreshold(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                      />
                    </div>

                    {/* Policy Slider 2 */}
                    <div className="space-y-2 font-mono">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-[10.5px] font-bold text-slate-350 block leading-none">Raster Interpolation Tolerance</span>
                          <span className="text-[8px] text-slate-550">Mesh mismatch threshold on video skin-margins</span>
                        </div>
                        <strong className="text-xs text-indigo-400 font-black">{rasterTolerance}% dF</strong>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="80" 
                        value={rasterTolerance}
                        onChange={(e) => setRasterTolerance(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
                      />
                    </div>

                    {/* Policy Slider 3 */}
                    <div className="space-y-2 font-mono">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-[10.5px] font-bold text-slate-350 block leading-none">Cognitive Poisoning Check Limit</span>
                          <span className="text-[8px] text-slate-550">Failsafe for urgent emotional phish signals</span>
                        </div>
                        <strong className="text-xs text-cyan-400 font-black">{emailPoisonAlert}% SCORE</strong>
                      </div>
                      <input 
                        type="range" 
                        min="30" 
                        max="90" 
                        value={emailPoisonAlert}
                        onChange={(e) => setEmailPoisonAlert(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-500" 
                      />
                    </div>
                  </div>

                  {/* Policy Switch Rules */}
                  <div className="space-y-4 bg-slate-950 p-4 border border-slate-850 rounded-xl flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black block border-b border-slate-900 pb-11.5 mb-3">
                        2. Automation Directives
                      </span>

                      <div className="space-y-3.5 pt-1.5">
                        <label className="flex items-center justify-between text-xs cursor-pointer select-none">
                          <div className="space-y-0.5">
                            <span className="font-bold text-slate-300 block font-mono">Automate NIST-7 Certificate Seals</span>
                            <p className="text-[8px] text-slate-500 leading-none">Sign cryptographic certificates on secure pass</p>
                          </div>
                          <input 
                            type="checkbox" 
                            checked={isNistAutoCert} 
                            onChange={() => setIsNistAutoCert(!isNistAutoCert)}
                            className="rounded bg-slate-900 border-slate-800 text-blue-600 focus:ring-0 cursor-pointer"
                          />
                        </label>

                        <label className="flex items-center justify-between text-xs cursor-pointer select-none">
                          <div className="space-y-0.5">
                            <span className="font-bold text-slate-300 block font-mono">SOC2 Scrub Field-Content</span>
                            <p className="text-[8px] text-slate-500 leading-none">Zero out personal values on public cloud transfers</p>
                          </div>
                          <input 
                            type="checkbox" 
                            checked={isSoc2ScrubField} 
                            onChange={() => setIsSoc2ScrubField(!isSoc2ScrubField)}
                            className="rounded bg-slate-900 border-slate-800 text-blue-600 focus:ring-0 cursor-pointer"
                          />
                        </label>

                        <label className="flex items-center justify-between text-xs cursor-pointer select-none">
                          <div className="space-y-0.5">
                            <span className="font-bold text-slate-350 block font-mono">Automate CDN Shunts Quarantine</span>
                            <p className="text-[8px] text-rose-500 leading-none">⚠️ Block host IPs instantaneously upon critical failing</p>
                          </div>
                          <input 
                            type="checkbox" 
                            checked={isAutoShuntUpstream} 
                            onChange={() => setIsAutoShuntUpstream(!isAutoShuntUpstream)}
                            className="rounded bg-slate-900 border-slate-800 text-rose-600 focus:ring-0 cursor-pointer animate-pulse"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="bg-slate-900 p-2 rounded border border-slate-850 text-[9.5px] font-mono text-slate-500 text-center uppercase tracking-normal">
                      Rules are locally validated and stored under <strong className="text-slate-300">PolicyConfig.yml</strong>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 text-xs pt-1">
                  <button className="px-4 py-2 border border-slate-750 font-bold hover:bg-slate-800 rounded-xl transition cursor-pointer font-mono">
                    Restore Defaults
                  </button>
                  <button className="px-5 py-2 bg-blue-607 text-white font-bold rounded-xl hover:bg-blue-600 transition tracking-wide shadow-lg cursor-pointer font-mono">
                    Apply Policy Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT D: VERIFICATION LEDGER */}
          {activeTab === "ledger" && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-850 pb-4">
                  <div>
                    <strong className="text-base text-white block">Real-time Verified Ingestions Ledger</strong>
                    <p className="text-xs text-slate-500">
                      Audit previous scans, review classification accuracy drift matrices, and export historical logs.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleExportLogs}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/80 font-bold text-xs rounded-xl flex items-center gap-1.5 transition font-mono uppercase tracking-widest cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-450" />
                      Export Logs
                    </button>
                  </div>
                </div>

                {/* Filters Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {/* Search query input */}
                  <div className="relative font-mono">
                    <Search className="absolute left-2.5 top-2.5 text-slate-550 w-4 h-4" />
                    <input 
                      type="text" 
                      placeholder="Search Specimen or app..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl pl-9 pr-3 py-2 text-[11px] outline-none text-slate-205 focus:border-blue-500"
                    />
                  </div>

                  {/* Class Filter */}
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Category</span>
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value as any)}
                      className="flex-1 bg-slate-955 border border-slate-850 text-slate-300 font-bold text-[10.5px] rounded-xl px-2 py-1.5 outline-none focus:border-blue-500"
                    >
                      <option value="all">All Payloads</option>
                      <option value="image">📸 Image (.jpg)</option>
                      <option value="voice">🎙️ Voice Speech (.wav)</option>
                      <option value="video">🎥 Video Deepfake (.mp4)</option>
                      <option value="email">📩 Email Phish (.eml)</option>
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Status</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="flex-1 bg-slate-955 border border-slate-850 text-slate-300 font-bold text-[10.5px] rounded-xl px-2 py-1.5 outline-none focus:border-blue-500"
                    >
                      <option value="all">All Verdicts</option>
                      <option value="authentic">🟢 Authentic Digital Asset</option>
                      <option value="manipulated">🔴 Manipulated Deepfake</option>
                    </select>
                  </div>
                </div>

                {/* LEDGER LOGS LIST */}
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-850/60 font-mono text-[10.5px]">
                  <div className="max-h-[350px] overflow-y-auto space-y-1.5 pr-2">
                    {filteredLogs.length === 0 ? (
                      <div className="text-center py-10 text-slate-505 font-bold uppercase">
                        Zero Ingestions matched active query settings
                      </div>
                    ) : (
                      filteredLogs.map((log) => {
                        const scoreColor = log.score > 50 ? "text-emerald-400" : "text-rose-500 font-black animate-pulse";
                        const formatCategory = {
                          image: "📸 Image",
                          voice: "🎙️ Voice",
                          video: "🎥 Video",
                          email: "📩 Email"
                        }[log.type];

                        return (
                          <div 
                            key={log.id}
                            onClick={() => setSelectedLogDetails(log)}
                            className="p-3 bg-slate-900 border border-slate-850/60 rounded-xl hover:bg-slate-850/65 cursor-pointer flex items-center justify-between transition gap-4"
                          >
                            <div className="space-y-1 truncate flex-1">
                              <div className="flex items-center gap-2 truncate">
                                <span className="font-extrabold text-slate-305 block truncate max-w-[170px]" title={log.specimenName}>
                                  {log.specimenName}
                                </span>
                                <span className="text-[8px] bg-slate-950/80 text-indigo-400 border border-indigo-950 px-2 py-0.2 rounded">
                                  {formatCategory}
                                </span>
                              </div>
                              <div className="text-[8.5px] text-slate-500 flex gap-3 truncate">
                                <span>{log.timestamp} UTC</span>
                                <span>• Client: {log.clientAppName.split(' ')[0]}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-right flex-shrink-0">
                              <div>
                                <span className={`block font-bold text-xs ${scoreColor}`}>{log.score}%</span>
                                <span className="text-[8px] text-slate-500 uppercase block font-bold">Authe-Index</span>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-505" />
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT E: FORENSIC OSINT & SIGNAL TRACKING INTELLIGENCE */}
          {activeTab === "tracking" && (
            <div className="space-y-6 animate-fade-in-up">
              
              {/* Main Tab Welcome Header */}
              <div className="bg-gradient-to-r from-red-950/20 via-slate-900 to-slate-900 border border-slate-800 rounded-2xl p-5 select-none relative overflow-hidden">
                <div className="absolute right-0 top-0 h-full w-1/3 bg-radial from-rose-500/5 to-transparent pointer-events-none" />
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-mono font-bold tracking-wider uppercase">
                      <Radio className="w-3 h-3 text-rose-500 animate-pulse" />
                      Section 09 // Forensic OSINT & Mobile Intel
                    </span>
                    <strong className="text-base text-white block font-mono">
                      Global Credibility Signal Reconnaissance Center
                    </strong>
                    <p className="text-xs text-slate-450 max-w-xl">
                      Deploy recursive crawling engines, cellular base station catchers, and IP geotracking logs to defend corporate executives from spoofing vectors.
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <span className="text-[10px] bg-slate-950 px-3 py-1.5 border border-slate-800 rounded-xl font-mono text-slate-450">
                      SYS CODES: <strong className="text-emerald-400">ONLINE</strong>
                    </span>
                    <span className="text-[10px] bg-slate-950 px-3 py-1.5 border border-slate-800 rounded-xl font-mono text-slate-450">
                      GEOFENCE: <strong className="text-blue-400">ACTIVE ({phoneTraces.length} NODES)</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Sub-Category Toggle Buttons Grid - The Six Interactive Tracking Channels */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                
                {/* 1. Social Media Acc Tracing */}
                <button
                  onClick={() => { setTrackingCategory("social"); setTrackingTarget(""); }}
                  className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between h-[105px] ${
                    trackingCategory === "social"
                      ? "bg-rose-955/40 border-rose-600 text-white shadow-lg shadow-rose-950/20"
                      : "bg-slate-900 border-slate-850 hover:bg-slate-850 text-slate-400"
                  }`}
                >
                  <Share2 className={`w-5 h-5 ${trackingCategory === "social" ? "text-rose-400" : "text-slate-500"}`} />
                  <div>
                    <span className="block text-xs font-bold font-mono tracking-tight text-white leading-none mb-1">Social OSINT</span>
                    <span className="block text-[9px] text-slate-500 leading-none">Account Tracing</span>
                  </div>
                </button>

                {/* 2. Website Tracking */}
                <button
                  onClick={() => { setTrackingCategory("website"); setTrackingTarget(""); }}
                  className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between h-[105px] ${
                    trackingCategory === "website"
                      ? "bg-blue-955/40 border-blue-600 text-white shadow-lg shadow-blue-950/20"
                      : "bg-slate-900 border-slate-850 hover:bg-slate-850 text-slate-400"
                  }`}
                >
                  <Globe className={`w-5 h-5 ${trackingCategory === "website" ? "text-blue-400" : "text-slate-500"}`} />
                  <div>
                    <span className="block text-xs font-bold font-mono tracking-tight text-white leading-none mb-1">Web Clones</span>
                    <span className="block text-[9px] text-slate-500 leading-none">Domain Audits</span>
                  </div>
                </button>

                {/* 3. WhatsApp Tracking */}
                <button
                  onClick={() => { setTrackingCategory("whatsapp"); setTrackingTarget(""); }}
                  className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between h-[105px] ${
                    trackingCategory === "whatsapp"
                      ? "bg-emerald-955/40 border-emerald-600 text-white shadow-lg shadow-emerald-955/20"
                      : "bg-slate-900 border-slate-850 hover:bg-slate-850 text-slate-400"
                  }`}
                >
                  <Network className={`w-5 h-5 ${trackingCategory === "whatsapp" ? "text-emerald-400" : "text-slate-500"}`} />
                  <div>
                    <span className="block text-xs font-bold font-mono tracking-tight text-white leading-none mb-1">WhatsApp Forward</span>
                    <span className="block text-[9px] text-slate-500 leading-none">Viral Forensics</span>
                  </div>
                </button>

                {/* 4. Phone IP Tracking */}
                <button
                  onClick={() => { setTrackingCategory("phone_ip"); setTrackingTarget(""); }}
                  className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between h-[105px] ${
                    trackingCategory === "phone_ip"
                      ? "bg-indigo-950/40 border-indigo-600 text-white shadow-lg shadow-indigo-955/20"
                      : "bg-slate-900 border-slate-850 hover:bg-slate-850 text-slate-400"
                  }`}
                >
                  <Smartphone className={`w-5 h-5 ${trackingCategory === "phone_ip" ? "text-indigo-400" : "text-slate-500"}`} />
                  <div>
                    <span className="block text-xs font-bold font-mono tracking-tight text-white leading-none mb-1">Phone Cellular</span>
                    <span className="block text-[9px] text-slate-500 leading-none">IMSI & IP lease</span>
                  </div>
                </button>

                {/* 5. Internet IP Tracking */}
                <button
                  onClick={() => { setTrackingCategory("internet_ip"); setTrackingTarget(""); }}
                  className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between h-[105px] ${
                    trackingCategory === "internet_ip"
                      ? "bg-cyan-950/40 border-cyan-500 text-white shadow-lg shadow-cyan-950/20"
                      : "bg-slate-900 border-slate-850 hover:bg-slate-850 text-slate-400"
                  }`}
                >
                  <Wifi className={`w-5 h-5 ${trackingCategory === "internet_ip" ? "text-cyan-400" : "text-slate-500"}`} />
                  <div>
                    <span className="block text-xs font-bold font-mono tracking-tight text-white leading-none mb-1">Internet IP</span>
                    <span className="block text-[9px] text-slate-500 leading-none">Sovereign Rep ASN</span>
                  </div>
                </button>

                {/* 6. GPS Tracking */}
                <button
                  onClick={() => { setTrackingCategory("gps"); setTrackingTarget(""); }}
                  className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between h-[105px] ${
                    trackingCategory === "gps"
                      ? "bg-orange-955/40 border-orange-600 text-white shadow-lg shadow-orange-950/20"
                      : "bg-slate-900 border-slate-850 hover:bg-slate-850 text-slate-400"
                  }`}
                >
                  <MapPin className={`w-5 h-5 ${trackingCategory === "gps" ? "text-orange-400" : "text-slate-500"}`} />
                  <div>
                    <span className="block text-xs font-bold font-mono tracking-tight text-white leading-none mb-1">GPS Coordinate</span>
                    <span className="block text-[9px] text-slate-500 leading-none">Triangulate Map</span>
                  </div>
                </button>

              </div>

              {/* Dynamic Action Console - Search Input customized for active Tracker Sub-tab */}
              <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 space-y-4">
                <form onSubmit={handleStartTrackingScan} className="flex flex-col md:flex-row gap-3 items-end">
                  
                  <div className="flex-1 w-full space-y-1.5 text-xs font-mono">
                    <label className="text-slate-400 font-bold uppercase tracking-wider block">
                      {trackingCategory === "social" && "Enter Target Social Handle / Identity URL to trace"}
                      {trackingCategory === "website" && "Enter Suspicious Domain Name to crawl clone similarities"}
                      {trackingCategory === "whatsapp" && "Enter Suspected Phone Number or Voice Attachment Hash"}
                      {trackingCategory === "phone_ip" && "Enter Mobile MSISDN Phone to catch IMSI allocation IP"}
                      {trackingCategory === "internet_ip" && "Enter Host Internet IP to audit rep/anonymous VPN state"}
                      {trackingCategory === "gps" && "Enter coordinates to override radar anchor (Lat, Lon)"}
                    </label>
                    
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-slate-550">
                        {trackingCategory === "social" && <Share2 className="w-4 h-4" />}
                        {trackingCategory === "website" && <Globe className="w-4 h-4" />}
                        {trackingCategory === "whatsapp" && <Network className="w-4 h-4" />}
                        {trackingCategory === "phone_ip" && <Smartphone className="w-4 h-4" />}
                        {trackingCategory === "internet_ip" && <Wifi className="w-4 h-4" />}
                        {trackingCategory === "gps" && <MapPin className="w-4 h-4" />}
                      </div>

                      <input
                        type="text"
                        required
                        value={trackingTarget}
                        onChange={(e) => setTrackingTarget(e.target.value)}
                        placeholder={
                          trackingCategory === "social" ? "e.g. @swiss_bank_trustee or custom LinkedIn handle" :
                          trackingCategory === "website" ? "e.g. cloned-zurich-securities.net" :
                          trackingCategory === "whatsapp" ? "e.g. +41 78 777 12 11" :
                          trackingCategory === "phone_ip" ? "e.g. +41 79 382 91 04" :
                          trackingCategory === "internet_ip" ? "e.g. 185.112.144.12" :
                          "e.g. 47.3769, 8.5417"
                        }
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-xs font-semibold outline-none text-slate-100 focus:border-red-500 transition-all font-mono"
                        disabled={isScanningTracker}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isScanningTracker || !trackingTarget.trim()}
                    className={`w-full md:w-auto px-6 py-3 font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md select-none cursor-pointer flex items-center justify-center gap-2 ${
                      isScanningTracker
                        ? "bg-slate-800 text-slate-550 border border-slate-700 cursor-not-allowed"
                        : !trackingTarget.trim()
                          ? "bg-slate-800 text-slate-500 border border-slate-850 cursor-not-allowed"
                          : "bg-rose-700 hover:bg-rose-600 text-white shadow-rose-950/40 hover:scale-[1.02]"
                    }`}
                  >
                    {isScanningTracker ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Recon Running...</span>
                      </>
                    ) : (
                      <>
                        <Crosshair className="w-3.5 h-3.5" />
                        <span>Broadcasting signal sweep</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Progress bar visual console */}
                {isScanningTracker && (
                  <div className="bg-slate-950 border border-slate-850 rounded-xl p-4 space-y-3 font-mono animate-pulse">
                    <div className="flex items-center justify-between text-[10px] text-slate-450">
                      <span className="flex items-center gap-1.5 font-bold uppercase">
                        <Terminal className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                        {activeScanSignal}
                      </span>
                      <span className="text-rose-450 font-black">{scanningProgress}% COMPLETE</span>
                    </div>
                    <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-400 transition-all duration-300"
                        style={{ width: `${scanningProgress}%` }}
                      />
                    </div>
                    <span className="block text-[8px] text-slate-650 uppercase font-bold">
                      Direct TCP Handshake socket active • Basel Server Node Group Alpha
                    </span>
                  </div>
                )}
              </div>

                          {/* SUB-TAB 1: SOCIAL MEDIA OSINT */}
              {trackingCategory === "social" && (() => {
                const currentProfile = activeSocialProfile || socialTraces[0];
                return (
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    
                    {/* LEFT COLUMN: ACTIVE ACCOUNT SCREEN LIVE MONITOR */}
                    <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 select-none">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                            <strong className="text-white text-xs font-mono font-bold uppercase tracking-wider text-[9.5px]">Live Signal Tap Monitor</strong>
                          </div>
                          <span className="text-[8.5px] font-mono bg-red-950 text-red-400 border border-red-900/40 px-1.5 py-0.5 rounded font-black uppercase">
                            Scraping Live
                          </span>
                        </div>

                        {/* HIGH-FIDELITY MOBILE PHONE SIMULATOR FOR ACTIVE ACCOUNT SCREEN */}
                        <div className="border border-slate-800 bg-slate-950 rounded-2xl p-3.5 flex flex-col relative overflow-hidden shadow-2xl" style={{ minHeight: "530px" }}>
                          
                          {/* Simulated Device Top Bar */}
                          <div className="flex items-center justify-between text-[8px] font-mono border-b border-slate-900 pb-2 mb-3 text-slate-500 select-none">
                            <div className="flex items-center gap-1">
                              <Wifi className="w-2.5 h-2.5 text-red-500" />
                              <span>SECURE_TAP_CH4</span>
                            </div>
                            <span className="text-[7.5px] bg-slate-900 text-slate-400 px-1 rounded font-bold uppercase">18:30 UTC</span>
                            <div className="flex items-center gap-1 text-red-400 font-bold">
                              <span>{currentProfile?.syntheticRatio ?? 85}% AI MATCH</span>
                            </div>
                          </div>

                          {/* Render Content Specific to Platform Type */}
                          {currentProfile?.platformType === "instagram" && (
                            <div className="flex flex-col flex-1 text-slate-200">
                              {/* Instagram Header */}
                              <div className="flex items-center justify-between pb-3 border-b border-slate-900 text-[10px] select-none">
                                <span className="font-bold tracking-tight text-white flex items-center gap-1">
                                  <ArrowLeft className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-white" onClick={() => setActivePostInspect(null)} />
                                  <span className="select-all font-mono font-black">{currentProfile.username}</span>
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                                  <span className="text-[7px] text-slate-500 uppercase font-mono font-bold">Insta-Crawler V2</span>
                                </div>
                              </div>

                              {/* Instagram Profile Meta */}
                              <div className="py-3 flex gap-4 items-center select-none">
                                <div className="relative">
                                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
                                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-[10px] font-black font-mono text-white">
                                      {currentProfile.username.slice(1, 3).toUpperCase()}
                                    </div>
                                  </div>
                                  <span className="absolute -bottom-0.5 -right-0.5 text-[8px] bg-red-600 rounded-full w-4 h-4 flex items-center justify-center font-bold border border-slate-950 text-white">!</span>
                                </div>
                                <div className="flex-1 flex justify-around text-center">
                                  <div>
                                    <strong className="block text-[11px] font-black text-white">{currentProfile.postsCount}</strong>
                                    <span className="text-[8px] text-slate-500 font-medium">Posts</span>
                                  </div>
                                  <div>
                                    <strong className="block text-[11px] font-black text-white">{currentProfile.followers}</strong>
                                    <span className="text-[8px] text-slate-500 font-medium">Followers</span>
                                  </div>
                                  <div>
                                    <strong className="block text-[11px] font-black text-white">{currentProfile.following}</strong>
                                    <span className="text-[8px] text-slate-500 font-medium">Following</span>
                                  </div>
                                </div>
                              </div>

                              {/* Instagram Bio Body */}
                              <div className="text-[9.5px] space-y-1 pb-2">
                                <strong className="text-white text-[10px] block font-semibold">{currentProfile.fullName}</strong>
                                <p className="text-slate-400 leading-normal text-[9px] font-sans">{currentProfile.bio}</p>
                                <span className="text-[7px] font-mono text-rose-400 bg-rose-950/40 border border-rose-900/30 px-1.5 py-0.5 rounded font-black inline-block mt-1 uppercase">
                                  SPOOF MATCH: {currentProfile.matchedBiometric}
                                </span>
                              </div>

                              {/* Action Options Grid Buttons */}
                              <div className="grid grid-cols-2 gap-2 py-1.5 border-t border-b border-slate-905 text-center text-[9px] font-mono select-none">
                                <button className="py-1 bg-slate-900 hover:bg-slate-850 text-slate-200 rounded font-semibold border border-slate-800 cursor-pointer">Live DM Tap</button>
                                <button className="py-1 bg-slate-900 hover:bg-slate-855 text-red-405 rounded font-semibold border border-red-900/30 cursor-pointer">Risk Trace</button>
                              </div>

                              {/* IG Posts Feed / Grid Area */}
                              <div className="grid grid-cols-3 gap-1 mt-2 flex-1 overflow-y-auto max-h-[170px]">
                                {currentProfile.posts?.map((post: any) => (
                                  <div 
                                    key={post.id} 
                                    onClick={() => setActivePostInspect(post)} 
                                    className="aspect-square bg-slate-900 rounded overflow-hidden relative group cursor-pointer border border-slate-850 hover:border-pink-500 transition"
                                  >
                                    {post.type === "image" ? (
                                      <img src={post.src} referrerPolicy="no-referrer" alt="fake IG post" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition animate-fade-in" />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center bg-slate-900 text-[8px] text-slate-400 text-center p-1">Text Asset</div>
                                    )}
                                    {/* Hover forensic notification overlay */}
                                    <div className="absolute inset-0 bg-red-950/90 flex flex-col justify-center items-center p-1 opacity-0 group-hover:opacity-100 transition duration-200">
                                      <Crosshair className="w-4 h-4 text-red-500 animate-spin mb-1" />
                                      <span className="text-[7px] font-mono text-center text-red-200 font-bold uppercase tracking-tight">Pixel Inspect</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {currentProfile?.platformType === "x" && (
                            <div className="flex flex-col flex-1 text-slate-200">
                              {/* Twitter X Header */}
                              <div className="flex items-center justify-between pb-2 border-b border-slate-900 text-[10px] select-none">
                                <span className="font-bold text-white flex items-center gap-1">
                                  <ArrowLeft className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-white" onClick={() => setActivePostInspect(null)} />
                                  <span className="font-mono font-black">{currentProfile.fullName}</span>
                                </span>
                                <span className="text-[7.5px] font-mono font-bold text-slate-500 uppercase">{currentProfile.postsCount} posts</span>
                              </div>

                              {/* Wide Banner Image Header */}
                              <div className="h-12 bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950 border border-slate-850 mt-1.5 rounded relative overflow-hidden flex items-center justify-between px-3 select-none">
                                <span className="text-[8px] text-red-650 font-mono tracking-widest uppercase animate-pulse font-black">X ADVERSARIAL BOT STREAM</span>
                                <Terminal className="w-4 h-4 text-red-800 opacity-30" />
                              </div>

                              {/* Twitter Avatar + Info row */}
                              <div className="flex justify-between items-end px-1 -mt-4 mb-2 select-none">
                                <div className="w-10 h-10 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-[10px] font-extrabold text-slate-400 font-mono">
                                  𝕏
                                </div>
                                <span className="text-[7.5px] font-mono text-white bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded font-black uppercase">
                                  {currentProfile.verifiedBadge ? "VERIFIED BOT ID" : "SCRAPE TAP ON"}
                                </span>
                              </div>

                              {/* X Handle, Bio, Stats */}
                              <div className="text-[10px] space-y-1.5 px-0.5 pb-2">
                                <div>
                                  <span className="font-bold text-slate-100 font-mono flex items-center gap-0.5">
                                    {currentProfile.fullName}
                                    {currentProfile.verifiedBadge && <BadgeCheck className="w-3.5 h-3.5 text-blue-400 fill-current" />}
                                  </span>
                                  <span className="text-[8.5px] text-slate-500 block font-mono">{currentProfile.username}</span>
                                </div>

                                <p className="text-slate-400 leading-normal text-[9px] font-sans">{currentProfile.bio}</p>

                                <div className="flex gap-3 text-[8.5px] font-mono text-slate-500 select-none pt-0.5">
                                  <span><strong className="text-slate-300 font-black">{currentProfile.following}</strong> Following</span>
                                  <span><strong className="text-slate-300 font-black">{currentProfile.followers}</strong> Followers</span>
                                </div>
                              </div>

                              {/* X Tweet Feed */}
                              <div className="space-y-2 mt-2 flex-1 overflow-y-auto max-h-[170px] divide-y divide-slate-900">
                                {currentProfile.posts?.map((post: any) => (
                                  <div 
                                    key={post.id} 
                                    onClick={() => setActivePostInspect(post)}
                                    className="pt-2 hover:bg-slate-900 p-1.5 rounded transition cursor-pointer border-l-2 border-transparent hover:border-red-500"
                                  >
                                    <div className="flex gap-2">
                                      <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center text-[7.5px] font-black text-slate-500 flex-shrink-0">
                                        𝕏
                                      </div>
                                      <div className="flex-1 space-y-0.5">
                                        <div className="flex items-center justify-between text-[8px] text-slate-500">
                                          <span className="font-bold text-slate-300">{currentProfile.fullName}</span>
                                          <span>{post.time}</span>
                                        </div>
                                        <p className="text-[9px] text-slate-350 leading-relaxed font-sans">{post.text}</p>
                                        
                                        {post.type === "audio" && (
                                          <div className="bg-red-950/20 border border-red-900/30 rounded px-1.5 py-1 text-[7.5px] text-red-400 font-mono mt-1 flex items-center gap-1.5 animate-pulse">
                                            <Volume2 className="w-3 h-3 text-red-500 flex-shrink-0" />
                                            <span>AUDIO PAYLOAD • DECODE WAVEFORM</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {currentProfile?.platformType === "telegram" && (
                            <div className="flex flex-col flex-1 text-slate-200">
                              {/* Telegram Header */}
                              <div className="flex items-center justify-between pb-2 border-b border-slate-900 bg-cyan-950/15 p-1 rounded-t-xl select-none">
                                <div className="flex items-center gap-2">
                                  <ArrowLeft className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-white" onClick={() => setActivePostInspect(null)} />
                                  <div className="text-[10px]">
                                    <strong className="text-white block font-bold leading-tight font-mono">{currentProfile.fullName}</strong>
                                    <span className="text-[7.5px] text-cyan-400 font-mono font-bold block">{currentProfile.followers} SUBSCRIBERS</span>
                                  </div>
                                </div>
                                <span className="text-[7px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800/40 px-1.5 py-0.5 rounded font-black">
                                  TG BOT
                                </span>
                              </div>

                              {/* TG Info Panel */}
                              <div className="bg-slate-950 border border-slate-900 p-2 rounded-xl text-[9px] my-2 text-slate-400 font-sans leading-relaxed">
                                <span className="text-[8px] font-mono text-cyan-400 font-black uppercase block mb-0.5">CHANNEL SCOPE:</span>
                                {currentProfile.bio}
                              </div>

                              {/* TG Message timeline */}
                              <div className="space-y-2 mt-1 flex-1 overflow-y-auto max-h-[170px]">
                                {currentProfile.posts?.map((post: any) => (
                                  <div 
                                    key={post.id} 
                                    onClick={() => setActivePostInspect(post)}
                                    className="bg-slate-900/60 border border-slate-850 rounded-xl p-2.5 space-y-1.5 hover:border-cyan-500 hover:bg-slate-900 transition cursor-pointer"
                                  >
                                    <div className="flex justify-between items-center text-[7.5px] text-slate-500 font-mono select-none">
                                      <span className="font-bold uppercase tracking-tight text-cyan-405">INTELLIGENCE TARGET FILE</span>
                                      <span>{post.time}</span>
                                    </div>

                                    {post.type === "voice_note" ? (
                                      <div className="space-y-1.5">
                                        <p className="text-[9px] text-slate-350 font-sans">{post.text}</p>
                                        <div className="bg-slate-950 border border-slate-900 rounded-lg p-2 flex items-center justify-between text-[7.5px] font-mono">
                                          <div className="flex items-center gap-2">
                                            <Play className="w-3.5 h-3.5 text-cyan-400 fill-current animate-pulse" />
                                            <div>
                                              <span className="text-slate-300 font-bold block text-[8px] truncate max-w-[100px]">{post.fileTitle}</span>
                                              <span className="text-slate-500 block text-[7px]">{post.bytes} • Synthetic Hash</span>
                                            </div>
                                          </div>
                                          <span className="text-red-405 font-bold uppercase text-[7px] bg-red-950/80 px-1 rounded">DEEPFAKE</span>
                                        </div>
                                      </div>
                                    ) : (
                                      <p className="text-[9px] text-slate-350 font-sans leading-relaxed">{post.text}</p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {currentProfile?.platformType === "facebook" && (
                            <div className="flex flex-col flex-1 text-slate-200">
                              {/* Facebook Header */}
                              <div className="flex items-center justify-between pb-2 border-b border-slate-900 text-[10px] select-none">
                                <span className="font-bold text-white flex items-center gap-1 select-none">
                                  <ArrowLeft className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-white" onClick={() => setActivePostInspect(null)} />
                                  <span className="font-mono font-black">{currentProfile.username}</span>
                                </span>
                                <span className="text-[7.5px] font-mono text-slate-500 uppercase">Meta Scrape</span>
                              </div>

                              {/* Facebook Banner + Avatar Mock */}
                              <div className="h-14 bg-slate-900 relative rounded mt-2 select-none overflow-hidden border border-slate-850">
                                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=60" alt="FB banner" className="w-full h-full object-cover opacity-30 select-none" />
                                <div className="absolute -bottom-2 left-2 select-none">
                                  <div className="w-8 h-8 rounded-full bg-slate-950 border-2 border-slate-900 flex items-center justify-center text-[8px] font-black text-indigo-400 font-mono">
                                    FB
                                  </div>
                                </div>
                              </div>

                              {/* Bio and Stats */}
                              <div className="text-[9.5px] space-y-1 mt-3 px-1 pb-2">
                                <strong className="text-white text-[10px] block font-semibold">{currentProfile.fullName}</strong>
                                <p className="text-slate-400 leading-normal text-[9px] font-sans">{currentProfile.bio}</p>
                                <div className="flex gap-3 text-[8.5px] font-mono text-slate-500 pt-0.5 select-none animate-fade-in">
                                  <span><strong className="text-slate-300">{currentProfile.followers}</strong> followers</span>
                                  <span><strong className="text-slate-300">{currentProfile.following}</strong> following</span>
                                </div>
                              </div>

                              {/* Timeline posts */}
                              <div className="space-y-2 mt-2 flex-1 overflow-y-auto max-h-[160px] divide-y divide-slate-900">
                                {currentProfile.posts?.map((post: any) => (
                                  <div 
                                    key={post.id} 
                                    onClick={() => setActivePostInspect(post)}
                                    className="pt-2 hover:bg-slate-900 p-1.5 rounded transition cursor-pointer border-l-2 border-transparent hover:border-indigo-500"
                                  >
                                    <div className="text-[7.5px] text-slate-500 font-mono select-none mb-1 flex justify-between">
                                      <span className="font-bold text-indigo-400">NEWSFEED RECORD</span>
                                      <span>{post.time}</span>
                                    </div>
                                    <p className="text-[9px] text-slate-350 leading-relaxed font-sans">{post.text}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* INTERACTIVE FORENSIC DIAGNOSTICS SUB-DRAWER/PANEL (SHOWS IF POST IS CLICKED) */}
                          <AnimatePresence>
                            {activePostInspect && (
                              <motion.div 
                                initial={{ y: "100%" }}
                                animate={{ y: "0%" }}
                                exit={{ y: "100%" }}
                                className="absolute inset-x-0 bottom-0 top-11 bg-slate-950 border-t border-slate-800 p-3 flex flex-col justify-between font-mono z-10 text-[9px] shadow-2xl"
                              >
                                <div className="space-y-4 flex-1 overflow-y-auto pr-0.5">
                                  <div className="flex items-center justify-between border-b border-slate-905 pb-1.5">
                                    <strong className="text-red-405 font-bold uppercase select-none tracking-wider font-mono text-[9px]">Acoustic / Pixel Inspect</strong>
                                    <button 
                                      onClick={() => setActivePostInspect(null)} 
                                      className="p-0.5 rounded hover:bg-slate-900 border border-slate-850 hover:text-white flex-shrink-0 cursor-pointer"
                                    >
                                      <X className="w-3 h-3 text-slate-400" />
                                    </button>
                                  </div>

                                  <div className="space-y-2 text-slate-300">
                                    <span className="text-[8px] text-slate-500 block font-bold uppercase select-none">Scraped Content Payload:</span>
                                    <p className="bg-slate-900 border border-slate-850 p-2.5 rounded text-[9.5px] italic font-sans leading-relaxed text-slate-200 select-all">
                                      "{activePostInspect.text || activePostInspect.caption || 'Attached deepfake file asset'}"
                                    </p>
                                  </div>

                                  <div className="space-y-2">
                                    <span className="text-[8px] text-slate-500 block font-bold uppercase select-none">Spectrogram & GAN Metrics:</span>
                                    <div className="bg-slate-1000 border border-slate-900 p-2.5 rounded text-[8px] space-y-1 leading-normal">
                                      <div className="flex justify-between text-slate-450"><span>Biometric Verdict:</span> <strong className="text-red-400 text-[8.5px]">{activePostInspect.fingerprint || "Midjourney Noise Pattern Match"}</strong></div>
                                      <div className="flex justify-between text-slate-455"><span>AI Probability Score:</span> <strong className="text-amber-400">{(currentProfile?.syntheticRatio ?? 85) + (Math.random() > 0.5 ? 2 : -2)}% Confidence</strong></div>
                                      <div className="flex justify-between text-slate-455"><span>Crawler Route Hops:</span> <strong className="text-blue-400">Triple Bounce Tunnel</strong></div>
                                      <div className="flex justify-between text-slate-455"><span>Suspect Source IP:</span> <strong className="text-slate-300 font-mono">{currentProfile?.nodeIp ?? "45.138.16.22"}</strong></div>
                                    </div>
                                  </div>

                                  {/* Small dynamic coordinate canvas simulation visual */}
                                  <div className="bg-slate-900/60 border border-slate-850 p-2 rounded h-14 flex items-center justify-center relative overflow-hidden select-none">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(244,63,94,0.15))] font-mono text-[7px] text-red-500/20 flex flex-wrap opacity-40">
                                      {Array(100).fill(0).map((_, i) => Math.floor(Math.sin(i) * 10) + 1).join(" ")}
                                    </div>
                                    <span className="z-10 text-[7px] bg-red-950/80 text-rose-400 border border-red-900/40 px-1.5 py-0.5 rounded font-black uppercase tracking-widest animate-pulse font-mono">
                                      Forensic Match Slices Active
                                    </span>
                                  </div>
                                </div>

                                <button 
                                  onClick={() => {
                                    alert(`Mitigation Payload Dispatched: Automated warnings and quarantine requests pushed to ${currentProfile.platform} regulatory registers for username ${currentProfile.username} successfully.`);
                                    setActivePostInspect(null);
                                  }}
                                  className="w-full mt-2 py-1.5 bg-red-800 hover:bg-red-700 transition font-mono font-bold text-[8.5px] text-white rounded uppercase tracking-wider border border-red-900 cursor-pointer"
                                >
                                  Deploy Platform Mitigate Flag
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Small Dynamic Socket Crawl Log footer inside visual phone device */}
                          <div className="border-t border-slate-900 pt-1.5 mt-3 text-[7px] font-mono text-slate-600 flex justify-between items-center bg-slate-950 select-none">
                            <span className="flex items-center gap-1 font-bold">
                              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping inline-block" />
                              TCP_RELAY_SYNC: {currentProfile?.nodeIp ?? "45.138.16.22"}
                            </span>
                            <span>{currentProfile?.lastSeen ?? "Just now"}</span>
                          </div>

                        </div>
                      </div>

                      {/* Small informative block below visual mockup phone */}
                      <div className="bg-slate-950 border border-slate-850 p-2.5 rounded-xl font-mono text-[8.5px] text-slate-500 space-y-1.5 flex flex-col justify-between selection:bg-rose-500">
                        <div className="flex justify-between"><span className="text-slate-455 font-bold">Active Crawler Hub:</span> <strong className="text-emerald-400 font-bold">Zürich Gateway Alpha</strong></div>
                        <div className="flex justify-between font-semibold"><span className="text-slate-455 font-bold">Proxy-Hop Strategy:</span> <strong className="text-blue-400 font-bold">Multi-Loop Swiss VPN</strong></div>
                        <div className="flex justify-between">
                          <span className="text-slate-450 font-bold">Biometric Core:</span>
                          <strong className="text-rose-400 font-black">{currentProfile?.matchedBiometric ?? "N/A - Clean Origin"}</strong>
                        </div>
                      </div>

                    </div>

                    {/* RIGHT COLUMN: ACTIVE TRACED IDENTITIES SYSTEM TABLE (COL-SPAN-2) */}
                    <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 lg:col-span-2 space-y-3 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-2.5 select-none">
                          <span className="text-[10px] text-slate-400 font-mono tracking-widest font-black uppercase flex items-center gap-2">
                            <Sliders className="w-4 h-4 text-rose-500" />
                            Active Traced Synthetic Identities ({socialTraces.length} verified)
                          </span>
                          <span className="text-[8px] text-slate-500 font-mono font-bold uppercase select-none">
                            Click identity row to trace live profile
                          </span>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs select-none border-collapse">
                            <thead>
                              <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-500 uppercase font-black">
                                <th className="py-2 px-3">Identity / Handle</th>
                                <th className="py-2.5 px-3">Platform</th>
                                <th className="py-2.5 px-3">Threat Level</th>
                                <th className="py-2.5 px-3">Node Source IP</th>
                                <th className="py-2.5 px-3 text-right font-black">Biometric Check</th>
                              </tr>
                            </thead>
                            <tbody className="font-mono text-[11px] divide-y divide-slate-855">
                              {socialTraces.map((trace, idx) => {
                                const isSelected = currentProfile?.username === trace.username;
                                return (
                                  <tr 
                                    key={idx} 
                                    onClick={() => {
                                      setActiveSocialProfile(trace);
                                      setActivePostInspect(null);
                                    }}
                                    className={`hover:bg-slate-950/40 transition cursor-pointer ${
                                      isSelected ? "bg-slate-950/70 text-white font-bold border-l-2 border-red-500" : "text-slate-350"
                                    }`}
                                  >
                                    <td className="py-3.5 px-3">
                                      <span className={`font-mono text-[11.5px] tracking-tight block ${isSelected ? "text-white font-black" : "text-slate-200"}`}>
                                        {trace.username}
                                      </span>
                                      <span className="text-[8px] text-slate-500 block font-bold mt-0.5">REPORT ID: {trace.reportId}</span>
                                    </td>
                                    <td className="py-3.5 px-3">
                                      <span className="font-semibold">{trace.platform}</span>
                                    </td>
                                    <td className="py-3.5 px-3">
                                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase inline-block ${
                                        trace.riskLevel === "Critical" ? "bg-red-950 text-red-400 border border-red-900/40" :
                                        trace.riskLevel === "High" ? "bg-amber-950 text-amber-400 border border-amber-900/30" :
                                        "bg-emerald-950 text-emerald-400 border border-emerald-900/20"
                                      }`}>
                                        {trace.riskLevel}
                                      </span>
                                    </td>
                                    <td className="py-3.5 px-3 text-[10px] text-slate-400">{trace.nodeIp}</td>
                                    <td className="py-3.5 px-3 text-right">
                                      <div className="flex flex-col items-end gap-1">
                                        <span className="text-rose-400 font-extrabold text-[9.5px]">{trace.matchedBiometric}</span>
                                        {isSelected && (
                                          <span className="text-[7.5px] bg-red-950 text-rose-400 border border-red-900/40 px-1 py-0.2 rounded font-black uppercase animate-pulse">
                                            LIVE MONITORING
                                          </span>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Bulk actions at the bottom of table */}
                      <div className="bg-slate-950/40 border border-slate-850 rounded-xl p-3 mt-4 flex flex-col md:flex-row justify-between items-center gap-3 text-xs select-none">
                        <div className="text-[9px] text-slate-500 leading-relaxed max-w-md">
                          <strong>Active Threat Counter-Measures:</strong> Real-time crawler loops are tracking client connection hops across all nodes. High similarity clones can be reported or quarantined in bulk on trust API endpoints.
                        </div>
                        <button 
                          onClick={() => {
                            alert("Bulk Mitigation Directives Dispatched: Requests to lock down, flag impostors, and isolate active synthetic channels pushed to Meta space, X network, and Telegram registers successfully.");
                          }}
                          className="px-3 py-1.5 bg-rose-700 hover:bg-rose-600 transition font-mono font-bold text-[9px] text-white rounded-lg uppercase tracking-wider cursor-pointer border border-rose-900 flex-shrink-0"
                        >
                          Execute Bulk Platform Lock-Down
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })()}

              {/* SUB-TAB 2: WEBSITE TRACKING */}
              {trackingCategory === "website" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Left summary card slider */}
                  <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <strong className="text-white text-sm font-semibold font-mono block">Dynamic Reverse CDN Scraping</strong>
                      <p className="text-xs text-slate-550 leading-relaxed font-sans">
                        Mirror spoof websites cloned from trust brand elements are continuously tracked. System queries WHOIS registration logs, tests payment gateway APIs, and bypasses Cloudflare proxy routes to identify actual physical host providers.
                      </p>
                    </div>

                    <button 
                      onClick={() => alert("Mitigation Signal: Anti-Spoof DNS cache poison broadcasted to all Swiss ISP resolvers successfully.")}
                      className="w-full py-2 bg-rose-705 hover:bg-rose-600 transition font-mono font-bold text-[10px] text-white rounded-xl uppercase tracking-wider cursor-pointer border border-rose-900"
                    >
                      Broadcast Anti-DNS Poison Cache
                    </button>
                  </div>

                  {/* Website spoof table */}
                  <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 lg:col-span-2 space-y-3">
                    <span className="text-[9px] text-slate-555 font-mono tracking-widest font-black uppercase block">
                      Targeted Brand Impersonation Domain Clones ({websiteTraces.length} flagged)
                    </span>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse select-none">
                        <thead>
                          <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-500 uppercase font-black">
                            <th className="py-2 px-3">Fraudulent Domain</th>
                            <th className="py-2 px-3">Clone Similarity</th>
                            <th className="py-2 px-3">Risk Assessment</th>
                            <th className="py-2 px-3">True Redirect IP</th>
                            <th className="py-2 px-3 text-right">Audit State</th>
                          </tr>
                        </thead>
                        <tbody className="font-mono text-[11px] divide-y divide-slate-850">
                          {websiteTraces.map((trace, idx) => (
                            <tr key={idx} className="hover:bg-slate-950/20 transition">
                              <td className="py-2.5 px-3">
                                <a href={trace.suspectUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-red-400 hover:underline select-all block">
                                  {trace.domain}
                                </a>
                                <span className="text-[8px] text-slate-500 block font-bold">{trace.certificateRoot}</span>
                              </td>
                              <td className="py-2.5 px-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-white font-bold">{trace.riskScore ?? 90}%</span>
                                  <div className="w-16 h-1 bg-slate-1050 rounded-full overflow-hidden">
                                    <div className="h-full bg-red-500" style={{ width: `${trace.riskScore ?? 90}%` }} />
                                  </div>
                                </div>
                              </td>
                              <td className="py-2.5 px-3 text-slate-350">{trace.cloneType}</td>
                              <td className="py-2.5 px-3 text-slate-400">{trace.redirectIp}</td>
                              <td className="py-2.5 px-3 text-right">
                                <span className="px-2 py-0.5 rounded bg-slate-950 text-emerald-440 font-bold text-[8.5px] border border-slate-850">
                                  {trace.trackingState}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* SUB-TAB 3: WHATSAPP FORENSIC SPREAD */}
              {trackingCategory === "whatsapp" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Whatsapp left card explanation */}
                  <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <strong className="text-white text-sm font-semibold font-mono block">Forward Tree Wave Anomaly</strong>
                      <p className="text-xs text-slate-440 leading-relaxed font-sans">
                        Malicious synthetic media often propagates via WhatsApp group forwards to bypass press scrutiny. Our system tracks specific phase audio patterns or media hashes to calculate viral speed, hops, and geocentric concentrations.
                      </p>
                    </div>

                    <div className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl text-[9px] font-mono text-slate-500 space-y-1">
                      <div className="flex justify-between"><span>Active Group Scanners:</span> <strong className="text-emerald-400">140 Nodes</strong></div>
                      <div className="flex justify-between"><span>Hash Database Sync:</span> <strong className="text-emerald-400 font-bold">Realtime (12s)</strong></div>
                      <div className="flex justify-between"><span>Verification Threshold:</span> <strong className="text-blue-400 font-bold">10 hops trigger</strong></div>
                    </div>
                  </div>

                  {/* Whatsapp tracking table (col-span-2) */}
                  <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 lg:col-span-2 space-y-3">
                    <span className="text-[9px] text-slate-500 font-mono tracking-widest font-black uppercase block">
                      Identified WhatsApp Media Propagation Anchors ({whatsappChats.length} verified)
                    </span>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse select-none">
                        <thead>
                          <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-500 uppercase font-black">
                            <th className="py-2 px-3">Sender MSISDN</th>
                            <th className="py-2 px-3">Alleged User Alias</th>
                            <th className="py-2 px-3">Identified Anomaly</th>
                            <th className="py-2 px-3">Scope Target</th>
                            <th className="py-2 px-3 text-right">Confidence power</th>
                          </tr>
                        </thead>
                        <tbody className="font-mono text-[11px] divide-y divide-slate-850">
                          {whatsappChats.map((chat, idx) => (
                            <tr key={idx} className="hover:bg-slate-950/20 transition">
                              <td className="py-2.5 px-3">
                                <span className="font-bold text-slate-200 select-all block">{chat.sender}</span>
                                <span className="text-[8px] text-slate-500 block font-bold">{chat.dateTrace} UTC</span>
                              </td>
                              <td className="py-2.5 px-3 font-semibold text-slate-350">{chat.alias}</td>
                              <td className="py-2.5 px-3 select-all">
                                <span className="font-bold text-red-400 block font-mono">{chat.riskVerdict}</span>
                                <span className="text-[8px] text-slate-500 block font-bold">TOTAL DETECTED POOL: {chat.totalPayloads} forwards</span>
                              </td>
                              <td className="py-2.5 px-3 text-slate-400 text-[10px]">{chat.groupTarget}</td>
                              <td className="py-2.5 px-3 text-right text-rose-400 font-bold">{chat.signalPower}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* SUB-TAB 4: PHONE IP & IMSI CATCHER */}
              {trackingCategory === "phone_ip" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Phone Intel Left panel */}
                  <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <strong className="text-white text-sm font-semibold font-mono block">Cellular IMSI Allocation</strong>
                      <p className="text-xs text-slate-450 leading-relaxed font-sans">
                        Simulates cell tower handshake intercepts to extract real-time carrier subscriber details (IMSI, provider, active IP lease blocks). Confirms host cell location precision down to building level.
                      </p>
                    </div>

                    <div className="p-3 bg-red-950/25 border border-red-900/40 rounded-xl space-y-1 font-mono text-[9px] text-red-400">
                      <strong>⚠️ GSM BASEBOARD ATTACH STATUS:</strong>
                      <p className="leading-tight text-slate-400">Physical signal interception requires secure Swisscom edge gateway credentials.</p>
                    </div>
                  </div>

                  {/* Phone results telemetry table */}
                  <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 lg:col-span-2 space-y-3">
                    <span className="text-[9px] text-slate-505 font-mono tracking-widest font-black uppercase block">
                      Active IMSI Handshake Subscriber Lookups ({phoneTraces.length} recorded)
                    </span>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse select-none">
                        <thead>
                          <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-500 uppercase font-black">
                            <th className="py-2 px-3">Target MSISDN</th>
                            <th className="py-2 px-3">Carrier Operator</th>
                            <th className="py-2 px-3">Active Cell Tower</th>
                            <th className="py-2 px-3">IP Lease Block</th>
                            <th className="py-2 px-3 text-right">Radar GPS coordinates</th>
                          </tr>
                        </thead>
                        <tbody className="font-mono text-[11px] divide-y divide-slate-850">
                          {phoneTraces.map((trace, idx) => (
                            <tr key={idx} className="hover:bg-slate-950/20 transition">
                              <td className="py-2.5 px-3">
                                <span className="font-bold text-slate-200 select-all block">{trace.phoneNum}</span>
                                <span className="text-[8px] text-slate-500 block font-bold">IMSI: {trace.imsi}</span>
                              </td>
                              <td className="py-2.5 px-3 font-semibold text-slate-350">{trace.targetCarrier}</td>
                              <td className="py-2.5 px-3 text-slate-300 font-bold">{trace.signalCellId}</td>
                              <td className="py-2.5 px-3">
                                <span className="font-bold block select-all text-blue-400">{trace.lastActiveIp}</span>
                                <span className="text-[8.5px] text-slate-500 block truncate max-w-[150px] font-bold">{trace.reverseDns}</span>
                              </td>
                              <td className="py-2.5 px-3 text-right text-emerald-400 font-bold">
                                <span>{trace.gpsLat}, {trace.gpsLon}</span>
                                <span className="block text-[8px] text-slate-500 font-medium font-bold">Precision: ±{trace.precisionMeters}m</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* SUB-TAB 5: INTERNET IP REPUTATION */}
              {trackingCategory === "internet_ip" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Internet IP Left */}
                  <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <strong className="text-white text-sm font-semibold font-mono block">Egress VPN / Tor Detector</strong>
                      <p className="text-xs text-slate-450 leading-relaxed font-sans">
                        Dynamic routing probes check target IP addresses against global Tor Exit registries, public bulletproof hosting VPN databases, and residential proxy networks. Calculates instant fraud/abuse reputation points.
                      </p>
                    </div>

                    <div className="bg-slate-950 border border-slate-850 p-3 rounded-xl font-mono text-[9px] text-slate-500 space-y-1">
                      <div className="flex justify-between"><span>Registry Syncs:</span> <strong className="text-emerald-400">RIPE, ARIN, APNIC</strong></div>
                      <div className="flex justify-between"><span>VPN Block Ranges:</span> <strong className="text-blue-450 font-black font-bold">42,501 active</strong></div>
                      <div className="flex justify-between"><span>Mitigation Hook:</span> <strong className="text-emerald-450 select-all font-bold">WAF-RESTRICT</strong></div>
                    </div>
                  </div>

                  {/* IP reputation traces table */}
                  <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 lg:col-span-2 space-y-3">
                    <span className="text-[9px] text-slate-500 font-mono tracking-widest font-black uppercase block">
                      Flagged Ingress IP Reputation logs ({internetIps.length} active threats)
                    </span>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse select-none">
                        <thead>
                          <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-505 uppercase font-black">
                            <th className="py-2 px-3">IP Address</th>
                            <th className="py-2 px-3">ISP allocation</th>
                            <th className="py-2 px-3">Connection class</th>
                            <th className="py-2 px-3">Activity description logs</th>
                            <th className="py-2 px-3 text-right">Abuse threat rating</th>
                          </tr>
                        </thead>
                        <tbody className="font-mono text-[11px] divide-y divide-slate-850">
                          {internetIps.map((trace, idx) => (
                            <tr key={idx} className="hover:bg-slate-950/20 transition">
                              <td className="py-2.5 px-3">
                                <strong className="text-red-400 select-all font-bold block">{trace.ip}</strong>
                                <span className="text-[8px] text-slate-500 block font-bold">REGISTRY REGION: {trace.country}</span>
                              </td>
                              <td className="py-2.5 px-3 font-semibold text-slate-350">{trace.allocation}</td>
                              <td className="py-2.5 px-3 text-slate-400">{trace.connectionType}</td>
                              <td className="py-2.5 px-3 text-slate-300 font-sans leading-snug">{trace.activityLog}</td>
                              <td className="py-2.5 px-3 text-right text-[10.5px]">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-black ${
                                  trace.threatScore > 80 ? "bg-red-950/60 text-red-550 font-bold border border-red-900/50 animate-pulse" : "bg-orange-950/60 text-orange-400 border border-orange-900/30"
                                }`}>
                                  {trace.threatScore}% RISK
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* SUB-TAB 6: GPS TRIANGULATION SECURE RADAR */}
              {trackingCategory === "gps" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Left stats info panel (col-span-5) */}
                  <div className="lg:col-span-5 bg-slate-900 border border-slate-850 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-1.5 border-b border-slate-850 pb-3">
                        <span className="text-[10px] text-orange-400 font-mono font-bold tracking-wider uppercase block">
                          🛰️ GEOLOCATION RADAR TRIP SYSTEM
                        </span>
                        <strong className="text-sm text-white font-mono block">GPS Satellites Triangulation</strong>
                      </div>

                      <div className="space-y-3 font-mono text-xs text-slate-350 select-none">
                        <div className="bg-slate-950 p-2.5 border border-slate-850 rounded-xl space-y-1">
                          <span className="text-[8px] text-slate-500 uppercase block">ACTIVE TARGET ANCHOR PLACE</span>
                          <span className="text-white font-extrabold block truncate leading-tight">{gpsSelectedPoint.place}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-slate-950 p-2.5 border border-slate-850 rounded-xl space-y-0.5">
                            <span className="text-[8px] text-slate-500 block">LATITUDE</span>
                            <span className="text-slate-100 font-bold block">{gpsSelectedPoint.lat} N</span>
                          </div>
                          <div className="bg-slate-950 p-2.5 border border-slate-850 rounded-xl space-y-0.5">
                            <span className="text-[8px] text-slate-500 block">LONGITUDE</span>
                            <span className="text-slate-100 font-bold block">{gpsSelectedPoint.lon} E</span>
                          </div>
                        </div>

                        <div className="space-y-1.5 text-[10px] text-slate-450 leading-snug">
                          <div className="flex justify-between"><span>Satellites Locked (GPS/Galileo):</span> <strong className="text-white">{gpsSelectedPoint.satellitesLocked ?? 18} Active</strong></div>
                          <div className="flex justify-between"><span>Triangulation Time Delta:</span> <strong className="text-orange-400 font-bold">{gpsSelectedPoint.triangulationDelta ?? "0.19 ms"}</strong></div>
                          <div className="flex justify-between"><span>Physical Mic Noise Floor Match:</span> <strong className="text-emerald-400 font-bold font-mono">Verified Matches</strong></div>
                          <div className="flex justify-between"><span>Active Geofence Status:</span> <span className="text-blue-400 font-black uppercase text-[8.5px] font-bold">{gpsSelectedPoint.status}</span></div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl font-mono text-[9px] text-center text-slate-500">
                      Coordinates default to Switzerland Corporate Sovereign Core. Override coordinates by submitting custom (Lat, Lon) values in the search bar above.
                    </div>
                  </div>

                  {/* Triangulation Visual Radar Grid (Col-span-7) */}
                  <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-850 p-5 flex flex-col justify-between min-h-[350px] relative overflow-hidden">
                    
                    {/* Glowing radar target crosshairs */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-45" />
                    
                    <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4 select-none">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />
                        <span className="text-[9px] font-mono tracking-wider text-slate-400 uppercase">
                          SOVEREIGN MILITARY-GRADE TRIP GPS RADAR
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-orange-400 font-black">
                        SIGNAL POWER: {gpsSelectedPoint.signalDb}
                      </span>
                    </div>

                    {/* Radar graphic interface */}
                    <div className="flex-1 flex items-center justify-center relative min-h-[190px]">
                      
                      {/* Concentric radar circles */}
                      <div className="absolute w-[180px] h-[180px] border border-orange-500/10 rounded-full flex items-center justify-center animate-pulse">
                        <div className="w-[120px] h-[120px] border border-orange-500/20 rounded-full flex items-center justify-center">
                          <div className="w-[60px] h-[60px] border border-orange-500/30 rounded-full flex items-center justify-center" />
                        </div>
                      </div>

                      {/* Sweeping radar line */}
                      <div className="absolute w-[190px] h-[190px] border border-dashed border-slate-800 rounded-full pointer-events-none flex items-center justify-center animate-spin-slow">
                        <div className="w-full h-0.5 bg-orange-500/10" />
                      </div>

                      {/* Sweeper beam fade overlay */}
                      <div className="absolute w-24 h-24 bg-orange-500/10 rounded-full blur-xl animate-pulse" />

                      {/* Blinking actual coordinate pinpoint node with metadata label popup */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="h-4.5 w-4.5 bg-orange-500 text-white rounded-full flex items-center justify-center animate-ping absolute" />
                        <div className="h-3.5 w-3.5 bg-orange-600 rounded-full border-2 border-white relative z-20 flex items-center justify-center shadow-md">
                          <Crosshair className="w-2 h-2 text-white" />
                        </div>
                        
                        <div className="mt-2.5 bg-slate-900/90 backdrop-blur-sm border border-orange-500/40 px-3 py-1.5 rounded-lg text-center font-mono text-[9px] shadow-lg max-w-[170px]">
                          <span className="block font-black text-orange-400 uppercase tracking-widest leading-none mb-0.5">ACTIVE BEACON</span>
                          <span className="block text-slate-100 font-bold truncate">{gpsSelectedPoint.lat}, {gpsSelectedPoint.lon}</span>
                          <span className="block text-[8px] text-slate-500 leading-none mt-0.5 font-bold">{gpsSelectedPoint.place.split(',')[0]}</span>
                        </div>
                      </div>

                      {/* Static surrounding mock node pinpoints */}
                      <div className="absolute top-[25%] left-[24%] flex flex-col items-center opacity-60">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span className="text-[7.5px] text-slate-500 font-mono mt-0.5 font-bold">Bern Node</span>
                      </div>

                      <div className="absolute bottom-[30%] right-[20%] flex flex-col items-center opacity-60">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span className="text-[7.5px] text-slate-500 font-mono mt-0.5 font-bold">Vaduz Exchange</span>
                      </div>

                    </div>

                    <div className="flex items-center justify-between font-mono text-[9px] text-slate-500 pt-3 border-t border-slate-900 mt-3 select-none">
                      <span>RADAR SWEEP STATE: CYCLIC BROADCAST PASSING</span>
                      <span className="text-orange-400 font-bold hover:underline">Accuracy confidence limits: 99.88%</span>
                    </div>

                  </div>

                </div>
              )}

            </div>
          )}

        </section>
        

      </main>

      {/* FLYOUT MODAL DRAWER A: LOG SPECIMEN DETAILS & ACCURACY METRICS */}
      <AnimatePresence>
        {selectedLogDetails && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-5 md:p-6 space-y-5 relative text-slate-200"
            >
              <button
                onClick={() => setSelectedLogDetails(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-800 border border-slate-755 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>

              <div className="border-b border-slate-800 pb-3 flex items-center gap-2.5 select-none font-mono">
                <LayoutDashboard className="w-5 h-5 text-indigo-400" />
                <div>
                  <span className="text-[8.5px] text-slate-450 uppercase block font-black">Deep Model Calibration Metrics</span>
                  <strong className="text-sm font-bold text-white block select-all">INGEST_KEY_0x{selectedLogDetails.id.slice(-4)}</strong>
                </div>
              </div>

              {/* Specs parameters lists */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono select-none">
                <div className="bg-slate-950 p-2.5 border border-slate-850 rounded-xl space-y-0.5">
                  <span className="text-[8px] text-slate-500 uppercase font-black block">Specimen Path Target</span>
                  <span className="text-[11.5px] font-bold text-slate-205 truncate block">{selectedLogDetails.specimenName}</span>
                </div>
                <div className="bg-slate-950 p-2.5 border border-slate-850 rounded-xl space-y-0.5">
                  <span className="text-[8px] text-slate-500 uppercase font-black block">Classification Output</span>
                  <span className={`text-[11.5px] font-black uppercase block ${selectedLogDetails.score > 50 ? "text-emerald-400" : "text-rose-500"}`}>
                    {selectedLogDetails.status.toUpperCase()}
                  </span>
                </div>
                <div className="bg-slate-950 p-2.5 border border-slate-850 rounded-xl space-y-0.5">
                  <span className="text-[8px] text-slate-500 uppercase font-black block">Identified Compositor</span>
                  <span className="text-[11.5px] font-bold text-slate-300 block">{selectedLogDetails.model}</span>
                </div>
                <div className="bg-slate-950 p-2.5 border border-slate-850 rounded-xl space-y-0.5">
                  <span className="text-[8px] text-slate-500 uppercase font-black block">Client Gateway</span>
                  <span className="text-[11.5px] font-bold text-slate-300 truncate block">{selectedLogDetails.clientAppName}</span>
                </div>
              </div>

              {/* Confusion Matrix / Neural layers schematic */}
              <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-3 font-mono">
                <div className="flex items-center justify-between border-b border-slate-900 pb-1.5">
                  <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider">Confusion Accuracy metrics</span>
                  <span className="text-[8px] text-slate-505 font-black uppercase">VALIDATION SPLIT: 80/20</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-2 bg-slate-900/60 border border-slate-900 rounded-lg">
                    <strong className="text-sm text-slate-300 block">Precision: 99.2%</strong>
                    <span className="text-[8px] text-slate-550 uppercase">True Positive Rate</span>
                  </div>
                  <div className="p-2 bg-slate-900/60 border border-slate-900 rounded-lg">
                    <strong className="text-sm text-slate-300 block">Recall: 98.42%</strong>
                    <span className="text-[8px] text-slate-550 uppercase">True Negative Rate</span>
                  </div>
                </div>

                {/* Model training params */}
                <div className="space-y-1 text-[9px] text-slate-450 leading-snug select-none pt-1">
                  <div className="flex justify-between">
                    <span>EPOCHS COMMITTED:</span>
                    <strong className="text-slate-300">120 training epochs</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>MODEL DRIFT RATIO:</span>
                    <strong className="text-slate-300 font-bold">0.02% (Extremely Stable)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>CONFIDENCE HEATMAP:</span>
                    <strong className="text-blue-400 uppercase font-black">99.87% SIGMA TRUST</strong>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const blob = new Blob([JSON.stringify(selectedLogDetails, null, 2)], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = `specimen_0x${selectedLogDetails.id.slice(-4)}_integrity_manifest.json`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="flex-1 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs rounded-xl font-mono border border-slate-700/60 transition cursor-pointer font-bold flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Manifest JSON
                </button>
                <button
                  onClick={() => setSelectedLogDetails(null)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-white text-slate-900 text-xs rounded-xl font-mono transition cursor-pointer font-bold"
                >
                  Close Metrics Check
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL B: CREATE NEW API GATEWAY KEY */}
      <AnimatePresence>
        {isNewKeyOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-5 md:p-6 space-y-4 relative text-slate-200"
            >
              <button
                onClick={() => setIsNewKeyOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-800 transition text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1 border-b border-slate-800 pb-3">
                <strong className="text-sm font-bold text-white block uppercase font-mono tracking-wider">Configure Gateway Token</strong>
                <p className="text-xs text-slate-500">Provide an administrative client identifier signature.</p>
              </div>

              <form onSubmit={createApiKeyToken} className="space-y-4 text-xs font-mono">
                <div className="space-y-1.5">
                  <label className="text-slate-400 block font-bold uppercase">Client Gateway Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Frankfurt SMTP Gateway" 
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl p-2.5 outline-none text-slate-100 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-end">
                    <label className="text-slate-400 block font-bold uppercase">Rate limit capacity</label>
                    <strong className="text-blue-400 font-bold">{newKeyRate} req/min</strong>
                  </div>
                  <input 
                    type="range" 
                    min="100" 
                    max="1500" 
                    step="100"
                    value={newKeyRate}
                    onChange={(e) => setNewKeyRate(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                  />
                  <span className="text-[8px] text-slate-550 block">Assigned dynamic rate bounds for client thread pools</span>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNewKeyOpen(false)}
                    className="flex-1 py-2 border border-slate-750 text-slate-400 hover:bg-slate-800 hover:text-white font-bold rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-blue-606 hover:bg-blue-600 text-white font-extrabold rounded-xl transition shadow-lg tracking-wide uppercase"
                  >
                    Generate Key
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

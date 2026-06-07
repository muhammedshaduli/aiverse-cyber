import { useState, useEffect, useRef, useMemo, FormEvent } from "react";
import { 
  ShieldCheck, Shield, Key, Lock, Eye, AlertTriangle, Database, Globe, Search, 
  PlusCircle, Server, CheckSquare, RefreshCw, Layers, FileText, Compass, AlertCircle, 
  Sparkles, Building, Settings, X, Terminal, Users, User, Fingerprint, ArrowDown, 
  ExternalLink, Download, FileSignature, Zap, Check, EyeOff, Radio, ShieldAlert,
  ArrowRight, Play, Cpu, AlertOctagon, Landmark, Activity, UserCheck, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import CTOBlueprintReport from "./CTOBlueprintReport";

// Structure for 22 modules detailed descriptions
interface SecurityModule {
  id: number;
  name: string;
  purpose: string;
  features: string[];
  detectScope: string[];
  metrics: { label: string; value: string; color: string }[];
  category: "Identity & Risk" | "Data & Files" | "Access & Networks" | "Organizational" | "Email & Brand" | "Compliance & Privacy" | "Threat Intelligence" | "Personal";
}

const MODULE_DEFINITIONS: SecurityModule[] = [
  {
    id: 1,
    name: "AiVerse Identity Shield",
    purpose: "Protect digital identities, scan dark web channels, and secure credential trust.",
    features: ["Identity theft monitoring", "Dark web credential monitoring", "Email breach detection", "Password leak alerts", "Executive identity protection", "Social media impersonation detection"],
    detectScope: ["Corporate emails", "Leaked passwords", "API secret keys", "VIP social accounts"],
    metrics: [
      { label: "Identity Risk Score", value: "14%", color: "text-emerald-605" },
      { label: "Exposed Accounts", value: "2", color: "text-amber-600" },
      { label: "Breach History Database", value: "482M Records Searchable", color: "text-slate-600" },
      { label: "Executive Handles Active", value: "12 Channels", color: "text-blue-600" }
    ],
    category: "Identity & Risk"
  },
  {
    id: 2,
    name: "AiVerse Data Guardian",
    purpose: "Discover, classify, and prevent leaks of sensitive corporate and personal PII.",
    features: ["Sensitive file discovery", "Data classification", "PII detection", "Data leak prevention", "Document security scanning", "Data exposure alerts"],
    detectScope: ["Passport copies", "Emirates ID (784-*-*)", "Credit cards", "Employee payroll databases", "Customer contracts"],
    metrics: [
      { label: "Files Scanned Today", value: "148,205", color: "text-blue-600" },
      { label: "PII Elements Flagged", value: "43 Instances", color: "text-rose-600" },
      { label: "Isolation Vault State", value: "99.8% Secured", color: "text-emerald-600" },
      { label: "Unclassified Assets", value: "0 Assets", color: "text-slate-500" }
    ],
    category: "Data & Files"
  },
  {
    id: 3,
    name: "AiVerse Zero Trust Access",
    purpose: "Secure administrative access and enforce location and device-trust metrics.",
    features: ["Single Sign-On (SSO)", "Multi-factor authentication (MFA)", "Risk-based adaptive login", "Device health verification", "Geo-location boundaries", "Live session monitoring"],
    detectScope: ["Anomalous admin logins", "Unknown Chrome/Safari user-agents", "Unauthorized VPN endpoints", "Session hijack tokens"],
    metrics: [
      { label: "Active Authorized Users", value: "1,200 Connected", color: "text-blue-650" },
      { label: "Suspicious Login Blocking", value: "14 Blocked (24h)", color: "text-red-500" },
      { label: "Average Device Trust Score", value: "98.2 / 100", color: "text-emerald-605" },
      { label: "Dynamic Access Policies", value: "12 Global Rules", color: "text-slate-600" }
    ],
    category: "Access & Networks"
  },
  {
    id: 4,
    name: "AiVerse Insider Threat Monitor",
    purpose: "Detect unusual data patterns, offline transfers, and exfiltration risks.",
    features: ["Unusual downloads tracker", "Large file transfer alerts", "Unauthorized repository access", "Data exfiltration analysis", "Privilege abuse triggers"],
    detectScope: ["Bulk customer DB downloads", "Encrypted ZIP uploads to external portals", "Off-hours system backups"],
    metrics: [
      { label: "Transfer Activity Rate", value: "1.2 MB/s", color: "text-slate-500" },
      { label: "Exfiltration Risks Identified", value: "0 Critical", color: "text-emerald-600" },
      { label: "Privilege Escalation Triggers", value: "1 Audit Required", color: "text-amber-500" },
      { label: "Anomalous Behavioral Index", value: "Normal (3.1/10)", color: "text-blue-600" }
    ],
    category: "Identity & Risk"
  },
  {
    id: 5,
    name: "AiVerse AI Governance",
    purpose: "Monitor and safeguard employee usage of generative AI models without data leakage.",
    features: ["AI Tool tracking (ChatGPT, Gemini, Claude, Copilot)", "AI-generated code verification", "Real-time prompt filtration", "Corporate IP leak protection", "Usage reports & quota limits"],
    detectScope: ["Proprietary source-code uploads", "API keys sent in chats", "Synthetic output copyright matches"],
    metrics: [
      { label: "Active AI Sessions Today", value: "482 Sessions", color: "text-indigo-600" },
      { label: "Leaked Source-Code Blocks Blocked", value: "9 Prompts Intercepted", color: "text-rose-500" },
      { label: "Model Compliance Index", value: "UAE PDPL Compliant", color: "text-emerald-605" },
      { label: "Internal AI Agents Configured", value: "5 Active Agents", color: "text-slate-600" }
    ],
    category: "Organizational"
  },
  {
    id: 6,
    name: "AiVerse Brand Protection",
    purpose: "Track digital counterfeits, brand impersonation schemes, and domain squates on the internet.",
    features: ["Fake website crawling", "Domain spoofing alert", "Brand impersonation social accounts", "Unauthorized advertising traps", "App store counterfeit search"],
    detectScope: ["Adversarial domain variations (.co, .support)", "Cloned CSS landing sheets", "Fake social media channels"],
    metrics: [
      { label: "Global Domains Scanned", value: "12,400+ Daily", color: "text-slate-500" },
      { label: "Fake Impostor Sites Takedown", value: "3 Platforms Active", color: "text-emerald-600" },
      { label: "Social Pages Reported", value: "12 Channels (Meta/X)", color: "text-amber-500" },
      { label: "Legal Take-down SLA", value: "100% Success Rate", color: "text-blue-600" }
    ],
    category: "Email & Brand"
  },
  {
    id: 7,
    name: "AiVerse Executive Protection",
    purpose: "Audit audio, video, and social channels for executive deepfakes and speech cloning threats.",
    features: ["Deepfake video identification", "Synthetic voice cloning detection", "Fake automated interviews traps", "Executive executive profile monitoring"],
    detectScope: ["Voicemail clone injections", "Midjourney/Sora video frame noise", "Synthetic news stories"],
    metrics: [
      { label: "Biometric Voice Footprints", value: "5 Executive Signatures", color: "text-blue-600" },
      { label: "Cloned Media Detected", value: "1 Defeated (Voice-V2)", color: "text-rose-600" },
      { label: "Acoustic GAN Confidence Score", value: "99.4% Accurate", color: "text-emerald-605" },
      { label: "Sovereign Proofing State", value: "Active (24x7)", color: "text-slate-600" }
    ],
    category: "Identity & Risk"
  },
  {
    id: 8,
    name: "AiVerse Email Security",
    purpose: "Prevent phishing attempts, Business Email Compromise (BEC), and CEO wire-transfer fraud.",
    features: ["Artificial cognitive phishing detection", "Language sentiment mimicry checks", "Suspicious link isolation", "Malicious executable attachment sandboxing"],
    detectScope: ["Wire transfer requests", "Urgent executive directives", "Forged DKIM/SPF headers"],
    metrics: [
      { label: "Emails Analyzed (24h)", value: "24,050", color: "text-slate-500" },
      { label: "Phishing Attempts Isolated", value: "147 Isolated", color: "text-emerald-600" },
      { label: "BEC Threat Signals Found", value: "2 Compromised Links", color: "text-rose-600" },
      { label: "Sandbox Quarantine Delay", value: "0.1ms (Air-gapped)", color: "text-blue-600" }
    ],
    category: "Email & Brand"
  },
  {
    id: 9,
    name: "AiVerse Secure Collaboration",
    purpose: "Exempt document and file assets from leaks with sovereign watermarks and custom expiration cycles.",
    features: ["Secure decentralized file storage", "Immutable digital forensic watermarks", "Strict key-based access logs", "Automatic file expiration", "Real-time print/download inhibition"],
    detectScope: ["Corporate IP leaks", "Unmarked PDF distribution", "Unauthorized metadata tags"],
    metrics: [
      { label: "Files Vaulted", value: "12,940 Documents", color: "text-indigo-600" },
      { label: "Secured Watermarked Downloads", value: "348 PDFs", color: "text-emerald-600" },
      { label: "Active Share Paths", value: "14 Active Link Loops", color: "text-blue-600" },
      { label: "Access Revocation Rate", value: "On-demand Instant", color: "text-slate-500" }
    ],
    category: "Compliance & Privacy"
  },
  {
    id: 10,
    name: "AiVerse Vendor Risk Management",
    purpose: "Map external suppliers, partners, and API supply lines for downstream vulnerabilities.",
    features: ["Third-party posture assessment", "Suppliers security index tracker", "Downstream data liability logs", "Compliance verification dashboards"],
    detectScope: ["Outdated vendor libraries", "Exposed subcontractor credentials", "Partner company data incidents"],
    metrics: [
      { label: "Suppliers Monitored", value: "85 Entities", color: "text-slate-600" },
      { label: "Sub-par Compliance Alarms", value: "2 Partners Flagged", color: "text-amber-500" },
      { label: "Average downstream Risk Score", value: "88 / 100 Stable", color: "text-emerald-600" },
      { label: "Automated Audit Loops", value: "Monthly Automation", color: "text-blue-600" }
    ],
    category: "Organizational"
  },
  {
    id: 11,
    name: "AiVerse Prompt Security",
    purpose: "Defend enterprise LLMs and digital assistants from malicious prompt injection and jailbreaks.",
    features: ["Prompt injection blocking", "System directive reinforcement", "Adversarial text filtering", "Model output verification"],
    detectScope: ["Jailbreak sequences (DAN mode, etc.)", "Indirect injection hidden in PDF/HTML scripts", "Unauthorized model credentials scraping"],
    metrics: [
      { label: "Model Queries Audited", value: "1.2M Requests", color: "text-slate-500" },
      { label: "Jailbreaks Intercepted", value: "32 Injection Targets", color: "text-emerald-600" },
      { label: "Syntactic Leak Confidence", value: "99.9% High Protection", color: "text-emerald-605" },
      { label: "Bypassed Filter Traps", value: "0 Bypassed", color: "text-blue-600" }
    ],
    category: "Compliance & Privacy"
  },
  {
    id: 12,
    name: "AiVerse AI Agent Security",
    purpose: "Oversee operational autonomous agents, checking actions, system permissions, and logs.",
    features: ["Agent command auditing", "Sandbox execution limits", "Decision verification system", "Malicious logic intervention"],
    detectScope: ["Unauthorized outbound API triggers", "Database records override commands", "Agent key usage anomalies"],
    metrics: [
      { label: "Autonomous Agents Regulated", value: "4 Custom Agents", color: "text-indigo-600" },
      { label: "Authorized Actions Executed", value: "482,050 Actions", color: "text-slate-500" },
      { label: "Security Policy Infractions", value: "0 Actions Blocked", color: "text-emerald-650" },
      { label: "Sovereign Audit Log Trace", value: "Immutable Log Live", color: "text-blue-600" }
    ],
    category: "Organizational"
  },
  {
    id: 13,
    name: "AiVerse Model Verification",
    purpose: "Assert origin, hash integrity, and tamper-proof states for local enterprise neural networks.",
    features: ["Neural payload signature hashing", "Weights tampering protection", "State verification routines", "AI supply chain tracking"],
    detectScope: ["Weights drift variations", "Adversarial training data poisoning", "Neural file configuration delta"],
    metrics: [
      { label: "Neural Hash States Verified", value: "14 Large Models", color: "text-blue-650" },
      { label: "Integrity Status", value: "100% Un-tampered", color: "text-emerald-600" },
      { label: "Poisoning Scans Done", value: "Weekly Verification", color: "text-slate-500" },
      { label: "Model Origin Authenticity", value: "Cryptographically Sealed", color: "text-indigo-600" }
    ],
    category: "Compliance & Privacy"
  },
  {
    id: 14,
    name: "AiVerse Compliance Center",
    purpose: "Map regulatory frameworks GDPR, UAE PDPL, ISO 27001, and SOC 2 to data assets to eliminate gaps.",
    features: ["Compliance readiness dashboards", "Sovereign PDPL compliance indexes", "GDPR audit report exports", "SOC 2 Trust Principles audits"],
    detectScope: ["Non-compliant logs storage", "Unencrypted European data transfers", "Cookie tracking violations"],
    metrics: [
      { label: "UAE PDPL Score Score", value: "97% Compliant", color: "text-emerald-605" },
      { label: "ISO 27001 Readiness Rate", value: "98% Prepared", color: "text-emerald-600" },
      { label: "Identified Gaps to Solve", value: "2 Actions Outstanding", color: "text-amber-500" },
      { label: "Automated Report Auditors", value: "Audit-ready State", color: "text-slate-600" }
    ],
    category: "Compliance & Privacy"
  },
  {
    id: 15,
    name: "AiVerse Privacy Vault",
    purpose: "Secure administrative certificates, employee passports, and private customer databases.",
    features: ["Symmetric key generation in-premises", "Double envelope encryption", "Strict key-owner logs", "Encrypted document sharing pipeline"],
    detectScope: ["Unsecured credential files", "Decrypted passport uploads", "Exposed cloud database pools"],
    metrics: [
      { label: "Active Cryptographic Keys", value: "12 Sovereign Core Keys", color: "text-slate-500" },
      { label: "Stored Documents Encrypted", value: "1,200 High Value Docs", color: "text-indigo-650" },
      { label: "Vault Intrusion Alarms", value: "0 Logged Attempts", color: "text-emerald-600" },
      { label: "Secure Extraction Speed", value: "Instant Decrypt (Decentralised)", color: "text-blue-600" }
    ],
    category: "Compliance & Privacy"
  },
  {
    id: 16,
    name: "AiVerse Consent Management",
    purpose: "Track and orchestrate cookie directives, user data deletion calls, and user consent records.",
    features: ["Dynamic user cookie engine", "PDPL Erasure Request tracker", "Opt-in consent ledger logs", "Dynamic Privacy Policy routing"],
    detectScope: ["Unsanctioned tracking pixels", "Expired cookies expiration state", "Unprocessed personal data removal requests"],
    metrics: [
      { label: "User Consents Collected", value: "84,950 Records", color: "text-slate-500" },
      { label: "Data Portability Exports", value: "12 Handled", color: "text-emerald-650" },
      { label: "Erasure SLAs Completed", value: "100% on schedule", color: "text-emerald-605" },
      { label: "Dynamic Consent Triggers", value: "Active on 14 Sites", color: "text-blue-600" }
    ],
    category: "Compliance & Privacy"
  },
  {
    id: 17,
    name: "AiVerse Threat Intelligence",
    purpose: "Gather live reports of sovereign vulnerabilities, ransomware profiles, and worldwide IP exploits.",
    features: ["Adversarial threat mapping", "Ransomware signature feeds", "Vulnerability database connection", "Zero-day exploitation reports"],
    detectScope: ["Active C2 server IPs", "Shodan exposed routers", "Malware file signature hashes"],
    metrics: [
      { label: "Global Indicators Tracked", value: "12.4M Signatures", color: "text-slate-500" },
      { label: "Urgent Alerts Applicable", value: "2 Vulnerabilities Identified", color: "text-rose-500" },
      { label: "Network IPS Integration", value: "Sovereign Ingress Hooked", color: "text-emerald-600" },
      { label: "Worldwide Exploit Trends", value: "98% Intel Confidence", color: "text-blue-600" }
    ],
    category: "Threat Intelligence"
  },
  {
    id: 18,
    name: "AiVerse Attack Surface Management",
    purpose: "Discover internet-visible servers, open service ports, and forgotten shadow servers.",
    features: ["Public IP scan crawler", "Open service port surveyor", "Exposed cluster identifier", "DNS sub-domain crawler", "Shadow IT application locator"],
    detectScope: ["Exposed database ports (5432, 27017)", "Outdated SSL security levels", "Cloned development sub-domains"],
    metrics: [
      { label: "Discovered Public Assets", value: "48 Assets Identified", color: "text-blue-650" },
      { label: "Open Suspicious Ports", value: "0 Ports Open", color: "text-emerald-600" },
      { label: "SSL Certificate Warnings", value: "1 Security Expiration Alert", color: "text-amber-500" },
      { label: "Shadow Servers Isolated", value: "1 Unregistered Hub Identified", color: "text-rose-600" }
    ],
    category: "Threat Intelligence"
  },
  {
    id: 19,
    name: "AiVerse Vulnerability Scanner",
    purpose: "Trigger on-demand automated scans across company websites, APIs, and micro-services.",
    features: ["Web application vulnerability audits (OWASP Top 10)", "Secure REST/GraphQL API query checker", "System container scanning", "Misconfiguration checklist audits"],
    detectScope: ["SQL Injection paths", "Cross-Site Scripting (XSS)", "Default administrator accounts", "Insecure Docker headers"],
    metrics: [
      { label: "Systems Target Index", value: "34 Active URLs", color: "text-slate-500" },
      { label: "Outstanding Weaknesses", value: "4 Low Threat Gaps", color: "text-amber-500" },
      { label: "Last Complete Scanner Loop", value: "15 min ago", color: "text-emerald-600" },
      { label: "Scan Method Cycle", value: "Dynamic Whitebox", color: "text-blue-600" }
    ],
    category: "Threat Intelligence"
  },
  {
    id: 20,
    name: "AiVerse Personal Guardian",
    purpose: "Defend individuals and sovereign VIPs from AI wire-scams, voice clones, and personal target plans.",
    features: ["Personal secure contact list lock", "Automated synthetic scam voice interceptor", "Deepfake caller warning profile", "VIP private web mentions scans"],
    detectScope: ["Impersonated WhatsApp calls", "Cloned family voice notes", "Compromised credential links"],
    metrics: [
      { label: "VIP Devices Coordinated", value: "8 Secure Devices", color: "text-slate-500" },
      { label: "Attempted Voice Scams Blocked", value: "3 Scams Defeated", color: "text-emerald-600" },
      { label: "Threat Score Status", value: "98% Clean Vector", color: "text-emerald-605" },
      { label: "Secure Mobile Air-Gap", value: "Active (Encrypted Loop)", color: "text-indigo-650" }
    ],
    category: "Personal"
  },
  {
    id: 21,
    name: "AiVerse Family Protection",
    purpose: "Enlist home devices, grandparents networks, and children profiles to defeat remote digital extortion.",
    features: ["Online clone extortion protector", "Fake AI voice validation tool", "Children profile privacy monitor", "Adversarial messages analyzer"],
    detectScope: ["Urgent emergency money wire prompts", "Online bullying profiles", "Malicious target downloads"],
    metrics: [
      { label: "Family Nodes Enrolled", value: "24 Private Devices", color: "text-slate-650" },
      { label: "Phishing Messages Blocked", value: "48 SMS/Chats Blocked", color: "text-emerald-600" },
      { label: "Voice Verification Success", value: "100% Verified Codecs", color: "text-emerald-605" },
      { label: "Emergency Support Line", value: "Direct Secure Connect", color: "text-blue-600" }
    ],
    category: "Personal"
  },
  {
    id: 22,
    name: "AiVerse Digital Reputation Monitor",
    purpose: "Scour global search indices, comments, and forums for hostile AI character assassinations.",
    features: ["Global forum mention tracker", "Fabricated review alert loop", "Deepfake target video tracing", "Adversarial SEO alert system"],
    detectScope: ["Unverified consumer claims", "Fake AI-generated review waves", "Negative sovereign campaigns"],
    metrics: [
      { label: "Digital Forums Crawled", value: "1,200+ Forums", color: "text-slate-500" },
      { label: "Identified Cloned Mentions", value: "1 Impostor Review WAVE", color: "text-rose-605" },
      { label: "Sentiment Index", value: "Positive Integrity Score (94%)", color: "text-emerald-600" },
      { label: "Search Engine Alerts Set", value: "Real-time Pushes", color: "text-blue-600" }
    ],
    category: "Personal"
  }
];

// Seed procedural records for individual modules
// Each module will have 25 highly structured records. Plus capability to inject more.
function generateSeedData(moduleId: number): any[] {
  const list: any[] = [];
  const startYear = 2026;
  const regions = ["Dubai, UAE", "Abu Dhabi, UAE", "Zürich, CH", "Riyadh, KSA", "London, UK", "New York, US", "Frankfurt, DE", "Singapore, SG"];
  const severityLevels = ["Critical", "High", "Medium", "Low"];
  
  for (let i = 1; i <= 25; i++) {
    const d = new Date(2026, 4, Math.max(1, 28 - i), 10, i * 4, 0);
    const dateStr = d.toISOString().split('T')[0] + " " + d.toTimeString().split(' ')[0];
    const targetRegion = regions[i % regions.length];
    
    switch (moduleId) {
      case 1: // Identity Shield
        list.push({
          id: i,
          account: `identity-${1000 + i}@corporate-${["energy", "banking", "sovereign", "telecom"][i % 4]}.com`,
          platform: ["Dark Web Forum Raid", "Pastebin Public Dump", "GitHub Public Repository Leak", "Impersonator X Channel", "Telegram Extortion Board"][i % 5],
          threatType: ["Credential File Hash Leak", "Plaintext Pass Log", "Linguistic Executive Clone", "Domain Spoof Mimic", "API key exposed"][i % 5],
          riskLevel: severityLevels[i % 4],
          foundAt: dateStr,
          status: i % 3 === 0 ? "Resolved" : i % 3 === 1 ? "Quarantined" : "Mitigation Required",
          details: `Identified SHA-256 pattern credential matches. Source: ${targetRegion}.`
        });
        break;
      case 2: // Data Guardian
        const names = ["Passport UAE PDF", "Emirates ID Archive", "VIP Financial Sheet", "Salary Card Log Excel", "Database Dump Customers"];
        const EmiratesIDPattern = `784-1992-${Math.floor(1000000 + Math.random() * 9000000)}-${Math.floor(Math.random() * 9)}`;
        const cardPattern = `XXXX-XXXX-XXXX-${4000 + i}`;
        list.push({
          id: i,
          fileName: `${names[i % names.length]}_copy_v${i}.bin`,
          classification: ["Strictly Proprietary", "Secret / Government Restricted", "Confidential Customer PII", "Unclassified"][i % 4],
          piiType: i % 4 === 0 ? "Emirates ID Spec" : i % 4 === 1 ? "Passport Image Scape" : i % 4 === 2 ? "Credit Card Token" : "Employee Core Record",
          rawIdentifier: i % 4 === 0 ? EmiratesIDPattern : i % 4 === 2 ? cardPattern : `DOC-REF-${85900 + i}`,
          riskLevel: i % 4 === 3 ? "Low" : "High",
          systemOrigin: `NFS Directory: /data/sovereign/${targetRegion.split(",")[0].toLowerCase()}_node_${i}`,
          status: i % 2 === 0 ? "Encrypted & Vaulted" : "Active Mitigation In Progress"
        });
        break;
      case 3: // Zero Trust Access
        list.push({
          id: i,
          username: `operator_${100 + i}@defense.sovereign.ae`,
          ipAddress: `10.185.${Math.floor(Math.random() * 254 + 1)}.${10 + i}`,
          device: ["macOS Sequoia Secure Workstation", "Windows 11 Corporate Enterprise", "Linux Secure Terminal V4", "iPhone 15 Pro AirGapped WorkMobile"][i % 4],
          geolocation: targetRegion,
          trustScore: `${Math.floor(100 - i * 1.5)}%`,
          mfaMethod: ["FIDO2 Hardware Key", "Biometric Facial Mesh", "Time-based OTP Hash", "None Triggered"][i % 4],
          status: i % 5 === 0 ? "Blocked - Suspicious IP Jump" : "Approved & Connected"
        });
        break;
      case 4: // Insider Threat Monitor
        list.push({
          id: i,
          employee: `${["Aisha Al-Mansoori", "Johnathan Pierce", "Omar Al-Dhaheri", "Sarah Jenkins", "Khalid Al-Hashemi"][i % 5]}`,
          eventDescription: ["Bulk customer DB download requested", "Extraneous secure zip file compilation detected", "Encryption keys copy event logged", "Out-of-office folder traversal", "External Cloud backup handshake"][i % 5],
          dataVolume: `${(i * 185).toFixed(1)} MB`,
          relativeSpeed: `${(5 + i * 2.5).toFixed(1)} MB/s`,
          threatProbability: `${Math.floor(20 + i * i * 0.2)}%`,
          riskLevel: i % 6 === 0 ? "Critical" : i % 6 === 1 || i % 6 === 2 ? "High" : "Medium",
          status: i % 3 === 0 ? "Automated Lockdown Active" : "Under Active Analyst Audit"
        });
        break;
      case 5: // AI Governance
        list.push({
          id: i,
          employee: `terminal_user_${200 + i}`,
          aiTarget: ["ChatGPT Plus Enterprise", "Claude 3.5 Sonnet Sovereign", "Google Gemini Pro API", "Github Copilot Enterprise", "Internal Llama-3-Refinements"][i % 5],
          promptSnippet: `"${["Generate script to compile files list", "Analyse database credentials file for security audit", "Read contract template and export Emirates IDs", "Verify code for backend loop auth on port 3000"][i % 4]}"`,
          riskCheck: ["Sensitive IP Found: Core Code", "Restricted Emirates PII Flagged", "No Exposure Risk Found", "Proprietary IP Alert: Zurich Key Vault"][i % 4],
          status: i % 4 === 1 || i % 4 === 3 ? "Blocked Context Payload" : "Audit Passed Logged"
        });
        break;
      default: // Generic data structure fallback supporting modules 6 to 22
        list.push({
          id: i,
          title: `Forensic Event Unit ${1200 + i}`,
          componentTarget: MODULE_DEFINITIONS[moduleId - 1]?.name || "Shield Core",
          locationDetails: targetRegion,
          severity: severityLevels[i % 4],
          riskWeight: `${70 + (i % 30)}%`,
          timestamp: dateStr,
          status: i % 2 === 0 ? "Mitigated & Cryptographically Signed" : "Under Isolation Audit",
          forensicHash: `SHA-256: 4eb7c${Math.floor(1000 + i*135)}a04ff`
        });
    }
  }
  return list;
}

export default function CyberPrivacyPortal({ onClose }: { onClose: () => void }) {
  const [isCTOReportOpen, setIsCTOReportOpen] = useState(false);
  // Onboard Session State
  const [sessionUser, setSessionUser] = useState<{ orgName: string; onPremLocation: string; scope: string } | null>(null);
  
  // Real-time toast alert state for administrative action feedback
  const [auditNotification, setAuditNotification] = useState<{ message: string; type: "threat" | "mitigate" | "info" } | null>(null);
  
  // Auto-clear notification after a short delay
  useEffect(() => {
    if (auditNotification) {
      const timer = setTimeout(() => {
        setAuditNotification(null);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [auditNotification]);

  // Registration States
  const [registerForm, setRegisterForm] = useState({
    orgName: "",
    onPremLocation: "Sovereign Private Cloud - Dubai Digital Hub",
    scope: "Enterprise Sovereign Protection Suite",
    agreeToTerms: true
  });

  // Selected side menu module ID
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  
  // Module-specific search terms inside data table
  const [tableSearch, setTableSearch] = useState("");

  // Seed Data Map state representing local durable on-premises storage variables
  const [modulesData, setModulesData] = useState<{ [key: number]: any[] }>(() => {
    const initialMap: { [key: number]: any[] } = {};
    for (let m = 1; m <= 22; m++) {
      initialMap[m] = generateSeedData(m);
    }
    return initialMap;
  });

  // Clock state
  const [timeStr, setTimeStr] = useState("07:11:53 UTC");
  useEffect(() => {
    const updateTime = () => {
      const parentNow = new Date();
      setTimeStr(parentNow.toUTCString().replace("GMT", "UTC"));
    };
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Three.js / Vanilla JS Inspired Orbital Network Particle Canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    // Particle class for sovereign visual network
    interface NodeParticle {
      x: number;
      y: number;
      z: number;
      ox: number;
      oy: number;
      oz: number;
      radius: number;
      color: string;
      speed: number;
      angle: number;
    }

    const particles: NodeParticle[] = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * 300 - 150,
        ox: Math.random() * width - width / 2,
        oy: Math.random() * height - height / 2,
        oz: Math.random() * 300 - 150,
        radius: Math.random() * 1.5 + 1.2,
        color: i % 3 === 0 ? "rgba(37, 99, 235, 0.6)" : i % 3 === 1 ? "rgba(99, 102, 241, 0.6)" : "rgba(13, 148, 136, 0.5)",
        speed: Math.random() * 0.006 + 0.002,
        angle: Math.random() * Math.PI * 2
      });
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 450;
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left - width / 2,
        y: e.clientY - rect.top - height / 2
      };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    // Render loop mimicking Three.js 3D orthographic matrix
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(248, 250, 252, 0.15)"; // Very clean off-white backing grid
      ctx.fillRect(0, 0, width, height);

      // Draw subtle orbital grid boundaries in Light Mode
      ctx.strokeStyle = "rgba(226, 232, 240, 0.8)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 110, 0, Math.PI * 2);
      ctx.arc(width / 2, height / 2, 220, 0, Math.PI * 2);
      ctx.stroke();

      const time = Date.now() * 0.0003;
      const cosX = Math.cos(time);
      const sinX = Math.sin(time);

      particles.forEach((p) => {
        // Orbit update rotation mapping
        p.angle += p.speed;
        const rad = Math.sqrt(p.ox * p.ox + p.oz * p.oz);
        const curX = Math.cos(p.angle) * rad;
        const curZ = Math.sin(p.angle) * rad;
        
        // 3D Matrix Projection rotation offsets
        const rotatedX = curX * cosX - curZ * sinX;
        const rotatedZ = curX * sinX + curZ * cosX;
        const rotatedY = p.oy;

        // Apply mouse physics interactive pull
        const dx = mousePos.current.x - rotatedX;
        const dy = mousePos.current.y - rotatedY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let pullX = 0;
        let pullY = 0;
        if (dist < 150) {
          const force = (150 - dist) / 150;
          pullX = (dx / dist) * force * 15;
          pullY = (dy / dist) * force * 15;
        }

        // Project coordinate logic to 2D
        const fov = 350;
        const perspectiveScale = fov / (fov + rotatedZ);
        const finalX = (rotatedX + pullX) * perspectiveScale + width / 2;
        const finalY = (rotatedY + pullY) * perspectiveScale + height / 2;

        p.x = finalX;
        p.y = finalY;

        // Render point node
        if (finalX > 0 && finalX < width && finalY > 0 && finalY < height) {
          ctx.beginPath();
          ctx.arc(finalX, finalY, p.radius * perspectiveScale * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
      });

      // Draw connection lines in a mesh representation
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 95) {
            const alpha = (1 - dist / 95) * 0.25;
            ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrame);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Filter modules based on search and category selections
  const filteredModules = useMemo(() => {
    return MODULE_DEFINITIONS.filter((mod) => {
      const matchSearch = mod.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          mod.purpose.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = categoryFilter === "All" || mod.category === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [searchTerm, categoryFilter]);

  // Retrieve current active data array
  const activeModule = MODULE_DEFINITIONS.find((m) => m.id === activeModuleId) || MODULE_DEFINITIONS[0];
  const activeDataList = modulesData[activeModuleId] || [];

  // Filter specific data list
  const filteredDataTable = useMemo(() => {
    if (!tableSearch) return activeDataList;
    const query = tableSearch.toLowerCase();
    
    return activeDataList.filter((row: any) => {
      // Loop over key/values in row
      return Object.values(row).some((val) => 
        String(val).toLowerCase().includes(query)
      );
    });
  }, [activeDataList, tableSearch, activeModuleId]);

  // Onboard Action
  const handleOnboardGenerate = (e: FormEvent) => {
    e.preventDefault();
    if (!registerForm.orgName) return;

    setSessionUser({
      orgName: registerForm.orgName,
      onPremLocation: registerForm.onPremLocation,
      scope: registerForm.scope
    });
    // Set first module to active as default
    setActiveModuleId(1);
    setSearchTerm("");
    setCategoryFilter("All");
  };

  // Perform single administrative mitigation (e.g. resolve risk, encrypt file, lock session)
  const executeMitigationAction = (recordId: number, actionType: string) => {
    setModulesData(prev => {
      const modArr = [...prev[activeModuleId]];
      const targetIdx = modArr.findIndex((r) => r.id === recordId);
      if (targetIdx !== -1) {
        modArr[targetIdx] = {
          ...modArr[targetIdx],
          status: actionType === "encrypt" ? "Encrypted & Vaulted" : 
                  actionType === "block" ? "Blocked & Intercepted" : 
                  actionType === "lock" ? "Automated Lockdown Active" :
                  "Resolved & Signed"
        };
      }
      return { ...prev, [activeModuleId]: modArr };
    });

    const label = actionType === "encrypt" ? "Encrypted & Vaulted Documents" :
                  actionType === "block" ? "Blocked Network Ingress Session" :
                  "Resolved Threat Vectors";

    setAuditNotification({
      message: `🛡️ TRACE #${recordId < 10 ? '0' + recordId : recordId}: ${label} successfully secured on premises.`,
      type: "mitigate"
    });
  };

  // Run customized live threat simulation test
  const triggerSimulationSimulation = () => {
    const randomSuffix = Math.floor(Math.random() * 9000 + 1000);
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    
    let simulatedRecord: any = {};
    
    switch (activeModuleId) {
      case 1: // Identity Shield
        simulatedRecord = {
          id: activeDataList.length + 1,
          account: `vip-executive_${randomSuffix}@${sessionUser?.orgName.replace(/\s+/g, '').toLowerCase() || "company"}.ae`,
          platform: "Malicious Github Public Commit Searcher",
          threatType: "Exposed JWT Security Key Token",
          riskLevel: "Critical",
          foundAt: dateStr,
          status: "Mitigation Required",
          details: "Automatic scan flagged suspicious base64 credentials inside private-build commit script."
        };
        break;
      case 2: // Data Guardian
        simulatedRecord = {
          id: activeDataList.length + 1,
          fileName: `unauthorized_export_emirates_ids_${randomSuffix}.xlsx`,
          classification: "Strictly Proprietary",
          piiType: "Emirates ID Spec",
          rawIdentifier: "784-1995-1850239-4",
          riskLevel: "High",
          systemOrigin: "Client Workstation PC: NODE-DLD-890",
          status: "Active Mitigation In Progress"
        };
        break;
      case 3: // Zero Trust
        simulatedRecord = {
          id: activeDataList.length + 1,
          username: `external_supplier_${randomSuffix}@contractor.ae`,
          ipAddress: "192.112.5.82",
          device: "Android mobile client (Sovereign Out of Bounds)",
          geolocation: "Zürich, CH (Secured Bunker)",
          trustScore: "24%",
          mfaMethod: "No security key",
          status: "Blocked - Suspicious IP Jump"
        };
        break;
      case 4: // Insider Threat
        simulatedRecord = {
          id: activeDataList.length + 1,
          employee: "Automated Bot Script Sim",
          eventDescription: "Sequential recursive copy of central secure cloud cluster",
          dataVolume: "14.2 GB",
          relativeSpeed: "85.2 MB/s",
          threatProbability: "98%",
          riskLevel: "Critical",
          status: "Automated Lockdown Active"
        };
        break;
      case 5: // AI Governance
        simulatedRecord = {
          id: activeDataList.length + 1,
          employee: "internal_agent_test",
          aiTarget: "ChatGPT Custom Copilot Model",
          promptSnippet: '"Analyze proprietary algorithm vector hash file: SECURE_KEYS_AE.json"',
          riskCheck: "Proprietary IP Alert: Zurich Key Vault",
          status: "Blocked Context Payload"
        };
        break;
      default:
        simulatedRecord = {
          id: activeDataList.length + 1,
          title: `Simulated Forensic Unit #${randomSuffix}`,
          componentTarget: activeModule.name,
          locationDetails: "Dubai Sovereign Cloud Node",
          severity: "High",
          riskWeight: "94%",
          timestamp: dateStr,
          status: "Under Isolation Audit",
          forensicHash: `SHA-256: e8b9f_${randomSuffix}aa`
        };
    }

    setModulesData(prev => {
      return {
        ...prev,
        [activeModuleId]: [simulatedRecord, ...prev[activeModuleId]]
      };
    });

    setAuditNotification({
      message: `⚠️ SIMULATION INJECTED: New security incident registered inside ${activeModule.name} logs.`,
      type: "threat"
    });
  };

  const i_factor = 25; // Marker for procedural

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-blue-600 selection:text-white" id="cybersec-data-privacy-on-premises-portal">
      
      {/* 22 Modules Navigation Banner in Subhead */}
      <div className="bg-slate-905 text-white/90 text-[10px] font-mono py-1 px-4 md:px-8 border-b border-slate-900 flex justify-between items-center select-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 via-slate-950 to-slate-950">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-extrabold uppercase">Sovereign Air-Gapped Premises Portal (Active Node)</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-slate-400">Server: <strong className="text-white">v3.5.0-OnPremises</strong></span>
          <span className="font-bold text-blue-400 font-mono tracking-tight">{timeStr}</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col relative min-h-[700px]">

        {/* Dynamic Onboard Wizard Overlay - 100% Light styled */}
        <AnimatePresence>
          {!sessionUser && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-50/90 backdrop-blur-md z-30 flex items-center justify-center p-2 rounded-2xl"
            >
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-2xl relative overflow-hidden">
                
                {/* Visual Canvas left block for gorgeous Vanilla Animation (Col-span-5) */}
                <div className="lg:col-span-5 h-[280px] lg:h-auto bg-slate-50 border border-slate-150 rounded-2xl relative overflow-hidden flex flex-col justify-between p-5 select-none md:min-h-[350px]">
                  <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-pointer z-10" />
                  
                  <div className="z-20 pointer-events-none space-y-1">
                    <span className="font-mono text-[9px] bg-white border px-1.5 py-0.5 rounded text-blue-600 font-bold uppercase tracking-wider">Interactive 3D Engine</span>
                    <h5 className="font-display font-bold text-slate-800 text-sm tracking-tight leading-none">Cyber Matrix Mesh</h5>
                  </div>

                  <div className="z-20 pointer-events-none mt-auto space-y-1">
                    <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                      Warp structural coordinates using your pointer. Our interactive vanilla canvas simulates high-density satellite link networks securely.
                    </p>
                    <span className="text-[8px] font-mono font-bold text-slate-400 block uppercase">SYSTEM RUNNING ON-PREMISES 100%</span>
                  </div>
                </div>

                {/* Register Wizard right block (Col-span-7) */}
                <form onSubmit={handleOnboardGenerate} className="lg:col-span-7 space-y-6 flex flex-col justify-center">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-605 text-xs font-semibold">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <span>Sovereign Identity Protection Ledger</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-black text-slate-900 tracking-tight leading-none">
                      Deploy Your Sovereign Environment
                    </h3>
                    <p className="text-xs text-slate-500 font-light leading-relaxed max-w-md">
                      Join as a registered administrator or security officer. Generate fully populated cyber telemetry records operating securely in your own hardware environment.
                    </p>
                    
                    {/* Instant Autofill demo action */}
                    <div className="pt-2">
                      <button 
                        type="button" 
                        onClick={() => {
                          setRegisterForm({
                            orgName: "Dubai Aviation Authority Hub",
                            onPremLocation: "Sovereign Private Cloud - Dubai Digital Hub",
                            scope: "Military Grade Shield Network - Hardened Unit",
                            agreeToTerms: true
                          });
                          setSessionUser({
                            orgName: "Dubai Aviation Authority Hub",
                            onPremLocation: "Sovereign Private Cloud - Dubai Digital Hub",
                            scope: "Military Grade Shield Network - Hardened Unit"
                          });
                          setActiveModuleId(1);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-mono text-[9.5px] font-bold border border-slate-950 transition flex items-center gap-1.5 cursor-pointer shadow-md select-none group"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
                        <span>Instant Autofill & Deploy (1-Click)</span>
                        <ChevronRight className="w-3 h-3 text-amber-400/70" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    
                    <div className="space-y-1.5">
                      <label className="text-slate-700 font-bold block font-mono uppercase tracking-wider text-[10px]">Company Name / Personal User Identity</label>
                      <input 
                        type="text"
                        required
                        placeholder="e.g. Dubai Sovereign Energy Authority"
                        value={registerForm.orgName}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, orgName: e.target.value }))}
                        className="w-full p-3 border border-slate-200 bg-slate-50 rounded-xl outline-none focus:bg-white focus:border-blue-505 font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1.5">
                        <label className="text-slate-700 font-bold block font-mono uppercase tracking-wider text-[10px]">Sovereign Host Cluster</label>
                        <select 
                          value={registerForm.onPremLocation}
                          onChange={(e) => setRegisterForm(prev => ({ ...prev, onPremLocation: e.target.value }))}
                          className="w-full p-2.5 border border-slate-200 bg-slate-50 rounded-xl outline-none text-xs text-slate-700 font-medium cursor-pointer"
                        >
                          <option value="Sovereign Private Cloud - Dubai Digital Hub">Dubai Digital Hub Cluster</option>
                          <option value="Sovereign Swiss Alpine AirGapped Bunker">Swiss Alpine Bunker Cloud</option>
                          <option value="Sovereign Riyadh Finance Core Security Network">Riy Riyadh Core Finance Cluster</option>
                          <option value="Dedicated Hardware Node - Local Airgapped LAN">Dedicated Local Hardware (Standard)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-slate-700 font-bold block font-mono uppercase tracking-wider text-[10px]">Sovereign Operational Scope</label>
                        <select 
                          value={registerForm.scope}
                          onChange={(e) => setRegisterForm(prev => ({ ...prev, scope: e.target.value }))}
                          className="w-full p-2.5 border border-slate-200 bg-slate-50 rounded-xl outline-none text-xs text-slate-700 font-medium cursor-pointer"
                        >
                          <option value="Enterprise Sovereign Protection Suite">Enterprise Sovereignty Protection (SME/Govt)</option>
                          <option value="Individual & Family Private Guardian Loop">Individual Protection Protocol</option>
                          <option value="Military Grade Shield Network - Hardened Unit">Military Hardened Tactical Framework</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 pt-1 font-mono text-[9px] text-slate-500 select-none">
                      <input 
                        type="checkbox" 
                        id="terms"
                        required
                        checked={registerForm.agreeToTerms}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                        className="mt-0.5 border-slate-300 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="terms" className="leading-tight cursor-pointer">
                        Assert that all generated keys, identity biometrics, raw logs, and compiled models remain in your absolute control inside local RAM/CPU spaces.
                      </label>
                    </div>

                  </div>

                  <div className="flex items-center gap-2 pt-2.5">
                    <button 
                      type="submit"
                      className="w-full py-3 px-5 bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-100/50 flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer font-mono"
                    >
                      <span>Deploy Sovereign LAN Cluster</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button 
                      type="button"
                      onClick={onClose}
                      className="px-5 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs rounded-xl transition cursor-pointer font-mono uppercase"
                    >
                      Cancel
                    </button>
                  </div>
                </form>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Header Bar (Once user is sessionized) */}
        {sessionUser && (
          <div className="space-y-6">
            
            {/* Upper Info Row */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-5 border border-slate-150 rounded-2xl shadow-sm relative overflow-hidden select-none">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-black uppercase text-blue-600 bg-blue-50 border border-blue-105 px-2 py-0.5 rounded-md">
                    Sovereign Workspace
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                    Host: <span className="text-slate-800">{sessionUser.onPremLocation}</span>
                  </span>
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-display font-extrabold text-slate-900 leading-none">
                    {sessionUser.orgName}
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">
                    Protection Scope: <strong className="text-slate-700">{sessionUser.scope}</strong>
                  </p>
                </div>
              </div>

              {/* Server KPI items */}
              <div className="flex flex-wrap items-center gap-5 font-mono text-[10.5px]">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-0.5 text-center min-w-[110px]">
                  <span className="text-[8px] text-slate-400 uppercase tracking-wider block font-bold">LAN IP Range</span>
                  <strong className="text-slate-800 block text-xs">10.190.22.1 / 24</strong>
                </div>
                <div className="p-3 bg-emerald-50/65 border border-emerald-100 rounded-xl space-y-0.5 text-center min-w-[110px]">
                  <span className="text-[8px] text-emerald-600 uppercase tracking-wider block font-bold">LAN Threat State</span>
                  <strong className="text-emerald-700 block text-xs">99.8% Secured</strong>
                </div>
                <div className="p-3 bg-white border border-slate-150 rounded-xl space-y-0.5 text-center min-w-[110px] shadow-sm">
                  <span className="text-[8px] text-slate-400 tracking-wider block font-bold">Active Modules</span>
                  <strong className="text-blue-600 block text-xs">22 Operational</strong>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      if (confirm("Are you sure you want to tear down this local sovereign simulation block? This resets the data to original state.")) {
                        setSessionUser(null);
                      }
                    }}
                    className="p-2 border border-slate-200 hover:border-slate-350 bg-white rounded-xl text-slate-505 transition shadow-sm hover:text-slate-800 cursor-pointer"
                    title="Reset Sovereign Session"
                  >
                    <RefreshCw className="w-4 h-4 text-slate-500" />
                  </button>
                  <button 
                    onClick={() => setIsCTOReportOpen(true)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition uppercase tracking-wider cursor-pointer font-mono flex items-center gap-1.5"
                  >
                    <FileText className="w-4 h-4 text-white" />
                    <span>CTO Blueprint</span>
                  </button>
                  <button 
                    onClick={onClose}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition uppercase tracking-wider cursor-pointer font-mono"
                  >
                    Exit Portal
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Dashboard Portal Workspace Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* MOBILE COMPACT SWITCHER: Only visible under lg (1024px) screens */}
              <div className="block lg:hidden bg-white border border-slate-150 rounded-2xl p-4 shadow-sm space-y-3.5 select-none w-full">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider font-extrabold text-blue-600 uppercase flex items-center gap-1.5 bg-blue-50/70 border border-blue-100 px-2 py-0.5 rounded-md">
                    <Layers className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: "3s" }} />
                    Sovereign Core Control ({filteredModules.length})
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 font-bold">
                    Active ID: <strong className="text-slate-800">#{activeModule.id < 10 ? `0${activeModule.id}` : activeModule.id}</strong>
                  </span>
                </div>
                
                {/* Mobile Search Bar */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-450" />
                  <input 
                    type="text"
                    placeholder="Search 22 modules..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-xs p-2.5 pl-9 border border-slate-200 bg-slate-50 rounded-xl outline-none focus:bg-white focus:border-blue-400 font-sans"
                  />
                </div>

                {/* Mobile Horizontal Swipe Category Filters */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none whitespace-nowrap -mx-4 px-4">
                  {["All", "Identity & Risk", "Data & Files", "Access & Networks", "Compliance & Privacy", "Threat Intelligence", "Personal"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategoryFilter(cat);
                        // Auto-focus on first module from the new category
                        const firstInCat = MODULE_DEFINITIONS.find(m => cat === "All" || m.category === cat);
                        if (firstInCat) {
                          setActiveModuleId(firstInCat.id);
                          setTableSearch("");
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all border cursor-pointer inline-block ${
                        categoryFilter === cat 
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm" 
                          : "bg-slate-50 border-slate-150 text-slate-505 hover:bg-slate-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Dropdown for matched modules */}
                <div className="relative">
                  <select
                    value={activeModuleId}
                    onChange={(e) => {
                      setActiveModuleId(Number(e.target.value));
                      setTableSearch("");
                    }}
                    className="w-full text-xs font-bold p-3 outline-none border border-slate-200 bg-slate-50 focus:bg-white rounded-xl cursor-pointer shadow-sm appearance-none pr-10 text-slate-800 transition font-sans"
                  >
                    {filteredModules.map((mod) => (
                      <option key={mod.id} value={mod.id}>
                        {mod.id < 10 ? `0${mod.id}` : mod.id} — {mod.name}
                      </option>
                    ))}
                    {filteredModules.length === 0 && (
                      <option value="">No matching modules in filter</option>
                    )}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3.5 pointer-events-none text-slate-450 border-l border-slate-150 rounded-r-xl bg-slate-100">
                    <ArrowDown className="w-3.5 h-3.5 text-slate-550" />
                  </div>
                </div>
              </div>

              {/* LEFT SIDEBAR: MODULE SELECTOR & SEARCH (col-span-4) - Hidden on Mobile View ports */}
              <div className="hidden lg:block lg:col-span-4 bg-white border border-slate-150 rounded-2xl p-4 md:p-5 space-y-4 shadow-sm select-none">
                
                {/* Search Bar for 22 Modules */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-wider font-bold text-slate-400 uppercase">Search Security Modules</span>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="Search amongst 22 modules..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full text-xs p-2.5 pl-9 border border-slate-200 bg-slate-50 rounded-xl outline-none focus:bg-white focus:border-blue-400"
                    />
                  </div>
                </div>

                {/* Sub-Category Filtering Tab row */}
                <div className="flex flex-wrap gap-1 border-b border-slate-105 pb-3">
                  {["All", "Identity & Risk", "Data & Files", "Access & Networks", "Compliance & Privacy", "Threat Intelligence", "Personal"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-2 py-1 rounded text-[9.5px] font-mono font-bold transition-all border cursor-pointer ${
                        categoryFilter === cat 
                          ? "bg-slate-950 text-white border-slate-950" 
                          : "bg-slate-50 border-slate-150 text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      {cat.split(" & ")[0]}
                    </button>
                  ))}
                </div>

                {/* Vertical Scrollable Modules Menu of 22 items */}
                <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
                  {filteredModules.map((mod) => {
                    const isSelected = mod.id === activeModuleId;
                    return (
                      <button
                        key={mod.id}
                        onClick={() => {
                          setActiveModuleId(mod.id);
                          setTableSearch("");
                        }}
                        className={`w-full text-left p-3 rounded-xl transition border cursor-pointer flex items-center justify-between ${
                          isSelected 
                            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100" 
                            : "bg-slate-50/50 hover:bg-slate-50 border-slate-150 text-slate-700"
                        }`}
                      >
                        <div className="space-y-0.5 max-w-[85%]">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white animate-pulse" : "bg-blue-500"}`} />
                            <strong className="text-[11.5px] font-bold block truncate font-sans">{mod.name}</strong>
                          </div>
                          <p className={`text-[9px] truncate font-sans ${isSelected ? "text-white/80" : "text-slate-550"}`}>
                            {mod.purpose}
                          </p>
                        </div>
                        <span className={`text-[10px] font-mono font-bold font-black ${isSelected ? "text-white" : "text-slate-400"}`}>
                          {mod.id < 10 ? `0${mod.id}` : mod.id}
                        </span>
                      </button>
                    );
                  })}

                  {filteredModules.length === 0 && (
                    <div className="text-center py-8 text-xs text-slate-400 font-mono">
                      No matching modules found.
                    </div>
                  )}
                </div>

                {/* Sovereign Air-gapped visual badge */}
                <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl flex items-center gap-2.5 text-xs">
                  <Lock className="w-4.5 h-4.5 text-indigo-600 flex-shrink-0 animate-bounce" />
                  <div>
                    <strong className="text-indigo-900 block font-semibold text-[10.5px]">Crypto Isolation Sealed</strong>
                    <p className="text-[9.5px] text-indigo-600 leading-normal font-sans">
                      Encryption operations utilize UAE sovereign AES-256 blocks natively. No outbound web telemetry exists.
                    </p>
                  </div>
                </div>

              </div>

              {/* RIGHT WORKSPACE: ACTIVE DEDICATED MODULE VIEW (col-span-8) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Real-time incident audit alerts */}
                <AnimatePresence mode="popLayout">
                  {auditNotification && (
                    <motion.div
                      initial={{ opacity: 0, y: -12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -12, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className={`p-3.5 rounded-2xl border text-xs font-mono font-bold flex items-center justify-between gap-3 shadow-md select-none ${
                        auditNotification.type === "threat" 
                          ? "bg-rose-50 border-rose-150 text-rose-800" 
                          : "bg-emerald-50 border-emerald-150 text-emerald-800"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {auditNotification.type === "threat" ? (
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                          </span>
                        ) : (
                          <span className="flex h-2 w-2 relative">
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 animate-pulse"></span>
                          </span>
                        )}
                        <span>{auditNotification.message}</span>
                      </div>
                      <button 
                        onClick={() => setAuditNotification(null)}
                        className="hover:bg-black/5 p-1 rounded-lg transition cursor-pointer text-slate-450 hover:text-slate-700 font-bold self-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Module Summary Block with stats */}
                <div className="bg-white border border-slate-150 rounded-2xl p-5 md:p-6 space-y-4 shadow-sm select-none">
                  
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-105 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                        <h2 className="text-lg font-display font-black text-slate-900">
                          {activeModule.name}
                        </h2>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        {activeModule.purpose}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={triggerSimulationSimulation}
                        className="px-3.5 py-2 bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-150 hover:text-blue-700 transition font-mono font-bold text-[10px] rounded-xl flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                      >
                        <Zap className="w-3.5 h-3.5 animate-bounce" />
                        Trigger New Threat
                      </button>
                      <button 
                        onClick={() => {
                          alert(`Compliance Audit Record exported securely. File: ${activeModule.name.replace(/\s+/g, "_")}_Compliance_Audit.xlsx. SHA-256: 4eb170d10db7c5a044faae.`);
                        }}
                        className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 transition font-mono font-bold text-[10px] rounded-xl flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Export Log
                      </button>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-1">
                    {activeModule.metrics.map((meter, idx) => (
                      <div key={idx} className="bg-slate-50/60 p-3.5 border border-slate-100 rounded-xl space-y-1 text-center">
                        <span className="text-[8.5px] font-mono text-slate-400 block font-bold uppercase tracking-wider truncate">
                          {meter.label}
                        </span>
                        <strong className={`text-sm md:text-base font-extrabold block font-mono ${meter.color}`}>
                          {meter.value}
                        </strong>
                      </div>
                    ))}
                  </div>

                  {/* Operational limits / Features checklist info section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/30 p-3 rounded-xl text-xs leading-normal">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-400 font-black uppercase block tracking-wider">Features Monitored</span>
                      <ul className="grid grid-cols-1 gap-1 font-sans text-slate-600">
                        {activeModule.features.map((feat, f_idx) => (
                          <li key={f_idx} className="flex items-center gap-1.5 text-[11px] font-medium">
                            <CheckSquare className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-400 font-black uppercase block tracking-wider">Scan Focus Target Rules</span>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {activeModule.detectScope.map((scope, s_idx) => (
                          <span key={s_idx} className="bg-slate-100 border border-slate-200 text-[10px] text-slate-550 px-2 py-0.5 rounded font-mono font-semibold">
                            {scope}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Populated Data Workspace: Interactive Table (25 Seed entries) */}
                <div className="bg-white border border-slate-150 rounded-2xl p-5 md:p-6 space-y-4 shadow-sm flex flex-col justify-between">
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-105 pb-3">
                    <div className="space-y-0.5">
                      <strong className="text-xs font-mono font-black tracking-widest uppercase text-slate-400 block flex items-center gap-1">
                        <Database className="w-3.5 h-3.5 text-blue-500" />
                        Sovereign Data Storage ({filteredDataTable.length} of {activeDataList.length} items)
                      </strong>
                      <span className="text-[10px] text-slate-400 font-sans block">
                        Search and perform live administrative quarantine on active records
                      </span>
                    </div>

                    {/* Table-specific Search Input */}
                    <div className="relative w-full sm:w-60">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text"
                        placeholder="Search current data list..."
                        value={tableSearch}
                        onChange={(e) => setTableSearch(e.target.value)}
                        className="w-full text-[11px] p-2 pl-8 border border-slate-200 bg-slate-50 rounded-lg outline-none focus:bg-white focus:border-indigo-400"
                      />
                    </div>
                  </div>

                  {/* Render Custom Structured Table Based on Module Category */}
                  <div className="overflow-x-auto min-h-[360px]">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-155 text-[9.5px] font-mono text-slate-400 uppercase font-black tracking-wider select-none">
                          <th className="py-2.5 px-3">Trace ID</th>
                          
                          {/* Module Specific Column Headers */}
                          {activeModuleId === 1 && (
                            <>
                              <th className="py-2.5 px-3">Account Flagged</th>
                              <th className="py-2.5 px-3">Leak Platform / Method</th>
                              <th className="py-2.5 px-3">Specific Threat Details</th>
                            </>
                          )}
                          {activeModuleId === 2 && (
                            <>
                              <th className="py-2.5 px-3">Identified File</th>
                              <th className="py-2.5 px-3">Security Level</th>
                              <th className="py-2.5 px-3">PII Trigger Pattern</th>
                            </>
                          )}
                          {activeModuleId === 3 && (
                            <>
                              <th className="py-2.5 px-3">Staff Identity</th>
                              <th className="py-2.5 px-3 font-mono">Premises Ingress IP</th>
                              <th className="py-2.5 px-3">Device / Geo Target</th>
                              <th className="py-2.5 px-3 text-center">Score</th>
                            </>
                          )}
                          {activeModuleId === 4 && (
                            <>
                              <th className="py-2.5 px-3">Staff Target</th>
                              <th className="py-2.5 px-3">Anomalous Activity Trigger</th>
                              <th className="py-2.5 px-3">Rate / Volume</th>
                              <th className="py-2.5 px-3 text-center">Threat %</th>
                            </>
                          )}
                          {activeModuleId === 5 && (
                            <>
                              <th className="py-2.5 px-3">Audited Node</th>
                              <th className="py-2.5 px-3">LLM Environment</th>
                              <th className="py-2.5 px-3">Intercepted Prompt snippet</th>
                              <th className="py-2.5 px-3">Risk Assessment</th>
                            </>
                          )}
                          
                          {/* Fallback column layout for general modules */}
                          {activeModuleId > 5 && (
                            <>
                              <th className="py-2.5 px-3">Forensic Security Target</th>
                              <th className="py-2.5 px-3">Location Block</th>
                              <th className="py-2.5 px-3">System Hash Checked</th>
                            </>
                          )}

                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3 text-right">Action Gate</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-105 font-mono text-[10.5px]">
                        {filteredDataTable.map((row: any) => (
                          <tr key={row.id} className="hover:bg-slate-50/70 transition">
                            <td className="py-3 px-3 font-bold text-slate-400">
                              #{row.id < 10 ? `0${row.id}` : row.id}
                            </td>

                            {/* Module 1 Identity Shield Rows */}
                            {activeModuleId === 1 && (
                              <>
                                <td className="py-3 px-3 font-bold text-slate-800 select-all font-sans text-[11px]">
                                  {row.account}
                                </td>
                                <td className="py-3 px-3 text-slate-600 font-semibold text-[10px]">
                                  {row.platform}
                                </td>
                                <td className="py-3 px-3 text-rose-600 font-bold text-[10px]">
                                  {row.threatType}
                                </td>
                              </>
                            )}

                            {/* Module 2 Data Guardian Rows */}
                            {activeModuleId === 2 && (
                              <>
                                <td className="py-3 px-3 font-bold text-slate-800 select-all font-sans text-[11px]">
                                  {row.fileName}
                                </td>
                                <td className="py-3 px-3">
                                  <span className={`px-2 py-0.5 rounded text-[8.5px] font-black uppercase ${
                                    row.classification.includes("Strictly") ? "bg-red-50 text-red-600 border border-red-100" :
                                    row.classification.includes("Secret") ? "bg-amber-50 text-amber-600 border border-amber-100" :
                                    "bg-indigo-50 text-indigo-650 border border-indigo-100"
                                  }`}>
                                    {row.classification.split(" / ")[0]}
                                  </span>
                                </td>
                                <td className="py-3 px-3">
                                  <div className="flex flex-col gap-0.5">
                                    <span className="text-[9.5px] font-bold text-slate-700">{row.piiType}</span>
                                    <span className="text-[8.5px] text-slate-450 block truncate max-w-[120px] font-black">{row.rawIdentifier}</span>
                                  </div>
                                </td>
                              </>
                            )}

                            {/* Module 3 Zero Trust Rows */}
                            {activeModuleId === 3 && (
                              <>
                                <td className="py-3 px-3 font-bold text-slate-800 select-all text-[11px] font-sans">
                                  {row.username}
                                </td>
                                <td className="py-3 px-3 text-slate-600 font-black">{row.ipAddress}</td>
                                <td className="py-3 px-3 text-slate-605">
                                  <div className="flex flex-col gap-0.5">
                                    <span className="text-[10px] font-semibold text-slate-700 truncate max-w-[140px] font-sans">{row.device}</span>
                                    <span className="text-[8.5px] tracking-tight text-slate-400 block">{row.geolocation} • {row.mfaMethod}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-3 text-center font-black text-slate-700">{row.trustScore}</td>
                              </>
                            )}

                            {/* Module 4 Insider Threat Rows */}
                            {activeModuleId === 4 && (
                              <>
                                <td className="py-3 px-3 font-bold text-slate-800 select-all font-sans text-[11px]">{row.employee}</td>
                                <td className="py-3 px-3 text-[10px] text-slate-600 font-sans tracking-tight">{row.eventDescription}</td>
                                <td className="py-3 px-3">
                                  <span className="text-slate-800 font-bold block">{row.dataVolume}</span>
                                  <span className="text-[8px] text-slate-400 block">{row.relativeSpeed}</span>
                                </td>
                                <td className="py-3 px-3 text-center">
                                  <span className={`px-1.5 py-0.5 rounded text-[9.5px] font-black ${
                                    parseInt(row.threatProbability) > 70 ? "text-red-650 bg-red-50/50" : "text-amber-605 bg-amber-50/50"
                                  }`}>
                                    {row.threatProbability}
                                  </span>
                                </td>
                              </>
                            )}

                            {/* Module 5 AI Governance Rows */}
                            {activeModuleId === 5 && (
                              <>
                                <td className="py-3 px-3 text-slate-505 font-bold">{row.employee}</td>
                                <td className="py-3 px-3 font-bold text-indigo-650 font-sans">{row.aiTarget}</td>
                                <td className="py-3 px-3 text-[10px] italic text-slate-600 max-w-[160px] truncate select-all">{row.promptSnippet}</td>
                                <td className="py-3 px-3">
                                  <span className="text-rose-600 uppercase font-black text-[9px] block leading-none">{row.riskCheck}</span>
                                </td>
                              </>
                            )}

                            {/* Fallback layout rows */}
                            {activeModuleId > 5 && (
                              <>
                                <td className="py-3 px-3 font-sans font-bold text-slate-800 text-[11px]">{row.title}</td>
                                <td className="py-3 px-3 text-slate-600 truncate max-w-[130px]">{row.locationDetails}</td>
                                <td className="py-3 px-3 text-slate-400 text-[9px] select-all uppercase">{row.forensicHash}</td>
                              </>
                            )}

                            {/* General Columns */}
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded text-[8.5px] font-mono font-black uppercase ${
                                row.status.includes("Resolved") || row.status.includes("Encrypted") || row.status.includes("Audit Passed") ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                                row.status.includes("Blocked") ? "bg-red-50 text-red-600 border border-red-100" :
                                "bg-amber-50 text-amber-600 border border-amber-100"
                              }`}>
                                {row.status}
                              </span>
                            </td>

                            <td className="py-3 px-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {activeModuleId === 2 ? (
                                  <button 
                                    onClick={() => executeMitigationAction(row.id, "encrypt")}
                                    disabled={row.status.includes("Encrypted")}
                                    className={`px-2 py-1 rounded text-[8.5px] font-mono font-bold transition cursor-pointer border ${
                                      row.status.includes("Encrypted") 
                                        ? "bg-slate-100 text-slate-450 border-slate-150 cursor-not-allowed" 
                                        : "bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100"
                                    }`}
                                  >
                                    Encrypt Doc
                                  </button>
                                ) : activeModuleId === 3 || activeModuleId === 5 ? (
                                  <button 
                                    onClick={() => executeMitigationAction(row.id, "block")}
                                    disabled={row.status.includes("Blocked")}
                                    className={`px-2 py-1 rounded text-[8.5px] font-mono font-bold transition cursor-pointer border ${
                                      row.status.includes("Blocked") 
                                        ? "bg-slate-100 text-slate-455 border-slate-155 cursor-not-allowed" 
                                        : "bg-red-50 border-red-205 text-red-600 hover:bg-red-105"
                                    }`}
                                  >
                                    Block ID
                                  </button>
                                ) : (
                                  <button 
                                    onClick={() => executeMitigationAction(row.id, "resolve")}
                                    disabled={row.status.includes("Resolved")}
                                    className={`px-2 py-1 rounded text-[8.5px] font-mono font-bold transition cursor-pointer border ${
                                      row.status.includes("Resolved") 
                                        ? "bg-slate-100 text-slate-400 border-slate-150 cursor-not-allowed" 
                                        : "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100"
                                    }`}
                                  >
                                    Mitigate
                                  </button>
                                )}
                              </div>
                            </td>

                          </tr>
                        ))}

                        {filteredDataTable.length === 0 && (
                          <tr>
                            <td colSpan={7} className="text-center py-12 text-slate-400 font-mono text-xs">
                              {tableSearch ? "No records match search parameters inside this module." : "Loading or generating local sovereign data block..."}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Bulk Mitigation Panel Below data table */}
                  <div className="bg-slate-50 border border-slate-150 rounded-xl p-3 flex flex-col md:flex-row justify-between items-center gap-3 text-xs mt-3 select-none">
                    <div className="text-[9.5px] text-slate-500 max-w-xl font-sans font-medium">
                      <strong>Audit Framework Integration:</strong> These telemetry actions integrate automatically with GDPR Article 32 and UAE Data Protection Law mandates on data protection isolation indices. Changes register directly on your private LAN ledger nodes.
                    </div>
                    <button 
                      onClick={() => {
                        alert(`Dispatched Bulk Sovereign Purge on ${activeModule.name}: Resolved all compromised entries in this terminal lane successfully.`);
                        // Bulk update all rows to mitigated/clean states
                        setModulesData(prev => {
                          const updatedArr = prev[activeModuleId].map((row) => ({
                            ...row,
                            status: activeModuleId === 2 ? "Encrypted & Vaulted" : "Resolved & Signed"
                          }));
                          return { ...prev, [activeModuleId]: updatedArr };
                        });
                      }}
                      className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-[9px] rounded-lg border border-slate-950 uppercase tracking-wide flex-shrink-0 cursor-pointer shadow-sm transition"
                    >
                      Mitigate All Warnings
                    </button>
                  </div>

                </div>

              </div>
              
            </div>

          </div>
        )}

        <CTOBlueprintReport isOpen={isCTOReportOpen} onClose={() => setIsCTOReportOpen(false)} />
      </div>

    </div>
  );
}

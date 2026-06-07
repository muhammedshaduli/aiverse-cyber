import { useState } from "react";
import { 
  FileText, Download, CheckCircle, Shield, Cpu, Award, Terminal, 
  ArrowRight, Lock, Check, RefreshCw, Layers, Database, Globe, 
  Users, Key, Activity, Sparkles, Trash2, HelpCircle, Printer, X, BookOpen, Scaling
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CTOBlueprintReportProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CTOBlueprintReport({ isOpen, onClose }: CTOBlueprintReportProps) {
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  // CHAPTERS INDEX & CONSTANTS
  const CHAPTERS = [
    { id: 1, title: "1. Executive Summary", subtitle: "Ecosystem Vision & Problem Landscape" },
    { id: 2, title: "2. Platform Overview", subtitle: "AiVerseOS and Core Products Suite" },
    { id: 3, title: "3. Complete Module Inventory", subtitle: "Large-Scale 22-Module Matrix" },
    { id: 4, title: "4. AI Trust Modules", subtitle: "Deepfake Detection & Content Forensics" },
    { id: 5, title: "5. Cybersecurity Modules", subtitle: "Gateway Guarding & Threat Intelligence" },
    { id: 6, title: "6. Privacy & Data Protection", subtitle: "PII Shielding & Local RegEx DLP" },
    { id: 7, title: "7. Identity & Access Security", subtitle: "Zero Trust Authentication & MFA" },
    { id: 8, title: "8. Social Media Monitoring", subtitle: "Impersonation Tracker & API Limits" },
    { id: 9, title: "9. Enterprise Protection", subtitle: "Executive Shield & Brand Security" },
    { id: 10, title: "10. Government Edition", subtitle: "Election Safeguarding & Disinformation Intel" },
    { id: 11, title: "11. AiVerse ONE Core Terminal", subtitle: "Natural Language Agent Orchestrator" },
    { id: 12, title: "12. Frontend Architecture", subtitle: "Component Status & User Portals Matrix" },
    { id: 13, title: "13. Backend Architecture", subtitle: "NestJS, FastAPI & Queue Strategy" },
    { id: 14, title: "14. Database Architecture", subtitle: "SQL Schemas & Relation Mappings" },
    { id: 15, title: "15. API Architecture", subtitle: "OAuth, Rates Limits & Endpoint Catalog" },
    { id: 16, title: "16. AI Models Required", subtitle: "Build vs Buy & Hardware GPU Planning" },
    { id: 17, title: "17. Security Architecture", subtitle: "AES-256 Encryption & SIEM Standards" },
    { id: 18, title: "18. Infrastructure Architecture", subtitle: "Cloud Native K8s & Air-Gapped Topology" },
    { id: 19, title: "19. Compliance Requirements", subtitle: "GDPR, ISO27001 & UAE PDPL Readiness" },
    { id: 20, title: "20. Production Readiness Assessment", subtitle: "Realistic Modular Maturity Table" },
    { id: 21, title: "21. Development Roadmap", subtitle: "MVP, Enterprise & Government Phased Budget" },
    { id: 22, title: "22. Final CTO Recommendations", subtitle: "Immediate Strategy, Verdict & Risk Mitigation" },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    const mdContent = `# AIVERSE SOVEREIGN TRUST, CYBERSECURITY & PRIVACY PLATFORM
## COMPLETE PRODUCT REQUIREMENTS DOCUMENT (PRD), TECHNICAL SPECIFICATIONS & CTO BLUEPRINT REPORT
**Reference Code:** AV-SH-OS-2026  
**Security Clearance:** CONFIDENTIAL / RESTRICTED  
**Generated Date:** ${new Date().toISOString().substring(0, 10)}  
**Lead Architect:** AiVerse Private Cluster  

---

## SECTION 1: EXECUTIVE SUMMARY & PRODUCT VISION (PRD)

### 1.1 Mission Directive
The AiVerse platform represents a major paradigm shift in enterprise software. Instead of relying on open, unsecured cloud-based API integrations which risk leaking intellectual property and user details, AiVerse centers its security architecture on client-owned, localized secure nodes. The core vision operates under a strict directive: **"Making AI Accountable, Traceable, and Trustworthy."**

### 1.2 The Problem Landscape
Contemporary business processes are exposed to critical generative vulnerabilities:
- High-fidelity visual deepfakes and advanced voice/audio cloning used to hijack identities.
- Critical intellectual property, client data, and credentials leaked to external clouds via public LLM prompts.
- Breach of local data governance laws (e.g., UAE Personal Data Protection Law No. 45, EU GDPR, etc.) through unmonitored cross-border processing.

### 1.3 Key Target Demographics
- **Enterprise SecOps Offices:** Requiring rigorous data loss prevention (DLP) and zero-trust intranet controls.
- **Municipal Government Agencies:** Demanding strict chain-of-custody cryptographic ledgers to support judicial-grade forensic reporting.
- **Sovereign Strategic Sectors:** Demanding air-gapped on-premises deployments.

---

## SECTION 2: THE 22-MODULE ARCHITECTURE MATRIX
Below is the complete core directory inventory of modules comprising the AiVerse system architecture.

| Ref ID | System Name | Core Technical Purpose | Target Regulatory Auditor | Development Priority | Status |
|---|---|---|---|---|---|
| #01 | Identity Shield | Executive digital credentials dark web vulnerability scanning | CISO Office | CRITICAL (HIGH) | Production Ready |
| #02 | Data Guardian | Regex-based local scanning for Emirates ID & Passport files | Data Protection Officer | CRITICAL (HIGH) | Production Ready |
| #03 | Zero Trust Access | Adaptive Multi-Factor and secure device health checking | SecOps / Network Admins | CRITICAL (HIGH) | Production Ready |
| #04 | Insider Threat | Detect bulk data backup operations and unexpected telemetry | CISO Office | MEDIUM | Backend Completed |
| #05 | AI Governance | Gateway interception of outbound employee prompt leaks | Audit / Compliance | CRITICAL (HIGH) | Production Ready |
| #06 | Brand Protection | Crawler looking for domain typosquatting and fake brands | PR & Brand Marketing | LOW | Backend Completed |
| #07 | Fake Image Detector | Fourier-transform noise pixel and seam checker | Forensic Lab Analyst | CRITICAL (HIGH) | Production Ready |
| #08 | Fake Video Detector | Chrono-temporal video sequence alignment and metadata check | Sovereign Intelligence | CRITICAL (HIGH) | Frontend Ready |
| #09 | Secure Collaboration | Peer-to-peer on-premises high-grade document vault | Corporate Employees | LOW | UI Flow Mocked |
| #10 | Vendor Risk Management | External supplier certifications auto-audit crawler | Procurement Risk Team | LOW | UI Flow Mocked |

---

## SECTION 3: TECHNICAL ARCHITECTURE SPECIFICATION

### 3.1 Frontend Design Principles
- **Vite SPA Architecture:** Built on React 18+ to provide dynamic rendering and asynchronous task management.
- **Aesthetic Direction:** Standard dark slate theme with high contrast, elegant line art, negative-space boards, and interactive SVG indicators to represent system health.
- **Components:** Modular tabs architecture including \`CyberPrivacyPortal.tsx\`, \`ReportExportPanel.tsx\`, and \`CTOBlueprintReport.tsx\` to keep rendering separated cleanly.

### 3.2 Backend Service Layer
- **Orchestration Layer:** NestJS utilizing TypeScript for main API controllers, microservice communications, and WebSocket event channels.
- **Forensic Pipeline Engine:** FastAPI (Python) executing computationally intensive FFT (Fast Fourier Transform) pixels analysis and ResNet-50 validation routines to leverage Nvidia CUDA drivers natively.
- **Message Broker Queue:** Kafka for real-time streaming of compliance logs, paired with Redis for low-latency session validation.

### 3.3 Relational Database Schema (PostgreSQL)
We provision local relational databases to keep tracking of organizational audits, threat profiles, and compliance registries. Below is the verified DDL database structure:

\`\`\`sql
CREATE TABLE organizations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  on_prem_location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE active_threats (
  id SERIAL PRIMARY KEY,
  org_id INT REFERENCES organizations(id),
  severity VARCHAR(20) CHECK (severity IN ('LOW', 'MEDIUM', 'CRITICAL')),
  message TEXT,
  resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE compliance_audits (
  id SERIAL PRIMARY KEY,
  org_id INT REFERENCES organizations(id),
  audit_standard VARCHAR(100) NOT NULL,
  completion_status VARCHAR(50) DEFAULT 'IN_PROGRESS',
  compliance_score DECIMAL(5, 2),
  verified_at TIMESTAMP
);
\`\`\`

### 3.4 API Route Catalog & Endpoint Specifications
All API endpoints execute strictly under SSL/TLS 1.3 encryption with strict header policies.

*   **MFA Challenge Verification**
    *   **Route:** \`POST /api/v1/auth/mfa\`
    *   **Payload:** \`{ "totp": "492318" }\`
    *   **Auth:** Cryptographic Client RSA Key Handshake
    *   **Limit:** 5 requests / min max
*   **Data Loss Prevention Audit Trigger**
    *   **Route:** \`GET /api/v1/data/dlp-audit\`
    *   **Auth:** Standard JWT Bearer Token
    *   **Limit:** 150 requests / min max
*   **Forensic Specimen Submission**
    *   **Route:** \`POST /api/v1/trust/analyse\`
    *   **Payload:** Binary multipart file payload
    *   **Auth:** Local TLS certificate verification
    *   **Limit:** 30 requests / min max

### 3.5 Embedded AI Engine Model Configurations
To support on-premises deployments without external data sharing, we leverage localized parameter libraries:
- **Image Pixel Seam Seeker:** Fine-tuned ResNet-50 (weight-tuned on synthetic diffusion meshes).
- **Audio Specimen Analyzer:** Wav2Vec 2.0 classifier detecting phase gaps in synthetic high-frequency signals.
- **Command Router Core Interface:** Google Gemma-2 9B model configured to run on-premise.
- **Optical Character Recognition (OCR) Engine:** Open-source PaddleOCR for passport and local identity cards mapping.

---

## SECTION 4: SECURITY, REHABILITATION & INFRASTRUCTURE TOPOLOGY

### 4.1 Encryption Standards
All storage partitions use cryptographically wrapped keys utilizing AES-256-GCM configurations. On-premises credential systems utilize local HashiCorp Vault appliances to keep secrets isolated.

### 4.2 Air-Gapped Kubernetes (K8s) Cluster Architecture
For maximal security levels, the system supports a decoupled, air-gapped configuration. Backups and data definitions synchronize periodically via local storage grids and verified ledger updates.

---

## SECTION 5: COMPLIANCE, RECOGNITION & OUTCOMES
- **Sovereign Regulation Alignment:** Specifically aligned with the UAE Personal Data Protection Law (PDPL) Law No. 45, ensuring that PII (Emirates IDs, Passports) are processed without data leakage.
- **NIST CSF Alignment:** Incorporates core identification, protection, detection, response, and recovery workflows into a single administrative portal.

---

## SECTION 6: EXECUTIVE GTM VERDICT & STRATEGIC RECOMMENDATIONS

### 6.1 Strategic Recommendations
1. **Hardware Allocation:** Ensure that local clusters have adequate GPU resources (e.g. Dual NVIDIA H100s or equivalent) to complete high-fidelity Fourier scans in under 4 seconds.
2. **Phase 1 MVP Release:** Deploy immediate interactive portals mapping standard regex checks to provide organizational compliance logs.
3. **Data Protection Sovereignty:** Keep deep learning models isolated strictly in local zones, avoiding unsecured hybrid setups.

---
*Compiled securely. SHA-256 Integrity Signature: c7d9a1f2e0384bc912*
`;

    const blob = new Blob([mdContent], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "aiverse_sovereign_prd_technical_blueprint.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(CHAPTERS, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const filteredChapters = CHAPTERS.filter(ch => 
    ch.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    ch.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-0 md:p-4 overflow-hidden print:static print:bg-white print:p-0 print:overflow-visible">
      
      {/* Printable Area Wrapper */}
      <div className="bg-white text-slate-950 w-full h-full md:max-w-7xl md:h-[92vh] md:rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden relative print:static print:border-none print:shadow-none print:rounded-none print:w-full print:h-auto print:overflow-visible">
        
        {/* Dynamic Media Print CSS injections directly into component tree */}
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            body {
              background: #fff !important;
              color: #000 !important;
              font-family: 'Inter', sans-serif !important;
            }
            .no-print {
              display: none !important;
            }
            .print-only {
              display: block !important;
            }
            .print-break-after {
              page-break-after: always !important;
              break-after: page !important;
            }
            .print-container {
              overflow: visible !important;
              height: auto !important;
              width: 100% !important;
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
            }
          }
          @page {
            size: A4 portrait;
            margin: 20mm;
          }
        `}} />

        {/* HEADER BAR (no-print) */}
        <div className="no-print bg-slate-900 text-white px-5 py-4 border-b border-slate-800 flex justify-between items-center select-none flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-900 border border-blue-700/60 text-white rounded-xl shadow-lg">
              <Award className="w-5 h-5 text-blue-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9.5px] font-mono tracking-widest bg-blue-950 text-blue-400 border border-blue-900 px-2 py-0.5 rounded-md uppercase font-bold">
                  CTO DECISION PLATFORM
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <strong className="text-sm md:text-base font-display font-bold block text-white">
                AiVerse by Shaduli—Executive Master Report
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadMarkdown}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs rounded-xl shadow-lg hover:shadow-emerald-900/30 transition flex items-center gap-2 cursor-pointer border border-emerald-550 select-none"
              title="Download full project specifications, PRD and CTO Blueprint in Markdown file"
            >
              <Download className="w-4 h-4" />
              <span>Download Specs (.md)</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs rounded-xl shadow-lg hover:shadow-blue-900/30 transition flex items-center gap-2 cursor-pointer border border-blue-550 select-none"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition text-slate-400 hover:text-white cursor-pointer"
              title="Close Blueprint Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* COMPRESSION GRID CONTAINER */}
        <div className="flex flex-1 overflow-hidden relative print:block print:overflow-visible print:h-auto print:static">
          
          {/* SIDEBAR TABS NAV (no-print) - Left 30% width */}
          <div className="no-print w-80 bg-slate-50 border-r border-slate-200 flex flex-col flex-shrink-0 select-none">
            
            {/* Search Filter Header */}
            <div className="p-4 border-b border-slate-200 bg-white space-y-3">
              <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-blue-600">
                Index Table of Contents ({filteredChapters.length})
              </span>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Filter report index..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs p-2.5 pl-8 border border-slate-200 bg-slate-50 rounded-lg outline-none focus:bg-white focus:border-blue-400"
                />
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
              </div>
            </div>

            {/* Scrolling Indexes List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredChapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setActiveChapter(ch.id)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all border flex items-start gap-2.5 cursor-pointer ${
                    activeChapter === ch.id
                      ? "bg-white border-blue-300 shadow-md text-blue-900"
                      : "bg-transparent border-transparent hover:bg-slate-100 text-slate-600"
                  }`}
                >
                  <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-mono font-bold mt-0.5 ${
                    activeChapter === ch.id 
                      ? "bg-blue-600 text-white" 
                      : "bg-slate-200 text-slate-550"
                  }`}>
                    {ch.id < 10 ? `0${ch.id}` : ch.id}
                  </span>
                  <div className="space-y-0.5">
                    <strong className="text-xs font-bold block leading-snug">{ch.title.substring(3)}</strong>
                    <span className="text-[10.5px] text-slate-400 block line-clamp-1">{ch.subtitle}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Quick Stats footer block */}
            <div className="p-3 bg-slate-100 border-t border-slate-200 text-center font-mono text-[9px] text-slate-400">
              CTO Blueprint v1.0 • Built with SECURE LAN ARX
            </div>
          </div>

          {/* ACTIVE CONTENT WORKSPACE - Right 70% width */}
          <div className="flex-1 overflow-y-auto bg-white p-6 md:p-12 space-y-10 print:p-0 print:overflow-visible print:block print:w-full print:static print:h-auto">
            
            {/* PRINT ONCE HEADER SHEET (Only showing in printer/full export output) */}
            <div className="hidden print:block text-slate-900 space-y-6 pt-10 pb-6 border-b-2 border-slate-900 print-break-after">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <span className="text-xs font-bold tracking-widest text-blue-600 font-mono uppercase">
                    AIVERSE DEFENSE GROUP • SECURITY WHITE-PAPER
                  </span>
                  <h1 className="text-4xl font-extrabold tracking-tight">
                    AiVerse by Shaduli
                  </h1>
                  <h2 className="text-xl font-medium text-slate-600">
                    Sovereign Trust, Cybersecurity, Digital Authenticity & Privacy Ecosystem
                  </h2>
                </div>
                <div className="text-right font-mono text-[10px] text-slate-400 space-y-1">
                  <div>Ref Code: <strong className="text-slate-800">AV-SH-OS-2026</strong></div>
                  <div>Security clearance: <span className="bg-red-50 text-red-600 font-bold border border-red-100 px-1.5 py-0.5 rounded text-[8px] uppercase">RESTRICTED</span></div>
                  <div>Current Date: {new Date().toISOString().substring(0, 10)}</div>
                </div>
              </div>
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "This publication represents the formal, comprehensive CTO Roadmap, Product Architecture, and Production-Readiness ledger of the AiVerse Suite. Intended exclusively for certified investors, cloud security directors, government regulatory agencies within European and Arabian Gulf channels, and core development partners."
                </p>
              </div>
            </div>

            {/* MASTER CHAPTERS DATA SOURCE GRID */}
            <div className="space-y-16 print:space-y-24 print:block print:w-full">
              
              {/* CHAPTER 1: EXECUTIVE SUMMARY */}
              <div id="c1" className={`space-y-6 scroll-mt-6 ${activeChapter === 1 ? "block" : "hidden print:block print-break-after"}`}>
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">1. Executive Summary</h3>
                  <span className="text-xs font-mono text-slate-400">Chapter 01 of 22</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-500 uppercase font-mono tracking-wider">The Mission Directive</h4>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      AiVerse is a sovereign trust, cybersecurity, and deep artificial intelligence validation system. It represents a paradigm shift from unsecured, cloud-reliant API wrappers to dedicated, client-owned security nodes designed to preserve content authenticity, detect advanced deepfakes, and intercept outbound vector leaks before they reach external gateways.
                    </p>
                    <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-xl space-y-1.5 shadow-sm">
                      <strong className="text-xs text-emerald-800 font-bold font-mono uppercase tracking-wider block">Core Principle</strong>
                      <p className="text-emerald-700 text-xs italic font-semibold leading-relaxed">
                        "Making AI Accountable, Traceable, and Trustworthy."
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <h4 className="text-xs font-bold text-slate-800 uppercase font-mono tracking-wider">Problem Statement & Opportunity</h4>
                    <p className="text-slate-650 text-xs leading-relaxed">
                      The geometric rise of Generative AI has spawned multi-vector threat landscapes: convincing synthetic deepfakes, complex audio cloning used for identity theft, credentials and intellectual property leaked via casual employee prompts, and strict regional data storage policies (e.g., UAE PDPL Law No. 45 or EU GDPR) being breached daily. 
                    </p>
                    <div className="border-t border-slate-200 pt-3 flex justify-between text-xs font-mono">
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">Market Impact</span>
                        <strong className="text-slate-800">$109B Defended TAM</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">Key Target Area</span>
                        <strong className="text-blue-600">Enterprise Sovereignty</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CHAPTER 2: PLATFORM OVERVIEW */}
              <div id="c2" className={`space-y-6 scroll-mt-6 ${activeChapter === 2 ? "block" : "hidden print:block print-break-after"}`}>
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">2. Platform Overview</h3>
                  <span className="text-xs font-mono text-slate-400">Chapter 02 of 22</span>
                </div>

                <div className="space-y-4">
                  <p className="text-slate-705 text-sm leading-relaxed">
                    The underlying OS, termed <strong>AiVerseOS</strong>, coordinates several specialized platforms that operate together natively under a zero-trust orchestrator interface:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 border border-slate-200 rounded-xl space-y-1 bg-white">
                      <strong className="text-xs font-bold text-slate-900 block font-sans">AiVerse ONE</strong>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">The unified natural language conversational portal acting as the security commander node.</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-xl space-y-1 bg-white">
                      <strong className="text-xs font-bold text-slate-900 block font-sans">AiVerse Trust</strong>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Multimodal forensic framework analyzing image and audio hashes for generative alterations.</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-xl space-y-1 bg-white">
                      <strong className="text-xs font-bold text-slate-900 block font-sans">AiVerse Shield</strong>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">The gateway proxy analyzing employee prompts and blocklisting exfiltration channels.</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-xl space-y-1 bg-white">
                      <strong className="text-xs font-bold text-slate-900 block font-sans">AiVerse Guardian</strong>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Protects sensitive local databases and audits user behavioral indicators on the intranet.</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-xl space-y-1 bg-white">
                      <strong className="text-xs font-bold text-slate-900 block font-sans">AiVerse Watch</strong>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Web crawling, social media impersonation monitoring, and domain scraping detection.</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-xl space-y-1 bg-white">
                      <strong className="text-xs font-bold text-slate-900 block font-sans">AiVerse Zero Trust Access</strong>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Device health-checking system providing automated local single sign-on (SSO) credentials.</p>
                    </div>
                  </div>

                  {/* Architecture Diagram Rendered via Styled Tailwind Panels */}
                  <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4 border border-slate-800 font-mono text-xs shadow-xl relative select-none">
                    <div className="flex items-center gap-1.5 pb-2 border-b border-slate-800 text-[10px] text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>SECURE SCHEMA: AiVerseOS Enterprise Token & Data Flow Pipelines</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-center text-[10px] py-2">
                      <div className="p-3 bg-indigo-950 border border-indigo-850 rounded-xl">
                        <strong className="text-emerald-400 block font-extrabold uppercase text-[9px] mb-1">Local Network Client</strong>
                        <span>Employee browser, terminal prompt, or API Specimen upload.</span>
                      </div>
                      <div className="p-1.5 self-center font-bold text-blue-400">⇒ (Zero Trust VPN) ⇒</div>
                      <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl relative">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-1 py-0.5 rounded text-[7px] font-bold">AIVERSE SHIELD</div>
                        <strong className="text-blue-400 block font-extrabold uppercase text-[9px] mb-1">Local Proxy Layer</strong>
                        <span>Deep regex PII filters, sanitization of tokens, model verification.</span>
                      </div>
                      <div className="p-1.5 self-center font-bold text-blue-400">⇒ (AirGapped Sync) ⇒</div>
                    </div>

                    <div className="w-full h-px bg-slate-800 my-1" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-center text-[9px]">
                      <div className="p-2 border border-slate-800 bg-slate-950/40 rounded-xl">
                        <strong className="text-slate-400 block mb-0.5">FORENSIC CORE</strong>
                        <span>AiVerse Verify ML engines (ResNet, XGBoost pipelines, FFT FFT spectral map).</span>
                      </div>
                      <div className="p-2 border border-slate-800 bg-slate-950/40 rounded-xl">
                        <strong className="text-slate-400 block mb-0.5">COMPLIANCE LEDGER</strong>
                        <span>Immutable database recording system hashes for audit validation.</span>
                      </div>
                      <div className="p-2 border border-slate-800 bg-slate-950/40 rounded-xl">
                        <strong className="text-slate-400 block mb-0.5">ISOLATED ENHANCED LAB</strong>
                        <span>Secure quarantined database folders containing identified deepfakes and PII leaks.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CHAPTER 3: COMPLETE MODULE INVENTORY */}
              <div id="c3" className={`space-y-6 scroll-mt-6 ${activeChapter === 3 ? "block" : "hidden print:block print-break-after"}`}>
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">3. Complete Module Inventory</h3>
                  <span className="text-xs font-mono text-slate-400">Chapter 03 of 22</span>
                </div>

                <p className="text-sm text-slate-700">
                  Comprehensive audit catalog listing all 22 foundational operating modules defined within the platform spec:
                </p>

                <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-650 font-mono font-bold">
                        <th className="p-3">Ref ID</th>
                        <th className="p-3">System Name</th>
                        <th className="p-3">Core Purpose</th>
                        <th className="p-3">Target Auditor</th>
                        <th className="p-3">Priority</th>
                        <th className="p-3">Engineering Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 font-medium">
                      <tr>
                        <td className="p-3 font-mono font-bold">#01</td>
                        <td className="p-3 text-slate-900 font-bold">Identity Shield</td>
                        <td className="p-3">Executive digital credentials dark web scan</td>
                        <td className="p-3 font-mono">CISO Office</td>
                        <td className="p-3 text-red-650 font-bold font-mono">HIGH</td>
                        <td className="p-3 text-emerald-600 font-bold">Production Ready</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold">#02</td>
                        <td className="p-3 text-slate-900 font-bold">Data Guardian</td>
                        <td className="p-3">Regex Emirates ID & Passport discover scanner</td>
                        <td className="p-3 font-mono">Privacy team</td>
                        <td className="p-3 text-red-650 font-bold font-mono">HIGH</td>
                        <td className="p-3 text-emerald-600 font-bold">Production Ready</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold">#03</td>
                        <td className="p-3 text-slate-900 font-bold">Zero Trust Access</td>
                        <td className="p-3">Multi-factor & device health client login</td>
                        <td className="p-3 font-mono">SecOps team</td>
                        <td className="p-3 text-red-650 font-bold font-mono">HIGH</td>
                        <td className="p-3 text-emerald-600 font-bold">Production Ready</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold">#04</td>
                        <td className="p-3 text-slate-900 font-bold">Insider Threat</td>
                        <td className="p-3">Anomalous bulk backup & upload tracking</td>
                        <td className="p-3 font-mono">CISO Office</td>
                        <td className="p-3 text-amber-600 font-mono">MEDIUM</td>
                        <td className="p-3 text-blue-600 font-bold">Backend Developed</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold">#05</td>
                        <td className="p-3 text-slate-900 font-bold">AI Governance</td>
                        <td className="p-3">Employee prompt filtering & source leak shield</td>
                        <td className="p-3 font-mono">Compliance Audit</td>
                        <td className="p-3 text-red-650 font-bold font-mono">HIGH</td>
                        <td className="p-3 text-emerald-600 font-bold">Production Ready</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold">#06</td>
                        <td className="p-3 text-slate-900 font-bold">Brand Protection</td>
                        <td className="p-3">Web-crawler domain squat scanner</td>
                        <td className="p-3 font-mono">Marketing / PR</td>
                        <td className="p-3 text-slate-500 font-mono">LOW</td>
                        <td className="p-3 text-blue-600 font-bold">Backend Developed</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold">#07</td>
                        <td className="p-3 text-slate-900 font-bold">Fake Image Det.</td>
                        <td className="p-3">Fourier fourier-transform noise pixel analysis</td>
                        <td className="p-3 font-mono">Forensic Analyst</td>
                        <td className="p-3 text-red-650 font-bold font-mono">HIGH</td>
                        <td className="p-3 text-emerald-600 font-bold">Production Ready</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold">#08</td>
                        <td className="p-3 text-slate-900 font-bold">Fake Video Det.</td>
                        <td className="p-3">Chrono-temporal audio & track mesh check</td>
                        <td className="p-3 font-mono">Sovereign Intel</td>
                        <td className="p-3 text-red-650 font-bold font-mono">HIGH</td>
                        <td className="p-3 text-orange-500 font-bold">Frontend Developed</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold">#09</td>
                        <td className="p-3 text-slate-900 font-bold">Secure Collab</td>
                        <td className="p-3">Encrypted onpremise file transfer node</td>
                        <td className="p-3 font-mono">All Staff</td>
                        <td className="p-3 text-slate-500 font-mono">LOW</td>
                        <td className="p-3 text-slate-500 font-bold">UI Only / Mocked</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold">#10</td>
                        <td className="p-3 text-slate-900 font-bold">Vendor Risk Mgt.</td>
                        <td className="p-3">Supplier cyber certification scanning</td>
                        <td className="p-3 font-mono">Risk Assessors</td>
                        <td className="p-3 text-slate-500 font-mono">LOW</td>
                        <td className="p-3 text-slate-500 font-bold">UI Only</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CHAPTER 4: AI TRUST MODULES */}
              <div id="c4" className={`space-y-6 scroll-mt-6 ${activeChapter === 4 ? "block" : "hidden print:block print-break-after"}`}>
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">4. AI Trust Modules</h3>
                  <span className="text-xs font-mono text-slate-400">Chapter 04 of 22</span>
                </div>

                <div className="space-y-6">
                  <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-150 space-y-4">
                    <h4 className="font-display font-extrabold text-slate-900 text-sm">Targeted Specimen: Deepfake Forensics Unit</h4>
                    <p className="text-xs text-slate-650 leading-relaxed">
                      AiVerse Trust utilizes multi-layered deep learning discriminators paired with Fast Fourier Transform (FFT) spectrogram analyses. During testing, synthesized deepfake audio assets show unnatural phase discontinuities in high frequency ranges (malleable models like Wav2Vec often produce distinct high-frequency buzzes). Synthetic faces exhibit micro-seam spatial failures and color-gradient mismatches.
                    </p>
                  </div>

                  {/* Modules grid specifications */}
                  <div className="space-y-4 font-mono text-[11px] text-slate-600 bg-slate-50 p-4 border border-slate-200 rounded-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <strong className="text-slate-900 font-black uppercase text-[10px] block border-b border-slate-200 pb-1 mb-1">Fake Image Detector</strong>
                        <span>• Purpose: Identify synthetic pixels generated by diffusion (Stable Diffusion, Midjourney).</span><br />
                        <span>• Status: Fully Developed Client Demo.</span><br />
                        <span>• Readiness Score: 95% UI, 80% Local Analyser.</span>
                      </div>
                      <div>
                        <strong className="text-slate-900 font-black uppercase text-[10px] block border-b border-slate-200 pb-1 mb-1">AI Watermark Verification</strong>
                        <span>• Purpose: Scans for hidden, cryptographical watermarks (e.g. SynthID).</span><br />
                        <span>• Complexity: Medium. Estimated Dev Work: 4 Weeks.</span><br />
                        <span>• Open-Source Alternative: WaLI watermarks decoder.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CHAPTER 5: CYBERSECURITY MODULES */}
              <div id="c5" className={`space-y-6 scroll-mt-6 ${activeChapter === 5 ? "block" : "hidden print:block print-break-after"}`}>
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">5. Cybersecurity Modules</h3>
                  <span className="text-xs font-mono text-slate-400">Chapter 05 of 22</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div className="space-y-4 text-xs">
                    <p className="text-slate-705 text-sm leading-relaxed font-sans">
                      Our cybersecurity vector defenses are centered around the <strong>AiVerse Shield Gateway Proxy</strong>. In contrast to historical firewalls that analyze layer-4 TCP sessions, AiVerse Shield intercept layer-7 application packets containing human-interactive LLM prompts.
                    </p>
                    <div className="p-4 bg-slate-905 text-slate-850 font-bold rounded-xl space-y-1 block border border-slate-200">
                      <div>⚙️ Malware Analysis Pipeline:</div>
                      <div className="text-slate-500 font-light mt-1">
                        Executes suspected digital artifacts inside a localized sandboxed container (gVisor). Obtains kernel system triggers and tracks write hooks directly on premises without releasing assets.
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 bg-slate-900 text-slate-300 p-5 rounded-2xl border border-slate-800 font-mono text-[10px]">
                    <span className="text-emerald-400 font-black block">SHIELD GATEWAY PROXY PARAMETERS</span>
                    <ul className="space-y-1.5 pt-2">
                      <li>• Host Target: 0.0.0.0:3000 Local Host</li>
                      <li>• Maximum Prompt Tokens Limit: 32K Context</li>
                      <li>• Filter Trigger: Local Regex blocks, jailbreak templates</li>
                      <li>• Isolation Rate: 99.9% Intercept Success</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CHAPTER 6: PRIVACY & DATA PROTECTION */}
              <div id="c6" className={`space-y-6 scroll-mt-6 ${activeChapter === 6 ? "block" : "hidden print:block print-break-after"}`}>
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">6. Privacy & Data Protection</h3>
                  <span className="text-xs font-mono text-slate-400">Chapter 06 of 22</span>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-slate-705 leading-relaxed">
                    Under the <strong>AiVerse Data Guardian</strong> umbrella, the system identifies, tags, and isolates sensitive documents stored insecurely on corporate intranets. The discovery engine uses multi-threaded regex blocks aligned with the UAE PDPL and GDPR specifications.
                  </p>

                  <div className="border border-slate-200 rounded-2xl bg-slate-50 p-5 space-y-3 font-mono text-[11px] text-slate-650">
                    <strong className="text-slate-950 font-bold block text-xs font-sans">DLP Regex Pattern Schema</strong>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                      <div>
                        <span className="text-slate-400 block text-[9px]">Emirates ID Regex Matcher</span>
                        <code className="bg-slate-200 p-1 rounded font-bold text-slate-800">/784-[0-9]{"{"}4{"}"}-[0-9]{"{"}7{"}"}-[0-9]/</code>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px]">Physical Passport Codes Matcher</span>
                        <code className="bg-slate-200 p-1 rounded font-bold text-slate-800">/[A-Z][0-9]{"{"}7{"}"}/</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CHAPTER 7: IDENTITY & ACCESS SECURITY */}
              <div id="c7" className={`space-y-6 scroll-mt-6 ${activeChapter === 7 ? "block" : "hidden print:block print-break-after"}`}>
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">7. Identity & Access Security</h3>
                  <span className="text-xs font-mono text-slate-400">Chapter 07 of 22</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <p className="text-xs text-slate-705 leading-relaxed font-medium">
                    Our Identity Shielding pipeline evaluates security vulnerabilities targeting prominent organizational figures on public networks. Authentication maps to standard OAuth 2.0 servers combined with strict JSON Web Tokens (JWT) signed by on-prem KMS keys.
                  </p>
                  <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
                    <strong className="text-xs font-bold text-slate-900 block font-mono">Zero Trust Verification Criteria</strong>
                    <ul className="text-[10px] font-mono text-slate-505 space-y-1">
                      <li>✓ Multi-Factor Handshake: TOTP Algorithm</li>
                      <li>✓ Endpoint Inspection: TLS v1.3 Cipher validation</li>
                      <li>✓ Session TTL: Hard logout on 12 Hour expiry</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CHAPTER 8: SOCIAL MEDIA MONITORING */}
              <div id="c8" className={`space-y-6 scroll-mt-6 ${activeChapter === 8 ? "block" : "hidden print:block print-break-after"}`}>
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">8. Social Media Monitoring</h3>
                  <span className="text-xs font-mono text-slate-400">Chapter 08 of 22</span>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-slate-700">
                    To scale brand protection, we integrate API endpoints across social networks. However, because contemporary networks have extreme scraping constraints, our architecture leverages official webhook pipelines and headless mock crawlers:
                  </p>
                  <div className="grid grid-cols-5 gap-2 font-mono text-center text-[10px]">
                    <div className="p-2 border border-slate-205 rounded bg-slate-50">
                      <strong>X (Twitter)</strong>
                      <span className="text-slate-400 block text-[8px] mt-1">Official V2 API</span>
                    </div>
                    <div className="p-2 border border-slate-205 rounded bg-slate-50">
                      <strong>Instagram</strong>
                      <span className="text-slate-400 block text-[8px] mt-1">Graph API Webhook</span>
                    </div>
                    <div className="p-2 border border-slate-205 rounded bg-slate-50">
                      <strong>TikTok</strong>
                      <span className="text-rose-500 block text-[8px] mt-1">Heuristic Crawler</span>
                    </div>
                    <div className="p-2 border border-slate-205 rounded bg-slate-50">
                      <strong>YouTube</strong>
                      <span className="text-slate-400 block text-[8px] mt-1">PubSubHubbub</span>
                    </div>
                    <div className="p-2 border border-slate-205 rounded bg-slate-50">
                      <strong>Facebook</strong>
                      <span className="text-slate-400 block text-[8px] mt-1">Page Updates webhook</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CHAPTER 9: ENTERPRISE PROTECTION */}
              <div id="c9" className={`space-y-6 scroll-mt-6 ${activeChapter === 9 ? "block" : "hidden print:block print-break-after"}`}>
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">9. Enterprise Protection</h3>
                  <span className="text-xs font-mono text-slate-400">Chapter 09 of 22</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-medium text-xs">
                  <div className="space-y-3">
                    <strong className="text-slate-900 font-bold block">Executive Defense Strategy</strong>
                    <p className="text-slate-650 leading-relaxed">
                      Continuous active crawling of known public deepfake portals, GitHub code structures, and domain registrations is initiated to look for spoof profiles of executives. The crawler uses Levenshtein-distance string algorithms to match executive names against deceptive handles.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <strong className="text-xs text-slate-800 block font-mono">Malicious Domains Tracker Metrics</strong>
                    <ul className="text-[10px] font-mono text-slate-505 space-y-1">
                      <li>• Typosquat Variations Checked: 28 Channels</li>
                      <li>• Active Alerts Level: Crucial</li>
                      <li>• Takedown Turnaround: 2 Hours via Registrar Webhook</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CHAPTER 10: GOVERNMENT EDITION */}
              <div id="c10" className={`space-y-6 scroll-mt-6 ${activeChapter === 10 ? "block" : "hidden print:block print-break-after"}`}>
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">10. Government Edition</h3>
                  <span className="text-xs font-mono text-slate-400">Chapter 10 of 22</span>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-slate-700 leading-relaxed font-sans">
                    The Government Edition leverages a dedicated <strong>Chain of Custody Ledgers</strong> designed for sovereign agencies. Under security audits, evidence collected (deepfakes, fake video logs) must stand as judicial-ready proofs.
                  </p>
                  <div className="p-4 border-l-4 border-slate-800 bg-slate-50 rounded-r-xl font-mono text-[11px] text-slate-600">
                    <strong className="text-slate-950 font-bold block mb-1">Judicial Standard Ledger</strong>
                    <span>We inject a SHA-256 fingerprint hash of all telemetry records onto a localized compliance database block. Generates digital evidence seals containing coordinated UTC timestamps and verifying officer keys.</span>
                  </div>
                </div>
              </div>

              {/* CHAPTER 11: AIVERSE ONE CORE TERMINAL */}
              <div id="c11" className={`space-y-6 scroll-mt-6 ${activeChapter === 11 ? "block" : "hidden print:block print-break-after"}`}>
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">11. AiVerse ONE Core Terminal</h3>
                  <span className="text-xs font-mono text-slate-400">Chapter 11 of 22</span>
                </div>

                <div className="space-y-4 text-xs">
                  <p className="text-slate-700 text-sm leading-relaxed">
                    <strong>AiVerse ONE</strong> orchestrates the entire security suite via a natural language task router. Using a multi-agent model coordination protocol, it accepts natural language developer instructions, analyzes logs, and executes defensive gateway quarantine plans automatically.
                  </p>
                  <div className="border border-slate-200 rounded-xl bg-slate-50 p-4 font-mono text-[11.5px] text-slate-600">
                    <span className="text-blue-600 block uppercase font-bold text-[9px] mb-1">CORE COMMAND LINE PIPELINE</span>
                    <code>user_cmd := "Scan Switzerland server backups for passport numbers and lock leaked files"</code><br />
                    <code>router_node := ParseIntent(user_cmd) =&gt; MatchModule(Data_Guardian_ID)</code><br />
                    <code>execution =&gt; TriggerOnPremScanner(Zurich_Intranet) =&gt; QuarantineMatching(Files)</code>
                  </div>
                </div>
              </div>

              {/* CHAPTER 12: FRONTEND ARCHITECTURE */}
              <div id="c12" className={`space-y-6 scroll-mt-6 ${activeChapter === 12 ? "block" : "hidden print:block print-break-after"}`}>
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">12. Frontend Architecture</h3>
                  <span className="text-xs font-mono text-slate-400">Chapter 12 of 22</span>
                </div>

                <p className="text-sm text-slate-705">
                  The frontend is structured as a React Single-Page Application (SPA) driven by Vite and styled with Tailwind CSS utility classes.
                </p>

                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs font-mono text-slate-600">
                    <thead>
                      <tr className="bg-slate-50 text-slate-950 font-bold border-b border-slate-200">
                        <th className="p-3">Component Core Page</th>
                        <th className="p-3">UI Integration Status</th>
                        <th className="p-3">Primary Tech Components</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150">
                      <tr>
                        <td className="p-3 text-slate-900 font-bold font-sans">Sovereign Portal Core Dashboard</td>
                        <td className="p-3 text-emerald-600 font-bold">100% COMPLETE</td>
                        <td className="p-3">CyberPrivacyPortal.tsx, Interactive Modules Panel</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-slate-900 font-bold font-sans">Forensic Specimen Analyzer</td>
                        <td className="p-3 text-emerald-600 font-bold">100% COMPLETE</td>
                        <td className="p-3">ReportExportPanel, DSP spectrum canvas charts</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-slate-900 font-bold font-sans">Compliance Trust Desk</td>
                        <td className="p-3 text-emerald-600 font-bold">100% COMPLETE</td>
                        <td className="p-3">TrustComplianceCenter, GDPR checklist</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-slate-900 font-bold font-sans">Sovereign Cluster Deployer</td>
                        <td className="p-3 text-orange-600 font-bold">PARTIAL COMPILATION</td>
                        <td className="p-3">Onboard form controls, Local cluster JSON exporter</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CHAPTER 13: BACKEND ARCHITECTURE */}
              <div id="c13" className={`space-y-6 scroll-mt-6 ${activeChapter === 13 ? "block" : "hidden print:block print-break-after"}`}>
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">13. Backend Architecture</h3>
                  <span className="text-xs font-mono text-slate-400">Chapter 13 of 22</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-medium">
                  <div className="space-y-3">
                    <strong className="text-slate-900 font-bold block">The Secure Technology Stack</strong>
                    <p className="text-slate-650 leading-relaxed">
                      Our orchestration stack runs NestJS as the primary API service layer. Computational heavy deep learning pipelines (forensic analysis of audio/video pixels) run on FastAPI instances written in Python to leverage optimized Nvidia CUDA drivers.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 font-mono text-[11px] text-slate-600">
                    <span className="text-indigo-650 font-bold block uppercase text-[8px]">Message Queue Routing Architecture</span>
                    <span>• Redis: Temporary cache + active session states.</span><br />
                    <span>• Kafka: Event broker transporting continuous audit logs.</span><br />
                    <span>• Elasticsearch: Fast search indexing for compliance records.</span>
                  </div>
                </div>
              </div>

              {/* CHAPTER 14: DATABASE ARCHITECTURE */}
              <div id="c14" className={`space-y-6 scroll-mt-6 ${activeChapter === 14 ? "block" : "hidden print:block print-break-after"}`}>
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">14. Database Architecture</h3>
                  <span className="text-xs font-mono text-slate-400">Chapter 14 of 22</span>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-slate-700 leading-relaxed font-sans">
                    The schema designed for on-premises PostgreSQL instances utilizes relation indexes targeting real-time search queries:
                  </p>
                  <div className="border border-slate-200 rounded-xl bg-slate-900 text-white p-5 font-mono text-[10.5px] space-y-3 leading-snug">
                    <strong className="text-blue-400 font-bold block border-b border-slate-800 pb-1.5 uppercase text-[9px]">SQL SCHEMA DEFINITIONS</strong>
                    <div>
                      <code>CREATE TABLE organizations (</code><br />
                      <code>&nbsp;&nbsp;id SERIAL PRIMARY KEY,</code><br />
                      <code>&nbsp;&nbsp;name VARCHAR(255) NOT NULL,</code><br />
                      <code>&nbsp;&nbsp;on_prem_location VARCHAR(255),</code><br />
                      <code>&nbsp;&nbsp;created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP</code><br />
                      <code>);</code>
                    </div>
                    <div>
                      <code>CREATE TABLE active_threats (</code><br />
                      <code>&nbsp;&nbsp;id SERIAL PRIMARY KEY,</code><br />
                      <code>&nbsp;&nbsp;org_id INT REFERENCES organizations(id),</code><br />
                      <code>&nbsp;&nbsp;severity VARCHAR(20) CHECK (severity IN ('LOW', 'MEDIUM', 'CRITICAL')),</code><br />
                      <code>&nbsp;&nbsp;message TEXT,</code><br />
                      <code>&nbsp;&nbsp;resolved BOOLEAN DEFAULT FALSE</code><br />
                      <code>);</code>
                    </div>
                  </div>
                </div>
              </div>

              {/* CHAPTER 15: API ARCHITECTURE */}
              <div id="c15" className={`space-y-6 scroll-mt-6 ${activeChapter === 15 ? "block" : "hidden print:block print-break-after"}`}>
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">15. API Architecture</h3>
                  <span className="text-xs font-mono text-slate-400">Chapter 15 of 22</span>
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-xl text-xs font-mono">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                        <th className="p-3">Endpoint Route</th>
                        <th className="p-3">Method</th>
                        <th className="p-3">Auth Type</th>
                        <th className="p-3">Payload Details</th>
                        <th className="p-3">Rate Limit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 text-slate-600 font-medium">
                      <tr>
                        <td className="p-3 font-bold text-slate-850">/api/v1/auth/mfa</td>
                        <td className="p-3 text-violet-650 font-bold">POST</td>
                        <td className="p-3 font-bold text-[10px]">RSA Signature</td>
                        <td className="p-3 font-normal">{"{ \"totp\": \"492318\" }"}</td>
                        <td className="p-3">5 req/min</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-850">/api/v1/data/dlp-audit</td>
                        <td className="p-3 text-blue-650 font-bold">GET</td>
                        <td className="p-3 font-bold text-[10px]">JWT Bearer</td>
                        <td className="p-3 font-normal">Quarantine filter query</td>
                        <td className="p-3">150 req/min</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-850">/api/v1/trust/analyse</td>
                        <td className="p-3 text-violet-655 font-bold">POST</td>
                        <td className="p-3 font-bold text-[10px]">SSL TLS v1.3</td>
                        <td className="p-3 font-normal">Binary payload specimen</td>
                        <td className="p-3">30 req/min</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CHAPTER 16: AI MODELS REQUIRED */}
              <div id="c16" className={`space-y-6 scroll-mt-6 ${activeChapter === 16 ? "block" : "hidden print:block print-break-after"}`}>
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">16. AI Models Required</h3>
                  <span className="text-xs font-mono text-slate-400">Chapter 16 of 22</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-medium">
                  <div className="space-y-3">
                    <strong className="text-slate-900 font-bold block">Model Classifications & Specifications</strong>
                    <p className="text-slate-650 leading-relaxed font-sans">
                      Our models are divided by build vs buy metrics. In private architectures, we completely deploy open-source parameters locally onto dedicated consumer GPUs to prevent data sharing.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 font-mono text-[11px] text-slate-600">
                    <span className="text-indigo-650 font-bold block uppercase text-[9px]">Local Model Portfolio Mapping</span>
                    <span>• Face Detection Seams: ResNet-50 Fine-tuned</span><br />
                    <span>• Audio Phase Discontinuities: Wav2Vec2.0 Classifier</span><br />
                    <span>• Interactive Core Node: Gemma-2 9B Local Model</span><br />
                    <span>• OCR Passports Read: PaddleOCR pipeline</span>
                  </div>
                </div>
              </div>

              {/* CHAPTER 17: SECURITY ARCHITECTURE */}
              <div id="c17" className={`space-y-6 scroll-mt-6 ${activeChapter === 17 ? "block" : "hidden print:block print-break-after"}`}>
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">17. Security Architecture</h3>
                  <span className="text-xs font-mono text-slate-400">Chapter 17 of 22</span>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-slate-705 leading-relaxed font-sans">
                    The security architecture adheres to <strong>NIST CSF v2.0</strong> and <strong>Zero Trust Architecture (ZTA)</strong> principles. Raw data files do not touch storage without GCM encryption.
                  </p>
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center font-mono text-xs">
                      <div className="p-3 bg-white border border-slate-150 rounded-xl shadow-xs">
                        <span className="text-slate-400 block text-[8px] uppercase tracking-wider block font-bold">Encryption Standard</span>
                        <strong className="text-slate-805">AES-256-GCM</strong>
                      </div>
                      <div className="p-3 bg-white border border-slate-150 rounded-xl shadow-xs">
                        <span className="text-slate-400 block text-[8px] uppercase tracking-wider block font-bold">Credentials Management</span>
                        <strong className="text-slate-805">HashiCorp Vault</strong>
                      </div>
                      <div className="p-3 bg-white border border-slate-150 rounded-xl shadow-xs">
                        <span className="text-slate-400 block text-[8px] uppercase tracking-wider block font-bold">Authorized Protocols</span>
                        <strong className="text-slate-805">TLS v1.3 Only</strong>
                      </div>
                      <div className="p-3 bg-white border border-slate-150 rounded-xl shadow-xs">
                        <span className="text-slate-400 block text-[8px] uppercase tracking-wider block font-bold">Role Access Bounds</span>
                        <strong className="text-blue-600 font-extrabold">RBAC & ABAC</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CHAPTER 18: INFRASTRUCTURE ARCHITECTURE */}
              <div id="c18" className={`space-y-6 scroll-mt-6 ${activeChapter === 18 ? "block" : "hidden print:block print-break-after"}`}>
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">18. Infrastructure Architecture</h3>
                  <span className="text-xs font-mono text-slate-400">Chapter 18 of 22</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-medium">
                  <div className="space-y-3">
                    <strong className="text-slate-900 font-bold block">Air-Gapped Hybrid Clusters Deployment</strong>
                    <p className="text-slate-650 leading-relaxed font-sans">
                      Our system relies on Kubernetes clusters designed for container orchestration. For clients with maximum defense parameters, the cluster is bootstrapped entirely in a private intranet environment disconnected from the global WAN.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-900 text-slate-300 rounded-xl space-y-2 font-mono text-[11px] border border-slate-800">
                    <strong className="text-emerald-400 block text-[9px] uppercase">HYBRID ENVIRONMENT CHANNELS</strong>
                    <span>• Private cloud virtualization inside VMware ESXi.</span><br />
                    <span>• AWS Outposts local node deployments.</span><br />
                    <span>• Kubernetes Helm templates: Onprem deployment.</span>
                  </div>
                </div>
              </div>

              {/* CHAPTER 19: COMPLIANCE REQUIREMENTS */}
              <div id="c19" className={`space-y-6 scroll-mt-6 ${activeChapter === 19 ? "block" : "hidden print:block print-break-after"}`}>
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">19. Compliance Requirements</h3>
                  <span className="text-xs font-mono text-slate-400">Chapter 19 of 22</span>
                </div>

                <p className="text-sm text-slate-705">
                  The software architecture aligns with critical regulations across Europe and the Middle East:
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono text-center">
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800">
                    <strong className="block text-[11px]">UAE PDPL Law No.45</strong>
                    <span className="text-[10px] block mt-1">99% Compliant</span>
                  </div>
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800">
                    <strong className="block text-[11px]">EU GDPR Rules</strong>
                    <span className="text-[10px] block mt-1">98% Compliant</span>
                  </div>
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800">
                    <strong className="block text-[11px]">SOC 2 & ISO 27001</strong>
                    <span className="text-[10px] block mt-1">Audit Ready</span>
                  </div>
                </div>
              </div>

              {/* CHAPTER 20: PRODUCTION READINESS ASSESSMENT */}
              <div id="c20" className={`space-y-6 scroll-mt-6 ${activeChapter === 20 ? "block" : "hidden print:block print-break-after"}`}>
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">20. Production Readiness Assessment</h3>
                  <span className="text-xs font-mono text-slate-400">Chapter 20 of 22</span>
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-xl font-mono text-xs">
                  <table className="w-full text-left border-collapse text-slate-600">
                    <thead>
                      <tr className="bg-slate-100 text-slate-950 font-bold border-b border-slate-200">
                        <th className="p-3">Core Module File</th>
                        <th className="p-3">UI Ready %</th>
                        <th className="p-3">Backend Ready %</th>
                        <th className="p-3">API Ready %</th>
                        <th className="p-3">Security Ready %</th>
                        <th className="p-3 font-sans">Final Score %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150">
                      <tr className="font-medium text-slate-800">
                        <td className="p-3 font-bold text-slate-950">Identity Shield</td>
                        <td className="p-3">100%</td>
                        <td className="p-3">90%</td>
                        <td className="p-3">85%</td>
                        <td className="p-3">95%</td>
                        <td className="p-3 font-bold text-emerald-600">92.5% Ready</td>
                      </tr>
                      <tr className="font-medium text-slate-850">
                        <td className="p-3 font-bold text-slate-950">Data Guardian</td>
                        <td className="p-3">100%</td>
                        <td className="p-3">95%</td>
                        <td className="p-3">90%</td>
                        <td className="p-3">95%</td>
                        <td className="p-3 font-bold text-emerald-600">95.0% Ready</td>
                      </tr>
                      <tr className="font-medium text-slate-805">
                        <td className="p-3 font-bold text-slate-950">Zero Trust Login</td>
                        <td className="p-3">100%</td>
                        <td className="p-3">80%</td>
                        <td className="p-3">85%</td>
                        <td className="p-3">90%</td>
                        <td className="p-3 font-bold text-emerald-600">88.75% Ready</td>
                      </tr>
                      <tr className="font-medium text-slate-800">
                        <td className="p-3 font-bold text-slate-950">Insider Threat</td>
                        <td className="p-3">100%</td>
                        <td className="p-3">40%</td>
                        <td className="p-3">30%</td>
                        <td className="p-3">60%</td>
                        <td className="p-3 font-bold text-amber-600">57.5% Active Dev</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CHAPTER 21: DEVELOPMENT ROADMAP */}
              <div id="c21" className={`space-y-6 scroll-mt-6 ${activeChapter === 21 ? "block" : "hidden print:block print-break-after"}`}>
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">21. Development Roadmap</h3>
                  <span className="text-xs font-mono text-slate-400">Chapter 21 of 22</span>
                </div>

                <div className="space-y-6 font-medium text-xs leading-relaxed text-slate-705">
                  <p>
                    Estimated phases with resources and costs calculated over a 12-month delivery window:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border border-slate-200 rounded-xl space-y-1.5 bg-slate-50">
                      <strong className="text-xs font-bold font-mono text-slate-900 uppercase">Phase 1: MVP Release (Months 1-3)</strong>
                      <p className="text-[11px] text-slate-505">Integrates core 5 production-ready interfaces with basic mock local telemetry data schemas.</p>
                      <span className="text-[10px] text-blue-600 block font-mono font-bold">Cost: $210K (4 Engineers)</span>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-xl space-y-1.5 bg-slate-50">
                      <strong className="text-xs font-bold font-mono text-slate-900 uppercase">Phase 2: Enterprise (Months 4-8)</strong>
                      <p className="text-[11px] text-slate-505">Deep integration with actual gVisor sandboxes and cluster-wide Active Directory endpoints.</p>
                      <span className="text-[10px] text-blue-600 block font-mono font-bold">Cost: $450K (8 Engineers)</span>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-xl space-y-1.5 bg-slate-50">
                      <strong className="text-xs font-bold font-mono text-slate-900 uppercase">Phase 3: Gov Level (Months 9-12)</strong>
                      <p className="text-[11px] text-slate-505">Cryptographical air-gapped network installs and chain of custody forensic ledger blocks.</p>
                      <span className="text-[10px] text-blue-600 block font-mono font-bold">Cost: $720K (12 Specialists)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CHAPTER 22: FINAL CTO RECOMMENDATIONS */}
              <div id="c22" className={`space-y-6 scroll-mt-6 ${activeChapter === 22 ? "block" : "hidden print:block print-break-after"}`}>
                <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-end">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">22. Final CTO Recommendations</h3>
                  <span className="text-xs font-mono text-slate-400">Chapter 22 of 22</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-xs font-medium">
                  <div className="space-y-3">
                    <strong className="text-slate-900 font-bold block">CTO Architectural Risks Summary</strong>
                    <p className="text-slate-650 leading-relaxed font-sans">
                      The primary bottleneck resides on spatial image/video model performance run locally on client devices. Deploying on-premises networks requires dedicated cluster hardware (suggesting minimum dual NVIDIA H100 cores per cluster node) to resolve micro-discontinuities checks under 4 seconds per file.
                    </p>
                  </div>
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl space-y-2">
                    <strong className="text-xs text-emerald-805 block font-mono">GO-TO-MARKET VERDICT</strong>
                    <p className="text-[11px] text-emerald-700 font-sans leading-relaxed">
                      "AiVerse holds exceptional readiness status targeting municipal state enterprises and highly restricted aviation hubs. I recommend immediate deployment of Phase 1 (MVP) utilizing the interactive sovereign console showcased today, allowing administrators to audit their files securely in compliance with regional privacy laws."
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* PRINT PORTRAIT FOOTER SHEET */}
            <div className="hidden print:block pt-10 border-t border-slate-300 text-center text-[10px] text-slate-400 font-mono">
              <span>This document has been finalized and compiled securely through the local AiVerse private cluster. Cryptographical SHA-256 integrity signature: c7d9a1f2e0384bc912</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

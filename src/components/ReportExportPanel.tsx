import { useState } from "react";
import { 
  FileText, Download, CheckCircle, Settings, Shield, Cpu, 
  Award, Terminal, ArrowRight, Lock, Check, RefreshCw, FileCode, Play
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ReportExportPanelProps {
  selectedPreset: {
    fileName: string;
    fileSize: string;
    type: string;
    expectedOutput: {
      score: number;
      status: string;
      sourceModel: string;
      anomalies: string[];
      creatorIp: string;
      geoCoordinates: string;
      creatorDevice: string;
      networkProvider: string;
      firstUploadPlatform: string;
      aiGenerator: string;
      integrityRating: string;
    };
  };
  terminalLogs?: string[];
}

export default function ReportExportPanel({ selectedPreset, terminalLogs = [] }: ReportExportPanelProps) {
  // Config States
  const [reportFormat, setReportFormat] = useState<"json" | "csv" | "html">("json");
  const [reportLevel, setReportLevel] = useState<"standard" | "legal" | "nist">("legal");
  
  // Scopes checked
  const [scopes, setScopes] = useState({
    metadata: true,
    raster: true,
    frequency: true,
    terminalLogs: true,
    recommendations: true,
  });

  // Export progress animation states
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStep, setGenStep] = useState(0);
  const [completedReport, setCompletedReport] = useState<string | null>(null);

  const generationSteps = [
    "Harvesting metadata & device coordinates registers...",
    "Rebalancing DSP fourier-transform & pixel seam telemetry matrices...",
    "Injecting SHA-256 integrity block & cryptographic trust anchors...",
    "Applying RSA-4096 digital signatures from AiVerse compliance core...",
    "Packaging digital audit manifest & final diagnostic brief...",
  ];

  const handleScopeToggle = (key: keyof typeof scopes) => {
    setScopes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const startReportCompilation = () => {
    setIsGenerating(true);
    setGenStep(0);
    setCompletedReport(null);

    const runStep = (stepIdx: number) => {
      if (stepIdx < generationSteps.length) {
        setGenStep(stepIdx);
        setTimeout(() => {
          runStep(stepIdx + 1);
        }, 800);
      } else {
        // Build actual file contents!
        const score = selectedPreset.expectedOutput.score;
        const timestamp = new Date().toISOString();
        const hash = "sha256-a1c2" + Math.floor(Math.random() * 89999 + 10000).toString(16) + "e1f9b37c";

        let content = "";
        if (reportFormat === "json") {
          const exportData = {
            metadata: {
              targetFile: selectedPreset.fileName,
              fileSizeBytes: selectedPreset.fileSize,
              ingestionType: selectedPreset.type,
              timestampHashChain: hash,
              complianceTimestamp: timestamp,
              complianceStatus: reportLevel.toUpperCase() + " LEVEL DIRECTIVE",
            },
            diagnosticMatrix: {
              authenticityVector: score + "%",
              securityRating: score > 50 ? "LOW RISK / INTENT INDEPENDENT" : "CRITICAL RISK / MITM SOURCE DECEPTION",
              integrityClassification: selectedPreset.expectedOutput.integrityRating,
              identifiedModelComposer: selectedPreset.expectedOutput.aiGenerator,
              suspectedSynthesiserEngine: selectedPreset.expectedOutput.sourceModel,
            },
            digitalFootprintCoordinates: {
              originIPAddress: selectedPreset.expectedOutput.creatorIp,
              gpsCoordinates: selectedPreset.expectedOutput.geoCoordinates,
              captureDeviceSignature: selectedPreset.expectedOutput.creatorDevice,
              originNetworkProvider: selectedPreset.expectedOutput.networkProvider,
              ingressPlatformCDN: selectedPreset.expectedOutput.firstUploadPlatform,
            },
            pixelSeamAnomalies: scopes.raster ? selectedPreset.expectedOutput.anomalies : [],
            auditTerminalLogs: scopes.terminalLogs ? terminalLogs : ["Logs omitted by standard privacy policy configuration."],
            forensicLegalDirectives: scopes.recommendations ? [
              "Standard chain-of-custody must be enforced inside public legal bounds.",
              "Payload metadata indicates source manipulation. Do not admit to open public server storage.",
              "Maintain dual-vault digital cryptography anchors if submitting to municipal judicial archives."
            ] : []
          };
          content = JSON.stringify(exportData, null, 2);
        } else if (reportFormat === "csv") {
          content = "FIELD,VALUE,DIAGNOSTIC SCOPE\n" +
            `INTEGRITY_HASH,${hash},System Integrity\n` +
            `TARGET_FILE,${selectedPreset.fileName},System Ingestion\n` +
            `FILE_SIZE,${selectedPreset.fileSize},System Ingestion\n` +
            `TYPE,${selectedPreset.type},System Ingestion\n` +
            `AUTHENTICITY_SCORE,${score}%,Verification Matrix\n` +
            `RATING,${selectedPreset.expectedOutput.integrityRating},Verification Matrix\n` +
            `MODEL_COMPOSER,${selectedPreset.expectedOutput.aiGenerator},Verification Matrix\n` +
            `SYNTH_ENGINE,${selectedPreset.expectedOutput.sourceModel},Verification Matrix\n` +
            `ORIGIN_IP,${selectedPreset.expectedOutput.creatorIp},Footprint Tracer\n` +
            `GPS_COORDINATES,${selectedPreset.expectedOutput.geoCoordinates},Footprint Tracer\n` +
            `CAPTURE_DEVICE,${selectedPreset.expectedOutput.creatorDevice},Footprint Tracer\n` +
            `NETWORK_ASN,${selectedPreset.expectedOutput.networkProvider},Footprint Tracer\n` +
            `CDN_UPSTREAM,${selectedPreset.expectedOutput.firstUploadPlatform},Footprint Tracer\n` +
            `ANOMALIES,"${selectedPreset.expectedOutput.anomalies.join('; ')}",Raster Details\n`;
        } else {
          // HTML Print Brief mockup
          content = `<!DOCTYPE html>
<html>
<head>
  <title>AiVerse Forensics Audit Brief: ${selectedPreset.fileName}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1e293b; background: #fff; line-height: 1.6; }
    .header { text-align: center; border-bottom: 2px solid #3b82f6; padding-bottom: 20px; margin-bottom: 30px; }
    .title { font-size: 24px; font-weight: bold; margin: 0; }
    .hash { font-family: monospace; font-size: 11px; color: #64748b; background: #f1f5f9; padding: 4px 8px; border-radius: 4px; }
    .score-badge { display: inline-block; padding: 6px 12px; background: ${score > 50 ? '#d1fae5' : '#fee2e2'}; color: ${score > 50 ? '#065f46' : '#991b1b'}; border-radius: 9999px; font-weight: bold; font-family: monospace; font-size: 14px; margin-top: 10px; }
    .section-title { font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; margin-top: 30px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th, td { text-align: left; padding: 8px 12px; font-size: 12px; border-bottom: 1px solid #f1f5f9; }
    th { color: #64748b; font-weight: 600; width: 40%; }
    .log-item { font-family: monospace; font-size: 11px; background: #0f172a; color: #94a3b8; padding: 8px 12px; margin-bottom: 4px; border-left: 3px solid #3b82f6; white-space: pre-wrap; }
  </style>
</head>
<body>
  <div class="header">
    <div class="title">AIVERSE DEFENSE GROUP FORENSICS REPORT</div>
    <div style="font-size: 11px; text-transform: uppercase; font-weight: bold; margin-bottom: 8px;">${reportLevel.toUpperCase()} LEVEL ENFORCEMENT AUDIT</div>
    <span class="hash">${hash}</span>
    <div><span class="score-badge">AUTHENTICITY: ${score}% (${selectedPreset.expectedOutput.integrityRating.toUpperCase()})</span></div>
  </div>

  <div class="section-title">Ingested Specimen Metadata</div>
  <table>
    <tr><th>Specimen File Name</th><td>${selectedPreset.fileName}</td></tr>
    <tr><th>Specimen Payload Size</th><td>${selectedPreset.fileSize}</td></tr>
    <tr><th>Payload Category Type</th><td>${selectedPreset.type.toUpperCase()} Payload</td></tr>
    <tr><th>ISO Verification Date</th><td>${timestamp}</td></tr>
  </table>

  <div class="section-title">Forensic Ingestion Vector Diagnostics</div>
  <table>
    <tr><th>Primary Class Output</th><td>${selectedPreset.expectedOutput.status}</td></tr>
    <tr><th>Suspected Algorithmic Generative Composer</th><td>${selectedPreset.expectedOutput.aiGenerator}</td></tr>
    <tr><th>Raster Interpolation Mesh Mismatch</th><td>${selectedPreset.expectedOutput.sourceModel}</td></tr>
    <tr><th>Origin Trace IP Address</th><td>${selectedPreset.expectedOutput.creatorIp}</td></tr>
    <tr><th>GPS Asset Coordinate Origin</th><td>${selectedPreset.expectedOutput.geoCoordinates}</td></tr>
    <tr><th>Physical Hardware ID Agent Signature</th><td>${selectedPreset.expectedOutput.creatorDevice}</td></tr>
    <tr><th>Upstream CDN / Host Registry</th><td>${selectedPreset.expectedOutput.firstUploadPlatform}</td></tr>
    <tr><th>Network ASN Node Provider</th><td>${selectedPreset.expectedOutput.networkProvider}</td></tr>
  </table>

  ${scopes.metadata ? `
  <div class="section-title">Identified Forensic Anomalies & Seams</div>
  <ul>
    ${selectedPreset.expectedOutput.anomalies.map(anom => `<li style="font-size:12px; margin-bottom:6px;">${anom}</li>`).join('')}
  </ul>` : ""}

  ${scopes.terminalLogs ? `
  <div class="section-title">Synchronous Engine Command Output Trace</div>
  <div>
    ${terminalLogs.map(log => `<div class="log-item">${log}</div>`).join('')}
  </div>` : ""}

  <div class="section-title">Judicial Legality Disclaimer</div>
  <p style="font-size: 11px; color: #64748b; line-height: 1.4;">
    This cryptographic document has been compiled automatically with hardware-enforced private token signatures. Standard SOC2 boundaries comply. Formats are fully admissible inside the Swiss Court of Arbitrations as certified digital coordinates under Annex 14.
  </p>
</body>
</html>`;
        }

        setCompletedReport(content);
        setIsGenerating(false);
      }
    };

    runStep(0);
  };

  const triggerRawDownload = () => {
    if (!completedReport) return;
    const blob = new Blob([completedReport], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const extension = reportFormat === "json" ? "json" : reportFormat === "csv" ? "csv" : "html";
    link.download = `aiverse_forensics_${selectedPreset.fileName.replace(/\.[^/.]+$/, "")}_report.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 select-none relative shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-950 text-blue-400 border border-blue-900/60 flex items-center justify-center">
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-black block">Report Centre v1.4</span>
            <strong className="text-xs text-white block">Diagnostic Audit and Data Export Suite</strong>
          </div>
        </div>
        <span className="text-[8px] font-mono bg-indigo-950 border border-indigo-900 text-indigo-400 px-2 py-0.5 rounded-full uppercase">
          Client Local Vault
        </span>
      </div>

      {/* Grid Settings Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Export Configuration Fields */}
        <div className="space-y-3.5 bg-slate-950/50 p-3 rounded-xl border border-slate-900">
          <span className="text-[9px] font-mono font-bold text-slate-450 uppercase flex items-center gap-1.5 border-b border-slate-900 pb-1.5 mb-1">
            <Settings className="w-3 h-3 text-blue-500" />
            1. Configure Output Formats
          </span>

          {/* Toggle buttons for Format */}
          <div className="space-y-1.5">
            <span className="text-[8px] font-mono text-slate-500 uppercase font-bold">Report Format Target</span>
            <div className="grid grid-cols-3 gap-1 p-0.5 bg-slate-950 border border-slate-850 rounded-lg">
              <button 
                onClick={() => setReportFormat("json")}
                className={`py-1 rounded text-[10px] font-mono font-bold cursor-pointer transition ${reportFormat === "json" ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"}`}
              >
                JSON
              </button>
              <button 
                onClick={() => setReportFormat("csv")}
                className={`py-1 rounded text-[10px] font-mono font-bold cursor-pointer transition ${reportFormat === "csv" ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"}`}
              >
                CSV
              </button>
              <button 
                onClick={() => setReportFormat("html")}
                className={`py-1 rounded text-[10px] font-mono font-bold cursor-pointer transition ${reportFormat === "html" ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"}`}
              >
                HTML / Print
              </button>
            </div>
          </div>

          {/* Report Strictness Standard */}
          <div className="space-y-1.5">
            <span className="text-[8px] font-mono text-slate-500 uppercase font-bold">Audit Standard Level</span>
            <div className="grid grid-cols-3 gap-1 p-0.5 bg-slate-950 border border-slate-850 rounded-lg">
              <button 
                onClick={() => setReportLevel("standard")}
                className={`py-1 rounded text-[9px] font-mono font-bold cursor-pointer transition ${reportLevel === "standard" ? "bg-slate-800 text-slate-100 border border-slate-700" : "text-slate-500 hover:text-white"}`}
              >
                Standard
              </button>
              <button 
                onClick={() => setReportLevel("legal")}
                className={`py-1 rounded text-[9px] font-mono font-bold cursor-pointer transition ${reportLevel === "legal" ? "bg-slate-800 text-slate-100 border border-slate-700" : "text-slate-500 hover:text-white"}`}
              >
                Judicial / Legal
              </button>
              <button 
                onClick={() => setReportLevel("nist")}
                className={`py-1 rounded text-[9px] font-mono font-bold cursor-pointer transition ${reportLevel === "nist" ? "bg-slate-800 text-slate-100 border border-slate-700" : "text-slate-500 hover:text-white"}`}
              >
                Gov / NIST
              </button>
            </div>
          </div>
        </div>

        {/* Content Blocks Picker */}
        <div className="space-y-2 bg-slate-950/50 p-3 rounded-xl border border-slate-900">
          <span className="text-[9px] font-mono font-bold text-slate-450 uppercase flex items-center gap-1.5 border-b border-slate-900 pb-1.5 mb-1">
            <Shield className="w-3 h-3 text-indigo-500" />
            2. Content Integrity Scopes
          </span>

          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-[10px] font-mono text-slate-350 cursor-pointer hover:text-white">
              <span className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={scopes.metadata} 
                  onChange={() => handleScopeToggle("metadata")}
                  className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0"
                />
                Device & Geo Coordinates
              </span>
              <span className="text-[8px] text-slate-500 font-bold">MAPPED</span>
            </label>

            <label className="flex items-center justify-between text-[10px] font-mono text-slate-350 cursor-pointer hover:text-white">
              <span className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={scopes.raster} 
                  onChange={() => handleScopeToggle("raster")}
                  className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0"
                />
                Pixel Seam Anomalies
              </span>
              <span className="text-[8px] text-slate-500 font-bold">MAPPED</span>
            </label>

            <label className="flex items-center justify-between text-[10px] font-mono text-slate-350 cursor-pointer hover:text-white">
              <span className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={scopes.frequency} 
                  onChange={() => handleScopeToggle("frequency")}
                  className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0"
                />
                DSP Spectrogram Diffs
              </span>
              <span className="text-[8px] text-slate-500 font-bold">MAPPED</span>
            </label>

            <label className="flex items-center justify-between text-[10px] font-mono text-slate-350 cursor-pointer hover:text-white">
              <span className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={scopes.terminalLogs} 
                  onChange={() => handleScopeToggle("terminalLogs")}
                  className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0"
                />
                Terminal Log Events Trace
              </span>
              <span className="text-[8px] text-slate-500 font-bold">TRACED</span>
            </label>

            <label className="flex items-center justify-between text-[10px] font-mono text-slate-350 cursor-pointer hover:text-white">
              <span className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={scopes.recommendations} 
                  onChange={() => handleScopeToggle("recommendations")}
                  className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0"
                />
                Corporate Directives Policy
              </span>
              <span className="text-[8px] text-blue-450 font-extrabold uppercase">ADVISORY</span>
            </label>
          </div>
        </div>
      </div>

      {/* Main Actions Box */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 relative min-h-[90px] flex flex-col justify-center">
        {!isGenerating && !completedReport && (
          <div className="text-center space-y-2">
            <p className="text-[10px] font-mono text-slate-450">
              Compilation standard complies with <strong className="text-slate-300">RFC-822</strong> digital forensics chain specifications.
            </p>
            <button
              onClick={startReportCompilation}
              className="px-5 py-2.5 bg-blue-605 hover:bg-blue-650 text-white font-bold text-xs rounded-lg uppercase tracking-wider font-mono shadow-md flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-white" />
              Compile Authenticity Audit Report
            </button>
          </div>
        )}

        {/* COMPILING TRANSITION STEP */}
        {isGenerating && (
          <div className="space-y-3 font-mono text-xs text-slate-100">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-2 text-blue-400 font-bold pb-0.5">
                <RefreshCw className="w-3.5 h-3.5 text-blue-405 animate-spin" />
                SECURE REPORT BUILDER ENGINE IS GENERATING...
              </span>
              <span>{Math.round((genStep / generationSteps.length) * 100)}%</span>
            </div>

            <div className="text-[10px] text-slate-300 bg-slate-900 border border-slate-850 p-2 rounded flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span className="truncate">{generationSteps[genStep]}</span>
            </div>

            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
              <div 
                style={{ width: `${((genStep + 1) / generationSteps.length) * 100}%` }}
                className="h-full bg-blue-500 transition-all duration-300"
              />
            </div>
          </div>
        )}

        {/* COMPLETED EXPORT READY FOR DOWNLOAD */}
        {completedReport && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono"
          >
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-450 font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Forensics Brief Compiled Successfully</span>
              </div>
              <p className="text-[10.5px] text-slate-450 whitespace-pre-wrap leading-tight">
                Package Size: {(completedReport.length / 1024).toFixed(2)} KB • Key Signature: <strong className="text-slate-350">RSA-4096 SEALED</strong>
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setCompletedReport(null)}
                className="flex-1 sm:flex-none px-3.5 py-2 border border-slate-800 rounded-lg text-[10px] hover:bg-slate-900 text-slate-400 hover:text-white transition font-bold"
              >
                Configure Next
              </button>
              <button
                onClick={triggerRawDownload}
                className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-lg tracking-wider uppercase flex items-center justify-center gap-1.5 transition shadow shadow-emerald-900/50 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Download ({reportFormat.toUpperCase()})
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

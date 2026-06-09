import { ShieldCheck, Mail, Phone, MapPin, Globe, Linkedin, Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-950 pt-16 pb-8 px-6 md:px-12 lg:px-20 xl:px-32 text-slate-300 w-full">
      <div className="w-full space-y-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-left">
          
          {/* Brand/Slogan Side Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-md">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <strong className="text-white text-sm font-display tracking-tight block leading-none pb-0.5">
                  AiVerse
                </strong>
                <span className="text-[9px] font-mono font-bold text-blue-500 block leading-none">by Shaduli</span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Making AI Accountable, Traceable, and Trustworthy. The premium governance platform trusted by global organizations, banks, brand managers, and public sectors.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-blue-500 hover:bg-slate-750 transition shadow-sm">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-blue-500 hover:bg-slate-750 transition shadow-sm">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://github.com/muhammedshaduli/aiverse-cyber" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-blue-500 hover:bg-slate-750 transition shadow-sm" title="View on GitHub">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Products menu */}
          <div className="space-y-4 text-xs">
            <span className="block font-mono font-bold text-slate-400 uppercase tracking-wider text-[10px]">
              Products
            </span>
            <ul className="space-y-2.5 font-medium text-slate-400">
              <li><a href="#" className="hover:text-white transition">AiVerse Trust</a></li>
              <li><a href="#" className="hover:text-white transition">AiVerse Shield</a></li>
              <li><a href="#" className="hover:text-white transition">AiVerse Guardian</a></li>
              <li><a href="#" className="hover:text-white transition">AiVerse Watch</a></li>
              <li><a href="#" className="hover:text-white transition">AiVerse Verify</a></li>
              <li><a href="#" className="hover:text-white transition">AiVerse Sentinel</a></li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="space-y-4 text-xs">
            <span className="block font-mono font-bold text-slate-400 uppercase tracking-wider text-[10px]">
              Solutions
            </span>
            <ul className="space-y-2.5 font-medium text-slate-400">
              <li><a href="#" className="hover:text-white transition">Fintech Fraud Preventions</a></li>
              <li><a href="#" className="hover:text-white transition">Sovereign Election Safety</a></li>
              <li><a href="#" className="hover:text-white transition">Executive Identity Guard</a></li>
              <li><a href="#" className="hover:text-white transition">RAW Camera Verification</a></li>
              <li><a href="#" className="hover:text-white transition">Admissible Forensic Logs</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4 text-xs">
            <span className="block font-mono font-bold text-slate-400 uppercase tracking-wider text-[10px]">
              Company
            </span>
            <ul className="space-y-2.5 font-medium text-slate-400">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition font-bold text-blue-500">Careers (We're Hiring)</a></li>
              <li><a href="#" className="hover:text-white transition">Media Kit</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Support</a></li>
              <li><a href="#" className="hover:text-white transition">Trust & Safety Guidelines</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4 text-xs">
            <span className="block font-mono font-bold text-slate-400 uppercase tracking-wider text-[10px]">
              Contact Desk
            </span>
            <ul className="space-y-3 font-medium text-slate-405">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>governance@aiverse.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>+1 (800) 902-TRUST</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>Zurich Old City, Switzerland</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[10px] font-mono">SECURE ENDPOINT LEASE</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Compliance badges strip & legal footer */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4 text-[9px] font-mono font-bold text-slate-450">
            <span className="border border-slate-750 p-1.5 rounded bg-slate-850 font-extrabold uppercase select-none text-slate-400">SEC APPROVED</span>
            <span className="border border-slate-750 p-1.5 rounded bg-slate-850 font-extrabold uppercase select-none text-slate-400">DHS ALIGNED</span>
            <span className="border border-slate-750 p-1.5 rounded bg-slate-850 font-extrabold uppercase select-none text-slate-400">NIST SP 800-218</span>
            <span className="border border-slate-750 p-1.5 rounded bg-slate-850 font-extrabold uppercase select-none text-slate-400">EU AI ACT AUDITED</span>
          </div>

          <p className="text-[10px] font-mono text-slate-500 text-center md:text-right">
            © {new Date().getFullYear()} AiVerse by Shaduli. Swiss Secure Registry Nodes. Fully compliant with C2PA and global trust frameworks.
          </p>
        </div>

      </div>
    </footer>
  );
}

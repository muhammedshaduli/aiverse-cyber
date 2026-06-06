import { useState, useEffect, useRef, ChangeEvent } from "react";
import { 
  ShieldCheck, ShieldAlert, ArrowLeft, RefreshCw, Upload, Sparkles, FileText, 
  Terminal, BarChart2, Award, Download, CheckCircle, AlertTriangle, Play, Pause,
  Lock, Zap, Sliders, ChevronRight, Eye, Grid, Info, Printer,
  Globe, Cpu, MapPin, Layers, Server
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import ReportExportPanel from "./ReportExportPanel";

interface ScanSample {
  id: string;
  name: string;
  type: "image" | "voice" | "video" | "email";
  input: string;
  fileName: string;
  fileSize: string;
  expectedOutput: {
    status: string;
    score: number;
    sourceModel: string;
    anomalies: string[];
    logs: string[];
    creatorIp: string;
    creatorDevice: string;
    aiGenerator: string;
    firstUploadPlatform: string;
    integrityRating: "High" | "Compromised" | "Synthesized" | "Malicious";
    geoCoordinates: string;
    networkProvider: string;
  };
}

const PRESET_SAMPLES: ScanSample[] = [
  // --- IMAGES (10) ---
  {
    id: "img-1",
    name: "Deepfake Politician Portrait",
    type: "image",
    fileName: "president_address_face_swap.jpg",
    fileSize: "4.2 MB",
    input: "https://cdn.aiverse.secure/ingest/img/president_address_face_swap_sha256_df78b2.png",
    expectedOutput: {
      status: "CRITICAL DEEPFAKE DETECTED (HIGH CONFIDENCE)",
      score: 12.4,
      sourceModel: "InsightFace-Swap-v2 + Midjourney v6 Refiner",
      creatorIp: "185.190.140.23 (Associated with Tor Exit Node)",
      creatorDevice: "NVIDIA RTX 4090 GPU Node - Cloud Virtual Worker",
      aiGenerator: "Midjourney v6 + InsightFace API (Swap Engine model 5)",
      firstUploadPlatform: "Telegram Channel (@worldintel01 - Forwarded post)",
      integrityRating: "Synthesized",
      geoCoordinates: "47.3769° N, 8.5417° E (Zurich proxy signature)",
      networkProvider: "Swisscom Hostings & Public Gateways AG",
      anomalies: [
        "Unnatural grid seams along jawline boundary",
        "Pixel scale high-frequency variance in earlobe shadow mismatch",
        "Biometric blink rate timing (eye symmetry factor variance: 22.4%)"
      ],
      logs: [
        "[BOOT] Initializing CNN Multimodal Pixel Grid Analyser...",
        "[COMP] Standard facial geometry mapped successfully.",
        "[WARN] GAN Boundary discontinuity found near (X: 1042, Y: 439).",
        "[COMP] Noise frequency decomposition running via Fourier transform...",
        "[ALERT] High-frequency synthetic grain structure recognized.",
        "[INFO] Cross-checking image meta attributes... raw Camera Sensor signatures missing."
      ]
    }
  },
  {
    id: "img-2",
    name: "Authentic Executive Headshot",
    type: "image",
    fileName: "cfo_id_verification.jpg",
    fileSize: "1.8 MB",
    input: "https://cdn.aiverse.secure/ingest/img/cfo_id_verification_sha256_e1092a.png",
    expectedOutput: {
      status: "ORIGIN VERIFIED - EXTREMELY HIGH AUTHENTICITY",
      score: 98.6,
      sourceModel: "Sony Raw Lens Metadata Verification Engine",
      creatorIp: "84.22.129.5 (Verified Secure Corporate Lease)",
      creatorDevice: "Sony Alpha ILCE-7M4 DSLR digital capture core",
      aiGenerator: "None - Organic Capture Core (Camera Hardware Verified)",
      firstUploadPlatform: "LinkedIn Profile Upload (Corporate OAuth Portal)",
      integrityRating: "High",
      geoCoordinates: "48.8566° N, 2.3522° E (Paris Head Office)",
      networkProvider: "Orange Business Services France",
      anomalies: [
        "Raw camera sensor signature verified (F-stop, ISO matching metadata perfectly)",
        "Organic skin pore distribution matching biome standards (100% fidelity)",
        "Optical light bounce matches background vector geometry"
      ],
      logs: [
        "[BOOT] Initializing CNN Multimodal Pixel Grid Analyser...",
        "[COMP] Light direction vectors calculated (matches 3D physics environment).",
        "[INFO] Core Sony ILCE-7M4 sensor firmware signature validated.",
        "[COMP] Skin texture noise variance matches organic dermal properties.",
        "[SUCCESS] Zero GAN artifacts or synthetic blending patterns detected."
      ]
    }
  },
  {
    id: "img-3",
    name: "Synthesized Cyberpunk Avatar",
    type: "image",
    fileName: "cyberpunk_gamer_ai.png",
    fileSize: "5.1 MB",
    input: "https://cdn.aiverse.secure/ingest/img/cyberpunk_gamer_ai_sha256_e528a1.png",
    expectedOutput: {
      status: "GENERATIVE AI GRAPHIC DETECTED (STABLE DIFFUSION)",
      score: 32.5,
      sourceModel: "Stable Diffusion XL (SDXL Turbo Fine-tuned)",
      creatorIp: "92.40.12.189 (Public Wi-Fi Gateway)",
      creatorDevice: "Mozilla Firefox / Linux x86_64 host client",
      aiGenerator: "Stable Diffusion XL 1.0 (Commercial API)",
      firstUploadPlatform: "Discord CDN Ingress Pool (Guild attachment)",
      integrityRating: "Synthesized",
      geoCoordinates: "51.5074° N, 0.1278° W (London Public Hub)",
      networkProvider: "BT Broadband Consumer Gateways",
      anomalies: [
        "Irregular specular lighting highlights in cornea reflections",
        "Background noise entropy is perfectly uniform (unnatural digital flat)",
        "Inconsistent edge anti-aliasing near shoulder lines"
      ],
      logs: [
        "[BOOT] Re-mapping pixel boundaries with CNN v2.8...",
        "[INFO] High frequency pass filter activated.",
        "[ALERT] Specular reflection vector misses the virtual sun positioning.",
        "[WARN] Edge complexity map indicates commercial super-resolution model injection.",
        "[SUCCESS] Static GAN grain noise pattern verified."
      ]
    }
  },
  {
    id: "img-4",
    name: "Altered Passport Scan Document",
    type: "image",
    fileName: "eu_passport_scan_altered.jpg",
    fileSize: "2.3 MB",
    input: "https://cdn.aiverse.secure/ingest/img/passport_scan_tampered_sha256_b382c4.png",
    expectedOutput: {
      status: "DOCUMENT TAMPERING & AI INPAINTING DETECTED",
      score: 18.9,
      sourceModel: "Adobe Photoshop Generative Fill (Firefly Core)",
      creatorIp: "109.112.43.190 (Anonymized VPN Client Node)",
      creatorDevice: "Intel Core i9 Desktop Workstation - Hex Port Core",
      aiGenerator: "Adobe Firefly Inpainting API v2",
      firstUploadPlatform: "Direct SMTP Secure Inbound Mail Attachment",
      integrityRating: "Compromised",
      geoCoordinates: "47.3769° N, 8.5417° E (Proxy Server Signature)",
      networkProvider: "Hostpoint AG Swiss Cloud Services",
      anomalies: [
        "Discontinuous JPEG compression tables inside photo region cover",
        "Font glyph baseline mismatch in date field",
        "Sub-pixel raster alignment discrepancies on paper micro-grain"
      ],
      logs: [
        "[BOOT] Initializing Document Authenticator Pipeline...",
        "[COMP] Extracted EXIF header table: No original hardware signature.",
        "[ALERT] Discrete Wavelet Transform flags local manipulation at (X:120, Y:340).",
        "[INFO] Machine Learning Font Checker: Font is non-standard altered Arial variant.",
        "[WARN] Boundary noise anomalies found on MRZ sequence area."
      ]
    }
  },
  {
    id: "img-5",
    name: "Generative AI Landscape",
    type: "image",
    fileName: "pristine_swiss_mountain_ai.jpg",
    fileSize: "6.7 MB",
    input: "https://cdn.aiverse.secure/ingest/img/swiss_nature_scenery_flux.png",
    expectedOutput: {
      status: "SYNTHESIZED LANDSCAPE SCENERY (HIGH FIDELITY)",
      score: 25.1,
      sourceModel: "Flux.1 Pro High-Resolution Composer Engine",
      creatorIp: "142.250.74.46 (Hosting VPN Edge Server)",
      creatorDevice: "Headless Linux Tensor Processing Unit Node (TPU v4)",
      aiGenerator: "Flux.1 Pro Generative Diffusion Model",
      firstUploadPlatform: "Pinterest API bulk media loading engine",
      integrityRating: "Synthesized",
      geoCoordinates: "37.7749° N, 122.4194° W (US Bay Area DNS)",
      networkProvider: "Google LLC Cloud Infrastructure Services",
      anomalies: [
        "Impossible physical geometry on bridge support reflections",
        "Repetitive biological structures in pine tree leaf grids",
        "Exemplary absence of camera sensor dust or lens distortions"
      ],
      logs: [
        "[BOOT] Parsing visual perspective lines...",
        "[INFO] Running physics raytraced light simulation.",
        "[ALERT] Found 4 separate breaking physical vectors in lake shadow reflections.",
        "[COMP] Generating texture frequency coefficient score... 18.4 (AI generated standard).",
        "[SUCCESS] Metadata checks confirm lack of any real optical firmware track."
      ]
    }
  },
  {
    id: "img-6",
    name: "AI Face-Swap Security Attack",
    type: "image",
    fileName: "chief_security_officer_spoof.jpg",
    fileSize: "3.2 MB",
    input: "https://cdn.aiverse.secure/ingest/img/cso_face_swap_attack_ledger_e11.jpg",
    expectedOutput: {
      status: "SECURITY SPOOF ATTACK - DISCRETE FACE SWAP DETECTED",
      score: 8.7,
      sourceModel: "SimSwap API + RealESRGAN Upscaler",
      creatorIp: "198.51.100.41 (Tor Middle Relay Host)",
      creatorDevice: "Virtual Linux Daemon - GPU Powered Python Instance",
      aiGenerator: "SimSwap InsightFace API model 4",
      firstUploadPlatform: "GitHub Repository Commit Ingress Hook",
      integrityRating: "Malicious",
      geoCoordinates: "52.5200° N, 13.4050° E (Berlin Anonymized)",
      networkProvider: "Colocation Berlin AG Hostings",
      anomalies: [
        "Severe biometric mesh mismatch along temple skin lines",
        "Specular glare discrepancy in left versus right eyeball pupil",
        "Sudden JPEG quantization change across face-box mask bounds"
      ],
      logs: [
        "[BOOT] Running Deep Spoof Guard Engine...",
        "[EVAL] Facial bounding box (X=140,Y=95,W=330,H=330) matches targeted attack profile.",
        "[ALERT] Biometric facial geometry does not match authenticated corporate photo archives.",
        "[WARN] Local illumination coefficient discrepancy: 45.2% limit breached.",
        "[ALERT] Face-Swap blending artifacts found in cheek gradient regions."
      ]
    }
  },
  {
    id: "img-7",
    name: "Authentic Press Conference Photo",
    type: "image",
    fileName: "parliamentary_vote_unaltered.jpg",
    fileSize: "5.4 MB",
    input: "https://cdn.aiverse.secure/ingest/img/parliament_press_canon_e591.jpg",
    expectedOutput: {
      status: "ORIGIN VERIFIED - CRYPTOGRAPHIC INTEGRITY CERTIFICATE",
      score: 99.4,
      sourceModel: "Canon EOS-1D X Mark III Raw Authenticator",
      creatorIp: "12.42.190.5 (Press Pool Authorized VPN Gateway)",
      creatorDevice: "Canon EOS-1D X Mark III DSLR Capture Core",
      aiGenerator: "None - Organic Hardware Capture Core (Verified)",
      firstUploadPlatform: "AP Press Wire Agent Portal API Ingest",
      integrityRating: "High",
      geoCoordinates: "52.3676° N, 4.9041° E (Amsterdam Parliament)",
      networkProvider: "KPN Corporate Telecommunication Services NL",
      anomalies: [
        "Inorganic artifacts 0% (Fully organic pixel structure throughout)",
        "Perfect RAW file structure alignment with lens metadata hashes",
        "Real sensor thermal noise levels matching physical ISO settings"
      ],
      logs: [
        "[BOOT] Deciphering Canon Cryptographic Lens Signature...",
        "[INFO] Signature matches verified AP Press public key index hash.",
        "[COMP] Light frequency vector distribution check... PASS.",
        "[INFO] Biometric lip, eye, skin features map perfectly to organic standards.",
        "[SUCCESS] Photo fully authenticated against real-time physical parameters."
      ]
    }
  },
  {
    id: "img-8",
    name: "GAN-Generated Corporate Avatar",
    type: "image",
    fileName: "fake_employee_profile_face.png",
    fileSize: "1.2 MB",
    input: "https://thispersondoesnotexist.com/image_feed_sha256_b319a2e.png",
    expectedOutput: {
      status: "SYNTHETIC AVATAR DETECTED (STYLEGAN MODEL)",
      score: 15.2,
      sourceModel: "StyleGAN3 High Density Portrait Generator",
      creatorIp: "103.220.10.45 (Residential Broadband IP Signature)",
      creatorDevice: "Unidentified Windows Client - Chromium Node",
      aiGenerator: "StyleGAN3 (This Person Does Not Exist Pool)",
      firstUploadPlatform: "LinkedIn Automatic Profile Crawler Ingestion",
      integrityRating: "Synthesized",
      geoCoordinates: "1.3521° N, 103.8198° E (Singapore proxy)",
      networkProvider: "StarHub Ltd Singapore Core Networks",
      anomalies: [
        "Unnatural asymmetrical shape of earlobe outlines",
        "Abstract rendering errors in structural background objects",
        "Unusually centered pupil focus lacking optical environment light source"
      ],
      logs: [
        "[BOOT] Running GAN-Fingerprint Detector v1.0...",
        "[INFO] Scanning background complexity matrix.",
        "[ALERT] High correlation score (98.4%) with StyleGAN latent space vectors.",
        "[WARN] Mismatched earring shapes found in vertical facial bilateral scan.",
        "[COMP] Synthesis model classified: StyleGAN-v3 core."
      ]
    }
  },
  {
    id: "img-9",
    name: "Organic Crime Scene Evidence",
    type: "image",
    fileName: "forensic_exhibit_a_undamaged.jpg",
    fileSize: "8.1 MB",
    input: "https://secure.evidence.police.int/ingest/img/evidence_crime_scene_492.jpg",
    expectedOutput: {
      status: "AUTHENTIC EVIDENCE DOCUMENT (METADATA REASSURED)",
      score: 99.1,
      sourceModel: "Nikon D850 Secure Evidentiary Lens Module",
      creatorIp: "193.138.2.14 (Government Secure Network Lease)",
      creatorDevice: "Nikon D850 Raw Forensic Digital Camera Core",
      aiGenerator: "None - Biological Sensor Raw Capture Core",
      firstUploadPlatform: "Police Secure Internal Evidence Ingestion Node",
      integrityRating: "High",
      geoCoordinates: "48.2082° N, 16.3738° E (Vienna Court Hub)",
      networkProvider: "A1 Telekom Austria Corporate Secure Net",
      anomalies: [
        "Optical lens chromatic aberrations match physics (100% genuine)",
        "Perfect continuous gradient matching sensor grain at pixel-scale",
        "Unmodified EXIF timezone and camera serial hashes"
      ],
      logs: [
        "[BOOT] Loading raw evidence binary stream...",
        "[INFO] Validating embedded SHA-256 integrity tag: MATCHES COURT REGISTRY.",
        "[COMP] Scanning for micro-manipulations, clones, or inpainting... None.",
        "[SUCCESS] Image structure certified: 100% authentic biological capture."
      ]
    }
  },
  {
    id: "img-10",
    name: "Adversarial Noise Infiltration Patch",
    type: "image",
    fileName: "adversarial_noise_bypass_exploit.png",
    fileSize: "2.1 MB",
    input: "https://cdn.aiverse.secure/ingest/img/adversarial_noise_synthetic_grid.png",
    expectedOutput: {
      status: "CRITICAL MALICIOUS EXPLOIT - ADVERSARIAL PATTERN DETECTED",
      score: 4.2,
      sourceModel: "Fast Gradient Sign Method (FGSM) Perturbator",
      creatorIp: "45.138.16.220 (IP spoofing active - VPN Node)",
      creatorDevice: "Kali Linux Forensic VM + Python TF/Keras script Engine",
      aiGenerator: "FGSM Adversarial Noise Generation Script",
      firstUploadPlatform: "Custom TCP Port 3000 Raw Buffer stream direct connection",
      integrityRating: "Malicious",
      geoCoordinates: "55.7558° N, 37.6173° E (Moscow VPN Router Signature)",
      networkProvider: "Rostelecom VPN Ingress Client Pools",
      anomalies: [
        "Artificially synthesized pixel grit calibrated to trigger classifier faults",
        "Presence of high frequency repeating math bands in blue channel",
        "Total destruction of expected natural photography compression ratios"
      ],
      logs: [
        "[BOOT] Executing Adversarial Pattern Audit...",
        "[ALERT] Detected high-frequency perturbation bands in all color channels.",
        "[ALERT] Math signature matches neural classifier attack pattern (targeted bypass model).",
        "[WARN] Standard image classifiers would recognize this as a harmless 'cat' (99.8% false confidence).",
        "[SUCCESS] Adversarial mask uncovered. Restoring base image structure... Complete."
      ]
    }
  },

  // --- AUDIO / VOICE (10) ---
  {
    id: "voice-1",
    name: "Simulated CEO Voice Cloning Attack",
    type: "voice",
    fileName: "ceo_wire_transfer_verification.wav",
    fileSize: "8.4 MB",
    input: "https://cdn.aiverse.secure/ingest/audio/ceo_wire_transfer_v2_elevenlabs.wav",
    expectedOutput: {
      status: "VOICE SYNTHESIS DETECTED (SPOOF ATTACK RISK: MAXIMUM)",
      score: 4.8,
      sourceModel: "ElevenLabs Voice V3 Multilingual Engine",
      creatorIp: "45.138.16.220 (IP spoofing flags active - NordVPN Node 112)",
      creatorDevice: "Apple MacBook Pro M3 Max (Built-in DAW Outport)",
      aiGenerator: "ElevenLabs Multilingual Speech Synthesis v3",
      firstUploadPlatform: "WhatsApp Audio Attachment (Voice Note API Ingest)",
      integrityRating: "Malicious",
      geoCoordinates: "55.7558° N, 37.6173° E (Moscow routing header)",
      networkProvider: "Rostelecom Gateways (Anonymized VPN client)",
      anomalies: [
        "Synthetic vocoder silence signatures (0ms acoustic threshold)",
        "Absence of human sub-harmonic throat rasps or respiration offsets",
        "Formant envelope matches known synthetic resonance signatures"
      ],
      logs: [
        "[BOOT] Ingesting Voice Envelope Data Stream...",
        "[COMP] Splitting audio buffer into sliding 10ms frame fragments...",
        "[ALERT] Periodic vocoder click intervals observed at 14kHz.",
        "[COMP] Analyzing sub-vocal dynamic range factor...",
        "[WARN] Zero biometric breathing pressure anomalies detected (unnatural continuous flow).",
        "[ALERT] 11Labs speech pitch matching model recognized at 99.1% validation."
      ]
    }
  },
  {
    id: "voice-2",
    name: "Organic Customer Service Record",
    type: "voice",
    fileName: "support_voice_call_2384.wav",
    fileSize: "3.2 MB",
    input: "Inbound telecom stream audio/x-wav bandwidth-limited 8kHz voice channel",
    expectedOutput: {
      status: "AUTHENTIC VOICE FEED - ORGANIC METRICS MATCHED",
      score: 95.7,
      sourceModel: "Avaya Telecom VoIP Hardware Gateway Core",
      creatorIp: "84.22.129.5 (Verified Corporate Tenant Office)",
      creatorDevice: "Avaya J179 IP Deskphone Hardware Module",
      aiGenerator: "None - Fully Organic Acoustic Voice Signal",
      firstUploadPlatform: "Customer Service VoIP Audio Inbound Gateway",
      integrityRating: "High",
      geoCoordinates: "48.8566° N, 2.3522° E (Paris Call Center)",
      networkProvider: "Orange Business Services France",
      anomalies: [
        "Organic background acoustic noise leakage (HVAC fan pitch variance)",
        "Micro-breathing pressure drops preceding all initial labial utterances",
        "Non-linear vocal tract length resonance matching biological thyroid mechanics"
      ],
      logs: [
        "[BOOT] Loading 8kHz Telecom codec package...",
        "[INFO] Analyzing low-bandwidth voice signal sequence.",
        "[COMP] Formant tracking checks match biological throat vibration standards.",
        "[INFO] Continuous air-pressure inhalation dynamics detected and validated.",
        "[SUCCESS] Acoustic record matches a real living human profile."
      ]
    }
  },
  {
    id: "voice-3",
    name: "Vishing Automated AI Bot Gateway",
    type: "voice",
    fileName: "vishing_bot_security_alert.mp3",
    fileSize: "2.1 MB",
    input: "Direct VoIP stream packet payload - 16kHz audio sample channel info",
    expectedOutput: {
      status: "AI COGNITIVE VISHING ROBOT DETECTED (HIGH DANGER)",
      score: 14.5,
      sourceModel: "Play.ht Streamer + GPT-4o Real-Time Voice Endpoint",
      creatorIp: "103.220.10.45 (Residential ISP Node)",
      creatorDevice: "Headless Linux Virtual Telecom SIP Gateway Daemon",
      aiGenerator: "Play.ht Real-time Fast Streamer v2 API",
      firstUploadPlatform: "Direct Inbound Twilio SIP Trunk Line Portal Ingestion",
      integrityRating: "Malicious",
      geoCoordinates: "19.0760° N, 72.8777° E (Mumbai South Proxy Terminal)",
      networkProvider: "Reliance Jio Infocomm Ltd Mumbai",
      anomalies: [
        "Perfect 0ms latency responses with zero speech preparation offsets",
        "Synthesized high-frequency frequency cutoff above 11.025kHz",
        "Identical voice pitch curves found across separate word sequences"
      ],
      logs: [
        "[BOOT] Hooking Twilio payload audio feed...",
        "[ALERT] Ultra-fast speech turnaround detected (12ms system threshold).",
        "[INFO] Running dynamic range expander audit...",
        "[ALERT] Total absence of microphone pop filter micro-turbulence.",
        "[SUCCESS] Voice matched to Play.ht real-time automated service APIs."
      ]
    }
  },
  {
    id: "voice-4",
    name: "Authentic Podcaster Wav Stream",
    type: "voice",
    fileName: "tech_podcast_host_unaltered.wav",
    fileSize: "14.2 MB",
    input: "High-definition broadcast stream codec: FLAC audio 24-bit 48kHz audio",
    expectedOutput: {
      status: "AUTHENTIC HIGH QUALITY STUDIO RECORDING",
      score: 91.2,
      sourceModel: "Focusrite Scarlett 2i2 USB Mic Hardware",
      creatorIp: "81.187.3.4 (Broadcaster Dedicated Lease Line)",
      creatorDevice: "Shure SM7B Dynamic Cardioid Vocal Microphone Core",
      aiGenerator: "None - Verified Biological Voice Instrument",
      firstUploadPlatform: "Spotify Creator Ingestion Dashboard Inbound Portal",
      integrityRating: "High",
      geoCoordinates: "51.5074° N, 0.1278° W (London Commercial Studio)",
      networkProvider: "Andrews & Arnold Telecoms Services UK",
      anomalies: [
        "Inorganic synthetic vocoder artifacts 0.0%",
        "Natural vocal tract laryngeal fatigue dynamics over timeline",
        "Organic reflection coefficients matching physical acoustic studio baffles"
      ],
      logs: [
        "[BOOT] Running Ultra-HD HD-Audio Analyser Loop...",
        "[INFO] Sample density: 48,000 samples/sec. Bit depth: 24-bit.",
        "[COMP] Running harmonic distortion matrix audit... Matches physical dynamic mic properties.",
        "[SUCCESS] Acoustic background matches professional soundproof spatial room metrics."
      ]
    }
  },
  {
    id: "voice-5",
    name: "Synthetic Deep-Voice Ransom Note",
    type: "voice",
    fileName: "kidnap_scam_synthetic_voice.mp3",
    fileSize: "4.1 MB",
    input: "WhatsApp voice note attachment stream codec: opus audio 48kHz core",
    expectedOutput: {
      status: "CRITICAL SYSTEM THREAT - SYNTHESIZED EMERGENCY ATTACK",
      score: 6.3,
      sourceModel: "Meta Voicebox High Dynamic Synthesizer Model",
      creatorIp: "93.115.95.14 (Hosting Cloud Infrastructure Workspace)",
      creatorDevice: "Host VM running headless PyTorch instance on NVIDIA Tesla",
      aiGenerator: "Meta Voicebox / Bark TTS Hybrid Model",
      firstUploadPlatform: "WhatsApp VoIP Mobile Client Gateway Portal",
      integrityRating: "Malicious",
      geoCoordinates: "38.9072° N, 77.0369° W (Washington Cloud Cluster)",
      networkProvider: "Amazon Web Services Inc. (us-east-1)",
      anomalies: [
        "Spliced neural vocoder phase shifts found inside transition syllables",
        "Deep synthetic resonance peaks at 240Hz lacking natural throat harmonics",
        "Absence of ambient geographic microphone noise floor"
      ],
      logs: [
        "[BOOT] Running Emergency Security Audio Scan...",
        "[ALERT] Biometric panic index check... Voice frequency curves are highly artificial.",
        "[WARN] Noise footprint is perfectly digital without physical capture properties.",
        "[ALERT] Voice database matching: Synthesized vocal model with 98.7% match index."
      ]
    }
  },
  {
    id: "voice-6",
    name: "AI Politician Speech Audio",
    type: "voice",
    fileName: "election_statement_falsified.mp3",
    fileSize: "6.2 MB",
    input: "Falsified election campaign audio payload MP3 file",
    expectedOutput: {
      status: "AI CAMPAIGN DEEPFAKE DETECTED (HIGH CONFIDENCE)",
      score: 22.8,
      sourceModel: "ElevenLabs Speech Synthesis (Fine-Tuned Voice Profile)",
      creatorIp: "185.190.140.23 (Associated with Tor Exit Tunnel Node)",
      creatorDevice: "Sundance Linux Server Worker Core Node",
      aiGenerator: "ElevenLabs Custom Cloned Profile (v2.4)",
      firstUploadPlatform: "Twitter/X Media Ingestion Mobile Interface Portal",
      integrityRating: "Synthesized",
      geoCoordinates: "47.3769° N, 8.5417° E (Zurich network signature)",
      networkProvider: "Swisscom Hostings & Public Gateways AG",
      anomalies: [
        "Unnatural uniform syllable duration (average variance: 2ms vs 120ms normal)",
        "Splicing click artifacts at transition pauses",
        "Vocal harmonics do not match organic age/height coefficients"
      ],
      logs: [
        "[BOOT] Activating Speech Wavelet Analyzer...",
        "[INFO] Processing 12.5 seconds campaign speech file.",
        "[ALERT] Synthesized prosody pattern detected. Syllables have artificial tempo.",
        "[ALERT] High-frequency spectral signature matches ElevenLabs Clone signature (97.4%).",
        "[SUCCESS] Flagged AI election manipulation attempt."
      ]
    }
  },
  {
    id: "voice-7",
    name: "Secure Biometric Voice Token",
    type: "voice",
    fileName: "biometric_access_pass_approved.wav",
    fileSize: "1.9 MB",
    input: "High fidelity mobile voice biometric token passcode verification",
    expectedOutput: {
      status: "AUTHENTIC BIOMETRIC ACCESS TOKEN REGISTERED",
      score: 96.9,
      sourceModel: "Apple iOS Secure Enclave Audio Hardware Engine",
      creatorIp: "84.22.129.5 (Corporate Lease Network Gateway)",
      creatorDevice: "iPhone 15 Pro iOS Hardware Audio Capture Port",
      aiGenerator: "None - Verified Biological Voice Token",
      firstUploadPlatform: "Corporate Single Sign On Portal Mobile API Ingest",
      integrityRating: "High",
      geoCoordinates: "48.8566° N, 2.3522° E (Paris Corporate Premises)",
      networkProvider: "Orange Business Services France",
      anomalies: [
        "Perfect biological mouth wetness pop transients detected",
        "Genuine room reverberation matching physical layout of smartphone",
        "Consistent vocal cord tension matching real-time physical pressure"
      ],
      logs: [
        "[BOOT] Initializing Biometric Identity Token Audit...",
        "[INFO] EXIF audio stream metadata has original Secure Enclave key signature.",
        "[COMP] Matching dynamic vocal frequency profile with corporate standard... 99.4% match.",
        "[SUCCESS] Access credentials and voice source validated successfully."
      ]
    }
  },
  {
    id: "voice-8",
    name: "ElevenLabs Support Cloning Trap",
    type: "voice",
    fileName: "bank_verification_ai_cloned.mp3",
    fileSize: "2.8 MB",
    input: "Inbound customer voice authentication wire confirmation portal data",
    expectedOutput: {
      status: "AI VOICE VECTOR DETECTED - SPOOF BLOCK COMMITTED",
      score: 11.2,
      sourceModel: "ElevenLabs Clone Model v2 (Voice Banking Variant)",
      creatorIp: "45.138.16.220 (IP spoofing active - NordVPN Terminal)",
      creatorDevice: "Host workstation running automated headless SIP scripts",
      aiGenerator: "ElevenLabs voice clone API premium pool",
      firstUploadPlatform: "VoIP Automated Core Wire Clearing Gateway",
      integrityRating: "Malicious",
      geoCoordinates: "55.7558° N, 37.6173° E (Moscow Router Signature)",
      networkProvider: "Rostelecom VPN Client Infrastructure Pools",
      anomalies: [
        "Unnatural uniform voice spectrum shape matching digital synthesizer grids",
        "Total absence of saliva pop noise or respiratory fluctuations",
        "Vocal intensity has zero correlation with speech emotion bounds"
      ],
      logs: [
        "[BOOT] Ingesting bank wire confirmation voice record...",
        "[ALERT] Speech spectrum analysis contains digital synthetic dither signs.",
        "[ALERT] Biometric laryngeal signature is fake (simulated vocal tract model).",
        "[SUCCESS] Mitigated cyber theft: Automated voice-biometric bypass attack defeated."
      ]
    }
  },
  {
    id: "voice-9",
    name: "Authentic Cockpit Audio Transcript",
    type: "voice",
    fileName: "flight_deck_comms_genuine.wav",
    fileSize: "9.2 MB",
    input: "Unaltered cockpit communication VHF transceiver capture signal",
    expectedOutput: {
      status: "AUTHENTIC COCKPIT TRANSMISSION (EXCLUSIVELY BIOLOGICAL)",
      score: 94.1,
      sourceModel: "Honeywell Flight Interface VHF Recording Module",
      creatorIp: "123.4.15.91 (Aviation Air Traffic Control Terminal)",
      creatorDevice: "Aviation VHF radio transceiver + dynamic pilot headset",
      aiGenerator: "None - Pure Organic Vocal Communications Interface",
      firstUploadPlatform: "FAA Flight Operations Telemetry Archive Port",
      integrityRating: "High",
      geoCoordinates: "47.4582° N, 8.5555° E (Zurich Airport ATC Tower)",
      networkProvider: "Swisscom Corporate Aviation Gateways AG",
      anomalies: [
        "Real aircraft turbine background pitch harmonics (matches physics)",
        "True human panic vocal micro-tremors (impossible to fake accurately)",
        "Perfect radio RF intermodulation and atmospheric static distortion specs"
      ],
      logs: [
        "[BOOT] Initializing Aviation RF Audio Analyser...",
        "[INFO] Background engine sound checked: 400Hz turbine hum is authenticated.",
        "[COMP] Vocal stress analysis: Matches biological fight-or-flight heart-frequency metrics.",
        "[SUCCESS] Telemetry record validated as authentic biological pilot transmission."
      ]
    }
  },
  {
    id: "voice-10",
    name: "Text-To-Speech Propaganda Feed",
    type: "voice",
    fileName: "fake_news_disinfo_broadcast.mp3",
    fileSize: "7.1 MB",
    input: "Synthetic news feed disinformation campaign voice file",
    expectedOutput: {
      status: "SYNTHESIZED BROADCAST VOICE DETECTED (PUBLIC ATTACK)",
      score: 30.5,
      sourceModel: "Coqui TTS Open-Source Voice Renderer Core",
      creatorIp: "93.115.95.14 (Hosting Cloud Infrastructure Center)",
      creatorDevice: "Docker container running headless Coqui Python script",
      aiGenerator: "Coqui TTS Engine (Custom Deep Voice Model)",
      firstUploadPlatform: "Telegram Channel (@anonymousintel99 - Audio Post)",
      integrityRating: "Synthesized",
      geoCoordinates: "38.9072° N, 77.0369° W (Washington regional host server)",
      networkProvider: "Amazon Web Services Inc. (us-east-1)",
      anomalies: [
        "Severe phase alignment errors across multi-band audio streams",
        "Linguistic phoneme length bounds perfectly match TTS parameters",
        "Unnatural uniform room resonance across changing vocal inflections"
      ],
      logs: [
        "[BOOT] Launching Propaganda Security Pipeline...",
        "[INFO] Core sound profile analysis complete.",
        "[ALERT] Spectrum features correlate with Coqui pre-trained XTTS models (94.2%).",
        "[SUCCESS] Fake audio commentary marked for safety rating update."
      ]
    }
  },

  // --- VIDEO (10) ---
  {
    id: "video-1",
    name: "Deepfaked War Zone Broadcast",
    type: "video",
    fileName: "military_general_statement_synthetized.mp4",
    fileSize: "28.5 MB",
    input: "https://youtube.com/watch?v=mock_military_synthetic_general_announcement",
    expectedOutput: {
      status: "AI INPAINTING & FRAME MANIPULATION ATTEMPT DETECTED",
      score: 18.2,
      sourceModel: "Runway Gen-3 Alpha / Sora Hybrid Engine",
      creatorIp: "93.115.95.14 (Hosting Cloud Infrastructure)",
      creatorDevice: "Docker Linux Ubuntu 22.04 LTS + headless FFmpeg node",
      aiGenerator: "Runway Gen-3 Alpha (Temporal video generation model)",
      firstUploadPlatform: "TikTok mobile video upload node (Uploader ID: @shadow_intel)",
      integrityRating: "Compromised",
      geoCoordinates: "38.9072° N, 77.0369° W (Washington DC regional servers)",
      networkProvider: "Amazon Web Services Inc. (us-east-1)",
      anomalies: [
        "Frame-to-frame pixel flow variance index anomaly at lapel badges",
        "Lip phonetic sync discrepancy (lip geometry lags sound envelope by 3.4 frames)",
        "Temporal background frame-skipping blending distortions"
      ],
      logs: [
        "[BOOT] Running Chronos temporal continuity analyzer...",
        "[INFO] Framing structure decoded: 472 frames at 29.97 fps.",
        "[WARN] Optical flow field vector discontinuity in lip vicinity at Frame 42.",
        "[ALERT] Inpainting raster artifacts found on chest medals.",
        "[COMP] Generating biometric mouth-coherence score... Fail.",
        "[SUCCESS] 81.8% temporal frame sequence discrepancy resolved."
      ]
    }
  },
  {
    id: "video-2",
    name: "Authentic Live CCTV Capture",
    type: "video",
    fileName: "bank_corridor_cctv_genuine.mp4",
    fileSize: "14.1 MB",
    input: "https://cdn.aiverse.secure/ingest/video/cctv_bank_hall_unaltered_982.mp4",
    expectedOutput: {
      status: "AUTHENTIC VIDEO DIRECT FEED - SECURE HARDWARE SOURCE",
      score: 96.5,
      sourceModel: "Axis Q1615 Mk II Hardware Video Authenticator",
      creatorIp: "84.22.129.5 (Security Infrastructure Vault IP)",
      creatorDevice: "Axis Q1615 Mk II Network CCTV Hardware Core",
      aiGenerator: "None - Fully Organic Optical CMOS Lens Capture",
      firstUploadPlatform: "Security Network Tunnel Ingress Storage Core",
      integrityRating: "High",
      geoCoordinates: "48.8566° N, 2.3522° E (Paris Central Bank Vault)",
      networkProvider: "Orange Business Services France",
      anomalies: [
        "Temporal pixel noise matches real physical camera sensor heating profile",
        "Consistent shadow vectors matching real-world office light placement",
        "Perfect lens optic barrel distortion curve confirmed (unaltered Exif specs)"
      ],
      logs: [
        "[BOOT] Interfacing Security Video Authenticator Loop...",
        "[INFO] Stream Format: H.264 at 30 fps. Embedded hardware stamp verified.",
        "[COMP] Verifying Temporal Frame Parity... OK.",
        "[SUCCESS] Zero traces of GAN frame replacements, inpainting, or swaps."
      ]
    }
  },
  {
    id: "video-3",
    name: "Generative Sora Marketing Promo",
    type: "video",
    fileName: "future_city_promotional_clip.mp4",
    fileSize: "45.2 MB",
    input: "https://cdn.aiverse.secure/ingest/video/future_tokyo_marketing_sora.mp4",
    expectedOutput: {
      status: "AI GENERATED VIDEO IDENTIFIED (SORA EMULATION)",
      score: 28.4,
      sourceModel: "OpenAI Sora Temporal Renderer (Model v1)",
      creatorIp: "103.220.10.45 (Residential IP Provider Router)",
      creatorDevice: "Host VM running headless PyTorch instance on NVIDIA H100",
      aiGenerator: "OpenAI Sora Temporal Video Diffusion Engine",
      firstUploadPlatform: "Vimeo High-Definition Creator Upload Portal Ingest",
      integrityRating: "Synthesized",
      geoCoordinates: "37.7510° N, 122.4101° W (San Francisco Tech Hub)",
      networkProvider: "Reliance Jio Infocomm Ltd Mumbai",
      anomalies: [
        "Imminent physical clipping of pedestrian legs into solid sidewalk grids",
        "Flickering camera light direction change across frame sequences",
        "Impossible fluid dynamics of rain puddles at Frame 198"
      ],
      logs: [
        "[BOOT] Running Kinematic Vector Analyzer...",
        "[INFO] Total 600 frames checked. Searching for physical clipping anomalies.",
        "[ALERT] Pedestrian legs merged with pavement boundary at frame index 120.",
        "[WARN] Specular reflections on buildings shift without corresponding sun movement.",
        "[SUCCESS] Frame sequences match Sora latent video space signature."
      ]
    }
  },
  {
    id: "video-4",
    name: "Sora-Generated Nature Sequence",
    type: "video",
    fileName: "mammoth_snowy_nature_sora.mp4",
    fileSize: "38.9 MB",
    input: "https://cdn.aiverse.secure/ingest/video/sora_mammoth_walking_sequence.mp4",
    expectedOutput: {
      status: "SYNTHESIZED NARRATIVE VIDEO (HIGH SYSTEM DETECTION)",
      score: 31.0,
      sourceModel: "OpenAI Sora Generative AI Video Diffusion Module",
      creatorIp: "93.115.95.14 (Hosting Cloud Infrastructure)",
      creatorDevice: "NVIDIA SuperGPU Clusters cluster-12 (us-west-2)",
      aiGenerator: "OpenAI Sora AI-Video Model (v1.0)",
      firstUploadPlatform: "YouTube upload API engine (Category: Digital Art)",
      integrityRating: "Synthesized",
      geoCoordinates: "37.7749° N, 122.4194° W (San Francisco Cloud Worker)",
      networkProvider: "Amazon Web Services Inc. (us-east-1)",
      anomalies: [
        "Unnatural duplication of mammoth legs at frame boundaries",
        "Snow particles disappear in mid-air instead of contacting body fur",
        "Temporal resolution fluctuation on the trees in deep background"
      ],
      logs: [
        "[BOOT] Running Chronos temporal continuity analyzer...",
        "[ALERT] Frame density mismatch found during particle tracking scan.",
        "[WARN] Fur textures lack consistent organic light refraction indices.",
        "[SUCCESS] Kinetic flow fields verify synthetic frame compilation."
      ]
    }
  },
  {
    id: "video-5",
    name: "AI Face Edited Anchor Broadcast",
    type: "video",
    fileName: "fake_news_anchor_manipulation.mp4",
    fileSize: "16.4 MB",
    input: "Falsified news broadcast anchor face swap video feed",
    expectedOutput: {
      status: "AI FACE SWAPPED BROADCAST - CRITICAL WARNING",
      score: 14.9,
      sourceModel: "DeepFaceLab Core v2 + Topaz Video Enhancer",
      creatorIp: "185.190.140.23 (Associated with Tor Exit Node)",
      creatorDevice: "GPU Cloud Node - Linux Workstation 8 Cores",
      aiGenerator: "DeepFaceLab v2 Professional Swap Engine",
      firstUploadPlatform: "Telegram Channel Media Upload Gateway Proxy",
      integrityRating: "Compromised",
      geoCoordinates: "47.3769° N, 8.5417° E (Zurich proxy server signature)",
      networkProvider: "Swisscom Hostings & Public Gateways AG",
      anomalies: [
        "Biometric facial landmark divergence during high-angle head turns",
        "Temporal fluttering lines along collar margins",
        "Double eyeball reflection signature (cloned original eyes underneath)"
      ],
      logs: [
        "[BOOT] Launching DeepFaceLab Boundary Audit...",
        "[INFO] Frame rate validated as 24.00 fps. Total 320 frames analyzed.",
        "[ALERT] Double pupil specular highlights found at Frame 85.",
        "[ALERT] Face alignment mesh error: 12.8 pixels drift from underlying target head.",
        "[SUCCESS] Identity forgery flag deployed successfully."
      ]
    }
  },
  {
    id: "video-6",
    name: "Authentic Police Bodycam Stream",
    type: "video",
    fileName: "patrol_bodycam_flight_certified.mp4",
    fileSize: "19.5 MB",
    input: "Unaltered police bodycam continuous secure transport stream",
    expectedOutput: {
      status: "AUTHENTIC INCIDENT FILE - ZERO MODIFICATION COMMITTED",
      score: 98.2,
      sourceModel: "Axon Body 3 Encryption Secure Camera Host",
      creatorIp: "193.138.2.14 (Government Secure Network Port)",
      creatorDevice: "Axon Body 3 Military Grade Video Capture System",
      aiGenerator: "None - Organic Optical Ingress Sensor Module",
      firstUploadPlatform: "Evidence.com Secure Government Cloud Storage",
      integrityRating: "High",
      geoCoordinates: "38.9072° N, 77.0369° W (Washington Secure Intranet)",
      networkProvider: "Federal Secure Ingress Networks",
      anomalies: [
        "Continuous cryptographic frame signature matches physical hardware key",
        "Perfect optical flow conforming to physical camera movement sensor data",
        "True CMOS shutter rolling distortion matching Axon sensor specifications"
      ],
      logs: [
        "[BOOT] Verifying Axon Cryptographic Lens Payload...",
        "[INFO] Video signature matches validated federal agency public key.",
        "[COMP] Scanning for pixel anomalies or temporal frame cuts... 0 found.",
        "[SUCCESS] Dynamic metadata hash verified: Incident record is 100% genuine."
      ]
    }
  },
  {
    id: "video-7",
    name: "Temporal Frame Inpainting Leak",
    type: "video",
    fileName: "diplomatic_meeting_erased_briefcase.mp4",
    fileSize: "22.1 MB",
    input: "Tampered diplomatic recording. Briefcase erased from background table.",
    expectedOutput: {
      status: "AI TEMPORAL INPAINTING DETECTED (EXCLUDED CONTENT)",
      score: 20.4,
      sourceModel: "Runway Gen-2 Temporal Brush & Inpainting Core",
      creatorIp: "109.112.43.190 (Anonymized VPN Tunnel)",
      creatorDevice: "Ubuntu Server headless Docker container (FFmpeg v6.1)",
      aiGenerator: "Runway Gen-2 (Temporal Brush Inpainting Model)",
      firstUploadPlatform: "Direct HTTP File upload to SaaS compliance validator",
      integrityRating: "Compromised",
      geoCoordinates: "47.3769° N, 8.5417° E (Zurich network signature)",
      networkProvider: "Hostpoint AG Swiss Cloud Services",
      anomalies: [
        "Local temporal pixel drift where object was removed (Frame 40-120)",
        "Inconsistent wood grain alignment on table surface",
        "Discontinuous camera shadow tracking behind the diplomat"
      ],
      logs: [
        "[BOOT] Initializing Kinematic Object Removal auditor...",
        "[ALERT] Detected high-frequency static noise footprint on wood texture at Frame 42.",
        "[ALERT] Optical flow field vector discontinuity in tabletop region.",
        "[SUCCESS] Unveiled inpainting mask area. Authenticator rating updated."
      ]
    }
  },
  {
    id: "video-8",
    name: "Synthesized Executive Interview",
    type: "video",
    fileName: "cfo_quarterly_statement_fake.mp4",
    fileSize: "12.8 MB",
    input: "Quarterly statement fake presentation video files",
    expectedOutput: {
      status: "CRITICAL EXECUTIVE IDENTIFICATION THEFT - SYNTHESIA AVATAR",
      score: 9.3,
      sourceModel: "Synthesia Studio (Enterprise Actor Profile)",
      creatorIp: "45.138.16.220 (NordVPN Node 112 Cloud Ingress)",
      creatorDevice: "Docker running automated headless headless browser engine",
      aiGenerator: "Synthesia AI video avatar engine (Model Enterprise)",
      firstUploadPlatform: "Internal Corporate Slack share network attachment",
      integrityRating: "Malicious",
      geoCoordinates: "55.7558° N, 37.6173° E (Moscow VPN Entrance)",
      networkProvider: "Rostelecom Gateways (Anonymized VPN Client)",
      anomalies: [
        "Unnatural vertical body stillness (head shifts but shoulders stay 100% frozen)",
        "Perfect 100% centered eye contact throughout the 4-minute timeline",
        "Synthetic mouth rendering bounds containing razor sharp edge blending"
      ],
      logs: [
        "[BOOT] Running CEO Identity Theft Check Loop...",
        "[INFO] Scanning actor shoulder movement vectors.",
        "[ALERT] Shoulder movement is under 0.1% normal deviation (Synthesia profile match).",
        "[ALERT] Mouth phonetic synchronization score: Fail (synthetic speech model trace).",
        "[SUCCESS] Executive security threat identified. Inbound video locked."
      ]
    }
  },
  {
    id: "video-9",
    name: "Authentic Space Agency Launch Tape",
    type: "video",
    fileName: "orion_launch_stage_genuine.mp4",
    fileSize: "54.2 MB",
    input: "Unaltered Space Agency high-definition heavy booster launch recording",
    expectedOutput: {
      status: "AUTHENTIC ROCKET TELEMETRY RECORDING - MULTI-SENSORY CONFIRMED",
      score: 97.9,
      sourceModel: "RED V-Raptor 8K Hardware Camera Ingress Engine",
      creatorIp: "142.250.74.46 (NASA KSC Network Terminal)",
      creatorDevice: "RED V-Raptor 8K Broadcast Camera Digital Core",
      aiGenerator: "None - Biological Optical Capture System Core",
      firstUploadPlatform: "NASA Kennedy Space Center CDN Media Pool Ingest",
      integrityRating: "High",
      geoCoordinates: "28.5721° N, 80.6490° W (Cape Canaveral Ingress)",
      networkProvider: "Federal Science Networks US (KSC Pool)",
      anomalies: [
        "Real thermal camera sensor heat expansion noise (matches real booster plumes)",
        "Flawless physics vector modeling of exhaust gas dispersals in wind bands",
        "Presence of natural 8K lens aberrations and dust highlights (100% genuine)"
      ],
      logs: [
        "[BOOT] Loading Space Agency scientific video payload...",
        "[INFO] Validating frame-by-frame compression integrity indexes... Perfect.",
        "[COMP] Plume exhaust gas mechanics conform perfectly to real-world aerodynamics.",
        "[SUCCESS] Optical recording is completely organic. Authenticated successfully."
      ]
    }
  },
  {
    id: "video-10",
    name: "Runway Gen-3 Adversarial Short",
    type: "video",
    fileName: "adversarial_scenery_short.mp4",
    fileSize: "18.3 MB",
    input: "AI video with adversarial noise injection to prevent forensic parsing",
    expectedOutput: {
      status: "ADVERSARIAL AI MANIPULATION TRIGGER UNCOVERED",
      score: 24.6,
      sourceModel: "Runway Gen-3 Alpha + Noise Patch Injector",
      creatorIp: "93.115.95.14 (Hosting Cloud Infrastructure Portal)",
      creatorDevice: "Linux workstation with dual NVIDIA A100 GPUs",
      aiGenerator: "Runway Gen-3 Alpha + Custom Adversarial Python Core",
      firstUploadPlatform: "TikTok Mobile client post upload hook trigger portal",
      integrityRating: "Synthesized",
      geoCoordinates: "38.9072° N, 77.0369° W (Washington Cloud DC)",
      networkProvider: "Amazon Web Services Inc. (us-east-1)",
      anomalies: [
        "Slight grid pattern fluctuations across sequential sky frames",
        "Adversarial perturbations attempting to mislead camera sensor model classification",
        "Sudden spatial continuity collapses in edge boundaries"
      ],
      logs: [
        "[BOOT] Launching Adversarial Video Scanner Core...",
        "[EVAL] Frame pixel matrices analyzed. Scanning frequency parameters.",
        "[ALERT] Found hidden noise patterns designed to trigger false AI detection bypasses.",
        "[SUCCESS] Adversarial layer stripped. Correct generative model flagged: Runway Gen-3."
      ]
    }
  },

  // --- EMAILS (10) ---
  {
    id: "email-1",
    name: "AI Cognitive Phishing Compound",
    type: "email",
    fileName: "corporate_emergency_governance.eml",
    fileSize: "12 KB",
    input: "Subject: IMMEDIATE ACTION REQUIRED: Critical system updates across standard secure tunnels\n\nDear User,\n\nWe have identified a security breach within our primary network architecture. You are requested to verify your security credentials immediately through the following secure loop tunnels...\n\nFailure to coordinate within 4 hours will result in enterprise port lock.",
    expectedOutput: {
      status: "AI COGNITIVE INFLUENCE / ADVERSARIAL PHISHING ATTEMPT",
      score: 21.0,
      sourceModel: "PhishGPT-4 Premium Targeted LLM Generator",
      creatorIp: "103.220.10.45 (Residential Broadband Signature)",
      creatorDevice: "Unidentified Linux Daemon Script Host",
      aiGenerator: "PhishGPT-4 targeted LLM agent with cognitive templates",
      firstUploadPlatform: "Microsoft Outlook SMTP Mail Transfer Agent App-Portal",
      integrityRating: "Malicious",
      geoCoordinates: "19.0760° N, 72.8777° E (Mumbai South proxy Node)",
      networkProvider: "Reliance Jio Infocomm Ltd Mumbai",
      anomalies: [
        "Syntactically perfect grammar matching AI phishing vectors (99.1%)",
        "Adversarial persuasion framework containing urgent cognitive triggers",
        "Subject-matter authority simulation mimicking standard enterprise IT alerts"
      ],
      logs: [
        "[BOOT] Launching NLP Sentiment & Semantics Auditor...",
        "[INFO] Parser analyzed 84 textual words. Cognitive weight calculation active.",
        "[ALERT] Urgency density vector is extremely high: 88.2 anomaly factor.",
        "[WARN] Syntax entropy score matches generative large language model presets.",
        "[ALERT] Suspicious trigger terms spotted: 'IMMEDIATE ACTION', 'credential lock'."
      ]
    }
  },
  {
    id: "email-2",
    name: "Authentic Server Health Report",
    type: "email",
    fileName: "monitoring_aws_alert_genuine.eml",
    fileSize: "45 KB",
    input: "Subject: [INFO] AWS SystemManager Alert: Memory consumption at 12.4% capacity\n\nStandard automated notification from AWS host monitor daemon id-92a188bc.\nAll secondary services operating within healthy guidelines.\nNo manual operator actions required.",
    expectedOutput: {
      status: "AUTHENTIC AUTOMATED MACHINE REPORT (VERIFIED SENDER)",
      score: 99.4,
      sourceModel: "AWS SystemManager Watchdog Daemon Agent",
      creatorIp: "84.22.129.5 (Verified Secure Cloud VPC Lease)",
      creatorDevice: "Amazon EC2 Monitoring Virtual Host Host-338294",
      aiGenerator: "None - Secure Programmatic Server Alert Core",
      firstUploadPlatform: "Amazon SES Outbound Trusted Mail Transfer Agent",
      integrityRating: "High",
      geoCoordinates: "48.8566° N, 2.3522° E (Paris Regional AWS Host)",
      networkProvider: "Amazon Web Services EMEA SARL",
      anomalies: [
        "Absolute 100% matching SPF, DKIM, and DMARC secure cryptographic hashes",
        "Perfect robotic programmatically formatted syntax structure (0% AI prompt signature)",
        "Zero urgency or artificial persuasive psychology vectors of human phishing"
      ],
      logs: [
        "[BOOT] Verifying SMTP TLS Envelope Cryptography...",
        "[INFO] SPF check: PASS. DKIM check: PASS. DMARC check: PASS.",
        "[COMP] Semantic analysis matches normal programmatic reporting logs perfectly.",
        "[SUCCESS] Audit completed: 100% authentic system telemetry notice."
      ]
    }
  },
  {
    id: "email-3",
    name: "Spear-Phishing Ingress Exploit",
    type: "email",
    fileName: "finance_payroll_bonus_leak.eml",
    fileSize: "18 KB",
    input: "Subject: CONFIDENTIAL: Mid-Year Pay Adjustment & Performance Review Matrix\n\nDear Corporate Partner,\n\nI am writing to inform you that our chief directory has authorized a mid-year adjustments pool for your business department. Please review the attached PDF matrix file immediately with your credentials to process payroll credits.",
    expectedOutput: {
      status: "SPEAR PHISHING ATTACK DETECTED (WORM-GPT PATTERN)",
      score: 11.5,
      sourceModel: "WormGPT Targeted Social Engineering Engine",
      creatorIp: "198.51.100.41 (Tor Route Proxy Portal)",
      creatorDevice: "Kali Linux Forensic VM + automated email distribution python scripts",
      aiGenerator: "WormGPT / DarkGPT Malicious Hacker LLM Engine",
      firstUploadPlatform: "Corporate Gateway Post-Postfix SMTP Spam filter trap",
      integrityRating: "Malicious",
      geoCoordinates: "52.5200° N, 13.4050° E (Berlin network signature)",
      networkProvider: "Colocation Berlin AG Hostings",
      anomalies: [
        "Hidden zero-width spaces in hyperlinks attempting to bypass anti-virus filters",
        "Highly sophisticated peer persuasion prompts tailored to employee greed",
        "Unauthenticated email server header masquerading as internal corporate CEO"
      ],
      logs: [
        "[BOOT] Running Advanced Mail Inbound Trap scanner...",
        "[ALERT] DKIM/DMARC alignment failed (Sender claim internal but IP is not).",
        "[ALERT] AI NLP Parser matches malicious social engineering payload templates (99.2%).",
        "[SUCCESS] Malicious payload quarantined before user mailbox ingress."
      ]
    }
  },
  {
    id: "email-4",
    name: "Authentic Legal Compliance Notice",
    type: "email",
    fileName: "corporate_legal_compliance_disclosure.eml",
    fileSize: "16 KB",
    input: "Subject: NOTICE: Cryptographic Key Agreement & Corporate Disclosure Agreement v3.4\n\nThis is a formal electronic notification from the corporate compliance department. Please find the DocuSign OAuth signed corporate compliance record loaded on our verified domain.\n\nSecure Signature: 9ab81c7e912fbbd8291f...",
    expectedOutput: {
      status: "AUTHENTIC CORPORATE COMMUNICATIONS - VERIFIED SIGNATURE",
      score: 97.1,
      sourceModel: "Corporate Legal Counsel OAuth Portal Ingest",
      creatorIp: "84.22.129.5 (Verified Secure Corporate Lease)",
      creatorDevice: "DocuSign Secure Electronic Document Signing Server Core",
      aiGenerator: "None - Human Signed Corporate Document System",
      firstUploadPlatform: "Microsoft Outlook Exchange SMTP Internal Mail Server",
      integrityRating: "High",
      geoCoordinates: "48.8566° N, 2.3522° E (Paris Head Legal Suite)",
      networkProvider: "Orange Business Services France",
      anomalies: [
        "DKIM authentic signature matches authorized DocuSign SMTP relays perfectly",
        "Zero manipulative linguistic urgency blocks found",
        "Authentic tracking headers aligned from origin to routing nodes"
      ],
      logs: [
        "[BOOT] Splitting EML envelope parameters...",
        "[INFO] Validating cryptographically signed DocuSign envelope hash... PASS.",
        "[INFO] Vocabulary correlates perfectly with professional lawyers standard dictionaries.",
        "[SUCCESS] Legal communication verified safe to open."
      ]
    }
  },
  {
    id: "email-5",
    name: "AI-Generated Ransomware Warning",
    type: "email",
    fileName: "cyber_breach_ransom_demands.eml",
    fileSize: "22 KB",
    input: "Subject: SECURITY BREACH WARNING: Your local data files are encrypted with secure algorithms\n\nAttention Board of Directors,\n\nWe have completed a parallel extraction of all your secret internal source codes and employee identity details. You must secure a payment of 14 Bitcoin within 48 hours to lock down exposure.",
    expectedOutput: {
      status: "CRITICAL COGNITIVE RANSOMWARE THREAT FLAG ACTIVE",
      score: 8.5,
      sourceModel: "DarkBERT Automated Infiltration Social Engine",
      creatorIp: "45.138.16.220 (IP spoofing active - VPN Router TLS)",
      creatorDevice: "Unidentified automated dark web attack workspace",
      aiGenerator: "DarkBERT (Cybercriminal Specialized LLM API)",
      firstUploadPlatform: "SMTP public proxy relay node server 993",
      integrityRating: "Malicious",
      geoCoordinates: "55.7558° N, 37.6173° E (Moscow regional exit node)",
      networkProvider: "Rostelecom Gateways (Anonymized VPN client)",
      anomalies: [
        "Unnatural semantic consistency mirroring automated ransom drafts",
        "Urgent emotional blackmail hooks matching criminal behavioral profiles",
        "DKIM signature verification totally failed (IP spoofing flags active)"
      ],
      logs: [
        "[BOOT] Running High Severity Mail Incident audit...",
        "[ALERT] Critical urgency levels detected (Score 98.4%).",
        "[ALERT] AI NLP parser marks letter structure as DarkBERT ransomware draft (99.7%).",
        "[SUCCESS] Security response system warned. Trace route captured for emergency audit."
      ]
    }
  },
  {
    id: "email-6",
    name: "PhishGPT CEO Impersonation Trap",
    type: "email",
    fileName: "wire_transfer_demand_ceo.eml",
    fileSize: "14 KB",
    input: "Subject: URGENT WIRE DETAILS NEEDED: Swiss Vendor Acquisition Settlement\n\nDear Finance Director,\n\nI am currently in an executive meeting in London with our legal cabinet, and we are closing the Swiss acquisition immediately. Please wire cash to the following bank routing numbers details before the close of trade today.",
    expectedOutput: {
      status: "CEO IMPERSONATION FRAUD DETECTED (HIGH CONFIDENCE)",
      score: 13.1,
      sourceModel: "PhishGPT-4 Premium Targeted LLM Generator",
      creatorIp: "103.220.10.45 (Residential Broadband Signature)",
      creatorDevice: "Automated spear-phishing distribution script host",
      aiGenerator: "PhishGPT-4 custom fine-tuned corporate phishing simulator",
      firstUploadPlatform: "Exchange Server SMTP Ingress Trap Folder",
      integrityRating: "Malicious",
      geoCoordinates: "19.0760° N, 72.8777° E (Mumbai South proxy Node)",
      networkProvider: "Reliance Jio Infocomm Ltd Mumbai",
      anomalies: [
        "Email headers claim to be CEO but SPF/DMARC check failed completely",
        "Highly personalized triggers using authentic CFO and Director names to build false trust",
        "Cognitive pressure tactics forcing fast action without out-of-band phone validation"
      ],
      logs: [
        "[BOOT] Analyzing Mail Header Authentication Path...",
        "[ALERT] SPF: FAIL. DMARC: FAIL. SMTP core IP does not match CEO corporate device IP.",
        "[ALERT] Cognitive prompt check: CEO impersonation profile confirmed (99.3%).",
        "[SUCCESS] Blocked fraudulent financial transfer attempt."
      ]
    }
  },
  {
    id: "email-7",
    name: "Authentic Multi-Factor Notification",
    type: "email",
    fileName: "okta_authentication_approved.eml",
    fileSize: "8 KB",
    input: "Subject: Okta Sign-In Approved: Zurich AWS Administration Portal\n\nYour Okta multi-factor authorization credential has been confirmed for device ip=84.22.129.5 at time 2026-06-06T17:42:01. If this wasn't you, lock credentials instantly.",
    expectedOutput: {
      status: "AUTHENTIC MULTI-FACTOR TRANSACTION (HIGHEST TRUST)",
      score: 98.8,
      sourceModel: "Okta Identity Cloud Secure SMTP Ingress",
      creatorIp: "84.22.129.5 (Verified Corporate Lease)",
      creatorDevice: "Okta Identity Engine (Zurich Core Server Hub)",
      aiGenerator: "None - Secure Automated Cryptographic Identity System",
      firstUploadPlatform: "Okta Outbound Authorized Mail Gateway (SES Verified)",
      integrityRating: "High",
      geoCoordinates: "47.3769° N, 8.5417° E (Zurich Headquarters Office)",
      networkProvider: "Swisscom Corporate Gateways AG",
      anomalies: [
        "Dynamic JWT hash in mail header matches authenticated active Okta token",
        "Perfect programmatic email structure aligning with corporate security SSO standards",
        "Verified secure telecom origin routing path directly from Okta domain registry"
      ],
      logs: [
        "[BOOT] Validating Okta Security JWT Anchor...",
        "[INFO] SPF/DMARC checks on okta.com: PASS. Cryptographic envelope verified.",
        "[COMP] User coordinates match current physical geo-location data of employee.",
        "[SUCCESS] Authentication approved: Token is valid and trusted."
      ]
    }
  },
  {
    id: "email-8",
    name: "Adversarial Marketing Cognitive Push",
    type: "email",
    fileName: "promo_urgency_synthetic.eml",
    fileSize: "11 KB",
    input: "Subject: LAST CHANCE: Claims on the Swiss Trade Portfolio are expiring in 45 minutes!\n\nInvest immediately to secure your performance credits before the market shuts down permanently. You have been selected among 10 exclusive partners to unlock high leverage.",
    expectedOutput: {
      status: "ADVERSARIAL COGNITIVE HOOK - MANIPULATION ATTEMPT",
      score: 23.4,
      sourceModel: "FraudGPT Cognitive Urgent Text Generator",
      creatorIp: "93.115.95.14 (Hosting Cloud Infrastructure)",
      creatorDevice: "Unidentified automated headless marketing script runner",
      aiGenerator: "FraudGPT (Malicious AI Marketing Template v1)",
      firstUploadPlatform: "Consumer Bulk Bulk SMTP Server Mailer Port",
      integrityRating: "Compromised",
      geoCoordinates: "38.9072° N, 77.0369° W (Washington regional server)",
      networkProvider: "Amazon Web Services Inc. (us-east-1)",
      anomalies: [
        "Extremely high urgency metrics intended to override rational user logic (97.8%)",
        "Artificial scarcity pattern (selected partner + 45-minute limit)",
        "DMARC DNS signature was bypassed using cheap temporary domain forwarding"
      ],
      logs: [
        "[BOOT] Running NLP Urgency Scanner...",
        "[ALERT] High stress lexicon index: 94.6 score detected.",
        "[ALERT] Text matches known predatory AI financial email models.",
        "[SUCCESS] Warning flags added to subject line: [AI DISINFORMATION WARN]."
      ]
    }
  },
  {
    id: "email-9",
    name: "Authentic GitHub Security Alert",
    type: "email",
    fileName: "github_dependabot_security_alert.eml",
    fileSize: "15 KB",
    input: "Subject: [GitHub] Security Alert: Vulnerability found in axios package version <1.6.0\n\nYour repository 'enterprise-vault-3' is using an insecure version of the 'axios' package. We recommend updating axios to version 1.6.0 immediately to prevent remote code injection attacks.",
    expectedOutput: {
      status: "AUTHENTIC SECURITY ADVISORY (GITHUB CRYPTO VERIFIED)",
      score: 96.0,
      sourceModel: "GitHub Dependabot Automated OAuth verification",
      creatorIp: "140.82.112.4 (Verified GitHub Enterprise Mail Server)",
      creatorDevice: "GitHub Dependabot Advisory Engine Core",
      aiGenerator: "None - Secure Programmatic Vulnerability Database Notice",
      firstUploadPlatform: "GitHub SMTP Server (github.com Outbound Gateway)",
      integrityRating: "High",
      geoCoordinates: "37.7749° N, 122.4194° W (San Francisco Headquarters)",
      networkProvider: "GitHub Inc. Corporate Core Network Infrastructure",
      anomalies: [
        "Cryptographic DKIM key signature perfectly matches GitHub's verified key registry",
        "Accurate CVE reference numbers matched to official NIST vulnerability database",
        "Zero generic phishing vectors or suspicious credential capture links"
      ],
      logs: [
        "[BOOT] Ingesting GitHub security EML scan...",
        "[INFO] Parsing CVE ID: CVE-2023-45857 matched to verified database records.",
        "[COMP] SPF/DKIM verification: MATCHES GITHUB ORIGIN (PASS).",
        "[SUCCESS] Authenticity certified: Advisory is safe, verified and accurate."
      ]
    }
  },
  {
    id: "email-10",
    name: "Synthesized Internal HR Policy",
    type: "email",
    fileName: "internal_hr_policy_update.eml",
    fileSize: "9 KB",
    input: "Subject: IMPORTANT: Hybrid Work Policy updates & Remote Ingress requirements\n\nDear Staff,\n\nTo align our team structures effectively, we are excited to release the new hybrid work schedules guidelines. Please review the attached framework to register your corporate working schedule for the upcoming quarter.",
    expectedOutput: {
      status: "SYNTHESIZED POLICY WRITING DETECTED (CLAUDE-3.5-SONNET)",
      score: 35.8,
      sourceModel: "Claude 3.5 Sonnet Corporate HR Copy Generator",
      creatorIp: "91.240.230.12 (Decentralized Gateway Server IP)",
      creatorDevice: "MacBook client running standard Chrome Browser instance",
      aiGenerator: "Claude 3.5 Sonnet LLM Assistant with corporate writing style",
      firstUploadPlatform: "Google Workspace Gmail Outbound Mail Server Integration",
      integrityRating: "Synthesized",
      geoCoordinates: "47.3769° N, 8.5417° E (Zurich network proxy)",
      networkProvider: "Swisscom Hostings & Public Gateways AG",
      anomalies: [
        "Vocabulary frequency aligns 99.1% with AI style benchmarks (words like 'foster', 'streamline', 'synergy')",
        "Ultra-uniform sentence length distribution (lack of human writing variance style)",
        "Standard ChatGPT/Claude corporate template phrasing found in header blocks"
      ],
      logs: [
        "[BOOT] Initializing Text Stylometry Auditor Process...",
        "[INFO] Lexicon complexity analyzed: 88.5 score.",
        "[WARN] Sub-optimal stylometry entropy index (evidence of generative LLMs).",
        "[SUCCESS] Flagged AI assisted messaging profile (Claude-3.5-Sonnet pattern matched)."
      ]
    }
  }
];

export default function TrustScannerWorkspace({ onClose }: { onClose: () => void }) {
  const { language, t } = useLanguage();
  const [selectedPreset, setSelectedPreset] = useState<ScanSample>(PRESET_SAMPLES[0]);
  const [fileType, setFileType] = useState<"image" | "voice" | "video" | "email">("image");
  const [textInput, setTextInput] = useState(PRESET_SAMPLES[0].input);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<"idle" | "evaluating" | "calculating" | "success">("idle");
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<"visualizer" | "parameters" | "trace">("visualizer");
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  // Tunable configuration parameters state
  const [intensityMode, setIntensityMode] = useState<"standard" | "level5" | "quantum">("level5");
  const [threshold, setThreshold] = useState(75);
  const [enableFacial, setEnableFacial] = useState(true);
  const [enableAcoustic, setEnableAcoustic] = useState(true);
  const [enableLogs, setEnableLogs] = useState(true);

  // Spectrogram dynamic oscillation simulation state
  const [volatility, setVolatility] = useState<number[]>(Array(24).fill(15));
  const [isPlayingOscillator, setIsPlayingOscillator] = useState(true);

  // Telemetry stream logs State
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Dynamic canvas oscillation simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingOscillator) {
      timer = setInterval(() => {
        setVolatility((prev) => 
          prev.map((val) => {
            const base = isScanning ? 75 : 20; 
            const delta = Math.floor(Math.random() * 45) - 20;
            return Math.min(Math.max(base + delta, 5), 98);
          })
        );
      }, 110);
    }
    return () => clearInterval(timer);
  }, [isPlayingOscillator, isScanning]);

  // Terminal autoscroll
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLogs]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Preset selection
  const handleSelectPreset = (sample: ScanSample) => {
    setSelectedPreset(sample);
    setFileType(sample.type);
    setTextInput(sample.input);
    setScanStep("idle");
    setProgress(0);
    setTerminalLogs([]);
  };

  // Handle actual custom files dynamic ingestion & trace generation
  const handleCustomFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    let detectedType: "image" | "voice" | "video" | "email" = "image";
    if (file.type.startsWith("audio/") || file.name.endsWith(".wav") || file.name.endsWith(".mp3") || file.name.endsWith(".m4a")) {
      detectedType = "voice";
    } else if (file.type.startsWith("video/") || file.name.endsWith(".mp4") || file.name.endsWith(".mov") || file.name.endsWith(".avi")) {
      detectedType = "video";
    } else if (file.name.endsWith(".eml") || file.name.endsWith(".txt") || file.type.startsWith("text/")) {
      detectedType = "email";
    }

    const sizeStr = (file.size / (1024 * 1024)).toFixed(2) + " MB";
    const dummyIps = [
      "109.112.43.190 (Corporate Lease Node Zurich)",
      "198.51.100.41 (Tor Relay Proxy Server)",
      "91.240.230.12 (Decentralized Gateway Signature)",
      "142.250.74.46 (Dynamic Broadband Client Node)"
    ];
    const dummyDevices = [
      "Apple iPhone 15 Pro Max Mirrorless Capture Sensor",
      "Sony Alpha ILCE-7M4 DSLR System Core (Raw Exif)",
      "Samsung Galaxy S24 Ultra Camera firmware 1.8.4",
      "Virtual NVIDIA H100 GPU Render Workstation Core"
    ];
    const dummyAi = [
      "None - Organic Hardware Capturing (Exif Signature Verified)",
      "DALL-E 3 High Resolution Canvas Composition Engine",
      "Sora Temporal Kinetic Sequence Renderer (Beta V2)",
      "ElevenLabs voice synthesis engine V3 premium model"
    ];
    const dummyPlatforms = [
      "WhatsApp Direct VoIP Transfer File Attachment",
      "TikTok iOS Upload Gateway Portal",
      "Telegram Public Forward Channel (@sourcearchives)",
      "Direct API Secure Port ingestion to AiVerse Zurich Cloud"
    ];

    const randomIdx = Math.floor(Math.random() * 4);
    const score = Math.floor(Math.random() * 95) + 3; // Synthetic score 3% - 98%

    const customSample: ScanSample = {
      id: `custom-${Date.now()}`,
      name: file.name,
      type: detectedType,
      fileName: file.name,
      fileSize: sizeStr,
      input: `Inbound secure stream connector initialized: \nname=${file.name}\ntype=${file.type || "binary/file"}\nsize=${file.size} bytes`,
      expectedOutput: {
        status: score > 50 ? "AUTHENTIC SOURCE COHERENCE CONFIRMED" : "CRITICAL SYNTHETIC IMAGE/DEEPFAKE INTRUSION FLAG",
        score: score,
        sourceModel: score > 50 ? "Verified Hardware Core Sensor" : "Generative Diffusion / WaveNet Hybrid Inpainting Engine",
        creatorIp: dummyIps[randomIdx],
        creatorDevice: score > 50 ? dummyDevices[randomIdx % 3] : dummyDevices[3],
        aiGenerator: score > 50 ? dummyAi[0] : dummyAi[randomIdx % 3 + 1],
        firstUploadPlatform: dummyPlatforms[randomIdx],
        integrityRating: score > 75 ? "High" : score > 50 ? "Compromised" : score > 25 ? "Synthesized" : "Malicious",
        geoCoordinates: `${(40 + Math.random() * 15).toFixed(4)}° N, ${(2 + Math.random() * 50).toFixed(4)}° E`,
        networkProvider: "Localized Ingress Gateways & Sandbox Proxy Pools",
        anomalies: score > 50 ? [
          "Perfect Exif signature parity verified (Sensor metadata present)",
          "Dermal color frequency distribution conforms to physics standards",
          "Optical focus convergence matches background vector timeline"
        ] : [
          "High-frequency synthetic raster pattern in coordinates boundary",
          "Inbound metadata capture timeline lacks standard camera firmware hashes",
          "Sub-harmonic noise continuity deviations spotted in high-contrast shadows"
        ],
        logs: [
          "[BOOT] Activating ingestion pipelines for client upload: " + file.name,
          "[INFO] Running dynamic threat simulation against secure ledger blocks...",
          "[COMP] Cryptographic SHA-256 integrity tag generated.",
          "[WARN] Inspecting temporal noise boundaries with CNN network...",
          `[EVAL] Analysis finalized. Initializing forensic signature score...`
        ]
      }
    };

    setSelectedPreset(customSample);
    setFileType(detectedType);
    setTextInput(customSample.input);
    setScanStep("idle");
    setProgress(0);
    setTerminalLogs([]);
  };

  // Launch simulated advanced analytics
  const startAdvancedScan = () => {
    setIsScanning(true);
    setScanStep("evaluating");
    setProgress(0);
    setTerminalLogs([]);

    const totalLogs = selectedPreset.expectedOutput.logs;
    let logIndex = 0;

    // Simulate progressive telemetry stream logs
    const logInterval = setInterval(() => {
      if (logIndex < totalLogs.length) {
        setTerminalLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${totalLogs[logIndex]}`]);
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 450);

    // Simulate progress speed based on Intensity select
    let speed = 40;
    if (intensityMode === "level5") speed = 65;
    if (intensityMode === "quantum") speed = 100;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 45 && prev < 50) {
          setScanStep("calculating");
        }
        if (prev >= 100) {
          clearInterval(progressInterval);
          setScanStep("success");
          setIsScanning(false);
          // Add core finalized logs
          setTerminalLogs((prevLogs) => [
            ...prevLogs,
            `[${new Date().toLocaleTimeString()}] [SUCCESS] Diagnostic suite finalized successfully.`,
            `[${new Date().toLocaleTimeString()}] [LEDGER] Forensic Certificate Generated. Signed SHA256: 48f9ac12...`
          ]);
          return 100;
        }
        return prev + 2;
      });
    }, speed);
  };

  // Multi-language glossary translation keys lookup (Fallback mechanism for rich translations)
  const getUiLabel = (key: string): string => {
    interface Dictionary {
      [key: string]: { [lang: string]: string };
    }

    const dict: Dictionary = {
      backBtn: { en: "Return to Landing", ml: "മടങ്ങുക", hi: "लैंडिंग पर वापस", ar: "العودة للرئيسية" },
      headerTitle: { en: "AiVerse Advanced Forensic Workspace", ml: "AiVerse അഡ്വാൻസ്ഡ് ഫോറൻസിക് ലബോറട്ടറി", hi: "AiVerse उन्नत फोरेंसिक कार्यक्षेत्र", ar: "مساحة عمل التحليل الجنائي المتقدمة" },
      headerSub: { en: "Multi-Model Parallel Sandbox - Active National Cyber Defense Grade Ingestion", ml: "മൾട്ടി-മോഡൽ പാരലൽ സാൻഡ്ബോക്സ് - സജീവ ദേശീയ സൈബർ സുരക്ഷാ ഗ്രേഡ്", hi: "मल्टी-मॉडल समानांतर सैंडबॉक्स - सक्रिय राष्ट्रीय साइबर सुरक्षा ग्रेड", ar: "بيئة عمل متوازية متعددة النماذج - مستوى الدفاع السيبراني الوطني" },
      ingestPreset: { en: "Select Diagnostic Presets", ml: "പരിശോധനാ മാതൃകകൾ", hi: "नैदानिक प्रिसेट चुनें", ar: "تحديد قوالب التشخيص" },
      parametersTab: { en: "Neural Tuner Parameters", ml: "ട്യൂണർ പാരാമീറ്ററുകൾ", hi: "ट्यूनर पैरामीटर्स", ar: "إعدادات المضبط العصبي" },
      visualizerTab: { en: "SaaS Live Spectrogram", ml: "തത്സമയ സ്പെക്ട്രോഗ്രാം", hi: "लाइव स्पेक्ट्रोग्राम", ar: "المخطط الطيفي المباشر" },
      traceTab: { en: "Origin & Trace", ml: "ഉറവിട കണ്ടെത്തൽ", hi: "उत्पत्ति और निशान", ar: "تتبع الأصل" },
      historyLedger: { en: "System Audit Ledger", ml: "സിസ്റ്റം ഓഡിറ്റ് レഡ്ജർ", hi: "सिस्टम ऑडिट बहीखाता", ar: "سجل تدقيق النظام" },
      intensityLabel: { en: "Forensic Scanning Strength", ml: "സ്കാനിംഗ് തീവ്രത", hi: "फोरेंसिक स्कैनिंग ताकत", ar: "قوة الفحص الجنائي" },
      standardMode: { en: "Standard AI Filter", ml: "സാധാരണ ഫിൽട്ടർ", hi: "मानक फ़िल्टर", ar: "فلتر الذكاء الاصطناعي العادي" },
      lvl5Mode: { en: "NIST Level-5 Audit", ml: "NIST ലെവൽ-5 ഓഡിറ്റ്", hi: "NIST स्तर-5 ऑडिट", ar: "تدقيق NIST للمستوى 5" },
      quantumMode: { en: "Quantum Deep Search", ml: "ക്വാണ്ടം ഡീപ്പ് സെർച്ച്", hi: "क्वांटम खोज", ar: "البحث الكمي العميق" },
      thresholdLabel: { en: "Certainty Alarm Threshold", ml: "സുരക്ഷാ അലാറം പരിധി", hi: "निश्चितता अलार्म सीमा", ar: "عتبة إنذار اليقين" },
      activeMetrics: { en: "Active Specimen Metrics", ml: "മെട്രിക്സ് വിവരങ്ങൾ", hi: "नमूना मेट्रिक्स", ar: "مقاييس العينة النشطة" },
      diagnoseTitle: { en: "Ingest Specimen & Audit Model Coherence", ml: "വിശകലനം ആരംഭിക്കുക", hi: "नमूना ग्रहण और मॉडल ऑडिट", ar: "استيعاب العينة وتدقيق اتساق النموذج" },
      lowRisk: { en: "HIGH TRUST", ml: "ഉയർന്ന വിശ്വാസ്യത", hi: "उच्च विश्वास", ar: "ثقة عالية" },
      highRisk: { en: "SUSPECT / SYNTHETIC", ml: "വ്യാജൻ / സംശയാസ്പദം", hi: "संदिग्ध / कृत्रिम", ar: "مشبوه / اصطناعي" },
      certificateBtn: { en: "Generate Forensic Certificate", ml: "സർട്ടിഫിക്കറ്റ് അച്ചടിക്കുക", hi: "फोरेंसिक प्रमाण पत्र उत्पन्न करें", ar: "توليد شهادة جنائية" },
      verificationHeader: { en: "AIVERSE FORENSIC SECURITY CERTIFICATE", ml: "AIVERSE സുരക്ഷാ സർട്ടിഫിക്കറ്റ്", hi: "AIVERSE फोरेंसिक सुरक्षा प्रमाण पत्र", ar: "AIVERSE شهادة الأمن الجنائي لـ" }
    };

    const currentLang = (language as string) || "en";
    const record = dict[key];
    if (record) {
      return record[currentLang] || record["en"];
    }
    return key;
  };

  const currentThemeColor = selectedPreset.expectedOutput.score > 50 ? "emerald" : "rose";

  return (
    <div id="advanced-scanner-target" className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. Header Area with dynamic controls */}
      <header className="border-b border-slate-800 bg-slate-900/40 backdrop-blur-md px-6 py-4 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition duration-200 border border-slate-800 bg-slate-950 px-3.5 py-2 rounded-full cursor-pointer hover:border-slate-655"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{getUiLabel("backBtn")}</span>
          </button>
          
          <div className="h-6 w-px bg-slate-800 hidden md:block" />
          
          <div>
            <h1 className="text-sm md:text-base font-semibold tracking-tight text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-500 animate-pulse" />
              <span>{getUiLabel("headerTitle")}</span>
              <span className="text-[10px] bg-blue-600 text-white font-mono px-2 py-0.5 rounded-full select-none uppercase font-black tracking-widest hidden lg:inline-block">
                v5.0-STAGE
              </span>
            </h1>
            <p className="text-[10px] md:text-[11px] text-slate-400">
              {getUiLabel("headerSub")}
            </p>
          </div>
        </div>

        {/* Global Mini stats bar */}
        <div className="flex items-center gap-4 text-[11px] font-mono border border-slate-800/80 bg-slate-950 px-4 py-2 rounded-xl text-slate-350">
          <div>
            <span className="text-slate-500">ENGINE STATION:</span> <strong className="text-emerald-500">ONLINE (ZURICH)</strong>
          </div>
          <div className="h-3 w-px bg-slate-800 animate-pulse" />
          <div>
            <span className="text-slate-505">CERTAINTY:</span> <strong className="text-blue-400 font-bold">99.87% NIST</strong>
          </div>
          <div className="h-3 w-px bg-slate-800 hidden sm:block" />
          <button 
            onClick={() => {
              window.dispatchEvent(new CustomEvent("openAdminConsole"));
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 hover:text-white text-white font-sans text-[10px] font-bold rounded-lg transition duration-200 cursor-pointer"
          >
            <Server className="w-3.5 h-3.5 text-indigo-200" />
            <span>Admin Panel</span>
          </button>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full">
        
        {/* LEFT COLUMN: Setup, Ingestion & Tuners (col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Preset list selection */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3.5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-650/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-400" />
                {getUiLabel("ingestPreset")}
              </h2>
              <span className="text-[9px] font-mono text-blue-500 font-bold uppercase py-0.5 px-2 bg-blue-950/80 border border-blue-900/60 rounded">
                SECURE SAMPLES
              </span>
            </div>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
              {PRESET_SAMPLES.filter((sample) => sample.type === fileType).map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectPreset(sample)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${selectedPreset.id === sample.id ? "bg-blue-600 border-blue-500 text-white font-semibold shadow-md" : "bg-slate-950/65 border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-300"}`}
                >
                  <div className="space-y-0.5">
                    <p className="truncate max-w-[200px]">{sample.name}</p>
                    <p className={`text-[9px] font-mono tracking-tight uppercase ${selectedPreset.id === sample.id ? "text-blue-100" : "text-slate-500"}`}>
                      {sample.fileName} • {sample.fileSize}
                    </p>
                  </div>
                  <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-md ${selectedPreset.id === sample.id ? "bg-white/20 text-white" : "bg-slate-900 border border-slate-800 text-slate-400"}`}>
                    {sample.type}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Secure Payload Input Console */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold text-slate-405 uppercase tracking-wide">
                1. PAYLOAD INGESTION TUNELS
              </span>
              <span className="text-[9px] font-mono text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                TUNEL ACTIVE
              </span>
            </div>

            {/* Asset Type switches */}
            <div className="grid grid-cols-4 gap-1 text-[10px] font-semibold text-slate-400 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {(["image", "voice", "video", "email"] as const).map((type) => (
                <button
                  key={type}
                  disabled={isScanning}
                  onClick={() => {
                    const preset = PRESET_SAMPLES.find((p) => p.type === type);
                    if (preset) handleSelectPreset(preset);
                  }}
                  className={`py-1.5 rounded-lg uppercase select-none transition-all cursor-pointer ${fileType === type ? "bg-blue-600 text-white font-bold" : "hover:text-white"}`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <div className="text-xs space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-mono tracking-wider font-bold">Raw Secure Input Endpoints</label>
                <textarea
                  rows={4}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  disabled={isScanning}
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-blue-500 rounded-xl p-3 text-xs font-mono outline-none text-slate-305 leading-relaxed"
                />
              </div>

              {/* Dynamic size detail fields */}
              <div className="grid grid-cols-2 gap-3 text-[10px] font-mono text-slate-450 bg-slate-950 p-3 rounded-xl border border-slate-805">
                <div>
                  <span className="text-slate-500 block">Ingested File size:</span>
                  <strong className="text-slate-300">{selectedPreset.fileSize}</strong>
                </div>
                <div>
                  <span className="text-slate-505 block">SHA256 Anchor:</span>
                  <strong className="text-slate-300 text-[9px] truncate block hover:underline">
                    sha256:d892ba87e0...
                  </strong>
                </div>
              </div>

              {/* Animated Drag simulated dragdrop box */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-slate-800 hover:border-blue-550/60 p-4 rounded-xl text-center bg-slate-950/60 hover:bg-slate-950 transition cursor-pointer select-none group"
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleCustomFileUpload} 
                  className="hidden" 
                  accept="image/*,audio/*,video/*,.eml,.txt,text/plain"
                />
                <Upload className="w-5 h-5 mx-auto text-slate-500 mb-2 group-hover:text-blue-400 group-hover:scale-110 transition duration-300" />
                <p className="text-[10px] font-bold text-slate-300 group-hover:text-white transition">
                  {t.scanModal.dragDrop}
                </p>
                <p className="text-[8.5px] text-slate-500 font-mono mt-0.5">
                  Secure local sandbox. Select images, wav/mp3, avi/mp4, or emails.
                </p>
              </div>

              {scanStep !== "success" && (
                <button
                  onClick={startAdvancedScan}
                  disabled={isScanning}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-950/50 transition duration-200 uppercase font-mono tracking-widest cursor-pointer flex items-center justify-center gap-2"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>PARSING 0x{progress}% COHERENCE</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span>{getUiLabel("diagnoseTitle")}</span>
                    </>
                  )}
                </button>
              )}
              
              {scanStep === "success" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setScanStep("idle");
                      setProgress(0);
                      setTerminalLogs([]);
                    }}
                    className="flex-1 py-2.5 border border-slate-800 rounded-xl text-xs font-mono font-bold hover:bg-slate-800 transition"
                  >
                    Load Next
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold rounded-xl transition"
                  >
                    Exit Workspace
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* CENTER COLUMN: Central visualizer scanning scope & Telemetry Logs (col-span-5) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Interactive Core Scanning Visualizer Frame */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden relative flex flex-col min-h-[460px] shadow-lg">
            
            {/* Top Viewport Header Tab buttons */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-3">
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-black uppercase text-slate-400 tracking-wider">
                <BarChart2 className="w-4 h-4 text-blue-500" />
                <span>Forensic Viewport Suite</span>
              </div>
              <div className="flex gap-1.5 text-[9px] font-mono">
                <button 
                  onClick={() => setActiveTab("visualizer")}
                  className={`px-2.5 py-1 rounded cursor-pointer ${activeTab === "visualizer" ? "bg-slate-800 text-white font-bold border border-slate-700" : "text-slate-500 hover:text-white"}`}
                >
                  {getUiLabel("visualizerTab")}
                </button>
                <button 
                  onClick={() => setActiveTab("parameters")}
                  className={`px-2.5 py-1 rounded cursor-pointer ${activeTab === "parameters" ? "bg-slate-800 text-white font-bold border border-slate-700" : "text-slate-500 hover:text-white"}`}
                >
                  {getUiLabel("parametersTab")}
                </button>
                <button 
                  onClick={() => setActiveTab("trace")}
                  className={`px-2.5 py-1 rounded cursor-pointer ${activeTab === "trace" ? "bg-slate-800 text-white font-bold border border-slate-700" : "text-slate-500 hover:text-white"}`}
                >
                  {getUiLabel("traceTab")}
                </button>
              </div>
            </div>

            {/* TAB CONTENTS */}
            <div className="flex-1 p-5 flex flex-col justify-between z-10 relative">
              
              {activeTab === "visualizer" && (
                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2 relative">
                    <div className="flex justify-between items-center text-[10px] font-mono font-bold uppercase text-slate-500">
                      <span>Spectral Ingestion Scope</span>
                      <span className="text-blue-400 animate-pulse">
                        {isScanning ? "SCOPE ACTIVE // SWEEPING" : "STANDBY"}
                      </span>
                    </div>

                    {/* Image / video scanning simulator */}
                    {(fileType === "image" || fileType === "video") && (
                      <div className="w-full h-44 bg-slate-950 rounded-xl relative border border-slate-850/80 overflow-hidden flex items-center justify-center">
                        {/* Scanning visual laser bar overlay */}
                        {isScanning && (
                          <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: [0, 176, 0] }}
                            transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
                            className="absolute left-0 right-0 h-0.5 bg-blue-500 shadow-lg shadow-blue-500 z-10 pointer-events-none"
                          />
                        )}

                        {/* Grid matrix pattern layer */}
                        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

                        {/* Dynamic Bounding Box Overlay graphics depending on scanned output */}
                        <div className="text-center space-y-2 max-w-sm selection:bg-slate-900 pointer-events-auto">
                          {fileType === "image" ? (
                            <div className="relative border border-slate-800 p-4 rounded-xl bg-slate-900/60 flex flex-col items-center">
                              <Info className="w-5 h-5 text-blue-450 mb-1" />
                              <p className="text-[11px] font-semibold text-slate-300">
                                {selectedPreset.fileName}
                              </p>
                              <p className="text-[9px] font-mono text-slate-500">
                                Matrix: 1042 x 1042 • JPEG pixel coherence mapped
                              </p>
                              
                              {/* Boundary targets overlays */}
                              {isScanning && (
                                <div className="absolute top-2 left-6 border-t-2 border-l-2 border-blue-500 w-4 h-4 animate-pulse" />
                              )}
                              {isScanning ? (
                                <div className="absolute bottom-2 right-6 border-b-2 border-r-2 border-rose-500 w-4 h-4 animate-ping" />
                              ) : scanStep === "success" && selectedPreset.expectedOutput.score < 50 ? (
                                <div className="absolute bottom-2 right-6 border border-rose-500 bg-rose-950/80 text-[8px] text-rose-400 font-mono px-1 py-0.5 rounded font-black uppercase">
                                  GAN boundary anomaly located!
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <div className="relative border border-slate-800 p-4 rounded-xl bg-slate-900/60 flex flex-col items-center">
                              <Play className="w-5 h-5 text-blue-450 mb-1 animate-ping" />
                              <p className="text-[11px] font-semibold text-slate-300">
                                Temporal Sequence Decoder Frame
                              </p>
                              <p className="text-[9px] font-mono text-slate-500">
                                fps: 29.97 • optical flow sequence calculation active
                              </p>
                              
                              {/* Boundary targets overlays */}
                              {isScanning && (
                                <div className="text-[9px] font-mono text-emerald-400 mt-2">
                                  Decoding frames: [ {progress * 2} / 240 ]
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Audio Spectrogram Frequency Oscilloscope bars */}
                    {fileType === "voice" && (
                      <div className="w-full h-44 bg-slate-950 rounded-xl p-4 relative border border-slate-850/80 overflow-hidden flex flex-col justify-end">
                        {/* Soft light grid overlay */}
                        <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
                        
                        <div className="flex items-end justify-between h-30 gap-[3px]">
                          {volatility.map((height, idx) => (
                            <div key={idx} className="flex-1 flex flex-col justify-end h-full">
                              <motion.div
                                animate={{ height: `${height}%` }}
                                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                                className={`w-full rounded-t-sm transition-colors duration-150 ${isScanning ? "bg-red-500 shadow-sm shadow-red-900" : "bg-gradient-to-t from-blue-650 to-cyan-500"}`}
                              />
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center mt-2 pt-1 border-t border-slate-800 text-[8px] font-mono text-slate-500 uppercase">
                          <span>100Hz</span>
                          <span>1kHz (Vocal core)</span>
                          <span>8kHz</span>
                          <span>16kHz (Formant anomalies)</span>
                        </div>
                      </div>
                    )}

                    {/* Email plaintext semantic inspect */}
                    {fileType === "email" && (
                      <div className="w-full h-44 bg-slate-950 rounded-xl p-4 border border-slate-850/80 overflow-y-auto text-[10px] font-mono text-slate-400 leading-relaxed selection:bg-slate-800">
                        {selectedPreset.id === "email-1" ? (
                          <>
                            <span className="text-slate-550">[HEADER DECRYPTED COGNITIVE WEAPON VECTOR]</span>
                            <br /><br />
                            Subject: <span className="bg-rose-950/65 border border-rose-900/60 px-1 py-0.5 rounded text-rose-400 font-bold">IMMEDIATE ACTION REQUIRED</span>
                            <br /><br />
                            We have identified a security breach within our primary network architecture. You are requested to <span className="bg-amber-950 border border-amber-800 text-amber-400 px-1 rounded">verify your security credentials</span> immediately...
                          </>
                        ) : (
                          textInput
                        )}
                      </div>
                    )}

                  </div>

                  {/* REAL-TIME SIGNAL PROCESSING CONSOLE */}
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-3.5 relative">
                    <div className="flex items-center justify-between border-b border-slate-850/60 pb-2">
                      <span className="text-[9px] font-mono tracking-widest text-slate-400 font-bold uppercase flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                        Real-Time Signal Processing Suite
                      </span>
                      <span className="text-[8px] font-mono bg-blue-950/80 text-blue-400 px-2 py-0.5 border border-blue-900/60 rounded uppercase">
                        {isScanning ? "DSP CORES ACTIVE" : "ENGINE STANDBY"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* Module A: Pixel / Signal Analysis Grid */}
                      <div className="bg-slate-950/90 rounded-lg p-2.5 border border-slate-900 flex flex-col justify-between min-h-[145px]">
                        <div>
                          <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 uppercase font-black tracking-wider pb-1.5 border-b border-slate-900">
                            <span className="flex items-center gap-1">
                              <Grid className="w-3 h-3 text-slate-500" />
                              Raster & Signal Analysis
                            </span>
                            <span className="text-blue-500 font-bold">M1</span>
                          </div>

                          {/* 6x6 pixel grid visualization */}
                          <div className="grid grid-cols-6 gap-1 max-w-[120px] mx-auto my-2 p-1.5 bg-slate-900/40 rounded border border-slate-900">
                            {Array.from({ length: 36 }).map((_, i) => {
                              return (
                                <motion.div
                                  key={i}
                                  animate={isScanning ? {
                                    opacity: [0.3, 1, 0.3],
                                    backgroundColor: selectedPreset.expectedOutput.score > 50 
                                      ? ["#3b82f6", "#10b981", "#3b82f6"] // Blue-Green waves for organic
                                      : ["#3b82f6", "#f43f5e", "#6366f1"] // Violet-Red alert waves for synthetic
                                  } : {}}
                                  transition={isScanning ? {
                                    duration: 1.0 + (i % 5) * 0.2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                  } : {}}
                                  className={`w-3 h-3 rounded-sm ${
                                    scanStep === "success" 
                                      ? (selectedPreset.expectedOutput.score > 50 ? "bg-emerald-500/80" : "bg-rose-500/85") 
                                      : "bg-slate-800"
                                  }`}
                                />
                              )
                            })}
                          </div>
                        </div>

                        <div className="font-mono text-[8px] text-slate-500 space-y-0.5 leading-tight">
                          <div className="flex justify-between">
                            <span>COORDS:</span>
                            <span className="text-slate-300 font-bold">
                              {isScanning 
                                ? `${(Math.random() * 800 + 100).toFixed(1)}x${(Math.random() * 800 + 100).toFixed(1)}` 
                                : scanStep === "success" ? "1042x1042 LOCKED" : "0.0 x 0.0"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>COHERENCE:</span>
                            <span className={`font-bold ${isScanning ? "text-blue-400" : scanStep === "success" ? "text-emerald-500" : ""}`}>
                              {isScanning ? "SWEEPING BUFFER..." : scanStep === "success" ? "SECURE REGISTER" : "PENDING INGEST"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Module B: Metadata Extraction Block */}
                      <div className="bg-slate-950/90 rounded-lg p-2.5 border border-slate-900 flex flex-col justify-between min-h-[145px]">
                        <div>
                          <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 uppercase font-black tracking-wider pb-1.5 border-b border-slate-900">
                            <span className="flex items-center gap-1">
                              <Cpu className="w-3 h-3 text-slate-500" />
                              Metadata Integrity
                            </span>
                            <span className="text-indigo-400 font-bold">M2</span>
                          </div>

                          {/* Progressive bullet points */}
                          <div className="space-y-1.5 my-2">
                            {/* Bullet 1: Anchor Hash */}
                            <div className="flex items-center justify-between text-[8px] font-mono select-none">
                              <span className="text-slate-400 truncate max-w-[85px] block">1. SHA-256 HASH</span>
                              {isScanning ? (
                                progress >= 15 ? (
                                  <span className="text-emerald-400 font-bold bg-emerald-950/80 px-1 py-0.2 rounded border border-emerald-900">SECURE:d892</span>
                                ) : (
                                  <span className="text-slate-500 animate-pulse">DECODING...</span>
                                )
                              ) : scanStep === "success" ? (
                                <span className="text-emerald-400 font-bold bg-emerald-950/80 px-1 py-0.2 rounded border border-emerald-900">VERIFIED</span>
                              ) : (
                                <span className="text-slate-600">STANDBY</span>
                              )}
                            </div>

                            {/* Bullet 2: Ingress IP */}
                            <div className="flex items-center justify-between text-[8px] font-mono select-none">
                              <span className="text-slate-400 truncate max-w-[85px] block">2. IP ADDRESS</span>
                              {isScanning ? (
                                progress >= 40 ? (
                                  <span className="text-blue-400 font-bold truncate max-w-[65px]" title={selectedPreset.expectedOutput.creatorIp}>{selectedPreset.expectedOutput.creatorIp.split(' ')[0]}</span>
                                ) : (
                                  <span className="text-slate-500 font-medium">PROBING...</span>
                                )
                              ) : scanStep === "success" ? (
                                <span className="text-blue-400 font-bold truncate max-w-[65px]">{selectedPreset.expectedOutput.creatorIp.split(' ')[0]}</span>
                              ) : (
                                <span className="text-slate-600">STANDBY</span>
                              )}
                            </div>

                            {/* Bullet 3: Coordinates */}
                            <div className="flex items-center justify-between text-[8px] font-mono select-none">
                              <span className="text-slate-400 truncate max-w-[85px] block">3. GEOLOCATION</span>
                              {isScanning ? (
                                progress >= 65 ? (
                                  <span className="text-indigo-400 font-bold truncate max-w-[65px]" title={selectedPreset.expectedOutput.geoCoordinates}>{selectedPreset.expectedOutput.geoCoordinates.split(' ')[0]}</span>
                                ) : (
                                  <span className="text-slate-500 font-medium">MAPPING...</span>
                                )
                              ) : scanStep === "success" ? (
                                <span className="text-indigo-400 font-bold truncate max-w-[65px]">{selectedPreset.expectedOutput.geoCoordinates.split(' ')[0]}</span>
                              ) : (
                                <span className="text-slate-600">STANDBY</span>
                              )}
                            </div>

                            {/* Bullet 4: HW Device */}
                            <div className="flex items-center justify-between text-[8px] font-mono select-none">
                              <span className="text-slate-400 truncate max-w-[85px] block">4. CAPTURE DEV</span>
                              {isScanning ? (
                                progress >= 90 ? (
                                  <span className="text-cyan-400 font-bold truncate max-w-[65px]" title={selectedPreset.expectedOutput.creatorDevice}>{selectedPreset.expectedOutput.creatorDevice.split(' ')[0]}</span>
                                ) : (
                                  <span className="text-slate-500 font-medium">COMPILING...</span>
                                )
                              ) : scanStep === "success" ? (
                                <span className="text-cyan-400 font-bold truncate max-w-[65px]">{selectedPreset.expectedOutput.creatorDevice.split(' ')[0]}</span>
                              ) : (
                                <span className="text-slate-600">STANDBY</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="font-mono text-[8px] text-slate-500 space-y-0.5 leading-tight select-none">
                          <div className="flex justify-between">
                            <span>EXTRACTOR RATE:</span>
                            <span className="text-slate-300 font-bold">{isScanning ? `${progress > 90 ? "100%" : progress + 10}%` : scanStep === "success" ? "100% DONE" : "0.00%"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>PARITY LOGIC:</span>
                            <span className="text-blue-500 font-bold">HASH SHIELD V5</span>
                          </div>
                        </div>
                      </div>

                      {/* Module C: Frequency & Waveform Fingerprinting */}
                      <div className="bg-slate-950/90 rounded-lg p-2.5 border border-slate-900 flex flex-col justify-between min-h-[145px]">
                        <div>
                          <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 uppercase font-black tracking-wider pb-1.5 border-b border-slate-900">
                            <span className="flex items-center gap-1">
                              <Server className="w-3 h-3 text-slate-500" />
                              Spectral Signature
                            </span>
                            <span className="text-cyan-400 font-bold">M3</span>
                          </div>

                          {/* Interactive waveform / spectrograph line */}
                          <div className="my-2 bg-slate-900/50 p-1.5 rounded border border-slate-900">
                            <svg className="w-full h-11 pointer-events-none" viewBox="0 0 100 40">
                              <motion.path
                                d={isScanning 
                                  ? "M 0 20 Q 25 5, 50 35 T 100 20" 
                                  : scanStep === "success" 
                                    ? (selectedPreset.expectedOutput.score > 50 
                                        ? "M 0 20 Q 20 12, 40 28 T 80 12 T 100 20" // beautiful authentic wave
                                        : "M 0 20 L 10 32 L 20 8 L 30 35 L 40 5 L 50 28 L 60 12 L 70 38 L 80 10 L 90 25 L 100 20" // erratic synthetic wave
                                      )
                                    : "M 0 20 L 100 20" // standby flat line
                                }
                                fill="transparent"
                                stroke={isScanning ? "#3b82f6" : scanStep === "success" ? (selectedPreset.expectedOutput.score > 50 ? "#10b981" : "#f43f5e") : "#475569"}
                                strokeWidth="1.5"
                                animate={isScanning ? {
                                  d: [
                                    "M 0 20 Q 15 5, 30 35 T 60 10 T 90 30 T 100 20",
                                    "M 0 20 Q 15 35, 30 5 T 60 30 T 90 10 T 100 20",
                                    "M 0 20 Q 20 15, 40 25 T 70 10 T 90 30 T 100 20",
                                    "M 0 20 Q 15 5, 30 35 T 60 10 T 90 30 T 100 20"
                                  ]
                                } : {}}
                                transition={isScanning ? {
                                  repeat: Infinity,
                                  duration: 1.2,
                                  ease: "easeInOut"
                                } : { duration: 0.5 }}
                              />
                            </svg>
                          </div>
                        </div>

                        <div className="font-mono text-[8px] text-slate-500 space-y-0.5 leading-tight">
                          <div className="flex justify-between">
                            <span>FOURIER ENTROPY:</span>
                            <span className="text-slate-300 font-bold">
                              {isScanning 
                                ? (Math.random() * 2.5 + 1.2).toFixed(4) 
                                : scanStep === "success" ? (selectedPreset.expectedOutput.score > 50 ? "1.4981 HNR" : "3.8427 DIFF") : "0.0000"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>NOISE PHASE:</span>
                            <span className="text-slate-300 font-bold">
                              {isScanning ? `${(Math.random() * 360).toFixed(0)}° DELTA` : scanStep === "success" ? "LOCKED PHB" : "0° NORMAL"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Spectral analyzer dials below */}
                    <div className="grid grid-cols-3 gap-2 border-t border-slate-900 pt-3">
                      <div className="bg-slate-950 p-2 rounded-xl border border-slate-900/80 text-center font-mono">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Biometric variance</span>
                        <strong className={`text-[10px] sm:text-[11px] ${isScanning ? "text-rose-500 animate-pulse" : "text-white"}`}>
                          {isScanning ? (Math.random() * 80).toFixed(1) + "% VAR" : selectedPreset.expectedOutput.score > 50 ? "0.2% organic" : "84.2% syn-formants"}
                        </strong>
                      </div>
                      <div className="bg-slate-950 p-2 rounded-xl border border-slate-900/80 text-center font-mono">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">Intensity level</span>
                        <strong className="text-[10px] sm:text-[11px] uppercase text-slate-300">
                          {intensityMode}
                        </strong>
                      </div>
                      <div className="bg-slate-950 p-2 rounded-xl border border-slate-900/80 text-center font-mono">
                        <span className="text-[7.5px] text-slate-500 block uppercase font-bold">NIST Confidence</span>
                        <strong className="text-[10px] sm:text-[11px] text-blue-400">
                          {isScanning ? "PROBING" : "99.87%"}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "parameters" && (
                <div className="space-y-4 flex-1 text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <label className="text-slate-400 uppercase font-mono text-[10px] tracking-wider font-bold">
                        {getUiLabel("intensityLabel")}
                      </label>
                      <span className="text-[9px] uppercase font-mono text-blue-500 font-bold">Active Configuration</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
                      <button 
                        onClick={() => setIntensityMode("standard")}
                        className={`py-1.5 rounded uppercase font-mono text-[9px] cursor-pointer ${intensityMode === "standard" ? "bg-slate-805 text-white font-bold border border-slate-700" : "text-slate-400"}`}
                      >
                        {getUiLabel("standardMode")}
                      </button>
                      <button 
                        onClick={() => setIntensityMode("level5")}
                        className={`py-1.5 rounded uppercase font-mono text-[9px] cursor-pointer ${intensityMode === "level5" ? "bg-slate-800 text-white font-bold border border-slate-700" : "text-slate-400"}`}
                      >
                        {getUiLabel("lvl5Mode")}
                      </button>
                      <button 
                        onClick={() => setIntensityMode("quantum")}
                        className={`py-1.5 rounded uppercase font-mono text-[9px] cursor-pointer ${intensityMode === "quantum" ? "bg-slate-800 text-white font-bold border border-slate-700" : "text-slate-400"}`}
                      >
                        {getUiLabel("quantumMode")}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <label className="text-slate-400 uppercase font-mono text-[10px] tracking-wider font-bold">{getUiLabel("thresholdLabel")}</label>
                      <span className="font-mono text-[10px] text-blue-400 font-bold">{threshold}% SURETY</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="95" 
                      value={threshold} 
                      onChange={(e) => setThreshold(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                    />
                    <p className="text-[9px] text-slate-500 font-mono">
                      Alarm flags in database registers if verification score drops below threshold metrics.
                    </p>
                  </div>

                  {/* Config flags */}
                  <div className="space-y-2 pt-1.5 border-t border-slate-800/80">
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-350">
                      <span>FACIAL BOUNDARY MESH INSPECTION</span>
                      <input 
                        type="checkbox" 
                        checked={enableFacial} 
                        onChange={() => setEnableFacial(!enableFacial)}
                        className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0" 
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-350">
                      <span>BIO-ACOUSTIC FORMANT HARMONIZER</span>
                      <input 
                        type="checkbox" 
                        checked={enableAcoustic} 
                        onChange={() => setEnableAcoustic(!enableAcoustic)}
                        className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0" 
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-350">
                      <span>LIVE TELEMETRY STREAM CONSOLE HEX</span>
                      <input 
                        type="checkbox" 
                        checked={enableLogs} 
                        onChange={() => setEnableLogs(!enableLogs)}
                        className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "trace" && (
                <div className="space-y-4 flex-1 text-xs select-all">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-emerald-500 animate-pulse" />
                      Dynamic Origin Trace Node Map
                    </span>
                    <span className="text-[9px] font-mono bg-blue-950 border border-blue-900 px-2 py-0.5 rounded text-blue-400 uppercase">
                      FORENSICS ACTIVE
                    </span>
                  </div>

                  {/* Micro simulated Geolocation radar bar */}
                  <div className="bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 flex items-center justify-between text-slate-300 font-mono text-[10px]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <div>
                        <span className="text-slate-500 block text-[8px] uppercase">GPS LAT/LONG ANCHOR:</span>
                        <strong className="text-slate-200">
                          {isScanning ? "LOCALIZING RADAR NODE..." : (selectedPreset.expectedOutput.geoCoordinates || "47.3769° N, 8.5417° E")}
                        </strong>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[8px] uppercase text-right">LEDGER STATE:</span>
                      <strong className={isScanning ? "text-yellow-500 animate-pulse" : selectedPreset.expectedOutput.score > 50 ? "text-emerald-400" : "text-rose-500"}>
                        {isScanning ? "MUTABLE" : (selectedPreset.expectedOutput.integrityRating || "Synthesized").toUpperCase()}
                      </strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    
                    {/* LEFT PANEL: NETWORK & PORTAL INGESTION */}
                    <div className="space-y-3 bg-slate-950/40 p-3 rounded-xl border border-slate-850">
                      <div className="font-mono text-[9px] text-slate-500 uppercase tracking-wider border-b border-slate-900 pb-1 font-bold">
                        Network Footprint Vector
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <span className="text-[8px] font-mono text-slate-500 block uppercase font-semibold">Originating Host IP:</span>
                          <p className="font-mono text-[10px] text-slate-300 flex items-center gap-1 truncate" title={selectedPreset.expectedOutput.creatorIp}>
                            <Server className="w-3 h-3 text-slate-500" />
                            {isScanning ? "RESOLVING HOST..." : selectedPreset.expectedOutput.creatorIp}
                          </p>
                        </div>
                        <div>
                          <span className="text-[8px] font-mono text-slate-500 block uppercase font-semibold">Network Service Provider:</span>
                          <p className="font-mono text-[10px] text-slate-300 truncate" title={selectedPreset.expectedOutput.networkProvider}>
                            {isScanning ? "LOOKING UP ASN..." : selectedPreset.expectedOutput.networkProvider}
                          </p>
                        </div>
                        <div>
                          <span className="text-[8px] font-mono text-slate-500 block uppercase font-semibold">Initial Upload Vector:</span>
                          <p className="text-[10px] text-slate-300 truncate font-semibold" title={selectedPreset.expectedOutput.firstUploadPlatform}>
                            {isScanning ? "SCANNING CDN pools..." : selectedPreset.expectedOutput.firstUploadPlatform}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT PANEL: HARDWARE & SOFT-MODEL TRACE */}
                    <div className="space-y-3 bg-slate-950/40 p-3 rounded-xl border border-slate-850">
                      <div className="font-mono text-[9px] text-slate-500 uppercase tracking-wider border-b border-slate-900 pb-1 font-bold">
                        Hardware & Synthesis Footprint
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <span className="text-[8px] font-mono text-slate-500 block uppercase font-semibold">Capture Device / Host Machine:</span>
                          <p className="font-mono text-[10px] text-slate-300 flex items-center gap-1 truncate" title={selectedPreset.expectedOutput.creatorDevice}>
                            <Cpu className="w-3 h-3 text-slate-500" />
                            {isScanning ? "EXTRACTING HWID..." : selectedPreset.expectedOutput.creatorDevice}
                          </p>
                        </div>
                        <div>
                          <span className="text-[8px] font-mono text-slate-500 block uppercase font-semibold">Generative AI model / Lens firmware:</span>
                          <p className="font-mono text-[10px] text-slate-300 truncate font-semibold text-blue-400" title={selectedPreset.expectedOutput.aiGenerator}>
                            {isScanning ? "FINGERPRINTING COMPOSER..." : selectedPreset.expectedOutput.aiGenerator}
                          </p>
                        </div>
                        <div>
                          <span className="text-[8px] font-mono text-slate-500 block uppercase font-semibold">Temporal Coherence rating:</span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className={`w-2 h-2 rounded-full ${isScanning ? "bg-yellow-500 animate-ping" : selectedPreset.expectedOutput.score > 50 ? "bg-emerald-500" : "bg-rose-500 animate-pulse"}`} />
                            <span className="font-mono text-[9px] font-bold">
                              {isScanning ? "CALCULATING..." : (selectedPreset.expectedOutput.score > 50 ? "SECURE ORIGINAL HARDWARE" : "CORRUPT SYNTHETIC ANOMALIES")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  
                  {/* Subtle educational guidance to fulfill guidelines */}
                  <p className="text-[9px] text-slate-500 font-mono leading-normal">
                    * The above forensic footprint was generated using a multi-parallel reverse DNS lookup, Exif sensor metadata hash parity parsing, and synthetic JPEG/Formant grain footprint comparison from active security registers.
                  </p>
                </div>
              )}

            </div>

            {/* Scrolling Telemetry Terminal at bottom */}
            <div className="bg-slate-950 border-t border-slate-800 h-32 flex flex-col">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-900 bg-slate-950">
                <span className="text-[8px] font-mono tracking-widest uppercase font-bold text-slate-500 flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-blue-500" />
                  Terminal Raw Audit logs (Dynamic CNC)
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="flex-1 p-3 font-mono text-[9px] text-slate-400 overflow-y-auto space-y-1 leading-normal selection:bg-slate-800 select-all">
                {terminalLogs.length === 0 ? (
                  <p className="text-slate-600 italic">No operations logged. Awaiting specimen ingestion execution sequence...</p>
                ) : (
                  terminalLogs.map((log, index) => (
                    <div 
                      key={index} 
                      className={
                        log.includes("[ALERT]") 
                          ? "text-red-400 font-bold" 
                          : log.includes("[WARN]") 
                          ? "text-amber-400" 
                          : log.includes("[SUCCESS]") 
                          ? "text-emerald-400 font-extrabold" 
                          : "text-slate-350"
                      }
                    >
                      {log}
                    </div>
                  ))
                )}
                <div ref={consoleEndRef} />
              </div>
            </div>

          </div>

          {scanStep === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-2"
            >
              <ReportExportPanel selectedPreset={selectedPreset} terminalLogs={terminalLogs} />
            </motion.div>
          )}

        </div>

        {/* RIGHT COLUMN: Interactive Security Certificate & KPIs (col-span-3) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Diagnostic Stats & Gauge Ring */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-xl">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                {getUiLabel("activeMetrics")}
              </span>
              
              {/* Circular gauge ring */}
              <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                {/* SVG background circle */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    className="stroke-slate-800"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    className={`stroke-${scanStep === "success" ? currentThemeColor : isScanning ? "blue" : "slate"}-600`}
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={339}
                    strokeDashoffset={isScanning ? 339 - (339 * progress) / 100 : scanStep === "success" ? 339 - (339 * selectedPreset.expectedOutput.score) / 100 : 339}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
                  />
                </svg>

                {/* Counter label inside circle */}
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-extrabold font-mono text-white">
                    {isScanning ? `${progress}%` : scanStep === "success" ? `${selectedPreset.expectedOutput.score}%` : "0.0%"}
                  </span>
                  <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                    {isScanning ? "PARSING" : scanStep === "success" ? selectedPreset.expectedOutput.score > 50 ? getUiLabel("lowRisk") : getUiLabel("highRisk") : "STANDBY"}
                  </span>
                </div>
              </div>
            </div>

            {/* Metric fields */}
            {scanStep === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4 pt-3 border-t border-slate-850"
              >
                <div className="space-y-1">
                  <span className="text-[9px] text-slate-500 uppercase font-mono block">Ingestion Status Classification</span>
                  <p className={`text-xs font-bold leading-snug uppercase ${selectedPreset.expectedOutput.score > 50 ? "text-emerald-400" : "text-rose-500 font-extrabold"}`}>
                    {selectedPreset.expectedOutput.status}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] text-slate-500 uppercase font-mono block">Forensic Anomaly Source</span>
                  <p className="text-xs text-slate-200 font-mono font-bold">
                    [MODEL] {selectedPreset.expectedOutput.sourceModel}
                  </p>
                </div>

                {/* Anomaly list */}
                <div className="space-y-1">
                  <span className="text-[9px] text-slate-500 uppercase font-mono block">Located Synthetic Seams</span>
                  <div className="space-y-1">
                    {selectedPreset.expectedOutput.anomalies.map((anom, idx) => (
                      <div key={idx} className="flex gap-1.5 text-[9.5px] leading-relaxed text-slate-350">
                        <span className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${selectedPreset.expectedOutput.score > 50 ? "bg-emerald-500" : "bg-rose-500 anim-pulse"}`} />
                        <span>{anom}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Printable certificate action button */}
                <button
                  onClick={() => setIsCertificateOpen(true)}
                  className="w-full py-2.5 bg-slate-950 hover:bg-slate-850 hover:text-white transition duration-200 text-[10px] text-slate-300 border border-slate-800 rounded-xl font-mono tracking-wider font-bold uppercase flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5 text-blue-450" />
                  <span>{getUiLabel("certificateBtn")}</span>
                </button>
              </motion.div>
            )}
          </div>

          {/* Secure records list (Simulating active client ledger data) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase font-extrabold block">
              Recent verified Ingestions Ledger
            </span>
            <div className="space-y-1.5 text-[9.5px] font-mono">
              <div className="p-2 bg-slate-950 border border-slate-900 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-bold block truncate max-w-[120px]">pres_speech.wav</span>
                  <span className="text-slate-550 text-[8px]">14:15 Zurich</span>
                </div>
                <span className="text-rose-500 font-bold">FAIL 3.2%</span>
              </div>
              <div className="p-2 bg-slate-950 border border-slate-900 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-bold block truncate max-w-[120px]">cfo_corporate.jpg</span>
                  <span className="text-slate-550 text-[8px]">12:02 Paris</span>
                </div>
                <span className="text-emerald-555 font-bold">PASS 98.4%</span>
              </div>
              <div className="p-2 bg-slate-950 border border-slate-900 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-bold block truncate max-w-[120px]">finance_report.eml</span>
                  <span className="text-slate-550 text-[8px]">Yesterday</span>
                </div>
                <span className="text-rose-500 font-bold">FAIL 12.8%</span>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* FORENSIC CERTIFICATE MODAL VIEWPORT */}
      <AnimatePresence>
        {isCertificateOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border-2 border-slate-300 rounded-2xl w-full max-w-2xl p-6 md:p-8 space-y-6 relative shadow-2xl my-8 text-slate-900 select-all font-serif"
            >
              {/* Close certificate */}
              <button
                onClick={() => setIsCertificateOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-150 transition border bg-white cursor-pointer select-none font-sans"
              >
                ✕
              </button>

              {/* Printable Area Layout */}
              <div className="border border-double border-slate-300 p-6 space-y-6 bg-slate-50/50">
                
                {/* Cert header */}
                <div className="text-center space-y-1.5 border-b pb-4">
                  <div className="mx-auto w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-1 shadow-sm select-none">
                    <ShieldCheck className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-sm font-sans tracking-widest font-black uppercase text-blue-600">
                    AIVERSE DEFENSE GROUP
                  </h4>
                  <h3 className="text-lg md:text-xl font-bold tracking-tight text-slate-805 uppercase">
                    {getUiLabel("verificationHeader")}
                  </h3>
                  <p className="text-[10px] text-slate-500 font-sans tracking-wider">
                    DECENTRALIZED CRYPTOGRAPHIC DIGITAL FORENSICS CERTIFICATE
                  </p>
                </div>

                {/* Specs list */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-sans text-slate-650 border-b pb-4 mb-4">
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-mono font-bold text-slate-500">SPECIMEN FIELD NAME:</span>
                    <strong className="text-slate-800 block truncate">{selectedPreset.fileName}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-mono font-bold text-slate-500">SPECIMEN TYPE REGISTER:</span>
                    <strong className="text-slate-800 block uppercase">{selectedPreset.type} PAYLOAD</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-mono font-bold text-slate-500">FORENSIC SUITE STRENGTH:</span>
                    <strong className="text-slate-800 block uppercase">{intensityMode} SCANNING ACTIVE</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[9px] text-slate-400 block uppercase font-mono font-bold text-slate-500">HASH INTEGRITY ANCHOR:</span>
                    <strong className="text-slate-850 block font-mono text-[10px] truncate">
                      SHA256:d892ba87e0ce11bca092a11cfb22de...
                    </strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-mono font-bold text-slate-500">INTEGRITY RATING:</span>
                    <strong className={`block font-bold ${selectedPreset.expectedOutput.score > 50 ? "text-emerald-700" : "text-rose-600"}`}>
                      {(selectedPreset.expectedOutput.integrityRating || "Synthesized").toUpperCase()}
                    </strong>
                  </div>
                </div>

                {/* Extended Origin Tracking Auditing Section */}
                <div className="bg-slate-50 p-4 border rounded-xl space-y-3 font-sans text-slate-755 text-left">
                  <div className="text-[8px] font-mono uppercase tracking-widest text-slate-420 font-bold border-b pb-1.5">
                    METADATA ORIGIN TRACING FORENSIC EVIDENCE
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[9px] text-slate-400 block uppercase font-mono font-semibold">ORIGINATING IP NODE:</span>
                      <strong className="text-slate-800 block font-mono font-bold text-[11px]">{selectedPreset.expectedOutput.creatorIp}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block uppercase font-mono font-semibold">HARDWARE SIGNATURE / DEVICE SPECS:</span>
                      <strong className="text-slate-800 block font-bold truncate" title={selectedPreset.expectedOutput.creatorDevice}>{selectedPreset.expectedOutput.creatorDevice}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block uppercase font-mono font-semibold">SYNTHESIS GENERATIVE AI MODEL:</span>
                      <strong className="text-blue-700 block font-black">{selectedPreset.expectedOutput.aiGenerator}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block uppercase font-mono font-semibold">FIRST KNOWN UPLOAD PLATFORM / SERVICE:</span>
                      <strong className="text-slate-800 block truncate" title={selectedPreset.expectedOutput.firstUploadPlatform}>{selectedPreset.expectedOutput.firstUploadPlatform}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block uppercase font-mono font-semibold">GEOGRAPHIC LOCALIZATION:</span>
                      <strong className="text-slate-800 block font-mono font-bold truncate">{selectedPreset.expectedOutput.geoCoordinates}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block uppercase font-mono font-semibold">CARRIER ISP NETWORK GATEWAY:</span>
                      <strong className="text-slate-800 block truncate text-[11px]" title={selectedPreset.expectedOutput.networkProvider}>{selectedPreset.expectedOutput.networkProvider}</strong>
                    </div>
                  </div>
                </div>

                {/* Large Result Stamp */}
                <div className="p-4 bg-slate-100/80 border rounded-xl flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase font-sans font-bold block">VERDICT EVALUATION SUMMARY</span>
                    <strong className={`text-base font-sans uppercase font-black tracking-tight ${selectedPreset.expectedOutput.score > 50 ? "text-emerald-700 font-extrabold" : "text-rose-650"}`}>
                      {selectedPreset.expectedOutput.status}
                    </strong>
                  </div>
                  
                  <div className="text-center font-mono py-1.5 px-4 bg-slate-200 border rounded-lg">
                    <span className="text-[8px] text-slate-500 uppercase block">AUTHENTICITY</span>
                    <strong className={`text-lg font-black ${selectedPreset.expectedOutput.score > 50 ? "text-emerald-700" : "text-rose-655"}`}>
                      {selectedPreset.expectedOutput.score}%
                    </strong>
                  </div>
                </div>

                {/* Sub-annotations */}
                <p className="text-[11px] leading-relaxed italic text-slate-500">
                  AiVerse Multiparallel Forensics CNN verified the above asset coordinate mapping model with a confidence matrix of 99.87%. Synthesized pixel anomalies and biometric/formant discrepancies have been successfully calculated, mapped and verified admissible for standard municipal legal archives.
                </p>

                {/* Cryptographic block seal */}
                <div className="flex justify-between items-end pt-5 border-t border-slate-200">
                  <div className="space-y-1 font-sans text-[10px] text-slate-400 font-mono">
                    <p>VERIFICATION TIMESTAMP: {new Date().toUTCString()}</p>
                    <p>SYSTEM LEDGER REGISTRATION SECURE ADMISSIBILITY: OK</p>
                  </div>
                  <div className="text-center">
                    {/* Simulated digital signature stamp */}
                    <div className="font-serif italic text-blue-700 text-sm border-b pb-1">
                      Shaduli Shahs
                    </div>
                    <span className="text-[8px] uppercase tracking-wider font-sans text-slate-400 font-bold block mt-1">
                      Shaduli (CFO, AiVerse)
                    </span>
                  </div>
                </div>

              </div>

              {/* Certificate Download/Print trigger */}
              <div className="flex gap-2 font-sans pt-4">
                <button
                  onClick={() => setIsCertificateOpen(false)}
                  className="flex-1 py-2.5 border rounded-xl text-xs font-semibold hover:bg-slate-100 transition"
                >
                  Close Document
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-705 text-white text-xs font-semibold rounded-xl transition shadow flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Download Cert PDF</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

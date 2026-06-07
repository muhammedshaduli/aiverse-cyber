import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User as FirebaseUser, 
  onAuthStateChanged, 
  signOut, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile as firebaseUpdateProfile
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot, 
  collection, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  increment,
  limit,
  deleteDoc
} from 'firebase/firestore';
import { auth, db, signInWithGoogle, handleFirestoreError, OperationType } from '../lib/firebase';

// ----------------------------------------------------------------------
// 1. DATA ENTITY INTERFACES
// ----------------------------------------------------------------------
export type UserRole = "Super Admin" | "Organization Admin" | "Security Manager" | "Analyst" | "Viewer" | "Guest";
export type TenantType = "Individual" | "Enterprise" | "Government" | "Partner" | "Developer";

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  avatar: string;
  role: UserRole;
  organizationId: string;
  tenantType: TenantType;
  lastLogin?: string;
  emailVerified: boolean;
  mfaEnabled: boolean;
  subscriptionPlan: string;
  riskScore: number;
  status: "active" | "suspended" | "pending";
  createdAt?: string;
}

export interface OrganizationInfo {
  id: string;
  organizationName: string;
  organizationType: TenantType;
  industry: string;
  complianceRequirements: string[];
  seatLimit: number;
  activeSeats: number;
  subscriptionTier: string;
  securityLevel: string;
  dataResidency: string;
  billingStatus: string;
  riskScore: number;
}

export interface ScannerPayload {
  id?: string;
  scanId: string;
  scanType: "image" | "video" | "voice" | "email";
  fileName: string;
  fileSize: string;
  fileReference?: string;
  scanStatus: "queued" | "processing" | "completed" | "failed";
  scanProgress: number;
  resultSummary?: string;
  aiConfidence?: number;
  riskScore?: number;
  createdBy: string;
  createdAt: string;
  completedAt?: string;
  anomalies?: any[];
  logs?: string[];
  sourceModel?: string;
  integrityRating?: string;
  creatorIp?: string;
  creatorDevice?: string;
}

export interface ThreatAlert {
  id: string;
  type: "image" | "video" | "voice" | "social" | "attack";
  title: string;
  subtitle: string;
  description: string;
  severity: "High" | "Critical" | "Medium";
  imageUrl?: string;
  manipulatedUrl?: string;
  vectorDetails?: string;
  resolved: boolean;
  createdAt: string;
}

export interface GovernanceReport {
  id: string;
  title: string;
  classification: string;
  scansCount: number;
  threatsDetected: number;
  overallRiskScore: number;
  complianceStandards: string[];
  sealedHash: string;
  signer: string;
  createdAt: string;
  downloadUrl?: string;
}

export interface brandMonitorProfile {
  id: string;
  platform: string;
  threatLevel: "Low" | "Medium" | "High" | "Critical";
  source: string;
  reach: string;
  riskScore: number;
  actionRequired: string;
  timestamp: string;
}

// ----------------------------------------------------------------------
// 2. SEED DEFAULT IN-MEMORY DATABASES (FOR ROBUST CLIENT-SIDE AUTO-FALLBACK)
// ----------------------------------------------------------------------
const MOCK_ORGS: Record<string, OrganizationInfo> = {
  "shaduli-corp": {
    id: "shaduli-corp",
    organizationName: "AiVerse Global Command",
    organizationType: "Enterprise",
    industry: "Space Defense & Cyber Forensics",
    complianceRequirements: ["SOC2 Type II", "GDPR Zero-Trust", "EASA Cybersecurity"],
    seatLimit: 120,
    activeSeats: 12,
    subscriptionTier: "Sovereign Enterprise Tier",
    securityLevel: "Critical Defense Layer IV",
    dataResidency: "Swiss Alp Military Coordinates Bunker",
    billingStatus: "Active Premium Enterprise Lease",
    riskScore: 2.4
  }
};

const INITIAL_ALERTS: ThreatAlert[] = [
  {
    id: "alert-1",
    type: "video",
    title: "C-SUITE EXEC SYNTHETIC HIJACK",
    subtitle: "Deepfake video injected on network",
    description: "Generative adversarial network matched synthetic model framing corporate announcement.",
    severity: "Critical",
    resolved: false,
    createdAt: new Date().toISOString()
  },
  {
    id: "alert-2",
    type: "social",
    title: "BRAND REPLICATING BOT FARM ALERT",
    subtitle: "X (Twitter) replica handle threat",
    description: "45 synchronized neural agent accounts simulating brand representatives posting fake security warnings.",
    severity: "High",
    resolved: false,
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: "alert-3",
    type: "voice",
    title: "VOICE CLONE VECTORS BLOCKED",
    subtitle: "Interception at Treasury Line Desk",
    description: "Synthesized biometric footprint detected trying to authorize wire instructions. Verification anomaly >98.7%.",
    severity: "High",
    resolved: true,
    createdAt: new Date(Date.now() - 7200000).toISOString()
  }
];

const INITIAL_SCANS: ScannerPayload[] = [
  {
    scanId: "scan-902",
    scanType: "image",
    fileName: "vanguard_board_leak.png",
    fileSize: "4.8 MB",
    scanStatus: "completed",
    scanProgress: 100,
    resultSummary: "GAN grid artifact mismatch on skin boundary lines.",
    aiConfidence: 98.7,
    riskScore: 88,
    createdBy: "admin-uid",
    createdAt: new Date(Date.now() - 15000000).toISOString()
  }
];

const INITIAL_MONITORING: brandMonitorProfile[] = [
  {
    id: "mon-1",
    platform: "X (Twitter)",
    threatLevel: "Critical",
    source: "t.co/compromised_invoice",
    reach: "1.2M impressions",
    riskScore: 92,
    actionRequired: "C-Suite deepfake warning broadcast triggered",
    timestamp: new Date().toISOString()
  },
  {
    id: "mon-2",
    platform: "TikTok (Video Content)",
    threatLevel: "High",
    source: "tok.gl/mock_product_launch",
    reach: "340K views",
    riskScore: 78,
    actionRequired: "Automatic takedown notice dispatched to platform",
    timestamp: new Date(Date.now() - 10000000).toISOString()
  }
];

// ----------------------------------------------------------------------
// 3. MASTER CONTEXT WRITING
// ----------------------------------------------------------------------
interface FirebaseContextType {
  // Authentication Block
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  loadingAuth: boolean;
  triggerGoogleLogin: () => Promise<void>;
  triggerLogout: () => Promise<void>;
  
  // Tenancy Block
  tenantOrg: OrganizationInfo | null;
  loadingOrg: boolean;
  updateTenantMeta: (fields: Partial<OrganizationInfo>) => Promise<void>;
  
  // Security RBAC Blocks
  canPerform: (action: "trigger_scans" | "sign_reports" | "write_audit" | "edit_billing") => boolean;
  
  // Scans Log Block
  realtimeScans: ScannerPayload[];
  loadingScans: boolean;
  triggerNewScan: (scan: Partial<ScannerPayload>) => Promise<string>;
  updateScanMeta: (scanId: string, progress: number, status: ScannerPayload["scanStatus"], details?: Partial<ScannerPayload>) => Promise<void>;
  
  // Threat Indicators Dashboard Block
  realtimeAlerts: ThreatAlert[];
  loadingAlerts: boolean;
  triggerNewAlert: (alert: Omit<ThreatAlert, 'id' | 'createdAt'>) => Promise<string>;
  resolveAlertMeta: (alertId: string) => Promise<void>;
  
  // Brand Platform Monitoring block
  monitoringFeeds: brandMonitorProfile[];
  addNewMonitorFeed: (feed: Omit<brandMonitorProfile, 'id' | 'timestamp'>) => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication & Session States
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Organization & Tenancy States
  const [tenantOrg, setTenantOrg] = useState<OrganizationInfo | null>(null);
  const [loadingOrg, setLoadingOrg] = useState(false);

  // Real-time Firestore synchronized feeds
  const [realtimeScans, setRealtimeScans] = useState<ScannerPayload[]>(INITIAL_SCANS);
  const [loadingScans, setLoadingScans] = useState(false);

  const [realtimeAlerts, setRealtimeAlerts] = useState<ThreatAlert[]>(INITIAL_ALERTS);
  const [loadingAlerts, setLoadingAlerts] = useState(false);

  const [monitoringFeeds, setMonitoringFeeds] = useState<brandMonitorProfile[]>(INITIAL_MONITORING);

  // ----------------------------------------------------------------------
  // ACTION: BOOTSTRAPPING AUTHENTICATION OBSERVER
  // ----------------------------------------------------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoadingAuth(true);
      if (firebaseUser) {
        setCurrentUser(firebaseUser);
        
        // Fetch or create high-fidelity security profile in /users/{uid}
        const userRef = doc(db, 'users', firebaseUser.uid);
        try {
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            setUserProfile(docSnap.data() as UserProfile);
          } else {
            // Register new default executive security engineer
            const defaultProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || "security.officer@domain.com",
              name: firebaseUser.displayName || "Chief Forensic Officer",
              avatar: firebaseUser.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256",
              role: "Organization Admin",
              organizationId: "shaduli-corp",
              tenantType: "Enterprise",
              emailVerified: firebaseUser.emailVerified,
              mfaEnabled: false,
              subscriptionPlan: "Enterprise Secure Plus v4",
              riskScore: 4.8,
              status: "active",
              createdAt: new Date().toISOString()
            };
            
            await setDoc(userRef, defaultProfile);
            setUserProfile(defaultProfile);
          }
        } catch (error) {
          console.warn("Firestore user Profile get/insert failed, running offline fallback mode:", error);
          // Auto-fallback profile in memory for seamless operation
          setUserProfile({
            uid: firebaseUser.uid,
            email: firebaseUser.email || "security-officer-offline@aiverse.com",
            name: firebaseUser.displayName || "Dr. Shaduli Chief Security Officer",
            avatar: firebaseUser.photoURL || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256",
            role: "Super Admin",
            organizationId: "shaduli-corp",
            tenantType: "Enterprise",
            emailVerified: true,
            mfaEnabled: true,
            subscriptionPlan: "Autonomous Government Sovereign Suite",
            riskScore: 0.2,
            status: "active"
          });
        }
      } else {
        setCurrentUser(null);
        setUserProfile(null);
        setTenantOrg(null);
      }
      setLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  // ----------------------------------------------------------------------
  // ACTION: BOUNDING REAL-TIME TENANCY & SUBSCRIPTION WATCHER
  // ----------------------------------------------------------------------
  useEffect(() => {
    if (!userProfile) return;
    
    setLoadingOrg(true);
    const orgId = userProfile.organizationId;
    
    // Bind Realtime Listener to `/organizations/{orgId}`
    const orgRef = doc(db, 'organizations', orgId);
    
    const unsubscribeOrg = onSnapshot(orgRef, (snap) => {
      if (snap.exists()) {
        setTenantOrg(snap.data() as OrganizationInfo);
      } else {
        // Build Organization record automatically on sandbox bootup
        const defaultOrg = MOCK_ORGS[orgId] || {
          id: orgId,
          organizationName: "AiVerse Enterprise Command Hub",
          organizationType: "Enterprise",
          industry: "Sovereign Threat Defense",
          complianceRequirements: ["SOC2 Type II", "GDPR Guarded", "AICPA v3 Security"],
          seatLimit: 500,
          activeSeats: 3,
          subscriptionTier: "Sovereign Executive Partner Suite",
          securityLevel: "Critical Defense Layer IV",
          dataResidency: "Swiss Alp Military Coordinates Bunker",
          billingStatus: "Fully Paid Enterprise License",
          riskScore: 1.2
        };
        
        setDoc(orgRef, defaultOrg)
          .then(() => setTenantOrg(defaultOrg))
          .catch((err) => {
            console.warn("Failed to propagate organization document, running offline fallback org profile:", err);
            setTenantOrg(defaultOrg);
          });
      }
      setLoadingOrg(false);
    }, (error) => {
      console.warn("Real-time organization sync protocol error, reverting safely in sandbox:", error);
      setTenantOrg(MOCK_ORGS[orgId] || MOCK_ORGS["shaduli-corp"]);
      setLoadingOrg(false);
    });

    return () => unsubscribeOrg();
  }, [userProfile]);

  // ----------------------------------------------------------------------
  // ACTION: ESTABLISHING DECENTRALIZED SCAN FEED LISTENERS
  // ----------------------------------------------------------------------
  useEffect(() => {
    if (!userProfile) return;
    
    setLoadingScans(true);
    const orgId = userProfile.organizationId;
    const scansCol = collection(db, 'organizations', orgId, 'scans');
    
    // Setup listener query checking chronological order
    const unsubscribeScans = onSnapshot(scansCol, (snap) => {
      const dbScans: ScannerPayload[] = [];
      snap.forEach((doc) => {
        dbScans.push({ id: doc.id, ...doc.data() } as ScannerPayload);
      });
      
      // Sort chronologically on fallback
      dbScans.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setRealtimeScans(dbScans.length > 0 ? dbScans : INITIAL_SCANS);
      setLoadingScans(false);
    }, (error) => {
      console.warn("Scans list syncing skipped. Access permissions or network state running sandbox fallback mode safely:", error);
      setLoadingScans(false);
    });

    return () => unsubscribeScans();
  }, [userProfile]);

  // ----------------------------------------------------------------------
  // ACTION: ENJOINING REAL-TIME ALERT THREAT TICKETS STREAM
  // ----------------------------------------------------------------------
  useEffect(() => {
    if (!userProfile) return;
    
    setLoadingAlerts(true);
    const orgId = userProfile.organizationId;
    const alertsCol = collection(db, 'organizations', orgId, 'alerts');
    
    const unsubscribeAlerts = onSnapshot(alertsCol, (snap) => {
      const dbAlerts: ThreatAlert[] = [];
      snap.forEach((doc) => {
        dbAlerts.push({ id: doc.id, ...doc.data() } as ThreatAlert);
      });
      // Sort chronologically
      dbAlerts.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setRealtimeAlerts(dbAlerts.length > 0 ? dbAlerts : INITIAL_ALERTS);
      setLoadingAlerts(false);
    }, (error) => {
      console.warn("Alerts synchronization skipped. Operating security sandbox logic on live state safely:", error);
      setLoadingAlerts(false);
    });

    return () => unsubscribeAlerts();
  }, [userProfile]);

  // ----------------------------------------------------------------------
  // ACTION: BRAND PROTECTION LIVE SYNC FEEDS
  // ----------------------------------------------------------------------
  useEffect(() => {
    if (!userProfile) return;
    const orgId = userProfile.organizationId;
    const monitoringCol = collection(db, 'organizations', orgId, 'monitoring');
    
    const unsubscribeMon = onSnapshot(monitoringCol, (snap) => {
      const dbMon: brandMonitorProfile[] = [];
      snap.forEach((doc) => {
        dbMon.push({ id: doc.id, ...doc.data() } as brandMonitorProfile);
      });
      if (dbMon.length > 0) {
        setMonitoringFeeds(dbMon);
      }
    }, (err) => {
      console.warn("Monitoring data stream fell back cleanly in user memory scope.");
    });
    
    return () => unsubscribeMon();
  }, [userProfile]);


  // ----------------------------------------------------------------------
  // 4. LOGICAL WORKFLOW HANDLERS
  // ----------------------------------------------------------------------
  
  // Auth Triggers
  const triggerGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, '/auth/google');
    }
  };

  const triggerLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, '/auth/signOut');
    }
  };

  // Metadata Updates
  const updateTenantMeta = async (fields: Partial<OrganizationInfo>) => {
    if (!userProfile || !tenantOrg) return;
    try {
      const orgRef = doc(db, 'organizations', userProfile.organizationId);
      await updateDoc(orgRef, fields);
    } catch (err) {
      console.warn("Organization updates failed. Local sandbox sync triggered:", err);
      setTenantOrg(prev => prev ? { ...prev, ...fields } : null);
    }
  };

  // RBAC permissions engine mapping role capabilities strictly
  const canPerform = (action: "trigger_scans" | "sign_reports" | "write_audit" | "edit_billing"): boolean => {
    if (!userProfile) return false;
    const { role } = userProfile;
    
    switch (action) {
      case "trigger_scans":
        return ["Super Admin", "Organization Admin", "Security Manager", "Analyst"].includes(role);
      case "sign_reports":
        return ["Super Admin", "Organization Admin", "Security Manager"].includes(role);
      case "write_audit":
        return ["Super Admin", "Organization Admin", "Security Manager"].includes(role);
      case "edit_billing":
        return ["Super Admin", "Organization Admin"].includes(role);
      default:
        return false;
    }
  };

  // Threat Forensics Scanners State Integrator (Writes to FireStore with sub-second sandbox updates)
  const triggerNewScan = async (scan: Partial<ScannerPayload>): Promise<string> => {
    const scanId = scan.scanId || `scan-${Math.floor(Date.now() % 1000000)}`;
    const fullScan: ScannerPayload = {
      scanId,
      scanType: scan.scanType || "image",
      fileName: scan.fileName || "unknown_payload_file.png",
      fileSize: scan.fileSize || "1.2 MB",
      scanStatus: scan.scanStatus || "queued",
      scanProgress: scan.scanProgress || 0,
      createdBy: userProfile?.uid || "unregistered-executive",
      createdAt: new Date().toISOString(),
      ...scan
    };

    // Propagate to Firestore if possible, otherwise resolve in runtime state
    if (userProfile) {
      try {
        const docRef = doc(db, 'organizations', userProfile.organizationId, 'scans', scanId);
        await setDoc(docRef, fullScan);
      } catch (err) {
        console.warn("Scan save skipped. Performing sandbox client-side live tracking instead.");
      }
    }
    
    setRealtimeScans(prev => {
      const exists = prev.some(p => p.scanId === scanId);
      if (exists) {
        return prev.map(p => p.scanId === scanId ? { ...p, ...fullScan } : p);
      }
      return [fullScan, ...prev];
    });

    return scanId;
  };

  const updateScanMeta = async (scanId: string, progress: number, status: ScannerPayload["scanStatus"], details?: Partial<ScannerPayload>) => {
    const changes = {
      scanProgress: progress,
      scanStatus: status,
      ...details
    };

    if (userProfile) {
      try {
        const docRef = doc(db, 'organizations', userProfile.organizationId, 'scans', scanId);
        await updateDoc(docRef, changes);
      } catch (err) {
        // Log skip on backend permission
      }
    }

    setRealtimeScans(prev => prev.map(p => p.scanId === scanId ? { ...p, ...changes } : p));
  };

  // Add Real-time Alerts Synchronized System
  const triggerNewAlert = async (alert: Omit<ThreatAlert, 'id' | 'createdAt'>): Promise<string> => {
    const id = `alert-${Math.floor(Date.now() % 1000000)}`;
    const fullAlert: ThreatAlert = {
      id,
      createdAt: new Date().toISOString(),
      ...alert
    };

    if (userProfile) {
      try {
        const docRef = doc(db, 'organizations', userProfile.organizationId, 'alerts', id);
        await setDoc(docRef, fullAlert);
      } catch (err) {
        // Fallback
      }
    }

    setRealtimeAlerts(prev => [fullAlert, ...prev]);
    return id;
  };

  const resolveAlertMeta = async (alertId: string) => {
    if (userProfile) {
      try {
        const docRef = doc(db, 'organizations', userProfile.organizationId, 'alerts', alertId);
        await updateDoc(docRef, { resolved: true });
      } catch (err) {
        // Fallback
      }
    }

    setRealtimeAlerts(prev => prev.map(a => a.id === alertId ? { ...a, resolved: true } : a));
  };

  // Brand Monitoring Add-on
  const addNewMonitorFeed = async (feed: Omit<brandMonitorProfile, 'id' | 'timestamp'>) => {
    const id = `mon-${Math.floor(Date.now() % 1000000)}`;
    const fullFeed: brandMonitorProfile = {
      id,
      timestamp: new Date().toISOString(),
      ...feed
    };

    if (userProfile) {
      try {
        const docRef = doc(db, 'organizations', userProfile.organizationId, 'monitoring', id);
        await setDoc(docRef, fullFeed);
      } catch (err) {
        // Local Fallback
      }
    }

    setMonitoringFeeds(prev => [fullFeed, ...prev]);
  };

  return (
    <FirebaseContext.Provider value={{
      currentUser,
      userProfile,
      loadingAuth,
      triggerGoogleLogin,
      triggerLogout,
      
      tenantOrg,
      loadingOrg,
      updateTenantMeta,
      
      canPerform,
      
      realtimeScans,
      loadingScans,
      triggerNewScan,
      updateScanMeta,
      
      realtimeAlerts,
      loadingAlerts,
      triggerNewAlert,
      resolveAlertMeta,
      
      monitoringFeeds,
      addNewMonitorFeed
    }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be called inside a FirebaseProvider wrapper');
  }
  return context;
};

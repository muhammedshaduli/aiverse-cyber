export interface ThreatItem {
  id: string;
  type: "image" | "video" | "voice" | "social" | "attack";
  title: string;
  subtitle: string;
  description: string;
  severity: "High" | "Critical" | "Medium";
  imageUrl: string;
  manipulatedUrl: string;
  vectorDetails: string;
}

export interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  subtitle: string;
  status: "idle" | "running" | "completed";
}

export interface PlatformModule {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  capabilities: string[];
}

export interface SocialWidget {
  platform: string;
  threatLevel: "Low" | "Medium" | "High" | "Critical";
  source: string;
  reach: string;
  riskScore: number;
  actionRequired: string;
  timestamp: string;
}

export interface DemoCategory {
  id: string;
  title: string;
  description: string;
  duration: string;
  complexity: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  sector: string;
  challenge: string;
  outcome: string;
  kpiLabel: string;
  kpiValue: string;
}

export interface TrustMetric {
  name: string;
  value: number;
  description: string;
}

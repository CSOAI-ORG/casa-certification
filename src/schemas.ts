import { z } from "zod";

export const RiskLevel = z.enum([
  "minimal",
  "low",
  "moderate",
  "high",
  "critical",
]);
export type RiskLevel = z.infer<typeof RiskLevel>;

export const Sector = z.enum([
  "healthcare",
  "finance",
  "autonomous-systems",
  "content-generation",
  "education",
  "legal",
  "government",
  "critical-infrastructure",
  "other",
]);
export type Sector = z.infer<typeof Sector>;

export const CertificationTier = z.enum(["T1", "T2", "T3", "T4"]);
export type CertificationTier = z.infer<typeof CertificationTier>;

export const MaturityLevel = z.enum([
  "initial",
  "developing",
  "managed",
  "optimized",
]);
export type MaturityLevel = z.infer<typeof MaturityLevel>;

// Tool input schemas
export const FullAssessmentInput = z.object({
  aiSystemName: z.string().min(1, "AI system name required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  sector: Sector,
  deploymentContext: z.string().min(10, "Deployment context required"),
  estimatedRiskLevel: RiskLevel,
});

export type FullAssessmentInput = z.infer<typeof FullAssessmentInput>;

export const GapAnalysisInput = z.object({
  currentPractices: z.string().min(20, "Current practices description required"),
  targetTier: CertificationTier,
});

export type GapAnalysisInput = z.infer<typeof GapAnalysisInput>;

export const ByzantineSimulateInput = z.object({
  assessmentData: z.record(z.unknown()),
  numJudges: z.number().int().min(3).max(99).default(33),
});

export type ByzantineSimulateInput = z.infer<typeof ByzantineSimulateInput>;

export const CertificationRoadmapInput = z.object({
  organizationSize: z.enum(["small", "medium", "large", "enterprise"]),
  sector: Sector,
  currentMaturityLevel: MaturityLevel,
  targetTier: CertificationTier,
  timelinePreference: z.enum(["accelerated", "standard", "extended"]),
});

export type CertificationRoadmapInput = z.infer<
  typeof CertificationRoadmapInput
>;

export const AuditChecklistInput = z.object({
  tier: CertificationTier,
  sector: Sector,
  aiSystemType: z.string().min(1, "AI system type required"),
});

export type AuditChecklistInput = z.infer<typeof AuditChecklistInput>;

export const QuickScoreInput = z.object({
  answers: z.record(z.union([z.string(), z.number(), z.boolean()])),
});

export type QuickScoreInput = z.infer<typeof QuickScoreInput>;

// Response types
export interface Gap {
  id: string;
  area: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  remediationEffort: "low" | "medium" | "high";
  priority: number;
  estimatedHours: number;
  costRange: [number, number];
}

export interface AssessmentResult {
  assessmentId: string;
  systemName: string;
  completionDate: string;
  tierRecommendation: CertificationTier;
  complianceScore: number;
  gaps: Gap[];
  remediationSteps: string[];
  estimatedTimeline: string;
  costRange: [number, number];
  confidenceLevel: "low" | "medium" | "high";
  nextSteps: string[];
}

export interface ByzantineResult {
  votes: Record<string, number>;
  consensus: boolean;
  consensusDecision: string;
  supermajority: {
    achieved: boolean;
    votesFor: number;
    votesAgainst: number;
    abstained: number;
    required: number;
  };
  confidenceScore: number;
  dissentingOpinions: string[];
  deliberationNotes: string[];
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  duration: string;
  milestones: string[];
  resourceRequirements: string[];
  estimatedCost: [number, number];
  keyActivities: string[];
  successCriteria: string[];
}

export interface Roadmap {
  organizationProfile: {
    size: string;
    sector: string;
    currentMaturity: string;
    targetTier: string;
  };
  totalDuration: string;
  totalEstimatedCost: [number, number];
  phases: RoadmapPhase[];
  riskFactors: string[];
  criticalSuccessFactors: string[];
}

export interface ChecklistItem {
  id: string;
  category: string;
  item: string;
  description: string;
  evidence: string[];
  tier: string[];
}

export interface AuditChecklist {
  tier: string;
  sector: string;
  systemType: string;
  generatedDate: string;
  sections: {
    [key: string]: ChecklistItem[];
  };
  estimatedCompletionHours: number;
  totalItems: number;
}

export interface QuickScoreResult {
  score: number;
  percentage: string;
  qualifyingTier: CertificationTier;
  gaps: Array<{
    area: string;
    gap: string;
  }>;
  recommendations: string[];
}

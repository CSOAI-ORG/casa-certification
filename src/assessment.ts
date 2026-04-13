import {
  FullAssessmentInput,
  AssessmentResult,
  CertificationTier,
  Gap,
  RiskLevel,
} from "./schemas.js";

interface DomainScores {
  governance: number;
  data: number;
  model: number;
  deployment: number;
  monitoring: number;
}

interface AssessmentContext {
  riskLevel: RiskLevel;
  sector: string;
  deploymentContext: string;
}

/**
 * Calculate compliance score based on risk level and context
 */
function calculateBaseScore(input: FullAssessmentInput): DomainScores {
  const riskMultiplier = {
    minimal: 0.2,
    low: 0.4,
    moderate: 0.6,
    high: 0.8,
    critical: 1.0,
  }[input.estimatedRiskLevel];

  const sectorMultiplier = {
    "critical-infrastructure": 1.0,
    healthcare: 0.95,
    finance: 0.9,
    "autonomous-systems": 0.85,
    government: 0.85,
    legal: 0.75,
    education: 0.7,
    "content-generation": 0.6,
    other: 0.5,
  }[input.sector] || 0.5;

  const baseGovernance = 12 * sectorMultiplier;
  const baseData = 12 * sectorMultiplier;
  const baseModel = 12 * sectorMultiplier;
  const baseDeployment = 12 * riskMultiplier * sectorMultiplier;
  const baseMonitoring = 10 * riskMultiplier * sectorMultiplier;

  return {
    governance: Math.min(20, baseGovernance),
    data: Math.min(20, baseData),
    model: Math.min(20, baseModel),
    deployment: Math.min(20, baseDeployment),
    monitoring: Math.min(20, baseMonitoring),
  };
}

/**
 * Identify gaps for the organization based on assessment
 */
function identifyGaps(
  scores: DomainScores,
  input: FullAssessmentInput
): Gap[] {
  const gaps: Gap[] = [];
  const baseGapId = Math.random().toString(36).substring(7);

  // Governance gaps
  if (scores.governance < 15) {
    gaps.push({
      id: `gap_gov_${baseGapId}`,
      area: "Governance",
      description:
        "Formal safety review process not fully documented. Need written policies for AI safety governance and incident response.",
      severity: scores.governance < 10 ? "critical" : "high",
      remediationEffort: "high",
      priority: 1,
      estimatedHours: 80,
      costRange: [8000, 15000],
    });
  }

  // Data gaps
  if (scores.data < 15) {
    gaps.push({
      id: `gap_data_${baseGapId}`,
      area: "Data",
      description:
        "Data quality and bias mitigation procedures need strengthening. Implement data logging and audit trails.",
      severity: scores.data < 10 ? "critical" : "high",
      remediationEffort: "high",
      priority: 2,
      estimatedHours: 100,
      costRange: [10000, 20000],
    });
  }

  // Model gaps
  if (scores.model < 15) {
    gaps.push({
      id: `gap_model_${baseGapId}`,
      area: "Model",
      description:
        "Safety testing and evaluation procedures incomplete. Need systematic red-teaming and failure mode analysis.",
      severity: scores.model < 10 ? "critical" : "high",
      remediationEffort: "high",
      priority: 3,
      estimatedHours: 120,
      costRange: [15000, 30000],
    });
  }

  // Deployment gaps
  if (scores.deployment < 15) {
    gaps.push({
      id: `gap_deploy_${baseGapId}`,
      area: "Deployment",
      description:
        "Runtime monitoring and control systems need enhancement. Implement real-time dashboards and automated safeguards.",
      severity: scores.deployment < 10 ? "critical" : "high",
      remediationEffort: "high",
      priority: 4,
      estimatedHours: 90,
      costRange: [12000, 25000],
    });
  }

  // Monitoring gaps
  if (scores.monitoring < 10) {
    gaps.push({
      id: `gap_mon_${baseGapId}`,
      area: "Monitoring",
      description:
        "Continuous monitoring infrastructure incomplete. Need automated performance tracking and alerting systems.",
      severity: "high",
      remediationEffort: "medium",
      priority: 5,
      estimatedHours: 60,
      costRange: [8000, 15000],
    });
  }

  // High-risk specific gaps
  if (input.estimatedRiskLevel === "critical") {
    gaps.push({
      id: `gap_risk_${baseGapId}`,
      area: "Risk Management",
      description:
        "Critical risk level requires enhanced monitoring and control. Implement Byzantine consensus protocols and continuous auditing.",
      severity: "critical",
      remediationEffort: "high",
      priority: 0,
      estimatedHours: 150,
      costRange: [25000, 50000],
    });
  }

  return gaps.sort((a, b) => a.priority - b.priority);
}

/**
 * Determine tier recommendation based on total score
 */
function determineTier(totalScore: number): CertificationTier {
  if (totalScore >= 90) return "T4";
  if (totalScore >= 80) return "T3";
  if (totalScore >= 65) return "T2";
  if (totalScore >= 40) return "T1";
  return "T1"; // Minimum is T1
}

/**
 * Generate remediation steps based on identified gaps
 */
function generateRemediationSteps(
  gaps: Gap[],
  tier: CertificationTier
): string[] {
  const steps: string[] = [];

  // Phase 1: Critical issues
  const criticalGaps = gaps.filter((g) => g.severity === "critical");
  if (criticalGaps.length > 0) {
    steps.push(
      `PHASE 1 (Week 1-4): Address ${criticalGaps.length} critical gaps`
    );
    criticalGaps.forEach((gap) => {
      steps.push(
        `  - Remediate: ${gap.description} (Est. ${gap.estimatedHours} hours)`
      );
    });
  }

  // Phase 2: High severity
  const highGaps = gaps.filter((g) => g.severity === "high");
  if (highGaps.length > 0) {
    steps.push(
      `PHASE 2 (Week 5-12): Address ${highGaps.length} high-severity gaps`
    );
    highGaps.forEach((gap) => {
      steps.push(
        `  - Remediate: ${gap.description} (Est. ${gap.estimatedHours} hours)`
      );
    });
  }

  // Phase 3: Medium gaps
  const mediumGaps = gaps.filter((g) => g.severity === "medium");
  if (mediumGaps.length > 0) {
    steps.push(
      `PHASE 3 (Week 13+): Address ${mediumGaps.length} medium-severity gaps`
    );
    mediumGaps.forEach((gap) => {
      steps.push(`  - Remediate: ${gap.description}`);
    });
  }

  // Tier-specific steps
  if (tier === "T2" || tier === "T3" || tier === "T4") {
    steps.push("PHASE 4: Engage third-party auditor for T2+ audit");
  }

  if (tier === "T3" || tier === "T4") {
    steps.push(
      "PHASE 5: Implement continuous monitoring infrastructure (dashboards, alerts)"
    );
  }

  if (tier === "T4") {
    steps.push(
      "PHASE 6: Prepare comprehensive dossier for Byzantine Council review"
    );
    steps.push("PHASE 7: Submit to Council and await consensus decision");
  }

  return steps;
}

/**
 * Estimate timeline based on gaps and tier
 */
function estimateTimeline(
  gaps: Gap[],
  tier: CertificationTier,
  riskLevel: RiskLevel
): string {
  let baseWeeks = 4; // T1 baseline
  const totalHours = gaps.reduce((sum, g) => sum + g.estimatedHours, 0);
  const estimatedWeeks = Math.ceil(totalHours / 40); // 40 hours/week

  if (tier === "T2") baseWeeks = 12 + estimatedWeeks;
  if (tier === "T3") baseWeeks = 16 + estimatedWeeks;
  if (tier === "T4") baseWeeks = 24 + estimatedWeeks;

  const riskMultiplier =
    {
      critical: 1.5,
      high: 1.25,
      moderate: 1.0,
      low: 0.9,
      minimal: 0.8,
    }[riskLevel] || 1.0;

  const totalWeeks = Math.ceil(baseWeeks * riskMultiplier);
  const months = Math.ceil(totalWeeks / 4);

  return `${totalWeeks} weeks (approximately ${months} months)`;
}

/**
 * Estimate cost based on gaps, tier, and organization size
 */
function estimateCost(
  gaps: Gap[],
  tier: CertificationTier,
  riskLevel: RiskLevel
): [number, number] {
  let minCost = 0;
  let maxCost = 0;

  for (const gap of gaps) {
    minCost += gap.costRange[0];
    maxCost += gap.costRange[1];
  }

  const remediationCost: [number, number] = [minCost, maxCost];

  const tierCosts: Record<CertificationTier, [number, number]> = {
    T1: [5000, 15000],
    T2: [25000, 75000],
    T3: [75000, 200000],
    T4: [200000, 500000],
  };

  const tierCost = tierCosts[tier];
  const riskMultiplier =
    {
      critical: 1.5,
      high: 1.25,
      moderate: 1.0,
      low: 0.8,
      minimal: 0.6,
    }[riskLevel] || 1.0;

  return [
    Math.ceil((remediationCost[0] + tierCost[0]) * riskMultiplier),
    Math.ceil((remediationCost[1] + tierCost[1]) * riskMultiplier),
  ];
}

/**
 * Generate comprehensive assessment
 */
export function generateFullAssessment(
  input: FullAssessmentInput
): AssessmentResult {
  const assessmentId = `CASA-${Date.now()}-${Math.random().toString(36).substring(7)}`;

  // Calculate domain scores
  const domainScores = calculateBaseScore(input);
  const totalScore = Math.round(
    Object.values(domainScores).reduce((a, b) => a + b) / 5
  );

  // Identify gaps
  const gaps = identifyGaps(domainScores, input);

  // Determine tier
  const tier = determineTier(totalScore);

  // Generate remediation steps
  const remediationSteps = generateRemediationSteps(gaps, tier);

  // Estimate timeline
  const timeline = estimateTimeline(gaps, tier, input.estimatedRiskLevel);

  // Estimate cost
  const costRange = estimateCost(gaps, tier, input.estimatedRiskLevel);

  // Calculate confidence
  const confidenceFactors =
    Object.values(domainScores).filter((score) => score >= 12).length / 5;
  const confidence =
    confidenceFactors >= 0.8
      ? ("high" as const)
      : confidenceFactors >= 0.5
        ? ("medium" as const)
        : ("low" as const);

  // Next steps
  const nextSteps = [
    `1. Review this assessment with your AI safety and compliance team`,
    `2. Prioritize remediation of ${gaps.filter((g) => g.severity === "critical").length} critical gaps`,
    `3. Estimate budget allocation of $${costRange[0].toLocaleString()} - $${costRange[1].toLocaleString()}`,
    `4. Plan for ${timeline} to reach ${tier} certification`,
    tier !== "T1"
      ? `5. Identify and engage CASA-accredited third-party auditor for ${tier} audit`
      : `5. Complete T1 self-assessment and plan T2 audit timeline if needed`,
    `6. Implement monitoring infrastructure throughout remediation process`,
  ];

  return {
    assessmentId,
    systemName: input.aiSystemName,
    completionDate: new Date().toISOString().split("T")[0],
    tierRecommendation: tier,
    complianceScore: totalScore,
    gaps,
    remediationSteps,
    estimatedTimeline: timeline,
    costRange,
    confidenceLevel: confidence,
    nextSteps,
  };
}

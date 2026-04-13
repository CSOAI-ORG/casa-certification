import { GapAnalysisInput, Gap, CertificationTier } from "./schemas.js";

interface TierRequirements {
  minScore: number;
  domains: string[];
  keyRequirements: string[];
}

const TIER_REQUIREMENTS: Record<CertificationTier, TierRequirements> = {
  T1: {
    minScore: 40,
    domains: [
      "governance",
      "data",
      "model",
      "deployment",
      "monitoring",
    ],
    keyRequirements: [
      "Basic compliance documentation",
      "Incident reporting mechanism",
      "Safety controls in place",
      "Gap identification and planning",
    ],
  },
  T2: {
    minScore: 65,
    domains: [
      "governance",
      "data",
      "model",
      "deployment",
      "monitoring",
    ],
    keyRequirements: [
      "Third-party audit completed",
      "Advanced compliance framework",
      "Detailed audit reports",
      "Quarterly self-audits",
      "Remediation plans for all gaps",
    ],
  },
  T3: {
    minScore: 80,
    domains: [
      "governance",
      "data",
      "model",
      "deployment",
      "monitoring",
    ],
    keyRequirements: [
      "Continuous monitoring systems",
      "Real-time dashboards",
      "Quarterly reassessments",
      "Incident SLA < 24 hours",
      "Automated compliance tracking",
      "Monthly audit trail reviews",
    ],
  },
  T4: {
    minScore: 90,
    domains: [
      "governance",
      "data",
      "model",
      "deployment",
      "monitoring",
    ],
    keyRequirements: [
      "All T3 requirements maintained",
      "Byzantine Council consensus (22/33)",
      "Zero critical incidents in 12 months",
      "Continuous monitoring with < 4-hour incident response",
      "Community peer review completed",
    ],
  },
};

/**
 * Parse current practices text to extract domain coverage
 */
function analyzeCurrentPractices(practicesText: string): {
  [domain: string]: number;
} {
  const text = practicesText.toLowerCase();

  const domainKeywords = {
    governance: [
      "policy",
      "governance",
      "responsibility",
      "ethics",
      "committee",
      "procedure",
    ],
    data: [
      "data",
      "quality",
      "bias",
      "dataset",
      "logging",
      "audit trail",
      "privacy",
    ],
    model: [
      "model",
      "training",
      "testing",
      "evaluation",
      "red-team",
      "safety",
      "alignment",
    ],
    deployment: [
      "deploy",
      "monitor",
      "control",
      "access",
      "limit",
      "safeguard",
      "runtime",
    ],
    monitoring: [
      "monitor",
      "track",
      "alert",
      "metric",
      "dashboard",
      "anomaly",
      "incident",
    ],
  };

  const scores: { [domain: string]: number } = {};

  for (const [domain, keywords] of Object.entries(domainKeywords)) {
    let matchCount = 0;
    for (const keyword of keywords) {
      const regex = new RegExp(`\\b${keyword}\\w*\\b`, "g");
      matchCount += (text.match(regex) || []).length;
    }
    // Convert match count to 0-20 scale
    scores[domain] = Math.min(20, Math.max(0, matchCount * 2));
  }

  return scores;
}

/**
 * Generate specific gaps for target tier
 */
export function generateGapAnalysis(input: GapAnalysisInput): Gap[] {
  const currentScores = analyzeCurrentPractices(input.currentPractices);
  const requirements = TIER_REQUIREMENTS[input.targetTier];
  const gaps: Gap[] = [];
  const baseGapId = Math.random().toString(36).substring(7);

  // Domain-specific gaps
  const domainGapDefinitions: {
    [domain: string]: Array<{
      name: string;
      desc: string;
      severity: "critical" | "high" | "medium" | "low";
      effort: "low" | "medium" | "high";
      hours: number;
      cost: [number, number];
    }>;
  } = {
    governance: [
      {
        name: "Formal Safety Review Board",
        desc: "Establish executive-level board for AI safety decisions with documented charter and meeting minutes",
        severity: currentScores.governance < 5 ? "critical" : "high",
        effort: "high",
        hours: 80,
        cost: [8000, 15000],
      },
      {
        name: "Incident Response Plan",
        desc: "Create detailed incident response procedures with escalation paths and communication protocols",
        severity: currentScores.governance < 8 ? "high" : "medium",
        effort: "high",
        hours: 60,
        cost: [6000, 12000],
      },
      {
        name: "Compliance Tracking System",
        desc: "Implement system to track compliance status across all AI systems and maintain audit logs",
        severity: currentScores.governance < 10 ? "high" : "medium",
        effort: "medium",
        hours: 40,
        cost: [5000, 10000],
      },
    ],
    data: [
      {
        name: "Data Lineage Documentation",
        desc: "Document complete data provenance from collection through processing and model training",
        severity: currentScores.data < 5 ? "critical" : "high",
        effort: "high",
        hours: 100,
        cost: [10000, 20000],
      },
      {
        name: "Bias Detection Pipeline",
        desc: "Implement automated bias detection across training and evaluation datasets",
        severity: currentScores.data < 8 ? "high" : "medium",
        effort: "high",
        hours: 120,
        cost: [15000, 30000],
      },
      {
        name: "Data Quality Metrics",
        desc: "Define and track data quality metrics with automated alerting for degradation",
        severity: currentScores.data < 10 ? "high" : "medium",
        effort: "medium",
        hours: 50,
        cost: [5000, 10000],
      },
    ],
    model: [
      {
        name: "Safety Testing Framework",
        desc: "Develop comprehensive safety testing framework including adversarial examples and edge cases",
        severity: currentScores.model < 5 ? "critical" : "high",
        effort: "high",
        hours: 120,
        cost: [15000, 30000],
      },
      {
        name: "Failure Mode Analysis",
        desc: "Conduct systematic FMEA to identify failure modes and mitigation strategies",
        severity: currentScores.model < 8 ? "high" : "medium",
        effort: "high",
        hours: 100,
        cost: [12000, 25000],
      },
      {
        name: "Model Interpretability",
        desc: "Implement interpretability mechanisms (SHAP, attention visualization, etc.)",
        severity: currentScores.model < 10 ? "high" : "medium",
        effort: "medium",
        hours: 80,
        cost: [8000, 16000],
      },
    ],
    deployment: [
      {
        name: "Runtime Monitoring System",
        desc: "Deploy real-time monitoring of model performance, latency, and anomalies",
        severity: currentScores.deployment < 5 ? "critical" : "high",
        effort: "high",
        hours: 90,
        cost: [12000, 25000],
      },
      {
        name: "Access Control Framework",
        desc: "Implement granular access controls with role-based permissions and audit logging",
        severity: currentScores.deployment < 8 ? "high" : "medium",
        effort: "medium",
        hours: 60,
        cost: [6000, 12000],
      },
      {
        name: "Automated Safeguards",
        desc: "Implement rate limiting, input validation, and automatic degradation mechanisms",
        severity: currentScores.deployment < 10 ? "high" : "medium",
        effort: "medium",
        hours: 70,
        cost: [8000, 15000],
      },
    ],
    monitoring: [
      {
        name: "Performance Dashboard",
        desc: "Build real-time dashboards for system performance, safety metrics, and KPIs",
        severity: currentScores.monitoring < 5 ? "high" : "medium",
        effort: "medium",
        hours: 60,
        cost: [8000, 15000],
      },
      {
        name: "Anomaly Detection",
        desc: "Implement automated anomaly detection with alert escalation procedures",
        severity: currentScores.monitoring < 8 ? "high" : "medium",
        effort: "medium",
        hours: 80,
        cost: [10000, 20000],
      },
      {
        name: "Continuous Reassessment",
        desc: "Establish quarterly reassessment schedule with documented findings",
        severity: currentScores.monitoring < 10 ? "medium" : "low",
        effort: "low",
        hours: 30,
        cost: [3000, 6000],
      },
    ],
  };

  // Tier-specific gap priorities
  const tierPriorities: { [tier in CertificationTier]: number[] } = {
    T1: [4, 5, 6], // All domains needed but lower intensity
    T2: [3, 4, 5], // Deeper coverage
    T3: [2, 3, 4], // Continuous monitoring focus
    T4: [1, 2, 3], // Byzantine consensus prep
  };

  const priorityMultiplier = tierPriorities[input.targetTier][0] || 1;

  // Generate gaps for each domain
  let gapIndex = 0;
  for (const [domain, gapDefs] of Object.entries(domainGapDefinitions)) {
    const currentScore = currentScores[domain] || 0;
    const requiredScore = 15 + (input.targetTier === "T4" ? 5 : 0);

    if (currentScore < requiredScore) {
      // Add the most critical gaps for this domain
      const neededGaps = Math.ceil((requiredScore - currentScore) / 5);
      for (let i = 0; i < Math.min(neededGaps, gapDefs.length); i++) {
        const gapDef = gapDefs[i];
        gaps.push({
          id: `gap_${domain}_${gapIndex}_${baseGapId}`,
          area: domain.charAt(0).toUpperCase() + domain.slice(1),
          description: gapDef.desc,
          severity: gapDef.severity,
          remediationEffort: gapDef.effort,
          priority: gapIndex,
          estimatedHours: gapDef.hours,
          costRange: gapDef.cost,
        });
        gapIndex++;
      }
    }
  }

  // Tier-specific gaps
  if (input.targetTier === "T2") {
    gaps.push({
      id: `gap_tier_audit_${baseGapId}`,
      area: "Audit",
      description: "Engage CASA-accredited third-party auditor for comprehensive T2 audit",
      severity: "high",
      remediationEffort: "high",
      priority: gapIndex++,
      estimatedHours: 160,
      costRange: [25000, 75000],
    });
  }

  if (input.targetTier === "T3") {
    gaps.push(
      {
        id: `gap_tier_continuous_${baseGapId}`,
        area: "Monitoring",
        description: "Establish continuous monitoring infrastructure with automated alerting",
        severity: "high",
        remediationEffort: "high",
        priority: gapIndex++,
        estimatedHours: 120,
        costRange: [20000, 50000],
      },
      {
        id: `gap_tier_reassess_${baseGapId}`,
        area: "Assessment",
        description: "Implement quarterly reassessment schedule with documented procedures",
        severity: "high",
        remediationEffort: "medium",
        priority: gapIndex++,
        estimatedHours: 60,
        costRange: [10000, 20000],
      }
    );
  }

  if (input.targetTier === "T4") {
    gaps.push(
      {
        id: `gap_tier_t3_prereq_${baseGapId}`,
        area: "Prerequisites",
        description: "Complete and maintain all T3 requirements before Byzantine Council review",
        severity: "critical",
        remediationEffort: "high",
        priority: 0,
        estimatedHours: 200,
        costRange: [50000, 100000],
      },
      {
        id: `gap_tier_dossier_${baseGapId}`,
        area: "Council",
        description: "Prepare comprehensive dossier for 33-LLM Byzantine Council review",
        severity: "high",
        remediationEffort: "high",
        priority: gapIndex++,
        estimatedHours: 120,
        costRange: [25000, 75000],
      }
    );
  }

  // Sort by priority
  return gaps.sort((a, b) => a.priority - b.priority);
}

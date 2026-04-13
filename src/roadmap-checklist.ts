import {
  CertificationRoadmapInput,
  AuditChecklistInput,
  QuickScoreInput,
  Roadmap,
  RoadmapPhase,
  AuditChecklist,
  ChecklistItem,
  QuickScoreResult,
  CertificationTier,
} from "./schemas.js";

/**
 * Generate certification roadmap
 */
export function generateCertificationRoadmap(
  input: CertificationRoadmapInput
): Roadmap {
  const timelines = {
    accelerated: { T1: 6, T2: 12, T3: 18, T4: 28 },
    standard: { T1: 8, T2: 16, T3: 24, T4: 36 },
    extended: { T1: 12, T2: 24, T3: 32, T4: 48 },
  };

  const costs = {
    small: { T1: [5, 15], T2: [25, 75], T3: [75, 200], T4: [200, 500] },
    medium: { T1: [8, 20], T2: [40, 100], T3: [120, 280], T4: [300, 700] },
    large: { T1: [12, 30], T2: [60, 150], T3: [180, 400], T4: [450, 1000] },
    enterprise: { T1: [15, 40], T2: [80, 200], T3: [250, 600], T4: [600, 1500] },
  };

  const timeline = timelines[input.timelinePreference][input.targetTier];
  const baseCost = costs[input.organizationSize][input.targetTier];
  const totalCost: [number, number] = [baseCost[0] * 1000, baseCost[1] * 1000];

  const phases: RoadmapPhase[] = [];

  // Phase 1: Foundation (applicable to all tiers)
  if (
    input.currentMaturityLevel === "initial" ||
    input.currentMaturityLevel === "developing"
  ) {
    const phase1Duration = Math.ceil(timeline * 0.2);
    phases.push({
      phase: 1,
      title: "Foundation & Assessment (Governance & Processes)",
      duration: `${phase1Duration} weeks`,
      milestones: [
        "Establish Safety Review Board",
        "Document current AI system inventory",
        "Create AI governance policy",
        "Define incident response procedures",
      ],
      resourceRequirements: [
        "Safety Officer or Chief AI Officer",
        "Legal/Compliance team (20% FTE)",
        "Documentation tools",
        "Internal audit capability",
      ],
      estimatedCost: [
        Math.round(totalCost[0] * 0.15),
        Math.round(totalCost[1] * 0.15),
      ],
      keyActivities: [
        "Stakeholder interviews",
        "Current state assessment",
        "Gap analysis workshop",
        "Policy development",
      ],
      successCriteria: [
        "Governance policies documented",
        "Roles and responsibilities defined",
        "Review board established and meeting monthly",
      ],
    });
  }

  // Phase 2: Core Implementation
  const phase2Duration = Math.ceil(timeline * 0.35);
  phases.push({
    phase: phases.length + 1,
    title: "Core Implementation (Data, Model, Deployment)",
    duration: `${phase2Duration} weeks`,
    milestones: [
      "Data quality framework implemented",
      "Model evaluation pipeline established",
      "Safety testing suite created",
      "Deployment controls configured",
    ],
    resourceRequirements: [
      "AI/ML Engineers (2-4 FTE)",
      "Data Scientists (1-2 FTE)",
      "DevOps/Infrastructure (1 FTE)",
      "QA/Testing resources (1-2 FTE)",
    ],
    estimatedCost: [
      Math.round(totalCost[0] * 0.35),
      Math.round(totalCost[1] * 0.35),
    ],
    keyActivities: [
      "Data lineage mapping",
      "Bias detection implementation",
      "Safety test development",
      "Control system deployment",
    ],
    successCriteria: [
      "All systems instrumented for monitoring",
      "Safety tests passing 100%",
      "Zero unmonitored data pipelines",
    ],
  });

  // Phase 3: Audit Preparation (for T2+)
  if (input.targetTier !== "T1") {
    const phase3Duration = Math.ceil(timeline * 0.25);
    phases.push({
      phase: phases.length + 1,
      title: `Pre-Audit Preparation (${input.targetTier} Audit Ready)`,
      duration: `${phase3Duration} weeks`,
      milestones: [
        "Audit readiness assessment",
        "Documentation package compiled",
        "Internal audit completed",
        "Auditor engagement",
      ],
      resourceRequirements: [
        "Project Manager (1 FTE)",
        "Compliance Specialist (1 FTE)",
        "Audit Coordinator (0.5 FTE)",
      ],
      estimatedCost: [
        Math.round(totalCost[0] * 0.15),
        Math.round(totalCost[1] * 0.15),
      ],
      keyActivities: [
        "Self-audit execution",
        "Evidence collection",
        "Remediation of findings",
        "Auditor kickoff meeting",
      ],
      successCriteria: [
        "All audit evidence compiled",
        "Self-audit completion with <5 major findings",
        "Auditor engagement letter signed",
      ],
    });
  }

  // Phase 4: Monitoring Setup (for T3+)
  if (input.targetTier === "T3" || input.targetTier === "T4") {
    const phase4Duration = Math.ceil(timeline * 0.15);
    phases.push({
      phase: phases.length + 1,
      title: "Continuous Monitoring Infrastructure",
      duration: `${phase4Duration} weeks`,
      milestones: [
        "Monitoring platform deployment",
        "Alert rules configured",
        "Dashboard creation",
        "Escalation procedures established",
      ],
      resourceRequirements: [
        "DevOps/Platform Engineer (1 FTE)",
        "Data Engineer (1 FTE)",
        "Monitoring Specialist (0.5 FTE)",
      ],
      estimatedCost: [
        Math.round(totalCost[0] * 0.2),
        Math.round(totalCost[1] * 0.2),
      ],
      keyActivities: [
        "Platform selection and deployment",
        "Metric definition",
        "Alert threshold tuning",
        "Runbook creation",
      ],
      successCriteria: [
        "All systems monitored in real-time",
        "Dashboard updated every 5 minutes",
        "Alert SLA < 15 minutes",
      ],
    });
  }

  // Phase 5: Byzantine Council (for T4)
  if (input.targetTier === "T4") {
    phases.push({
      phase: phases.length + 1,
      title: "Byzantine Council Review (33-LLM Consensus)",
      duration: "8 weeks",
      milestones: [
        "Dossier preparation complete",
        "Council panel assignment",
        "Individual evaluations completed",
        "Consensus deliberation",
        "Final decision announcement",
      ],
      resourceRequirements: [
        "T4 Coordinator (1 FTE)",
        "Technical Writer (0.5 FTE)",
        "Chief AI Officer (20% time)",
      ],
      estimatedCost: [
        Math.round(totalCost[0] * 0.15),
        Math.round(totalCost[1] * 0.15),
      ],
      keyActivities: [
        "Comprehensive dossier compilation",
        "Judge panel selection",
        "Independent evaluations",
        "Deliberation facilitation",
      ],
      successCriteria: [
        "22/33 supermajority achieved",
        "Consensus decision documented",
        "T4 certificate issued",
      ],
    });
  }

  return {
    organizationProfile: {
      size: input.organizationSize,
      sector: input.sector,
      currentMaturity: input.currentMaturityLevel,
      targetTier: input.targetTier,
    },
    totalDuration: `${timeline} weeks (approximately ${Math.ceil(timeline / 4)} months)`,
    totalEstimatedCost: totalCost,
    phases,
    riskFactors: [
      "Resource availability and skill gaps",
      "Legacy system integration challenges",
      "Third-party audit scheduling constraints",
      "Data complexity and volume",
      input.targetTier === "T4"
        ? "Byzantine Council consensus achievement"
        : null,
    ].filter(Boolean) as string[],
    criticalSuccessFactors: [
      "Executive sponsorship and commitment",
      "Cross-functional team alignment",
      "Clear incident response procedures",
      "Adequate budget and resource allocation",
      "Regular status tracking and course correction",
      input.targetTier === "T4"
        ? "Demonstrated track record of zero critical incidents"
        : null,
    ].filter(Boolean) as string[],
  };
}

/**
 * Generate audit checklist
 */
export function generateAuditChecklist(
  input: AuditChecklistInput
): AuditChecklist {
  const checklistItems: Record<string, ChecklistItem[]> = {
    governance: [
      {
        id: "gov_001",
        category: "Governance",
        item: "AI Safety Review Board Established",
        description:
          "Executive-level board with documented charter, meeting minutes, and decision tracking",
        evidence: [
          "Board charter document",
          "Meeting minutes (last 6 months)",
          "Member list with roles",
          "Decision log",
        ],
        tier: ["T1", "T2", "T3", "T4"],
      },
      {
        id: "gov_002",
        category: "Governance",
        item: "Incident Response Plan",
        description: "Documented procedures for AI-related incidents with clear escalation paths",
        evidence: [
          "Incident response plan (v2+)",
          "Escalation matrix",
          "Communication templates",
          "Incident drills conducted",
        ],
        tier: ["T2", "T3", "T4"],
      },
      {
        id: "gov_003",
        category: "Governance",
        item: "Compliance Tracking System",
        description: "System to track compliance status across all AI systems",
        evidence: [
          "System access log",
          "Compliance dashboard screenshots",
          "Audit trail reports",
        ],
        tier: ["T2", "T3", "T4"],
      },
    ],
    data: [
      {
        id: "data_001",
        category: "Data",
        item: "Data Lineage Documentation",
        description: "Complete documentation of data provenance from source through model training",
        evidence: [
          "Data lineage diagrams",
          "Source system documentation",
          "Processing pipeline code",
          "Training data manifest",
        ],
        tier: ["T2", "T3", "T4"],
      },
      {
        id: "data_002",
        category: "Data",
        item: "Bias Detection Process",
        description: "Automated detection of biases in training and evaluation data",
        evidence: [
          "Bias detection tool documentation",
          "Monthly bias reports",
          "Remediation actions taken",
          "Benchmark test results",
        ],
        tier: ["T2", "T3", "T4"],
      },
      {
        id: "data_003",
        category: "Data",
        item: "Data Quality Metrics",
        description: "Defined metrics for data quality with monitoring and alerting",
        evidence: [
          "Quality metrics definition",
          "Monitoring dashboard",
          "Alert configuration",
          "Alert response logs",
        ],
        tier: ["T3", "T4"],
      },
    ],
    model: [
      {
        id: "model_001",
        category: "Model",
        item: "Safety Testing Framework",
        description: "Comprehensive safety testing including adversarial examples and edge cases",
        evidence: [
          "Test suite documentation",
          "Test execution logs",
          "Failure analysis reports",
          "Test coverage metrics",
        ],
        tier: ["T2", "T3", "T4"],
      },
      {
        id: "model_002",
        category: "Model",
        item: "Failure Mode Analysis (FMEA)",
        description: "Systematic analysis of potential failure modes and mitigation strategies",
        evidence: [
          "FMEA document",
          "Risk assessment matrix",
          "Mitigation plan",
          "Mitigation verification",
        ],
        tier: ["T2", "T3", "T4"],
      },
      {
        id: "model_003",
        category: "Model",
        item: "Model Interpretability",
        description: "Mechanisms to explain model decisions and understand behavior",
        evidence: [
          "Interpretability method documentation",
          "Example explanations",
          "User testing results",
          "Limitation documentation",
        ],
        tier: ["T3", "T4"],
      },
    ],
    deployment: [
      {
        id: "deploy_001",
        category: "Deployment",
        item: "Runtime Monitoring System",
        description: "Real-time monitoring of model performance and anomalies",
        evidence: [
          "Monitoring system documentation",
          "Dashboard screenshots",
          "Alert configuration",
          "Monthly reports",
        ],
        tier: ["T2", "T3", "T4"],
      },
      {
        id: "deploy_002",
        category: "Deployment",
        item: "Access Control Framework",
        description: "Granular access controls with role-based permissions and audit logging",
        evidence: [
          "Access control policy",
          "Role definitions",
          "User access list",
          "Audit logs (sample)",
        ],
        tier: ["T2", "T3", "T4"],
      },
      {
        id: "deploy_003",
        category: "Deployment",
        item: "Automated Safeguards",
        description: "Rate limiting, input validation, and automatic degradation",
        evidence: [
          "Safeguard implementation code",
          "Configuration parameters",
          "Test results",
          "Incident response logs",
        ],
        tier: ["T3", "T4"],
      },
    ],
    monitoring: [
      {
        id: "mon_001",
        category: "Monitoring",
        item: "Performance Dashboard",
        description: "Real-time dashboard for system performance and safety metrics",
        evidence: [
          "Dashboard screenshots",
          "Metric definitions",
          "Update frequency logs",
          "User access logs",
        ],
        tier: ["T3", "T4"],
      },
      {
        id: "mon_002",
        category: "Monitoring",
        item: "Anomaly Detection",
        description: "Automated detection of anomalies with alert escalation",
        evidence: [
          "Algorithm documentation",
          "Threshold configuration",
          "Monthly alerts",
          "Alert response logs",
        ],
        tier: ["T3", "T4"],
      },
      {
        id: "mon_003",
        category: "Monitoring",
        item: "Quarterly Reassessment",
        description: "Scheduled reassessments with documented findings and actions",
        evidence: [
          "Reassessment schedule",
          "Completed assessments (3+)",
          "Finding summaries",
          "Remediation tracking",
        ],
        tier: ["T3", "T4"],
      },
    ],
  };

  // Filter items by tier
  const tierChecklist: Record<string, ChecklistItem[]> = {};
  for (const [category, items] of Object.entries(checklistItems)) {
    tierChecklist[category] = items.filter((item) =>
      item.tier.includes(input.tier)
    );
  }

  // Calculate total items
  let totalItems = 0;
  for (const items of Object.values(tierChecklist)) {
    totalItems += items.length;
  }

  // Estimate completion hours (5 hours per item average)
  const estimatedCompletionHours = totalItems * 5;

  return {
    tier: input.tier,
    sector: input.sector,
    systemType: input.aiSystemType,
    generatedDate: new Date().toISOString().split("T")[0],
    sections: tierChecklist,
    estimatedCompletionHours,
    totalItems,
  };
}

/**
 * Generate quick compliance score
 */
export function generateQuickScore(input: QuickScoreInput): QuickScoreResult {
  let score = 0;
  const maxScore = 100;
  const answerCount = Object.keys(input.answers).length;

  // Score each answer
  for (const [key, value] of Object.entries(input.answers)) {
    if (typeof value === "boolean") {
      score += value ? 10 : 0;
    } else if (typeof value === "number") {
      // Normalize numeric values to 0-10 scale
      score += Math.min(10, Math.max(0, value));
    } else if (typeof value === "string") {
      const strValue = value.toLowerCase();
      if (
        strValue === "yes" ||
        strValue === "true" ||
        strValue === "documented"
      ) {
        score += 10;
      } else if (
        strValue === "partial" ||
        strValue === "in-progress" ||
        strValue === "partial"
      ) {
        score += 5;
      }
    }
  }

  // Normalize to 0-100
  const normalizedScore = Math.round(
    answerCount > 0 ? (score / (answerCount * 10)) * 100 : 0
  );

  // Determine qualifying tier
  let qualifyingTier: CertificationTier;
  if (normalizedScore >= 90) {
    qualifyingTier = "T4";
  } else if (normalizedScore >= 80) {
    qualifyingTier = "T3";
  } else if (normalizedScore >= 65) {
    qualifyingTier = "T2";
  } else {
    qualifyingTier = "T1";
  }

  // Identify top gaps
  const gapAreas = [
    { area: "Governance", missing: !input.answers["governance_board"] },
    { area: "Data Quality", missing: !input.answers["data_lineage"] },
    { area: "Model Safety", missing: !input.answers["safety_testing"] },
    { area: "Deployment Controls", missing: !input.answers["deployment_monitoring"] },
    { area: "Continuous Monitoring", missing: !input.answers["continuous_monitoring"] },
  ];

  const gaps = gapAreas
    .filter((g) => g.missing)
    .slice(0, 3)
    .map((g) => ({
      area: g.area,
      gap: `${g.area} framework not fully implemented or documented`,
    }));

  // Generate recommendations
  const recommendations = [
    qualifyingTier === "T1"
      ? "Start with T1 self-assessment to establish baseline compliance"
      : qualifyingTier === "T2"
        ? "Engage CASA-accredited auditor for T2 third-party audit"
        : qualifyingTier === "T3"
          ? "Implement continuous monitoring systems and schedule quarterly reassessments"
          : "Prepare comprehensive dossier and apply for Byzantine Council review",
    `Prioritize remediating the ${gaps.length} identified gaps`,
    "Establish monthly compliance review meetings with stakeholders",
  ];

  return {
    score: normalizedScore,
    percentage: `${normalizedScore}%`,
    qualifyingTier,
    gaps,
    recommendations,
  };
}

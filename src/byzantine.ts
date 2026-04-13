import { ByzantineSimulateInput, ByzantineResult } from "./schemas.js";

interface JudgeProfile {
  id: string;
  name: string;
  specialty: string;
  orientation: "strict" | "balanced" | "pragmatic";
}

/**
 * Generate diverse judge panel
 */
function generateJudgePanel(numJudges: number): JudgeProfile[] {
  const names = [
    "Atlas",
    "Pythia",
    "Harmony",
    "Sentinel",
    "Veritas",
    "Meridian",
    "Compass",
    "Nexus",
    "Oracle",
    "Summit",
    "Beacon",
    "Pinnacle",
    "Clarity",
    "Resonance",
    "Zenith",
    "Sage",
    "Witness",
    "Guardian",
    "Arbiter",
    "Keeper",
    "Architect",
    "Auditor",
    "Custodian",
    "Overseer",
    "Watchdog",
    "Examiner",
    "Inspector",
    "Analyst",
    "Evaluator",
    "Assessor",
    "Reviewer",
    "Appraiser",
    "Judge",
  ];

  const specialties = [
    "AI Safety",
    "Ethics & Governance",
    "Data Science",
    "Security",
    "Compliance",
    "Risk Assessment",
    "Technical Evaluation",
    "Alignment Research",
    "Systems Safety",
    "Responsible AI",
  ];

  const orientations: Array<"strict" | "balanced" | "pragmatic"> = [
    "strict",
    "balanced",
    "pragmatic",
  ];

  const judges: JudgeProfile[] = [];
  for (let i = 0; i < numJudges; i++) {
    judges.push({
      id: `judge_${i + 1}`,
      name: names[i % names.length],
      specialty: specialties[i % specialties.length],
      orientation: orientations[i % 3],
    });
  }

  return judges;
}

/**
 * Simulate individual judge evaluation based on assessment data
 */
function evaluateAsJudge(
  judge: JudgeProfile,
  assessmentData: Record<string, unknown>
): {
  vote: "approve" | "reject" | "abstain";
  reasoning: string;
  confidence: number;
} {
  // Extract assessment metrics from data
  let complianceScore = 0;
  let riskLevel = "moderate";
  let incidentHistory = "clean";

  if (typeof assessmentData.complianceScore === "number") {
    complianceScore = assessmentData.complianceScore;
  }

  if (typeof assessmentData.riskLevel === "string") {
    riskLevel = assessmentData.riskLevel;
  }

  if (typeof assessmentData.incidentHistory === "string") {
    incidentHistory = assessmentData.incidentHistory;
  }

  // Base approval threshold by judge orientation
  const thresholds = {
    strict: 92,
    balanced: 80,
    pragmatic: 70,
  };

  const threshold = thresholds[judge.orientation];

  // Incident history factor
  const incidentPenalty = incidentHistory === "critical" ? 15 : incidentHistory === "serious" ? 8 : 0;
  const adjustedScore = complianceScore - incidentPenalty;

  // Risk level factor
  const riskPenalty =
    riskLevel === "critical" ? 10 : riskLevel === "high" ? 5 : 0;
  const finalScore = adjustedScore - riskPenalty;

  // Determine vote
  let vote: "approve" | "reject" | "abstain";
  let confidence: number;
  let reasoning = "";

  if (finalScore >= threshold) {
    vote = "approve";
    confidence = Math.min(100, finalScore);
    reasoning = `${judge.name} (${judge.specialty}) approves certification. Score ${finalScore.toFixed(1)} meets ${judge.orientation} threshold of ${threshold}. System demonstrates adequate safety controls and compliance measures.`;
  } else if (finalScore >= threshold - 10) {
    vote = "abstain";
    confidence = Math.abs(finalScore - threshold) / 10;
    reasoning = `${judge.name} (${judge.specialty}) abstains from decision. Score ${finalScore.toFixed(1)} is near threshold. Recommends targeted remediation before resubmission.`;
  } else {
    vote = "reject";
    confidence = Math.max(50, Math.min(100, 100 - finalScore));
    reasoning = `${judge.name} (${judge.specialty}) rejects certification. Score ${finalScore.toFixed(1)} falls below ${judge.orientation} threshold of ${threshold}. Critical gaps in ${judge.specialty.toLowerCase()} require remediation.`;
  }

  return { vote, reasoning, confidence };
}

/**
 * Simulate Byzantine Council consensus process
 */
export function simulateByzantineCouncil(
  input: ByzantineSimulateInput
): ByzantineResult {
  const numJudges = input.numJudges || 33;
  const requiredSupermajority = Math.ceil((numJudges * 2) / 3); // 22/33

  // Generate judge panel
  const judges = generateJudgePanel(numJudges);

  // Collect all votes
  const votes: Record<string, number> = {
    approve: 0,
    reject: 0,
    abstain: 0,
  };

  const dissentingOpinions: string[] = [];
  const deliberationNotes: string[] = [];

  let approvalCount = 0;
  let rejectionCount = 0;
  let abstainCount = 0;

  // Each judge evaluates
  for (const judge of judges) {
    const evaluation = evaluateAsJudge(judge, input.assessmentData);

    votes[evaluation.vote]++;

    if (evaluation.vote === "approve") {
      approvalCount++;
    } else if (evaluation.vote === "reject") {
      rejectionCount++;
      dissentingOpinions.push(evaluation.reasoning);
    } else {
      abstainCount++;
    }

    deliberationNotes.push(evaluation.reasoning);
  }

  // Determine consensus
  const consensus = approvalCount >= requiredSupermajority;
  const consensusDecision = consensus
    ? "APPROVED FOR T4 CERTIFICATION"
    : rejectionCount >= requiredSupermajority
      ? "REJECTED - REMEDIATION REQUIRED"
      : "CONSENSUS NOT ACHIEVED - RESUBMIT AFTER REMEDIATION";

  // Calculate confidence score
  const maxVotes = Math.max(approvalCount, rejectionCount);
  const confidenceScore =
    (maxVotes / (numJudges - abstainCount)) * 100;

  return {
    votes,
    consensus,
    consensusDecision,
    supermajority: {
      achieved: approvalCount >= requiredSupermajority,
      votesFor: approvalCount,
      votesAgainst: rejectionCount,
      abstained: abstainCount,
      required: requiredSupermajority,
    },
    confidenceScore: Math.round(confidenceScore),
    dissentingOpinions: dissentingOpinions.slice(0, 5), // Top 5 dissenting opinions
    deliberationNotes: deliberationNotes.slice(0, 10), // Sample of deliberation notes
  };
}

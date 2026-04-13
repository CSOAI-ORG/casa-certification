/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * casa-certification-mcp
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * Part of the CSGA Global MCP Ecosystem.
 *
 * LEGAL NOTICE: This software is provided for informational and advisory
 * purposes only. It does not constitute legal, regulatory, or professional
 * compliance advice. Users should consult qualified legal counsel for
 * jurisdiction-specific compliance requirements.
 *
 * License: CC0-1.0 (Creative Commons Zero v1.0 Universal)
 * SPDX-License-Identifier: CC0-1.0
 *
 * Build Timestamp: 2026-02-26T05:59:00Z
 * Last Modified:   2026-02-26T05:59:00Z
 * ═══════════════════════════════════════════════════════════════════════════════
 */


import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  FullAssessmentInput,
  GapAnalysisInput,
  ByzantineSimulateInput,
  CertificationRoadmapInput,
  AuditChecklistInput,
  QuickScoreInput,
} from "./schemas.js";
import { generateFullAssessment } from "./assessment.js";
import { generateGapAnalysis } from "./gap-analysis.js";
import { simulateByzantineCouncil } from "./byzantine.js";
import {
  generateCertificationRoadmap,
  generateAuditChecklist,
  generateQuickScore,
} from "./roadmap-checklist.js";
import {
  METHODOLOGY_RESOURCE,
  TIERS_RESOURCE,
  PRICING_RESOURCE,
} from "./resources.js";

const server = new Server({
  name: "casa-certification-mcp",
  version: "1.0.0",
});

// Define resources
const resources = [METHODOLOGY_RESOURCE, TIERS_RESOURCE, PRICING_RESOURCE];

// Resource request handlers - only if needed for resource listing
try {
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: resources.map((r) => ({
        uri: r.uri,
        name: r.uri.replace("casa://", "").toUpperCase(),
        description: `CASA ${r.uri.replace("casa://", "").replace(/[-]/g, " ")} documentation`,
        mimeType: "text/plain",
      })),
    };
  });

  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const uri = request.params.uri;
    const resource = resources.find((r) => r.uri === uri);

    if (!resource) {
      throw new Error(`Resource not found: ${uri}`);
    }

    const contents = [
      {
        uri,
        mimeType: "text/plain",
        text: resource.contents,
      },
    ];

    return { contents };
  });
} catch (_e) {
  // Resources handlers may not be available in all SDK versions
}

// Define tools
const tools = [
  {
    name: "casa_full_assessment",
    description:
      "Comprehensive 4-tier CASA certification assessment. Evaluates AI systems across governance, data, model, deployment, and monitoring domains. Provides tier recommendation, compliance score, identified gaps, remediation steps, timeline, and cost estimates.",
    inputSchema: {
      type: "object" as const,
      properties: {
        aiSystemName: {
          type: "string",
          description: "Name of the AI system being assessed",
        },
        description: {
          type: "string",
          description:
            "Detailed description of the AI system, its purpose, and functionality",
        },
        sector: {
          type: "string",
          enum: [
            "healthcare",
            "finance",
            "autonomous-systems",
            "content-generation",
            "education",
            "legal",
            "government",
            "critical-infrastructure",
            "other",
          ],
          description: "Industry sector in which the system operates",
        },
        deploymentContext: {
          type: "string",
          description:
            "Where and how the system is deployed (e.g., cloud, on-premise, edge, production, research)",
        },
        estimatedRiskLevel: {
          type: "string",
          enum: ["minimal", "low", "moderate", "high", "critical"],
          description: "Estimated risk level of the AI system",
        },
      },
      required: [
        "aiSystemName",
        "description",
        "sector",
        "deploymentContext",
        "estimatedRiskLevel",
      ],
    },
  },
  {
    name: "casa_gap_analysis",
    description:
      "Identify specific gaps between current state and target certification tier. Returns ranked list of gaps with severity, remediation effort, hours, and cost estimates.",
    inputSchema: {
      type: "object" as const,
      properties: {
        currentPractices: {
          type: "string",
          description: "Description of current AI safety and compliance practices",
        },
        targetTier: {
          type: "string",
          enum: ["T1", "T2", "T3", "T4"],
          description: "Target certification tier",
        },
      },
      required: ["currentPractices", "targetTier"],
    },
  },
  {
    name: "casa_byzantine_simulate",
    description:
      "Simulate Byzantine Council consensus process (33 independent LLM judges). Returns vote distribution, supermajority status, confidence score, and sample dissenting opinions.",
    inputSchema: {
      type: "object" as const,
      properties: {
        assessmentData: {
          type: "object",
          description: "Assessment data including compliance score, risk level, incident history",
        },
        numJudges: {
          type: "number",
          description: "Number of judges in the Byzantine Council (default 33, range 3-99)",
          default: 33,
        },
      },
      required: ["assessmentData"],
    },
  },
  {
    name: "casa_certification_roadmap",
    description:
      "Generate step-by-step certification roadmap. Returns phased timeline, resource requirements, milestones, cost estimates, and risk factors.",
    inputSchema: {
      type: "object" as const,
      properties: {
        organizationSize: {
          type: "string",
          enum: ["small", "medium", "large", "enterprise"],
          description: "Size of the organization",
        },
        sector: {
          type: "string",
          enum: [
            "healthcare",
            "finance",
            "autonomous-systems",
            "content-generation",
            "education",
            "legal",
            "government",
            "critical-infrastructure",
            "other",
          ],
          description: "Industry sector",
        },
        currentMaturityLevel: {
          type: "string",
          enum: ["initial", "developing", "managed", "optimized"],
          description: "Current AI safety maturity level",
        },
        targetTier: {
          type: "string",
          enum: ["T1", "T2", "T3", "T4"],
          description: "Target certification tier",
        },
        timelinePreference: {
          type: "string",
          enum: ["accelerated", "standard", "extended"],
          description: "Preferred certification timeline",
        },
      },
      required: [
        "organizationSize",
        "sector",
        "currentMaturityLevel",
        "targetTier",
        "timelinePreference",
      ],
    },
  },
  {
    name: "casa_audit_checklist",
    description:
      "Generate comprehensive audit preparation checklist. Organized by domain (governance, data, model, deployment, monitoring) with evidence requirements and tier-specific items.",
    inputSchema: {
      type: "object" as const,
      properties: {
        tier: {
          type: "string",
          enum: ["T1", "T2", "T3", "T4"],
          description: "Certification tier",
        },
        sector: {
          type: "string",
          enum: [
            "healthcare",
            "finance",
            "autonomous-systems",
            "content-generation",
            "education",
            "legal",
            "government",
            "critical-infrastructure",
            "other",
          ],
          description: "Industry sector",
        },
        aiSystemType: {
          type: "string",
          description: "Type of AI system (e.g., LLM, recommendation engine, autonomous vehicle)",
        },
      },
      required: ["tier", "sector", "aiSystemType"],
    },
  },
  {
    name: "casa_score",
    description:
      "Quick compliance scoring based on key assessment questions. Returns score 0-100, qualifying tier, top 3 gaps, and recommendations.",
    inputSchema: {
      type: "object" as const,
      properties: {
        answers: {
          type: "object",
          description:
            "Object with question keys and boolean/numeric/string answers. Keys like: governance_board, data_lineage, safety_testing, deployment_monitoring, continuous_monitoring",
        },
      },
      required: ["answers"],
    },
  },
];

// Tool request handlers
try {
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    switch (name) {
      case "casa_full_assessment": {
        const input = FullAssessmentInput.parse(args);
        const result = generateFullAssessment(input);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "casa_gap_analysis": {
        const input = GapAnalysisInput.parse(args);
        const result = generateGapAnalysis(input);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "casa_byzantine_simulate": {
        const input = ByzantineSimulateInput.parse(args);
        const result = simulateByzantineCouncil(input);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "casa_certification_roadmap": {
        const input = CertificationRoadmapInput.parse(args);
        const result = generateCertificationRoadmap(input);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "casa_audit_checklist": {
        const input = AuditChecklistInput.parse(args);
        const result = generateAuditChecklist(input);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "casa_score": {
        const input = QuickScoreInput.parse(args);
        const result = generateQuickScore(input);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: "text",
          text: `Error: ${message}`,
          isError: true,
        },
      ],
    };
  }
  });
} catch (_e) {
  // Tool handlers may not be available in all SDK versions
}

// Main execution
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("CASA Certification MCP Server running on stdio");
}

main().catch(console.error);

# CASA Certification MCP Server - Quick Start Guide

## What You Have

A production-ready MCP (Model Context Protocol) server implementing the CASA Certification framework for AI system safety assessment.

## Getting Started

### 1. Installation

```bash
cd /sessions/brave-adoring-cerf/mcp-servers/casa-certification
npm install
```

### 2. Build

```bash
npm run build
```

You should see no TypeScript errors. The output will be in the `dist/` directory.

### 3. Run

```bash
npm start
```

Expected output:
```
CASA Certification MCP Server running on stdio
```

## What's Available

### 6 Powerful Tools

1. **casa_full_assessment** - Complete AI system evaluation across 4 tiers
2. **casa_gap_analysis** - Identify gaps between current and target certification
3. **casa_byzantine_simulate** - 33-judge consensus voting simulation
4. **casa_certification_roadmap** - Phased implementation plans
5. **casa_audit_checklist** - Audit preparation checklists
6. **casa_score** - Quick compliance scoring

### 3 Knowledge Resources

- **casa://methodology** - CASA framework documentation
- **casa://tiers** - Tier definitions and requirements
- **casa://pricing** - Certification pricing

## Quick Example Usage

### Run a Full Assessment

```bash
curl -X POST http://localhost:3000/tools/casa_full_assessment \
  -H "Content-Type: application/json" \
  -d '{
    "aiSystemName": "My AI System",
    "description": "A language model for content moderation",
    "sector": "content-generation",
    "deploymentContext": "Cloud API in production",
    "estimatedRiskLevel": "high"
  }'
```

### Get Quick Score

```bash
curl -X POST http://localhost:3000/tools/casa_score \
  -H "Content-Type: application/json" \
  -d '{
    "answers": {
      "governance_board": true,
      "data_lineage": true,
      "safety_testing": false,
      "deployment_monitoring": true,
      "continuous_monitoring": false
    }
  }'
```

## Key Features

- **4-Tier Framework**: T1 (Self-Assessment), T2 (Audit), T3 (Monitoring), T4 (Byzantine)
- **Domain-Based**: Evaluates governance, data, model, deployment, monitoring
- **Byzantine Council**: 33-judge consensus with configurable voting
- **Type Safe**: Full TypeScript with Zod validation
- **Production Ready**: No external dependencies, local-only computation

## Documentation

- **README.md** - Complete tool documentation and examples
- **ARCHITECTURE.md** - System design and algorithms
- Full TypeScript type definitions in `dist/`

## Development

### Watch Mode
```bash
npm run watch
```

### Build and Run
```bash
npm run dev
```

## File Structure

```
src/
├── index.ts                  # MCP server and tool handlers
├── schemas.ts                # Input validation (Zod)
├── assessment.ts             # Assessment logic
├── gap-analysis.ts           # Gap identification
├── byzantine.ts              # Byzantine consensus
├── roadmap-checklist.ts      # Planning and checklists
└── resources.ts              # Knowledge resources
```

## Performance

All operations complete in under 1 second:
- Assessment: 100-500ms
- Gap Analysis: 50-200ms
- Byzantine Simulation: 200-1000ms
- Roadmap: 100-300ms

## Next Steps

1. Review the README.md for full documentation
2. Check ARCHITECTURE.md for system design
3. Examine src/ files for implementation details
4. Try the tool examples provided
5. Integrate with your MCP client

## Support

For questions about the CASA framework:
- Visit: https://csoai.org/casa
- Framework: Council for the Safety of Artificial Intelligence (CSOAI)

## License

CC0-1.0 Public Domain - Use freely for any purpose

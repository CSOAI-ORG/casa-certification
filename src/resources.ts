export const CASA_METHODOLOGY = `
# CASA Certification Methodology

## Overview
CASA (CSOAI-Authorised Safety Assessment) is a comprehensive framework for certifying AI systems
with respect to safety, alignment, and responsible deployment. The methodology employs a tiered
approach with increasing rigor and external scrutiny.

## Core Principles

### 1. Risk-Based Assessment
Assessment scope and rigor scale with the AI system's risk level and deployment context.

### 2. Transparency and Documentation
All assessment processes emphasize clear documentation of:
- System capabilities and limitations
- Data sources and training methodologies
- Safety measures and controls
- Testing results and edge cases

### 3. Continuous Assurance
Certification is not a one-time event. Systems require ongoing monitoring and periodic reassessment
to maintain certification validity.

### 4. Multi-Stakeholder Review
Higher tiers involve independent auditors and community-level review to ensure impartiality.

## Assessment Domains

### Governance Domain
- Clear organizational responsibility structure
- Safety and ethics review processes
- Incident response procedures
- Compliance tracking mechanisms

### Data Domain
- Data source documentation
- Quality assurance procedures
- Bias detection and mitigation
- Privacy and security controls
- Retention and deletion policies

### Model Domain
- Training methodology documentation
- Evaluation against safety benchmarks
- Failure mode analysis
- Alignment verification
- Interpretability assessment

### Deployment Domain
- System monitoring capabilities
- Rate limiting and resource controls
- User access controls
- Audit logging
- Graceful degradation mechanisms

### Monitoring Domain
- Real-time performance tracking
- Anomaly detection systems
- Regular reassessment schedules
- Feedback mechanisms
- Incident tracking

## Scoring Methodology

Assessments assign points (0-100) across five domains:
- Governance: 20 points maximum
- Data: 20 points maximum
- Model: 20 points maximum
- Deployment: 20 points maximum
- Monitoring: 20 points maximum

Minimum scores required for each tier:
- T1: 40 points (basic compliance)
- T2: 65 points (advanced compliance)
- T3: 80 points (continuous monitoring)
- T4: 90 points (Byzantine consensus approval)
`;

export const TIER_DEFINITIONS = `
# CASA Certification Tiers

## Tier 1: Self-Assessment (T1)

### Overview
Internal assessment conducted by the AI system's organization with structured guidance.

### Requirements
- Minimum compliance score: 40/100
- Documented self-assessment across all five domains
- Clear gap identification
- Basic safety controls in place
- Incident reporting mechanism established

### Duration
- Assessment time: 2-6 weeks
- Certification validity: 6 months
- Cost: $5,000 - $15,000

### Process
1. Organization completes structured assessment questionnaire
2. Internal review of all five domains
3. Documentation of findings
4. Gap analysis and remediation planning
5. Self-attestation of compliance

## Tier 2: Third-Party Audit (T2)

### Overview
Independent third-party auditor conducts comprehensive evaluation with audit reports.

### Requirements
- Minimum compliance score: 65/100
- Third-party audit by CASA-accredited auditor
- Detailed audit report with findings
- Remediation plan for identified gaps
- Quarterly self-audit reports

### Duration
- Assessment time: 8-16 weeks
- Certification validity: 12 months
- Cost: $25,000 - $75,000

### Process
1. Pre-audit documentation review
2. On-site assessment (if applicable)
3. Deep-dive domain evaluations
4. Testing and validation procedures
5. Audit report generation
6. Remediation plan agreement

## Tier 3: Continuous Monitoring (T3)

### Overview
Ongoing surveillance with periodic audits, real-time monitoring systems, and quarterly assessments.

### Requirements
- Minimum compliance score: 80/100
- Real-time monitoring dashboard implementation
- Quarterly reassessment schedule
- Incident reporting SLA < 24 hours
- Automated compliance tracking
- Monthly audit trail reviews

### Duration
- Initial assessment: 12-20 weeks
- Certification validity: 18 months (with continuous monitoring)
- Cost: $75,000 - $200,000/year

### Process
1. Initial comprehensive audit (like T2)
2. Monitoring infrastructure deployment
3. Real-time metrics collection
4. Automated alert systems
5. Quarterly touch-base assessments
6. Continuous improvement tracking

## Tier 4: Byzantine Council Review (T4)

### Overview
Highest tier: System reviewed by a Byzantine Council (consensus of 33+ independent LLM judges)
using supermajority voting (22/33 required).

### Requirements
- Minimum compliance score: 90/100
- All T3 requirements maintained
- Successful Byzantine Council consensus (22/33 supermajority)
- Demonstrated zero critical incidents in 12 months
- Community peer review (optional but recommended)
- Continuous monitoring with < 4-hour incident response

### Duration
- Preparation: 20-32 weeks
- Council review: 4-8 weeks
- Certification validity: 24 months (with continuous monitoring)
- Cost: $200,000 - $500,000+

### Process
1. Complete T3 certification first
2. Prepare comprehensive dossier
3. Byzantine Council review assignment (33 independent LLM judges)
4. Each judge conducts independent evaluation
5. Supermajority voting on certification
6. Consensus decision documented
7. Ongoing T3 monitoring maintained

## Byzantine Council Process

### Judge Selection
- 33 independent LLM systems with diverse training
- No single organization controls > 25% of judges
- Geographic and institutional diversity
- Rotating judge selection to prevent collusion

### Voting Mechanics
- Simple majority vote needed for recommendation (17/33)
- Supermajority required for certification (22/33)
- Judges can abstain if insufficient information
- Dissenting opinions documented

### Deliberation
- Each judge reviews system documentation independently
- Structured evaluation rubric ensures consistency
- Judges present findings and reasoning
- Deliberation period (1 week minimum)
- Final vote with supermajority needed

### Appeal Process
- If consensus not achieved, specific gaps identified
- Organization can remediate and resubmit
- Different judge panel for appeal review
- Maximum 2 appeals per certification attempt
`;

export const PRICING_STRUCTURE = `
# CASA Certification Pricing

## Tier 1: Self-Assessment (T1)
- Base assessment: $5,000
- Extended assessment (>3 domains): +$2,500
- Gap analysis report: +$1,500
- Maximum total: $15,000
- Validity period: 6 months

## Tier 2: Third-Party Audit (T2)
- Audit (40-60 hours): $25,000 - $35,000
- Detailed report generation: +$5,000
- Remediation support: +$10,000
- Quarterly follow-ups (4/year): +$5,000 each ($20,000/year)
- Maximum initial: $75,000
- Annual maintenance: $20,000 - $30,000
- Validity period: 12 months

## Tier 3: Continuous Monitoring (T3)
- Initial T3 audit: $75,000 - $100,000
- Monitoring dashboard setup: $15,000 - $25,000
- Monthly monitoring: $5,000 - $8,000
- Quarterly assessments: $10,000 each ($40,000/year)
- Annual baseline: $75,000 - $200,000
- Validity period: 18 months (with continuous monitoring)

## Tier 4: Byzantine Council Review (T4)
- Preparation and dossier: $50,000 - $75,000
- Council review (33 judges): $100,000 - $200,000
- Consensus coordination: $25,000 - $50,000
- Post-certification support: $25,000 - $100,000
- Continuous monitoring (annual): $100,000 - $250,000+
- Total initial: $200,000 - $500,000+
- Validity period: 24 months (with continuous monitoring)

## Discounts and Special Cases

### Volume Discounts
- Certifying 3+ systems: 10% discount on Tiers 1-2
- Certifying 5+ systems: 15% discount on all tiers

### Academic Institutions
- 30% discount on all tiers for academic research
- Requires non-commercial use attestation

### Non-Profit Organizations
- 20% discount on Tier 1 and 2
- 15% discount on Tier 3 and 4

### Rapid Assessment
- 25% premium for expedited review (half standard timeline)

## Payment Terms
- 50% upon engagement, 50% upon completion (T1, T2)
- Monthly invoicing for T3 continuous monitoring
- Quarterly invoicing for T4 Byzantine Council support

## Additional Services
- Expert consultation ($/hour): $250
- Custom assessment criteria: +$10,000 - $50,000
- Training and certification for internal auditors: $5,000 - $15,000
- Data migration and system updates: $25,000 - $75,000
`;

export const METHODOLOGY_RESOURCE = {
  uri: "casa://methodology",
  contents: CASA_METHODOLOGY,
};

export const TIERS_RESOURCE = {
  uri: "casa://tiers",
  contents: TIER_DEFINITIONS,
};

export const PRICING_RESOURCE = {
  uri: "casa://pricing",
  contents: PRICING_STRUCTURE,
};

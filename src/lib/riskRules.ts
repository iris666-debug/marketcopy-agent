import type { RiskFinding } from '../types';

const RISK_RULES: RiskFinding[] = [
  {
    term: 'best',
    level: 'medium',
    reason: 'Overly absolute claim that can sound promotional or hard to prove.',
    suggestion: 'Use specific proof such as high-quality, carefully tuned, or customer-loved.',
  },
  {
    term: '100%',
    level: 'high',
    reason: 'Absolute guarantee-style wording can create compliance and trust risk.',
    suggestion: 'Use softer phrasing such as designed to, helps, or up to when supported.',
  },
  {
    term: 'guaranteed',
    level: 'high',
    reason: 'Guarantee language may imply an unsupported promise.',
    suggestion: 'Use backed by support, designed for, or built to instead.',
  },
  {
    term: 'free',
    level: 'medium',
    reason: 'Free claims can be misleading when conditions apply.',
    suggestion: 'Use included or no extra tools required only when accurate.',
  },
  {
    term: 'cure',
    level: 'high',
    reason: 'Medical-style claims create high policy and trust risk.',
    suggestion: 'Describe practical benefits without making health claims.',
  },
];

export function detectRiskTerms(text: string): RiskFinding[] {
  const normalized = text.toLowerCase();
  const seen = new Set<string>();

  return RISK_RULES.filter((rule) => {
    if (seen.has(rule.term)) {
      return false;
    }

    if (!normalized.includes(rule.term.toLowerCase())) {
      return false;
    }

    seen.add(rule.term);
    return true;
  });
}

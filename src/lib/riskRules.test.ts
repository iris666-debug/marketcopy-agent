import { describe, expect, it } from 'vitest';
import { detectRiskTerms } from './riskRules';

describe('detectRiskTerms', () => {
  it('finds risky exaggerated expressions case-insensitively', () => {
    const findings = detectRiskTerms('The best wireless earbuds with 100% guaranteed comfort.');

    expect(findings).toEqual([
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
    ]);
  });

  it('deduplicates repeated terms', () => {
    const findings = detectRiskTerms('Best sound, best comfort, BEST value.');

    expect(findings.map((finding) => finding.term)).toEqual(['best']);
  });
});

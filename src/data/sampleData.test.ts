import { describe, expect, it } from 'vitest';
import { sampleProductInput, sampleScenarios } from './sampleData';

describe('sample scenarios', () => {
  it('provides multiple playable demo products', () => {
    expect(sampleScenarios.length).toBeGreaterThanOrEqual(3);
    expect(sampleScenarios.map((scenario) => scenario.input.productName)).toContain('WarmMate Heated Lunch Box');
    expect(sampleScenarios.map((scenario) => scenario.input.productName)).toContain('PackEase Compression Travel Organizer');
  });

  it('keeps the default sample aligned with the first scenario', () => {
    expect(sampleProductInput).toBe(sampleScenarios[0].input);
  });
});

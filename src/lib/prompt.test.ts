import { describe, expect, it } from 'vitest';
import { sampleProductInput } from '../data/sampleData';
import { buildGenerationPrompt } from './prompt';

describe('buildGenerationPrompt', () => {
  it('asks for compact JSON and includes product context', () => {
    const prompt = buildGenerationPrompt(sampleProductInput);

    expect(prompt).toContain('Return compact JSON only');
    expect(prompt).toContain(sampleProductInput.productName);
    expect(prompt).toContain('styleAnalysis');
    expect(prompt.length).toBeLessThan(5000);
  });
});

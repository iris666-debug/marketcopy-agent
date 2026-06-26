import { describe, expect, it } from 'vitest';
import { sampleProductInput, sampleScenarios } from '../data/sampleData';
import { createMockWorkflowResult } from './mockWorkflow';

describe('createMockWorkflowResult', () => {
  it('returns all three workflow sections from product input', () => {
    const result = createMockWorkflowResult(sampleProductInput);

    expect(result.styleAnalysis.titlePattern).toContain('Product');
    expect(result.generatedListing.title).toContain(sampleProductInput.productName);
    expect(result.generatedListing.bullets).toHaveLength(5);
    expect(result.riskReport.findings.length).toBeGreaterThan(0);
    expect(result.usageNotes.mode).toBe('mock');
  });

  it('uses the selected product context instead of hard-coded earbud copy', () => {
    const lunchBoxInput = sampleScenarios.find((scenario) => scenario.label === 'Heated Lunch Box')?.input;

    if (!lunchBoxInput) {
      throw new Error('Heated Lunch Box sample is missing');
    }

    const result = createMockWorkflowResult(lunchBoxInput);

    expect(result.generatedListing.title).toContain('WarmMate Heated Lunch Box');
    expect(result.generatedListing.title).not.toContain('Noise Cancelling');
    expect(result.generatedListing.bullets.join(' ')).toContain('portable heating');
  });
});

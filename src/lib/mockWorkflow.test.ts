import { describe, expect, it } from 'vitest';
import { sampleProductInput } from '../data/sampleData';
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
});

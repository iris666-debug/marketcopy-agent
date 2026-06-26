import { afterEach, describe, expect, it, vi } from 'vitest';
import { sampleProductInput } from '../data/sampleData';
import type { WorkflowResult } from '../types';
import { generateListing } from './apiClient';
import { createMockWorkflowResult } from './mockWorkflow';

describe('generateListing', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns local mock output without calling the API for mock demos', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    const result = await generateListing(sampleProductInput, 'mock-workflow-v1');

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(result.usageNotes.mode).toBe('mock');
    expect(result.usageNotes.model).toBe('mock-workflow-v1');
  });

  it('sends the selected API model to the backend', async () => {
    const apiResult: WorkflowResult = {
      ...createMockWorkflowResult(sampleProductInput),
      usageNotes: {
        mode: 'api',
        model: 'gemini-3.1-flash-lite',
        costControl: ['API response'],
      },
    };
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => apiResult,
    } as Response);

    const result = await generateListing(sampleProductInput, 'gemini-3.1-flash-lite');

    expect(fetchSpy).toHaveBeenCalledWith(
      '/api/generate',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          input: sampleProductInput,
          mode: 'api',
          model: 'gemini-3.1-flash-lite',
        }),
      }),
    );
    expect(result.usageNotes.model).toBe('gemini-3.1-flash-lite');
  });

  it('falls back to mock output when the selected API model is unavailable', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network unavailable'));

    const result = await generateListing(sampleProductInput, 'deepseek-chat');

    expect(result.usageNotes.mode).toBe('api-fallback');
    expect(result.usageNotes.model).toBe('deepseek-chat -> mock-workflow-v1');
    expect(result.usageNotes.costControl[0]).toContain('API request failed');
  });
});

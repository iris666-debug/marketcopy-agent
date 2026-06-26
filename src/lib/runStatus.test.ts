import { describe, expect, it } from 'vitest';
import { getRunStatusCopy } from './runStatus';

describe('getRunStatusCopy', () => {
  it('explains when the result is a no-cost mock demo', () => {
    const copy = getRunStatusCopy({ mode: 'mock', model: 'mock-workflow-v1' });

    expect(copy.label).toBe('Mock demo');
    expect(copy.detail).toContain('No real AI request');
  });

  it('explains when the result came from a real model API', () => {
    const copy = getRunStatusCopy({ mode: 'api', model: 'gemini-3.1-flash-lite' });

    expect(copy.label).toBe('Live AI');
    expect(copy.detail).toContain('gemini-3.1-flash-lite');
  });

  it('explains when the API failed and mock fallback was used', () => {
    const copy = getRunStatusCopy({ mode: 'api-fallback', model: 'deepseek-chat -> mock-workflow-v1' });

    expect(copy.label).toBe('Fallback mock');
    expect(copy.detail).toContain('API was unavailable');
  });
});

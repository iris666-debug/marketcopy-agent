import { describe, expect, it } from 'vitest';
import { DEFAULT_MODEL, MODEL_OPTIONS, getModelOption, isApiModel } from './modelOptions';

describe('model options', () => {
  it('defaults to the no-cost mock model for stable interview demos', () => {
    expect(DEFAULT_MODEL).toBe('mock-workflow-v1');
    expect(MODEL_OPTIONS[0].id).toBe(DEFAULT_MODEL);
    expect(isApiModel(DEFAULT_MODEL)).toBe(false);
  });

  it('marks Gemini and DeepSeek choices as API models', () => {
    expect(isApiModel('gemini-3.1-flash-lite')).toBe(true);
    expect(isApiModel('gemini-3.5-flash')).toBe(true);
    expect(isApiModel('deepseek-chat')).toBe(true);
  });

  it('falls back to mock when an unknown model id is requested', () => {
    expect(getModelOption('unknown-model').id).toBe(DEFAULT_MODEL);
  });
});

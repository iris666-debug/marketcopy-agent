import { createMockWorkflowResult } from './mockWorkflow';
import type { ProductInput, WorkflowResult } from '../types';

export type RunMode = 'mock' | 'api';

export async function generateListing(input: ProductInput, mode: RunMode): Promise<WorkflowResult> {
  if (mode === 'mock') {
    return createMockWorkflowResult(input);
  }

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input, mode }),
    });

    if (!response.ok) {
      throw new Error(`Generation failed with ${response.status}`);
    }

    return (await response.json()) as WorkflowResult;
  } catch {
    return {
      ...createMockWorkflowResult(input),
      usageNotes: {
        mode: 'api-fallback',
        model: 'mock-workflow-v1',
        costControl: [
          'API request failed, so the app used mock fallback for demo stability.',
          'No frontend API key was exposed.',
          'The fallback keeps the same structured workflow shape.',
        ],
      },
    };
  }
}

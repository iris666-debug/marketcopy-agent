import { createMockWorkflowResult } from './mockWorkflow';
import { isApiModel, type ModelId } from './modelOptions';
import type { ProductInput, WorkflowResult } from '../types';

export async function generateListing(input: ProductInput, model: ModelId): Promise<WorkflowResult> {
  if (!isApiModel(model)) {
    return createMockWorkflowResult(input);
  }

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input, mode: 'api', model }),
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
        model: `${model} -> mock-workflow-v1`,
        costControl: [
          'API request failed, so the app used mock fallback for demo stability.',
          'No frontend API key was exposed.',
          'The fallback keeps the same structured workflow shape.',
        ],
      },
    };
  }
}

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sampleProductInput } from '../src/data/sampleData';
import { createMockWorkflowResult } from '../src/lib/mockWorkflow';
import { buildGenerationPrompt } from '../src/lib/prompt';
import type { ProductInput, WorkflowResult } from '../src/types';

const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';
const MODEL = 'deepseek-chat';

function isProductInput(value: unknown): value is ProductInput {
  const input = value as ProductInput;
  return (
    Array.isArray(input?.historicalListings) &&
    input.historicalListings.length === 3 &&
    typeof input.productName === 'string' &&
    typeof input.sellingPoints === 'string' &&
    typeof input.keywords === 'string' &&
    typeof input.desiredTone === 'string'
  );
}

function extractJson(content: string): WorkflowResult {
  const trimmed = content.trim();
  const jsonStart = trimmed.indexOf('{');
  const jsonEnd = trimmed.lastIndexOf('}');

  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error('Model response did not contain JSON.');
  }

  return JSON.parse(trimmed.slice(jsonStart, jsonEnd + 1)) as WorkflowResult;
}

function fallback(input: ProductInput): WorkflowResult {
  return {
    ...createMockWorkflowResult(input),
    usageNotes: {
      mode: 'api-fallback',
      model: 'mock-workflow-v1',
      costControl: [
        'The server returned mock fallback because API mode was unavailable.',
        'The response keeps the same JSON shape as the real model output.',
        'Local risk rules can still support a stable demo.',
      ],
    },
  };
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const input = isProductInput(request.body?.input) ? request.body.input : sampleProductInput;
  const mode = request.body?.mode === 'api' ? 'api' : 'mock';
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (mode === 'mock' || !apiKey) {
    response.status(200).json(mode === 'mock' ? createMockWorkflowResult(input) : fallback(input));
    return;
  }

  try {
    const modelResponse = await fetch(DEEPSEEK_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.4,
        max_tokens: 1400,
        messages: [
          {
            role: 'system',
            content:
              'You return compact JSON for an AIGC product workflow. You never include markdown fences.',
          },
          {
            role: 'user',
            content: buildGenerationPrompt(input),
          },
        ],
      }),
    });

    if (!modelResponse.ok) {
      throw new Error(`DeepSeek request failed with ${modelResponse.status}`);
    }

    const data = await modelResponse.json();
    const content = data?.choices?.[0]?.message?.content;

    if (typeof content !== 'string') {
      throw new Error('DeepSeek response did not include message content.');
    }

    const result = extractJson(content);
    response.status(200).json({
      ...result,
      usageNotes: {
        ...result.usageNotes,
        mode: 'api',
        model: MODEL,
      },
    });
  } catch {
    response.status(200).json(fallback(input));
  }
}

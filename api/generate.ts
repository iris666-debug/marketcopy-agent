import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sampleProductInput } from '../src/data/sampleData';
import { createMockWorkflowResult } from '../src/lib/mockWorkflow';
import { getModelOption, type ModelOption } from '../src/lib/modelOptions';
import { buildGenerationPrompt } from '../src/lib/prompt';
import type { ProductInput, WorkflowResult } from '../src/types';

const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';
const GEMINI_INTERACTIONS_URL = 'https://generativelanguage.googleapis.com/v1beta/interactions';

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

function fallback(input: ProductInput, model?: ModelOption): WorkflowResult {
  const requestedModel = model?.provider === 'mock' ? 'mock-workflow-v1' : `${model?.id ?? 'api'} -> mock-workflow-v1`;

  return {
    ...createMockWorkflowResult(input),
    usageNotes: {
      mode: 'api-fallback',
      model: requestedModel,
      costControl: [
        'The server returned mock fallback because API mode was unavailable.',
        'The response keeps the same JSON shape as the real model output.',
        'Local risk rules can still support a stable demo.',
      ],
    },
  };
}

async function runGemini(input: ProductInput, model: ModelOption): Promise<WorkflowResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY.');
  }

  const modelResponse = await fetch(GEMINI_INTERACTIONS_URL, {
    method: 'POST',
    headers: {
      'x-goog-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model.id,
      system_instruction: 'You return compact JSON for an AIGC product workflow. You never include markdown fences.',
      input: buildGenerationPrompt(input),
      generation_config: {
        temperature: 0.4,
        thinking_level: 'low',
      },
    }),
  });

  if (!modelResponse.ok) {
    throw new Error(`Gemini request failed with ${modelResponse.status}`);
  }

  const data = await modelResponse.json();
  const stepText = data?.steps
    ?.flatMap((step: { content?: Array<{ text?: unknown }> }) => step.content ?? [])
    ?.map((contentPart: { text?: unknown }) => contentPart.text)
    ?.filter((text: unknown): text is string => typeof text === 'string')
    ?.join('\n');
  const content = typeof data?.output_text === 'string' ? data.output_text : stepText;

  if (typeof content !== 'string' || content.length === 0) {
    throw new Error('Gemini response did not include text content.');
  }

  return extractJson(content);
}

async function runDeepSeek(input: ProductInput, model: ModelOption): Promise<WorkflowResult> {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    throw new Error('Missing DEEPSEEK_API_KEY.');
  }

  const modelResponse = await fetch(DEEPSEEK_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model.id,
      temperature: 0.4,
      max_tokens: 1400,
      messages: [
        {
          role: 'system',
          content: 'You return compact JSON for an AIGC product workflow. You never include markdown fences.',
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

  return extractJson(content);
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const input = isProductInput(request.body?.input) ? request.body.input : sampleProductInput;
  const mode = request.body?.mode === 'api' ? 'api' : 'mock';
  const model = getModelOption(request.body?.model);

  if (mode === 'mock' || model.provider === 'mock') {
    response.status(200).json(createMockWorkflowResult(input));
    return;
  }

  try {
    const result = model.provider === 'gemini' ? await runGemini(input, model) : await runDeepSeek(input, model);
    response.status(200).json({
      ...result,
      usageNotes: {
        ...result.usageNotes,
        mode: 'api',
        model: model.id,
      },
    });
  } catch {
    response.status(200).json(fallback(input, model));
  }
}

export type ModelId = 'mock-workflow-v1' | 'gemini-3.1-flash-lite' | 'gemini-3.5-flash' | 'deepseek-chat';

export type ModelProvider = 'mock' | 'gemini' | 'deepseek';

export interface ModelOption {
  id: ModelId;
  label: string;
  provider: ModelProvider;
  costLabel: string;
  interviewNote: string;
}

export const DEFAULT_MODEL: ModelId = 'mock-workflow-v1';

export const MODEL_OPTIONS: ModelOption[] = [
  {
    id: DEFAULT_MODEL,
    label: 'Mock Demo',
    provider: 'mock',
    costLabel: 'No token cost',
    interviewNote: 'Stable interview demo without API keys.',
  },
  {
    id: 'gemini-3.1-flash-lite',
    label: 'Gemini 3.1 Flash-Lite',
    provider: 'gemini',
    costLabel: 'Free tier first',
    interviewNote: 'Cost-efficient model for simple agentic workflows.',
  },
  {
    id: 'gemini-3.5-flash',
    label: 'Gemini 3.5 Flash',
    provider: 'gemini',
    costLabel: 'Free tier option',
    interviewNote: 'Higher capability option when quality matters more.',
  },
  {
    id: 'deepseek-chat',
    label: 'DeepSeek Chat',
    provider: 'deepseek',
    costLabel: 'Low-cost backup',
    interviewNote: 'Alternative low-cost chat completion provider.',
  },
];

export function getModelOption(modelId: unknown): ModelOption {
  return MODEL_OPTIONS.find((option) => option.id === modelId) ?? MODEL_OPTIONS[0];
}

export function isApiModel(modelId: ModelId): boolean {
  return getModelOption(modelId).provider !== 'mock';
}

import { useMemo, useState } from 'react';
import { ClipboardCheck, Loader2, Play, RotateCcw } from 'lucide-react';
import { InputPanel } from './components/InputPanel';
import { ResultPanel } from './components/ResultPanel';
import { WorkflowPanel } from './components/WorkflowPanel';
import { sampleProductInput } from './data/sampleData';
import { generateListing } from './lib/apiClient';
import { DEFAULT_MODEL, MODEL_OPTIONS, getModelOption, isApiModel, type ModelId } from './lib/modelOptions';
import { createMockWorkflowResult } from './lib/mockWorkflow';
import type { ProductInput, WorkflowResult } from './types';

type WorkflowStatus = 'idle' | 'analyzing' | 'generating' | 'checking' | 'completed' | 'error';

function buildLogs(status: WorkflowStatus, selectedModel: ModelId): string[] {
  const model = getModelOption(selectedModel);
  const source = isApiModel(selectedModel)
    ? `${model.label} selected, server key protected`
    : 'Mock Demo selected, no token cost';
  const logs = [source];

  if (['analyzing', 'generating', 'checking', 'completed'].includes(status)) {
    logs.push('Style Clone Agent is reading historical listings');
  }

  if (['generating', 'checking', 'completed'].includes(status)) {
    logs.push('Listing Generation Agent is drafting title, bullets, and description');
  }

  if (['checking', 'completed'].includes(status)) {
    logs.push('Risk Check Agent is scanning risky expressions');
  }

  if (status === 'completed') {
    logs.push('Workflow completed and ready to copy');
  }

  if (status === 'error') {
    logs.push('Workflow paused because required inputs are missing');
  }

  return logs;
}

export default function App() {
  const [input, setInput] = useState<ProductInput>(sampleProductInput);
  const [selectedModel, setSelectedModel] = useState<ModelId>(DEFAULT_MODEL);
  const [status, setStatus] = useState<WorkflowStatus>('idle');
  const [result, setResult] = useState<WorkflowResult | null>(createMockWorkflowResult(sampleProductInput));

  const selectedModelOption = getModelOption(selectedModel);
  const isRunning = ['analyzing', 'generating', 'checking'].includes(status);
  const logs = useMemo(() => buildLogs(status, selectedModel), [selectedModel, status]);

  const canRun =
    input.productName.trim().length > 0 &&
    input.sellingPoints.trim().length > 0 &&
    input.historicalListings.every((listing) => listing.trim().length > 0);

  const runWorkflow = async () => {
    if (!canRun) {
      setStatus('error');
      return;
    }

    setStatus('analyzing');
    await new Promise((resolve) => setTimeout(resolve, 320));
    setStatus('generating');
    await new Promise((resolve) => setTimeout(resolve, 320));
    setStatus('checking');
    await new Promise((resolve) => setTimeout(resolve, 260));
    try {
      const nextResult = await generateListing(input, selectedModel);
      setResult(nextResult);
      setStatus('completed');
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="app-shell">
      <section className="topbar" aria-label="Project header">
        <div>
          <p className="eyebrow">AIGC / Agent Product MVP</p>
          <h1>MarketCopy Agent</h1>
          <p className="subtitle">
            基于卖家访谈的 AIGC Agent 工作流：Style Clone → Listing Generation → Risk Check，输出英文商品文案。
          </p>
        </div>
        <div className="topbar-actions" aria-label="Workflow actions">
          <div className="model-select">
            <label htmlFor="model-select">Model</label>
            <select
              id="model-select"
              onChange={(event) => setSelectedModel(event.target.value as ModelId)}
              value={selectedModel}
            >
              {MODEL_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label} · {option.costLabel}
                </option>
              ))}
            </select>
            <span>{selectedModelOption.interviewNote}</span>
          </div>
          <button className="secondary-button" onClick={() => setInput(sampleProductInput)} type="button">
            <RotateCcw size={16} />
            Sample
          </button>
          <button className="primary-button" disabled={isRunning} onClick={runWorkflow} type="button">
            {isRunning ? <Loader2 className="spin" size={17} /> : <Play size={17} />}
            Generate
          </button>
        </div>
      </section>

      <section className="workspace-grid">
        <InputPanel input={input} onChange={setInput} />
        <div className="right-column">
          <WorkflowPanel logs={logs} model={selectedModelOption} status={status} />
          {result ? (
            <ResultPanel result={result} />
          ) : (
            <div className="empty-result">
              <ClipboardCheck size={28} />
              <p>Generate once to preview style analysis, listing copy, and risk checks.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

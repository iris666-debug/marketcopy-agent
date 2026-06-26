import { useMemo, useState } from 'react';
import { ClipboardCheck, Database, Loader2, Play, RotateCcw, Sparkles } from 'lucide-react';
import { InputPanel } from './components/InputPanel';
import { ResultPanel } from './components/ResultPanel';
import { WorkflowPanel } from './components/WorkflowPanel';
import { sampleProductInput } from './data/sampleData';
import { generateListing } from './lib/apiClient';
import { createMockWorkflowResult } from './lib/mockWorkflow';
import type { ProductInput, WorkflowResult } from './types';

type RunMode = 'mock' | 'api';
type WorkflowStatus = 'idle' | 'analyzing' | 'generating' | 'checking' | 'completed' | 'error';

const emptyInput: ProductInput = {
  historicalListings: ['', '', ''],
  productName: '',
  sellingPoints: '',
  keywords: '',
  desiredTone: 'premium but practical',
};

function buildLogs(status: WorkflowStatus, mode: RunMode): string[] {
  const source = mode === 'api' ? 'API mode selected' : 'Mock mode selected';
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
  const [mode, setMode] = useState<RunMode>('mock');
  const [status, setStatus] = useState<WorkflowStatus>('idle');
  const [result, setResult] = useState<WorkflowResult | null>(createMockWorkflowResult(sampleProductInput));

  const isRunning = ['analyzing', 'generating', 'checking'].includes(status);
  const logs = useMemo(() => buildLogs(status, mode), [mode, status]);

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
    const nextResult = await generateListing(input, mode);
    setResult(nextResult);
    setStatus('completed');
  };

  return (
    <main className="app-shell">
      <section className="topbar" aria-label="Project header">
        <div>
          <p className="eyebrow">AIGC / Agent Product MVP</p>
          <h1>MarketCopy Agent</h1>
          <p className="subtitle">Turn seller interview insights into a staged AI workflow for English product listings.</p>
        </div>
        <div className="topbar-actions" aria-label="Workflow actions">
          <div className="mode-toggle" role="group" aria-label="Generation mode">
            <button className={mode === 'mock' ? 'active' : ''} onClick={() => setMode('mock')} type="button">
              <Database size={16} />
              Mock
            </button>
            <button className={mode === 'api' ? 'active' : ''} onClick={() => setMode('api')} type="button">
              <Sparkles size={16} />
              API
            </button>
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
          <WorkflowPanel logs={logs} mode={mode} status={status} />
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

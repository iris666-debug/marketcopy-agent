import { AlertCircle, CheckCircle2, Circle, Loader2 } from 'lucide-react';
import type { ModelOption } from '../lib/modelOptions';

type WorkflowStatus = 'idle' | 'analyzing' | 'generating' | 'checking' | 'completed' | 'error';

interface WorkflowPanelProps {
  logs: string[];
  model: ModelOption;
  status: WorkflowStatus;
}

const stages = [
  { id: 'analyzing', label: 'Style Clone Agent', detail: 'Analyze pattern, tone, and reusable phrases' },
  { id: 'generating', label: 'Listing Generation Agent', detail: 'Draft title, bullets, and short description' },
  { id: 'checking', label: 'Risk Check Agent', detail: 'Flag exaggerated wording and safer rewrites' },
] as const;

function stageState(stage: (typeof stages)[number]['id'], status: WorkflowStatus) {
  const order = ['analyzing', 'generating', 'checking'];
  const currentIndex = order.indexOf(status);
  const stageIndex = order.indexOf(stage);

  if (status === 'completed') return 'done';
  if (status === stage) return 'active';
  if (currentIndex > stageIndex) return 'done';
  return 'idle';
}

export function WorkflowPanel({ logs, model, status }: WorkflowPanelProps) {
  return (
    <section className="panel workflow-panel" aria-label="Agent workflow">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Workflow</p>
          <h2>Agent Stages</h2>
        </div>
        <span className={`mode-pill ${model.provider}`}>{model.costLabel}</span>
      </div>

      <div className="stage-list">
        {stages.map((stage) => {
          const state = stageState(stage.id, status);
          return (
            <article className={`stage-row ${state}`} key={stage.id}>
              <div className="stage-icon">
                {state === 'active' ? (
                  <Loader2 className="spin" size={18} />
                ) : state === 'done' ? (
                  <CheckCircle2 size={18} />
                ) : status === 'error' ? (
                  <AlertCircle size={18} />
                ) : (
                  <Circle size={18} />
                )}
              </div>
              <div>
                <h3>{stage.label}</h3>
                <p>{stage.detail}</p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="log-window" aria-label="Status log">
        {logs.map((log, index) => (
          <p key={`${log}-${index}`}>{log}</p>
        ))}
      </div>
    </section>
  );
}

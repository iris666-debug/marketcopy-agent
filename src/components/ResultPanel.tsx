import { useState } from 'react';
import { Copy } from 'lucide-react';
import type { WorkflowResult } from '../types';

interface ResultPanelProps {
  result: WorkflowResult;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button className="icon-button" onClick={copy} title="Copy section" type="button">
      <Copy size={15} />
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

export function ResultPanel({ result }: ResultPanelProps) {
  const listingText = [
    result.generatedListing.title,
    '',
    ...result.generatedListing.bullets.map((bullet, index) => `${index + 1}. ${bullet}`),
    '',
    result.generatedListing.description,
  ].join('\n');

  return (
    <section className="results-grid" aria-label="Workflow results">
      <article className="panel result-card">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Agent 1</p>
            <h2>Style Analysis</h2>
          </div>
          <CopyButton text={JSON.stringify(result.styleAnalysis, null, 2)} />
        </div>
        <dl className="analysis-list">
          <dt>Tone</dt>
          <dd>{result.styleAnalysis.tone}</dd>
          <dt>Title pattern</dt>
          <dd>{result.styleAnalysis.titlePattern}</dd>
          <dt>Selling logic</dt>
          <dd>{result.styleAnalysis.sellingLogic.join(' ')}</dd>
        </dl>
        <div className="phrase-row">
          {result.styleAnalysis.reusablePhrases.map((phrase) => (
            <span key={phrase}>{phrase}</span>
          ))}
        </div>
      </article>

      <article className="panel result-card wide">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Agent 2</p>
            <h2>Generated Listing</h2>
          </div>
          <CopyButton text={listingText} />
        </div>
        <h3 className="listing-title">{result.generatedListing.title}</h3>
        <ol className="bullet-list">
          {result.generatedListing.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ol>
        <p className="description-copy">{result.generatedListing.description}</p>
      </article>

      <article className="panel result-card">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Agent 3</p>
            <h2>Risk Check</h2>
          </div>
          <CopyButton text={JSON.stringify(result.riskReport, null, 2)} />
        </div>
        <p className="risk-summary">{result.riskReport.summary}</p>
        <div className="risk-list">
          {result.riskReport.findings.length > 0 ? (
            result.riskReport.findings.map((finding) => (
              <div className={`risk-item ${finding.level}`} key={finding.term}>
                <strong>{finding.term}</strong>
                <p>{finding.reason}</p>
                <span>{finding.suggestion}</span>
              </div>
            ))
          ) : (
            <p className="description-copy">No local risky expressions were found.</p>
          )}
        </div>
      </article>
    </section>
  );
}

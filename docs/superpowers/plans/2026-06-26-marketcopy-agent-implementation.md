# MarketCopy Agent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a runnable MarketCopy Agent MVP that demonstrates a three-stage AIGC / Agent workflow for English product listing generation.

**Architecture:** Use a Vite React app for the product UI and a Vercel-compatible serverless endpoint for model calls. Keep business logic in typed utility modules so mock fallback, risk checking, prompt construction, and API parsing can be tested without the UI.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS, Vitest, Vercel serverless function, Fetch API.

## Global Constraints

- One real model API call should return structured JSON for all three stages.
- Mock mode must work without an API key.
- Real API keys must stay in `.env.local` and never be exposed in frontend code.
- `.env.example` must document required variables without secrets.
- No resume files, private chat logs, real customer data, or friend's business data should be committed.
- The first release must be runnable locally and safe to push to GitHub.

---

## File Structure

- `package.json`: scripts and dependencies.
- `vite.config.ts`: Vite and Vitest config.
- `tsconfig.json`, `tsconfig.node.json`: TypeScript config.
- `index.html`: app shell.
- `src/main.tsx`: React entry.
- `src/App.tsx`: page composition and workflow state.
- `src/styles.css`: Tailwind base and app-level styling.
- `src/types.ts`: shared product, workflow, and API result types.
- `src/data/sampleData.ts`: safe demo inputs.
- `src/lib/riskRules.ts`: local risky expression rules.
- `src/lib/mockWorkflow.ts`: deterministic mock result.
- `src/lib/prompt.ts`: compact model prompt builder.
- `src/lib/apiClient.ts`: frontend request wrapper.
- `src/components/InputPanel.tsx`: historical listing and product inputs.
- `src/components/WorkflowPanel.tsx`: staged Agent progress and status log.
- `src/components/ResultPanel.tsx`: style, listing, and risk result display.
- `api/generate.ts`: serverless API endpoint with real model call and fallback.
- `.env.example`: environment variable documentation.
- `.gitignore`: excludes dependencies, build output, and local secrets.
- `README.md`: project story, setup, usage, and interview talking points.

## Task 1: Scaffold App, Types, and Tests

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `src/types.ts`
- Create: `src/data/sampleData.ts`
- Create: `src/lib/riskRules.ts`
- Create: `src/lib/riskRules.test.ts`
- Create: `src/lib/mockWorkflow.ts`
- Create: `src/lib/mockWorkflow.test.ts`
- Create: `.gitignore`

**Interfaces:**
- Produces: `ProductInput`, `WorkflowResult`, `RiskFinding`, `detectRiskTerms(text: string): RiskFinding[]`, `createMockWorkflowResult(input: ProductInput): WorkflowResult`.

- [ ] **Step 1: Write failing tests for local risk rules**

Create `src/lib/riskRules.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { detectRiskTerms } from './riskRules';

describe('detectRiskTerms', () => {
  it('finds risky exaggerated expressions case-insensitively', () => {
    const findings = detectRiskTerms('The best wireless earbuds with 100% guaranteed comfort.');

    expect(findings).toEqual([
      {
        term: 'best',
        level: 'medium',
        reason: 'Overly absolute claim that can sound promotional or hard to prove.',
        suggestion: 'Use specific proof such as high-quality, carefully tuned, or customer-loved.',
      },
      {
        term: '100%',
        level: 'high',
        reason: 'Absolute guarantee-style wording can create compliance and trust risk.',
        suggestion: 'Use softer phrasing such as designed to, helps, or up to when supported.',
      },
      {
        term: 'guaranteed',
        level: 'high',
        reason: 'Guarantee language may imply an unsupported promise.',
        suggestion: 'Use backed by support, designed for, or built to instead.',
      },
    ]);
  });

  it('deduplicates repeated terms', () => {
    const findings = detectRiskTerms('Best sound, best comfort, BEST value.');

    expect(findings.map((finding) => finding.term)).toEqual(['best']);
  });
});
```

- [ ] **Step 2: Run tests and verify they fail**

Run: `npm test -- src/lib/riskRules.test.ts --run`

Expected: FAIL because project dependencies and implementation do not exist yet.

- [ ] **Step 3: Create project config and risk rule implementation**

Create the package/config files and implement `src/types.ts` plus `src/lib/riskRules.ts` with the exact interfaces used by the test.

- [ ] **Step 4: Run tests and verify risk rules pass**

Run: `npm test -- src/lib/riskRules.test.ts --run`

Expected: PASS.

- [ ] **Step 5: Write failing tests for mock workflow**

Create `src/lib/mockWorkflow.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { createMockWorkflowResult } from './mockWorkflow';
import { sampleProductInput } from '../data/sampleData';

describe('createMockWorkflowResult', () => {
  it('returns all three workflow sections from product input', () => {
    const result = createMockWorkflowResult(sampleProductInput);

    expect(result.styleAnalysis.titlePattern).toContain('Product');
    expect(result.generatedListing.title).toContain(sampleProductInput.productName);
    expect(result.generatedListing.bullets).toHaveLength(5);
    expect(result.riskReport.findings.length).toBeGreaterThan(0);
    expect(result.usageNotes.mode).toBe('mock');
  });
});
```

- [ ] **Step 6: Run mock workflow test and verify it fails**

Run: `npm test -- src/lib/mockWorkflow.test.ts --run`

Expected: FAIL because `sampleData` and `mockWorkflow` are missing.

- [ ] **Step 7: Implement sample data and mock workflow**

Create `src/data/sampleData.ts` and `src/lib/mockWorkflow.ts` so the mock result is deterministic, useful for demos, and shaped like `WorkflowResult`.

- [ ] **Step 8: Run tests and commit Task 1**

Run: `npm test -- --run`

Expected: PASS.

Commit:

```bash
git add .
git commit -m "feat: scaffold tested workflow core"
```

## Task 2: Build Main UI with Mock Workflow

**Files:**
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles.css`
- Create: `src/components/InputPanel.tsx`
- Create: `src/components/WorkflowPanel.tsx`
- Create: `src/components/ResultPanel.tsx`
- Modify: `package.json`

**Interfaces:**
- Consumes: `ProductInput`, `WorkflowResult`, `sampleProductInput`, `createMockWorkflowResult`.
- Produces: A running UI with input form, Agent stages, status log, mock/API mode switch, and copy actions.

- [ ] **Step 1: Create UI components**

Implement the input panel, workflow panel, result panel, and app shell using the existing types and mock workflow.

- [ ] **Step 2: Run local build**

Run: `npm run build`

Expected: PASS with Vite production build.

- [ ] **Step 3: Run tests**

Run: `npm test -- --run`

Expected: PASS.

- [ ] **Step 4: Commit Task 2**

```bash
git add .
git commit -m "feat: build mock agent workflow UI"
```

## Task 3: Add Prompt Builder, API Client, and Serverless Endpoint

**Files:**
- Create: `src/lib/prompt.ts`
- Create: `src/lib/prompt.test.ts`
- Create: `src/lib/apiClient.ts`
- Create: `api/generate.ts`
- Create: `.env.example`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: `buildGenerationPrompt(input: ProductInput): string`, `generateListing(input: ProductInput, mode: 'mock' | 'api'): Promise<WorkflowResult>`, `POST /api/generate`.

- [ ] **Step 1: Write failing prompt tests**

Create `src/lib/prompt.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { sampleProductInput } from '../data/sampleData';
import { buildGenerationPrompt } from './prompt';

describe('buildGenerationPrompt', () => {
  it('asks for compact JSON and includes product context', () => {
    const prompt = buildGenerationPrompt(sampleProductInput);

    expect(prompt).toContain('Return compact JSON only');
    expect(prompt).toContain(sampleProductInput.productName);
    expect(prompt).toContain('styleAnalysis');
    expect(prompt.length).toBeLessThan(5000);
  });
});
```

- [ ] **Step 2: Run prompt test and verify it fails**

Run: `npm test -- src/lib/prompt.test.ts --run`

Expected: FAIL because prompt builder does not exist.

- [ ] **Step 3: Implement prompt builder**

Create `src/lib/prompt.ts` with a compact prompt that asks for `styleAnalysis`, `generatedListing`, `riskReport`, and `usageNotes`.

- [ ] **Step 4: Run prompt tests**

Run: `npm test -- src/lib/prompt.test.ts --run`

Expected: PASS.

- [ ] **Step 5: Implement API client and endpoint**

Use `POST /api/generate` from the frontend. The endpoint should:

- return mock output when `mode` is `mock`;
- call DeepSeek-compatible API when `DEEPSEEK_API_KEY` exists and `mode` is `api`;
- parse JSON safely;
- return mock output with an `api-fallback` note if the API fails.

- [ ] **Step 6: Build and test**

Run: `npm test -- --run`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

- [ ] **Step 7: Commit Task 3**

```bash
git add .
git commit -m "feat: add api generation workflow"
```

## Task 4: Polish Demo Readiness and Documentation

**Files:**
- Create: `README.md`
- Modify: `src/App.tsx`
- Modify: `src/components/InputPanel.tsx`
- Modify: `src/components/WorkflowPanel.tsx`
- Modify: `src/components/ResultPanel.tsx`
- Modify: `src/styles.css`

**Interfaces:**
- Produces: a demo-ready app and GitHub README.

- [ ] **Step 1: Add final UX polish**

Add loading states, error message copy, disabled states, copy feedback, and responsive layout refinements.

- [ ] **Step 2: Write README**

README must include:

- project positioning for AIGC / Agent product assistant roles;
- why the project came from a real seller interview;
- setup commands;
- `.env.local` example;
- API/mock mode explanation;
- interview talking points.

- [ ] **Step 3: Verify**

Run: `npm test -- --run`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

- [ ] **Step 4: Commit Task 4**

```bash
git add .
git commit -m "docs: prepare demo and interview materials"
```

## Task 5: Push to GitHub

**Files:**
- No code changes expected unless GitHub setup requires docs adjustment.

**Interfaces:**
- Consumes: local Git repository with committed app.
- Produces: pushed `master` branch at `https://github.com/iris666-debug/marketcopy-agent.git`.

- [ ] **Step 1: Check status**

Run: `git status --short`

Expected: clean working tree.

- [ ] **Step 2: Push**

Run: `git push -u origin master`

Expected: push succeeds. If credentials fail, sign in through GitHub Desktop, Git Credential Manager, or provide a token through the Git prompt.

## Self-Review

- Spec coverage: MVP inputs, three-stage workflow, API mode, mock fallback, cost controls, security, README, and GitHub push are covered.
- Placeholder scan: no `TBD`, `TODO`, or deferred implementation placeholders remain.
- Type consistency: `ProductInput`, `WorkflowResult`, `RiskFinding`, `detectRiskTerms`, `createMockWorkflowResult`, `buildGenerationPrompt`, and `generateListing` are defined before use.

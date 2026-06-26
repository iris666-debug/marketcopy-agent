# MarketCopy Agent Design

## Project Positioning

MarketCopy Agent is an AIGC / Agent product assistant portfolio project. It uses an English product listing scenario as the business context, but the project is primarily meant to demonstrate AI workflow design, prompt structuring, API integration, cost control, and MVP delivery.

The project source is a real需求访谈 with an Amazon seller friend. The goal is not to claim deep cross-border ecommerce expertise. The goal is to show how a product assistant can turn a real business pain point into a runnable AI Agent workflow.

## Target Interview Story

The safe interview framing is:

> I talked with an Amazon seller friend and learned that writing new English product listings often requires referencing past high-performing listings, rewriting them into a new style, and avoiding risky exaggerated words. I used AI to help organize the product concept, then designed and built a three-step Agent workflow MVP: style analysis, listing generation, and risk expression checking.

This supports AIGC / Agent product assistant roles by showing:

- User interview and pain point extraction.
- AIGC workflow decomposition.
- Agent-style staged processing.
- Prompt and API output design.
- MVP delivery and demo readiness.
- Cost and reliability awareness.

## MVP Scope

The first version must be runnable within one week and strong enough for resume, GitHub, and demo video use.

### In Scope

- A React + TypeScript single page app.
- Inputs for three historical English product listings.
- Inputs for new product information:
  - Product name.
  - Core selling points.
  - Keywords.
  - Desired tone.
- A three-stage workflow display:
  - Style Clone Agent: extracts tone, title pattern, common selling logic, and reusable phrases.
  - Listing Generation Agent: creates title, bullet points, and short description.
  - Risk Check Agent: detects exaggerated or risky expressions and suggests safer alternatives.
- One real model API call that returns structured JSON for all three stages.
- Mock mode as a fallback for demo stability and cost saving.
- Local rule-based risk term highlighting before or after API output.
- Status log showing each workflow stage.
- Copy buttons for generated listing sections.
- Sample data button for fast demos.
- README with project story, setup, API key instructions, and interview talking points.

### Out of Scope for Week One

- Full Amazon policy coverage.
- Real seller account integration.
- Batch generation.
- User login.
- Database storage.
- Browser extension.
- Payment or SaaS features.
- Multi-platform policy engines.

## Product Flow

1. User opens the app and sees the tool directly.
2. User clicks sample data or pastes three historical listings.
3. User enters new product information.
4. User chooses API mode or mock mode.
5. User clicks generate.
6. The interface shows the staged Agent workflow:
   - analyzing style,
   - generating listing,
   - checking risky expressions.
7. Results appear in three panels:
   - style analysis,
   - generated listing,
   - risk check report.
8. User copies the title, bullet points, or full result.

## Technical Design

### Frontend

- React + TypeScript + Vite.
- Tailwind CSS for styling.
- Component-focused structure:
  - input panel,
  - workflow timeline,
  - result panels,
  - status log,
  - mode controls.

### API Layer

The app should use one backend endpoint:

`POST /api/generate`

Input:

- historical listings.
- product info.
- desired tone.

Output:

- `styleAnalysis`
- `generatedListing`
- `riskReport`
- `usageNotes`

The endpoint should support:

- real API mode when an API key exists.
- mock fallback when no API key exists or the API call fails.

### Cost Control

- Use one structured API call instead of three separate model calls.
- Limit each historical listing length in the UI.
- Ask the model to return compact JSON.
- Keep risk terms as a local list where possible.
- Provide mock mode for demos.
- Never expose API keys in frontend code.

### Security

- Real API keys stay in `.env.local`.
- `.env.local` is ignored by Git.
- `.env.example` documents required variables without secrets.
- No resume files, private chat logs, real customer data, or friend's business data should be committed.

## Quality Bar

The project is complete enough for the first release when:

- The app runs locally.
- The UI clearly shows the three Agent stages.
- API mode works with a configured key.
- Mock mode works without a key.
- The generated output can be copied.
- The README explains the project and how to run it.
- The project can be pushed to GitHub safely.
- The user can explain the project in a 90-second interview answer.

## Recommended Resume Bullet

MarketCopy Agent · AIGC商品文案工作流工具

- 基于亚马逊卖家访谈需求，设计并开发面向英文商品文案生成场景的 AIGC Agent MVP，将历史爆款文案风格分析、新品 Listing 生成与风险表达检测串联为完整工作流。
- 接入真实模型 API 并保留 Mock 演示模式，通过结构化 JSON 输出、单次 API 调用和本地风险词规则降低 token 成本与演示风险。
- 独立完成需求拆解、产品流程设计、Prompt 结构设计、前端开发、部署文档和面试演示脚本。

## One Week Delivery Plan

- Day 1: Project scaffold, mock workflow, sample data.
- Day 2: Main UI, staged Agent display, result panels.
- Day 3: Backend API endpoint and real model integration.
- Day 4: Risk term rules, copy actions, error handling.
- Day 5: README, GitHub cleanup, deployment preparation.
- Day 6: Resume bullets and interview script.
- Day 7: Demo recording, final polish, backup mock demo.

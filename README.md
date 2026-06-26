# MarketCopy Agent

MarketCopy Agent is an AIGC / Agent workflow MVP for English product listing generation.

For Chinese interview practice and a step-by-step demo script, see [docs/interview-playbook-cn.md](docs/interview-playbook-cn.md).

For copy-ready Chinese sharing text for resumes, job platforms, portfolios, and social posts, see [docs/share-kit-cn.md](docs/share-kit-cn.md).

Public mock demo URL after GitHub Pages is enabled:

```text
https://iris666-debug.github.io/marketcopy-agent/
```

This project comes from a real needs interview with an Amazon seller friend. The goal is not to pretend to be a cross-border ecommerce expert. The goal is to show how a product assistant can turn a real business pain point into a runnable AI workflow: style analysis, listing generation, and risky expression checking.

## What It Demonstrates

- User interview to product requirement.
- AIGC workflow decomposition.
- Agent-style staged processing.
- Prompt design with structured JSON output.
- Model selection with free-first and low-cost options.
- Real API integration with mock fallback.
- Token and demo-risk control.

## Core Flow

1. Paste three historical English product listings.
2. Enter a new product name, selling points, keywords, and desired tone.
3. Select a model:
   - Mock Demo: no token cost, stable for interviews.
   - Gemini Flash-Lite / Flash: free-tier first for API demos.
   - DeepSeek Chat: low-cost backup provider.
4. Run the workflow and review three Agent outputs:
   - Style Clone Agent
   - Listing Generation Agent
   - Risk Check Agent
5. Copy the generated listing for demo or iteration.

## Demo Modes

- Local / GitHub Pages public demo: use Mock Demo. It is fully playable, costs nothing, and does not need an API key.
- Live AI demo: deploy with a serverless runtime such as Vercel and configure `GEMINI_API_KEY` or `DEEPSEEK_API_KEY`.
- If the API route or key is unavailable, the app falls back to Mock Demo and clearly labels the result as fallback output.

## Tech Stack

- React + TypeScript + Vite
- Vitest
- Vercel serverless function
- Gemini API and DeepSeek chat completion API

## Local Setup

```bash
npm install
npm run dev
```

On Windows PowerShell, if `npm` is blocked by script policy, use:

```bash
npm.cmd install
npm.cmd run dev
```

## API Setup

Mock Demo works without any API key.

For API mode, create `.env.local`:

```bash
GEMINI_API_KEY=your_gemini_key_here
DEEPSEEK_API_KEY=your_deepseek_key_here
```

Never commit `.env.local`. The repository only includes `.env.example`.

## Verification

```bash
npm test -- --run
npm run build
```

## Cost Control Design

- Mock Demo is the default, so interviews do not spend tokens.
- Gemini Flash-Lite is the preferred API demo option because it supports a free tier.
- One model call returns all three workflow sections.
- Historical listing inputs are length-limited.
- The prompt asks for compact JSON only.
- Obvious risky terms can be handled by local rules.
- If an API key is missing or a request fails, the app falls back to mock output with the same data shape.

## Interview Talking Point

I talked with an Amazon seller friend and learned that English listing creation often requires referencing past high-performing copy, adapting the style for a new product, and avoiding risky exaggerated wording. I used AI to help organize the product concept, then designed and built a three-step Agent workflow MVP. The project focuses on AIGC workflow design, structured prompt output, API integration, cost control, model selection, and demo-ready product delivery.

## 中文面试讲法

我不是把自己包装成跨境电商专家，而是从一个真实卖家访谈里抽象需求：卖家需要参考历史高转化英文文案，为新品生成风格一致的 Listing，同时避免夸大、绝对化等风险表达。所以我设计了一个 AIGC Agent 工作流，把任务拆成风格分析、文案生成、风险检查三个阶段，并做了 Mock 演示、免费优先模型选择、API 失败降级等产品化细节。

## Resume Bullet

MarketCopy Agent · AIGC 商品文案工作流工具

- 基于亚马逊卖家访谈需求，设计并开发面向英文商品文案生成场景的 AIGC Agent MVP，将历史文案风格分析、新品 Listing 生成与风险表达检测串联为完整工作流。
- 接入 Gemini / DeepSeek 模型 API 并保留 Mock 演示模式，通过模型选择、结构化 JSON 输出、单次 API 调用和本地风险词规则降低 token 成本与演示风险。
- 独立完成需求拆解、产品流程设计、Prompt 结构设计、前端开发、部署文档和面试演示脚本。

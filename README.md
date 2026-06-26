# MarketCopy Agent

MarketCopy Agent is an AIGC / Agent workflow MVP for English product listing generation.

The project comes from a real需求访谈 with an Amazon seller friend. The goal is not to present myself as a cross-border ecommerce expert. The goal is to show how a product assistant can turn a real business pain point into a runnable AI workflow: style analysis, listing generation, and risky expression checking.

## What It Demonstrates

- User interview to product requirement.
- AIGC workflow decomposition.
- Agent-style staged processing.
- Prompt design with structured JSON output.
- Real API integration with mock fallback.
- Token and demo-risk control.

## Core Flow

1. Paste three historical English product listings.
2. Enter a new product name, selling points, keywords, and desired tone.
3. Run the workflow in Mock mode or API mode.
4. Review three Agent outputs:
   - Style Clone Agent
   - Listing Generation Agent
   - Risk Check Agent
5. Copy the generated listing for demo or iteration.

## Tech Stack

- React + TypeScript + Vite
- Vitest
- Vercel serverless function
- DeepSeek-compatible chat completion API

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

Mock mode works without any API key.

For API mode, create `.env.local`:

```bash
DEEPSEEK_API_KEY=your_key_here
```

Never commit `.env.local`. The repository only includes `.env.example`.

## Verification

```bash
npm test -- --run
npm run build
```

## Cost Control Design

- One model call returns all three workflow sections.
- Historical listing inputs are length-limited.
- The prompt asks for compact JSON only.
- Obvious risky terms can be handled by local rules.
- Mock mode protects demos from network or API issues.

## Interview Talking Point

I talked with an Amazon seller friend and learned that English Listing creation often requires referencing past high-performing copy, adapting the style for a new product, and avoiding risky exaggerated wording. I used AI to help organize the product concept, then designed and built a three-step Agent workflow MVP. The project focuses on AIGC workflow design, structured prompt output, API integration, cost control, and demo-ready product delivery.

## Resume Bullet

MarketCopy Agent · AIGC商品文案工作流工具

- 基于亚马逊卖家访谈需求，设计并开发面向英文商品文案生成场景的 AIGC Agent MVP，将历史爆款文案风格分析、新品 Listing 生成与风险表达检测串联为完整工作流。
- 接入真实模型 API 并保留 Mock 演示模式，通过结构化 JSON 输出、单次 API 调用和本地风险词规则降低 token 成本与演示风险。
- 独立完成需求拆解、产品流程设计、Prompt 结构设计、前端开发、部署文档和面试演示脚本。

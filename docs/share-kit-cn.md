# MarketCopy Agent 全平台发布包

这份文档是给你找工作直接用的。重点不是把自己包装成跨境电商专家，而是把项目讲成一个可运行、可演示、能体现 AIGC / Agent 产品思路的作品集 MVP。

## 1. 可以公开发的链接

公开试玩链接：

```text
https://iris666-debug.github.io/marketcopy-agent/
```

GitHub 代码仓库：

```text
https://github.com/iris666-debug/marketcopy-agent
```

一句话说明：

> 公开试玩版默认使用 Mock Demo，不消耗 token，也不需要 API key；本地或 Vercel 部署后可以接 Gemini / DeepSeek API 做 Live AI 演示。

## 2. Boss / 拉勾 / 猎聘项目一句话

> 我做了一个 AIGC / Agent 产品助理作品集项目 MarketCopy Agent，基于真实卖家访谈，把英文商品 Listing 生成拆成 Style Clone、Listing Generation、Risk Check 三阶段 Agent 工作流，支持公开试玩、模型选择、Mock 演示和 API 失败兜底。

更短版：

> MarketCopy Agent：AIGC / Agent 工作流 MVP，把卖家英文 Listing 需求拆成风格分析、文案生成、风险检查三阶段，可公开试玩，适合展示产品拆解、Prompt 结构化输出、模型选择和成本控制能力。

## 3. 简历项目经历

MarketCopy Agent | AIGC 商品文案 Agent 工作流 MVP

- 基于真实 Amazon 卖家访谈，拆解英文 Listing 生成场景，设计 Style Clone、Listing Generation、Risk Check 三阶段 Agent 工作流，将历史文案风格分析、新品英文文案生成、风险表达检查串联为可演示 MVP。
- 设计模型选择与成本控制方案，支持 Mock Demo、Gemini Flash-Lite / Flash、DeepSeek Chat；默认 Mock 不消耗 token，并通过单次结构化输出、输入长度限制、API 失败兜底降低演示风险。
- 负责需求拆解、产品流程设计、页面结构验收、Prompt 输出结构设计、GitHub Pages 公开试玩发布、中文面试手册和演示话术整理。

压缩版：

- 设计并落地 MarketCopy Agent：基于卖家访谈的 AIGC / Agent 商品文案工作流，覆盖风格分析、英文 Listing 生成、风险表达检查三阶段，可公开试玩。
- 支持 Mock 演示、Gemini / DeepSeek 模型选择和 API 失败兜底，通过结构化输出和单次调用思路控制 token 成本与演示稳定性。

## 4. 作品集介绍文案

标题：

```text
MarketCopy Agent - AIGC / Agent 商品文案工作流 MVP
```

正文：

> 这个项目来自一次真实卖家访谈。对方提到，新品英文 Listing 不是简单让 AI 写一段英文，而是要参考过去表现较好的文案风格，融合新品卖点和关键词，同时避免夸大、绝对化等风险表达。
>
> 因此我把需求拆成三阶段 Agent 工作流：Style Clone Agent 负责分析历史文案风格，Listing Generation Agent 负责生成标题、bullet points 和描述，Risk Check Agent 负责检查高风险表达并给出替换建议。
>
> 项目默认提供 Mock Demo，公开试玩不需要 API key、不消耗 token；同时保留 Gemini / DeepSeek 模型选择和 API 失败兜底设计。这个项目主要展示我从用户访谈到产品拆解、AIGC 工作流设计、Prompt 结构化输出、成本控制和 Demo 交付的能力。

## 5. 小红书 / 朋友圈 / 社群发布文案

轻一点的版本：

> 最近做了一个 AIGC / Agent 产品助理作品集项目：MarketCopy Agent。
>
> 场景来自和一个 Amazon 卖家朋友的聊天：新品英文 Listing 生成不只是写英文，还要参考历史文案风格、融合卖点关键词、避免夸大风险词。
>
> 我把它拆成三阶段 Agent 工作流：风格分析、英文文案生成、风险检查。公开 Demo 默认 Mock，不需要 API key，也不花 token，适合面试演示。
>
> 试玩链接：https://iris666-debug.github.io/marketcopy-agent/

更职业一点的版本：

> 做了一个面向 AIGC / Agent 产品助理岗位的作品集 MVP：MarketCopy Agent。
>
> 它把英文商品 Listing 生成拆成 Style Clone、Listing Generation、Risk Check 三阶段，重点展示真实需求抽象、工作流拆解、模型选择、成本控制和 API fallback 设计。
>
> 公开试玩版使用 Mock Demo，保证演示稳定；后续可以通过 Vercel 配置 Gemini / DeepSeek API key 做 Live AI 版本。
>
> Demo：https://iris666-debug.github.io/marketcopy-agent/
> GitHub：https://github.com/iris666-debug/marketcopy-agent

## 6. 面试开场 30 秒

> 我这个项目叫 MarketCopy Agent，是一个 AIGC / Agent 产品助理作品集 MVP。需求来自我和一位 Amazon 卖家朋友的访谈，她提到新品英文 Listing 生成需要参考历史文案风格、融合新品卖点和关键词，还要避免夸大风险词。所以我把任务拆成三阶段：Style Clone 做风格分析，Listing Generation 生成英文文案，Risk Check 做风险表达检查。项目默认 Mock Demo，公开链接可以稳定试玩，不消耗 token；同时保留 Gemini / DeepSeek 模型选择和 API 失败兜底设计。

## 7. 面试被问“为什么是 Mock，不是真 AI？”

推荐回答：

> 公开试玩版用 Mock 是产品和安全上的选择。GitHub Pages 是纯静态托管，不能安全保存 API key；如果把 key 放前端会泄露。所以公开链接默认 Mock，保证任何人点开都能稳定体验流程、不消耗 token。真实 API 版本我预留了 Gemini / DeepSeek 的服务端接口思路，需要部署到 Vercel 这类支持后端函数的平台后再配置环境变量。

再补一句：

> 对 AIGC 产品来说，API 调用本身不难，关键是输入输出结构、工作流拆解、异常兜底、成本控制和演示稳定性。

## 8. 面试被问“你没做过跨境电商，怎么解释？”

推荐回答：

> 我不会把自己包装成跨境电商专家。这个项目的重点不是证明我懂整个跨境行业，而是展示我能从真实访谈里抽象需求，把一个模糊业务问题拆成可运行的 AIGC / Agent 工作流。跨境电商是业务场景，核心能力是需求拆解、产品流程设计、Prompt 结构化输出、模型选择和成本控制。

## 9. 全平台发布顺序

1. 先把公开试玩链接放到简历项目经历里。
2. Boss / 拉勾沟通时发一句话项目介绍 + Demo 链接。
3. GitHub README 保持英文为主，方便英文面试官看懂。
4. 作品集页面或 Notion 放完整项目介绍。
5. 小红书 / 社群只发轻量版，重点说“真实访谈 + 三阶段 Agent + 可试玩”。

## 10. 你发布时一定不要这么说

不要说：

- “我很懂跨境电商。”
- “这个已经是完整商业产品。”
- “这个公开链接已经接了真实 AI 模型。”
- “风险检查能保证合规。”

推荐说：

- “这是 AIGC / Agent 产品助理作品集 MVP。”
- “公开试玩版是 Mock Demo，稳定、免费、不泄露 API key。”
- “真实 API 版本需要部署到支持服务端函数的平台后配置 key。”
- “项目重点展示需求拆解、工作流设计、模型选择、成本控制和可演示交付。”

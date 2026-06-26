import type { ProductInput } from '../types';

function compactText(value: string, limit: number) {
  return value.replace(/\s+/g, ' ').trim().slice(0, limit);
}

export function buildGenerationPrompt(input: ProductInput): string {
  const listings = input.historicalListings
    .map((listing, index) => `${index + 1}. ${compactText(listing, 800)}`)
    .join('\n');

  return `You are helping design an AIGC Agent workflow for English ecommerce listing copy.
Return compact JSON only. Do not include markdown fences.

JSON shape:
{
  "styleAnalysis": {
    "tone": "string",
    "titlePattern": "string",
    "sellingLogic": ["string"],
    "reusablePhrases": ["string"]
  },
  "generatedListing": {
    "title": "string",
    "bullets": ["string", "string", "string", "string", "string"],
    "description": "string"
  },
  "riskReport": {
    "summary": "string",
    "findings": [
      { "term": "string", "level": "low|medium|high", "reason": "string", "suggestion": "string" }
    ],
    "saferRewriteTips": ["string"]
  },
  "usageNotes": {
    "mode": "api",
    "model": "string",
    "costControl": ["string"]
  }
}

Historical listings:
${listings}

New product:
Product name: ${compactText(input.productName, 160)}
Selling points: ${compactText(input.sellingPoints, 500)}
Keywords: ${compactText(input.keywords, 240)}
Desired tone: ${compactText(input.desiredTone, 120)}

Rules:
- Keep copy persuasive but avoid absolute claims like best, 100%, guaranteed, cure, or free unless clearly supported.
- Make the output useful for an AIGC / Agent product demo.
- Keep each bullet under 32 words.
- Return compact JSON only.`;
}

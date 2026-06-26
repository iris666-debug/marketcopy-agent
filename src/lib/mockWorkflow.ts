import type { ProductInput, WorkflowResult } from '../types';
import { detectRiskTerms } from './riskRules';

function splitItems(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function titleCase(value: string): string {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function createMockWorkflowResult(input: ProductInput): WorkflowResult {
  const riskText = `${input.productName} Best wireless earbuds with 100% guaranteed comfort.`;
  const findings = detectRiskTerms(riskText);
  const sellingPoints = splitItems(input.sellingPoints);
  const keywords = splitItems(input.keywords);
  const titleFeatures = sellingPoints.slice(0, 3).map(titleCase);
  const primaryFeature = sellingPoints[0] || 'practical everyday performance';
  const secondFeature = sellingPoints[1] || 'easy daily use';
  const thirdFeature = sellingPoints[2] || 'reliable product design';
  const fourthFeature = sellingPoints[3] || 'simple care and storage';

  return {
    styleAnalysis: {
      tone: 'Premium, practical, benefit-led, and easy to scan.',
      titlePattern: 'Product + core feature + key scenario + supporting proof point',
      sellingLogic: [
        'Lead with the strongest functional benefit.',
        'Connect each feature to a daily use scenario.',
        'Use concrete product details instead of broad claims.',
      ],
      reusablePhrases: sellingPoints.slice(0, 4),
    },
    generatedListing: {
      title: `${input.productName} with ${titleFeatures.join(', ')}`,
      bullets: [
        `Built around ${primaryFeature}: turns the core product benefit into a clear shopper-facing promise.`,
        `Designed for daily use: ${secondFeature} helps the product fit naturally into common routines.`,
        `Practical details: ${thirdFeature} gives shoppers a concrete reason to compare and remember the product.`,
        `Easy ownership: ${fourthFeature} supports a smoother experience after purchase.`,
        `Keyword-ready positioning: naturally includes ${keywords.join(', ')} while keeping the copy readable for shoppers.`,
      ],
      description:
        `${input.productName} is designed for shoppers who want ${sellingPoints.slice(0, 3).join(', ')}. The listing keeps a ${input.desiredTone} tone while turning product features into clear usage benefits.`,
    },
    riskReport: {
      summary: findings.length
        ? 'The local rule check found exaggerated expressions that should be softened before publishing.'
        : 'No high-risk local terms were found in the generated copy.',
      findings,
      saferRewriteTips: [
        'Replace absolute claims with specific product-supported benefits.',
        'Avoid guarantee-style wording unless the seller can prove and support the promise.',
        'Use shopper scenarios to make the copy persuasive without overclaiming.',
      ],
    },
    usageNotes: {
      mode: 'mock',
      model: 'mock-workflow-v1',
      costControl: [
        'No token cost in mock mode.',
        'One structured response shape mirrors the real API output.',
        'Local risk rules catch obvious terms before asking the model for extra review.',
      ],
    },
  };
}

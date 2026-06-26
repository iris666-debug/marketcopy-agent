import type { ProductInput, WorkflowResult } from '../types';
import { detectRiskTerms } from './riskRules';

export function createMockWorkflowResult(input: ProductInput): WorkflowResult {
  const riskText = `${input.productName} Best wireless earbuds with 100% guaranteed comfort.`;
  const findings = detectRiskTerms(riskText);

  return {
    styleAnalysis: {
      tone: 'Premium, practical, benefit-led, and easy to scan.',
      titlePattern: 'Product + core feature + key scenario + supporting proof point',
      sellingLogic: [
        'Lead with the strongest functional benefit.',
        'Connect each feature to a daily use scenario.',
        'Use concrete product details instead of broad claims.',
      ],
      reusablePhrases: ['long battery life', 'secure fit', 'clear calls', 'compact charging case'],
    },
    generatedListing: {
      title: `${input.productName} with Noise Cancelling, Long Battery Life, Water Resistant Design, and Secure Fit`,
      bullets: [
        `Built for daily listening: ${input.sellingPoints.split(',')[0]?.trim() || 'long battery life'} keeps music and calls ready through work, travel, and workouts.`,
        'Comfortable secure fit: soft ear tips help the earbuds stay stable during running, commuting, and focused work sessions.',
        'Clear call experience: tuned microphones help voices sound natural during meetings, calls, and quick voice notes.',
        'Water resistant design: made for gym bags, outdoor walks, and busy routines where light sweat or splashes can happen.',
        `Keyword-ready positioning: naturally includes ${input.keywords} while keeping the copy readable for shoppers.`,
      ],
      description:
        `${input.productName} is designed for shoppers who want reliable audio, practical comfort, and a compact everyday carry. The listing keeps a ${input.desiredTone} tone while turning product features into clear usage benefits.`,
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

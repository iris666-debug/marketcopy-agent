export type RiskLevel = 'low' | 'medium' | 'high';

export interface RiskFinding {
  term: string;
  level: RiskLevel;
  reason: string;
  suggestion: string;
}

export interface ProductInput {
  historicalListings: [string, string, string];
  productName: string;
  sellingPoints: string;
  keywords: string;
  desiredTone: string;
}

export interface StyleAnalysis {
  tone: string;
  titlePattern: string;
  sellingLogic: string[];
  reusablePhrases: string[];
}

export interface GeneratedListing {
  title: string;
  bullets: string[];
  description: string;
}

export interface RiskReport {
  summary: string;
  findings: RiskFinding[];
  saferRewriteTips: string[];
}

export interface UsageNotes {
  mode: 'mock' | 'api' | 'api-fallback';
  model: string;
  costControl: string[];
}

export interface WorkflowResult {
  styleAnalysis: StyleAnalysis;
  generatedListing: GeneratedListing;
  riskReport: RiskReport;
  usageNotes: UsageNotes;
}

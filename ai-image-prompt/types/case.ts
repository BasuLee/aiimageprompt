export interface ImageEntry {
  src: string;
  alt: string;
}

export interface CaseRecord {
  id: string;
  caseNumber: number;
  model: string;
  slug: string;
  title: string;
  prompt: string;
  inputRequirement: string;
  promptNote?: string;
  referenceNote?: string;
  notes: string[];
  author: string;
  authorUrl?: string;
  sourceLinks: string[];
  inputImages: ImageEntry[];
  outputImages: ImageEntry[];
}

export interface CaseWithTags extends CaseRecord {
  styleTags: string[];
  themeTags: string[];
  keywords: string[];
}

export type SupportedLanguage = "en" | "zh";

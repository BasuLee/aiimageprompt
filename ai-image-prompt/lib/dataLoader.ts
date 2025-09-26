import { CaseRecord, CaseWithTags, SupportedLanguage } from "@/types/case";
import { applyTagMapping, enrichWithTags } from "@/lib/tagging";
import gpt4oEn from "@/data/gpt-4o.en.json";
import gpt4oZh from "@/data/gpt-4o.zh.json";
import nanoBananaEn from "@/data/nano-banana.en.json";
import nanoBananaZh from "@/data/nano-banana.zh.json";

const MODELS = ["gpt-4o", "nano-banana"] as const;

type ModelKey = (typeof MODELS)[number];

const MODEL_DATA: Record<ModelKey, Record<SupportedLanguage, CaseRecord[]>> = {
  "gpt-4o": {
    en: gpt4oEn as CaseRecord[],
    zh: gpt4oZh as CaseRecord[],
  },
  "nano-banana": {
    en: nanoBananaEn as CaseRecord[],
    zh: nanoBananaZh as CaseRecord[],
  },
};

function readModelData(model: ModelKey, language: SupportedLanguage): CaseRecord[] {
  const dataset = MODEL_DATA[model][language] ?? [];
  return dataset.map((item) => ({ ...item, model }));
}

export interface LoadOptions {
  tagMap?: Record<string, Pick<CaseWithTags, "styleTags" | "themeTags" | "keywords">>;
}

export function loadCases(language: SupportedLanguage, options: LoadOptions = {}): CaseWithTags[] {
  const { tagMap } = options;
  const records = MODELS.flatMap((model) => readModelData(model, language));
  if (tagMap) {
    return applyTagMapping(records, tagMap);
  }
  return records.map((record) => enrichWithTags(record));
}

export function buildTagMap(records: CaseWithTags[]): Record<string, Pick<CaseWithTags, "styleTags" | "themeTags" | "keywords">> {
  return records.reduce<Record<string, Pick<CaseWithTags, "styleTags" | "themeTags" | "keywords">>>((acc, item) => {
    acc[item.id] = {
      styleTags: item.styleTags,
      themeTags: item.themeTags,
      keywords: item.keywords,
    };
    return acc;
  }, {});
}

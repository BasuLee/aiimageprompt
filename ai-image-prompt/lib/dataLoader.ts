import fs from "fs";
import path from "path";
import { CaseRecord, CaseWithTags, SupportedLanguage } from "@/types/case";
import { applyTagMapping, enrichWithTags } from "@/lib/tagging";

const MODELS = ["gpt-4o", "nano-banana"] as const;

type ModelKey = (typeof MODELS)[number];

const dataDir = path.join(process.cwd(), "data");

function readModelData(model: ModelKey, language: SupportedLanguage): CaseRecord[] {
  const filePath = path.join(dataDir, `${model}.${language}.json`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(raw) as CaseRecord[];
  return parsed.map((item) => ({ ...item, model }));
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

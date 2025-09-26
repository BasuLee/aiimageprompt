import { CaseRecord, CaseWithTags } from "@/types/case";

const STYLE_KEYWORDS: Array<{ tag: string; keywords: string[] }> = [
  { tag: "Cyberpunk", keywords: ["cyberpunk", "neon", "holographic", "futuristic", "sci-fi", "tech"] },
  { tag: "3D", keywords: ["3d", "render", "sculpture", "model", "figurine", "chibi"] },
  { tag: "Anime", keywords: ["anime", "manga", "ghibli", "toon", "vtuber"] },
  { tag: "Illustration", keywords: ["illustration", "hand-drawn", "drawing", "sketch", "comic"] },
  { tag: "Photorealistic", keywords: ["photo", "photorealistic", "realistic", "studio", "cinematic"] },
  { tag: "Infographic", keywords: ["infographic", "diagram", "chart", "poster", "visualize"] },
  { tag: "Pixel Art", keywords: ["pixel", "8-bit", "retro", "vox", "voxel"] },
  { tag: "Logo Design", keywords: ["logo", "branding", "identity", "icon"] },
  { tag: "Typography", keywords: ["typography", "text", "font", "letter"] },
  { tag: "Sculptural", keywords: ["sculpture", "statue", "marble", "stone", "carve"] },
];

const THEME_KEYWORDS: Array<{ tag: string; keywords: string[] }> = [
  { tag: "Character", keywords: ["character", "portrait", "people", "person", "figure", "selfie"] },
  { tag: "Product", keywords: ["product", "ad", "advertisement", "packaging", "merch", "keychain"] },
  { tag: "Environment", keywords: ["environment", "landscape", "scene", "room", "interior", "exhibition"] },
  { tag: "Architecture", keywords: ["building", "architecture", "city", "structure", "urban"] },
  { tag: "Education", keywords: ["infographic", "diagram", "tutorial", "explain", "annotation"] },
  { tag: "Fashion", keywords: ["fashion", "outfit", "style", "hairstyle", "wardrobe"] },
  { tag: "Food", keywords: ["food", "cook", "recipe", "burger", "popsicle", "dessert"] },
  { tag: "UI & Data", keywords: ["interface", "ui", "dashboard", "status", "card"] },
  { tag: "Sticker", keywords: ["sticker", "emoji", "pin", "badge", "matryoshka"] },
  { tag: "Creative Art", keywords: ["art", "poster", "illustration", "concept", "fantasy"] },
];

const DEFAULT_STYLE = "General";
const DEFAULT_THEME = "General";

function normalizeText(record: CaseRecord): string {
  return [record.title, record.prompt, record.inputRequirement, record.promptNote, record.referenceNote]
    .filter(Boolean)
    .join(" \n")
    .toLowerCase();
}

export function enrichWithTags(record: CaseRecord): CaseWithTags {
  const normalized = normalizeText(record);

  const styleTags = STYLE_KEYWORDS.filter(({ keywords }) =>
    keywords.some((keyword) => normalized.includes(keyword))
  ).map(({ tag }) => tag);

  const themeTags = THEME_KEYWORDS.filter(({ keywords }) =>
    keywords.some((keyword) => normalized.includes(keyword))
  ).map(({ tag }) => tag);

  if (!styleTags.length) {
    styleTags.push(DEFAULT_STYLE);
  }

  if (!themeTags.length) {
    themeTags.push(DEFAULT_THEME);
  }

  const keywords = Array.from(
    new Set(
      [...styleTags, ...themeTags, record.model, record.author.replace(/^@/, "")].map((value) => value.toLowerCase())
    )
  );

  return {
    ...record,
    styleTags,
    themeTags,
    keywords,
  };
}

export function applyTagMapping(records: CaseRecord[], tagMap: Record<string, Pick<CaseWithTags, "styleTags" | "themeTags" | "keywords">>): CaseWithTags[] {
  return records.map((record) => {
    const mapping = tagMap[record.id];
    if (!mapping) {
      return enrichWithTags(record);
    }
    return {
      ...record,
      styleTags: mapping.styleTags,
      themeTags: mapping.themeTags,
      keywords: mapping.keywords,
    };
  });
}

import fs from "fs";
import path from "path";
import MarkdownIt from "markdown-it";
import { load as loadHtml } from "cheerio";
import { parse as parseYaml } from "yaml";

interface ImageEntry {
  src: string;
  alt: string;
}

interface CaseRecord {
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

interface ModelData {
  en: CaseRecord[];
  zh: CaseRecord[];
}

interface RawGptCase {
  title?: string;
  title_en?: string;
  author?: string;
  author_link?: string;
  source_links?: Array<{ url?: string }>;
  prompt?: string;
  prompt_en?: string;
  prompt_note?: string;
  prompt_note_en?: string;
  reference_note?: string;
  reference_note_en?: string;
}

const projectRoot = path.resolve(__dirname, "..");
const publicAssetsRoot = path.join(projectRoot, "public", "assets");

const markdown = new MarkdownIt({ html: true, breaks: true });

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function buildAlt(titleEn: string, type: "input" | "output", index: number): string {
  const suffix = type === "input" ? "input reference" : "output image";
  const indexSuffix = index > 0 ? ` ${index + 1}` : "";
  return `AI image prompt – ${titleEn}${indexSuffix ? indexSuffix : ""} ${suffix}`.trim();
}

function normalizeText(value: string | undefined): string {
  if (!value) return "";
  return value
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function writeModelData(model: string, data: ModelData) {
  ensureDir(path.join(projectRoot, "data"));
  const outEn = path.join(projectRoot, "data", `${model}.en.json`);
  const outZh = path.join(projectRoot, "data", `${model}.zh.json`);
  fs.writeFileSync(outEn, JSON.stringify(data.en, null, 2), "utf-8");
  fs.writeFileSync(outZh, JSON.stringify(data.zh, null, 2), "utf-8");
}

function copyImage(sourcePath: string, destPath: string) {
  ensureDir(path.dirname(destPath));
  fs.copyFileSync(sourcePath, destPath);
}

function parseGpt4o(): ModelData {
  const sourceRoot = path.resolve(projectRoot, "..", "awesome-gpt4o-images-main");
  const casesRoot = path.join(sourceRoot, "cases");
  const folderNames = fs
    .readdirSync(casesRoot)
    .filter((name) => {
      const full = path.join(casesRoot, name);
      return fs.statSync(full).isDirectory() && /^\d+$/.test(name);
    })
    .sort((a, b) => Number(a) - Number(b));

  const enRecords: CaseRecord[] = [];
  const zhRecords: CaseRecord[] = [];

  for (const folder of folderNames) {
    const caseDir = path.join(casesRoot, folder);
    const caseYamlPath = path.join(caseDir, "case.yml");
    if (!fs.existsSync(caseYamlPath)) continue;
    const caseRaw = fs.readFileSync(caseYamlPath, "utf-8");
    const parsed = parseYaml(caseRaw) as RawGptCase;

    const caseNumber = Number(folder);
    const englishTitle = (parsed.title_en || parsed.title || "").trim();
    const chineseTitle = (parsed.title || parsed.title_en || "").trim();
    const slug = `gpt-4o-case-${folder}`;

    const images = fs
      .readdirSync(caseDir)
      .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
      .sort();

    const destDir = path.join(publicAssetsRoot, "gpt-4o", folder);

    const outputImages = images.map((file, index) => {
      const srcPath = path.join(caseDir, file);
      const destPath = path.join(destDir, file);
      copyImage(srcPath, destPath);
      return {
        src: `/assets/gpt-4o/${folder}/${file}`,
        alt: buildAlt(englishTitle || chineseTitle, "output", index),
      };
    });

    const sourceLinks: string[] = Array.isArray(parsed.source_links)
      ? parsed.source_links
          .map((item) => (item && typeof item.url === "string" ? item.url : undefined))
          .filter((url): url is string => Boolean(url))
      : [];

    const common = {
      caseNumber,
      model: "gpt-4o",
      slug,
      sourceLinks,
      author: typeof parsed.author === "string" ? parsed.author : "",
      authorUrl: typeof parsed.author_link === "string" ? parsed.author_link : undefined,
    };

    const promptNoteEn = normalizeText(parsed.prompt_note_en || parsed.prompt_note);
    const promptNoteZh = normalizeText(parsed.prompt_note || parsed.prompt_note_en);
    const referenceNoteEn = normalizeText(parsed.reference_note_en || parsed.reference_note);
    const referenceNoteZh = normalizeText(parsed.reference_note || parsed.reference_note_en);

    enRecords.push({
      id: `gpt4o-${folder}`,
      caseNumber,
      model: "gpt-4o",
      slug,
      title: englishTitle,
      prompt: (parsed.prompt_en || parsed.prompt || "").trim(),
      inputRequirement: referenceNoteEn,
      promptNote: promptNoteEn || undefined,
      referenceNote: referenceNoteEn || undefined,
      notes: [],
      author: common.author,
      authorUrl: common.authorUrl,
      sourceLinks: common.sourceLinks,
      inputImages: [],
      outputImages,
    });

    zhRecords.push({
      id: `gpt4o-${folder}`,
      caseNumber,
      model: "gpt-4o",
      slug,
      title: chineseTitle,
      prompt: (parsed.prompt || parsed.prompt_en || "").trim(),
      inputRequirement: referenceNoteZh,
      promptNote: promptNoteZh || undefined,
      referenceNote: referenceNoteZh || undefined,
      notes: [],
      author: common.author,
      authorUrl: common.authorUrl,
      sourceLinks: common.sourceLinks,
      inputImages: [],
      outputImages,
    });
  }

  return {
    en: enRecords.sort((a, b) => a.caseNumber - b.caseNumber),
    zh: zhRecords.sort((a, b) => a.caseNumber - b.caseNumber),
  };
}

function escapeForRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractTextAfterLabel(body: string, labels: string[]): string {
  if (!labels.length) return "";
  const pattern = new RegExp(
    `\\*\\*\\s*(?:${labels.map(escapeForRegex).join("|")})(?::)?\\s*\\*\\*:?`,
    "i"
  );
  const match = pattern.exec(body);
  if (!match) return "";
  const after = body.slice(match.index + match[0].length);
  const boundary = after.match(/\n\s*\n/);
  const endIndex = boundary?.index ?? -1;
  const segment = endIndex === -1 ? after : after.slice(0, endIndex);
  return segment.replace(/\r\n/g, "\n").trim();
}

function extractCodeBlockAfterLabel(body: string, labels: string[]): string {
  if (!labels.length) return "";
  const pattern = new RegExp(
    `\\*\\*\\s*(?:${labels.map(escapeForRegex).join("|")})(?::)?\\s*\\*\\*:?`,
    "i"
  );
  const match = pattern.exec(body);
  if (!match) return "";
  const after = body.slice(match.index + match[0].length);
  const codeMatch = after.match(/```[\s\S]*?```/);
  if (!codeMatch) return "";
  const cleaned = codeMatch[0]
    .replace(/^```[a-zA-Z0-9_-]*\n?/, "")
    .replace(/```$/, "");
  return cleaned.trim();
}

function classifyHeader(header: string): "input" | "output" | "other" {
  const normalized = header.toLowerCase();
  if (normalized.includes("input") || normalized.includes("输入")) return "input";
  if (normalized.includes("output") || normalized.includes("输出") || normalized.includes("result")) {
    return "output";
  }
  return "other";
}

function dedupeImages(images: ImageEntry[]): ImageEntry[] {
  const seen = new Set<string>();
  const result: ImageEntry[] = [];
  for (const img of images) {
    if (!seen.has(img.src)) {
      seen.add(img.src);
      result.push(img);
    }
  }
  return result;
}

function parseNano(): ModelData {
  const sourceRoot = path.resolve(projectRoot, "..", "Awesome-Nano-Banana-images-main");
  const readmeEn = fs.readFileSync(path.join(sourceRoot, "README_en.md"), "utf-8");
  const readmeZh = fs.readFileSync(path.join(sourceRoot, "README.md"), "utf-8");

  const englishRecords = parseNanoReadme(readmeEn, "en");
  const chineseRecords = parseNanoReadme(readmeZh, "zh", englishRecords);

  return {
    en: Object.values(englishRecords).sort((a, b) => a.caseNumber - b.caseNumber),
    zh: Object.values(chineseRecords).sort((a, b) => a.caseNumber - b.caseNumber),
  };
}

function parseNanoReadme(
  content: string,
  language: "en" | "zh",
  englishReference?: Record<string, CaseRecord>
): Record<string, CaseRecord> {
  const sourceRoot = path.resolve(projectRoot, "..", "Awesome-Nano-Banana-images-main");
  const startIndex = content.indexOf("## 🖼️");
  const relevant = startIndex >= 0 ? content.slice(startIndex) : content;
  const regex = /### (?:Case|Example|例)\s*(\d+): ([^\n]+)\n([\s\S]*?)(?=### (?:Case|Example|例)\s*\d+:|$)/g;

  const data: Record<string, CaseRecord> = {};

  let match: RegExpExecArray | null;
  while ((match = regex.exec(relevant)) !== null) {
    const [, idRaw, headingPart, body] = match;
    const caseNumber = Number(idRaw);
    const headingNormalized = headingPart.replace(/（/g, "(").replace(/）/g, ")");
    const linkMatches = [...headingNormalized.matchAll(/\[(.+?)\]\((https?:[^)]+)\)/g)];
    const title = linkMatches.length > 0 ? linkMatches[0][1].trim() : headingNormalized.trim();
    const primaryLink = linkMatches.length > 0 ? linkMatches[0][2] : undefined;
    const additionalLinks = linkMatches.slice(1).map((entry) => entry[2]);

    const authorMatch = headingNormalized.match(/by\s*\[([^\]]+)\]\((https?:[^)]+)\)/i);
    const author = authorMatch ? authorMatch[1] : "";
    const authorUrl = authorMatch ? authorMatch[2] : undefined;

    const html = markdown.render(body);
    const $ = loadHtml(html);

    const englishRecord = englishReference?.[`nano-${caseNumber}`];
    const englishTitle = englishRecord?.title || title;

    const tables = $("table");
    const inputImages: ImageEntry[] = [];
    const outputImages: ImageEntry[] = [];
    tables.each((_, table) => {
      const headers = Array.from($(table).find("thead th"), (th) => $(th).text().trim());
      $(table)
        .find("tbody tr")
        .each((_, row) => {
          $(row)
            .find("td")
            .each((cellIndex, cell) => {
              const header = headers[cellIndex];
              const kind = classifyHeader(header);
              $(cell)
                .find("img")
                .each((index, img) => {
                  const rawSrc = $(img).attr("src");
                  if (!rawSrc) return;
                  const cleanSrc = rawSrc.replace(/"/g, "");
                  const sourcePath = path.join(sourceRoot, cleanSrc);
                  const fileName = path.basename(cleanSrc);
                  const destDir = path.join(publicAssetsRoot, "nano-banana", `case${caseNumber}`);
                  if (fs.existsSync(sourcePath)) {
                    copyImage(sourcePath, path.join(destDir, fileName));
                  }
                  const alt = buildAlt(englishTitle, kind === "input" ? "input" : "output", kind === "input" ? inputImages.length : outputImages.length);
                  const entry: ImageEntry = {
                    src: `/assets/nano-banana/case${caseNumber}/${fileName}`,
                    alt,
                  };
                  if (kind === "input") {
                    inputImages.push(entry);
                  } else if (kind === "output") {
                    outputImages.push(entry);
                  }
                });
            });
        });
    });

    const labelSets = language === "en"
      ? {
          input: ["input", "Input"],
          prompt: ["prompt", "Prompt"],
          promptNote: ["prompt note", "Prompt note", "prompt-note"],
          reference: ["reference", "Reference", "reference note"],
        }
      : {
          input: ["输入"],
          prompt: ["提示词", "提示"],
          promptNote: ["提示词注释", "补充说明"],
          reference: ["参考", "参考说明"],
        };

    const inputRequirement = extractTextAfterLabel(body, labelSets.input);
    const prompt = extractCodeBlockAfterLabel(body, labelSets.prompt);
    const promptNoteRaw = extractTextAfterLabel(body, labelSets.promptNote);
    const referenceNoteRaw = extractTextAfterLabel(body, labelSets.reference);

    const notes = $("blockquote")
      .map((_, el) => $(el).text().replace(/\[!NOTE\]/gi, "").trim())
      .get()
      .filter(Boolean);

    const record: CaseRecord = {
      id: `nano-${caseNumber}`,
      caseNumber,
      model: "nano-banana",
      slug: `nano-banana-case-${caseNumber}`,
      title: title.trim(),
      prompt,
      inputRequirement: inputRequirement.trim(),
      promptNote: promptNoteRaw ? promptNoteRaw.trim() : undefined,
      referenceNote: referenceNoteRaw ? referenceNoteRaw.trim() : undefined,
      notes,
      author,
      authorUrl,
      sourceLinks: primaryLink ? [primaryLink, ...additionalLinks] : additionalLinks,
      inputImages: dedupeImages(inputImages),
      outputImages: dedupeImages(outputImages),
    };

    const englishAltTitle = englishTitle || title;
    record.inputImages = record.inputImages.map((img, index) => ({
      ...img,
      alt: buildAlt(englishAltTitle, "input", index),
    }));
    record.outputImages = record.outputImages.map((img, index) => ({
      ...img,
      alt: buildAlt(englishAltTitle, "output", index),
    }));

    data[`nano-${caseNumber}`] = record;
  }

  return data;
}

function main() {
  console.log("Generating data files...");
  const gpt4o = parseGpt4o();
  writeModelData("gpt-4o", gpt4o);
  const nano = parseNano();
  writeModelData("nano-banana", nano);
  console.log("Data generation complete.");
}

main();

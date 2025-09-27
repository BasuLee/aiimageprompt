/* eslint-disable @next/next/no-img-element */
"use client";

import { CaseWithTags, SupportedLanguage } from "@/types/case";
import { getModelLabel } from "@/lib/models";

interface CaseCardProps {
  record: CaseWithTags;
  language: SupportedLanguage;
  onOpen: (record: CaseWithTags) => void;
  onPreview?: (payload: { record: CaseWithTags; kind: "input" | "output"; index: number }) => void;
}

const TEXTS: Record<SupportedLanguage, { viewPrompt: string; viewDetail: string; modelLabel: string; styleLabel: string; themeLabel: string; copyLabel: string }> = {
  en: {
    viewPrompt: "View prompt",
    viewDetail: "Open detail page",
    modelLabel: "Model",
    styleLabel: "Styles",
    themeLabel: "Themes",
    copyLabel: "Copy prompt",
  },
  zh: {
    viewPrompt: "查看提示词",
    viewDetail: "打开详情页",
    modelLabel: "模型",
    styleLabel: "风格",
    themeLabel: "主题",
    copyLabel: "复制提示词",
  },
};

function renderImage(
  src: string,
  alt: string,
  onPreview?: () => void,
) {
  if (!onPreview) {
    return (
      <div className="overflow-hidden rounded-lg border border-cyan-500/40 bg-slate-900">
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onPreview}
      className="group relative block overflow-hidden rounded-lg border border-cyan-500/40 bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
      aria-label={alt}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full transform object-cover transition duration-300 group-hover:scale-[1.03]"
      />
      <span className="pointer-events-none absolute inset-0 bg-slate-950/30 opacity-0 transition group-hover:opacity-100" />
    </button>
  );
}

export function CaseCard({ record, language, onOpen, onPreview }: CaseCardProps) {
  const texts = TEXTS[language];
  const hasInput = record.inputImages.length > 0;
  const primaryOutput = record.outputImages[0];

  return (
    <article className="rounded-xl border border-cyan-500/40 bg-slate-900/80 shadow-lg shadow-cyan-500/10">
      <div className="space-y-5 p-5">
        {hasInput && primaryOutput ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cyan-300/80">Input</p>
              {renderImage(record.inputImages[0].src, record.inputImages[0].alt, () =>
                onPreview?.({ record, kind: "input", index: 0 }),
              )}
            </div>
            <div className="w-full sm:w-1/2">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-pink-300/80">Output</p>
              {renderImage(primaryOutput.src, primaryOutput.alt, () =>
                onPreview?.({ record, kind: "output", index: 0 }),
              )}
            </div>
          </div>
        ) : primaryOutput ? (
          <div>
            {renderImage(primaryOutput.src, primaryOutput.alt, () =>
              onPreview?.({ record, kind: "output", index: 0 }),
            )}
          </div>
        ) : null}

        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-cyan-100">{record.title}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="rounded-full border border-cyan-500/40 px-3 py-1">
                {texts.modelLabel}: {getModelLabel(record.model)}
              </span>
              {record.author && (
                <a
                  href={record.authorUrl ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-pink-500/40 px-3 py-1 text-pink-200 transition hover:text-pink-100"
                >
                  {record.author}
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-slate-300">
            <span className="rounded-full border border-cyan-500/40 px-3 py-1">
              {texts.styleLabel}: {record.styleTags.join(", ")}
            </span>
            <span className="rounded-full border border-cyan-500/40 px-3 py-1">
              {texts.themeLabel}: {record.themeTags.join(", ")}
            </span>
          </div>

          <p className="line-clamp-4 text-sm text-slate-200/90">{record.prompt}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onOpen(record)}
            className="rounded-full border border-cyan-400/60 px-4 py-2 text-sm text-cyan-100 transition hover:border-cyan-200 hover:text-cyan-50"
          >
            {texts.viewPrompt}
          </button>
          <a
            href={`/${language === "en" ? "" : "zh/"}cases/${record.slug}`}
            className="rounded-full border border-pink-400/60 px-4 py-2 text-sm text-pink-200 transition hover:border-pink-200 hover:text-pink-100"
          >
            {texts.viewDetail}
          </a>
        </div>
      </div>
    </article>
  );
}

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
      <div className="overflow-hidden rounded-lg border border-slate-600/40 bg-slate-900/60 shadow-md">
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onPreview}
      className="group relative block overflow-hidden rounded-lg border border-slate-600/40 bg-slate-900/60 shadow-md transition-all duration-300 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
      aria-label={alt}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full transform object-cover transition-all duration-500 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="rounded-full bg-cyan-500/80 p-3 backdrop-blur-sm">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}

export function CaseCard({ record, language, onOpen, onPreview }: CaseCardProps) {
  const texts = TEXTS[language];
  const hasInput = record.inputImages.length > 0;
  const primaryOutput = record.outputImages[0];

  return (
    <article className="group relative rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/80 shadow-lg shadow-slate-900/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 cut-corner-both" style={{'--bg-color': 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8))'} as React.CSSProperties}>
      {/* HUD 数据条 */}
      <div className="hud-bar absolute top-0 left-0 right-0"></div>
      
      {/* 科技感装饰元素 */}
      <div className="absolute -top-1 -left-1 h-4 w-4 border-l-2 border-t-2 border-cyan-400/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      <div className="absolute -top-1 -right-1 h-4 w-4 border-r-2 border-t-2 border-cyan-400/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      <div className="absolute -bottom-1 -left-1 h-4 w-4 border-l-2 border-b-2 border-cyan-400/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      <div className="absolute -bottom-1 -right-1 h-4 w-4 border-r-2 border-b-2 border-cyan-400/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      
      {/* 六边形装饰 */}
      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <svg width="20" height="20" viewBox="0 0 24 24" className="text-cyan-400">
          <path fill="currentColor" d="M17.5 3.5L22 12l-4.5 8.5h-11L2 12l4.5-8.5h11z" stroke="currentColor" strokeWidth="1" fillOpacity="0.1"/>
        </svg>
      </div>
      
      {/* HUD 侧边装饰 */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400/40 to-purple-400/40 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-pink-400/40 to-orange-400/40 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="space-y-5 p-5 relative z-10">
        {hasInput && primaryOutput ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cyan-300/80 cyber-text">INPUT</p>
              {renderImage(record.inputImages[0].src, record.inputImages[0].alt, () =>
                onPreview?.({ record, kind: "input", index: 0 }),
              )}
            </div>
            <div className="w-full sm:w-1/2">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-pink-300/80 cyber-text">OUTPUT</p>
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

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-cyan-100 group-hover:text-cyan-50 transition-colors" data-text={record.title}>
              {record.title}
            </h3>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="relative rounded-lg border border-cyan-500/50 bg-cyan-500/10 px-3 py-1.5 text-cyan-200 backdrop-blur overflow-hidden cut-corner" style={{'--bg-color': 'rgba(6, 182, 212, 0.1)'} as React.CSSProperties}>
                <span className="relative z-10 cyber-text">{texts.modelLabel}: {getModelLabel(record.model)}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent translate-x-[-100%] group-hover:animate-[scan_2s_ease-in-out_infinite]"></div>
              </span>
              {record.author && (
                <a
                  href={record.authorUrl ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="relative rounded-lg border border-pink-500/50 bg-pink-500/10 px-3 py-1.5 text-pink-200 backdrop-blur transition-all hover:border-pink-400 hover:bg-pink-500/20 hover:text-pink-100 overflow-hidden cut-corner"
                  style={{'--bg-color': 'rgba(236, 72, 153, 0.1)'} as React.CSSProperties}
                >
                  <span className="relative z-10 cyber-text">{record.author}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-400/20 to-transparent translate-x-[-100%] hover:animate-[scan_2s_ease-in-out_infinite]"></div>
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="relative rounded-lg border border-purple-500/50 bg-purple-500/10 px-3 py-1.5 text-purple-200 backdrop-blur overflow-hidden cut-corner" style={{'--bg-color': 'rgba(147, 51, 234, 0.1)'} as React.CSSProperties}>
              <span className="relative z-10 cyber-text">{texts.styleLabel}: {record.styleTags.join(", ")}</span>
            </span>
            <span className="relative rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-3 py-1.5 text-emerald-200 backdrop-blur overflow-hidden cut-corner" style={{'--bg-color': 'rgba(16, 185, 129, 0.1)'} as React.CSSProperties}>
              <span className="relative z-10 cyber-text">{texts.themeLabel}: {record.themeTags.join(", ")}</span>
            </span>
          </div>

          <p className="line-clamp-4 text-sm text-slate-200/90 leading-relaxed font-mono">{record.prompt}</p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={() => onOpen(record)}
            className="relative rounded-lg border border-cyan-400/60 bg-cyan-500/10 px-4 py-2.5 text-sm text-cyan-100 backdrop-blur transition-all hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-cyan-50 hover:shadow-cyan-500/20 hover:shadow-md overflow-hidden group/btn cut-corner"
            style={{'--bg-color': 'rgba(6, 182, 212, 0.1)'} as React.CSSProperties}
          >
            <span className="relative z-10 font-semibold">{texts.viewPrompt}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 translate-x-[-100%] group-hover/btn:animate-[scan_1s_ease-in-out]"></div>
          </button>
          <a
            href={`/${language === "en" ? "" : "zh/"}cases/${record.slug}`}
            className="relative rounded-lg border border-pink-400/60 bg-pink-500/10 px-4 py-2.5 text-sm text-pink-200 backdrop-blur transition-all hover:border-pink-300 hover:bg-pink-500/20 hover:text-pink-100 hover:shadow-pink-500/20 hover:shadow-md overflow-hidden group/btn cut-corner"
            style={{'--bg-color': 'rgba(236, 72, 153, 0.1)'} as React.CSSProperties}
          >
            <span className="relative z-10 font-semibold">{texts.viewDetail}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/30 to-pink-500/0 translate-x-[-100%] group-hover/btn:animate-[scan_1s_ease-in-out]"></div>
          </a>
        </div>
      </div>
      
      {/* HUD 底部数据条 */}
      <div className="hud-bar absolute bottom-0 left-0 right-0"></div>
    </article>
  );
}

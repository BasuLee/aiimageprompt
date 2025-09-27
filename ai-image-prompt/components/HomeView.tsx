"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CaseWithTags, SupportedLanguage } from "@/types/case";
import { CaseCard } from "@/components/CaseCard";
import { CaseModal } from "@/components/CaseModal";
import { ImagePreviewModal, ImagePreviewContext } from "@/components/ImagePreviewModal";

const PAGE_SIZE = 30;

function getColumnCount(width: number): number {
  if (width >= 1280) return 3; // xl breakpoint
  if (width >= 768) return 2; // md breakpoint
  return 1;
}

interface ModelOption {
  id: string;
  label: string;
}

interface HomeViewProps {
  language: SupportedLanguage;
  cases: CaseWithTags[];
  models: ModelOption[];
  styles: string[];
  themes: string[];
}

const TEXTS: Record<SupportedLanguage, {
  searchPlaceholder: string;
  modelGroup: string;
  styleGroup: string;
  themeGroup: string;
  reset: string;
  results(count: number): string;
  empty: string;
}> = {
  en: {
    searchPlaceholder: "Search prompts, authors, keywords...",
    modelGroup: "Models",
    styleGroup: "Styles",
    themeGroup: "Themes",
    reset: "Reset filters",
    results: (count) => `${count} curated prompts`,
    empty: "No matches yet. Try adjusting the filters or search term.",
  },
  zh: {
    searchPlaceholder: "搜索提示词、创作者或关键词...",
    modelGroup: "模型",
    styleGroup: "风格",
    themeGroup: "主题",
    reset: "重置筛选",
    results: (count) => `共 ${count} 条精选提示词`,
    empty: "暂无匹配结果，可尝试调整筛选条件或搜索词。",
  },
};

function toggleValue(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function HomeView({ language, cases, models, styles, themes }: HomeViewProps) {
  const texts = TEXTS[language];
  const [searchValue, setSearchValue] = useState("");
  const [selectedModels, setSelectedModels] = useState<string[]>(models.map((model) => model.id));
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [activeCase, setActiveCase] = useState<CaseWithTags | undefined>(undefined);
  const [previewContext, setPreviewContext] = useState<ImagePreviewContext | undefined>(undefined);
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [columnCount, setColumnCount] = useState<number>(1);

  const filtered = useMemo(() => {
    const term = searchValue.trim().toLowerCase();
    return cases.filter((item) => {
      const matchModel = selectedModels.length === 0 || selectedModels.includes(item.model);
      const matchStyle = selectedStyles.length === 0 || selectedStyles.some((style) => item.styleTags.includes(style));
      const matchTheme = selectedThemes.length === 0 || selectedThemes.some((theme) => item.themeTags.includes(theme));
      const searchable = `${item.title}\n${item.prompt}\n${item.inputRequirement}`.toLowerCase();
      const matchSearch = term.length === 0 || searchable.includes(term) || item.keywords.some((kw) => kw.includes(term));
      return matchModel && matchStyle && matchTheme && matchSearch;
    });
  }, [cases, searchValue, selectedModels, selectedStyles, selectedThemes]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [cases, searchValue, selectedModels, selectedStyles, selectedThemes]);

  useEffect(() => {
    const updateColumns = () => {
      if (typeof window === "undefined") {
        return;
      }
      setColumnCount(getColumnCount(window.innerWidth));
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  useEffect(() => {
    setVisibleCount((current) => Math.min(current, Math.max(filtered.length, 0)));
  }, [filtered.length]);

  useEffect(() => {
    if (visibleCount >= filtered.length) {
      return;
    }

    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCount((count) => Math.min(count + PAGE_SIZE, filtered.length));
          }
        });
      },
      { rootMargin: "0px 0px 400px 0px" },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [visibleCount, filtered.length]);

  const visibleCases = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const hasMore = visibleCount < filtered.length;
  const columns = useMemo(() => {
    const count = Math.max(Math.min(columnCount, visibleCases.length || 1), 1);
    const cols: CaseWithTags[][] = Array.from({ length: count }, () => []);
    visibleCases.forEach((item, index) => {
      cols[index % count].push(item);
    });
    return cols;
  }, [visibleCases, columnCount]);

  function resetFilters() {
    setSelectedModels(models.map((model) => model.id));
    setSelectedStyles([]);
    setSelectedThemes([]);
    setSearchValue("");
  }

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-cyan-500/40 bg-slate-900/70 p-6 shadow-lg shadow-cyan-500/10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder={texts.searchPlaceholder}
            className="w-full rounded-xl border border-cyan-400/40 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 md:max-w-md"
          />
          <button
            type="button"
            onClick={resetFilters}
            className="self-start rounded-full border border-pink-400/60 px-4 py-2 text-sm text-pink-200 transition hover:border-pink-200 hover:text-pink-100"
          >
            {texts.reset}
          </button>
        </div>
        <div className="mt-6 space-y-6 text-sm">
          <FilterGroup
            label={texts.modelGroup}
            language={language}
            options={models.map((model) => ({ id: model.id, label: model.label }))}
            selected={selectedModels}
            onToggle={(value) => setSelectedModels(toggleValue(selectedModels, value))}
          />
          <FilterGroup
            label={texts.styleGroup}
            language={language}
            options={styles.map((style) => ({ id: style, label: style }))}
            selected={selectedStyles}
            onToggle={(value) => setSelectedStyles(toggleValue(selectedStyles, value))}
          />
          <FilterGroup
            label={texts.themeGroup}
            language={language}
            options={themes.map((theme) => ({ id: theme, label: theme }))}
            selected={selectedThemes}
            onToggle={(value) => setSelectedThemes(toggleValue(selectedThemes, value))}
          />
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between text-sm text-slate-300">
          <p>{texts.results(filtered.length)}</p>
        </div>
      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-cyan-500/30 bg-slate-900/60 p-10 text-center text-slate-300">
          {texts.empty}
        </p>
      ) : (
        <div className="flex gap-6">
          {columns.map((columnItems, columnIndex) => (
            <div key={columnIndex} className="flex-1 space-y-6">
              {columnItems.map((item) => (
                <CaseCard
                  key={item.id}
                  record={item}
                  language={language}
                  onOpen={setActiveCase}
                  onPreview={(payload) => setPreviewContext(payload)}
                />
              ))}
            </div>
          ))}
        </div>
      )}
        {filtered.length > 0 && (
          <div className="mt-6 flex flex-col items-center gap-3">
            {hasMore && (
              <div
                ref={sentinelRef}
                className="h-6 w-full"
              />
            )}
            {hasMore && (
              <p className="text-xs text-slate-400">
                {language === "en" ? "Loading more..." : "加载更多..."}
              </p>
            )}
            {!hasMore && filtered.length > 0 && (
              <p className="text-xs text-slate-500">
                {language === "en" ? "All prompts loaded" : "所有提示词已加载完毕"}
              </p>
            )}
          </div>
        )}
      </section>

      <CaseModal record={activeCase} language={language} onClose={() => setActiveCase(undefined)} />
      <ImagePreviewModal
        context={previewContext}
        language={language}
        onClose={() => setPreviewContext(undefined)}
      />
    </div>
  );
}

interface FilterGroupProps {
  label: string;
  language: SupportedLanguage;
  options: Array<{ id: string; label: string }>;
  selected: string[];
  onToggle: (value: string) => void;
}

function FilterGroup({ label, language, options, selected, onToggle }: FilterGroupProps) {
  const emptyText = language === "en" ? "All" : "不限";
  if (options.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/70">{label}</p>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isActive = selected.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onToggle(option.id)}
              className={`rounded-full border px-4 py-2 text-xs transition ${
                isActive
                  ? "border-cyan-200 bg-cyan-500/20 text-cyan-100"
                  : "border-cyan-500/40 text-slate-300 hover:border-cyan-200 hover:text-cyan-100"
              }`}
            >
              {option.label}
            </button>
          );
        })}
        <span className="self-center text-xs text-slate-500">{selected.length === 0 ? emptyText : ""}</span>
      </div>
    </div>
  );
}

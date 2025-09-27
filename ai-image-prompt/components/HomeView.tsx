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
  empty: string;
}> = {
  en: {
    searchPlaceholder: "Search prompts, authors, keywords...",
    modelGroup: "Models",
    styleGroup: "Styles",
    themeGroup: "Themes",
    reset: "Reset filters",
    empty: "No matches yet. Try adjusting the filters or search term.",
  },
  zh: {
    searchPlaceholder: "搜索提示词、创作者或关键词...",
    modelGroup: "模型",
    styleGroup: "风格",
    themeGroup: "主题",
    reset: "重置筛选",
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
  const [isFiltersExpanded, setIsFiltersExpanded] = useState<boolean>(false);

  const orderedCases = useMemo(
    () => [...cases].sort((a, b) => b.caseNumber - a.caseNumber),
    [cases],
  );

  const filtered = useMemo(() => {
    const term = searchValue.trim().toLowerCase();
    return orderedCases.filter((item) => {
      const matchModel = selectedModels.length === 0 || selectedModels.includes(item.model);
      const matchStyle = selectedStyles.length === 0 || selectedStyles.some((style) => item.styleTags.includes(style));
      const matchTheme = selectedThemes.length === 0 || selectedThemes.some((theme) => item.themeTags.includes(theme));
      const searchable = `${item.title}\n${item.prompt}\n${item.inputRequirement}`.toLowerCase();
      const matchSearch = term.length === 0 || searchable.includes(term) || item.keywords.some((kw) => kw.includes(term));
      return matchModel && matchStyle && matchTheme && matchSearch;
    });
  }, [orderedCases, searchValue, selectedModels, selectedStyles, selectedThemes]);

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
      <section className="relative rounded-2xl border border-purple-500/30 bg-gradient-to-br from-slate-900/80 via-slate-900/70 to-purple-900/30 p-4 md:p-6 shadow-lg shadow-purple-500/10 backdrop-blur-sm overflow-hidden">
        {/* 额外的霓虹装饰 */}
        <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 opacity-50"></div>
        <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-pink-400 via-orange-400 to-emerald-400 opacity-50"></div>
        
        <div className="relative z-10 flex flex-col gap-4 md:gap-6 md:flex-row md:items-center md:justify-between">
          <input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder={texts.searchPlaceholder}
            className="w-full rounded-xl border border-cyan-400/40 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:shadow-cyan-400/20 focus:shadow-lg transition-all duration-300 md:max-w-md"
          />
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
              className="relative flex items-center justify-center gap-2 rounded-full border border-orange-400/60 bg-orange-500/10 px-4 py-2 text-sm text-orange-200 backdrop-blur transition-all duration-300 hover:border-orange-300 hover:bg-orange-500/20 hover:text-orange-100 hover:shadow-lg hover:shadow-orange-400/40"
            >
              <span>{language === "en" ? "FILTERS" : "筛选"}</span>
              <span className={`text-xs transition-transform duration-300 ${isFiltersExpanded ? "rotate-180" : ""}`}>▾</span>
              <div className="absolute inset-0 rounded-full border border-orange-400/20 animate-pulse"></div>
            </button>
            <button
              type="button"
              onClick={resetFilters}
              className="relative rounded-full border border-pink-400/60 bg-pink-500/10 px-4 py-2 text-sm text-pink-200 backdrop-blur transition-all duration-300 hover:border-pink-300 hover:bg-pink-500/20 hover:text-pink-100 hover:shadow-lg hover:shadow-pink-400/40"
            >
              <span>{texts.reset}</span>
              <div className="absolute inset-0 rounded-full border border-pink-400/20 animate-pulse"></div>
            </button>
          </div>
        </div>
        
        <div className={`overflow-hidden transition-all duration-300 ${isFiltersExpanded ? "mt-4 md:mt-6 max-h-96 opacity-100" : "mt-0 max-h-0 opacity-0"}`}>
          <div className="space-y-4 md:space-y-6 text-sm">
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
        </div>
      </section>

      <section>
      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-cyan-500/30 bg-slate-900/60 p-10 text-center text-slate-300">
          {texts.empty}
        </p>
      ) : (
        <div className="flex gap-4 md:gap-6">
          {columns.map((columnItems, columnIndex) => (
            <div key={columnIndex} className="flex-1 space-y-4 md:space-y-6">
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

  const getGroupColor = (label: string) => {
    if (label.toLowerCase().includes("model") || label.includes("模型")) {
      return {
        labelColor: "text-cyan-400/90 font-semibold tracking-wider",
        activeStyles: "border-cyan-300 bg-cyan-500/25 text-cyan-100 shadow-cyan-400/50 shadow-lg",
        inactiveStyles: "border-cyan-500/50 text-slate-300 hover:border-cyan-300 hover:text-cyan-100 hover:shadow-cyan-400/40 hover:shadow-md"
      };
    } else if (label.toLowerCase().includes("style") || label.includes("风格")) {
      return {
        labelColor: "text-purple-400/90 font-semibold tracking-wider",
        activeStyles: "border-purple-300 bg-purple-500/25 text-purple-100 shadow-purple-400/50 shadow-lg",
        inactiveStyles: "border-purple-500/50 text-slate-300 hover:border-purple-300 hover:text-purple-100 hover:shadow-purple-400/40 hover:shadow-md"
      };
    } else {
      return {
        labelColor: "text-emerald-400/90 font-semibold tracking-wider",
        activeStyles: "border-emerald-300 bg-emerald-500/25 text-emerald-100 shadow-emerald-400/50 shadow-lg",
        inactiveStyles: "border-emerald-500/50 text-slate-300 hover:border-emerald-300 hover:text-emerald-100 hover:shadow-emerald-400/40 hover:shadow-md"
      };
    }
  };

  const colors = getGroupColor(label);

  return (
    <div className="space-y-3">
      <p className={`text-xs uppercase tracking-[0.3em] ${colors.labelColor}`}>{label}</p>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isActive = selected.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onToggle(option.id)}
              className={`rounded-full border px-4 py-2 text-xs transition-all duration-200 shadow-sm ${
                isActive
                  ? colors.activeStyles
                  : colors.inactiveStyles
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

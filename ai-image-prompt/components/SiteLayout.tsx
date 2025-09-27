"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { SupportedLanguage } from "@/types/case";

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface SiteLayoutProps {
  language: SupportedLanguage;
  navItems: NavItem[];
  footerItems: NavItem[];
  children: ReactNode;
}

const LANGUAGE_OPTIONS: Array<{ id: SupportedLanguage; label: string; href: string }> = [
  { id: "en", label: "English", href: "/" },
  { id: "zh", label: "中文", href: "/zh" },
];

export default function SiteLayout({ language, navItems, footerItems, children }: SiteLayoutProps) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDetailsElement | null>(null);

  useEffect(() => {
    if (!isLangOpen) return;
    function handleClick(event: MouseEvent) {
      if (!langRef.current) return;
      if (langRef.current.contains(event.target as Node)) return;
      setIsLangOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isLangOpen]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),transparent_55%)]" />
        <header className="relative z-10 border-b border-cyan-500/40 bg-slate-950/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between">
            <div>
              <a href={language === "en" ? "/" : "/zh"} className="text-2xl font-semibold text-cyan-300 drop-shadow">AI Image Prompt</a>
              <p className="mt-2 max-w-xl text-sm text-slate-300">
                {language === "en"
                  ? "Curated AI prompt gallery for Nano Banana and GPT-4o with cyberpunk flair."
                  : "聚焦 Nano Banana 与 GPT-4o 的精选提示词画廊，呈现赛博朋克灵感。"}
              </p>
            </div>
            <nav className="flex flex-wrap items-center gap-4 text-sm">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`rounded-full border border-cyan-400/40 px-4 py-2 transition hover:border-cyan-200 hover:text-cyan-100 ${
                    item.active ? "bg-cyan-500/20 text-cyan-100" : "text-slate-200"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <details
                ref={langRef}
                className="relative"
                open={isLangOpen}
                onToggle={(event) => {
                  const target = event.currentTarget;
                  setIsLangOpen(target.open);
                }}
              >
                <summary
                  className="flex cursor-pointer items-center gap-2 rounded-full border border-pink-500/40 px-4 py-2 text-sm text-pink-200 transition hover:border-pink-200 hover:text-pink-100"
                  style={{ listStyle: "none" }}
                  onClick={(event) => {
                    event.preventDefault();
                    setIsLangOpen((prev) => !prev);
                  }}
                >
                  {LANGUAGE_OPTIONS.find((option) => option.id === language)?.label ?? "Language"}
                  <span className="text-xs text-pink-300">▾</span>
                </summary>
                {isLangOpen && (
                  <div className="absolute left-1/2 z-20 mt-2 w-36 -translate-x-1/2 overflow-hidden rounded-xl border border-pink-400/40 bg-slate-950/95 shadow-lg shadow-pink-500/10">
                    {LANGUAGE_OPTIONS.map((option) => {
                      const isActive = option.id === language;
                      const baseStyles = "block px-4 py-2 text-sm transition";
                      const activeStyles = "bg-pink-500/20 text-pink-100";
                      const inactiveStyles = "text-pink-200 hover:bg-pink-500/10 hover:text-pink-100";
                      return (
                        <a
                          key={option.id}
                          href={option.href}
                          className={`${baseStyles} ${isActive ? activeStyles : inactiveStyles}`}
                          aria-current={isActive ? "page" : undefined}
                          onClick={() => setIsLangOpen(false)}
                        >
                          {option.label}
                        </a>
                      );
                    })}
                  </div>
                )}
              </details>
            </nav>
          </div>
        </header>
      </div>
      <main className="mx-auto max-w-7xl px-6 pb-20 pt-12">{children}</main>
      <footer className="border-t border-cyan-500/40 bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-400">
            {language === "en"
              ? "AI Image Prompt Gallery powered by curated datasets"
              : "AI 提示词画廊基于精选数据集构建"}
          </p>
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            {footerItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-slate-300 transition hover:text-cyan-200"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}

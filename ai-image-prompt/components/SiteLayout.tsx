import { ReactNode } from "react";
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

const LANGUAGE_SWITCH: Record<SupportedLanguage, { label: string; href: string }> = {
  en: { label: "中文", href: "/zh" },
  zh: { label: "English", href: "/" },
};

export default function SiteLayout({ language, navItems, footerItems, children }: SiteLayoutProps) {
  const languageSwitch = LANGUAGE_SWITCH[language];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden">
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
              <a
                href={languageSwitch.href}
                className="rounded-full border border-pink-500/40 px-4 py-2 text-pink-200 transition hover:border-pink-200 hover:text-pink-100"
              >
                {languageSwitch.label}
              </a>
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

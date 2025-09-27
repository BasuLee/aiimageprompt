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
  const summaryRef = useRef<HTMLElement | null>(null);
  const [menuWidth, setMenuWidth] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowScrollTop(window.scrollY > 320);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  useEffect(() => {
    function syncMenuWidth() {
      if (!summaryRef.current) return;
      setMenuWidth(summaryRef.current.offsetWidth);
    }
    syncMenuWidth();
    window.addEventListener("resize", syncMenuWidth);
    return () => window.removeEventListener("resize", syncMenuWidth);
  }, [language]);

  return (
    <div className="min-h-screen text-slate-100 relative">
      {/* 背景图片层 */}
      <div 
        className="fixed inset-0 z-[-10]"
        style={{
          backgroundImage: 'url(/assets/bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(5px)',
          opacity: 0.5
        }}
      ></div>
      
      {/* 背景遮罩层 */}
      <div className="fixed inset-0 z-[-5] bg-slate-950/60"></div>
      
      <div className="relative" style={{background: 'transparent'}}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_80%_20%,_rgba(255,119,198,0.2),transparent_50%),radial-gradient(circle_at_40%_40%,_rgba(56,189,248,0.1),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(56,189,248,0.05)_60deg,transparent_120deg,rgba(147,51,234,0.05)_180deg,transparent_240deg,rgba(236,72,153,0.05)_300deg,transparent_360deg)]" />
        
        {/* 动态粒子和连线系统 */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-[1]">
          {/* 精细粒子 */}
          <div 
            className="absolute h-1 w-1 rounded-full bg-cyan-400 opacity-30"
            style={{
              animation: 'floatParticle1 120s ease-in-out infinite'
            }}
          ></div>
          <div 
            className="absolute h-0.5 w-0.5 rounded-full bg-purple-400 opacity-25"
            style={{
              animation: 'floatParticle2 180s ease-in-out infinite',
              animationDelay: '30s'
            }}
          ></div>
          <div 
            className="absolute h-1 w-1 rounded-full bg-pink-400 opacity-20"
            style={{
              animation: 'floatParticle3 150s ease-in-out infinite',
              animationDelay: '60s'
            }}
          ></div>
          <div 
            className="absolute h-0.5 w-0.5 rounded-full bg-emerald-400 opacity-20"
            style={{
              animation: 'floatParticle4 200s ease-in-out infinite',
              animationDelay: '20s'
            }}
          ></div>
          <div 
            className="absolute h-0.5 w-0.5 rounded-full bg-orange-400 opacity-25"
            style={{
              animation: 'floatParticle5 160s ease-in-out infinite',
              animationDelay: '50s'
            }}
          ></div>
          <div 
            className="absolute h-1 w-1 rounded-full bg-blue-400 opacity-20"
            style={{
              animation: 'floatParticle6 140s ease-in-out infinite',
              animationDelay: '80s'
            }}
          ></div>
          
          {/* 各角度细线条 */}
          <div 
            className="absolute w-20 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-15"
            style={{
              animation: 'moveLine1 100s ease-in-out infinite',
              transform: 'rotate(15deg)'
            }}
          ></div>
          <div 
            className="absolute w-16 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-12"
            style={{
              animation: 'moveLine2 130s ease-in-out infinite',
              animationDelay: '30s',
              transform: 'rotate(-30deg)'
            }}
          ></div>
          <div 
            className="absolute w-18 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-10"
            style={{
              animation: 'moveLine3 110s ease-in-out infinite',
              animationDelay: '65s',
              transform: 'rotate(45deg)'
            }}
          ></div>
          <div 
            className="absolute w-14 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-15"
            style={{
              animation: 'moveLineDiagonal1 150s ease-in-out infinite',
              transform: 'rotate(-60deg)'
            }}
          ></div>
          <div 
            className="absolute w-22 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-12"
            style={{
              animation: 'moveLineDiagonal2 170s ease-in-out infinite',
              animationDelay: '50s',
              transform: 'rotate(75deg)'
            }}
          ></div>
          <div 
            className="absolute w-16 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-10"
            style={{
              animation: 'moveLineDiagonal3 190s ease-in-out infinite',
              animationDelay: '95s',
              transform: 'rotate(-45deg)'
            }}
          ></div>
          
          {/* 垂直和其他角度的线条 */}
          <div 
            className="absolute w-px h-12 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-12"
            style={{
              animation: 'moveLineVertical1 135s ease-in-out infinite'
            }}
          ></div>
          <div 
            className="absolute w-px h-16 bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-10"
            style={{
              animation: 'moveLineVertical2 115s ease-in-out infinite',
              animationDelay: '45s'
            }}
          ></div>
        </div>
        
        <header className="relative z-10 border-b border-cyan-500/40 bg-slate-950/80 backdrop-blur">
          {/* HUD 数据条 */}
          <div className="hud-bar"></div>
          
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between">
            <div>
              <a href={language === "en" ? "/" : "/zh"} className="relative text-2xl font-bold text-cyan-300 drop-shadow-lg">
                <span className="relative z-10 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent cyber-text" data-text="AI IMAGE PROMPT">
                  AI Image Prompt
                </span>
              </a>
              <p className="mt-2 max-w-xl text-sm text-slate-300 font-mono">
                {language === "en"
                  ? "> Explore stunning visuals generated by Nano Banana and GPT-4o, featuring trending examples and creative keywords."
                  : "> 探索由 Nano Banana 和 GPT-4o 生成的令人惊艳的视觉作品。"}
              </p>
            </div>
            <nav className="flex flex-wrap items-center gap-8 text-sm">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`transition-all duration-300 flex items-center ${
                    item.active 
                      ? "text-cyan-300 font-semibold transform scale-110" 
                      : "text-slate-300 hover:text-cyan-200 hover:transform hover:scale-105"
                  }`}
                >
                  <span className={`uppercase ${item.active ? "text-sm" : "text-xs"}`}>{item.label}</span>
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
                  ref={summaryRef}
                  className={`flex cursor-pointer items-center gap-2 px-2 py-1 text-sm transition-all duration-300 focus:outline-none ${
                    isLangOpen
                      ? "text-pink-300 transform scale-110 font-semibold"
                      : "text-slate-300 hover:text-pink-200 hover:transform hover:scale-105"
                  }`}
                  style={{ listStyle: "none" }}
                  onClick={(event) => {
                    event.preventDefault();
                    setIsLangOpen((prev) => !prev);
                  }}
                >
                  <span className="text-xs uppercase">{LANGUAGE_OPTIONS.find((option) => option.id === language)?.label ?? "Language"}</span>
                  <span
                    className={`text-xs transition-transform duration-200 ${
                      isLangOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▾
                  </span>
                </summary>
                {isLangOpen && (
                  <div
                    className="absolute left-0 z-20 mt-2 overflow-hidden rounded-2xl border border-pink-400/40 bg-slate-950/95 shadow-xl shadow-pink-500/20 backdrop-blur"
                    style={menuWidth > 0 ? ({ width: menuWidth } as React.CSSProperties) : undefined}
                  >
                    {LANGUAGE_OPTIONS.map((option) => {
                      const isActive = option.id === language;
                      const baseStyles = "block px-4 py-2 text-sm transition-all duration-200";
                      const activeStyles = "bg-pink-500/20 text-pink-100 shadow-inner";
                      const inactiveStyles = "text-pink-200 hover:bg-pink-500/10 hover:text-pink-100";
                      return (
                        <a
                          key={option.id}
                          href={option.href}
                          className={`${baseStyles} ${isActive ? activeStyles : inactiveStyles}`}
                          aria-current={isActive ? "page" : undefined}
                          onClick={() => setIsLangOpen(false)}
                        >
                          <span className="text-xs uppercase">{option.label}</span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </details>
            </nav>
          </div>
          
          {/* HUD 底部数据条 */}
          <div className="hud-bar"></div>
        </header>
      </div>
      <main className="relative mx-auto max-w-7xl px-6 pb-20 pt-12">{children}</main>
      <footer className="relative border-t border-cyan-500/40 bg-slate-950/80">
        {/* HUD 数据条 */}
        <div className="hud-bar"></div>
        
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-400 font-mono">
            {language === "en"
              ? "> AI Image Prompt Gallery powered by curated datasets"
              : "> AI 提示词画廊基于精选数据集构建"}
          </p>
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            {footerItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-slate-300 transition hover:text-cyan-200 text-xs"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
      
      {/* 回到顶部按钮 */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-40 group flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border-2 border-cyan-400/70 bg-slate-950/80 text-cyan-200 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:text-cyan-50 hover:shadow-lg hover:shadow-cyan-400/50 ${
          showScrollTop ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4"
        }`}
        aria-label={language === "en" ? "Back to top" : "回到顶部"}
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_30%,rgba(94,234,212,0.35),transparent_60%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-[3px] rounded-[1.1rem] border border-cyan-400/30 blur-sm group-hover:border-cyan-200/50"></div>
        <span className="cyber-text text-[10px] tracking-[0.2em]">TOP</span>
        <svg
          className="absolute -top-1 h-5 w-5 text-cyan-300 opacity-70 transition-transform duration-300 group-hover:-translate-y-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 14l6-6 6 6" />
        </svg>
        <div className="absolute inset-0 -z-10 animate-pulse rounded-2xl border border-cyan-400/20"></div>
        <div className="absolute inset-0 -z-20 animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg,transparent_0deg,rgba(8,145,178,0.35)_120deg,transparent_240deg)]"></div>
      </button>
    </div>
  );
}

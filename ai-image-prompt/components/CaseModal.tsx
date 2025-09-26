"use client";

import { useEffect } from "react";
import { CaseWithTags, SupportedLanguage } from "@/types/case";
import { CopyButton } from "@/components/CopyButton";

interface CaseModalProps {
  record?: CaseWithTags;
  language: SupportedLanguage;
  onClose: () => void;
}

const TEXTS: Record<SupportedLanguage, {
  title: string;
  prompt: string;
  input: string;
  notes: string;
  close: string;
  copy: string;
  copied: string;
}> = {
  en: {
    title: "Prompt Detail",
    prompt: "Prompt",
    input: "Input requirement",
    notes: "Additional notes",
    close: "Close",
    copy: "Copy prompt",
    copied: "Copied!",
  },
  zh: {
    title: "提示词详情",
    prompt: "提示词",
    input: "输入要求",
    notes: "补充说明",
    close: "关闭",
    copy: "复制提示词",
    copied: "已复制",
  },
};

export function CaseModal({ record, language, onClose }: CaseModalProps) {
  const texts = TEXTS[language];
  const open = Boolean(record);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.body.classList.add("overflow-hidden");
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (!open || !record) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-10 backdrop-blur">
      <div className="max-h-full w-full max-w-3xl overflow-y-auto rounded-2xl border border-cyan-500/40 bg-slate-900/95 p-6 shadow-2xl shadow-cyan-500/20">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">{texts.title}</p>
            <h2 className="mt-2 text-2xl font-semibold text-cyan-100">{record.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-pink-400/50 px-4 py-2 text-sm text-pink-200 transition hover:border-pink-200 hover:text-pink-100"
          >
            {texts.close}
          </button>
        </div>

        <div className="mt-6 space-y-6 text-sm text-slate-200">
          <section>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <h3 className="text-base font-semibold text-cyan-200">{texts.prompt}</h3>
              <CopyButton text={record.prompt} label={texts.copy} copiedLabel={texts.copied} />
              <CopyButton
                text={[record.prompt, record.inputRequirement, record.promptNote, record.referenceNote]
                  .filter(Boolean)
                  .join("\n\n")}
                label={language === "en" ? "Copy prompt + notes" : "复制提示词与说明"}
                copiedLabel={language === "en" ? "Copied!" : "已复制"}
              />
            </div>
            <pre className="whitespace-pre-wrap rounded-xl border border-cyan-500/30 bg-slate-950/70 p-4 text-slate-100 shadow-inner shadow-cyan-500/10">
              {record.prompt}
            </pre>
          </section>

          {record.inputRequirement && (
            <section>
              <h3 className="mb-2 text-base font-semibold text-cyan-200">{texts.input}</h3>
              <p className="rounded-xl border border-cyan-500/20 bg-slate-950/60 p-4 text-slate-200/90">
                {record.inputRequirement}
              </p>
            </section>
          )}

          {(record.promptNote || record.referenceNote || record.notes.length > 0) && (
            <section>
              <h3 className="mb-2 text-base font-semibold text-cyan-200">{texts.notes}</h3>
              <div className="space-y-3">
                {record.promptNote && (
                  <p className="rounded-xl border border-cyan-500/20 bg-slate-950/60 p-4 text-slate-200/90">
                    {record.promptNote}
                  </p>
                )}
                {record.referenceNote && (
                  <p className="rounded-xl border border-cyan-500/20 bg-slate-950/60 p-4 text-slate-200/90">
                    {record.referenceNote}
                  </p>
                )}
                {record.notes.map((note, index) => (
                  <p
                    key={index}
                    className="rounded-xl border border-cyan-500/20 bg-slate-950/60 p-4 text-slate-200/90"
                  >
                    {note}
                  </p>
                ))}
              </div>
            </section>
          )}

          {record.sourceLinks.length > 0 && (
            <section>
              <h3 className="mb-2 text-base font-semibold text-cyan-200">Links</h3>
              <ul className="list-disc space-y-1 pl-5">
                {record.sourceLinks.map((link) => (
                  <li key={link}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-300 underline-offset-4 transition hover:text-cyan-100 hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

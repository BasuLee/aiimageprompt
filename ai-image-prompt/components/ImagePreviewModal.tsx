/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";
import { CaseWithTags, ImageEntry, SupportedLanguage } from "@/types/case";

export type PreviewKind = "input" | "output";

interface ImagePreviewContext {
  record: CaseWithTags;
  kind: PreviewKind;
  index: number;
}

interface ImagePreviewModalProps {
  context?: ImagePreviewContext;
  language: SupportedLanguage;
  onClose: () => void;
}

const TEXTS: Record<SupportedLanguage, {
  title: string;
  input: string;
  output: string;
  prev: string;
  next: string;
  close: string;
}> = {
  en: {
    title: "Image preview",
    input: "Input images",
    output: "Output images",
    prev: "Previous image",
    next: "Next image",
    close: "Close",
  },
  zh: {
    title: "图片预览",
    input: "输入图片",
    output: "输出图片",
    prev: "上一张",
    next: "下一张",
    close: "关闭",
  },
};

interface ImageGroup {
  id: PreviewKind;
  label: string;
  images: ImageEntry[];
}

export function ImagePreviewModal({ context, language, onClose }: ImagePreviewModalProps) {
  const texts = TEXTS[language];
  const open = Boolean(context);

  const groups = useMemo<ImageGroup[]>(() => {
    if (!context) {
      return [];
    }

    const { record } = context;
    const result: ImageGroup[] = [];

    if (record.inputImages.length > 0) {
      result.push({ id: "input", label: texts.input, images: record.inputImages });
    }

    if (record.outputImages.length > 0) {
      result.push({ id: "output", label: texts.output, images: record.outputImages });
    }

    return result;
  }, [context, texts.input, texts.output]);

  const [activeGroupId, setActiveGroupId] = useState<PreviewKind | undefined>(context?.kind);
  const [activeIndex, setActiveIndex] = useState<number>(context?.index ?? 0);

  useEffect(() => {
    if (!context) {
      setActiveGroupId(undefined);
      setActiveIndex(0);
      return;
    }

    const preferredGroup = groups.find((group) => group.id === context.kind) ?? groups[0];
    setActiveGroupId(preferredGroup?.id);
    setActiveIndex(Math.min(context.index, (preferredGroup?.images.length ?? 1) - 1));
  }, [context, groups]);

  const currentGroup = useMemo(() => groups.find((group) => group.id === activeGroupId), [groups, activeGroupId]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (!currentGroup) {
        return;
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((prev) => Math.min(prev + 1, currentGroup.images.length - 1));
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    document.body.classList.add("overflow-hidden");
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose, currentGroup]);
  const currentImage = currentGroup?.images[activeIndex];

  if (!open || !context || !currentGroup || !currentImage) {
    return null;
  }

  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < currentGroup.images.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-10 backdrop-blur">
      <div className="relative flex max-h-full w-full max-w-5xl flex-col gap-4 overflow-hidden rounded-3xl border border-cyan-500/40 bg-slate-900/95 p-6 shadow-2xl shadow-cyan-500/20">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">{texts.title}</p>
            <h2 className="mt-2 text-2xl font-semibold text-cyan-100">{context.record.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-pink-400/50 px-4 py-2 text-sm text-pink-200 transition hover:border-pink-200 hover:text-pink-100"
          >
            {texts.close}
          </button>
        </div>

        {groups.length > 1 && (
          <div className="flex gap-3">
            {groups.map((group) => {
              const active = group.id === currentGroup.id;
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => {
                    setActiveGroupId(group.id);
                    setActiveIndex(0);
                  }}
                  className={`rounded-full border px-4 py-2 text-xs transition ${
                    active
                      ? "border-cyan-200 bg-cyan-500/20 text-cyan-100"
                      : "border-cyan-500/40 text-slate-300 hover:border-cyan-200 hover:text-cyan-100"
                  }`}
                >
                  {group.label}
                </button>
              );
            })}
          </div>
        )}

        <div className="relative flex flex-1 items-center justify-center">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-h-[70vh] w-full rounded-2xl border border-cyan-500/30 bg-slate-950/80 object-contain p-4"
          />

          {hasPrev && (
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-cyan-400/40 bg-slate-950/70 px-3 py-2 text-xs text-cyan-100 transition hover:border-cyan-200"
            >
              {texts.prev}
            </button>
          )}

          {hasNext && (
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => Math.min(prev + 1, currentGroup.images.length - 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-cyan-400/40 bg-slate-950/70 px-3 py-2 text-xs text-cyan-100 transition hover:border-cyan-200"
            >
              {texts.next}
            </button>
          )}
        </div>

        {currentGroup.images.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2">
            {currentGroup.images.map((image, index) => {
              const active = index === activeIndex;
              return (
                <button
                  key={`${currentGroup.id}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-16 w-16 overflow-hidden rounded-lg border transition ${
                    active
                      ? "border-cyan-200"
                      : "border-transparent hover:border-cyan-200/70"
                  }`}
                  aria-label={image.alt}
                >
                  <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export type { ImagePreviewContext };

"use client";

import { useState } from "react";

interface CopyButtonProps {
  text: string;
  label: string;
  copiedLabel: string;
}

export function CopyButton({ text, label, copiedLabel }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("复制失败", error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`rounded-full border px-4 py-2 text-sm transition ${
        copied
          ? "border-green-400/50 text-green-200"
          : "border-cyan-400/60 text-cyan-100 hover:border-cyan-200 hover:text-cyan-50"
      }`}
    >
      {copied ? copiedLabel : label}
    </button>
  );
}

const MODEL_LABELS: Record<string, string> = {
  "gpt-4o": "GPT-4o",
  "nano-banana": "Nano Banana",
};

export function getModelLabel(model: string): string {
  return MODEL_LABELS[model] ?? model;
}

export function getModelEntries() {
  return Object.entries(MODEL_LABELS);
}

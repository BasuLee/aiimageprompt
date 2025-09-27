const PROMPT_PREFIX = "AI image prompt：";
const LOWER_CASE_PREFIXES = [
  PROMPT_PREFIX.toLowerCase(),
  "ai image prompt:",
];

export function ensurePromptPrefix(value: string): string {
  if (!value) {
    return PROMPT_PREFIX;
  }

  const leadingWhitespaceMatch = value.match(/^\s*/);
  const leadingWhitespace = leadingWhitespaceMatch ? leadingWhitespaceMatch[0] : "";
  const trimmed = value.slice(leadingWhitespace.length);
  const trimmedLower = trimmed.toLowerCase();

  const alreadyPrefixed = LOWER_CASE_PREFIXES.some((prefix) =>
    trimmedLower.startsWith(prefix),
  );
  if (alreadyPrefixed) {
    return value;
  }

  return `${leadingWhitespace}${PROMPT_PREFIX}${trimmed}`;
}

export { PROMPT_PREFIX };


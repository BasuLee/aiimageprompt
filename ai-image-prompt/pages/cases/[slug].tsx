/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from "next";
import SiteLayout from "@/components/SiteLayout";
import { CopyButton } from "@/components/CopyButton";
import { SeoMeta } from "@/components/SeoMeta";
import { loadCases } from "@/lib/dataLoader";
import { getModelLabel } from "@/lib/models";
import { ensurePromptPrefix } from "@/lib/promptPrefix";
import { CaseWithTags } from "@/types/case";

interface CasePageProps {
  record: CaseWithTags;
}

export const getServerSideProps: GetServerSideProps<CasePageProps> = async ({ params }) => {
  const slug = params?.slug;
  if (typeof slug !== "string") {
    return { notFound: true };
  }
  const cases = loadCases("en");
  const record = cases.find((item) => item.slug === slug);
  if (!record) {
    return { notFound: true };
  }
  return { props: { record } };
};

export default function CaseDetailPage({ record }: CasePageProps) {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ];
  const footerItems = [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Contact Us", href: "/contact" },
  ];
  const legalItems = [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Contact Us", href: "/contact" },
  ];

  const canonicalUrl = `/cases/${record.slug}`;
  const promptText = ensurePromptPrefix(record.prompt);
  const title = `${record.title} | AI Prompt Case Study`;
  const ogImage = record.outputImages[0]?.src ?? record.inputImages[0]?.src ?? undefined;

  return (
    <>
      <SeoMeta
        title={title}
        description={`#1 Prompt detail for ${record.title} using ${getModelLabel(record.model)}.`}
        url={canonicalUrl}
        type="article"
        imagePath={ogImage}
        locale="en_US"
      />
      <SiteLayout language="en" navItems={navItems} footerItems={footerItems} legalItems={legalItems}>
        <article className="space-y-8">
          <header className="space-y-3">
            <a
              href="/"
              className="inline-flex items-center text-sm text-cyan-200 transition hover:text-cyan-100"
            >
              ← Back to gallery
            </a>
            <h1 className="text-3xl font-semibold text-cyan-100">{record.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <span className="rounded-full border border-cyan-500/40 px-3 py-1">
                {getModelLabel(record.model)}
              </span>
              {record.author && (
                <a
                  href={record.authorUrl ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-pink-400/50 px-3 py-1 text-pink-200 transition hover:text-pink-100"
                >
                  {record.author}
                </a>
              )}
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-slate-300">
              <span className="rounded-full border border-cyan-500/40 px-3 py-1">Styles: {record.styleTags.join(", ")}</span>
              <span className="rounded-full border border-cyan-500/40 px-3 py-1">Themes: {record.themeTags.join(", ")}</span>
            </div>
          </header>

          <section className="grid gap-6 md:grid-cols-2">
            {record.inputImages.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-cyan-200">Input</h2>
                {record.inputImages.map((img) => (
                  <div key={img.src} className="overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-900">
                    <img src={img.src} alt={img.alt} loading="lazy" className="w-full object-cover" />
                  </div>
                ))}
              </div>
            )}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-cyan-200">Output</h2>
              {record.outputImages.map((img) => (
                <div key={img.src} className="overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-900">
                  <img src={img.src} alt={img.alt} loading="lazy" className="w-full object-cover" />
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-cyan-500/30 bg-slate-900/70 p-6 shadow-inner shadow-cyan-500/10">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-semibold text-cyan-200">Prompt</h2>
              <CopyButton text={promptText} label="Copy prompt" copiedLabel="Copied!" />
              <CopyButton
                text={[promptText, record.inputRequirement, record.promptNote, record.referenceNote]
                  .filter(Boolean)
                  .join("\n\n")}
                label="Copy prompt + notes"
                copiedLabel="Copied!"
              />
            </div>
            <pre className="whitespace-pre-wrap text-sm text-slate-100">{promptText}</pre>
            {record.inputRequirement && (
              <p className="rounded-xl border border-cyan-500/20 bg-slate-950/70 p-4 text-sm text-slate-200/90">
                <strong className="text-cyan-200">Input requirement:</strong> {record.inputRequirement}
              </p>
            )}
            {record.promptNote && (
              <p className="rounded-xl border border-cyan-500/20 bg-slate-950/70 p-4 text-sm text-slate-200/90">
                <strong className="text-cyan-200">Prompt note:</strong> {record.promptNote}
              </p>
            )}
            {record.referenceNote && (
              <p className="rounded-xl border border-cyan-500/20 bg-slate-950/70 p-4 text-sm text-slate-200/90">
                <strong className="text-cyan-200">Reference note:</strong> {record.referenceNote}
              </p>
            )}
            {record.notes.length > 0 && (
              <ul className="space-y-2 text-sm text-slate-200/90">
                {record.notes.map((note, index) => (
                  <li key={index} className="rounded-xl border border-cyan-500/20 bg-slate-950/70 p-4">
                    {note}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {record.sourceLinks.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-cyan-200">Source</h2>
              <ul className="list-disc space-y-1 pl-5 text-sm text-cyan-200">
                {record.sourceLinks.map((link) => (
                  <li key={link}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="underline-offset-4 transition hover:text-cyan-100 hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </SiteLayout>
    </>
  );
}

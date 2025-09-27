import { GetServerSideProps } from "next";
import SiteLayout from "@/components/SiteLayout";
import { SeoMeta } from "@/components/SeoMeta";

interface FAQItem {
  question: string;
  answer: string[];
}

interface FAQPageProps {
  items: FAQItem[];
}

export const getServerSideProps: GetServerSideProps<FAQPageProps> = async () => {
  const items: FAQItem[] = [
    {
      question: "How do you decide which prompts and images appear in the gallery?",
      answer: [
        "We run a weekly sourcing sprint that scans X, Discord, Xiaohongshu, and internal submission forms. A case only graduates into the gallery after we obtain the original prompt, parameter notes, and—when applicable—reference images that demonstrate provenance. Curators reproduce every prompt using the declared model build to confirm that the example is deterministic or clearly labelled when variability is expected. During validation we annotate identity anchors, lighting intent, and post-processing notes so readers can understand the creative reasoning instead of reverse-engineering screenshots.",
        "If a submission cannot be reproduced, lacks licensing clarity, or contains sensitive information that cannot be redacted, it stays in our research queue instead of the public site. That approach keeps the gallery trustworthy for production teams who rely on it for inspiration and documentation."
      ],
    },
    {
      question: "How can I replicate a case from the gallery inside my own workflow?",
      answer: [
        "Every card in the waterfall links to a detail page that includes the exact prompt, optional reference requirements, and any follow-up notes the creator shared with us. Copy buttons let you grab the prompt in a single click, while the JSON data stored under /data provides machine-readable access if you are batching tests. We recommend following the action order exactly—our prompts are written using the Nano Blueprint structure described on the blog, meaning each sentence controls a distinct aspect such as composition, light, or texture.",
        "When you import the data into your workspace, map the input images to their original filenames so relative paths remain intact. The alt text doubles as a semantic reminder of whether you are looking at an input or output, which helps when preparing presentations or QA reports."
      ],
    },
    {
      question: "What if an image asset is missing or loads slowly?",
      answer: [
        "All assets live under /public/assets and are mirrored on Cloudflare Pages during deployment. We ship WebP whenever a high-quality conversion is available, and the pages lazy-load media to reduce initial bundle size. If your build system fails to locate an image, check that you preserved the case folder structure produced by the data generation script. The folders are named by model and case number—for example, /assets/nano-banana/case42.",
        "Should you discover a missing file, open an issue or email us with the case ID. Our ingestion pipeline keeps a checksum ledger, so we can restore the original asset and regenerate the corresponding JSON entry without touching unrelated items."
      ],
    },
    {
      question: "How do filters and tags on the homepage work?",
      answer: [
        "The tags are generated automatically when we build the dataset. A lightweight classifier scans each prompt and note for keywords tied to style (such as Cyberpunk, Photorealistic, Infographic) and theme (Character, Product, UI & Data, and so forth). The English dataset acts as the source of truth; the Chinese dataset inherits the same tags to keep filters consistent across languages. When you interact with the UI, the filtering happens client-side for instant feedback, but all data is still loaded on the server via getServerSideProps to satisfy the SSR requirement in our PRD.",
        "If you believe a case deserves an additional tag, drop us a message. We will review the prompt, run regression renders if needed, and update both the JSON files and sitemap metadata so the change propagates everywhere."
      ],
    },
    {
      question: "How do you handle attribution and licensing concerns?",
      answer: [
        "Every case lists the creator handle and links back to the original post. We only publish examples that were shared under permissive terms or with explicit contributor approval. If a creator updates their licensing stance, we annotate the change log and, when necessary, remove the entry. The site makes no claim of ownership—our role is to document, test, and contextualise prompts so that the community can learn from each other with proper credit.",
        "If you notice a missing citation or you are a featured creator who wants adjustments, email firenull52@gmail.com with the case ID, supporting evidence, and the action you would like us to take. We respond within two business days."
      ],
    },
    {
      question: "Can I submit my own prompt or request a new category?",
      answer: [
        "Yes. We welcome submissions, especially if they include before/after pairs or process notes. Send the prompt, model version, parameter overrides, and any relevant assets to the contact inbox. A curator will reproduce the workflow, document our findings, and let you know whether the case qualifies for publication or for future research. We also use submissions to prioritise new filter categories; once a topic reaches critical mass, we update the classifier and regenerate the data files so everyone benefits.",
        "For larger partnerships—such as releasing a themed collection or co-authoring a deep-dive blog post—outline your idea in the email. We can coordinate release schedules so your launch aligns with our deployment pipeline."
      ],
    },
    {
      question: "What is on the roadmap for this site?",
      answer: [
        "Near-term work focuses on expanding accessibility: keyboard navigation improvements, higher contrast toggles, and an audio companion that reads prompts aloud. We are also experimenting with automated prompt linting that flags ambiguous verbs or duplicated instructions before a case ships. In the medium term, we plan to expose an API endpoint that delivers filtered prompt sets—perfect for hackathons or classroom settings.",
        "Long term, we aim to document multi-modal workflows that blend Nano Banana image editing with GPT-4o generative graphics, giving teams an end-to-end reference for concept development, animation, and production handoff."
      ],
    },
  ];

  return { props: { items } };
};

export default function FAQPage({ items }: FAQPageProps) {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq", active: true },
  ];
  const footerItems = [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <SeoMeta
        title="AI Image Prompt FAQ – Policies & Workflow"
        description="#1 Frequently asked questions about curation, replication, licensing, and future plans for the AI Image Prompt gallery."
        url="/faq"
        locale="en_US"
      />
      <SiteLayout language="en" navItems={navItems} footerItems={footerItems}>
        <article className="mx-auto max-w-3xl space-y-10">
          <header className="space-y-4">
            <h1 className="text-3xl font-semibold text-cyan-100">Frequently Asked Questions</h1>
            <p className="text-base leading-7 text-slate-200">
              The AI Image Prompt gallery exists to document reproducible workflows, so we take just as much care with the supporting
              documentation as we do with the visuals. This FAQ captures the questions that surface most often when designers,
              educators, and researchers begin using the site. If you cannot find the answer you need, email firenull52@gmail.com and
              our team will follow up.
            </p>
          </header>

          <section className="space-y-8">
            {items.map((item) => (
              <div key={item.question} className="space-y-3 rounded-2xl border border-cyan-500/40 bg-slate-900/70 p-6 shadow-lg shadow-cyan-500/15">
                <h2 className="text-2xl font-semibold text-cyan-100">{item.question}</h2>
                {item.answer.map((paragraph, index) => (
                  <p key={index} className="text-base leading-7 text-slate-200">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </section>
        </article>
      </SiteLayout>
    </>
  );
}

import { GetServerSideProps } from "next";
import SiteLayout from "@/components/SiteLayout";
import { SeoMeta } from "@/components/SeoMeta";

interface Section {
  heading: string;
  paragraphs: string[];
}

interface ContactPageProps {
  sections: Section[];
}

export const getServerSideProps: GetServerSideProps<ContactPageProps> = async () => {
  return { props: { sections: SECTIONS } };
};

const SECTIONS: Section[] = [
{
  heading: "How to reach us",
  paragraphs: [
    "Send all inquiries to firenull52@gmail.com. We operate a shared inbox so that curators, engineers, and authors can pick up requests without delay. Please include a descriptive subject line such as “Submission – Nano Banana hair swap case” or “Takedown request – GPT-4o prompt 33” so we can triage messages effectively.",
    "If your message contains large files, use a shareable link (Google Drive, Dropbox, etc.) rather than attachments. Our review workflow archives links alongside metadata to maintain provenance.",
  ],
},
{
  heading: "Submitting new prompts",
  paragraphs: [
    "To help us evaluate submissions quickly, bundle the following details: prompt text, model version, parameter overrides, seed (if deterministic), reference assets, and a short description of the creative intent. Explain any limitations we should know about (for example, “works best on square crops” or “requires GPU version 1.4”).",
    "You do not need to format the prompt in a special way; plain text is preferred. If you have iteration notes or side-by-side comparisons, include them as bullet points or links. We will reproduce the workflow, verify identity consistency, and let you know whether the case is approved for publication or earmarked for future research.",
  ],
},
{
  heading: "Requesting updates or corrections",
  paragraphs: [
    "If you are featured in the gallery and want to update information—such as a new social handle, licensing change, or revised prompt—email us with the case ID. Please describe what needs to be modified and provide replacement text or assets. We will log the change, regenerate the JSON data, and redeploy so the update appears across English and Chinese pages.",
    "For corrections submitted by third parties, include evidence (e.g., original post, timestamp, or creator confirmation) so we can validate the request. We respect creators’ wishes and will act quickly once ownership is confirmed.",
  ],
},
{
  heading: "Takedown and privacy requests",
  paragraphs: [
    "We take privacy and licensing seriously. If you believe a case infringes your rights or you would like it removed, contact us with the case ID, the reason for removal, and any supporting documentation. We review takedown requests within two business days and will follow up with the outcome or additional questions.",
    "When removal is approved we delete associated assets, update the sitemap, and annotate the change log. If the case reappears on third-party mirrors we encourage you to notify those hosts directly—we only control the content that lives on ai-image-prompt.com.",
  ],
},
{
  heading: "Partnerships and press",
  paragraphs: [
    "We welcome collaborations that advance responsible prompt engineering. Examples include co-authoring educational resources, producing themed prompt collections, or organising workshops. Outline your proposal, timeline, and expected deliverables in the initial email. We will schedule a call if the project aligns with our roadmap.",
    "Journalists may use the same contact address for media inquiries. Let us know your publication, deadline, and the angle you are exploring so we can provide relevant background or quotes.",
  ],
},
{
  heading: "Response time and expectations",
  paragraphs: [
    "We typically respond within two business days. Complex requests—such as multi-case audits—may take longer, but we will acknowledge receipt and provide an estimated timeline. If you do not hear back within four business days, feel free to send a gentle reminder (sometimes spam filters misbehave).",
    "Please remember that our team spans multiple time zones. Clear, concise messages with all relevant details accelerate review for everyone.",
  ],
}
];

export default function ContactPage({ sections }: ContactPageProps) {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ];
  const footerItems = [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Contact Us", href: "/contact", active: true },
  ];

  return (
    <>
      <SeoMeta
        title="Contact the AI Image Prompt Gallery Team"
        description="#1 How to reach the AI Image Prompt team for submissions, updates, takedowns, and partnerships."
        url="/contact"
        locale="en_US"
      />
      <SiteLayout language="en" navItems={navItems} footerItems={footerItems}>
        <article className="mx-auto max-w-3xl space-y-8">
          <header className="space-y-4">
            <h1 className="text-3xl font-semibold text-cyan-100">Contact the Team</h1>
            <p className="text-base leading-7 text-slate-200">
              We built this gallery for the community, and direct feedback keeps it healthy. Use the guidelines below to ensure your
              message lands in front of the right curator. Our inbox is collaborative—engineers, writers, and designers all rotate
              through it—so the more context you provide, the faster we can help.
            </p>
          </header>

          <section className="space-y-8">
            {sections.map((section) => (
              <div key={section.heading} className="space-y-3 rounded-2xl border border-cyan-500/40 bg-slate-900/70 p-6 shadow-lg shadow-cyan-500/15">
                <h2 className="text-2xl font-semibold text-cyan-100">{section.heading}</h2>
                {section.paragraphs.map((paragraph, index) => (
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

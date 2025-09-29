import { GetServerSideProps } from "next";
import SiteLayout from "@/components/SiteLayout";
import { SeoMeta } from "@/components/SeoMeta";

interface Section {
  heading: string;
  paragraphs: string[];
}

interface PrivacyPageProps {
  sections: Section[];
}

export const getServerSideProps: GetServerSideProps<PrivacyPageProps> = async () => {
  return { props: { sections: SECTIONS } };
};

const SECTIONS: Section[] = [
{
  heading: "1. Overview",
  paragraphs: [
    "This Privacy Policy explains how the AI Image Prompt Team (“we”, “our”, “us”) collects, uses, and safeguards information when you visit https://ai-image-prompt.com (the “Service”). We believe that prompt curation should be transparent end-to-end, including how we process personal data. By using the Service you agree to the practices described here.",
  ],
},
{
  heading: "2. Information we collect",
  paragraphs: [
    "We collect limited data to operate the gallery effectively. When you browse the site we log standard web server information (IP address, user agent, referrer, and timestamp) for security monitoring and aggregate analytics. When you send submissions or emails we receive the content of your message, attachments, and contact details you provide. We do not run invasive tracking pixels, sell user data, or request account registration.",
  ],
},
{
  heading: "3. Use of information",
  paragraphs: [
    "We use log data to analyse traffic patterns, detect abuse, and maintain site performance. Submission data allows us to validate prompts, attribute creators, and respond to feedback or takedown requests. We may extract anonymised statistics (for example, the number of cases per model) to publish in blog posts or roadmap updates.",
  ],
},
{
  heading: "4. Cookies and analytics",
  paragraphs: [
    "The Service relies primarily on server-side rendering and static assets. We use a lightweight first-party cookie to remember language preference between English and Chinese. For analytics we rely on aggregated metrics provided by our hosting platform (Cloudflare Pages) and do not share raw browsing data with third-party advertisers.",
  ],
},
{
  heading: "5. Data retention",
  paragraphs: [
    "Web server logs are retained for up to 90 days unless required for security investigations. Submission emails are retained as part of our editorial archive so that we can revisit provenance questions, honour creator requests, and document version changes. You may request deletion of your submission records by contacting firenull52@gmail.com; we will remove them unless retention is required to comply with legal obligations.",
  ],
},
{
  heading: "6. Third-party services",
  paragraphs: [
    "We host the site on Cloudflare Pages and store assets using Cloudflare infrastructure. If you embed or follow links to external platforms (for example X, Discord, or Xiaohongshu) their respective privacy policies apply. We encourage you to review those policies before sharing personal information on third-party services.",
  ],
},
{
  heading: "7. Security",
  paragraphs: [
    "We implement reasonable safeguards, including HTTPS, access controls, and regular dependency audits. Nevertheless, no method of transmission or storage is completely secure. If we become aware of an incident that compromises personal data, we will notify affected individuals in accordance with applicable law and outline remediation steps.",
  ],
},
{
  heading: "8. Your rights",
  paragraphs: [
    "Depending on your jurisdiction you may have rights to access, rectify, or erase personal data we hold about you. To exercise these rights, email firenull52@gmail.com with sufficient detail for verification. We will respond within thirty days, subject to lawful extensions when requests are particularly complex.",
  ],
},
{
  heading: "9. Children's privacy",
  paragraphs: [
    "The Service is intended for users aged 16 and above. We do not knowingly collect personal data from children. If you believe a minor has provided data to us, contact us so we can remove it promptly.",
  ],
},
{
  heading: "10. Changes to this policy",
  paragraphs: [
    "We may update this Policy to reflect new functionality or regulatory requirements. Updates will be posted on this page with a revised “Last updated” date. Material changes may also be announced via the blog or contributor mailing list.",
  ],
},
{
  heading: "11. Contact",
  paragraphs: [
    "For privacy-related questions or requests, reach out to firenull52@gmail.com. Please include the nature of your inquiry and relevant URLs so we can investigate efficiently.",
  ],
}
];

export default function PrivacyPage({ sections }: PrivacyPageProps) {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ];
  const footerItems = [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy", active: true },
    { label: "Contact Us", href: "/contact" },
  ];
  const legalItems = [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <SeoMeta
        title="Privacy Policy – AI Image Prompt Gallery"
        description="#1 Privacy commitments covering analytics, submissions, retention, and user rights for the AI Image Prompt gallery."
        url="/privacy"
        locale="en_US"
      />
      <SiteLayout language="en" navItems={navItems} footerItems={footerItems} legalItems={legalItems}>
        <article className="mx-auto max-w-3xl space-y-8">
          <header className="space-y-4">
            <h1 className="text-3xl font-semibold text-cyan-100">Privacy Policy</h1>
            <p className="text-sm text-slate-400">Last updated: 25 September 2025</p>
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

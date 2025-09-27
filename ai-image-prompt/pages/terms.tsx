import { GetServerSideProps } from "next";
import SiteLayout from "@/components/SiteLayout";
import { SeoMeta } from "@/components/SeoMeta";

interface Section {
  heading: string;
  paragraphs: string[];
}

interface TermsPageProps {
  sections: Section[];
}

export const getServerSideProps: GetServerSideProps<TermsPageProps> = async () => {
  const sections: Section[] = [
    {
      heading: "1. Agreement to terms",
      paragraphs: [
        "AI Image Prompt (the “Service”) is operated by the AI Image Prompt Team (“we”, “our”, “us”). By accessing https://ai-image-prompt.com or any associated subpages you agree to these Terms of Service. If you do not agree, please stop using the Service immediately. The Terms may evolve as our gallery and tooling mature; continued use after an update constitutes acceptance of the revised document.",
        "Use of the Service is limited to individuals who can form legally binding contracts in their jurisdiction. By accessing the site you confirm that you meet this requirement and that the information you provide while interacting with us is accurate, current, and complete."],
    },
    {
      heading: "2. Purpose of the Service",
      paragraphs: [
        "The Service curates reproducible prompts, reference assets, and educational material related to the Nano Banana and GPT-4o image generation models. All content is provided for research, inspiration, and workflow documentation. We do not sell prompts, grant commercial licences, or guarantee that the models will deliver identical results in your environment. You are responsible for verifying whether your usage complies with the terms of the underlying model providers.",
        "The gallery is intentionally bilingual (English and Chinese). In the event of translation discrepancies, the English dataset serves as the authoritative reference for metadata while both languages remain available for human readability."],
    },
    {
      heading: "3. Use of curated content",
      paragraphs: [
        "You may copy prompts, study documentation, and adapt reference structures for your own projects provided you honour the attribution requirements of the original creators. Many examples link to social media posts or portfolio pages; follow those links to understand additional licensing constraints. If you intend to publish derivative work, you are responsible for contacting the original creator and obtaining the necessary permissions.",
        "You may not scrape the Service in a manner that degrades performance, nor may you repo, mirror, or commercially package the curated dataset without our written consent. Automated access for educational research is welcome as long as you respect rate limits and cite the gallery."],
    },
    {
      heading: "4. Submissions and contributor responsibilities",
      paragraphs: [
        "When you submit prompts, images, or documentation for inclusion, you represent that you own the rights to share the material or that it is available under terms that permit redistribution. You grant us a non-exclusive, worldwide licence to host, revise, and display the submission within the Service and related announcements. This licence is limited to showcasing, documenting, and discussing the submission; it does not transfer ownership.",
        "If a submission contains personal data or confidential information, redact it before sending. We reserve the right to reject or remove any material that appears to violate law, infringe intellectual property, or conflict with our publication standards."],
    },
    {
      heading: "5. Accuracy and availability",
      paragraphs: [
        "We validate each case before publication, but the models and APIs we reference evolve rapidly. Prompts may produce different results when models receive updates, when reference assets change, or when third-party services modify their behaviour. The Service is provided “as is” without warranties of any kind, express or implied, including accuracy, fitness for a particular purpose, or non-infringement.",
        "We strive to maintain 24/7 availability yet downtime may occur for maintenance, upgrades, or reasons beyond our control. We are not liable for any loss resulting from service interruptions, prompt inconsistencies, or typographical errors."],
    },
    {
      heading: "6. Prohibited behaviour",
      paragraphs: [
        "You agree not to misuse the Service by attempting to gain unauthorised access, interfering with other users, uploading malicious code, or reverse engineering restricted areas. You may not use the Service to promote harassment, discrimination, or illegal activity. Content that violates these principles will be removed and repeat violators may be banned.",
        "You also agree not to misrepresent yourself as a representative of the Service or to imply endorsement without our written approval. All official announcements originate from the domain or from the email address listed in the footer."],
    },
    {
      heading: "7. Limitation of liability",
      paragraphs: [
        "To the maximum extent permitted by law we are not liable for indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill arising from your use of the Service. Our total liability for any claim is limited to one hundred (100) US dollars or the amount you paid us in the twelve months preceding the claim, whichever is less.",
        "Some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability, so the above limitations may not apply to you. In those cases our liability will be limited to the greatest extent permitted by the applicable law."],
    },
    {
      heading: "8. Changes to the Terms",
      paragraphs: [
        "We may update these Terms to reflect new features, legal requirements, or operational adjustments. When material changes occur we will update the “Last updated” date at the top of the page and, when practical, notify registered contributors via email. It is your responsibility to review the Terms periodically.",
        "If you continue to use the Service after changes take effect you are deemed to have accepted the revised Terms. If you disagree, you must discontinue use and, if applicable, request removal of your submissions."],
    },
    {
      heading: "9. Contact",
      paragraphs: [
        "For questions regarding these Terms, contributor agreements, or takedown requests, email firenull52@gmail.com. Please include detailed context so we can respond efficiently. We aim to reply within two business days.",
        "By contacting us you consent to receiving replies related to your inquiry. We handle personal data in line with our Privacy Policy, which provides additional details on retention and safeguarding."],
    },
  ];

  return { props: { sections } };
};

export default function TermsPage({ sections }: TermsPageProps) {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ];
  const footerItems = [
    { label: "Terms of Service", href: "/terms", active: true },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <SeoMeta
        title="Terms of Service – AI Image Prompt Gallery"
        description="#1 Terms governing use of the AI Image Prompt gallery, curated data, and contributor submissions."
        url="/terms"
        locale="en_US"
      />
      <SiteLayout language="en" navItems={navItems} footerItems={footerItems}>
        <article className="mx-auto max-w-3xl space-y-8">
          <header className="space-y-4">
            <h1 className="text-3xl font-semibold text-cyan-100">Terms of Service</h1>
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

import { GetServerSideProps } from "next";
import SiteLayout from "@/components/SiteLayout";
import { HomeView } from "@/components/HomeView";
import { SeoMeta } from "@/components/SeoMeta";
import { loadCases } from "@/lib/dataLoader";
import { getModelLabel } from "@/lib/models";
import { CaseWithTags } from "@/types/case";

interface HomeProps {
  cases: CaseWithTags[];
  models: Array<{ id: string; label: string }>;
  styles: string[];
  themes: string[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const cases = loadCases("en");
  const modelSet = new Map<string, string>();
  const styleSet = new Set<string>();
  const themeSet = new Set<string>();

  cases.forEach((item) => {
    modelSet.set(item.model, getModelLabel(item.model));
    item.styleTags.forEach((style) => styleSet.add(style));
    item.themeTags.forEach((theme) => themeSet.add(theme));
  });

  const models = Array.from(modelSet.entries()).map(([id, label]) => ({ id, label }));
  const styles = Array.from(styleSet).sort((a, b) => a.localeCompare(b));
  const themes = Array.from(themeSet).sort((a, b) => a.localeCompare(b));

  return {
    props: {
      cases,
      models,
      styles,
      themes,
    },
  };
};

export default function HomePage({ cases, models, styles, themes }: HomeProps) {
  const navItems = [
    { label: "Home", href: "/", active: true },
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

  return (
    <>
      <SeoMeta
        title="AI Image Prompt Gallery – Nano Banana & GPT-4o"
        description="#1 Explore curated AI image prompts, reproducible workflows, and cyberpunk-ready visuals crafted with Nano Banana and GPT-4o."
        url="/"
        locale="en_US"
      />
      <SiteLayout language="en" navItems={navItems} footerItems={footerItems} legalItems={legalItems}>
        <HomeView language="en" cases={cases} models={models} styles={styles} themes={themes} legalItems={legalItems} />
      </SiteLayout>
    </>
  );
}

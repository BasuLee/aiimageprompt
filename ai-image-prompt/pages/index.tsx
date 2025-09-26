import Head from "next/head";
import { GetServerSideProps } from "next";
import SiteLayout from "@/components/SiteLayout";
import { HomeView } from "@/components/HomeView";
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

  return (
    <>
      <Head>
        <title>AI Image Prompt Gallery – Nano Banana &amp; GPT-4o Highlights</title>
        <meta
          name="description"
          content="#1 Curated AI prompt gallery featuring Nano Banana and GPT-4o inspirations with cyberpunk energy."
        />
        <link rel="canonical" href="https://ai-image-prompt.com/" />
        <link rel="icon" href="/favicon.ico" type="image/png" />
      </Head>
      <SiteLayout language="en" navItems={navItems} footerItems={footerItems}>
        <HomeView language="en" cases={cases} models={models} styles={styles} themes={themes} />
      </SiteLayout>
    </>
  );
}

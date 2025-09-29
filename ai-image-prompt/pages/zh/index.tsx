import { GetServerSideProps } from "next";
import SiteLayout from "@/components/SiteLayout";
import { HomeView } from "@/components/HomeView";
import { SeoMeta } from "@/components/SeoMeta";
import { buildTagMap, loadCases } from "@/lib/dataLoader";
import { getModelLabel } from "@/lib/models";
import { CaseWithTags } from "@/types/case";

interface HomeProps {
  cases: CaseWithTags[];
  models: Array<{ id: string; label: string }>;
  styles: string[];
  themes: string[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const englishCases = loadCases("en");
  const tagMap = buildTagMap(englishCases);
  const cases = loadCases("zh", { tagMap });

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

export default function HomePageZh({ cases, models, styles, themes }: HomeProps) {
  const navItems = [
    { label: "首页", href: "/zh", active: true },
    { label: "博客", href: "/zh/blog" },
    { label: "常见问题", href: "/zh/faq" },
  ];

  const footerItems = [
    { label: "服务条款", href: "/zh/terms" },
    { label: "隐私政策", href: "/zh/privacy" },
    { label: "联系我们", href: "/zh/contact" },
  ];

  const legalItems = [
    { label: "服务条款", href: "/zh/terms" },
    { label: "隐私政策", href: "/zh/privacy" },
    { label: "联系我们", href: "/zh/contact" },
  ];

  return (
    <>
      <SeoMeta
        title="AI 提示词画廊 – Nano Banana 与 GPT-4o 精选案例"
        description="#1 AI 提示词画廊，精选 Nano Banana 与 GPT-4o 案例，呈现赛博朋克灵感。"
        url="/zh/"
        locale="zh_CN"
      />
      <SiteLayout language="zh" navItems={navItems} footerItems={footerItems} legalItems={legalItems}>
        <HomeView language="zh" cases={cases} models={models} styles={styles} themes={themes} legalItems={legalItems} />
      </SiteLayout>
    </>
  );
}

import Head from "next/head";
import { GetServerSideProps } from "next";
import SiteLayout from "@/components/SiteLayout";

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
  heading: "1. 概述",
  paragraphs: [
    "本隐私政策说明 AI Image Prompt 团队（“我们”）在你访问 https://ai-image-prompt.com（“本服务”）时如何收集、使用并保护信息。我们相信，提示词策展的透明度应延伸到个人数据的处理方式。使用本服务即表示你同意本政策。",
  ],
},
{
  heading: "2. 收集的信息",
  paragraphs: [
    "为运营画廊，我们仅收集有限数据。你浏览网站时，我们会记录标准的服务器日志（IP、浏览器、来源页面、时间戳）用于安全审计和流量分析。当你提交案例或发送电子邮件时，我们会收到你提供的内容、附件和联系方式。我们不使用侵入式追踪像素、不出售用户数据，也不会要求注册账号。",
  ],
},
{
  heading: "3. 信息用途",
  paragraphs: [
    "日志数据帮助我们分析访问趋势、侦测滥用、维持站点表现。投稿信息用于验证提示词、为创作者归属署名、回应反馈或下架请求。我们可能提取匿名化的统计数据（例如各模型案例数量）用于博客或路线图更新。",
  ],
},
{
  heading: "4. Cookies 与分析",
  paragraphs: [
    "本服务主要依赖服务端渲染与静态资源。我们仅使用一枚第一方 Cookie 记住你选择的语言。站点分析数据来自 Cloudflare Pages 提供的聚合指标，我们不会将原始浏览数据分享给第三方广告商。",
  ],
},
{
  heading: "5. 数据保留",
  paragraphs: [
    "服务器日志最长保存 90 天；若发生安全事件则可能延长。投稿邮件会作为策展档案保存，以便回溯来源、尊重创作者需求并记录版本变更。你可以通过 firenull52@gmail.com 申请删除投稿记录，除非法律要求我们保留。",
  ],
},
{
  heading: "6. 第三方服务",
  paragraphs: [
    "网站部署在 Cloudflare Pages，静态资源亦托管于 Cloudflare 基础设施。当你访问外部链接（如 X、Discord、小红书）时，应阅读相应平台的隐私政策；我们无法控制第三方服务如何处理你的数据。",
  ],
},
{
  heading: "7. 安全性",
  paragraphs: [
    "我们采取合理措施，包括 HTTPS、访问控制与依赖库审计，但任何传输或存储方式都无法保证绝对安全。一旦发现涉及个人信息的安全事件，我们会按照适用法律通知受影响用户，并说明补救步骤。",
  ],
},
{
  heading: "8. 你的权利",
  paragraphs: [
    "不同司法辖区的用户可能享有访问、纠正或删除个人信息的权利。若你希望行使这些权利，请发送邮件至 firenull52@gmail.com，并提供足以核实身份的信息。我们将在三十天内回复；若请求复杂，可在法律允许范围内延长。",
  ],
},
{
  heading: "9. 儿童隐私",
  paragraphs: [
    "本服务面向 16 岁及以上用户，我们不会主动收集儿童个人信息。如果你认为未成年人向我们提供了数据，请立即联系我们，以便尽快删除。",
  ],
},
{
  heading: "10. 政策更新",
  paragraphs: [
    "我们可能因功能或法规变化而更新本政策。更新内容会显示在本页，并更新“最后更新”日期；重大变更可能通过博客或投稿者邮件列表通知。",
  ],
},
{
  heading: "11. 联系方式",
  paragraphs: [
    "如需咨询隐私相关问题，请邮件联系 firenull52@gmail.com，并附上具体网址或背景信息，以便我们及时处理。",
  ],
}
];

export default function PrivacyPageZh({ sections }: PrivacyPageProps) {
  const navItems = [
    { label: "首页", href: "/zh" },
    { label: "博客", href: "/zh/blog" },
    { label: "常见问题", href: "/zh/faq" },
  ];
  const footerItems = [
    { label: "服务条款", href: "/zh/terms" },
    { label: "隐私政策", href: "/zh/privacy", active: true },
    { label: "联系我们", href: "/zh/contact" },
  ];

  return (
    <>
      <Head>
        <title>隐私政策 – AI 提示词画廊</title>
        <meta
          name="description"
          content="#1 说明我们如何收集、使用并保护与提示词策展相关的数据。"
        />
        <link rel="canonical" href="https://ai-image-prompt.com/zh/privacy" />
        <link rel="icon" href="/favicon.ico" type="image/png" />
      </Head>
      <SiteLayout language="zh" navItems={navItems} footerItems={footerItems}>
        <article className="mx-auto max-w-3xl space-y-8">
          <header className="space-y-4">
            <h1 className="text-3xl font-semibold text-cyan-100">隐私政策</h1>
            <p className="text-sm text-slate-400">最后更新：2025 年 9 月 25 日</p>
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

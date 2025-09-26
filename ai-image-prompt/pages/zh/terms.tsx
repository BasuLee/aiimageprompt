import Head from "next/head";
import { GetServerSideProps } from "next";
import SiteLayout from "@/components/SiteLayout";

interface Section {
  heading: string;
  paragraphs: string[];
}

interface TermsPageProps {
  sections: Section[];
}

export const getServerSideProps: GetServerSideProps<TermsPageProps> = async () => {
  return { props: { sections: SECTIONS } };
};

const SECTIONS: Section[] = [
{
  heading: "1. 条款的接受",
  paragraphs: [
    "AI Image Prompt（以下简称“本服务”）由 AI Image Prompt 团队运营（“我们”）。访问 https://ai-image-prompt.com 及其子页面，即表示你同意本条款；若不同意，请立即停止使用。本条款可能随画廊功能或法律要求的变化而更新，你在更新后继续使用视为接受修订内容。",
    "你确认自己具备在所属司法辖区签订具法律效力协议的能力，并保证在使用过程中提供的信息真实、准确、完整。",
  ],
},
{
  heading: "2. 服务目的",
  paragraphs: [
    "本服务用于整理 Nano Banana 与 GPT-4o 模型相关的提示词、参考素材与教学内容，供研究、灵感与流程记录之用。我们不出售提示词、也不对模型在你本地环境下的表现做出担保。使用者应自行确认行为是否符合模型提供方的使用条款。",
    "画廊提供中英文双语内容。如出现翻译理解差异，以英文数据结构为最终参照，各语言文本仅作为阅读辅助。",
  ],
},
{
  heading: "3. 对策展内容的使用",
  paragraphs: [
    "你可以复制提示词、研究文档，并在注明原作者的前提下调整结构。如果需要公开发布衍生作品，应根据详情页提供的原帖链接联系创作者，获取额外授权。",
    "你不得以破坏性方式抓取站点数据，也不得在未经书面许可的情况下重新封装、销售或镜像整个数据集。若用于教学或研究的自动化访问，请遵守速率限制并注明来源。",
  ],
},
{
  heading: "4. 投稿者责任",
  paragraphs: [
    "当你提交提示词、图片或文档时，表示你拥有分享这些素材的权利，或素材处于允许再分发的授权范围内。你授予我们一项非独占的全球许可，用于在本服务及相关公告中展示、编辑和说明该投稿，该许可不涉及所有权转移。",
    "如投稿包含个人信息或保密内容，请在提交前完成脱敏处理。我们保留拒绝或移除涉嫌违法、侵权或不符合发布标准内容的权利。",
  ],
},
{
  heading: "5. 准确性与可用性",
  paragraphs: [
    "我们会在发布前验证案例，但模型与接口更新频繁，提示词可能因版本、参考素材或第三方服务变动而产生差异。本服务按“现状”提供，不对准确性、特定用途适用性或不侵权作任何明示或默示保证。",
    "我们努力保持服务稳定，但维护、升级或不可抗力可能导致中断。因停机、内容错误或提示差异造成的损失，我们不承担责任。",
  ],
},
{
  heading: "6. 禁止行为",
  paragraphs: [
    "你不得尝试未经授权的访问、干扰其他用户、上传恶意代码或逆向受保护的系统；也不得利用本服务传播骚扰、歧视或违法内容。违反者的相关内容会被移除，情节严重者可被禁止访问。",
    "未经书面许可，你不得自称为本服务代表，也不得暗示我们为任何第三方背书。所有官方公告仅来自本站或页脚列出的邮箱。",
  ],
},
{
  heading: "7. 责任限制",
  paragraphs: [
    "在法律允许的最大范围内，我们不对因使用本服务而产生的任何间接、附带、特殊或惩罚性损害承担责任，包括利润、数据或商誉损失。若法律禁止责任完全排除，我们的总责任不超过一百美元或你在此前十二个月向我们支付的费用（以较低者为准）。",
    "某些司法辖区不允许排除特定保证或限制赔偿责任，上述限制在该等法律范围内可能不适用，在此情况下我们仅在法律允许的最大范围内承担责任。",
  ],
},
{
  heading: "8. 条款变更",
  paragraphs: [
    "我们可能因功能调整或法律要求而修改本条款。若属重大变更，我们会更新页面顶部的“最后更新”日期，并在可行时通过邮件通知注册的投稿者。请定期审阅本条款。",
    "在修订生效后继续使用本服务，视为你接受新的条款；若不同意，应停止使用并视情况申请删除投稿。",
  ],
},
{
  heading: "9. 联系方式",
  paragraphs: [
    "若对本条款、投稿协议或下架请求有疑问，请发送邮件至 firenull52@gmail.com。请附详细说明以便我们及时处理，通常会在两个工作日内回复。",
    "联系我们即表示你同意接收与该请求相关的回复。我们会按照隐私政策说明的方式处理你的个人信息。",
  ],
}
];

export default function TermsPageZh({ sections }: TermsPageProps) {
  const navItems = [
    { label: "首页", href: "/zh" },
    { label: "博客", href: "/zh/blog" },
    { label: "常见问题", href: "/zh/faq" },
  ];
  const footerItems = [
    { label: "服务条款", href: "/zh/terms", active: true },
    { label: "隐私政策", href: "/zh/privacy" },
    { label: "联系我们", href: "/zh/contact" },
  ];

  return (
    <>
      <Head>
        <title>服务条款 – AI 提示词画廊</title>
        <meta
          name="description"
          content="#1 说明使用 AI 提示词画廊及投稿须遵守的条款。"
        />
        <link rel="canonical" href="https://ai-image-prompt.com/zh/terms" />
        <link rel="icon" href="/favicon.ico" type="image/png" />
      </Head>
      <SiteLayout language="zh" navItems={navItems} footerItems={footerItems}>
        <article className="mx-auto max-w-3xl space-y-8">
          <header className="space-y-4">
            <h1 className="text-3xl font-semibold text-cyan-100">服务条款</h1>
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

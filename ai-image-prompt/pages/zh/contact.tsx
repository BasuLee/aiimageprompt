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
  heading: "联系方式",
  paragraphs: [
    "请发送邮件至 firenull52@gmail.com。该邮箱由策展人、工程师与编辑共同维护，你的邮件会被自动归档进入相应的看板。建议在主题中注明需求，例如“投稿 – Nano Banana 发型替换案例”或“下架请求 – GPT-4o 提示词 33”，以便我们快速分配。",
    "若需分享大文件，请使用可共享的链接（Google Drive、Dropbox 等），避免超出附件限制。我们会将链接与元数据一起存档，便于追溯。",
  ],
},
{
  heading: "投稿指南",
  paragraphs: [
    "投稿时请提供：完整提示词、使用的模型版本、参数调整、种子（如需复现）、参考素材以及创作意图说明。如案例有特殊注意事项（例如“仅适用于方形裁切”或“需 1.4 版 GPU”），也请一并注明。",
    "提示词无需特殊格式，直接写文本即可。若有过程笔记或对比图，可附上链接或条目。我们会复现流程、记录身份一致性，再告知是否收录或列入未来研究。",
  ],
},
{
  heading: "信息更新或纠正",
  paragraphs: [
    "若你已被展示并希望更新信息（例如更换社交账号、调整授权、修改提示词），请附案例编号、修改内容及替换素材。我们会记录更改、重新生成 JSON，并同步到中英文页面。",
    "第三方提交的纠正请求需提供佐证，如原帖链接、发布时间或创作者确认。我们会在验证所有权后尽快处理。",
  ],
},
{
  heading: "下架与隐私请求",
  paragraphs: [
    "我们非常重视隐私与授权。如果你认为案例侵犯权益或希望撤下，请附案例编号、具体理由及支持文件。我们会在两个工作日内回复处理结果或提出进一步问题。",
    "一旦确认下架，我们会删除相关资源、更新 sitemap，并在变更日志中记录。若第三方镜像仍保留内容，建议另行联系其维护者——我们仅控制 ai-image-prompt.com 域名上的数据。",
  ],
},
{
  heading: "合作与媒体",
  paragraphs: [
    "我们欢迎推动负责任提示词实践的合作，例如联合制作教学资源、策划主题合集、举办工作坊。请在邮件中描述项目背景、时间表与预期交付，我们会在项目与路线图匹配时安排沟通。",
    "媒体采访也可通过同一邮箱联系，请告知所属媒体、截稿时间以及关注角度，以便我们提供可引用的背景资料。",
  ],
},
{
  heading: "回复时间",
  paragraphs: [
    "通常我们会在两个工作日内回复。若请求较复杂（如多案例审计），可能需要更长时间，但我们会先确认收到并提供预计时间。如果四个工作日后仍未得到回复，请适度提醒，避免邮件被误判为垃圾邮件。",
    "团队分布在不同时区，清晰完整的邮件能显著加快处理速度。",
  ],
}
];

export default function ContactPageZh({ sections }: ContactPageProps) {
  const navItems = [
    { label: "首页", href: "/zh" },
    { label: "博客", href: "/zh/blog" },
    { label: "常见问题", href: "/zh/faq" },
  ];
  const footerItems = [
    { label: "服务条款", href: "/zh/terms" },
    { label: "隐私政策", href: "/zh/privacy" },
    { label: "联系我们", href: "/zh/contact", active: true },
  ];

  return (
    <>
      <SeoMeta
        title="联系 AI 提示词画廊团队"
        description="#1 说明投稿、更新、下架与合作请求的联系渠道与处理流程。"
        url="/zh/contact"
        locale="zh_CN"
      />
      <SiteLayout language="zh" navItems={navItems} footerItems={footerItems}>
        <article className="mx-auto max-w-3xl space-y-8">
          <header className="space-y-4">
            <h1 className="text-3xl font-semibold text-cyan-100">联系我们</h1>
            <p className="text-base leading-7 text-slate-200">
              画廊因社区而生，清晰的沟通能让策展流程更顺畅。以下指引可帮助你的邮件快速抵达对应的策展人或工程师，我们也会在收到后的两个工作日内给出回应。
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

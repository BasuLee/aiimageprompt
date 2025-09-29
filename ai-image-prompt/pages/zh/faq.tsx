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
      question: "你们如何挑选进入画廊的案例？",
      answer: [
        "我们每周都会进行一次策展冲刺，关注 X、Discord、小红书与社区投稿表单。只有在拿到原始提示词、参数记录以及必要的参考素材后，案例才会进入候选列表。策展人会按照作者声明的模型版本完整复现流程，确认结果可重复或在需要随机性的场景下明确标注。复现过程中，我们会补充身份锚点、灯光意图、后期处理等信息，让读者理解创作思路，而不是对着截图猜测。",
        "若提示无法复现、版权状态不明或包含无法匿名化的敏感素材，我们会把案例留在内部研究库而不是公开画廊。这样的筛选有助于保持画廊的公信力，让真正需要可复现流程的团队可以放心使用。"
      ],
    },
    {
      question: "我想在自己的工作流里复刻案例，需要怎么做？",
      answer: [
        "瀑布流中的每张卡片都会链接到详情页，包含完整提示词、必要的输入素材说明以及创作者补充的操作备注。你可以一键复制提示词，也可以直接读取 /data 下的 JSON，在批量测试时更方便。我们的提示词遵循 Nano 蓝图结构：每个句子负责某一个维度，如构图、光线或材质，因此复制时请保持语序不变，以免打乱执行优先级。",
        "导入数据时，请保留原始文件名和目录结构，例如 /assets/nano-banana/case42 的层级。图片的 alt 文本已经标注了 input 或 output，方便你在做演示或 QA 时快速区分。"
      ],
    },
    {
      question: "如果图片缺失或加载很慢怎么办？",
      answer: [
        "所有资源都存放在 /public/assets 下，并在部署时同步到 Cloudflare Pages。我们优先提供 WebP，并启用懒加载以减小首页首屏压力。如果你的构建系统找不到文件，请确认已经保留数据脚本生成的文件夹名称；不同模型和案例编号会对应不同目录。",
        "如果确实遇到缺失，请附上案例 ID 发送邮件，我们的流水线里保存了校验值，可以快速恢复原图并重新生成数据文件，不会影响其他案例。"
      ],
    },
    {
      question: "首页的筛选标签是怎么来的？",
      answer: [
        "标签在构建数据时自动生成。系统会扫描提示词与备注中的关键词，把案例归类到特定风格（如 Cyberpunk、Photorealistic、Infographic）和主题（如 Character、Product、UI & Data 等）。英文数据是权威来源，中文数据继承同样的标签，以确保两种语言的筛选结果一致。界面交互在前端完成，但数据仍通过 getServerSideProps 载入，以符合 PRD 对 SSR 的要求。",
        "如果你认为某个案例应该增加新标签，可以提交建议。我们会重新审查提示词、必要时重新渲染，并同步更新 JSON 和 sitemap，使变更在全站生效。"
      ],
    },
    {
      question: "如何处理署名与版权问题？",
      answer: [
        "每条案例都会标注创作者账号，并跳转回原帖。我们只发布授权宽松或获得作者明确同意的内容。若创作者更改授权方式，我们会在日志中记录并视情况下架。站点不主张所有权，我们的角色是整理、测试并提供上下文，确保社区成员在互相学习的同时得到正确署名。",
        "如果你发现缺失引用或希望调整展示方式，请附上案例编号与说明发送邮件至 firenull52@gmail.com，我们会在两个工作日内回复。"
      ],
    },
    {
      question: "可以投稿或建议新的分类吗？",
      answer: [
        "非常欢迎。最佳投稿通常包含前后对比图或过程说明。请一并提供提示词、模型版本、参数改动以及相关素材，策展人会复现流程并告知是否收录或加入研究库。我们也会根据投稿数量评估新增标签的必要性，一旦达到门槛，就更新分类器并重新生成数据。",
        "若你希望合作推出主题合集或联合撰写深度文章，也可在邮件中描述想法，我们会协调上线时间以配合部署节奏。"
      ],
    },
    {
      question: "网站接下来的规划是什么？",
      answer: [
        "短期目标是强化可访问性，包括键盘导航、对比度切换，以及能朗读提示词的音频模式。我们还在测试自动化提示词校验，可以提前标记含糊动词或重复指令。中期会开放按标签筛选的 API 端点，方便工作坊或课堂快速调用素材。",
        "长期而言，我们希望记录 Nano Banana 与 GPT-4o 的多模态联动流程，提供从概念、动画到落地交付的完整范例。"
      ],
    },
  ];

  return { props: { items } };
};

export default function FAQPageZh({ items }: FAQPageProps) {
  const navItems = [
    { label: "首页", href: "/zh" },
    { label: "博客", href: "/zh/blog" },
    { label: "常见问题", href: "/zh/faq", active: true },
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
        title="AI 提示词常见问题 – 流程与规范"
        description="#1 解答关于策展流程、案例复现、授权管理及未来规划的常见问题。"
        url="/zh/faq"
        locale="zh_CN"
      />
      <SiteLayout language="zh" navItems={navItems} footerItems={footerItems} legalItems={legalItems}>
        <article className="mx-auto max-w-3xl space-y-10">
          <header className="space-y-4">
            <h1 className="text-3xl font-semibold text-cyan-100">常见问题</h1>
            <p className="text-base leading-7 text-slate-200">
              画廊的目标是提供可复现的提示词工作流，因此我们对文字说明同样投入大量精力。本页汇总了设计师、教育者与研究者最常提出的问题；若你仍有其他疑问，欢迎发送邮件至 firenull52@gmail.com，我们会尽快回复。
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

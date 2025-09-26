import Head from "next/head";
import { GetServerSideProps } from "next";
import SiteLayout from "@/components/SiteLayout";
import { ZH_BLOG_POSTS } from "@/content/blog/zh/posts";
import { BlogPost } from "@/types/blog";

interface BlogPageProps {
  posts: BlogPost[];
}

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async () => {
  return {
    props: {
      posts: ZH_BLOG_POSTS,
    },
  };
};

export default function BlogPageZh({ posts }: BlogPageProps) {
  const navItems = [
    { label: "首页", href: "/zh" },
    { label: "博客", href: "/zh/blog", active: true },
    { label: "常见问题", href: "/zh/faq" },
  ];
  const footerItems = [
    { label: "服务条款", href: "/zh/terms" },
    { label: "隐私政策", href: "/zh/privacy" },
    { label: "联系我们", href: "/zh/contact" },
  ];

  return (
    <>
      <Head>
        <title>AI 提示词工作日志</title>
        <meta
          name="description"
          content="#1 记录 Nano Banana 与 GPT-4o 策展经验、提示词写作方法与质量控制流程的博客。"
        />
        <link rel="canonical" href="https://ai-image-prompt.com/zh/blog" />
        <link rel="icon" href="/favicon.ico" type="image/png" />
      </Head>
      <SiteLayout language="zh" navItems={navItems} footerItems={footerItems}>
        <article className="space-y-12">
          <header className="space-y-5">
            <h1 className="text-3xl font-semibold text-cyan-100">Prompt Craft 工作日志</h1>
            <p className="text-base leading-7 text-slate-200">
              这是我们的策展团队留下的实践笔记。文章汇总了我们在维护 Nano Banana 与 GPT-4o 画廊过程中不断试错的经验——哪些写法稳定、哪些坑需要避开、哪些流程帮助我们在紧迫的交付周期中保持质量。你可以把它看作一份公开的操作手册，帮助团队快速上手提示词写作与案例复现。
            </p>
            <p className="text-base leading-7 text-slate-200">
              本季的主题包括：如何在大量局部编辑任务中保持人物身份一致、策展管线如何把零散的社交媒体内容转化成结构化数据、以及一套可在双语场景下复用的提示词模板库。我们会同步分享失败案例以及它们催生的规则，因为透明的复盘往往比成功案例更能推动流程优化。只要仓库更新，博客就会随之刷新，让你始终掌握最新的写作工具箱与伦理守则。
            </p>
            <section className="rounded-2xl border border-cyan-500/30 bg-slate-900/60 p-6 text-sm text-slate-200">
              <h2 className="mb-3 text-lg font-semibold text-cyan-200">阅读重点</h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>如何用模块化结构撰写高精度提示词，确保 Nano Banana 的身份保留能力发挥到极致。</li>
                <li>策展过程中从素材征集、版权确认到 JSON 生成的全链路记录，帮助你建立自己的数据流水线。</li>
                <li>面对快节奏制作周期时的应急模板、评分标准与质检流程，保证团队协作效率。</li>
                <li>关于署名、授权、版本迭代的实践心得，确保画廊长期可信、能经得起追溯。</li>
              </ul>
            </section>
          </header>

          <section className="space-y-10">
            {posts.map((post) => (
              <div key={post.slug} className="rounded-2xl border border-cyan-500/40 bg-slate-900/70 p-6 shadow-lg shadow-cyan-500/15">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">{new Date(post.publishDate).toLocaleDateString("zh-CN")}</p>
                  <h2 className="text-2xl font-semibold text-cyan-100">{post.title}</h2>
                  <p className="text-sm text-slate-300">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                    <span className="rounded-full border border-cyan-500/40 px-3 py-1">{post.author}</span>
                    {post.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-pink-500/40 px-3 py-1 text-pink-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={`/zh/blog/${post.slug}`}
                    className="inline-flex items-center text-sm text-cyan-200 transition hover:text-cyan-100"
                  >
                    阅读完整文章 →
                  </a>
                </div>
              </div>
            ))}
          </section>
        </article>
      </SiteLayout>
    </>
  );
}

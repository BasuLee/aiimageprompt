/* eslint-disable @next/next/no-html-link-for-pages */
import Head from "next/head";
import { GetServerSideProps } from "next";
import SiteLayout from "@/components/SiteLayout";
import { ZH_BLOG_POSTS } from "@/content/blog/zh/posts";
import { BlogPost } from "@/types/blog";

interface BlogDetailProps {
  post: BlogPost;
}

export const getServerSideProps: GetServerSideProps<BlogDetailProps> = async ({ params }) => {
  const slug = params?.slug;
  if (typeof slug !== "string") {
    return { notFound: true };
  }
  const post = ZH_BLOG_POSTS.find((item) => item.slug === slug);
  if (!post) {
    return { notFound: true };
  }
  return { props: { post } };
};

export default function BlogDetailPageZh({ post }: BlogDetailProps) {
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

  const canonicalUrl = `https://ai-image-prompt.com/zh/blog/${post.slug}`;

  return (
    <>
      <Head>
        <title>{post.title} – Prompt Craft 工作日志</title>
        <meta name="description" content={`#1 ${post.excerpt}`} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href="/favicon.ico" type="image/png" />
      </Head>
      <SiteLayout language="zh" navItems={navItems} footerItems={footerItems}>
        <article className="mx-auto max-w-3xl space-y-10">
          <header className="space-y-4">
            <a href="/zh/blog" className="inline-flex items-center text-sm text-cyan-200 transition hover:text-cyan-100">
              ← 返回博客列表
            </a>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">{new Date(post.publishDate).toLocaleDateString("zh-CN")}</p>
            <h1 className="text-3xl font-semibold text-cyan-100">{post.title}</h1>
            <div className="flex flex-wrap gap-3 text-xs text-slate-400">
              <span className="rounded-full border border-cyan-500/40 px-3 py-1">{post.author}</span>
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-pink-500/40 px-3 py-1 text-pink-200">
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          <section className="space-y-8 text-base leading-7 text-slate-200">
            {post.sections.map((section, index) => (
              <div key={index} className="space-y-4">
                {section.heading && <h2 className="text-2xl font-semibold text-cyan-100">{section.heading}</h2>}
                {section.paragraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul className="list-disc space-y-2 pl-6 text-sm text-slate-200/90">
                    {section.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        </article>
      </SiteLayout>
    </>
  );
}

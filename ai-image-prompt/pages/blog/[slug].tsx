/* eslint-disable @next/next/no-html-link-for-pages */
import { GetServerSideProps } from "next";
import SiteLayout from "@/components/SiteLayout";
import { EN_BLOG_POSTS } from "@/content/blog/en/posts";
import { BlogPost } from "@/types/blog";
import { SeoMeta } from "@/components/SeoMeta";

interface BlogDetailProps {
  post: BlogPost;
}

export const getServerSideProps: GetServerSideProps<BlogDetailProps> = async ({ params }) => {
  const slug = params?.slug;
  if (typeof slug !== "string") {
    return { notFound: true };
  }
  const post = EN_BLOG_POSTS.find((item) => item.slug === slug);
  if (!post) {
    return { notFound: true };
  }
  return { props: { post } };
};

export default function BlogDetailPage({ post }: BlogDetailProps) {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog", active: true },
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

  const canonicalUrl = `/blog/${post.slug}`;
  const title = `${post.title} | AI Prompt Guide`;

  return (
    <>
      <SeoMeta
        title={title}
        description={`#1 ${post.excerpt}`}
        url={canonicalUrl}
        type="article"
        locale="en_US"
      />
      <SiteLayout language="en" navItems={navItems} footerItems={footerItems} legalItems={legalItems}>
        <article className="mx-auto max-w-3xl space-y-10">
          <header className="space-y-4">
            <a href="/blog" className="inline-flex items-center text-sm text-cyan-200 transition hover:text-cyan-100">
              ← Back to all articles
            </a>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">{new Date(post.publishDate).toLocaleDateString("en-US")}</p>
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

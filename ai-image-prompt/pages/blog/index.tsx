import { GetServerSideProps } from "next";
import SiteLayout from "@/components/SiteLayout";
import { EN_BLOG_POSTS } from "@/content/blog/en/posts";
import { BlogPost } from "@/types/blog";
import { SeoMeta } from "@/components/SeoMeta";

interface BlogPageProps {
  posts: BlogPost[];
}

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async () => {
  return {
    props: {
      posts: EN_BLOG_POSTS,
    },
  };
};

export default function BlogPage({ posts }: BlogPageProps) {
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

  return (
    <>
      <SeoMeta
        title="AI Prompt Craft Blog – Field Notes & Frameworks"
        description="#1 Blog dedicated to prompt engineering strategies, curation workflows, and reusable formulas for Nano Banana and GPT-4o."
        url="/blog"
        locale="en_US"
      />
      <SiteLayout language="en" navItems={navItems} footerItems={footerItems} legalItems={legalItems}>
        <article className="space-y-12">
          <header className="space-y-5">
            <h1 className="text-3xl font-semibold text-cyan-100">Prompt Craft Journal</h1>
            <p className="text-base leading-7 text-slate-200">
              Welcome to the working log of our curation team. Every article distils experiments we run while maintaining the
              Nano Banana and GPT-4o galleries—what succeeds, what breaks, and the formulas we iterate on to keep delivery quality high.
              Think of it as the operations manual we wish existed when we started documenting AI image prompts. The entries below are
              updated alongside each repository refresh, so you will always find the most recent playbooks, tooling checklists, and
              ethical guidelines that drive the site.
            </p>
            <p className="text-base leading-7 text-slate-200">
              Highlights from this season include deep dives into identity-consistent editing, a behind-the-scenes look at our data
              ingestion pipeline, and a library of composable prompt formulas. Whether you are briefing a design sprint or auditing
              the provenance of a case study, these notes explain how we evaluate sources, structure multilingual instructions, and
              keep the cyberpunk aesthetic accessible across devices. We document not only the polished successes but also the fail
              cases that shaped our guardrails, because transparent post-mortems are the fastest path to better results.
            </p>
            <section className="rounded-2xl border border-cyan-500/30 bg-slate-900/60 p-6 text-sm text-slate-200">
              <h2 className="mb-3 text-lg font-semibold text-cyan-200">What you can expect</h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>Precise recipes for orchestrating Nano Banana edits without losing subject identity.</li>
                <li>Audit trails describing how prompts move from social posts into our validated dataset JSON.</li>
                <li>Reusable formulas and scoring rubrics that help teams respond to tight creative deadlines.</li>
                <li>Reflections on ethics, attribution, and the cadence of keeping a public gallery trustworthy.</li>
              </ul>
            </section>
          </header>

          <section className="space-y-10">
            {posts.map((post) => (
              <div key={post.slug} className="rounded-2xl border border-cyan-500/40 bg-slate-900/70 p-6 shadow-lg shadow-cyan-500/15">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">{new Date(post.publishDate).toLocaleDateString("en-US")}</p>
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
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-sm text-cyan-200 transition hover:text-cyan-100"
                  >
                    Read the full guide →
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

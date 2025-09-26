import fs from "fs";
import path from "path";
import { loadCases, buildTagMap } from "@/lib/dataLoader";
import { EN_BLOG_POSTS } from "@/content/blog/en/posts";
import { ZH_BLOG_POSTS } from "@/content/blog/zh/posts";

const BASE_URL = "https://ai-image-prompt.com";

function buildUrl(pathname: string) {
  return `${BASE_URL}${pathname}`;
}

function createSitemap() {
  const urls: string[] = [];

  // Core English pages
  ["/", "/blog", "/faq", "/terms", "/privacy", "/contact"].forEach((p) => urls.push(buildUrl(p)));

  // Blog posts
  EN_BLOG_POSTS.forEach((post) => urls.push(buildUrl(`/blog/${post.slug}`)));

  // Cases (English)
  const enCases = loadCases("en");
  enCases.forEach((item) => urls.push(buildUrl(`/cases/${item.slug}`)));

  // Chinese pages
  const zhBase = ["/zh", "/zh/blog", "/zh/faq", "/zh/terms", "/zh/privacy", "/zh/contact"];
  zhBase.forEach((p) => urls.push(buildUrl(p)));
  ZH_BLOG_POSTS.forEach((post) => urls.push(buildUrl(`/zh/blog/${post.slug}`)));

  const zhCases = loadCases("zh", { tagMap: buildTagMap(enCases) });
  zhCases.forEach((item) => urls.push(buildUrl(`/zh/cases/${item.slug}`)));

  const sitemapEntries = urls
    .map((loc) => `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;

  const outputPath = path.join(process.cwd(), "public", "sitemap.xml");
  fs.writeFileSync(outputPath, xml, "utf-8");
  console.log(`Generated sitemap with ${urls.length} URLs.`);
}

createSitemap();

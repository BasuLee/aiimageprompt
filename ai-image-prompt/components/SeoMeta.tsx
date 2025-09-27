import Head from "next/head";

interface SeoMetaProps {
  title: string;
  description: string;
  url: string;
  type?: "website" | "article";
  imagePath?: string;
  locale?: string;
}

const BASE_URL = "https://ai-image-prompt.com";
const DEFAULT_IMAGE = "/assets/bg.png";
const SITE_NAME = "AI Image Prompt";

export function SeoMeta({
  title,
  description,
  url,
  type = "website",
  imagePath = DEFAULT_IMAGE,
  locale = "en_US",
}: SeoMetaProps) {
  const absoluteUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;
  const absoluteImage = imagePath.startsWith("http") ? imagePath : `${BASE_URL}${imagePath}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={absoluteUrl} />
      <link rel="icon" href="/favicon.ico" type="image/png" />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:alt" content="AI image prompt – featured showcase" />
      <meta property="og:locale" content={locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
    </Head>
  );
}


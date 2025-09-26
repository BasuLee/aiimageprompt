export interface BlogSection {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  tags: string[];
  sections: BlogSection[];
}

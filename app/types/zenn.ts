// Zenn article types
export interface ZennArticle {
  title: string;
  link: string;
  published: string;
  id: string;
  description?: string;
}

export interface ZennFeed {
  avatarUrl?: string;
  articles: ZennArticle[];
}

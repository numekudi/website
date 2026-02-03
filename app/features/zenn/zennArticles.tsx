import { DateClientOnly } from "../qiita/DateClientOnly";
import type { ZennArticle } from "../../types";

interface Props {
  articles: ZennArticle[];
  zennError?: string;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ZennArticles({ articles, zennError }: Props) {
  if (zennError) {
    return (
      <aside className="w-full p-4 text-sm">
        <h3 className="font-semibold mb-4">Recent Articles</h3>
        <div className="text-red-600 text-xs">
          <div className="font-semibold mb-2">エラーが発生しました:</div>
          <div className="p-2 rounded border-l-2 border-red-500">
            {zennError}
          </div>
        </div>
      </aside>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <aside className="w-full p-4 text-sm">
        <h3 className="font-semibold mb-4">Recent Articles</h3>
        <div className="">Could not load Zenn articles</div>
      </aside>
    );
  }

  return (
    <aside className="w-full p-4 text-sm">
      <h3 className="font-semibold mb-4">Recent Articles</h3>
      <div className="space-y-3">
        {articles.slice(0, 5).map((article) => (
          <div key={article.id}>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:underline text-sm leading-tight hover:opacity-75 transition-opacity"
            >
              {article.title}
            </a>
            <DateClientOnly dateStr={article.published} />
          </div>
        ))}
      </div>
    </aside>
  );
}
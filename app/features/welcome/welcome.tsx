import Display from "./display";
import GithubBadge from "../github/githubBadge";
import OverlayText from "./overlayText";
import GithubGrass from "../github/githubGrass";
import QiitaBadge from "../qiita/qiitaBadge";
import QiitaArticles from "../qiita/qiitaArticles";
import Career from "./career";
import { type ReactNode } from "react";
import type { GitHubContributions, QiitaArticle } from "../../types";

export function Welcome({
  githubContributions,
  githubError,
  qiitaArticles,
  qiitaError,
  children,
}: {
  githubContributions: GitHubContributions | null;
  githubError?: string;
  qiitaArticles: QiitaArticle[];
  qiitaError?: string;
  children?: ReactNode;
}) {
  const githubAvatarUrl = `https://github.com/numekudi.png`;
  const qiitaAvatarUrl =
    "https://cdn.primitive-ojisan.com/about/qiita_icon.webp";
  return (
    <main className="flex flex-col">
      <div className="relative">
        <Display />
        <div className="absolute flex top-0 w-full h-full pointer-events-none">
          <div className="mt-auto my-8 w-full px-4">
            <OverlayText />
          </div>
        </div>
      </div>
      <div className="px-2 py-12 space-y-12">
        <p className="text-base mt-2">
          A Web service Developer with a Side of AI & Mobile.
        </p>
        <div>
          <GithubBadge avatarUrl={githubAvatarUrl} />
          <GithubGrass
            githubContributions={githubContributions}
            githubError={githubError}
          />
        </div>
        {children}
        <div>
          <QiitaBadge avatarUrl={qiitaAvatarUrl} />
          <QiitaArticles articles={qiitaArticles} qiitaError={qiitaError} />
        </div>
        <Career />
      </div>
    </main>
  );
}

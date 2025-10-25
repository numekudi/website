import Display from "./display";
import GithubBadge from "./githubBadge";
import OverlayText from "./overlayText";
import GithubGrass from "./githubGrass";
import QiitaBadge from "./qiitaBadge";
import QiitaArticles from "./qiitaArticles";
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
        <h2 className="text-2xl font-bold mb-2">I’m numekudi.</h2>
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
          <QiitaBadge avatarUrl={githubAvatarUrl} />
          <QiitaArticles articles={qiitaArticles} qiitaError={qiitaError} />
        </div>
        <Career />
      </div>
    </main>
  );
}

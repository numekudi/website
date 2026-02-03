import type { Route } from "./+types/home";
import { Welcome } from "../features/welcome/welcome";
import { Outlet } from "react-router";
import type { GitHubContributions, GitHubGraphQLResponse, QiitaArticle, ZennArticle } from "../types";
import Parser from 'rss-parser';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "numekudi" },
    {
      name: "description",
      content: "yowayowa namekuzi engineer personal website",
    },
  ];
}

// Cache helper functions
const CACHE_TTL = 24 * 60 * 60; // 1 day in seconds

async function getCachedData<T>(
  kv: KVNamespace,
  key: string,
  fetchFn: () => Promise<T>,
): Promise<T> {
  // Try to get from cache first
  const cached = await kv.get(key, "json");
  if (cached) {
    return cached as T;
  }

  // If not in cache, fetch fresh data
  const freshData = await fetchFn();

  // Store in cache with TTL
  await kv.put(key, JSON.stringify(freshData), {
    expirationTtl: CACHE_TTL,
  });

  return freshData;
}

async function fetchGithubContributions(githubAccessToken: string): Promise<GitHubContributions> {
  const query = `
    query {
      viewer {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${githubAccessToken}`,
      "Content-Type": "application/json",
      "User-Agent": "Portfolio-Website/1.0",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  }

  const data: GitHubGraphQLResponse = await response.json();

  if (data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
  }

  const contributionCalendar = data.data?.viewer?.contributionsCollection?.contributionCalendar;
  
  if (!contributionCalendar) {
    throw new Error("No contribution calendar data found in response");
  }

  return contributionCalendar;
}

async function fetchQiitaArticles(): Promise<QiitaArticle[]> {
  const response = await fetch("https://qiita.com/numekudi/feed");

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  }

  const feedText = await response.text();
  const parser = new Parser();
  
  try {
    const feed = await parser.parseString(feedText);
    
    return feed.items?.slice(0, 5).map((item, index) => ({
      title: item.title || `Article ${index + 1}`,
      link: item.link || "#",
      published: item.isoDate || item.pubDate || "",
      id: item.guid || `qiita-article-${index}`,
    })) || [];
  } catch (error) {
    throw new Error(`Failed to parse Qiita RSS: ${error}`);
  }
}

async function fetchZennArticles(): Promise<ZennArticle[]> {
  const response = await fetch("https://zenn.dev/numekudi/feed");

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  }

  const feedText = await response.text();
  const parser = new Parser();
  
  try {
    const feed = await parser.parseString(feedText);
    
    return feed.items?.slice(0, 5).map((item, index) => ({
      title: item.title || `Article ${index + 1}`,
      link: item.link || "#",
      published: item.isoDate || item.pubDate || "",
      id: item.guid || `zenn-article-${index}`,
      description: item.contentSnippet?.substring(0, 150) + "..." || "",
    })) || [];
  } catch (error) {
    throw new Error(`Failed to parse Zenn RSS: ${error}`);
  }
}

export async function loader({ context }: Route.LoaderArgs) {
  const githubAccessToken = context.cloudflare.env.GITHUB_ACCESS_TOKEN;
  const kv = context.cloudflare.env.API_CACHE;

  // Fetch GitHub, Qiita, and Zenn data with caching
  const [githubResult, qiitaResult, zennResult] = await Promise.allSettled([
    githubAccessToken
      ? getCachedData(kv, "github-contributions", () =>
          fetchGithubContributions(githubAccessToken),
        )
      : Promise.reject(new Error("No GitHub access token found")),
    getCachedData(kv, "qiita-articles", fetchQiitaArticles),
    getCachedData(kv, "zenn-articles", fetchZennArticles),
  ]);

  const githubContributions =
    githubResult.status === "fulfilled" ? githubResult.value : null;
  const githubError =
    githubResult.status === "rejected"
      ? `Fetch error: ${githubResult.reason}`
      : undefined;

  const qiitaArticles =
    qiitaResult.status === "fulfilled" ? qiitaResult.value : [];
  const qiitaError =
    qiitaResult.status === "rejected"
      ? `Fetch error: ${qiitaResult.reason}`
      : undefined;

  const zennArticles =
    zennResult.status === "fulfilled" ? zennResult.value : [];
  const zennError =
    zennResult.status === "rejected"
      ? `Fetch error: ${zennResult.reason}`
      : undefined;

  return {
    githubContributions,
    githubError,
    qiitaArticles,
    qiitaError,
    zennArticles,
    zennError,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <Welcome
      githubContributions={loaderData.githubContributions}
      githubError={loaderData.githubError}
      qiitaArticles={loaderData.qiitaArticles}
      qiitaError={loaderData.qiitaError}
      zennArticles={loaderData.zennArticles}
      zennError={loaderData.zennError}
    >
      <Outlet />
    </Welcome>
  );
}

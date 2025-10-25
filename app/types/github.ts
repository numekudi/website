// GitHub contribution types
export interface ContributionDay {
  contributionCount: number;
  date: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface GitHubContributions {
  totalContributions: number;
  weeks: ContributionWeek[];
}

// GitHub GraphQL API response types
export interface GitHubGraphQLResponse {
  data?: {
    viewer?: {
      contributionsCollection?: {
        contributionCalendar?: GitHubContributions;
      };
    };
  };
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}
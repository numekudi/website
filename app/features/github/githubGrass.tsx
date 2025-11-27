import { useEffect, useRef } from "react";
import type { GitHubContributions } from "../../types/github";

interface Props {
  githubContributions: GitHubContributions | null;
  githubError?: string;
}

function getContributionLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

function getContributionClasses(level: number): string {
  const baseClasses = "w-2.5 h-2.5 hover:scale-110";
  switch (level) {
    case 0:
      return `${baseClasses} bg-gray-200 dark:bg-gray-800/50`;
    case 1:
      return `${baseClasses} bg-green-900/80`;
    case 2:
      return `${baseClasses} bg-green-700/90`;
    case 3:
      return `${baseClasses} bg-green-500`;
    case 4:
      return `${baseClasses} bg-green-400`;
    default:
      return `${baseClasses} bg-gray-200 dark:bg-gray-800/50`;
  }
}

export default function GithubGrass({
  githubContributions,
  githubError,
}: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current && githubContributions) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, [githubContributions]);

  if (githubError) {
    return (
      <aside className="w-full p-4 text-sm">
        <h3 className="font-semibold mb-4 ">GitHub Activity</h3>
        <div className="text-red-600 text-xs">
          <div className="font-semibold mb-2">エラーが発生しました:</div>
          <div className="p-2 rounded border-l-2 border-red-500">
            {githubError}
          </div>
        </div>
      </aside>
    );
  }

  if (!githubContributions) {
    return (
      <aside className="w-full p-4 rounded-lg text-sm bg-gray-900/30 border border-gray-700/30">
        <h3 className="font-semibold mb-4">GitHub Activity</h3>
        <div className="">Could not load GitHub activity data</div>
      </aside>
    );
  }

  const { totalContributions, weeks } = githubContributions;

  return (
    <aside className="w-full text-sm">
      <h3 className="font-semibold mb-4">GitHub Activity</h3>

      <div className="mb-4">
        <span className="">
          {" "}
          <span className="font-semibold">{totalContributions}</span>{" "}
          contributions in the last year
        </span>
      </div>

      <div
        className="pb-4 overflow-x-auto"
        ref={scrollContainerRef}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          direction: "rtl",
        }}
      >
        <div className="flex gap-0.5 min-w-fit" style={{ direction: "ltr" }}>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-0.5">
              {week.contributionDays.map((day, dayIndex) => {
                const level = getContributionLevel(day.contributionCount);
                return (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={getContributionClasses(level)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-3 text-xs">
        <span>Less</span>
        <div className="flex gap-0.5">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={getContributionClasses(level).replace(
                "hover:scale-110",
                "",
              )}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </aside>
  );
}

import { useEffect, useState } from "react";

export type Activity = {
  type: number;
  name: string;
  timestamps?: { start?: number; end?: number };
  state?: string;
  details?: string;
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
};

function activityType(n: number) {
  switch (n) {
    case 0:
      return "Software";
    case 1:
      return "Streaming";
    case 2:
      return "Listening";
    case 3:
      return "Watching";
    case 4:
      return "Custom";
    case 5:
      return "Competing";
    default:
      return "Unknown";
  }
}

function normalizeTimestamp(ts?: number) {
  if (!ts) return null;
  // Lanyard may provide seconds or milliseconds. Convert to ms if it's seconds.
  const maybeMs = ts > 1e12 ? ts : ts * 1000;
  return new Date(maybeMs);
}

function isFullUrl(s?: string) {
  return !!s && (s.startsWith("http://") || s.startsWith("https://"));
}

/**
 * Format a millisecond duration into H:MM:SS or M:SS.
 */
function formatDuration(ms: number) {
  if (ms <= 0) return "0:00";
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const hours = Math.floor(totalSeconds / 3600);

  const ss = String(seconds).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  if (hours > 0) {
    return `${hours}:${mm}:${ss}`;
  }
  return `${minutes}:${ss}`;
}

/**
 * Format a Date deterministically using UTC so server and client renders match.
 * Produces: YYYY/MM/DD HH:MM:SS (UTC)
 */
function formatDateUTC(d?: Date | null) {
  if (!d) return "";
  const Y = d.getUTCFullYear();
  const M = String(d.getUTCMonth() + 1).padStart(2, "0");
  const D = String(d.getUTCDate()).padStart(2, "0");
  const h = String(d.getUTCHours()).padStart(2, "0");
  const m = String(d.getUTCMinutes()).padStart(2, "0");
  const s = String(d.getUTCSeconds()).padStart(2, "0");
  return `${Y}/${M}/${D} ${h}:${m}:${s} UTC`;
}

/**
 * ElapsedTime component: client-only display of elapsed/remaining time.
 * Renders nothing during SSR to avoid hydration mismatch from Date values.
 */
function ElapsedTime({
  start,
  end,
}: {
  start?: Date | null;
  end?: Date | null;
}) {
  const [mounted, setMounted] = useState(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // Do not render any time-related text during SSR — wait until mounted.
  if (!mounted || !start) return null;

  const now = new Date();
  if (end) {
    const remainingMs = end.getTime() - now.getTime();
    if (remainingMs <= 0) {
      return <div className="text-xs">Ended</div>;
    }
    return (
      <div className="text-xs">Remaining: {formatDuration(remainingMs)}</div>
    );
  } else {
    const elapsedMs = now.getTime() - start.getTime();
    return <div className="text-xs">Elapsed: {formatDuration(elapsedMs)}</div>;
  }
}

/**
 * Try to produce an image URL for an activity asset.
 * We conservatively only accept full urls. Many Lanyard assets are keys that
 * require an app id to build a CDN url; handling all variants is brittle,
 * so we only render an <img> when the asset already looks like a URL.
 */
function assetImageUrl(asset?: string) {
  if (!asset) return null;
  if (isFullUrl(asset)) return asset;
  // Some assets can already be full urls prefixed with cdn scheme or external markers.
  // If not a full URL, we avoid guessing and return null so the component falls back to initials.
  return null;
}

export default function DiscordActivities({
  activities,
  isLoading = false,
}: {
  activities?: Activity[] | null;
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="mt-4 space-y-3">
        <div className="h-[120px] flex items-center gap-4 p-4 rounded-md bg-white/5 animate-pulse">
          <div className="flex-shrink-0 w-12 h-12 rounded bg-gray-800"></div>
          <div className="flex-1 min-w-0">
            <div className="h-4 bg-gray-400 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-500 rounded w-1/2 mb-1"></div>
            <div className="h-3 bg-gray-500 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="mt-4 space-y-3">
        <div className="h-[120px] flex items-center gap-4 p-4 rounded-md bg-white/5">
          <div className="flex-shrink-0 w-12 h-12 rounded overflow-hidden bg-gray-800 flex items-center justify-center">
            <div className="text-sm text-gray-300">NA</div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm">No Discord activities.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      {activities.map((a, i) => {
        const started = normalizeTimestamp(a.timestamps?.start);
        const ended = normalizeTimestamp(a.timestamps?.end);
        const imgUrl =
          assetImageUrl(a.assets?.large_image) ||
          assetImageUrl(a.assets?.small_image);

        const initials =
          a.name
            .split(/\s+/)
            .map((s) => s[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || a.name.slice(0, 2).toUpperCase();

        return (
          <div
            key={i}
            className="h-[120px] flex items-center gap-4 p-4 rounded-md bg-white/5"
            role="group"
            aria-label={`Discord activity ${a.name}`}
          >
            <div className="flex-shrink-0 w-12 h-12 rounded overflow-hidden bg-gray-800 flex items-center justify-center">
              {imgUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imgUrl}
                  alt={a.assets?.large_text ?? a.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-sm text-gray-300">{initials}</div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-4">
                <div className="truncate">
                  <div className="font-medium truncate">{a.name}</div>
                  <div className="text-xs truncate">{activityType(a.type)}</div>
                </div>
                <div className="text-xs text-right">
                  {a.assets?.large_text ?? a.assets?.small_text}
                </div>
              </div>

              {a.details && (
                <div className="text-sm mt-1 truncate">{a.details}</div>
              )}
              {a.state && (
                <div className="text-sm mt-1 truncate">{a.state}</div>
              )}

              <div className="text-xs mt-2 flex flex-wrap gap-4">
                {started && <div>Started: {formatDateUTC(started)}</div>}
                {ended && <div>Ends: {formatDateUTC(ended)}</div>}
                {started && <ElapsedTime start={started} end={ended} />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

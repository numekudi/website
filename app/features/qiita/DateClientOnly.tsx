import { useEffect, useState } from "react";

export function DateClientOnly({ dateStr }: { dateStr: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const date = new Date(dateStr);
  return (
    <div className="text-xs opacity-60 mt-1">
      {date.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </div>
  );
}

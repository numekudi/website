import { Switch } from "@headlessui/react";
import { useColorScheme } from "~/hooks/useColorScheme";
import { FiSun, FiMoon } from "react-icons/fi";
import { FaMarkdown } from "react-icons/fa";

export default function Header() {
  const { scheme, toggle } = useColorScheme();
  const isDark = scheme === "dark";

  return (
    <div className="flex px-2 justify-between items-center w-full bg-linear-to-t from-white/0 to-white dark:from-zinc-900/0 dark:to-zinc-900">
      <div className="w-24">
        <a href="/llms.txt" aria-label="llms.txt">
          <FaMarkdown />
        </a>
      </div>
      <div className="flex items-center gap-2 w-24">
        <FiSun className="text-yellow-500" />
        <Switch
          checked={isDark}
          onChange={() => toggle()}
          className={
            "bg-gray-700 relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:cursor-pointer"
          }
          aria-label="Toggle dark mode"
        >
          <span
            className={
              "dark:translate-x-6 translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            }
          />
        </Switch>
        <FiMoon className="text-indigo-300" />
      </div>
    </div>
  );
}

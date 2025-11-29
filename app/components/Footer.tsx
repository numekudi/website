import { FaGithub, FaDiscord } from "react-icons/fa";
import { SiQiita } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center w-full">
      <div className="flex items-center gap-8">
        <a
          href="https://github.com/numekudi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub className="h-5 w-5" />
        </a>

        <a
          href={`https://discord.com/users/${import.meta.env.VITE_DISCORD_USER_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discord"
        >
          <FaDiscord className="h-5 w-5" />
        </a>

        <a
          href="https://qiita.com/numekudi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Qiita"
        >
          <SiQiita className="h-5 w-5" />
        </a>
      </div>
    </footer>
  );
}

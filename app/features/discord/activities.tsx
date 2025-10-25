import { FaExternalLinkAlt, FaDiscord } from "react-icons/fa";

type Props = {
  avatarUrl?: string;
};

export default function DiscordActivities({ avatarUrl }: Props) {
  return (
    <div>
      <div className="left-6 bottom-6 right-6 block">
        <div className="flex items-center w-full justify-center">
          <div className="py-4 w-full">
            <a
              href="https://discord.com/users/numekudi"
              className="flex items-center gap-3 hover:underline w-fit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDiscord className="text-[#5865F2]" size={42} />
              <span className="text-xl">Discord</span>
              <FaExternalLinkAlt />
            </a>
          </div>
          <img
            src={avatarUrl}
            alt="avatar"
            className="rounded-full ring-1 ring-white/20 right-0"
            height={42}
            width={42}
          />
        </div>
      </div>
    </div>
  );
}

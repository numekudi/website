import { FaDiscord, FaExternalLinkAlt } from "react-icons/fa";

type Props = {
  avatarUrl: string;
  username: string;
  status: string;
  profileUrl?: string;
  isLoading?: boolean;
};

export default function DiscordBadge({
  avatarUrl,
  username,
  status,
  profileUrl,
  isLoading = false,
}: Props) {
  const statusColor =
    status === "online"
      ? "bg-green-400"
      : status === "dnd"
        ? "bg-red-500"
        : status === "idle"
          ? "bg-yellow-400"
          : "bg-gray-400";

  if (isLoading) {
    return (
      <div className="left-6 bottom-6 right-6 block">
        <div className="flex items-center w-full justify-center">
          <div className="py-4 w-full">
            <div className="flex items-center gap-3 w-fit">
              <FaDiscord
                className="bg-[#5865F2] text-white rounded-full p-1 animate-pulse"
                size={42}
              />
              <span className="text-xl">Discord</span>
              <div className="w-4 h-4 bg-gray-400 animate-pulse rounded"></div>
            </div>
          </div>
          <div className="relative">
            <div className="w-[42px] h-[42px] bg-gray-400 animate-pulse rounded-full ring-1 ring-white/20"></div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-gray-400 ring-1 ring-white/20 border-2 border-white animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="left-6 bottom-6 right-6 block">
      <div className="flex items-center w-full justify-center">
        <div className="py-4 w-full">
          <a
            href={profileUrl ?? `/users/${encodeURIComponent(username)}`}
            className="flex items-center gap-3 hover:underline w-fit"
            target="_blank"
          >
            <div className="relative">
              <img
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                src={avatarUrl}
                alt={username}
                className="w-[42px] h-[42px] rounded-full ring-1 ring-white/20"
              />
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${statusColor} ring-1 ring-white/20 border-2 border-white`}
              />
            </div>
            <span className="text-xl">Discord</span>
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </div>
  );
}

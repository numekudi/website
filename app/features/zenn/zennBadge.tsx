import { FaExternalLinkAlt } from "react-icons/fa";

interface ZennBadgeProps {
  avatarUrl: string;
}

export default function ZennBadge({ avatarUrl }: ZennBadgeProps) {
  return (
    <div className="left-6 bottom-6 right-6 block">
      <div className="flex items-center w-full justify-center">
        <div className="py-4 w-full">
          <a
            href="https://zenn.dev/numekudi"
            className="flex items-center gap-3 hover:underline w-fit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <picture>
              <img
                srcSet={avatarUrl}
                alt="zenn icon"
                className="rounded-full ring-1 ring-white/20 right-0"
                height={42}
                width={42}
              />
            </picture>
            <span className="text-xl">Zenn</span>
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </div>
  );
}
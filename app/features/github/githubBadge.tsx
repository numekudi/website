import { FaExternalLinkAlt } from "react-icons/fa";

type Props = {
  avatarUrl?: string;
};
export default function GithubBadge({ avatarUrl }: Props) {
  return (
    <div className="left-6 bottom-6 right-6 block">
      <div className="flex items-center w-full justify-center">
        <div className="py-4 w-full">
          <a
            href={"https://github.com/numekudi"}
            className="flex items-center gap-3 hover:underline w-fit"
            target="_blank"
          >
            <img
              src={avatarUrl}
              alt="avatar"
              className="rounded-full ring-1 ring-white/20 right-0"
              height={42}
              width={42}
            />
            <span className="text-xl">GitHub</span>
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </div>
  );
}

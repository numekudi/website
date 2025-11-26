import { FaExternalLinkAlt } from "react-icons/fa";

type Props = {
  avatarUrl?: string;
};
export default function QiitaBadge({ avatarUrl }: Props) {
  return (
    <div className="left-6 bottom-6 right-6 block">
      <div className="flex items-center w-full justify-center">
        <div className="py-4 w-full">
          <a
            href="https://qiita.com/numekudi"
            className="flex items-center gap-3 hover:underline w-fit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <picture>
              <source
                srcSet={avatarUrl}
                className="rounded-full ring-1 ring-white/20 right-0"
                type="image/webp"
                height={42}
                width={42}
              />
            </picture>
            <span className="text-xl">Qiita</span>
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </div>
  );
}

import { getDiscordData } from "~/api/discord";
import type { Route } from "./+types/discord";
import DiscordActivities from "~/features/discord/discordActivities";
import DiscordBadge from "~/features/discord/discordBadge";
import { useEffect, useState } from "react";

export async function clientLoader({}: Route.LoaderArgs) {
  const discordData = await getDiscordData();
  return discordData;
}

export function HydrateFallback() {
  return (
    <div className="min-h-[140px]">
      <DiscordBadge
        avatarUrl="https://cdn.discordapp.com/embed/avatars/0.png"
        username="Loading..."
        status="offline"
        profileUrl="https://discord.com"
        isLoading={true}
      />
      <DiscordActivities activities={null} isLoading={true} />
    </div>
  );
}

function getAvatarUrl(id: string, avatar: string | null) {
  if (!avatar) return `https://cdn.discordapp.com/embed/avatars/0.png`;
  const isGif = avatar.startsWith("a_");
  const ext = isGif ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${id}/${avatar}.${ext}`;
}

export default function Discord({ loaderData }: Route.ComponentProps) {
  const [data, setData] = useState(loaderData.data);
  useEffect(() => {
    const id = setInterval(async () => {
      const newData = await getDiscordData();
      setData(newData.data);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  if (!data) {
    return (
      <div className="min-h-[140px]">
        <DiscordBadge
          avatarUrl="https://cdn.discordapp.com/embed/avatars/0.png"
          username="Unknown"
          status="offline"
          profileUrl="https://discord.com"
        />
        <DiscordActivities activities={null} />
      </div>
    );
  }

  const { discord_user, activities, discord_status } = data;
  const avatarUrl = getAvatarUrl(discord_user.id, discord_user.avatar);

  return (
    <div className="min-h-[140px]">
      <DiscordBadge
        avatarUrl={avatarUrl}
        username={discord_user.username}
        status={discord_status}
        profileUrl={`https://discord.com/users/${discord_user.id}`}
      />

      <DiscordActivities activities={activities} />
    </div>
  );
}

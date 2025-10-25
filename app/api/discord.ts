export type LanyardResponse = {
  data: {
    discord_user: {
      username: string;
      avatar: string;
      global_name: string;
      display_name: string;
      id: string;
    };
    activities: {
      type: number;
      name: string;
      timestamps: { start: number; end?: number };
      state?: string;
      details?: string;
      assets?: {
        large_image?: string;
        large_text?: string;
        small_image?: string;
        small_text?: string;
      };
    }[];
    discord_status: string;
  };
};

export const getDiscordData = async (): Promise<LanyardResponse> => {
  const endpoint = `https://api.lanyard.rest/v1/users/${import.meta.env.VITE_DISCORD_USER_ID}`;
  const res = await fetch(endpoint);
  return await res.json();
};

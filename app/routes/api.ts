import type { Route } from "../+types/root";
import { app } from "~/backend/app";

export const loader = async ({ context, request }: Route.LoaderArgs) => {
  return app.fetch(request, { ...context.cloudflare.env });
};

export const action = async ({ context, request }: Route.ActionArgs) => {
  return app.fetch(request, { ...context.cloudflare.env });
};

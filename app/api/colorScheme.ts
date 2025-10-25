import type { InferRequestType } from "hono";
import { client } from "~/hc";

export const postColorScheme = (
  s: InferRequestType<(typeof client.api)["color-scheme"]["$post"]>
) => {
  client.api["color-scheme"].$post({
    json: s.json,
  });
};

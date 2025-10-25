import { hc } from "hono/client";
import type { AppType } from "./backend/app";

export const client = hc<AppType>("");

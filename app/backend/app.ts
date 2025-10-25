import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import z from "zod";

export const app = new Hono<{
  Bindings: Env;
}>()
  .basePath("/api")
  .post(
    "/color-scheme",
    zValidator(
      "json",
      z.object({
        colorScheme: z.enum(["light", "dark", "system"]),
      }),
    ),
    (c) => {
      const { colorScheme } = c.req.valid("json");
      setCookie(c, "color-scheme", colorScheme, {
        expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000),
        httpOnly: true,
      });
      return c.json({ ok: true });
    },
  );

export type AppType = typeof app;

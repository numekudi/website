import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/rootLayout.tsx", [
    route("/", "routes/home.tsx", [index("routes/discord.tsx")]),
  ]),
  route("api/*", "routes/api.ts"),
  route("llms.txt", "routes/llmstext.ts"),
  route("robots.txt", "routes/robots.ts"),
] satisfies RouteConfig;

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { useLayoutEffect, useMemo } from "react";
import { useRouteLoaderData } from "react-router";
import { useLoaderData } from "react-router";
import { ColorSchemeProvider } from "./hooks/useColorScheme";

export const links: Route.LinksFunction = () => [];
export const loader = ({ request }: Route.LoaderArgs) => {
  const cookie = request.headers.get("Cookie");
  const match = cookie?.match(/color-scheme=(light|dark|system)/);
  const colorScheme = match ? match[1] : "system";
  return { colorScheme };
};

export function ColorSchemeScript() {
  const schemeData = useRouteLoaderData<typeof loader>("root");
  const colorScheme = schemeData?.colorScheme || "system";
  const script = useMemo(
    () => `
      let colorScheme = ${JSON.stringify(colorScheme)};
      if (colorScheme === "system") {
        let media = window.matchMedia("(prefers-color-scheme: dark)")
        if (media.matches) document.documentElement.classList.add("dark");
      }
    `,
    [],
  );

  if (typeof document !== "undefined") {
    useLayoutEffect(() => {
      if (colorScheme === "light") {
        document.documentElement.classList.remove("dark");
      } else if (colorScheme === "dark") {
        document.documentElement.classList.add("dark");
      } else if (colorScheme === "system") {
        function check(media: MediaQueryList | MediaQueryListEvent) {
          if (media.matches) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }

        let media = window.matchMedia("(prefers-color-scheme: dark)");
        check(media);

        media.addEventListener("change", check);
        return () => media.removeEventListener("change", check);
      } else {
        console.error("Impossible color scheme state:", colorScheme);
      }
    }, [colorScheme]);
  }

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const scheme = data?.colorScheme || "system";
  return (
    <html
      lang="ja"
      className={scheme === "dark" ? "dark" : ""}
      suppressHydrationWarning
    >
      <head>
        <ColorSchemeScript />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "numekudi",
          })}
        </script>
      </head>
      <body className="bg-white text-black dark:bg-zinc-900 dark:text-white">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  // The root loader provides the cookie-derived colorScheme. Use
  // useRouteLoaderData to read it and pass into the provider so the
  // provider can initialize deterministically.
  const schemeData = useRouteLoaderData<typeof loader>("root");
  const raw = schemeData?.colorScheme;
  const initialScheme =
    raw === "light" || raw === "dark" || raw === "system" ? raw : undefined;

  return (
    <ColorSchemeProvider initialScheme={initialScheme}>
      <Outlet />
    </ColorSchemeProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

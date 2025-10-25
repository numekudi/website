import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { postColorScheme } from "~/api/colorScheme";

type ColorScheme = "light" | "dark";

type InitialScheme = ColorScheme | "system" | undefined;

type ContextValue = {
  scheme: ColorScheme;
  toggle: () => void;
  setScheme: (s: ColorScheme) => void;
};

const ColorSchemeContext = createContext<ContextValue>({
  scheme: "light",
  toggle: () => {},
  setScheme: () => {},
});

export const ColorSchemeProvider = ({
  children,
  initialScheme,
}: {
  children: ReactNode;
  initialScheme?: InitialScheme;
}) => {
  const getInitial = (): ColorScheme => {
    if (typeof document === "undefined") {
      if (initialScheme && initialScheme !== "system") return initialScheme;
      return "light";
    }

    if (initialScheme) {
      if (initialScheme === "system") {
        return window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
      return initialScheme;
    }

    if (document.documentElement.classList.contains("dark")) return "dark";
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
      return "dark";
    return "light";
  };

  const [scheme, setSchemeState] = useState<ColorScheme>(getInitial);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (scheme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [scheme]);

  const setScheme = (s: ColorScheme) => {
    setSchemeState(s);
    postColorScheme({ json: { colorScheme: s } });

    if (typeof document !== "undefined") {
      if (s === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    }
  };

  const toggle = () => {
    setScheme(scheme === "dark" ? "light" : "dark");
  };

  return (
    <ColorSchemeContext.Provider value={{ scheme, toggle, setScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
};

export const useColorScheme = () => {
  const ctx = useContext(ColorSchemeContext);
  return { scheme: ctx.scheme, toggle: ctx.toggle, setScheme: ctx.setScheme };
};

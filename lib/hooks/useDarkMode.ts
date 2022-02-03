import { useLocalStorageState } from "ahooks";
import { useEffect } from "react";

export function useDarkMode() {
  const [dark, setDark] = useLocalStorageState("__dark_mode__", false);
  useEffect(() => {
    const ec: DOMTokenList = document.documentElement.classList ?? null;
    const key = "dark";
    if (
      dark ||
      window.matchMedia("(prefers-color-scheme: " + key + ")").matches
    ) {
      if (!ec?.contains(key)) ec?.add(key);
    } else if (ec?.contains(key)) {
      ec?.remove(key);
    }
  }, [dark]);
  const toggle = () => setDark(!dark);
  return { toggle, dark };
}

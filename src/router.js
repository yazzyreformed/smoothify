import { useEffect, useState } from "react";

// Minimal dependency-free client-side router (pushState + popstate).

export function navigate(to) {
  if (window.location.pathname === to) {
    window.scrollTo(0, 0);
    return;
  }
  window.history.pushState({}, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}

// Scroll to a homepage section, going back to "/" first if needed.
export function goToSection(id) {
  const scroll = () =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  if (window.location.pathname !== "/") {
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
    setTimeout(scroll, 90);
  } else {
    scroll();
  }
}

export function useRoute() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  return path;
}

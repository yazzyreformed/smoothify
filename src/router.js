import { useEffect, useState } from "react";

// Minimal dependency-free client-side router (pushState + popstate).

// Anlık (yumuşak değil) tepeye alma — html { scroll-behavior: smooth } kuralını atlar,
// böylece sayfa değişince yeni görünüm daima en üstten açılır.
function jumpToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

export function navigate(to) {
  if (window.location.pathname === to) {
    jumpToTop();
    return;
  }
  window.history.pushState({}, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
  // Yeni görünüm React commit'inden sonra mount olur; hem şimdi hem bir sonraki
  // frame'de tepeye al ki içerik değişimi yumuşak kaydırmayı yarıda bırakmasın.
  jumpToTop();
  requestAnimationFrame(jumpToTop);
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

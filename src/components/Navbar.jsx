import { useEffect, useState } from "react";
import { navigate, goToSection, useRoute } from "../router.js";
import "./Navbar.css";

const links = [
  { kind: "section", id: "anasayfa", label: "Anasayfa" },
  { kind: "route", to: "/hakkimizda", label: "Hakkımızda" },
  { kind: "route", to: "/iletisim", label: "İletişim" },
];

export default function Navbar() {
  const path = useRoute();
  const onHome = path === "/";
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("anasayfa");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll-spy (homepage only)
  useEffect(() => {
    if (!onHome) return;
    const sections = links
      .filter((l) => l.kind === "section")
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome]);

  const isActive = (l) =>
    l.kind === "route"
      ? path === l.to || path === l.to + "/"
      : onHome && activeSection === l.id;

  const handleClick = (e, l) => {
    e.preventDefault();
    setOpen(false);
    if (l.kind === "route") navigate(l.to);
    else goToSection(l.id);
  };

  const solid = scrolled || !onHome;

  return (
    <header className={"nav" + (solid ? " scrolled" : "") + (open ? " open" : "")}>
      <div className="nav-inner">
        <a
          href="/"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            onHome ? goToSection("anasayfa") : navigate("/");
          }}
        >
          Smoothify<span className="brand-dot">.</span>
        </a>

        <nav className="nav-links" aria-label="Ana menü">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.kind === "route" ? l.to : `#${l.id}`}
              className={isActive(l) ? "active" : ""}
              onClick={(e) => handleClick(e, l)}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="/iletisim"
          className="nav-cta"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            navigate("/iletisim");
          }}
        >
          Bizi ziyaret et
        </a>

        <button
          className="nav-burger"
          aria-label="Menüyü aç/kapat"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className="nav-mobile">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.kind === "route" ? l.to : `#${l.id}`}
            className={isActive(l) ? "active" : ""}
            onClick={(e) => handleClick(e, l)}
          >
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}

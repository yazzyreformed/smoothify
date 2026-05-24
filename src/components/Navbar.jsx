import { useEffect, useState } from "react";
import "./Navbar.css";

const links = [
  { id: "anasayfa", label: "Anasayfa" },
  { id: "smoothies", label: "Smoothie'lerimiz" },
  { id: "hakkimizda", label: "Hakkımızda" },
  { id: "iletisim", label: "İletişim" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("anasayfa");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll-spy
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={"nav" + (scrolled ? " scrolled" : "") + (open ? " open" : "")}>
      <div className="nav-inner">
        <a
          href="#anasayfa"
          className="brand"
          onClick={(e) => handleClick(e, "anasayfa")}
        >
          Smoothify<span className="brand-dot">.</span>
        </a>

        <nav className="nav-links" aria-label="Ana menü">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? "active" : ""}
              onClick={(e) => handleClick(e, l.id)}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#iletisim"
          className="nav-cta"
          onClick={(e) => handleClick(e, "iletisim")}
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
            key={l.id}
            href={`#${l.id}`}
            className={active === l.id ? "active" : ""}
            onClick={(e) => handleClick(e, l.id)}
          >
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}

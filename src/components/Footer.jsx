import { navigate, goToSection } from "../router.js";
import "./Footer.css";

const links = [
  { kind: "section", id: "anasayfa", label: "Anasayfa" },
  { kind: "section", id: "smoothies", label: "Smoothie'lerimiz" },
  { kind: "section", id: "hakkimizda", label: "Hakkımızda" },
  { kind: "route", to: "/iletisim", label: "İletişim" },
];

export default function Footer() {
  const handleClick = (e, l) => {
    e.preventDefault();
    if (l.kind === "route") navigate(l.to);
    else goToSection(l.id);
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">
            Smoothify<span className="brand-dot">.</span>
          </span>
          <p>Şehrin en taze sekiz smoothie'si. Başka bir şey satmıyoruz.</p>
        </div>

        <nav className="footer-nav" aria-label="Alt menü">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.kind === "route" ? l.to : `#${l.id}`}
              onClick={(e) => handleClick(e, l)}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Smoothify</span>
        <span>Taze sıkılmış kodla yapıldı.</span>
      </div>
    </footer>
  );
}

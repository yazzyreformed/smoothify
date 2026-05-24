import "./Footer.css";

const links = [
  { id: "anasayfa", label: "Anasayfa" },
  { id: "smoothies", label: "Smoothie'lerimiz" },
  { id: "hakkimizda", label: "Hakkımızda" },
  { id: "iletisim", label: "İletişim" },
];

export default function Footer() {
  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
            <a key={l.id} href={`#${l.id}`} onClick={(e) => scrollTo(e, l.id)}>
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

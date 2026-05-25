import { goToSection } from "../router.js";
import "./PhotoHero.css";

export default function PhotoHero() {
  return (
    <section id="anasayfa" className="photo-hero">
      <div className="ph-bg" />
      <div className="ph-overlay" />

      <div className="ph-inner">
        <div className="ph-content">
          <p className="ph-eyebrow">Smoothify'ye hoş geldin</p>
          <h1 className="ph-title">
            Taze smoothie'ler,
            <br />
            gerçek bir mekan,
            <br />
            tek tutku.
          </h1>
          <p className="ph-lead">
            Moda'nın kalbinde, taptaze meyvelerle hazırlanan sekiz imza
            smoothie. İçeri gel, atmosferi hisset, Smoothify deneyimini keşfet.
          </p>

          <div className="ph-actions">
            <a
              href="#smoothies"
              className="ph-cta"
              onClick={(e) => {
                e.preventDefault();
                goToSection("smoothies");
              }}
            >
              Smoothie'leri keşfet
              <span className="ph-cta-arrow">→</span>
            </a>

            <a
              href="#hakkimizda"
              className="ph-play"
              onClick={(e) => {
                e.preventDefault();
                goToSection("hakkimizda");
              }}
            >
              <span className="ph-play-circle" aria-hidden="true">
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                  <path d="M1 1.5l11 6.5-11 6.5V1.5z" fill="currentColor" />
                </svg>
              </span>
              Hakkımızda
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

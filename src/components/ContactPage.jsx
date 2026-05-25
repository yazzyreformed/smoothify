import "./ContactPage.css";

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/39.958566,32.7852174/Smoothify,+100.+Y%C4%B1l,+Nenehatun+Cd+No:9,+06700+%C3%87ankaya%2FAnkara/@39.9310273,32.7974912,6667m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x14d34fa434e615c1:0xeae16d02cdbf6d52!2m2!1d32.8678934!2d39.9040515?entry=ttu";

const MAP_EMBED_URL =
  "https://www.google.com/maps?q=Smoothify,100.+Y%C4%B1l,+Nenehatun+Cd+No:9,+06700+%C3%87ankaya%2FAnkara&z=16&hl=tr&output=embed";

export default function ContactPage() {
  return (
    <main className="contact-page">
      <span className="cp-blob cp-blob-a" aria-hidden="true" />
      <span className="cp-blob cp-blob-b" aria-hidden="true" />

      <div className="cp-inner">
        <header className="cp-head">
          <p className="cp-deco">✦ Bizimle iletişime geçin ✦</p>
          <h1 className="cp-title">
            Hadi <span className="cp-script">tanışalım</span>.
          </h1>
        </header>

        <div className="cp-grid">
          <section className="cp-card">
            <div className="cp-field">
              <span className="cp-label">Adres</span>
              <p className="cp-value">
                100. Yıl, Nenehatun Cd No:9,
                <br />
                06700 Çankaya / Ankara
              </p>
            </div>

            <div className="cp-field">
              <span className="cp-label">İletişim</span>
              <a className="cp-phone" href="tel:+905338130117">
                0533 813 01 17
              </a>
            </div>

            <div className="cp-field">
              <span className="cp-label">Çalışma Saatleri</span>
              <p className="cp-value">
                Pazartesi hariç · 11:00 — 20:00
              </p>
            </div>

            <a
              className="cp-cta"
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Yol tarifi al
              <span className="cp-arrow">→</span>
            </a>
          </section>

          <section className="cp-map">
            <iframe
              title="Smoothify konum haritası"
              src={MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              className="cp-map-open"
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Büyük haritada aç ↗
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}

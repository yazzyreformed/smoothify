import { useEffect, useRef } from "react";
import { navigate } from "../router.js";
import "./Katkisiz.css";

/*
  Katkisiz — Kaynak mekanik: becatea.com "No Nasties" section (component havuzu / NoNastiesScroll)
  Smoothify uyarlaması: pembe → ink arka plan geçişi, Türkçe metinler, mango-ananas bardağı
  (/smootieler/8.png) section dibine yapışık takip eder, önünden içerik akar.

  Not: arka plan rengi, section'ın tamamı yerine viewport'u kaplayan STICKY bir katmanda
  (.ktz-bg) canlandırılır. Çok uzun bir elementin JS ile her frame değişen arka planı
  bazı tarayıcılarda tüm yüksekliğe boyanmıyor; sticky 100vh katman bu sorunu çözer.
*/

// brand-pink #ff5fa2 → ink #2a1c3d
const PINK = { r: 255, g: 95, b: 162 };
const DARK = { r: 42, g: 28, b: 61 };

// marquee kelimeleri — solid:true dolu beyaz, diğerleri outline
const PHRASES = [
  { t: "KORUYUCU YOK.", solid: true },
  { t: "YAPAY AROMA YOK.", solid: false },
  { t: "ŞEKER İLAVESİ YOK.", solid: true },
  { t: "KATKI MADDESİ YOK.", solid: false },
];

const BADGES = [
  "Taze Meyve",
  "Anında Hazır",
  "Katkısız",
  "El Yapımı",
  "Gerçek Mekan",
];

// satır yönleri: sol / sağ / sol
const ROWS = ["left", "right", "left"];

const rgb = (c) => `rgb(${c.r},${c.g},${c.b})`;

function MarqueeGroup() {
  return (
    <span className="ktz-group">
      {PHRASES.map((p, i) => (
        <span
          key={i}
          className={`ktz-word ${p.solid ? "ktz-solid" : "ktz-outline"}`}
        >
          {p.t}
          {"  "}
        </span>
      ))}
    </span>
  );
}

export default function Katkisiz() {
  const wrapRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const bg = bgRef.current;
    if (!wrap || !bg) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      bg.style.backgroundColor = rgb(DARK);
      return;
    }

    // arka plan: scroll-progress'e bağlı pembe → ink (rAF lerp, scroll'da tetiklenir, oturunca durur)
    let raf = 0;
    let current = 0;
    const clamp01 = (v) => Math.max(0, Math.min(1, v));
    const easeOut = (t) => 1 - Math.pow(1 - t, 1.5);

    const render = () => {
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;
      const raw = scrollable > 0 ? -rect.top / scrollable : 0;
      const target = clamp01(raw);
      current += (target - current) * 0.12;
      const p = easeOut(clamp01(current));
      const r = Math.round(PINK.r + (DARK.r - PINK.r) * p);
      const g = Math.round(PINK.g + (DARK.g - PINK.g) * p);
      const b = Math.round(PINK.b + (DARK.b - PINK.b) * p);
      bg.style.backgroundColor = `rgb(${r},${g},${b})`;

      if (Math.abs(target - current) > 0.001) {
        raf = requestAnimationFrame(render);
      } else {
        current = target;
        raf = 0;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    render(); // ilk boyama
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={wrapRef} className="ktz-wrap" aria-label="Katkısız">
      {/* hero → pembe yumuşak geçiş: sıvı yüzeyi gibi dalgalı üst kenar */}
      <svg
        className="ktz-bridge"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,100 L0,52 C 240,4 520,4 720,44 C 940,88 1180,96 1440,40 L1440,100 Z"
          fill="#ff5fa2"
        />
      </svg>

      {/* viewport'u kaplayan sticky arka plan — renk burada canlanır */}
      <div
        ref={bgRef}
        className="ktz-bg"
        aria-hidden="true"
        style={{ backgroundColor: rgb(PINK) }}
      />

      {/* içerik kolonu — bardağın önünden akar, section yüksekliğini verir */}
      <div className="ktz-content">
        <div className="ktz-head">
          <h2>Katkısız.</h2>
          <p>Kısacası bardağında yalnızca şunlar var:</p>
        </div>

        <div className="ktz-marquee" aria-hidden="true">
          {ROWS.map((dir, i) => (
            <div className={`ktz-row ${dir}`} key={i}>
              <MarqueeGroup />
              <MarqueeGroup />
            </div>
          ))}
        </div>

        <div className="ktz-mastery">
          Ustalık,
          <br />
          meyveden yuduma
        </div>

        <a
          className="ktz-cta"
          href="/iletisim"
          onClick={(e) => {
            e.preventDefault();
            navigate("/iletisim");
          }}
        >
          Peki neden bu kadar taze?
          <span className="ktz-cta-arrow" aria-hidden="true">
            →
          </span>
        </a>

        <div className="ktz-copy">
          <b>Çünkü bir paketten çıkmadı.</b>
          <p>
            Bardağındaki smoothie eline ulaşmadan çok önce; meyveyi biz seçtik,
            biz yıkadık ve tam sipariş anında biz hazırladık. Her adımı özenle
            yapıyoruz, çünkü tek bir aşama savsaklanırsa o bardağın tazeliği
            kaçar.
          </p>
        </div>
      </div>

      {/* takip eden bardak — sticky bottom; alt kısmı katman içinde kesilir, taşmaz */}
      <div className="ktz-cup-layer">
        <img
          className="ktz-cup"
          src="/smootieler/8.png"
          alt="Mango Ananas smoothie"
          draggable="false"
        />
      </div>

      {/* 5 nitelik dairesi — section dibinde, bardağın önünde */}
      <div className="ktz-badges">
        {BADGES.map((label, i) => (
          <span className="ktz-badge" key={i}>
            {label}
          </span>
        ))}
      </div>

      {/* koyu (ink) → showcase yumuşak geçişi: dalga aşağı sarkar, tepe noktası SAĞDA */}
      <svg
        className="ktz-bridge-bottom"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,0 L1440,0 L1440,42 C 1230,96 1030,96 760,58 C 500,22 250,26 0,44 Z"
          fill="#2a1c3d"
        />
      </svg>
    </section>
  );
}

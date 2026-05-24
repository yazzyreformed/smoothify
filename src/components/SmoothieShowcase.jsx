import { useCallback, useEffect, useRef, useState } from "react";
import "./SmoothieShowcase.css";

const smoothies = [
  {
    id: 1,
    name: "SPRING",
    flavorText: "Portakal + Çilek",
    ingredients: ["Portakal", "Çilek", "Reyhan", "Portakal Suyu", "Smoothify Sos"],
    image: "/smootieler/1.png",
    hoverImage: "/smootieler/11.png",
    // Orange smoothie -> candy periwinkle / lilac blue
    bg: ["#aab6ff", "#8a9bff", "#c08cff"],
    accent: "#fff39e",
  },
  {
    id: 2,
    name: "DOPİNG",
    flavorText: "Ceviz + Hurma",
    ingredients: ["Ceviz", "Hurma", "Tahin", "Muz", "Badem Sütü", "Smoothify Sos"],
    image: "/smootieler/2.png",
    hoverImage: "/smootieler/22.png",
    // Earthy brown -> pastel mint into bubblegum pink pop
    bg: ["#9bf5d6", "#5fe6c2", "#ff9ecb"],
    accent: "#fff4d6",
  },
  {
    id: 3,
    name: "CHOCOFY",
    flavorText: "Çikolata + Muz",
    ingredients: ["Tahta Çikolata", "Muz", "Bisküvi", "Badem Sütü", "Smoothify Sos"],
    image: "/smootieler/3.png",
    hoverImage: "/smootieler/33.png",
    // Chocolate brown -> pastel coral / candy pink
    bg: ["#ffc4d6", "#ff9ec0", "#ffb38a"],
    accent: "#fff6e8",
  },
  {
    id: 4,
    name: "ALOHA",
    flavorText: "Karpuz + Çilek",
    ingredients: ["Karpuz", "Çilek", "Limonata", "Smoothify Sos"],
    image: "/smootieler/4.png",
    hoverImage: "/smootieler/44.png",
    // Red watermelon -> pastel lime / fresh green
    bg: ["#e6ff8f", "#bff56b", "#7fe6b8"],
    accent: "#fffce0",
  },
  {
    id: 5,
    name: "AÇAI",
    flavorText: "Karadut + Yaban Mersini",
    ingredients: ["Karadut", "Yaban Mersini", "Açai Tozu", "Badem Sütü", "Smoothify Sos"],
    image: "/smootieler/5.png",
    hoverImage: "/smootieler/55.png",
    // Deep purple berry -> pastel lime green / mint
    bg: ["#c2f7a0", "#8ae88f", "#5fd6c4"],
    accent: "#fffce0",
  },
  {
    id: 6,
    name: "ACIDIC",
    flavorText: "Nane + Salatalık",
    ingredients: ["Nane", "Salatalık", "Limon Suyu", "Limonata", "Smoothify Sos"],
    image: "/smootieler/6.png",
    hoverImage: "/smootieler/66.png",
    // Green mint -> candy pink into lavender purple
    bg: ["#ffc1e3", "#ff9ed6", "#c79bff"],
    accent: "#fff3fb",
  },
  {
    id: 7,
    name: "LOST PARADISE",
    flavorText: "Karadut + Böğürtlen",
    ingredients: ["Karadut", "Yaban Mersini", "Böğürtlen", "Limonata", "Smoothify Sos"],
    image: "/smootieler/7.png",
    hoverImage: "/smootieler/77.png",
    // Dark berry -> pastel peach into coral pink
    bg: ["#ffd9a0", "#ffb08f", "#ff9ec0"],
    accent: "#fff6e6",
  },
  {
    id: 8,
    name: "HAWAIIAN",
    flavorText: "Mango + Ananas",
    ingredients: ["Mango", "Ananas", "Ananas Suyu", "Smoothify Sos"],
    image: "/smootieler/8.png",
    hoverImage: "/smootieler/88.png",
    // Yellow mango -> pastel sky blue into violet
    bg: ["#a8d8ff", "#8ab2ff", "#bf9cff"],
    accent: "#fff0c8",
  },
];

const TRANSITION_MS = 720;

export default function SmoothieShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [direction, setDirection] = useState(1);
  const lockRef = useRef(false);
  const wheelAccum = useRef(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const goTo = useCallback((next, dir) => {
    if (lockRef.current) return;
    const len = smoothies.length;
    const wrapped = ((next % len) + len) % len;
    if (wrapped === activeIndexRef.current) return;
    lockRef.current = true;
    setDirection(dir);
    setPrevIndex(activeIndexRef.current);
    setActiveIndex(wrapped);
    window.setTimeout(() => {
      lockRef.current = false;
      setPrevIndex(null);
    }, TRANSITION_MS);
  }, []);

  const step = useCallback(
    (dir) => {
      const next = activeIndexRef.current + dir;
      goTo(next, dir);
    },
    [goTo]
  );

  // Wheel / pinned scroll handling with throttle + transition lock
  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      if (lockRef.current) return;

      wheelAccum.current += e.deltaY;
      const threshold = 28;

      if (wheelAccum.current > threshold) {
        wheelAccum.current = 0;
        step(1);
      } else if (wheelAccum.current < -threshold) {
        wheelAccum.current = 0;
        step(-1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [step]);

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") step(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  // Touch swipe (vertical) support
  useEffect(() => {
    let startY = null;
    const onStart = (e) => (startY = e.touches[0].clientY);
    const onEnd = (e) => {
      if (startY === null) return;
      const dy = startY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) step(dy > 0 ? 1 : -1);
      startY = null;
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [step]);

  const active = smoothies[activeIndex];
  const [c1, c2, c3] = active.bg;

  const sectionStyle = {
    "--c1": c1,
    "--c2": c2,
    "--c3": c3,
    "--accent": active.accent,
  };

  return (
    <section className="showcase" style={sectionStyle}>
      {/* animated layered background */}
      <div className="bg-base" />
      <div className="bg-blob blob-a" />
      <div className="bg-blob blob-b" />
      <div className="bg-blob blob-c" />
      <div className="bg-grain" />

      {/* arrows */}
      <button
        className="nav-arrow nav-left"
        aria-label="Önceki smoothie"
        onClick={() => step(-1)}
      >
        <Chevron dir="left" />
      </button>
      <button
        className="nav-arrow nav-right"
        aria-label="Sonraki smoothie"
        onClick={() => step(1)}
      >
        <Chevron dir="right" />
      </button>

      {/* slides */}
      <div className="stage">
        {smoothies.map((s, i) => {
          const isActive = i === activeIndex;
          const isPrev = i === prevIndex;
          if (!isActive && !isPrev) return null;
          return (
            <div
              key={s.id}
              className={
                "slide" +
                (isActive ? " is-active" : "") +
                (isPrev ? " is-prev" : "") +
                (direction === 1 ? " dir-next" : " dir-prev")
              }
            >
              {/* visual */}
              <div className="visual-col">
                <div className="peek-hint" aria-hidden="true">
                  <span className="peek-text">içeriği gör</span>
                  <CurlArrow />
                </div>
                <div className="smoothieVisual">
                  <img
                    className="smoothieImg base"
                    src={s.image}
                    alt={s.name}
                    draggable="false"
                  />
                  <img
                    className="smoothieImg hover"
                    src={s.hoverImage}
                    alt={`${s.name} içindekiler`}
                    draggable="false"
                  />
                  <div className="floor-shadow" />
                </div>

                <div className="title-block">
                  <h2 className="smoothie-name">{s.name}</h2>
                  <span className="smoothie-sub">Smoothie</span>
                </div>
              </div>

              {/* flavor brush text */}
              <div className="flavor-col">
                <p className="flavor-text">
                  {s.flavorText.split(" + ").map((part, idx, arr) => (
                    <span key={idx} className="flavor-line">
                      {part}
                      {idx < arr.length - 1 && <span className="flavor-plus">+</span>}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CurlArrow() {
  return (
    <svg
      className="curl-arrow"
      width="110"
      height="96"
      viewBox="0 0 110 96"
      fill="none"
    >
      {/* hand-drawn looping arrow curving down-left toward the glass */}
      <path
        d="M96 12c-10 26-2 47-30 55C44 73 26 64 22 48c-3-12 6-22 17-18 9 4 8 17-2 21-13 5-27-3-32-15"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M5 36l1 19M5 36l16-6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function Chevron({ dir }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: dir === "left" ? "rotate(180deg)" : "none" }}
    >
      <path
        d="M9 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

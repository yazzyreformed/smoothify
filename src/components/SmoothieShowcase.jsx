import { useCallback, useEffect, useRef, useState } from "react";
import { smoothies } from "../data/smoothies";
import "./SmoothieShowcase.css";

const TRANSITION_MS = 720;
const AUTOPLAY_MS = 5000;

export default function SmoothieShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [direction, setDirection] = useState(1);
  const lockRef = useRef(false);
  const activeIndexRef = useRef(0);
  const autoplayRef = useRef(null);
  const pausedRef = useRef(false);

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

  const startAutoplay = useCallback(() => {
    window.clearInterval(autoplayRef.current);
    autoplayRef.current = window.setInterval(() => {
      if (pausedRef.current) return;
      goTo(activeIndexRef.current + 1, 1);
    }, AUTOPLAY_MS);
  }, [goTo]);

  const step = useCallback(
    (dir) => {
      goTo(activeIndexRef.current + dir, dir);
      startAutoplay(); // reset timer on manual interaction
    },
    [goTo, startAutoplay]
  );

  const jumpTo = useCallback(
    (i) => {
      const dir = i >= activeIndexRef.current ? 1 : -1;
      goTo(i, dir);
      startAutoplay();
    },
    [goTo, startAutoplay]
  );

  // Autoplay lifecycle
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!reduce) startAutoplay();
    return () => window.clearInterval(autoplayRef.current);
  }, [startAutoplay]);

  // Keyboard arrows (does not hijack page scroll)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  // Horizontal touch swipe (leaves vertical scroll to the page)
  useEffect(() => {
    let startX = null;
    let startY = null;
    const onStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onEnd = (e) => {
      if (startX === null) return;
      const dx = startX - e.changedTouches[0].clientX;
      const dy = startY - e.changedTouches[0].clientY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        step(dx > 0 ? 1 : -1);
      }
      startX = null;
      startY = null;
    };
    const el = document.getElementById("anasayfa");
    el?.addEventListener("touchstart", onStart, { passive: true });
    el?.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el?.removeEventListener("touchstart", onStart);
      el?.removeEventListener("touchend", onEnd);
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
    <section
      id="anasayfa"
      className="showcase"
      style={sectionStyle}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
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

      {/* progress dots */}
      <div className="hero-dots" role="tablist" aria-label="Smoothie seçimi">
        {smoothies.map((s, i) => (
          <button
            key={s.id}
            className={"hero-dot" + (i === activeIndex ? " active" : "")}
            aria-label={s.name}
            aria-selected={i === activeIndex}
            onClick={() => jumpTo(i)}
          />
        ))}
      </div>

      {/* scroll cue */}
      <a className="scroll-cue" href="#smoothies" aria-label="Aşağı kaydır">
        <span>keşfet</span>
        <span className="scroll-cue-mouse">
          <span className="scroll-cue-dot" />
        </span>
      </a>
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

// SocialCorner.jsx
import { useEffect, useRef, useState } from "react";
import "./SocialCorner.css";

const videos = [
  { id: 1, src: "/1.mp4", desc: "Taptaze çilekler ve muzun kusursuz buluşması! 🍓🍌 #smoothify" },
  { id: 2, src: "/2.mp4", desc: "Yaz enerjisini bardağına taşıyan tropik efsane! 🍍🌴 #smoothify" },
  { id: 3, src: "/3.mp4", desc: "Doğal malzemelerle, gözünün önünde hazırlanan lezzet! 🥝🍊 #smoothify" },
  { id: 4, src: "/4.mp4", desc: "Çikolata ve taze çilek tutkunlarının favorisi! 🍫🍓 #smoothify" },
  { id: 5, src: "/5.mp4", desc: "Yeşilin en enerjik, en arındırıcı ve tazeleyici hali! 🥬🍏 #smoothify" },
  { id: 6, src: "/6.mp4", desc: "Ferahlatan buz gibi aromasıyla gün boyu zindelik! 🍇🍉 #smoothify" },
];

export default function SocialCorner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRefs = useRef([]);

  // Swiping support for mobile devices
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX; // Initialize end as start
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 55) {
      handleNext();
    } else if (diff < -55) {
      handlePrev();
    }
  };

  // Autoplay and volume control logic
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      
      if (idx === activeIndex) {
        video.muted = muted;
        // Make sure play works smoothly, handle potential promise rejection (browser block)
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            // Autoplay with sound might be blocked, fallback to muted play
            if (!video.muted) {
              console.warn("Autoplay with audio blocked. Falling back to muted play.");
              setMuted(true);
              video.muted = true;
              video.play().catch(e => console.error("Muted playback failed too:", e));
            }
          });
        }
      } else {
        video.pause();
        // Reset currentTime to 0 so the video is ready to play from start when activated again
        video.currentTime = 0;
      }
    });
  }, [activeIndex, muted]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % videos.length);
  };

  const handleCardClick = (idx) => {
    if (idx === activeIndex) {
      // Toggle mute/unmute when clicking on active card
      setMuted((prev) => !prev);
    } else {
      setActiveIndex(idx);
    }
  };

  // Helper function to calculate the shortest visual offset in circular array
  const getDiffClass = (idx) => {
    let diff = idx - activeIndex;
    
    // Normalize circular wrap-around
    while (diff < -Math.floor(videos.length / 2)) diff += videos.length;
    while (diff > Math.floor((videos.length - 1) / 2)) diff -= videos.length;

    if (diff === 0) return "active";
    if (diff === 1) return "right-1";
    if (diff === -1) return "left-1";
    if (diff === 2) return "right-2";
    if (diff === -2) return "left-2";
    if (diff < -2) return "hidden-left";
    return "hidden-right";
  };

  return (
    <section id="sosyal-medya" className="section social-corner">
      <div className="section-inner">
        {/* Header Block matching the screenshot */}
        <div className="social-header-grid">
          <div className="social-header-left">
            <p className="eyebrow">Sosyal Medyada Biz</p>
            <h2 className="section-title">
              Bardağındaki <span className="grad-text">Enerji</span>
            </h2>
            <p className="section-lead">
              Tazeliği, rengi ve hayatı paylaşıyoruz. Sen de blender'dan yeni çıkmış
              bardağını kap, bizi etiketle ve enerjiyi dalgalandır!
            </p>
          </div>
          <div className="social-header-right">
            <a
              href="https://instagram.com/smoothify.tr"
              target="_blank"
              rel="noopener noreferrer"
              className="social-cta-btn"
              aria-label="Instagram'da @smoothify.tr hesabını takip et"
            >
              <InstagramIcon />
              <span>@smoothify.tr</span>
            </a>
          </div>
        </div>

        {/* Dynamic 3D Carousel container */}
        <div className="social-carousel-container">
          <div
            className="social-carousel-track"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {videos.map((vid, idx) => {
              const diffClass = getDiffClass(idx);
              const isActive = diffClass === "active";

              return (
                <div
                  key={vid.id}
                  className={`social-card ${diffClass}`}
                  onClick={() => handleCardClick(idx)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Sosyal medya videosu ${vid.id}`}
                >
                  <video
                    ref={(el) => (videoRefs.current[idx] = el)}
                    className="social-card-video"
                    src={vid.src}
                    loop
                    muted={muted}
                    playsInline
                    preload="auto"
                  />

                  {/* Top-Left Reels Badge */}
                  <div className="social-card-badge">
                    <ReelsIcon />
                  </div>

                  {/* Top-Right Mute/Unmute toggle for active video */}
                  {isActive && (
                    <button
                      className="social-audio-toggle"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMuted((m) => !m);
                      }}
                      aria-label={muted ? "Sesi aç" : "Sesi kıs"}
                    >
                      {muted ? <MutedIcon /> : <SoundIcon />}
                    </button>
                  )}

                  {/* Bottom Instagram overlay details */}
                  <div className="social-card-info">
                    <span className="social-card-handle">
                      @smoothify.tr
                      <span className="social-card-handle-dot" />
                    </span>
                    <p className="social-card-desc">{vid.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Navigation controls */}
          <div className="social-carousel-controls">
            <button
              className="social-nav-arrow"
              onClick={handlePrev}
              aria-label="Önceki video"
            >
              <ChevronLeftIcon />
            </button>

            <div className="social-dots" role="tablist" aria-label="Video seçimi">
              {videos.map((vid, idx) => (
                <button
                  key={vid.id}
                  className={`social-dot ${idx === activeIndex ? "active" : ""}`}
                  onClick={() => setActiveIndex(idx)}
                  role="tab"
                  aria-selected={idx === activeIndex}
                  aria-label={`Video ${vid.id}`}
                />
              ))}
            </div>

            <button
              className="social-nav-arrow"
              onClick={handleNext}
              aria-label="Sonraki video"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Inline SVGs for beautiful design and lightweight package sizes
function InstagramIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function ReelsIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
    </svg>
  );
}

function MutedIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function SoundIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

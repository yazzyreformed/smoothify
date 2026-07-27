// GoogleReviews.jsx
import "./GoogleReviews.css";

const row1 = [
  {
    id: 1,
    name: "Gizem Işıldak",
    time: "2 yıl önce",
    avatarBg: "#ff5fa2", // brand-pink
    text: "İnanılmaz tatlı bir mekan, sahibi de öyle. Tamamen organik, vegan ve temiz içerikli Smoothie ve bowlları var ❤️ bayıldım ben. Özellikle Acai ve tahinli hurmalı bowl harika. Smoothielerinin de hepsi ayrı güzel. Yaz aylarında enfes gerçekten.",
  },
  {
    id: 2,
    name: "Serkan Polat",
    time: "7 ay önce",
    avatarBg: "#23c89a", // doping green
    text: "Sağlıklı içecekler için mükemmel bir mekan. Lokasyon merkezi. Herkes çok güleryüzlü. Teşekkürler.",
  },
  {
    id: 3,
    name: "yiğit kalaycıoğlu",
    time: "2 yıl önce",
    avatarBg: "#ffa41b", // aloha orange
    text: "İşletmede harika bir deneyim yaşadım! Lezzetli ve serinletici içecekleriyle sıcak yaz günlerinde tam bir kurtarıcı. Özellikle meyve aromalı smootie'leri enfes! Personelin samimiyeti ve dükkanın temizliği de ekstra artılar. Kesinlikle tekrar ziyaret edeceğim!",
  },
  {
    id: 4,
    name: "SAU",
    time: "2 yıl önce",
    avatarBg: "#8a7dff", // brand-violet
    text: "Smoothie'ler çok iyi. Tahinli, muzlu ve hurmalı olanı tavsiye ediyorum harika.",
  },
  {
    id: 5,
    name: "Cuneyt Andac",
    time: "2 yıl önce",
    avatarBg: "#15b7d6", // hawaiian blue
    text: "Günün her saatinde her biri sağlıklı, doğal ve damağınızda muhteşem tadlar bırakan smoothie leriyle tek kelimeyle mükemmel. Kesinlikle deneyin derim.",
  },
];

const row2 = [
  {
    id: 6,
    name: "Ece Kansu",
    time: "2 yıl önce",
    avatarBg: "#ff8a5b", // açai orange-pink
    text: "Dekorasyon ve ambiyansıyla yazlık bir yerdemiş hissi yaratıyor💫 Ayrıca glutensiz smoothylerin olması benim gibi çölyak hastaları için şahane. Kesinlikle tavsiye edilir.",
  },
  {
    id: 7,
    name: "MINA LOTFI",
    time: "2 yıl önce",
    avatarBg: "#28e0d4", // spring teal
    text: "Hem sağlıklı hem lezzetli mutlaka denemelisiniz 👍",
  },
  {
    id: 8,
    name: "Mine İmir",
    time: "2 yıl önce",
    avatarBg: "#ff8f8f", // acidic soft-red
    text: "I love it.. 🥰 I will come back",
  },
  {
    id: 9,
    name: "Doğa Emrah Şedit",
    time: "2 yıl önce",
    avatarBg: "#ffb02e", // chocofy yellow-gold
    text: "Kesinlikle tavsiye ediyorum👍",
  },
  {
    id: 10,
    name: "Derya Kurt",
    time: "2 yıl önce",
    avatarBg: "#ff5fa2", // brand-pink
    text: "great tastes",
  },
];

export default function GoogleReviews() {
  const getInitials = (name) => {
    if (!name) return "S";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <section id="yorumlar" className="google-reviews">
      <div className="google-reviews-inner">
        {/* Title Block matching the screenshot */}
        <div className="reviews-title-block">
          <h2 className="reviews-title">
            Misafirlerimizin
            <span className="reviews-title-script">Deneyimleri</span>
          </h2>
        </div>

        {/* Google Badge showing rating info */}
        <div className="google-badge-container">
          <div className="google-badge">
            <span className="google-badge-text">
              <GoogleGIcon size={18} />
              Google Yorumları
            </span>
            <div className="google-badge-stars">
              <StarIcon fill={true} />
              <StarIcon fill={true} />
              <StarIcon fill={true} />
              <StarIcon fill={true} />
              <StarIcon fill={false} half={true} />
            </div>
            <span className="google-badge-rating">4.4 / 5</span>
          </div>
        </div>

        {/* Dual Marquee Track */}
        <div className="marquee-wrapper">
          {/* Row 1: Slides Left */}
          <div className="marquee-row left">
            {row1.map((rev) => (
              <ReviewCard key={rev.id} review={rev} initials={getInitials(rev.name)} />
            ))}
            {row1.map((rev) => (
              <ReviewCard key={`${rev.id}-dup`} review={rev} initials={getInitials(rev.name)} />
            ))}
          </div>

          {/* Row 2: Slides Right */}
          <div className="marquee-row right">
            {row2.map((rev) => (
              <ReviewCard key={rev.id} review={rev} initials={getInitials(rev.name)} />
            ))}
            {row2.map((rev) => (
              <ReviewCard key={`${rev.id}-dup`} review={rev} initials={getInitials(rev.name)} />
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="reviews-cta-banner">
          <h3 className="reviews-cta-title">BİZİ DEĞERLENDİRİN</h3>
          <a
            href="https://search.google.com/local/writereview?placeid=ChIJy9z7T7Sy5YgRxqS-zWcW3yA" // Replace with real place ID if available, otherwise general search
            target="_blank"
            rel="noopener noreferrer"
            className="google-write-btn"
          >
            GOOGLE'DA YORUM YAZ
          </a>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review, initials }) {
  return (
    <div className="review-card">
      <div className="review-card-header">
        <div className="review-user-info">
          {/* Avatar with customized smoothie-inspired colors */}
          <div className="review-avatar" style={{ backgroundColor: review.avatarBg }}>
            {initials}
          </div>
          <div className="review-user-meta">
            <span className="review-user-name">{review.name}</span>
            <span className="review-date">{review.time}</span>
          </div>
        </div>
        {/* Google G icon branding */}
        <div className="review-google-icon">
          <GoogleGIcon size={20} />
        </div>
      </div>

      {/* 5-star rating */}
      <div className="review-stars">
        <StarIcon fill={true} />
        <StarIcon fill={true} />
        <StarIcon fill={true} />
        <StarIcon fill={true} />
        <StarIcon fill={true} />
      </div>

      {/* Clean review text content */}
      <p className="review-text">{review.text}</p>
    </div>
  );
}

// Highly precise SVGs for icons
function StarIcon({ fill, half }) {
  if (half) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        {/* Half yellow, half empty star using gradient */}
        <defs>
          <linearGradient id="halfGrad">
            <stop offset="50%" stopColor="#ffb703" />
            <stop offset="50%" stopColor="#d8d3cd" />
          </linearGradient>
        </defs>
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          fill="url(#halfGrad)"
        />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={fill ? "#ffb703" : "#d8d3cd"}>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

function GoogleGIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.75-.63-1.19-1.57-1.19-2.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

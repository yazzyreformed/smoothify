import "./About.css";

const stats = [
  { value: "8", label: "imza tarif" },
  { value: "%100", label: "gerçek meyve" },
  { value: "0", label: "katkı maddesi" },
  { value: "60sn", label: "içinde elde hazır" },
];

const values = [
  {
    title: "Sadece smoothie",
    text: "Menüyü dağıtmadık. Tek işimiz var: şehrin en iyi smoothie'sini yapmak.",
  },
  {
    title: "Taze ve dürüst",
    text: "Konserve yok, toz aroma yok. Bardağa ne girdiğini üstüne gelince görüyorsun.",
  },
  {
    title: "Anında, elde",
    text: "Sipariş gelince blender çalışır. Önceden hazırlanmış, bekleyen smoothie satmıyoruz.",
  },
];

export default function About() {
  return (
    <section id="hakkimizda" className="section about">
      <div className="section-inner about-grid">
        <div className="about-copy">
          <p className="eyebrow">Hakkımızda</p>
          <h2 className="section-title">
            Biz bir kafe değiliz.<br />
            Bir <span className="grad-text">smoothie</span> takıntısıyız.
          </h2>
          <p className="section-lead">
            Smoothify, tek bir fikirle başladı: meyveyi en taze, en eğlenceli ve
            en dürüst haliyle bardağa koymak. O yüzden burada kahve, tost ya da
            uzun bir menü bulamazsın — sadece sekiz iyi düşünülmüş smoothie.
          </p>

          <div className="values">
            {values.map((v) => (
              <div className="value" key={v.title}>
                <span className="value-bullet" />
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="stats">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-visual" aria-hidden="true">
          <span className="about-blob" />
          <img className="glass glass-1" src="/smootieler/8.png" alt="" draggable="false" />
          <img className="glass glass-2" src="/smootieler/4.png" alt="" draggable="false" />
          <img className="glass glass-3" src="/smootieler/5.png" alt="" draggable="false" />
          <span className="about-script">taze • el yapımı • şehrin enerjisi</span>
        </div>
      </div>
    </section>
  );
}

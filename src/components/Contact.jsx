import { useState } from "react";
import "./Contact.css";

const info = [
  { label: "Adres", value: "Moda Cad. No:12, Kadıköy / İstanbul" },
  { label: "Saatler", value: "Her gün 09:00 – 22:00" },
  { label: "Telefon", value: "+90 555 000 00 00" },
  { label: "E-posta", value: "merhaba@smoothify.co" },
];

const socials = ["Instagram", "TikTok", "X"];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="iletisim" className="section contact">
      <div className="section-inner contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">İletişim</p>
          <h2 className="section-title">Uğra, bir bardak iç</h2>
          <p className="section-lead">
            Sipariş, etkinlik ya da sadece selam vermek için — kapımız (ve
            blender'ımız) hep açık.
          </p>

          <ul className="info-list">
            {info.map((i) => (
              <li key={i.label}>
                <span className="info-label">{i.label}</span>
                <span className="info-value">{i.value}</span>
              </li>
            ))}
          </ul>

          <div className="socials">
            {socials.map((s) => (
              <a
                key={s}
                href="#iletisim"
                className="social"
                onClick={(e) => e.preventDefault()}
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <div className="contact-card">
          {sent ? (
            <div className="thanks">
              <span className="thanks-emoji" aria-hidden="true">🥤</span>
              <h3>Teşekkürler{form.name ? `, ${form.name}` : ""}!</h3>
              <p>Mesajın bize ulaştı. En kısa sürede dönüş yapacağız.</p>
              <button
                className="btn-ghost"
                onClick={() => {
                  setSent(false);
                  setForm({ name: "", email: "", message: "" });
                }}
              >
                Yeni mesaj yaz
              </button>
            </div>
          ) : (
            <form className="form" onSubmit={onSubmit}>
              <label className="field">
                <span>Adın</span>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Adın soyadın"
                />
              </label>
              <label className="field">
                <span>E-posta</span>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={update("email")}
                  placeholder="seninadin@mail.com"
                />
              </label>
              <label className="field">
                <span>Mesajın</span>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Bize ne sormak istersin?"
                />
              </label>
              <button type="submit" className="btn-submit">
                Gönder
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

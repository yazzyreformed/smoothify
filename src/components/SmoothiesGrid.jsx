import { smoothies } from "../data/smoothies";
import "./SmoothiesGrid.css";

export default function SmoothiesGrid() {
  return (
    <section id="smoothies" className="section grid-section">
      <div className="section-inner">
        <header className="grid-head">
          <p className="eyebrow">Smoothie'lerimiz</p>
          <h2 className="section-title">8 tarif, tek tutku</h2>
          <p className="section-lead">
            Her biri taze meyveyle, elde ve sipariş anında hazırlanır. Üstüne
            gel, içine ne girdiğini gör.
          </p>
        </header>

        <div className="cards">
          {smoothies.map((s) => (
            <article
              key={s.id}
              className="card"
              style={{
                "--g1": s.bg[0],
                "--g2": s.bg[2],
                "--accent": s.accent,
              }}
            >
              <div className="card-visual">
                <span className="card-glow" />
                <img className="card-img base" src={s.image} alt={s.name} draggable="false" />
                <img
                  className="card-img hover"
                  src={s.hoverImage}
                  alt={`${s.name} içindekiler`}
                  draggable="false"
                />
              </div>

              <div className="card-body">
                <h3 className="card-name">{s.name}</h3>
                <p className="card-flavor">{s.flavorText}</p>
                <p className="card-tag">{s.tagline}</p>
                <ul className="chips">
                  {s.ingredients.map((ing) => (
                    <li key={ing} className="chip">
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

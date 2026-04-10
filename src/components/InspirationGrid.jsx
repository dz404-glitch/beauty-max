const cards = [
  {
    title: 'Pastel Glow',
    description: 'Soft cheeks, subtle shimmer, and dreamy pink details for a charming everyday look.',
    accent: '#f7c2e9',
  },
  {
    title: 'Kawaii Skin',
    description: 'Fresh, dewy skin with a gentle highlight and light veil of color.',
    accent: '#c8f0ff',
  },
  {
    title: 'Effortless Chic',
    description: 'Neutral tones, simple lines, and a cute accessory to keep things polished.',
    accent: '#f8d18a',
  },
  {
    title: 'Soft Romantic',
    description: 'Warm peachy tones, flutter lashes, and a cozy outfit inspired by pastel dreams.',
    accent: '#ffc9b8',
  },
];

export default function InspirationGrid() {
  return (
    <section className="card">
      <h2 className="section-title">Lookbook inspiration</h2>
      <p>Explore different makeup looks and outfit vibes that make your cute aesthetic feel easy and intentional.</p>
      <div className="inspo-grid">
        {cards.map((card) => (
          <div key={card.title} className="inspo-card" style={{ borderColor: `${card.accent}33`, background: `linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))` }}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
              <span className="tag">#cute</span>
              <span className="tag">#glow</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

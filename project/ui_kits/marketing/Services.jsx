// node: marketing/Services
const services = [
  { num: '01', title: 'Branding', body: 'Nous construisons une identité visuelle cohérente et mémorable, pensée pour durer.', tags: ['Stratégie', 'Logo', 'Design system'] },
  { num: '02', title: 'Web Design', body: 'Nous concevons des interfaces claires, modernes et performantes pour convertir.', tags: ['UX', 'UI', 'Prototypage'] },
  { num: '03', title: 'Développement', body: 'Next.js, React, Tailwind. Nous codons des sites et outils métier sur mesure.', tags: ['Next.js', 'Webapps', 'E-commerce'] },
  { num: '04', title: 'Maintenance', body: 'Nous veillons sur ta présence en ligne pour qu\u2019elle reste rapide et à jour.', tags: ['Hébergement', 'Sécurité', 'Support'] }
];

function ServiceCard({ num, title, body, tags, highlight }) {
  return (
    <article style={{
      padding: '28px 26px 24px',
      background: highlight ? 'linear-gradient(180deg,#003FE4,#002DA4)' : '#fff',
      color: highlight ? '#fff' : '#000',
      border: highlight ? 'none' : '1px solid #E0E0E0',
      borderRadius: 20, display: 'flex', flexDirection: 'column', gap: 12,
      minHeight: 280, position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontSize: 12, fontFamily: 'var(--font-mono)',
          opacity: highlight ? 0.7 : 0.45, letterSpacing: '0.03em'
        }}>
          {num}
        </span>
      </div>
      <h3 style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.03em', margin: 0, lineHeight: 1 }}>{title}</h3>
      <p style={{ fontSize: 15, lineHeight: 1.45, letterSpacing: '-0.01em', margin: 0, opacity: highlight ? 0.85 : 0.72, flex: 1 }}>{body}</p>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {tags.map(t => (
          <span key={t} style={{
            padding: '4px 10px', borderRadius: 999, fontSize: 11,
            background: highlight ? 'rgba(255,255,255,0.14)' : '#F2F4FB',
            color: highlight ? '#fff' : '#003FE4'
          }}>{t}</span>
        ))}
      </div>
    </article>
  );
}

function Services() {
  return (
    <section style={{ padding: '120px 52px', background: '#fff', color: '#000' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
          <div>
            <div style={{ fontSize: 13, color: '#003FE4', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>
              → CE QUE NOUS FAISONS
            </div>
            <h2 style={{ fontSize: 56, fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 0.95, margin: 0, maxWidth: 720 }}>
              Quatre métiers, une seule obsession&nbsp;: <span style={{ color: '#003FE4' }}>ton impact</span>.
            </h2>
          </div>
          <a href="#" style={{
            color: '#000', textDecoration: 'underline', textUnderlineOffset: 4,
            fontSize: 14, fontWeight: 500, letterSpacing: '-0.01em', whiteSpace: 'nowrap'
          }}>
            Tous nos services →
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {services.map((s, i) => (<ServiceCard key={s.num} {...s} highlight={i === 1} />))}
        </div>
      </div>
    </section>
  );
}

window.Services = Services;

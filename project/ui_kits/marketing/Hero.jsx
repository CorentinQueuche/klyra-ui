// node: marketing/Hero
const shadowCta = {
  boxShadow: 'inset 8px -5px 41px rgba(1,164,255,0.3), inset -12px 8px 33px rgba(1,164,255,0.15), 0 18px 40px rgba(0,63,228,0.45)'
};

function Arrow({ size = 12 }) {
  return (
    <span style={{
      display: 'inline-block', width: size, height: size,
      borderTop: '1.5px solid currentColor', borderRight: '1.5px solid currentColor',
      transform: 'rotate(45deg)', marginLeft: 6
    }} />
  );
}

function Hero() {
  return (
    <section style={{
      position: 'relative', minHeight: 720, background: '#000',
      color: '#fff', overflow: 'hidden', padding: '120px 52px 80px'
    }}>
      {/* Halos */}
      <div style={{
        position: 'absolute', width: 900, height: 900, borderRadius: '50%',
        top: -380, right: -260,
        background: 'radial-gradient(50% 50% at 50% 50%, rgba(0,63,228,0.85) 0%, rgba(0,63,228,0) 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', width: 800, height: 800, borderRadius: '50%',
        bottom: -440, left: -260,
        background: 'radial-gradient(50% 50% at 50% 50%, rgba(1,164,255,0.6) 0%, rgba(1,164,255,0) 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', maxWidth: 1180, margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 14px', border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 999, fontSize: 13, color: 'rgba(255,255,255,0.8)',
          background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)'
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00DDFF' }} />
          +20 entreprises nous font confiance
        </div>

        <h1 style={{
          fontSize: 104, fontWeight: 500, letterSpacing: '-0.045em', lineHeight: 0.92,
          margin: '32px 0 0', maxWidth: 1080,
          textWrap: 'balance'
        }}>
          Nous créons les{' '}
          <span style={{ color: '#01A4FF', whiteSpace: 'nowrap' }}>outils digitaux</span>
          {' '}qui font grandir{' '}
          <span style={{
            background: 'linear-gradient(180deg,#01A4FF,#00DDFF)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            whiteSpace: 'nowrap'
          }}>votre entreprise.</span>
        </h1>

        <p style={{
          marginTop: 28, maxWidth: 640, fontSize: 20, lineHeight: 1.45,
          letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.72)'
        }}>
          Des outils aussi performants que ceux des grandes entreprises — sans la complexité,
          le coût ou les délais. Stratégie, branding, webapps sur mesure.
        </p>

        <div style={{ marginTop: 40, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <button style={{
            ...shadowCta,
            border: 'none', cursor: 'pointer',
            padding: '18px 32px', borderRadius: 999,
            background: 'linear-gradient(180deg,#003FE4 0%,rgba(0,63,228,0.45) 100%)',
            color: '#fff', fontFamily: 'inherit', fontSize: 16, fontWeight: 500,
            letterSpacing: '-0.01em'
          }}>
            Prendre rendez-vous <Arrow />
          </button>
          <button style={{
            border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer',
            padding: '18px 32px', borderRadius: 999,
            background: 'rgba(255,255,255,0.04)', color: '#fff', fontFamily: 'inherit',
            fontSize: 16, fontWeight: 500, letterSpacing: '-0.01em'
          }}>
            Voir nos réalisations
          </button>
        </div>

        <div style={{
          marginTop: 72, display: 'flex', alignItems: 'center', gap: 32,
          color: 'rgba(255,255,255,0.55)', fontSize: 13, letterSpacing: '-0.01em',
          fontFamily: 'var(--font-mono)'
        }}>
          <span>→ BRANDING</span>
          <span>→ WEB DESIGN</span>
          <span>→ DÉVELOPPEMENT</span>
          <span>→ MAINTENANCE</span>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;

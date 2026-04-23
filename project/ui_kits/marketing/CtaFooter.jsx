// node: marketing/CtaFooter
function CtaFooter() {
  return (
    <footer style={{
      position: 'relative', background: '#000', color: '#fff', overflow: 'hidden',
      padding: '120px 52px 52px'
    }}>
      <div style={{
        position: 'absolute', width: 1100, height: 1100, borderRadius: '50%',
        top: -480, left: '50%', transform: 'translateX(-50%)',
        background: 'radial-gradient(50% 50% at 50% 50%, rgba(0,63,228,0.9), rgba(0,63,228,0) 70%)'
      }} />
      <div style={{ position: 'relative', maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#00DDFF', fontFamily: 'var(--font-mono)', marginBottom: 18 }}>
            → PRÊT À EMBARQUER&nbsp;?
          </div>
          <h2 style={{
            fontSize: 96, fontWeight: 500, letterSpacing: '-0.045em', lineHeight: 0.92,
            margin: 0, maxWidth: 1000, marginInline: 'auto'
          }}>
            Le web n'attend pas.<br /><span style={{ color: '#01A4FF' }}>Vous non plus.</span>
          </h2>
          <button style={{
            marginTop: 48, border: 'none', cursor: 'pointer',
            padding: '22px 40px', borderRadius: 999,
            background: 'linear-gradient(180deg,#003FE4 0%,rgba(0,63,228,0.45) 100%)',
            color: '#fff', fontFamily: 'inherit', fontSize: 17, fontWeight: 500,
            letterSpacing: '-0.01em',
            boxShadow: 'inset 8px -5px 41px rgba(1,164,255,0.35), inset -12px 8px 33px rgba(1,164,255,0.15), 0 22px 50px rgba(0,63,228,0.55)'
          }}>
            Prendre rendez-vous avec Corentin →
          </button>
        </div>

        <div style={{
          marginTop: 100, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.14)',
          display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 24
        }}>
          <div>
            <img src="../../assets/logos/klyra-logo-white.svg" style={{ height: 26 }} />
            <p style={{ marginTop: 14, fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, maxWidth: 260 }}>
              Agence digitale · Strasbourg, France. Nous construisons des outils métier sur mesure pour les PME.
            </p>
          </div>
          {[
            { h: 'Services', l: ['Branding', 'Web Design', 'Développement', 'Maintenance'] },
            { h: 'Studio', l: ['À propos', 'Réalisations', 'Labs', 'Blog'] },
            { h: 'Contact', l: ['corentin@klyra.fr', 'LinkedIn', 'Strasbourg, FR'] }
          ].map(col => (
            <div key={col.h}>
              <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>
                {col.h.toUpperCase()}
              </div>
              {col.l.map(li => (
                <div key={li} style={{ fontSize: 14, color: 'rgba(255,255,255,0.82)', padding: '6px 0', letterSpacing: '-0.01em' }}>
                  {li}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 48, display: 'flex', justifyContent: 'space-between',
          fontSize: 12, color: 'rgba(255,255,255,0.45)', letterSpacing: '-0.01em'
        }}>
          <span>Stratégie & identité de marque — Tous droits réservés</span>
          <span>Klyra Design · 2026</span>
        </div>
      </div>
    </footer>
  );
}

window.CtaFooter = CtaFooter;

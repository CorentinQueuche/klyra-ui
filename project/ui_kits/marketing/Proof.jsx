// node: marketing/Proof
const metrics = [
  { big: '+20', label: 'Entreprises accompagnées' },
  { big: '4.9', label: 'Note moyenne client' },
  { big: '47', label: 'Projets livrés depuis 2023' },
  { big: '9 635', label: 'Abonnés LinkedIn' }
];

function Proof() {
  return (
    <section style={{
      padding: '120px 52px', background: '#000', color: '#fff', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', width: 700, height: 700, borderRadius: '50%',
        top: -300, left: '40%',
        background: 'radial-gradient(50% 50% at 50% 50%, rgba(0,63,228,0.6), rgba(0,63,228,0) 70%)'
      }} />
      <div style={{ position: 'relative', maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#01A4FF', fontFamily: 'var(--font-mono)', marginBottom: 16 }}>
          → PREUVES
        </div>
        <h2 style={{ fontSize: 56, fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 0.95, margin: 0, maxWidth: 820 }}>
          Des résultats concrets, pas des promesses.
        </h2>
        <div style={{
          marginTop: 64,
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0, borderTop: '1px solid rgba(255,255,255,0.16)'
        }}>
          {metrics.map((m, i) => (
            <div key={m.label} style={{
              padding: '32px 28px 8px',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.16)' : 'none'
            }}>
              <div style={{ fontSize: 72, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1, color: '#fff' }}>
                {m.big}
              </div>
              <div style={{ marginTop: 14, fontSize: 14, color: 'rgba(255,255,255,0.65)', letterSpacing: '-0.01em' }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Proof = Proof;

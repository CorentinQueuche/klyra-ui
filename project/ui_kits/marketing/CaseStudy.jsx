// node: marketing/CaseStudy
function CaseStudy() {
  return (
    <section style={{ padding: '120px 52px', background: '#FAFAFB', color: '#000' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
          <div>
            <div style={{ fontSize: 13, color: '#003FE4', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>
              → RÉALISATIONS RÉCENTES
            </div>
            <h2 style={{ fontSize: 56, fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 0.95, margin: 0, maxWidth: 720 }}>
              Quelques projets dont on est fiers.
            </h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>
          {/* Large case — dashboard */}
          <article style={{
            borderRadius: 20, overflow: 'hidden', position: 'relative',
            background: 'linear-gradient(180deg,#003FE4 0%,#000 100%)',
            color: '#fff', minHeight: 460
          }}>
            <div style={{
              position: 'absolute', width: 600, height: 600, borderRadius: '50%',
              top: -320, right: -220,
              background: 'radial-gradient(50% 50% at 50% 50%, rgba(1,164,255,0.7), rgba(1,164,255,0))'
            }} />
            <div style={{ position: 'relative', padding: '32px 32px 0', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', opacity: 0.7 }}>CS-01 · WEBAPP MÉTIER</span>
                <span style={{ padding: '4px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.14)', fontSize: 11 }}>Livré · 2025</span>
              </div>
              <h3 style={{ fontSize: 40, fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 1, margin: '20px 0 10px', maxWidth: 420 }}>
                Un outil de devis qui remplace 3 Excel.
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.5, opacity: 0.8, margin: 0, maxWidth: 440 }}>
                BTP · 12 utilisateurs · 50% de temps gagné sur la création de devis.
              </p>
              {/* fake dashboard panel */}
              <div style={{ marginTop: 'auto', marginLeft: 24, marginRight: -24, marginBottom: -20 }}>
                <div style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderTopLeftRadius: 14, borderTopRightRadius: 14,
                  backdropFilter: 'blur(22px)',
                  padding: '18px 20px 22px',
                  boxShadow: 'inset 2px -4px 22px rgba(0,63,228,0.25)'
                }}>
                  <div style={{ fontSize: 11, opacity: 0.65, fontFamily: 'var(--font-mono)' }}>ÉVOLUTION DES VENTES</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 8 }}>
                    <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.03em' }}>8 547 €</div>
                    <div style={{ fontSize: 13, color: '#00DDFF', fontWeight: 500 }}>+32% vs. M-1</div>
                  </div>
                  <svg viewBox="0 0 500 70" style={{ width: '100%', height: 70, marginTop: 10 }}>
                    <path d="M0 55 Q60 45 120 40 T240 28 T360 20 T500 8" fill="none" stroke="#00DDFF" strokeWidth="2" />
                    <path d="M0 55 Q60 45 120 40 T240 28 T360 20 T500 8 L500 70 L0 70 Z" fill="url(#g1)" opacity="0.45" />
                    <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00DDFF" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#00DDFF" stopOpacity="0" />
                    </linearGradient></defs>
                  </svg>
                </div>
              </div>
            </div>
          </article>

          {/* Small cases */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { tag: 'CS-02 · SITE MARKETING', title: 'Refonte pour un cabinet d\u2019avocats', body: 'Identité + site Next.js · +38% de contacts qualifiés en 3 mois.' },
              { tag: 'CS-03 · E-COMMERCE', title: 'Boutique pour un artisan chocolatier', body: 'Shopify custom · temps de chargement divisé par 3.' },
              { tag: 'CS-04 · BRANDING', title: 'Identité visuelle pour un cabinet RH', body: 'Logo, charte, supports papier + digital. 2 semaines.' }
            ].map(c => (
              <article key={c.tag} style={{
                background: '#fff', border: '1px solid #E0E0E0', borderRadius: 16,
                padding: 22, display: 'flex', flexDirection: 'column', gap: 8, flex: 1
              }}>
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#003FE4' }}>{c.tag}</span>
                <h4 style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.025em', margin: 0, lineHeight: 1.15 }}>{c.title}</h4>
                <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.65)', margin: 0, lineHeight: 1.45 }}>{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

window.CaseStudy = CaseStudy;

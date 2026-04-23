// node: webapp/Dashboard
const stats = [
  { label: 'Chiffre d\u2019affaires', value: '8 547 €', delta: '+32%', up: true },
  { label: 'Devis envoyés', value: '24', delta: '+6', up: true },
  { label: 'Taux conversion', value: '42%', delta: '−3%', up: false },
  { label: 'Panier moyen', value: '356 €', delta: '+12%', up: true }
];

const deals = [
  ['Boulangerie Martin', 'Site vitrine + SEO', '2 400 €', 'Envoyé', '#003FE4'],
  ['Cabinet Lefebvre', 'Refonte + branding', '9 800 €', 'Accepté', '#0C9D4C'],
  ['Atelier Bois&Co', 'Outil de devis interne', '12 500 €', 'Négociation', '#C57A00'],
  ['Garage Dupont', 'Landing page', '1 200 €', 'Envoyé', '#003FE4'],
  ['École Montessori', 'Site + blog', '4 600 €', 'Brouillon', '#6A6A6A']
];

function StatCard({ label, value, delta, up }) {
  return (
    <div style={{
      flex: 1, background: '#fff', border: '1px solid #E0E0E0', borderRadius: 14,
      padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 10,
      boxShadow: '0 1px 2px rgba(0,45,164,0.04)'
    }}>
      <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.55)', letterSpacing: '-0.01em' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <div style={{ fontSize: 32, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</div>
        <div style={{
          fontSize: 12, fontWeight: 500,
          color: up ? '#0C9D4C' : '#C03535'
        }}>{delta}</div>
      </div>
      <svg viewBox="0 0 180 36" style={{ width: '100%', height: 36 }}>
        <path d={up ? 'M0 28 Q30 24 60 20 T120 10 T180 4' : 'M0 10 Q30 14 60 18 T120 26 T180 30'}
          fill="none" stroke="#003FE4" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function Dashboard() {
  return (
    <div style={{ padding: '24px 28px', background: '#FAFAFB', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ display: 'flex', gap: 14 }}>
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Chart + side panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14, marginTop: 14 }}>
        <div style={{ background: '#fff', border: '1px solid #E0E0E0', borderRadius: 14, padding: '18px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.55)' }}>Chiffre d'affaires · 30 derniers jours</div>
              <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.03em', marginTop: 4 }}>8 547 €</div>
            </div>
            <div style={{ display: 'flex', gap: 4, background: '#F4F6FB', padding: 3, borderRadius: 999 }}>
              {['7J', '30J', '3M', '1A'].map((l, i) => (
                <button key={l} style={{
                  padding: '4px 12px', borderRadius: 999, border: 'none',
                  background: i === 1 ? '#fff' : 'transparent',
                  color: i === 1 ? '#003FE4' : '#202020',
                  fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: i === 1 ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
                }}>{l}</button>
              ))}
            </div>
          </div>
          <svg viewBox="0 0 700 200" style={{ width: '100%', height: 200, marginTop: 16 }}>
            <defs>
              <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#003FE4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#003FE4" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[40, 80, 120, 160].map(y => <line key={y} x1="0" x2="700" y1={y} y2={y} stroke="#F0F0F5" />)}
            <path d="M0 160 Q60 140 120 130 T240 100 T360 95 T480 70 T600 55 T700 30"
              fill="none" stroke="#003FE4" strokeWidth="2.5" />
            <path d="M0 160 Q60 140 120 130 T240 100 T360 95 T480 70 T600 55 T700 30 L700 200 L0 200 Z"
              fill="url(#area)" />
          </svg>
        </div>
        <div style={{ background: '#fff', border: '1px solid #E0E0E0', borderRadius: 14, padding: '18px 20px' }}>
          <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: '-0.02em' }}>À faire aujourd'hui</div>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['Relancer Cabinet Lefebvre', '14:30', true],
              ['Préparer devis Atelier Bois&Co', '16:00', false],
              ['Appel onboarding École Montessori', '17:30', false],
              ['Rédiger newsletter mai', 'Libre', false]
            ].map(([task, time, done]) => (
              <div key={task} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0' }}>
                <div style={{
                  width: 16, height: 16, borderRadius: 5,
                  background: done ? '#003FE4' : 'transparent',
                  border: done ? 'none' : '1.5px solid #D9D9E5',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {done && <svg width="10" height="10" viewBox="0 0 10 10" stroke="#fff" strokeWidth="1.8" fill="none"><path d="M2 5l2 2 4-5" /></svg>}
                </div>
                <div style={{ flex: 1, fontSize: 13, color: done ? 'rgba(0,0,0,0.4)' : '#202020', textDecoration: done ? 'line-through' : 'none' }}>{task}</div>
                <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.5)', fontFamily: 'var(--font-mono)' }}>{time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid #E0E0E0', borderRadius: 14, marginTop: 14, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E0E0E0' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: '-0.02em' }}>Devis récents</div>
            <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)', marginTop: 2 }}>5 devis · mis à jour il y a 2 min</div>
          </div>
          <a style={{ fontSize: 12, color: '#003FE4', textDecoration: 'underline', textUnderlineOffset: 3 }}>Tout voir →</a>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#FAFAFB', color: 'rgba(0,0,0,0.55)', fontSize: 11, letterSpacing: '0.04em' }}>
              <th style={{ textAlign: 'left', padding: '10px 20px', fontWeight: 500 }}>CLIENT</th>
              <th style={{ textAlign: 'left', padding: '10px 20px', fontWeight: 500 }}>MISSION</th>
              <th style={{ textAlign: 'right', padding: '10px 20px', fontWeight: 500 }}>MONTANT</th>
              <th style={{ textAlign: 'left', padding: '10px 20px', fontWeight: 500 }}>STATUT</th>
              <th style={{ width: 30 }}></th>
            </tr>
          </thead>
          <tbody>
            {deals.map(([name, mission, amt, status, color]) => (
              <tr key={name} style={{ borderTop: '1px solid #F0F0F5' }}>
                <td style={{ padding: '14px 20px', fontWeight: 500 }}>{name}</td>
                <td style={{ padding: '14px 20px', color: 'rgba(0,0,0,0.7)' }}>{mission}</td>
                <td style={{ padding: '14px 20px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{amt}</td>
                <td style={{ padding: '14px 20px' }}>
                  <span style={{
                    padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 500,
                    background: color + '18', color
                  }}>{status}</span>
                </td>
                <td style={{ padding: '14px 20px', color: 'rgba(0,0,0,0.4)' }}>→</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

window.Dashboard = Dashboard;

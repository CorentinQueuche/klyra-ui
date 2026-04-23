// node: webapp/Sidebar
const items = [
  ['home', 'Tableau de bord'],
  ['document', 'Devis'],
  ['bag', 'Clients'],
  ['chart', 'Statistiques'],
  ['spark', 'Automatisations'],
  ['gear', 'Paramètres']
];

function Icon({ name }) {
  const common = { width: 18, height: 18, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    home: <path d="M3 10l7-6 7 6v8a1 1 0 0 1-1 1h-4v-6h-4v6H4a1 1 0 0 1-1-1z" />,
    document: <><path d="M5 3h7l4 4v13H5z" /><path d="M12 3v4h4" /></>,
    bag: <><path d="M5 7h10l1 12H4z" /><path d="M8 7a2 2 0 0 1 4 0" /></>,
    chart: <><path d="M4 17V7M10 17v-6M16 17V4" /></>,
    spark: <path d="M10 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />,
    gear: <><circle cx="10" cy="10" r="3" /><path d="M10 2v2m0 12v2M2 10h2m12 0h2M4.2 4.2l1.4 1.4m9 9l1.4 1.4M4.2 15.8l1.4-1.4m9-9l1.4-1.4" /></>
  };
  return <svg viewBox="0 0 20 20" {...common}>{paths[name]}</svg>;
}

function Sidebar({ current = 'home' }) {
  return (
    <aside style={{
      width: 240, background: '#fff', borderRight: '1px solid #E0E0E0',
      display: 'flex', flexDirection: 'column'
    }}>
      {/* Logo row — exactly 64 px tall to match the TopBar height,
          full-width bottom border aligned with TopBar's bottom divider. */}
      <div style={{
        height: 64, boxSizing: 'border-box',
        borderBottom: '1px solid #E0E0E0',
        display: 'flex', alignItems: 'center',
        padding: '0 20px'
      }}>
        <img src="../../assets/logos/klyra-logo-original.svg" style={{ height: 24 }} />
      </div>

      {/* Nav section */}
      <nav style={{
        padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 2
      }}>
        <div style={{
          padding: '4px 12px 10px', fontSize: 10, fontFamily: 'var(--font-mono)',
          color: 'rgba(0,0,0,0.45)', letterSpacing: '0.06em'
        }}>PILOTAGE</div>
        {items.map(([icon, label]) => {
          const active = icon === current;
          return (
            <a key={icon} href="#" style={{
              position: 'relative',
              display: 'flex', alignItems: 'center', gap: 12,
              height: 38, padding: '0 12px', borderRadius: 8,
              textDecoration: 'none',
              color: active ? '#003FE4' : '#202020',
              background: active ? 'rgba(0,63,228,0.08)' : 'transparent',
              fontSize: 14, fontWeight: active ? 500 : 400, letterSpacing: '-0.01em'
            }}>
              {active && <span style={{
                position: 'absolute', left: -12, top: 9, bottom: 9, width: 3,
                background: '#003FE4', borderRadius: '0 3px 3px 0'
              }} />}
              <Icon name={icon} />
              <span>{label}</span>
            </a>
          );
        })}
      </nav>

      {/* Tenant card — grouped at the bottom, above the support CTA */}
      <div style={{ marginTop: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{
          padding: '10px 12px', background: '#F4F6FB', borderRadius: 10,
          display: 'flex', alignItems: 'center', gap: 10
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: 'linear-gradient(180deg,#003FE4,#01A4FF)',
            color: '#fff', fontSize: 12, fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>DB</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1 }}>Dubois & Cie</div>
            <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.5)', marginTop: 3 }}>Plan Pro</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 8l3-3 3 3M7 12l3 3 3-3" />
          </svg>
        </div>

        <div style={{
          padding: 14, borderRadius: 12,
          background: 'linear-gradient(180deg,#003FE4 0%,#002DA4 100%)',
          color: '#fff', boxShadow: 'inset 2px -4px 22px rgba(1,164,255,0.3)'
        }}>
          <div style={{ fontSize: 11, opacity: 0.75, fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>BESOIN D'AIDE&nbsp;?</div>
          <div style={{ fontSize: 14, fontWeight: 500, marginTop: 6, lineHeight: 1.3 }}>
            Un accompagnement mensuel par Klyra.
          </div>
          <button style={{
            marginTop: 12, width: '100%', padding: '8px 12px', borderRadius: 999,
            background: '#fff', color: '#003FE4', border: 'none',
            fontFamily: 'inherit', fontSize: 13, fontWeight: 500, cursor: 'pointer',
            letterSpacing: '-0.01em'
          }}>Prendre rendez-vous</button>
        </div>
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;

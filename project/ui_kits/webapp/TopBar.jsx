// node: webapp/TopBar
function TopBar() {
  return (
    <header style={{
      height: 64, borderBottom: '1px solid #E0E0E0',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', background: '#fff'
    }}>
      <div>
        <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.5)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
          TABLEAU DE BORD
        </div>
        <div style={{ fontSize: 19, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1, marginTop: 4 }}>
          Bonjour Corentin 👋
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          position: 'relative',
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 14px', background: '#F4F6FB', borderRadius: 999,
          width: 280
        }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="9" cy="9" r="6" /><path d="M14 14l4 4" />
          </svg>
          <input placeholder="Rechercher un client, un devis…" style={{
            border: 'none', background: 'transparent', outline: 'none',
            fontFamily: 'inherit', fontSize: 13, flex: 1, color: '#202020'
          }} />
          <kbd style={{
            fontSize: 10, color: 'rgba(0,0,0,0.5)', border: '1px solid #D9D9E5',
            borderRadius: 4, padding: '1px 5px', fontFamily: 'var(--font-mono)'
          }}>⌘K</kbd>
        </div>
        <button style={{
          width: 36, height: 36, borderRadius: 10, border: '1px solid #E0E0E0',
          background: '#fff', cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center'
        }}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#202020" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 8a6 6 0 0 1 12 0v4l1 2H3l1-2z" /><path d="M8 16a2 2 0 0 0 4 0" />
          </svg>
        </button>
        <button style={{
          padding: '9px 16px', borderRadius: 999, border: 'none',
          background: 'linear-gradient(180deg,#003FE4 0%,rgba(0,63,228,0.5) 100%)',
          color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
          cursor: 'pointer', letterSpacing: '-0.01em',
          boxShadow: 'inset 4px -3px 20px rgba(1,164,255,0.3), 0 6px 16px rgba(0,63,228,0.25)'
        }}>
          + Nouveau devis
        </button>
      </div>
    </header>
  );
}

window.TopBar = TopBar;

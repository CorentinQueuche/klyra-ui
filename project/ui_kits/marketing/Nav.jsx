// node: marketing/Nav
function Nav() {
  return (
    <header style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
      padding: '24px 52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
    }}>
      <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <img src="../../assets/logos/klyra-logo-white.svg" style={{ height: 28 }} />
      </a>
      <nav style={{ display: 'flex', gap: 28, fontSize: 14, color: 'rgba(255,255,255,0.78)', letterSpacing: '-0.01em' }}>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Services</a>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Réalisations</a>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>À propos</a>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Labs</a>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</a>
      </nav>
      <a href="#" style={{
        padding: '10px 20px', borderRadius: 999,
        background: '#fff', color: '#000', fontSize: 14, fontWeight: 500,
        textDecoration: 'none', letterSpacing: '-0.01em'
      }}>
        Prendre rendez-vous
      </a>
    </header>
  );
}

window.Nav = Nav;

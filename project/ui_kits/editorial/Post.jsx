// node: editorial/Post
/* LinkedIn portrait post — 1080×1350 design (shown at 540×675 here) */
function Post({ variant = 'dark', eyebrow, title, highlight, footer, children }) {
  const bg = variant === 'dark'
    ? 'linear-gradient(180deg,#000 0%,#003FE4 100%)'
    : variant === 'blue'
    ? 'linear-gradient(180deg,#003FE4 0%,#01A4FF 100%)'
    : '#fff';
  const fg = variant === 'light' ? '#000' : '#fff';

  /* Highlight color per variant — the key term gets K3 cyan so it reads as a
     brand accent rather than a link. Light variant keeps K1 blue for contrast. */
  const highlightColor = variant === 'light' ? '#003FE4' : '#00DDFF';

  return (
    <article style={{
      position: 'relative', width: 540, height: 675, borderRadius: 20,
      background: bg, color: fg, overflow: 'hidden',
      padding: '30px 32px 28px', boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      {variant !== 'light' && (
        <div style={{
          position: 'absolute', width: 900, height: 900, borderRadius: '50%',
          top: -620, right: -400,
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(1,164,255,0.16), rgba(1,164,255,0) 65%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }} />
      )}

      {/* TOP — logo + eyebrow */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src={variant === 'light' ? '../../assets/logos/klyra-logo-original.svg' : '../../assets/logos/klyra-logo-white.svg'} style={{ height: 24 }} />
        <span style={{
          fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em',
          padding: '4px 10px', borderRadius: 999,
          border: variant === 'light' ? '1px solid rgba(0,0,0,0.12)' : '1px solid rgba(255,255,255,0.22)',
          color: variant === 'light' ? 'rgba(0,0,0,0.62)' : 'rgba(255,255,255,0.82)'
        }}>{eyebrow}</span>
      </div>

      {/* MIDDLE — optional body slot (used by the "light" variant) */}
      {children && (
        <div style={{ position: 'relative', marginTop: 18 }}>{children}</div>
      )}

      {/* BOTTOM — headline anchored low, signature below */}
      <div style={{ position: 'relative' }}>
        <h2 style={{
          fontSize: 54, fontWeight: 500, letterSpacing: '-0.045em', lineHeight: 0.95,
          margin: 0, textWrap: 'balance'
        }}>
          {title}
          {highlight && (
            <>
              <br />
              <span style={{ color: highlightColor }}>{highlight}</span>
            </>
          )}
        </h2>
        <div style={{
          marginTop: 22, paddingTop: 14,
          borderTop: variant === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.18)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 12, opacity: 0.85,
          color: variant === 'light' ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.85)'
        }}>
          <span>{footer || 'Klyra Design — 2026'}</span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>→ swipe</span>
        </div>
      </div>
    </article>
  );
}

window.Post = Post;

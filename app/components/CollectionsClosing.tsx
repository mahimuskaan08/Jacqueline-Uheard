export default function CollectionsClosing() {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      backgroundImage: 'url(/collections-closing-bg-v5.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
    }}>

      {/* 20% white overlay = 80% image visibility */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.20)' }} />

      {/* Dark vignette at bottom for text legibility */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 40%)',
      }} />

      {/* Signature text — bottom right */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(28px, 4vw, 52px)',
        right: 'clamp(24px, 4vw, 56px)',
        zIndex: 2,
        textAlign: 'right',
      }}>
        <p style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(18px, 2.2vw, 28px)',
          fontWeight: 600,
          fontStyle: 'italic',
          color: '#ffffff',
          margin: 0,
          letterSpacing: '0.01em',
          textShadow: '0 2px 12px rgba(0,0,0,0.3)',
        }}>
          With Love By Jacqueline.
        </p>
      </div>
    </section>
  );
}

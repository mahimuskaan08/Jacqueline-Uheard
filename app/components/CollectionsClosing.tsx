export default function CollectionsClosing() {
  return (
    <section className="closing-section" style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      backgroundImage: 'url(/collections-closing-bg-v5.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
    }}>

      <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.15)' }} />

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.52) 0%, transparent 45%)',
      }} />

      {/* Signature text — bottom right */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(20px, 4vw, 52px)',
        right: 'clamp(16px, 4vw, 56px)',
        left: 'clamp(16px, 4vw, 56px)',
        zIndex: 2,
        textAlign: 'right',
      }}>
        <p className="closing-sig" style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(16px, 2.2vw, 28px)',
          fontWeight: 600, fontStyle: 'italic',
          color: '#ffffff', margin: 0,
          letterSpacing: '0.01em',
          textShadow: '0 2px 12px rgba(0,0,0,0.35)',
        }}>
          With Love By Jacqueline.
        </p>
      </div>

      <style>{`
        /* ══ DESKTOP: full-screen cover ══ */
        .closing-section {
          min-height: 100vh;
          min-height: 100svh;
        }

        /* ══════════════════════════════════════════════
           TABLET / MOBILE ≤ 1024px
           Aspect-ratio container: section height derives
           from 4:5 (portrait-ish) ratio — hugs the image,
           no blank space, cover shows face + action area.
        ══════════════════════════════════════════════ */
        /* Tablets (641–1024px): full-screen cover, original look */
        @media (min-width: 641px) and (max-width: 1024px) {
          .closing-section {
            background-position: center top !important;
          }
        }

        /* Mobile ≤ 640px: aspect-ratio container, no blank space */
        @media (max-width: 640px) {
          .closing-section {
            min-height: 0 !important;
            aspect-ratio: 3 / 4;
            background-position: center top !important;
          }
          .closing-sig {
            font-size: 14px !important;
          }
        }

        /* Landscape phones */
        @media (max-height: 500px) and (orientation: landscape) {
          .closing-section {
            min-height: 100svh !important;
            aspect-ratio: unset;
            background-position: center center !important;
          }
          .closing-sig {
            font-size: clamp(14px, 2.2vw, 20px) !important;
          }
        }
      `}</style>
    </section>
  );
}

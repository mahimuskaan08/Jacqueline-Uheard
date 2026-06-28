'use client';

import { useState } from 'react';
import Image from 'next/image';

const collectionLinks = [
  { label: 'Shop All Candles', href: '/collections' },
  { label: 'Our Story',        href: '/#story' },
  { label: 'Journal',          href: '/#journal' },
  { label: 'FAQs',             href: '/#faq' },
];

const aboutLinks = [
  { label: 'Home',       href: '/' },
  { label: 'Contact',    href: '/#contact' },
  { label: 'Privacy Policy',     href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/enchantingcandles1?igsh=dnlkN3NqdzJnMGM4',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer style={{ backgroundColor: '#ffffff', borderTop: '1px solid #eaeaea' }}>

      {/* ── Main grid ── */}
      <div style={{
        maxWidth: '1300px', margin: '0 auto',
        padding: 'clamp(56px, 7vw, 96px) clamp(16px, 4vw, 56px) clamp(40px, 5vw, 64px)',
      }}>
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.8fr 1fr 1fr 1.6fr',
            gap: 'clamp(32px, 5vw, 72px)',
            alignItems: 'start',
          }}
        >

          {/* ── LEFT: Brand ── */}
          <div>
            {/* Logo */}
            <a href="/" style={{ display: 'inline-block', marginBottom: '20px' }}>
              <Image
                src="/logo.png"
                alt="U-Heard"
                width={130}
                height={42}
                style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
              />
            </a>

            {/* Tagline */}
            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '13px', fontWeight: 400,
              color: '#6b6b6b', lineHeight: 1.8,
              maxWidth: '280px', margin: '0 0 28px',
            }}>
              A curated collection of handcrafted candles designed to bring calm, warmth, and story into every space.
            </p>

            {/* Socials */}
            <div className="footer-socials" style={{ display: 'flex', gap: '18px' }}>
              {socialLinks.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#0a0a0a',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease, opacity 0.2s ease',
                    display: 'flex', alignItems: 'center',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#d11a2a'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#0a0a0a'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── COLLECTION links ── */}
          <div>
            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#0a0a0a', margin: '0 0 20px',
            }}>
              Explore
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {collectionLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '13px', fontWeight: 400,
                      color: '#6b6b6b', textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#0a0a0a'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#6b6b6b'; }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── ABOUT links ── */}
          <div>
            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#0a0a0a', margin: '0 0 20px',
            }}>
              Quick Links
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {aboutLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '13px', fontWeight: 400,
                      color: '#6b6b6b', textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#0a0a0a'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#6b6b6b'; }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── RIGHT: Newsletter ── */}
          <div>
            <p style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(16px, 1.6vw, 20px)',
              fontWeight: 600, fontStyle: 'italic',
              color: '#0a0a0a', margin: '0 0 8px',
            }}>
              Stay in touch
            </p>
            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '12px', fontWeight: 400,
              color: '#6b6b6b', lineHeight: 1.7,
              margin: '0 0 22px',
            }}>
              Receive early access to new scents and exclusive offers.
            </p>

            {subscribed ? (
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '13px', fontWeight: 500,
                color: '#0a0a0a', letterSpacing: '0.02em',
              }}>
                Thank you for subscribing.
              </p>
            ) : (
              <form onSubmit={handleSubscribe}>
                {/* Underline-style input */}
                <div style={{ marginBottom: '12px' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid #d0d0d0',
                      outline: 'none',
                      padding: '10px 0',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '13px', fontWeight: 400,
                      color: '#0a0a0a',
                      letterSpacing: '0.02em',
                      transition: 'border-color 0.2s ease',
                    }}
                    onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderBottomColor = '#0a0a0a'; }}
                    onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderBottomColor = '#d0d0d0'; }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '11px', fontWeight: 700,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: '#ffffff',
                    background: '#0a0a0a',
                    border: 'none',
                    padding: '12px 28px',
                    cursor: 'pointer',
                    transition: 'background 0.25s ease',
                    borderRadius: '2px',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#d11a2a'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#0a0a0a'; }}
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: '1px solid #eaeaea' }}>
        <div className="footer-bottom" style={{
          maxWidth: '1300px', margin: '0 auto',
          padding: '20px clamp(16px, 4vw, 56px)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '11px', fontWeight: 400,
            color: '#aaaaaa', margin: 0, letterSpacing: '0.04em',
          }}>
            © 2026 U-HEARD. All rights reserved.
          </p>

          <div className="footer-bottom-links" style={{ display: 'flex', gap: '24px' }}>
            {[{ label: 'Privacy Policy', href: '/privacy' }, { label: 'Terms & Conditions', href: '/terms' }, { label: 'Contact', href: '/#contact' }].map(item => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '11px', fontWeight: 400,
                  color: '#aaaaaa', textDecoration: 'none',
                  letterSpacing: '0.04em',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#0a0a0a'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#aaaaaa'; }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .footer-grid ul {
            align-items: center;
          }
          .footer-socials {
            justify-content: center;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }
          .footer-bottom-links {
            flex-wrap: wrap;
            justify-content: center;
            gap: 16px !important;
          }
          .footer-subscribe form {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </footer>
  );
}

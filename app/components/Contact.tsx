'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        padding: 'clamp(56px, 7vw, 88px) 0 clamp(64px, 8vw, 100px)',
      }}
    >

      {/* ── Content wrapper ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '1260px', margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 52px)',
      }}>


        {/* ── Section header (mobile: center, desktop: left) ── */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 'clamp(40px, 6vw, 72px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{ width: '48px', height: '1px', background: '#C62828', opacity: 0.7 }} />
            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: '#C62828', margin: 0,
            }}>
              Find Us
            </p>
          </div>

          <h2 style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(30px, 7vw, 88px)',
            fontWeight: 700, color: '#0f0f0f',
            lineHeight: 1.0, margin: '0 0 16px',
            letterSpacing: '-0.01em',
          }}>
            Location
          </h2>

          {/* Red accent line */}
          <div style={{
            width: 'clamp(56px, 6vw, 80px)',
            height: '3px', borderRadius: '2px',
            background: '#C62828',
          }} />
        </motion.div>

        {/* ── Two-column layout: Map left | Details right ── */}
        <div
          className="contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 400px',
            gap: 'clamp(32px, 5vw, 72px)',
            alignItems: 'start',
          }}
        >

          {/* ── MAP CARD ── */}
          <motion.div
            {...fadeUp(0.12)}
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 8px 40px rgba(0,0,0,0.08), 0 2px 12px rgba(0,0,0,0.05)',
              border: '1px solid rgba(0,0,0,0.07)',
              aspectRatio: '4/3',
              background: '#f0eeeb',
            }}
          >
            <iframe
              title="U-Heard Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.265258!2d-74.2182!3d40.7676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3ae97b6b5c4f3%3A0x0!2s475+William+St%2C+East+Orange%2C+NJ+07017!5e0!3m2!1sen!2sus!4v1713700000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{
                border: 'none',
                display: 'block',
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

          </motion.div>

          {/* ── RIGHT: Contact details ── */}
          <motion.div
            {...fadeUp(0.22)}
            style={{
              display: 'flex', flexDirection: 'column',
              gap: '0', paddingTop: '4px',
            }}
          >
            {/* CONTACT INFORMATION label */}
            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.24em', textTransform: 'uppercase',
              color: '#C62828', margin: '0 0 10px',
            }}>
              Contact Information
            </p>

            <p style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(22px, 2.8vw, 30px)',
              fontWeight: 600, fontStyle: 'italic',
              color: '#0f0f0f', lineHeight: 1.2,
              margin: '0 0 36px',
            }}>
              Say something to start a chat!
            </p>

            {/* Divider */}
            <div style={{ width: '100%', height: '1px', background: 'rgba(0,0,0,0.07)', marginBottom: '32px' }} />

            {/* Phone */}
            <ContactRow
              label="Phone"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C62828" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
                </svg>
              }
              value="+1-862-224-8659"
              href="tel:+18622248659"
            />

            <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '20px 0' }} />

            {/* Email */}
            <ContactRow
              label="Email"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C62828" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              }
              value="uheard4life@gmail.com"
              href="mailto:uheard4life@gmail.com"
            />

            <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '20px 0' }} />

            {/* Address */}
            <ContactRow
              label="Address"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C62828" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              }
              value={"Building 475, William Street, Apt 404,\nEast Orange, New Jersey, 07017"}
              multiline
            />

            <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '20px 0 32px' }} />

            {/* GET DIRECTIONS button */}
            <a
              href="https://maps.google.com/?q=475+William+St,+East+Orange,+NJ+07017"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                alignSelf: 'flex-start',
                padding: '14px 30px',
                background: '#C62828',
                color: '#ffffff',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '11px', fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '100px',
                boxShadow: '0 4px 20px rgba(198,40,40,0.28)',
                transition: 'background 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = '#a81f1f';
                el.style.boxShadow = '0 8px 28px rgba(198,40,40,0.38)';
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = '#C62828';
                el.style.boxShadow = '0 4px 20px rgba(198,40,40,0.28)';
                el.style.transform = 'translateY(0)';
              }}
            >
              Get Directions
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 860px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .contact-grid > *:nth-child(1) {
            aspect-ratio: 16/9 !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ── ContactRow sub-component ── */
function ContactRow({
  label,
  icon,
  value,
  href,
  multiline,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  href?: string;
  multiline?: boolean;
}) {
  const content = (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
      {/* Icon circle */}
      <div style={{
        width: '38px', height: '38px', borderRadius: '50%',
        background: 'rgba(198,40,40,0.07)',
        border: '1px solid rgba(198,40,40,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, marginTop: '2px',
      }}>
        {icon}
      </div>

      <div>
        <p style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '10px', fontWeight: 700,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: '#999999', margin: '0 0 5px',
        }}>
          {label}
        </p>
        <p style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '14px', fontWeight: 500,
          color: '#0f0f0f', lineHeight: 1.65,
          margin: 0,
          whiteSpace: multiline ? 'pre-line' : 'normal',
          wordBreak: 'break-word',
        }}>
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        style={{ textDecoration: 'none', display: 'block', transition: 'opacity 0.2s ease' }}
        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.72'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
      >
        {content}
      </a>
    );
  }

  return <div>{content}</div>;
}

import React, { useState } from 'react'
import { socials } from '../data'
import { useInView } from '../hooks/useInView'

export default function Contact({ dark }) {
  const [ref, inView] = useInView(0.2)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = new FormData(e.target)
    const res = await fetch('https://formspree.io/f/mnjbdvlr', { method: 'POST', body: data, headers: { Accept: 'application/json' } })
    setLoading(false)
    if (res.ok) { setSent(true); e.target.reset() }
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: 10, fontSize: 14,
    fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s',
    background: dark ? 'rgba(16,170,248,0.06)' : 'rgba(16,170,248,0.05)',
    border: '1px solid var(--border)',
    color: dark ? 'var(--text-dark)' : 'var(--text)',
  }

  return (
    <section id="contact" className="snap-section" style={{ background: dark ? 'var(--bg2-dark)' : 'var(--bg2)' }}>
      <div className="blob" style={{ width: 350, height: 350, background: dark ? 'rgba(16,170,248,0.07)' : 'rgba(16,170,248,0.09)', top: '-60px', left: '-60px' }} />

      <div ref={ref} style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: 48, textAlign: 'center' }}>
          <p style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 600, marginBottom: 10 }}>— Get In Touch —</p>
          <h2 className="section-title" style={{ background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: inView ? 'fadeUp 0.7s ease both' : 'none' }}>
            Contact Me
          </h2>
          <div style={{ width: 48, height: 3, background: 'var(--grad)', margin: '16px auto 0', borderRadius: 99 }} />
        </div>

        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 36,
          alignItems: 'start',
        }}>
          {/* Info */}
          <div style={{ animation: inView ? 'slideInLeft 0.7s ease both' : 'none' }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: 900, marginBottom: 14, color: dark ? 'var(--text-dark)' : 'var(--text)' }}>
              Let's Talk 👋
            </h3>
            <p className="text-muted" style={{ fontSize: 14, lineHeight: 1.85, marginBottom: 28 }}>
              Feel free to reach out for collaborations or just a friendly hello. I'm always open to discussing new projects and opportunities.
            </p>
            {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, textDecoration: 'none', transition: 'color 0.2s', color: 'var(--text2)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text2)'}>
                <div className="surface" style={{ width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: 15, flexShrink: 0 }}>
                  <i className={s.icon} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, wordBreak: 'break-all' }}>{s.label}</span>
              </a>
            ))}
          </div>

         
          <div className="surface" style={{ borderRadius: 20, padding: 'clamp(20px, 4vw, 32px)', animation: inView ? 'slideInRight 0.7s ease both' : 'none' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: 48, marginBottom: 14 }}>✉️</div>
                <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Message sent!</p>
                <p className="text-muted" style={{ fontSize: 14 }}>I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input type="text" name="name" placeholder="Your Name" required style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                <input type="email" name="email" placeholder="Your Email" required style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                <textarea name="message" placeholder="Your Message" required rows={5}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                <button type="submit" disabled={loading} className="btn-shimmer"
                  style={{ padding: '13px', borderRadius: 10, fontWeight: 700, fontSize: 14, color: 'white', border: 'none', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s, transform 0.2s' }}
                  onMouseEnter={e => { if (!loading) e.target.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => e.target.style.transform = 'translateY(0)'}>
                  {loading ? 'Sending...' : <><i className="fas fa-paper-plane" /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

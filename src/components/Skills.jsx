import React from 'react'
import { skills } from '../data'
import { useInView } from '../hooks/useInView'

export default function Skills({ dark }) {
  const [ref, inView] = useInView(0.2)

  return (
    <section id="skills" className="snap-section" style={{ background: dark ? 'var(--bg-dark)' : 'var(--bg)' }}>
      <div className="blob" style={{ width: 400, height: 400, background: dark ? 'rgba(16,170,248,0.05)' : 'rgba(16,170,248,0.07)', bottom: '-80px', right: '-80px' }} />

      <div ref={ref} style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: 52, textAlign: 'center' }}>
          <p style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 600, marginBottom: 10 }}>— Expertise —</p>
          <h2 className="section-title" style={{ background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: inView ? 'fadeUp 0.7s ease both' : 'none' }}>
            My Skills
          </h2>
          <div style={{ width: 48, height: 3, background: 'var(--grad)', margin: '16px auto 0', borderRadius: 99 }} />
        </div>

        <div className={`stagger ${inView ? 'visible' : ''}`}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(14px, 3vw, 24px)', justifyContent: 'center' }}>
          {skills.map((s, i) => (
            <div key={i} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
              width: 'clamp(100px, 20vw, 130px)', height: 'clamp(100px, 20vw, 130px)',
              borderRadius: '50%',
              background: dark ? 'var(--surface-dark)' : 'var(--surface)',
              border: '1.5px solid var(--border)',
              cursor: 'default',
              transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(16,170,248,0.18)'; e.currentTarget.style.transform = 'translateY(-6px) scale(1.05)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0) scale(1)' }}
            >
              <i className={s.icon} style={{ fontSize: 'clamp(24px, 5vw, 34px)', color: 'var(--primary)' }} />
              <span style={{ fontSize: 'clamp(11px, 2vw, 13px)', fontWeight: 700, color: dark ? 'var(--text-dark)' : 'var(--text)', textAlign: 'center' }}>{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

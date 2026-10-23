import React from 'react'
import { projects } from '../data'
import { useInView } from '../hooks/useInView'

export default function Projects({ dark }) {
  const [ref, inView] = useInView(0.15)

  return (
    <section id="projects" className="snap-section" style={{ background: dark ? 'var(--bg2-dark)' : 'var(--bg2)' }}>
      <div className="blob" style={{ width: 350, height: 350, background: dark ? 'rgba(16,170,248,0.06)' : 'rgba(16,170,248,0.08)', top: '-60px', left: '30%' }} />

      <div ref={ref} style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: 48, textAlign: 'center' }}>
          <p style={{ fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 600, marginBottom: 10 }}>— Portfolio —</p>
          <h2 className="section-title" style={{ background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: inView ? 'fadeUp 0.7s ease both' : 'none' }}>
            Featured Projects
          </h2>
          <div style={{ width: 48, height: 3, background: 'var(--grad)', margin: '16px auto 0', borderRadius: 99 }} />
        </div>

        <div
          className={`stagger ${inView ? 'visible' : ''}`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: 18,
          }}
        >
          {projects.map((p, i) => (
            <div key={i} className="card-lift surface"
              style={{ borderRadius: 18, padding: 24, display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--grad)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}> 
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 900, color: dark ? 'rgba(16,170,248,0.08)' : 'rgba(16,170,248,0.1)', lineHeight: 1 }}>0{i + 1}</span>
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: dark ? 'var(--text-dark)' : 'var(--text)' }}>{p.title}</h3>
              <p className="text-muted" style={{ fontSize: 13, lineHeight: 1.7, flex: 1 }}>{p.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {p.tags.map(tag => (
                  <span key={tag} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, fontWeight: 600, background: dark ? 'rgba(16,170,248,0.12)' : 'rgba(16,170,248,0.10)', color: 'var(--primary)', border: '1px solid var(--border)' }}>{tag}</span>
                ))}
              </div>
              <a href={p.link} target="_blank" rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--primary)', fontSize: 13, fontWeight: 600, textDecoration: 'none', transition: 'gap 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.gap = '12px'}
                onMouseLeave={e => e.currentTarget.style.gap = '8px'}>
                <i className="fab fa-github" /> View on GitHub
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

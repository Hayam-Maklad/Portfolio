import React, { useState, useEffect } from 'react'

const links = [
  { label: 'Home',     id: 'home' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills',   id: 'skills' },
  { label: 'Contact',  id: 'contact' },
]

export default function Navbar({ dark, onToggle, activeSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 6%',
        transition: 'all 0.3s',
        background: scrolled
          ? dark ? 'rgba(2,21,37,0.95)' : 'rgba(240,249,255,0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}>

       
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 22, fontWeight: 900,
          cursor: 'default', userSelect: 'none', flexShrink: 0,
          background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Hayam.
        </span>

        
        <ul style={{ listStyle: 'none', gap: 4, display: 'none' }} id="nav-desktop-links">
          {links.map(l => (
            <li key={l.id}>
              <button onClick={() => scrollTo(l.id)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500,
                color: activeSection === l.id ? 'var(--primary)' : 'var(--text2)',
                fontFamily: 'inherit', transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.target.style.color = 'var(--primary)'}
                onMouseLeave={e => e.target.style.color = activeSection === l.id ? 'var(--primary)' : 'var(--text2)'}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>

          
          <div style={{ gap: 5, alignItems: 'center', display: 'none' }} id="nav-dots">
            {links.map(l => (
              <div key={l.id}
                className={`nav-dot ${activeSection === l.id ? 'active' : ''}`}
                onClick={() => scrollTo(l.id)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>

          
          <button onClick={onToggle} style={{
            width: 38, height: 38, borderRadius: '50%', fontSize: 16,
            background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
            border: '1px solid var(--border)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, transition: 'all 0.2s',
          }}>
            {dark ? '☀️' : '🌙'}
          </button>

         
          <button
            id="nav-hamburger"
            onClick={() => setMenuOpen(v => !v)}
            style={{
              background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
              border: '1px solid var(--border)',
              borderRadius: 8, cursor: 'pointer',
              width: 38, height: 38,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 5, flexShrink: 0, padding: 0,
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 18, height: 2, borderRadius: 2,
                background: dark ? 'white' : 'var(--text)',
                transition: 'transform 0.3s, opacity 0.3s',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                  : i === 1 ? 'scaleX(0)'
                  : 'rotate(-45deg) translate(5px, -5px)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

     
      <div style={{
        position: 'fixed', top: 66, left: 0, right: 0, zIndex: 49,
        background: dark ? 'var(--bg2-dark)' : 'var(--bg2)',
        borderBottom: '1px solid var(--border)',
        padding: menuOpen ? '12px 6%' : '0 6%',
        maxHeight: menuOpen ? '300px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease, padding 0.3s ease',
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        {links.map(l => (
          <button key={l.id} onClick={() => scrollTo(l.id)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '12px 8px', borderRadius: 8, textAlign: 'left',
            fontSize: 15, fontWeight: 600, fontFamily: 'inherit',
            color: activeSection === l.id ? 'var(--primary)' : dark ? 'var(--text-dark)' : 'var(--text)',
            borderBottom: '1px solid var(--border)',
          }}>
            {l.label}
          </button>
        ))}
      </div>
      <style>{`
        @media (min-width: 1024px) {
          #nav-desktop-links { display: flex !important; }
          #nav-dots           { display: flex !important; }
          #nav-hamburger      { display: none  !important; }
        }
      `}</style>
    </>
  )
}

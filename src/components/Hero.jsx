import React, { useEffect, useRef } from 'react'
import { useTyping } from '../hooks/useTyping'

const ROLES = ['Frontend Developer', 'React Enthusiast', 'UI Craftsperson', 'Web Creator']

function Particles({ dark }) {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height
        this.r = Math.random() * 2 + 0.5; this.vx = (Math.random() - 0.5) * 0.4; this.vy = (Math.random() - 0.5) * 0.4
        this.alpha = Math.random() * 0.4 + 0.1
      }
      update() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset() }
      draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(16,170,248,${this.alpha})`; ctx.fill() }
    }
    const particles = Array.from({ length: 60 }, () => new Particle())
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(q => {
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < 100) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(16,170,248,${0.08 * (1 - d / 100)})`; ctx.lineWidth = 0.5; ctx.stroke() }
        })
        p.update(); p.draw()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [dark])
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />
}

export default function Hero({ dark }) {
  const typed = useTyping(ROLES, 90, 2000)

  return (
    <section id="home" className="snap-section" style={{ background: dark ? 'var(--bg-dark)' : 'var(--bg)', justifyContent: 'flex-start', paddingTop: 100 }}>
      <Particles dark={dark} />
      <div className="blob" style={{ width: 400, height: 400, background: 'rgba(16,170,248,0.08)', top: '-80px', right: '-80px' }} />
      <div className="blob" style={{ width: 300, height: 300, background: 'rgba(103,204,251,0.07)', bottom: '-60px', left: '-60px' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', width: '100%' }}>

        
        <div id="hero-layout" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>

          
          <div id="hero-text" style={{ width: '100%', textAlign: 'center' }}>

            <div className="animate-fade-up" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px',
              borderRadius: 99, marginBottom: 24, fontSize: 12, fontWeight: 600,
              letterSpacing: '1px', textTransform: 'uppercase',
              background: dark ? 'rgba(16,170,248,0.12)' : 'rgba(16,170,248,0.10)',
              border: '1px solid var(--border)', color: 'var(--primary)',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--primary)', animation: 'pulse-ring 1.5s ease-in-out infinite', display: 'inline-block' }} />
              Available for work
            </div>

            <h1 className="animate-fade-up delay-100" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(36px, 8vw, 64px)',
              fontWeight: 900, lineHeight: 1.1, marginBottom: 16,
              color: dark ? 'var(--text-dark)' : 'var(--text)',
            }}>
              Hello, I'm{' '}
              <span style={{ background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontStyle: 'italic' }}>
                Hayam
              </span>{' '}
            </h1>

            <div className="animate-fade-up delay-200" style={{
              fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: 600,
              marginBottom: 20, minHeight: 28, color: 'var(--primary)',
            }}>
              <span className="cursor">{typed}</span>
            </div>

            <p className="animate-fade-up delay-300 text-muted" style={{
              fontSize: 'clamp(14px, 2.5vw, 15px)', lineHeight: 1.9,
              maxWidth: 520, marginBottom: 36, marginLeft: 'auto', marginRight: 'auto',
            }}>
              I specialize in building responsive and interactive web applications
              using HTML, CSS, JavaScript, and React. My passion is transforming
              ideas into beautiful and functional websites.
            </p>

            
            <div className="animate-fade-up delay-400" id="hero-btns" style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 44 }}>
              <button
                className="btn-shimmer"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ padding: '15px 28px', borderRadius: 99, fontWeight: 700, fontSize: 15, color: 'white', border: 'none', cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}
              >
                View My Work
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ padding: '15px 28px', borderRadius: 99, fontWeight: 600, fontSize: 15, background: 'transparent', border: '2px solid var(--primary)', color: 'var(--primary)', cursor: 'pointer', fontFamily: 'inherit', width: '100%', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(16,170,248,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                Contact Me
              </button>
            </div>

            
            <div className="animate-fade-up delay-500" style={{ display: 'flex', gap: 'clamp(20px, 6vw, 48px)', justifyContent: 'center' }}>
              {[['4+', 'Projects'], ['6', 'Technologies'], ['1+', 'Years Exp']].map(([n, l]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 900, lineHeight: 1, background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{n}</p>
                  <p className="text-muted" style={{ fontSize: 11, marginTop: 4 }}>{l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-scale-in delay-200" style={{ position: 'relative', flexShrink: 0 }}>
            <div className="animate-spin-slow" style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: '1.5px dashed rgba(16,170,248,0.3)' }} />
            <div className="animate-float animate-pulse-ring" style={{
              width: 'clamp(220px, 60vw, 300px)', height: 'clamp(220px, 60vw, 300px)',
              borderRadius: '50%', background: 'var(--grad)', padding: 3,
            }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: dark ? 'var(--surface-dark)' : 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img src="/images/portflio.jpeg" alt="Hayam" style={{width:'100%',height:'100%',objectFit:'cover'}} />
                
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: -3, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 7, padding: '7px 14px', borderRadius: 99, fontSize: 12, fontWeight: 500, background: dark ? 'var(--surface-dark)' : 'var(--surface)', border: '1px solid var(--border)' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', animation: 'pulse-ring 1.5s ease-in-out infinite', display: 'inline-block' }} />
              Available for work
            </div>
          </div>
        </div>
      </div>


      <style>{`
        @media (min-width: 768px) {
          #hero-layout    { flex-direction: row !important; align-items: center !important; justify-content: space-between !important; }
          #hero-text      { text-align: left !important; }
          #hero-text p    { margin-left: 0 !important; margin-right: 0 !important; }
          #hero-btns      { flex-direction: row !important; }
          #hero-btns button { width: auto !important; }
        }
      `}</style>
    </section>
  )
}

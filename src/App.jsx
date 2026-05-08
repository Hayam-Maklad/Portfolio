import React, { useState, useEffect } from 'react'
import Navbar   from './components/Navbar'
import Hero     from './components/Hero'
import Projects from './components/Projects'
import Skills   from './components/Skills'
import Contact  from './components/Contact'
import Footer   from './components/Footer'

const SECTIONS = ['home', 'projects', 'skills', 'contact']

export default function App() {
  const [dark, setDark] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  
  useEffect(() => {
    const observers = []

    SECTIONS.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.5 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar
        dark={dark}
        onToggle={() => setDark(d => !d)}
        activeSection={activeSection}
      />
      <Hero     dark={dark} />
      <Projects dark={dark} />
      <Skills   dark={dark} />
      <Contact  dark={dark} />
      <Footer   dark={dark} />
    </div>
  )
}

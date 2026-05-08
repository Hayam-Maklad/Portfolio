import React from 'react'

export default function Footer({ dark }) {
  return (
    <footer style={{
      textAlign: 'center', padding: '24px 8%',
      background: dark ? 'var(--bg-dark)' : 'var(--bg)',
      borderTop: '1px solid var(--border)',
      fontSize: 13, color: 'var(--text2)',
    }}>
      <p>
        © 2026{' '}
        <span className="grad-text" style={{ fontWeight: 700 }}>Hayam Mostafa</span>
        {' '}· All Rights Reserved ·
      </p>
    </footer>
  )
}

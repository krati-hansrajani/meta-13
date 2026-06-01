import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from '../../context/ThemeContext'

const PHASES = [
  { label: 'Breathe In',  ms: 4000 },
  { label: 'Hold',        ms: 4000 },
  { label: 'Breathe Out', ms: 4000 },
]

export default function BreathingModal({ onClose }) {
  const [phaseIdx, setPhaseIdx] = useState(0)
  const { isDark } = useTheme()

  useEffect(() => {
    const id = setInterval(() => {
      setPhaseIdx(i => (i + 1) % PHASES.length)
    }, 4000)
    return () => clearInterval(id)
  }, [])

  return createPortal(
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: isDark ? 'rgba(0,0,0,0.85)' : 'rgba(10,10,30,0.72)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: 'var(--color-card)',
          borderRadius: 28,
          padding: '40px 36px 32px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 18, width: '100%', maxWidth: 400,
          boxShadow: 'var(--shadow-card)',
          margin: '0 16px',
          border: isDark ? '1px solid var(--color-border)' : 'none',
        }}
      >
        {/* Meditation illustration */}
        <div style={{ fontSize: 54, lineHeight: 1, userSelect: 'none' }}>🧘‍♀️</div>

        {/* Title + supportive text */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--color-primary)', margin: '0 0 6px' }}>
            Grounding Exercise
          </h2>
          <p style={{ fontSize: 13, color: 'var(--color-secondary)', lineHeight: 1.6, maxWidth: 270, margin: '0 auto' }}>
            Follow the rhythm and focus on your breath
          </p>
        </div>

        {/* Breathing circle */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 260, height: 260 }}>
          <div
            className="breathe-ring"
            style={{
              position: 'absolute', inset: 0,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139,156,244,0.18) 40%, transparent 72%)',
            }}
          />
          <div
            className="breathe-circle"
            style={{
              width: 200, height: 200,
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #8B9CF4 0%, #C4B5FD 55%, #ddd6fe 100%)',
              boxShadow: '0 0 0 18px rgba(139,156,244,0.12), 0 0 60px rgba(139,156,244,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <span
              key={phaseIdx}
              className="breathe-label"
              style={{
                color: '#fff', fontWeight: 700, fontSize: 15,
                letterSpacing: 0.2, textAlign: 'center',
                textShadow: '0 1px 4px rgba(0,0,0,0.18)',
              }}
            >
              {PHASES[phaseIdx].label}
            </span>
          </div>
        </div>

        {/* End Session */}
        <button
          type="button"
          onClick={onClose}
          style={{
            marginTop: 4,
            padding: '13px 40px',
            borderRadius: 14,
            background: 'var(--color-primary)',
            color: isDark ? '#0F0F1A' : '#ffffff',
            fontWeight: 600,
            fontSize: 14,
            border: 'none', cursor: 'pointer',
            transition: 'opacity 0.15s',
          }}
          onMouseOver={e => { e.currentTarget.style.opacity = '0.82' }}
          onMouseOut={e => { e.currentTarget.style.opacity = '1' }}
        >
          End Session
        </button>
      </div>
    </div>,
    document.body,
  )
}

import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

const STORAGE_KEY = 'meta_journal_entries'

function loadEntries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

function getWeeklyData() {
  const entries = loadEntries()
  const today = new Date()
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (6 - i))
    const label = d.toLocaleDateString('en-US', { weekday: 'short' })
    const dateStr = d.toDateString()
    const dayEntries = entries.filter(e => new Date(e.createdAt).toDateString() === dateStr && e.feelingScore != null)
    const avg = dayEntries.length ? dayEntries.reduce((s, e) => s + e.feelingScore, 0) / dayEntries.length : null
    return { label, avg }
  })
}

function getMonthlyData() {
  const entries = loadEntries()
  const today = new Date()
  return Array.from({ length: 4 }, (_, i) => {
    const weekEnd = new Date(today)
    weekEnd.setDate(today.getDate() - (3 - i) * 7)
    const weekStart = new Date(weekEnd)
    weekStart.setDate(weekEnd.getDate() - 6)
    const label = `Wk ${i + 1}`
    const weekEntries = entries.filter(e => {
      const d = new Date(e.createdAt)
      return d >= weekStart && d <= weekEnd && e.feelingScore != null
    })
    const avg = weekEntries.length ? weekEntries.reduce((s, e) => s + e.feelingScore, 0) / weekEntries.length : null
    return { label, avg }
  })
}

function barColor(avg) {
  if (avg == null) return null
  if (avg <= 3) return '#F87171'
  if (avg <= 6) return '#FBBF24'
  return '#34D399'
}

// Chart layout constants
const X_START = 45
const X_END   = 505
const Y_TOP   = 15
const Y_BTM   = 140

export default function WellnessScore() {
  const [mode, setMode] = useState('weekly')
  const { isDark }      = useTheme()

  const data = mode === 'weekly' ? getWeeklyData() : getMonthlyData()
  const n    = data.length

  const gridColor = isDark ? '#2A2A42' : '#E5E7EB'
  const axisColor = isDark ? '#56547A' : '#9CA3AF'

  const colWidth = (X_END - X_START) / n
  const barWidth = Math.max(18, Math.floor(colWidth * 0.52))
  const chartH   = Y_BTM - Y_TOP

  const validScores = data.filter(d => d.avg != null).map(d => d.avg)
  const avgScore    = validScores.length
    ? validScores.reduce((s, v) => s + v, 0) / validScores.length
    : null

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card flex flex-col">

      <div className="flex items-center justify-between mb-0.5">
        <h2 className="text-base font-semibold text-primary">Wellness Score</h2>
        <div className="flex gap-0.5 p-0.5 rounded-lg border border-border" style={{ backgroundColor: 'var(--color-page)' }}>
          {['weekly', 'monthly'].map(m => (
            <button key={m} type="button" onClick={() => setMode(m)}
              className="px-3 py-1 rounded-md text-xs font-medium transition-all"
              style={{
                backgroundColor: mode === m ? 'var(--color-card)' : 'transparent',
                color:           mode === m ? 'var(--color-primary)' : 'var(--color-muted)',
                boxShadow:       mode === m ? 'var(--shadow-card)' : 'none',
              }}>
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-secondary mb-3">
        {mode === 'weekly' ? 'Your daily feeling scores this week' : 'Your weekly average feeling scores this month'}
      </p>

      {avgScore != null ? (
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-primary">{avgScore.toFixed(1)}</span>
            <span className="text-sm text-muted">/10</span>
          </div>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              color:           avgScore >= 7 ? '#34D399' : avgScore >= 4 ? '#CA8A04' : '#EF4444',
              backgroundColor: avgScore >= 7 ? 'rgba(52,211,153,0.12)' : avgScore >= 4 ? 'rgba(202,138,4,0.10)' : 'rgba(239,68,68,0.10)',
            }}
          >
            avg {mode === 'weekly' ? 'this week' : 'this month'}
          </span>
        </div>
      ) : (
        <div className="mb-3 h-8 flex items-center">
          <p className="text-xs text-muted">No scores recorded yet — rate your day in Journal.</p>
        </div>
      )}

      <svg viewBox="0 0 520 165" width="100%" aria-hidden="true">
        {/* Y-axis labels */}
        <text x={X_START - 5} y={Y_TOP + 4}    textAnchor="end" fontSize="10" fill={axisColor}>10</text>
        <text x={X_START - 5} y={(Y_TOP + Y_BTM) / 2 + 4} textAnchor="end" fontSize="10" fill={axisColor}>5</text>
        <text x={X_START - 5} y={Y_BTM + 4}    textAnchor="end" fontSize="10" fill={axisColor}>1</text>

        {/* Horizontal grid lines */}
        <line x1={X_START} y1={Y_TOP}                    x2={X_END} y2={Y_TOP}                    stroke={gridColor} strokeWidth="1" strokeDasharray="4 4"/>
        <line x1={X_START} y1={(Y_TOP + Y_BTM) / 2}      x2={X_END} y2={(Y_TOP + Y_BTM) / 2}      stroke={gridColor} strokeWidth="1" strokeDasharray="4 4"/>
        <line x1={X_START} y1={Y_BTM}                    x2={X_END} y2={Y_BTM}                    stroke={gridColor} strokeWidth="1" strokeDasharray="4 4"/>

        {data.map((d, i) => {
          const cx   = X_START + i * colWidth + colWidth / 2
          const fill = barColor(d.avg)
          const barH = d.avg != null ? ((d.avg - 1) / 9) * chartH : 0
          const barY = Y_BTM - barH

          return (
            <g key={i}>
              {d.avg != null ? (
                <>
                  <rect x={cx - barWidth / 2} y={barY} width={barWidth} height={barH} rx="4" fill={fill} opacity="0.85"/>
                  <text x={cx} y={barY - 4} textAnchor="middle" fontSize="9" fill={fill} fontWeight="600">
                    {d.avg.toFixed(1)}
                  </text>
                </>
              ) : (
                <rect x={cx - barWidth / 2} y={Y_BTM - 3} width={barWidth} height="3" rx="2" fill={gridColor}/>
              )}
              <text x={cx} y="158" textAnchor="middle" fontSize="10" fill={axisColor}>{d.label}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

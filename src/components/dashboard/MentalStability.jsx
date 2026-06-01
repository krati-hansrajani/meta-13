import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'

// ── Chart geometry constants ──────────────────────────────────────────────────
const X_START = 75
const X_END   = 500
const Y_TOP   = 25
const Y_BTM   = 145

const r = n => parseFloat(n.toFixed(1))

function buildPaths(values) {
  const n     = values.length
  const xStep = (X_END - X_START) / (n - 1)
  const yRange = Y_BTM - Y_TOP

  const pts = values.map((v, i) => ({
    x: X_START + i * xStep,
    y: Y_BTM - v * yRange,
  }))

  const head = { x: 2 * pts[0].x - pts[1].x,     y: 2 * pts[0].y - pts[1].y }
  const tail = { x: 2 * pts[n-1].x - pts[n-2].x, y: 2 * pts[n-1].y - pts[n-2].y }
  const ext  = [head, ...pts, tail]

  let curves = ''
  for (let i = 0; i < n - 1; i++) {
    const [p0, p1, p2, p3] = [ext[i], ext[i+1], ext[i+2], ext[i+3]]
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    curves += ` C ${r(cp1x)} ${r(cp1y)},${r(cp2x)} ${r(cp2y)},${r(p2.x)} ${r(p2.y)}`
  }

  const line = `M ${r(pts[0].x)} ${r(pts[0].y)}${curves}`
  const area = `M ${r(pts[0].x)} ${Y_BTM} L ${r(pts[0].x)} ${r(pts[0].y)}${curves} L ${r(pts[n-1].x)} ${Y_BTM} Z`

  return { line, area, xPositions: pts.map(p => r(p.x)) }
}

// ── Timeframe data ────────────────────────────────────────────────────────────
const TIMEFRAMES = {
  weekly: {
    label:            'Weekly',
    subtitle:         "Here's your mental stability over this week",
    labels:           ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values:           [0.50, 0.30, 0.85, 0.55, 0.35, 0.75, 0.90],
    insightLabel:     'Weekly Insight',
    insightHighlight: 'improving',
    insightSuffix:    'over the last 3 days. Great job! 🎉',
  },
  monthly: {
    label:            'Monthly',
    subtitle:         "Here's your mental stability over this year",
    labels:           ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values:           [0.35, 0.40, 0.50, 0.45, 0.60, 0.55, 0.70, 0.65, 0.75, 0.80, 0.70, 0.85],
    insightLabel:     'Monthly Insight',
    insightHighlight: 'trending upward',
    insightSuffix:    'over the last quarter. Keep it up! 📈',
  },
  semester: {
    label:            'Semester',
    subtitle:         "Here's your mental stability over this semester",
    labels:           ['Wk1', 'Wk3', 'Wk5', 'Wk7', 'Wk9', 'Wk11', 'Wk13', 'Wk15', 'Wk17'],
    values:           [0.40, 0.35, 0.45, 0.50, 0.48, 0.60, 0.65, 0.72, 0.78],
    insightLabel:     'Semester Insight',
    insightHighlight: 'steadily improving',
    insightSuffix:    "across the semester. You're on the right track! 🌟",
  },
}

// ── Dropdown ──────────────────────────────────────────────────────────────────
function Dropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref             = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 text-xs text-secondary border border-border rounded-lg px-3 py-1.5 hover:bg-page transition-colors"
      >
        {TIMEFRAMES[value].label}
        <svg
          width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg overflow-hidden z-10"
          style={{ boxShadow: 'var(--shadow-dropdown)', minWidth: '96px' }}
        >
          {Object.entries(TIMEFRAMES).map(([key, tf]) => (
            <button
              key={key}
              type="button"
              onClick={() => { onChange(key); setOpen(false) }}
              className={`w-full text-left px-3 py-2 text-xs transition-colors hover:bg-page ${
                value === key ? 'text-primary font-semibold' : 'text-secondary'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function MentalStability() {
  const [timeframe, setTimeframe] = useState('weekly')
  const { isDark }                = useTheme()

  const data                       = TIMEFRAMES[timeframe]
  const { line, area, xPositions } = buildPaths(data.values)

  // Chart colors adapt to dark mode
  const gridColor  = isDark ? '#2A2A42' : '#E5E7EB'
  const axisColor  = isDark ? '#56547A' : '#9CA3AF'
  const areaTop    = isDark ? 'rgba(139,156,244,0.30)' : '#F5C6D8'
  const areaBottom = isDark ? 'rgba(139,156,244,0.02)' : 'rgba(245,198,216,0.05)'

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card flex flex-col h-full">

      <div className="flex items-center justify-between mb-0.5">
        <h2 className="text-base font-semibold text-primary">Mental Stability</h2>
        <Dropdown value={timeframe} onChange={setTimeframe} />
      </div>

      <p className="text-xs text-secondary mb-3">{data.subtitle}</p>

      <svg viewBox="0 0 520 175" width="100%" aria-hidden="true">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={areaTop}    stopOpacity="1" />
            <stop offset="100%" stopColor={areaBottom} stopOpacity="1" />
          </linearGradient>
        </defs>

        <text x="68" y="29"  textAnchor="end" fontSize="10" fill={axisColor}>Stable</text>
        <text x="68" y="89"  textAnchor="end" fontSize="10" fill={axisColor}>Moderate</text>
        <text x="68" y="149" textAnchor="end" fontSize="10" fill={axisColor}>Struggling</text>

        <line x1="75" y1="25"  x2="505" y2="25"  stroke={gridColor} strokeWidth="1" strokeDasharray="4 4" />
        <line x1="75" y1="85"  x2="505" y2="85"  stroke={gridColor} strokeWidth="1" strokeDasharray="4 4" />
        <line x1="75" y1="145" x2="505" y2="145" stroke={gridColor} strokeWidth="1" strokeDasharray="4 4" />

        <path d={area} fill="url(#areaGradient)" />
        <path d={line} fill="none" stroke="#8B9CF4" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round" />

        {data.labels.map((label, i) => (
          <text key={label} x={xPositions[i]} y="170"
                textAnchor="middle" fontSize="10" fill={axisColor}>
            {label}
          </text>
        ))}
      </svg>

      <div className="mt-4 bg-insight rounded-xl px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-start gap-2.5 min-w-0">
          <svg className="mt-0.5 flex-shrink-0 text-[#8B9CF4]" width="15" height="15"
               viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8"  x2="12"    y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-primary">{data.insightLabel}</p>
            <p className="text-xs text-secondary mt-0.5 leading-relaxed">
              Your overall stability is{' '}
              <span className="font-medium text-primary">{data.insightHighlight}</span>{' '}
              {data.insightSuffix}
            </p>
          </div>
        </div>
        <a href="#" className="text-xs text-link font-medium whitespace-nowrap flex-shrink-0">
          View Analytics →
        </a>
      </div>
    </div>
  )
}

import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

// ── Chart ─────────────────────────────────────────────────────────────────────
const X_START = 75, X_END = 500, Y_TOP = 25, Y_BTM = 145
const rnd = n => parseFloat(n.toFixed(1))

function buildPaths(values) {
  const n = values.length
  const xStep = (X_END - X_START) / (n - 1)
  const yRange = Y_BTM - Y_TOP
  const pts = values.map((v, i) => ({ x: X_START + i * xStep, y: Y_BTM - v * yRange }))
  const head = { x: 2 * pts[0].x - pts[1].x, y: 2 * pts[0].y - pts[1].y }
  const tail = { x: 2 * pts[n-1].x - pts[n-2].x, y: 2 * pts[n-1].y - pts[n-2].y }
  const ext = [head, ...pts, tail]
  let curves = ''
  for (let i = 0; i < n - 1; i++) {
    const [p0, p1, p2, p3] = [ext[i], ext[i+1], ext[i+2], ext[i+3]]
    const cp1x = p1.x + (p2.x - p0.x) / 6, cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6, cp2y = p2.y - (p3.y - p1.y) / 6
    curves += ` C ${rnd(cp1x)} ${rnd(cp1y)},${rnd(cp2x)} ${rnd(cp2y)},${rnd(p2.x)} ${rnd(p2.y)}`
  }
  const line = `M ${rnd(pts[0].x)} ${rnd(pts[0].y)}${curves}`
  const area = `M ${rnd(pts[0].x)} ${Y_BTM} L ${rnd(pts[0].x)} ${rnd(pts[0].y)}${curves} L ${rnd(pts[n-1].x)} ${Y_BTM} Z`
  return { line, area, xPositions: pts.map(p => rnd(p.x)) }
}

const TIMEFRAMES = {
  weekly: {
    label: 'Weekly', subtitle: "Here's your mental stability over this week",
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [0.50, 0.30, 0.85, 0.55, 0.35, 0.75, 0.90],
    insightLabel: 'Weekly Insight', insightHighlight: 'improving',
    insightSuffix: 'over the last 3 days. Great job! 🎉',
  },
  monthly: {
    label: 'Monthly', subtitle: "Here's your mental stability over this year",
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [0.35, 0.40, 0.50, 0.45, 0.60, 0.55, 0.70, 0.65, 0.75, 0.80, 0.70, 0.85],
    insightLabel: 'Monthly Insight', insightHighlight: 'trending upward',
    insightSuffix: 'over the last quarter. Keep it up! 📈',
  },
  semester: {
    label: 'Semester', subtitle: "Here's your mental stability over this semester",
    labels: ['Wk1', 'Wk3', 'Wk5', 'Wk7', 'Wk9', 'Wk11', 'Wk13', 'Wk15', 'Wk17'],
    values: [0.40, 0.35, 0.45, 0.50, 0.48, 0.60, 0.65, 0.72, 0.78],
    insightLabel: 'Semester Insight', insightHighlight: 'steadily improving',
    insightSuffix: "across the semester. You're on the right track! 🌟",
  },
}

// ── Filters (from onboarding questions) ──────────────────────────────────────
const FILTER_GROUPS = [
  { key: 'ageRange', label: 'Age Range',  options: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'] },
  { key: 'gender',   label: 'Gender',     options: ['Male', 'Female', 'Non-binary', 'Prefer not to say'] },
  { key: 'concerns', label: 'Concerns',   options: ['Anxiety Support', 'Depression', 'Mind Focus', 'Sleep & Rest', 'Mindfulness', 'Stress Management'] },
  { key: 'helpWith', label: 'Help With',  options: ['Managing stress', 'Improving sleep', 'Building resilience', 'Navigating relationships', 'Boosting motivation'] },
]

// ── Similar people data ───────────────────────────────────────────────────────
const SIMILAR_PEOPLE = [
  { id: 1, name: 'Avery Chen',    initials: 'AC', avatarColor: '#C4B5FD', score: 78, ageRange: '25-34', gender: 'Female',     concerns: ['Anxiety Support', 'Mindfulness'],      helpWith: ['Managing stress', 'Improving sleep'],             tagline: 'Finding peace one breath at a time' },
  { id: 2, name: 'Marcus Reid',   initials: 'MR', avatarColor: '#86EFAC', score: 75, ageRange: '18-24', gender: 'Male',       concerns: ['Depression', 'Mind Focus'],             helpWith: ['Building resilience', 'Boosting motivation'],    tagline: 'Taking it day by day' },
  { id: 3, name: 'Priya Nair',    initials: 'PN', avatarColor: '#FCD34D', score: 82, ageRange: '25-34', gender: 'Female',     concerns: ['Sleep & Rest', 'Stress Management'],    helpWith: ['Improving sleep', 'Managing stress'],             tagline: 'Sleep is self-care' },
  { id: 4, name: 'Jordan Blake',  initials: 'JB', avatarColor: '#93C5FD', score: 70, ageRange: '35-44', gender: 'Non-binary', concerns: ['Mindfulness', 'Anxiety Support'],        helpWith: ['Navigating relationships', 'Managing stress'],    tagline: 'Present moment, present mind' },
  { id: 5, name: 'Sam Liu',       initials: 'SL', avatarColor: '#F9A8D4', score: 77, ageRange: '18-24', gender: 'Male',       concerns: ['Mind Focus', 'Stress Management'],      helpWith: ['Boosting motivation', 'Building resilience'],     tagline: 'Small steps, big progress' },
  { id: 6, name: 'Ella Ortiz',    initials: 'EO', avatarColor: '#6EE7B7', score: 80, ageRange: '25-34', gender: 'Female',     concerns: ['Depression', 'Mindfulness'],             helpWith: ['Building resilience', 'Managing stress'],         tagline: 'Growing through what I go through' },
]

// deterministic match % so it doesn't flicker on re-render
function matchPct(id) { return 70 + (id * 7 % 26) }

// ── Icons ─────────────────────────────────────────────────────────────────────
function ChevronIcon({ open }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

function UserPlusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="8.5" cy="7" r="4"/>
      <line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>
    </svg>
  )
}

// ── Timeframe dropdown ────────────────────────────────────────────────────────
function TimeframeDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    function h(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 text-xs text-secondary border border-border rounded-lg px-3 py-1.5 hover:bg-page transition-colors">
        {TIMEFRAMES[value].label}
        <ChevronIcon open={open}/>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg overflow-hidden z-10"
          style={{ boxShadow: 'var(--shadow-dropdown)', minWidth: '96px' }}>
          {Object.entries(TIMEFRAMES).map(([key, tf]) => (
            <button key={key} type="button" onClick={() => { onChange(key); setOpen(false) }}
              className={`w-full text-left px-3 py-2 text-xs transition-colors hover:bg-page ${value === key ? 'text-primary font-semibold' : 'text-secondary'}`}>
              {tf.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Filter chip dropdown ──────────────────────────────────────────────────────
function FilterChip({ group, selected, onToggle, isOpen, onOpen }) {
  const count = selected.length
  return (
    <div className="relative">
      <button type="button" onClick={onOpen}
        className="flex items-center gap-1.5 text-xs border rounded-lg px-3 py-1.5 transition-colors whitespace-nowrap"
        style={{
          borderColor: count > 0 ? '#8B9CF4' : 'var(--color-border)',
          color: count > 0 ? '#8B9CF4' : 'var(--color-secondary)',
          backgroundColor: count > 0 ? '#EDE9F8' : 'transparent',
        }}>
        {group.label}
        {count > 0 && <span className="font-bold">({count})</span>}
        <ChevronIcon open={isOpen}/>
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full mt-1 bg-card border border-border rounded-xl z-20 p-2 flex flex-col gap-0.5"
          style={{ boxShadow: 'var(--shadow-dropdown)', minWidth: '190px' }}>
          {group.options.map(opt => (
            <button key={opt} type="button" onClick={() => onToggle(opt)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-left hover:bg-page transition-colors">
              <span className="w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0 border"
                style={{
                  borderColor: selected.includes(opt) ? '#8B9CF4' : 'var(--color-border)',
                  backgroundColor: selected.includes(opt) ? '#8B9CF4' : 'transparent',
                }}>
                {selected.includes(opt) && (
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                    <polyline points="1.5 5 4 7.5 8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
              </span>
              <span className="text-xs text-primary">{opt}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Similar person row ────────────────────────────────────────────────────────
function SimilarPersonRow({ person }) {
  const pct = matchPct(person.id)
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-page hover:border-[#8B9CF4] transition-colors">
      <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold text-primary flex-shrink-0"
        style={{ backgroundColor: person.avatarColor }}>
        {person.initials}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold text-primary">{person.name}</p>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: '#EDE9F8', color: '#8B9CF4' }}>
            {pct}% match
          </span>
        </div>
        <p className="text-xs text-muted mt-0.5 italic">"{person.tagline}"</p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {person.concerns.map(c => (
            <span key={c} className="text-[10px] text-secondary bg-card px-2 py-0.5 rounded-full border border-border">{c}</span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="text-right">
          <p className="text-[10px] text-muted uppercase tracking-wide">Stability</p>
          <p className="text-sm font-bold text-primary">{person.score}%</p>
        </div>
        <button type="button"
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-opacity hover:opacity-75"
          style={{ backgroundColor: '#EDE9F8', color: '#8B9CF4' }}>
          <UserPlusIcon/>
          Connect
        </button>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Insights() {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const [timeframe, setTimeframe] = useState('weekly')
  const [filters, setFilters] = useState({ ageRange: [], gender: [], concerns: [], helpWith: [] })
  const [openFilter, setOpenFilter] = useState(null)
  const filterBarRef = useRef(null)

  const data = TIMEFRAMES[timeframe]
  const { line, area, xPositions } = buildPaths(data.values)
  const gridColor  = isDark ? '#2A2A42' : '#E5E7EB'
  const axisColor  = isDark ? '#56547A' : '#9CA3AF'
  const areaTop    = isDark ? 'rgba(139,156,244,0.30)' : '#F5C6D8'
  const areaBottom = isDark ? 'rgba(139,156,244,0.02)' : 'rgba(245,198,216,0.05)'

  useEffect(() => {
    function h(e) { if (filterBarRef.current && !filterBarRef.current.contains(e.target)) setOpenFilter(null) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  function toggleFilter(key, value) {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value],
    }))
  }

  const hasFilters = Object.values(filters).some(a => a.length > 0)

  const filteredPeople = SIMILAR_PEOPLE.filter(p => {
    if (filters.ageRange.length && !filters.ageRange.includes(p.ageRange))                     return false
    if (filters.gender.length   && !filters.gender.includes(p.gender))                         return false
    if (filters.concerns.length && !filters.concerns.some(c => p.concerns.includes(c)))        return false
    if (filters.helpWith.length && !filters.helpWith.some(h => p.helpWith.includes(h)))        return false
    return true
  })

  return (
    <div className="flex flex-col gap-6 pt-2">
      {/* Header */}
      <header className="flex items-center gap-3 py-4">
        <button type="button" onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-page transition-colors text-primary flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-primary">Mental Stability Insights</h1>
          <p className="text-sm text-secondary mt-0.5">Your progress and people on a similar journey</p>
        </div>
      </header>

      {/* Chart */}
      <div className="bg-card rounded-2xl p-6 shadow-card">
        <div className="flex items-center justify-between mb-0.5">
          <h2 className="text-base font-semibold text-primary">Mental Stability</h2>
          <TimeframeDropdown value={timeframe} onChange={setTimeframe}/>
        </div>
        <p className="text-xs text-secondary mb-3">{data.subtitle}</p>

        <svg viewBox="0 0 520 175" width="100%" aria-hidden="true">
          <defs>
            <linearGradient id="insightAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={areaTop}    stopOpacity="1"/>
              <stop offset="100%" stopColor={areaBottom} stopOpacity="1"/>
            </linearGradient>
          </defs>
          <text x="68" y="29"  textAnchor="end" fontSize="10" fill={axisColor}>Stable</text>
          <text x="68" y="89"  textAnchor="end" fontSize="10" fill={axisColor}>Moderate</text>
          <text x="68" y="149" textAnchor="end" fontSize="10" fill={axisColor}>Struggling</text>
          <line x1="75" y1="25"  x2="505" y2="25"  stroke={gridColor} strokeWidth="1" strokeDasharray="4 4"/>
          <line x1="75" y1="85"  x2="505" y2="85"  stroke={gridColor} strokeWidth="1" strokeDasharray="4 4"/>
          <line x1="75" y1="145" x2="505" y2="145" stroke={gridColor} strokeWidth="1" strokeDasharray="4 4"/>
          <path d={area} fill="url(#insightAreaGrad)"/>
          <path d={line} fill="none" stroke="#8B9CF4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          {data.labels.map((label, i) => (
            <text key={label} x={xPositions[i]} y="170" textAnchor="middle" fontSize="10" fill={axisColor}>{label}</text>
          ))}
        </svg>

        <div className="mt-4 bg-insight rounded-xl px-4 py-3 flex items-start gap-2.5">
          <svg className="mt-0.5 flex-shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B9CF4" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <div>
            <p className="text-xs font-semibold text-primary">{data.insightLabel}</p>
            <p className="text-xs text-secondary mt-0.5 leading-relaxed">
              Your overall stability is{' '}
              <span className="font-medium text-primary">{data.insightHighlight}</span>{' '}
              {data.insightSuffix}
            </p>
          </div>
        </div>
      </div>

      {/* Similar People */}
      <div className="bg-card rounded-2xl p-6 shadow-card flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-base font-bold text-primary">People with Similar Scores</h2>
            <p className="text-xs text-secondary mt-0.5">Connect with others at a similar stage of their journey</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap" ref={filterBarRef}>
            {hasFilters && (
              <button type="button"
                onClick={() => setFilters({ ageRange: [], gender: [], concerns: [], helpWith: [] })}
                className="text-xs text-link font-medium hover:opacity-70 transition-opacity">
                Clear all
              </button>
            )}
            {FILTER_GROUPS.map(fg => (
              <FilterChip
                key={fg.key}
                group={fg}
                selected={filters[fg.key]}
                onToggle={v => toggleFilter(fg.key, v)}
                isOpen={openFilter === fg.key}
                onOpen={() => setOpenFilter(openFilter === fg.key ? null : fg.key)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 max-h-[480px] overflow-y-auto pr-0.5">
          {filteredPeople.length === 0 ? (
            <p className="text-sm text-muted text-center py-10">No people match these filters.</p>
          ) : (
            filteredPeople.map(p => <SimilarPersonRow key={p.id} person={p}/>)
          )}
        </div>

        <div className="flex justify-center pt-2 border-t border-border">
          <button type="button" onClick={() => navigate('/community')}
            className="text-sm font-semibold px-6 py-2.5 rounded-xl transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#EDE9F8', color: '#8B9CF4' }}>
            Explore more people →
          </button>
        </div>
      </div>
    </div>
  )
}

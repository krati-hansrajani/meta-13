import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// ── Data ──────────────────────────────────────────────────────────────────────

const ALL_INTERESTS = [
  'Meditation', 'Yoga', 'Journaling', 'Running', 'Mindfulness',
  'Art Therapy', 'Breathing Exercises', 'Reading', 'Cooking', 'Hiking',
  'Photography', 'Music',
]

const ALL_GOALS = [
  'Reduce daily anxiety', 'Build emotional resilience', 'Better sleep quality',
  'Work-life balance', 'Mindfulness practice', 'Manage stress',
  'Social connection', 'Self-improvement',
]

const ALL_ROLES      = ['Mentor', 'Mentee', 'Peer']
const ALL_LOCATIONS  = ['New York', 'Los Angeles', 'Chicago', 'London', 'Toronto', 'Sydney']
const ALL_AGE_RANGES = ['Under 18', '18–24', '25–34', '35–44', '45–54', '55+']

const SUGGESTED_INTERESTS = ['Meditation', 'Yoga', 'Mindfulness', 'Journaling']
const SUGGESTED_LOCATIONS = ['New York', 'London', 'Toronto']
const SUGGESTED_GOALS     = ['Reduce daily anxiety', 'Build emotional resilience', 'Mindfulness practice']

const PEOPLE = [
  { id: 1,  name: 'Avery Chen',    initials: 'AC', avatarColor: '#C4B5FD', mutualConnects: 4,  interests: ['Meditation', 'Yoga', 'Breathing Exercises'],  goal: 'Reduce daily anxiety',       location: 'New York',    ageRange: '25–34', role: 'Mentee' },
  { id: 2,  name: 'Marcus Reid',   initials: 'MR', avatarColor: '#86EFAC', mutualConnects: 2,  interests: ['Journaling', 'Reading', 'Mindfulness'],        goal: 'Build emotional resilience', location: 'Toronto',     ageRange: '18–24', role: 'Peer' },
  { id: 3,  name: 'Ella Ortiz',    initials: 'EO', avatarColor: '#6EE7B7', mutualConnects: 9,  interests: ['Running', 'Mindfulness', 'Art Therapy'],        goal: 'Work-life balance',          location: 'Los Angeles', ageRange: '25–34', role: 'Mentor' },
  { id: 4,  name: 'Jordan Blake',  initials: 'JB', avatarColor: '#FCD34D', mutualConnects: 3,  interests: ['Meditation', 'Reading', 'Cooking'],             goal: 'Better sleep quality',       location: 'Chicago',     ageRange: '35–44', role: 'Mentor' },
  { id: 5,  name: 'Priya Sharma',  initials: 'PS', avatarColor: '#F9A8D4', mutualConnects: 6,  interests: ['Yoga', 'Journaling', 'Hiking'],                 goal: 'Mindfulness practice',       location: 'New York',    ageRange: '18–24', role: 'Mentee' },
  { id: 6,  name: 'Leo Mitchell',  initials: 'LM', avatarColor: '#93C5FD', mutualConnects: 1,  interests: ['Photography', 'Mindfulness'],                   goal: 'Manage stress',              location: 'London',      ageRange: '25–34', role: 'Peer' },
  { id: 7,  name: 'Sara Noel',     initials: 'SN', avatarColor: '#FCA5A5', mutualConnects: 5,  interests: ['Breathing Exercises', 'Art Therapy', 'Music'],  goal: 'Social connection',          location: 'Sydney',      ageRange: '45–54', role: 'Peer' },
  { id: 8,  name: 'Chris Ford',    initials: 'CF', avatarColor: '#FDBA74', mutualConnects: 11, interests: ['Running', 'Cooking', 'Music'],                  goal: 'Self-improvement',           location: 'Los Angeles', ageRange: '25–34', role: 'Mentor' },
  { id: 9,  name: 'Nia Walker',    initials: 'NW', avatarColor: '#A7F3D0', mutualConnects: 7,  interests: ['Meditation', 'Mindfulness', 'Music'],            goal: 'Reduce daily anxiety',       location: 'Toronto',     ageRange: '18–24', role: 'Mentee' },
  { id: 10, name: 'Diego Torres',  initials: 'DT', avatarColor: '#C4B5FD', mutualConnects: 0,  interests: ['Hiking', 'Photography', 'Journaling'],           goal: 'Work-life balance',          location: 'Chicago',     ageRange: '35–44', role: 'Peer' },
  { id: 11, name: 'Mei Lin',       initials: 'ML', avatarColor: '#6EE7B7', mutualConnects: 3,  interests: ['Yoga', 'Reading', 'Cooking'],                   goal: 'Build emotional resilience', location: 'London',      ageRange: '55+',   role: 'Mentor' },
  { id: 12, name: 'Sam Rivera',    initials: 'SR', avatarColor: '#FCD34D', mutualConnects: 8,  interests: ['Art Therapy', 'Mindfulness', 'Running'],         goal: 'Mindfulness practice',       location: 'Sydney',      ageRange: '25–34', role: 'Peer' },
]

const ROLE_STYLE = {
  Mentor: { bg: '#D1FAE5', color: '#10B981' },
  Mentee: { bg: '#EDE9F8', color: '#8B9CF4' },
  Peer:   { bg: '#FEF3C7', color: '#D97706' },
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
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

function ChevronDownIcon({ open }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', flexShrink: 0 }}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

function MiniCheckIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
      <polyline points="2 6.5 5 9.5 10 3" stroke="white" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ── Filter primitives ─────────────────────────────────────────────────────────

function FilterSection({ title, children }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[10px] font-semibold text-muted uppercase tracking-wider">{title}</p>
      {children}
    </div>
  )
}

function ChipBtn({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-xs font-medium rounded-lg px-2.5 py-1.5 transition-colors text-left"
      style={{
        backgroundColor: active ? '#EDE9F8' : 'var(--color-page)',
        color:           active ? '#5B48D9' : 'var(--color-secondary)',
        border:          `1.5px solid ${active ? '#8B9CF4' : 'var(--color-border)'}`,
      }}
    >
      {label}
    </button>
  )
}

function FilterDropdown({ label, options, selected, onToggle, suggested }) {
  const [open,   setOpen]   = useState(false)
  const [search, setSearch] = useState('')
  const ref                 = useRef(null)

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const visible  = options.filter(o => o.toLowerCase().includes(search.toLowerCase()))
  const count    = selected.length
  const hasActive = count > 0

  return (
    <div className="flex flex-col gap-2">
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors"
          style={{
            border:          `1.5px solid ${hasActive ? '#8B9CF4' : 'var(--color-border)'}`,
            backgroundColor: hasActive ? '#EDE9F8' : 'var(--color-page)',
            color:           hasActive ? '#5B48D9' : 'var(--color-secondary)',
          }}
        >
          <span>{hasActive ? `${label} (${count})` : label}</span>
          <ChevronDownIcon open={open} />
        </button>

        {open && (
          <div
            className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl z-30 overflow-hidden"
            style={{ boxShadow: 'var(--shadow-dropdown)' }}
          >
            <div className="px-3 pt-2 pb-1.5 border-b border-border">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search…"
                autoFocus
                className="w-full text-xs outline-none bg-transparent placeholder:text-muted text-primary"
              />
            </div>
            <div className="max-h-44 overflow-y-auto py-1">
              {visible.length === 0 ? (
                <p className="text-xs text-muted px-3 py-2">No results</p>
              ) : visible.map(opt => {
                const on = selected.includes(opt)
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => onToggle(opt)}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-page transition-colors flex items-center gap-2"
                    style={{ color: on ? '#5B48D9' : 'var(--color-primary)' }}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0"
                      style={{
                        border:          `1.5px solid ${on ? '#8B9CF4' : 'var(--color-border)'}`,
                        backgroundColor: on ? '#8B9CF4' : 'transparent',
                      }}
                    >
                      {on && <MiniCheckIcon />}
                    </span>
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Suggested quick-picks */}
      <div className="flex flex-wrap gap-1.5">
        {suggested.map(s => (
          <ChipBtn key={s} label={s} active={selected.includes(s)} onClick={() => onToggle(s)} />
        ))}
      </div>
    </div>
  )
}

// ── Person card ───────────────────────────────────────────────────────────────

function PersonCard({ person }) {
  const rs = ROLE_STYLE[person.role]
  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold text-primary flex-shrink-0"
            style={{ backgroundColor: person.avatarColor }}
          >
            {person.initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-primary leading-snug truncate">{person.name}</p>
            <p className="text-xs text-muted mt-0.5">{person.mutualConnects} Mutual Connects</p>
          </div>
        </div>
        <span
          className="text-[10px] font-semibold px-2 py-1 rounded-full flex-shrink-0"
          style={{ backgroundColor: rs?.bg, color: rs?.color }}
        >
          {person.role}
        </span>
      </div>

      <div>
        <p className="text-xs font-semibold text-link mb-2">Shared Interests</p>
        <div className="flex flex-wrap gap-1.5">
          {person.interests.map(tag => (
            <span key={tag} className="text-xs text-secondary bg-page px-2.5 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-link mb-1">Wellness Goal</p>
        <p className="text-xs text-secondary leading-relaxed">{person.goal}</p>
      </div>

      <p className="text-[10px] text-muted">{person.location} · {person.ageRange}</p>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium mt-auto transition-opacity hover:opacity-80"
        style={{ backgroundColor: '#EDE9F8', color: '#8B9CF4' }}
      >
        <UserPlusIcon />
        Connect
      </button>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PeopleMarketplace() {
  const navigate = useNavigate()

  const [selInterests, setSelInterests] = useState([])
  const [selGoals,     setSelGoals]     = useState([])
  const [selLocations, setSelLocations] = useState([])
  const [selRole,      setSelRole]      = useState('')
  const [selAge,       setSelAge]       = useState('')

  function toggle(setter) {
    return val => setter(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val])
  }
  function clearAll() {
    setSelInterests([]); setSelGoals([]); setSelLocations([]); setSelRole(''); setSelAge('')
  }

  const filtered = PEOPLE.filter(p => {
    if (selInterests.length > 0 && !selInterests.some(i => p.interests.includes(i))) return false
    if (selGoals.length > 0 && !selGoals.includes(p.goal)) return false
    if (selLocations.length > 0 && !selLocations.includes(p.location)) return false
    if (selRole && p.role !== selRole) return false
    if (selAge && p.ageRange !== selAge) return false
    return true
  })

  const hasFilters = selInterests.length > 0 || selGoals.length > 0 || selLocations.length > 0 || selRole || selAge

  return (
    <div className="flex flex-col gap-6 pt-2">

      {/* Header — back button on its own line, heading below */}
      <header className="flex flex-col gap-1 py-6 flex-shrink-0">
        <button
          type="button"
          onClick={() => navigate('/community')}
          className="flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-primary transition-colors self-start"
        >
          <BackIcon />
          Back
        </button>
        <div className="mt-2">
          <h1 className="text-3xl font-bold text-primary leading-tight">Explore People</h1>
          <p className="text-sm text-secondary mt-1">Find like-minded people on similar wellness journeys</p>
        </div>
      </header>

      {/* Body */}
      <div className="flex gap-6 items-start">

        {/* Filter sidebar */}
        <aside
          className="flex-shrink-0 bg-card rounded-2xl shadow-card p-5 flex flex-col gap-5 sticky top-0 overflow-y-auto"
          style={{ width: '230px', maxHeight: 'calc(100vh - 120px)' }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-primary">Filters</h2>
            {hasFilters && (
              <button type="button" onClick={clearAll} className="text-xs text-link hover:opacity-70 transition-opacity">
                Clear all
              </button>
            )}
          </div>

          <FilterSection title="Interests">
            <FilterDropdown
              label="Select interests"
              options={ALL_INTERESTS}
              selected={selInterests}
              onToggle={toggle(setSelInterests)}
              suggested={SUGGESTED_INTERESTS}
            />
          </FilterSection>

          <FilterSection title="Location">
            <FilterDropdown
              label="Select location"
              options={ALL_LOCATIONS}
              selected={selLocations}
              onToggle={toggle(setSelLocations)}
              suggested={SUGGESTED_LOCATIONS}
            />
          </FilterSection>

          <FilterSection title="Wellness Goal">
            <FilterDropdown
              label="Select goal"
              options={ALL_GOALS}
              selected={selGoals}
              onToggle={toggle(setSelGoals)}
              suggested={SUGGESTED_GOALS}
            />
          </FilterSection>

          <FilterSection title="Role">
            <div className="flex flex-wrap gap-1.5">
              {ALL_ROLES.map(r => (
                <ChipBtn key={r} label={r} active={selRole === r} onClick={() => setSelRole(p => p === r ? '' : r)} />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Age Range">
            <div className="flex flex-wrap gap-1.5">
              {ALL_AGE_RANGES.map(a => (
                <ChipBtn key={a} label={a} active={selAge === a} onClick={() => setSelAge(p => p === a ? '' : a)} />
              ))}
            </div>
          </FilterSection>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <p className="text-xs text-muted">
            {filtered.length} {filtered.length === 1 ? 'person' : 'people'} found
          </p>

          {filtered.length === 0 ? (
            <div className="bg-card rounded-2xl shadow-card p-12 text-center">
              <p className="text-sm text-secondary">No people match your current filters.</p>
              <button type="button" onClick={clearAll} className="text-xs text-link mt-2 hover:opacity-70 transition-opacity">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {filtered.map(person => <PersonCard key={person.id} person={person} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

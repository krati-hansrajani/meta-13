import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ── Data ──────────────────────────────────────────────────────────────────────

const ALL_TOPICS = [
  'Meditation', 'Anxiety', 'Sleep', 'Mindfulness', 'Stress',
  'Depression', 'Journaling', 'Breathwork', 'Yoga', 'Therapy',
]

const ALL_ACTIVITY = ['Very Active', 'Active', 'Moderate', 'Low']
const ALL_FOCUS    = ['Support', 'Learning', 'Practice', 'Social']
const ALL_SIZES    = ['Small (<50)', 'Medium (50–200)', 'Large (200+)']

const GROUPS = [
  {
    id: 1,  name: 'Meditation Beginners', initials: 'MB', iconColor: '#C4B5FD',
    members: 234, activity: 'Active',    focus: 'Learning',  size: 'Medium (50–200)',
    topics: ['Meditation', 'Mindfulness'],
    description: 'Starting your meditation journey? Join us for daily guided practices and peer support.',
    memberPreviews: [{ initials: 'SJ', color: '#F9A8D4' }, { initials: 'MC', color: '#86EFAC' }, { initials: 'EW', color: '#93C5FD' }],
  },
  {
    id: 2,  name: 'Anxiety Warriors',     initials: 'AW', iconColor: '#F9A8D4',
    members: 567, activity: 'Very Active', focus: 'Support',  size: 'Large (200+)',
    topics: ['Anxiety', 'Stress', 'Breathwork'],
    description: 'A safe space to share experiences and effective coping strategies for anxiety.',
    memberPreviews: [{ initials: 'LP', color: '#F9A8D4' }, { initials: 'JR', color: '#86EFAC' }, { initials: 'NP', color: '#FCD34D' }],
  },
  {
    id: 3,  name: 'Sleep Better Together',initials: 'SB', iconColor: '#93C5FD',
    members: 188, activity: 'Moderate',   focus: 'Support',   size: 'Medium (50–200)',
    topics: ['Sleep', 'Mindfulness'],
    description: 'Share tips and mutual support for improving sleep quality and bedtime routines.',
    memberPreviews: [{ initials: 'AK', color: '#C4B5FD' }, { initials: 'TB', color: '#6EE7B7' }, { initials: 'MW', color: '#FCA5A5' }],
  },
  {
    id: 4,  name: 'Mindful Mornings',     initials: 'MM', iconColor: '#6EE7B7',
    members: 312, activity: 'Active',    focus: 'Practice',  size: 'Medium (50–200)',
    topics: ['Meditation', 'Yoga', 'Journaling'],
    description: 'Start your day with intention. Daily morning routines and mindful check-ins.',
    memberPreviews: [{ initials: 'RC', color: '#FCD34D' }, { initials: 'PL', color: '#93C5FD' }, { initials: 'VN', color: '#F9A8D4' }],
  },
  {
    id: 5,  name: 'Stress-Free Zone',     initials: 'SZ', iconColor: '#FCD34D',
    members: 445, activity: 'Very Active', focus: 'Support',  size: 'Large (200+)',
    topics: ['Stress', 'Mindfulness', 'Breathwork'],
    description: 'Practical strategies and peer support for managing stress at work and home.',
    memberPreviews: [{ initials: 'DG', color: '#86EFAC' }, { initials: 'KM', color: '#C4B5FD' }, { initials: 'BO', color: '#FDBA74' }],
  },
  {
    id: 6,  name: 'Journal Club',          initials: 'JC', iconColor: '#FCA5A5',
    members: 89,  activity: 'Moderate',   focus: 'Practice',  size: 'Small (<50)',
    topics: ['Journaling', 'Therapy'],
    description: 'Weekly prompts and group reflections to help you process thoughts and grow.',
    memberPreviews: [{ initials: 'HS', color: '#F9A8D4' }, { initials: 'LR', color: '#6EE7B7' }, { initials: 'TP', color: '#93C5FD' }],
  },
  {
    id: 7,  name: 'Depression Recovery',  initials: 'DR', iconColor: '#86EFAC',
    members: 678, activity: 'Very Active', focus: 'Support',  size: 'Large (200+)',
    topics: ['Depression', 'Therapy', 'Mindfulness'],
    description: 'Compassionate community for people navigating depression and building hope.',
    memberPreviews: [{ initials: 'CM', color: '#FCA5A5' }, { initials: 'JW', color: '#C4B5FD' }, { initials: 'AN', color: '#FCD34D' }],
  },
  {
    id: 8,  name: 'Breathwork Collective', initials: 'BC', iconColor: '#FDBA74',
    members: 143, activity: 'Active',     focus: 'Practice',  size: 'Medium (50–200)',
    topics: ['Breathwork', 'Anxiety', 'Stress'],
    description: 'Explore pranayama, box breathing, and other breathwork techniques together.',
    memberPreviews: [{ initials: 'SR', color: '#86EFAC' }, { initials: 'EL', color: '#F9A8D4' }, { initials: 'GN', color: '#C4B5FD' }],
  },
  {
    id: 9,  name: 'Yoga & Wellness',       initials: 'YW', iconColor: '#A7F3D0',
    members: 256, activity: 'Active',     focus: 'Social',    size: 'Medium (50–200)',
    topics: ['Yoga', 'Mindfulness', 'Meditation'],
    description: 'Connect over yoga flows, body positivity, and holistic wellness practices.',
    memberPreviews: [{ initials: 'PN', color: '#FCD34D' }, { initials: 'SD', color: '#93C5FD' }, { initials: 'MH', color: '#FDBA74' }],
  },
]

// ── Icons ─────────────────────────────────────────────────────────────────────

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}

// ── Shared filter primitives ──────────────────────────────────────────────────

function FilterSection({ title, children }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[10px] font-semibold text-muted uppercase tracking-wider">{title}</p>
      {children}
    </div>
  )
}

function ChipBtn({ label, active, onClick, fullWidth = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-xs font-medium rounded-lg px-2.5 py-1.5 transition-colors text-left ${fullWidth ? 'w-full' : ''}`}
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

// ── Group card ────────────────────────────────────────────────────────────────

const ACTIVITY_STYLE = {
  'Very Active': { bg: '#D1FAE5', color: '#10B981' },
  Active:        { bg: '#DBEAFE', color: '#3B82F6' },
  Moderate:      { bg: '#FEF3C7', color: '#D97706' },
  Low:           { bg: '#F3F4F6', color: '#6B7280' },
}

function GroupCard({ group }) {
  const as = ACTIVITY_STYLE[group.activity] ?? { bg: '#F3F4F6', color: '#6B7280' }

  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4">
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold text-primary flex-shrink-0"
            style={{ backgroundColor: group.iconColor }}
          >
            {group.initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-primary leading-snug">{group.name}</p>
            <p className="text-xs text-muted mt-0.5 flex items-center gap-1">
              <UsersIcon />
              {group.members.toLocaleString()} members
            </p>
          </div>
        </div>
        <span
          className="text-[10px] font-semibold px-2 py-1 rounded-full flex-shrink-0"
          style={{ backgroundColor: as.bg, color: as.color }}
        >
          {group.activity}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-secondary leading-relaxed">{group.description}</p>

      {/* Topics */}
      <div>
        <p className="text-xs font-semibold text-link mb-2">Topics</p>
        <div className="flex flex-wrap gap-1.5">
          {group.topics.map(t => (
            <span key={t} className="text-xs text-secondary bg-page px-2.5 py-1 rounded-full">{t}</span>
          ))}
        </div>
      </div>

      {/* Member preview */}
      <div>
        <p className="text-xs font-semibold text-link mb-2">Members</p>
        <div className="flex items-center gap-1.5">
          {group.memberPreviews.map((m, i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold text-primary border-2 border-card flex-shrink-0"
              style={{ backgroundColor: m.color, marginLeft: i > 0 ? '-6px' : '0' }}
            >
              {m.initials}
            </div>
          ))}
          <span className="text-xs text-muted ml-1">+{group.members - 3} more</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <span className="text-[10px] text-muted">{group.focus} · {group.size}</span>
      </div>

      <button
        type="button"
        className="w-full flex items-center justify-center py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
        style={{ backgroundColor: '#EDE9F8', color: '#8B9CF4' }}
      >
        Join Group
      </button>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GroupsMarketplace() {
  const navigate = useNavigate()

  const [selTopics,   setSelTopics]   = useState([])
  const [selActivity, setSelActivity] = useState('')
  const [selFocus,    setSelFocus]    = useState('')
  const [selSize,     setSelSize]     = useState('')

  function toggleTopic(t) {
    setSelTopics(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }
  function clearAll() {
    setSelTopics([]); setSelActivity(''); setSelFocus(''); setSelSize('')
  }

  const filtered = GROUPS.filter(g => {
    if (selTopics.length > 0 && !selTopics.some(t => g.topics.includes(t))) return false
    if (selActivity && g.activity !== selActivity) return false
    if (selFocus && g.focus !== selFocus) return false
    if (selSize && g.size !== selSize) return false
    return true
  })

  const hasFilters = selTopics.length > 0 || selActivity || selFocus || selSize

  return (
    <div className="flex flex-col gap-6 pt-2">

      {/* Header */}
      <header className="flex items-center gap-4 py-6 flex-shrink-0">
        <button
          type="button"
          onClick={() => navigate('/community')}
          className="flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-primary transition-colors flex-shrink-0"
        >
          <BackIcon />
          Back
        </button>
        <div>
          <h1 className="text-3xl font-bold text-primary leading-tight">Explore Groups</h1>
          <p className="text-sm text-secondary mt-1">Discover communities that match your wellness journey</p>
        </div>
      </header>

      {/* Body */}
      <div className="flex gap-6 items-start">

        {/* Filter sidebar */}
        <aside
          className="flex-shrink-0 bg-card rounded-2xl shadow-card p-5 flex flex-col gap-5 sticky top-0 overflow-y-auto"
          style={{ width: '220px', maxHeight: 'calc(100vh - 120px)' }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-primary">Filters</h2>
            {hasFilters && (
              <button type="button" onClick={clearAll} className="text-xs text-link hover:opacity-70 transition-opacity">
                Clear all
              </button>
            )}
          </div>

          <FilterSection title="Topics">
            <div className="flex flex-wrap gap-1.5">
              {ALL_TOPICS.map(t => (
                <ChipBtn key={t} label={t} active={selTopics.includes(t)} onClick={() => toggleTopic(t)} />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Activity Level">
            <div className="flex flex-col gap-1.5">
              {ALL_ACTIVITY.map(a => (
                <ChipBtn key={a} label={a} active={selActivity === a} onClick={() => setSelActivity(p => p === a ? '' : a)} fullWidth />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Community Focus">
            <div className="flex flex-col gap-1.5">
              {ALL_FOCUS.map(f => (
                <ChipBtn key={f} label={f} active={selFocus === f} onClick={() => setSelFocus(p => p === f ? '' : f)} fullWidth />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Group Size">
            <div className="flex flex-col gap-1.5">
              {ALL_SIZES.map(s => (
                <ChipBtn key={s} label={s} active={selSize === s} onClick={() => setSelSize(p => p === s ? '' : s)} fullWidth />
              ))}
            </div>
          </FilterSection>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <p className="text-xs text-muted">
            {filtered.length} {filtered.length === 1 ? 'group' : 'groups'} found
          </p>

          {filtered.length === 0 ? (
            <div className="bg-card rounded-2xl shadow-card p-12 text-center">
              <p className="text-sm text-secondary">No groups match your current filters.</p>
              <button
                type="button"
                onClick={clearAll}
                className="text-xs text-link mt-2 hover:opacity-70 transition-opacity"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {filtered.map(group => <GroupCard key={group.id} group={group} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

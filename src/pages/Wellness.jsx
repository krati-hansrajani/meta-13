import { useState, useRef, useEffect } from 'react'

// ── Static data ───────────────────────────────────────────────────────────────

const TABS = ['All Goals', 'Upcoming', 'In-Progress', 'Achieved']

const INITIAL_GOALS = [
  {
    id: 1,
    title: 'Practice daily meditation',
    description: 'Commit to 10 minutes of mindfulness each morning',
    date: 'Apr 21, 2026',
    time: '9:41 PM',
    status: 'Upcoming',
    circleColor: '#C4B5FD',
  },
  {
    id: 2,
    title: '7-day check-in streak',
    description: 'Completed daily mental health check-ins for a full week',
    date: 'Apr 21, 2026',
    time: '9:41 PM',
    status: 'Achieved',
    circleColor: '#34D399',
  },
  {
    id: 3,
    title: 'Completed therapy session',
    description: 'First session with Dr. Smith - focused on anxiety management',
    date: 'Apr 21, 2026',
    time: '9:41 PM',
    status: 'In-Progress',
    circleColor: '#60A5FA',
  },
  {
    id: 4,
    title: 'Set new wellness goal',
    description: 'Improve sleep quality by establishing bedtime routine',
    date: 'Apr 21, 2026',
    time: '9:41 PM',
    status: 'Achieved',
    circleColor: '#FBBF24',
  },
]

const CIRCLE_COLORS = ['#C4B5FD', '#60A5FA', '#34D399', '#FBBF24']

const BADGE_STYLES = {
  Upcoming:      { color: '#00C9B1' },
  Achieved:      { color: '#34D399' },
  'In-Progress': { color: '#FBBF24' },
}

const STATUS_OPTIONS = ['Upcoming', 'In-Progress', 'Achieved']

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDateDisplay(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

function displayDateToIso(displayDate) {
  const months = { Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12 }
  try {
    const parts = displayDate.replace(',', '').split(' ')
    const [mon, day, year] = parts
    return `${year}-${String(months[mon]).padStart(2,'0')}-${String(day).padStart(2,'0')}`
  } catch {
    return ''
  }
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6"  x2="6"  y2="18" />
      <line x1="6"  y1="6"  x2="18" y2="18" />
    </svg>
  )
}

function MoreVertIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5"  r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const { color } = BADGE_STYLES[status] ?? { color: '#9CA3AF' }
  return (
    <span
      className="text-sm font-medium px-4 py-1.5 rounded-xl border whitespace-nowrap flex-shrink-0"
      style={{ color, borderColor: color }}
    >
      {status}
    </span>
  )
}

function GoalCircle({ circleColor, isLast }) {
  return (
    <div className="flex flex-col items-center flex-shrink-0" style={{ width: '44px' }}>
      <div
        className="w-11 h-11 rounded-full bg-card flex-shrink-0"
        style={{ border: `3px solid ${circleColor}` }}
      />
      {!isLast && (
        <div
          className="mt-2 mx-auto"
          style={{
            width: '2px',
            flexGrow: 1,
            minHeight: '52px',
            background:
              'repeating-linear-gradient(to bottom, #D1D5DB 0px, #D1D5DB 5px, transparent 5px, transparent 11px)',
          }}
        />
      )}
    </div>
  )
}

// ── Goal Options Menu ─────────────────────────────────────────────────────────

function GoalOptionsMenu({ goal, onStatusChange, onEdit }) {
  const [open, setOpen] = useState(false)
  const ref             = useRef(null)

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative flex-shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-page transition-colors"
      >
        <MoreVertIcon />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1 bg-card border border-border rounded-xl z-20 overflow-hidden"
          style={{ boxShadow: 'var(--shadow-dropdown)', minWidth: '168px' }}
        >
          <div className="py-1">
            <p className="px-3 py-1.5 text-[10px] font-semibold text-muted uppercase tracking-wide">
              Change Status
            </p>
            {STATUS_OPTIONS.filter(s => s !== goal.status).map(status => (
              <button
                key={status}
                type="button"
                onClick={() => { onStatusChange(goal.id, status); setOpen(false) }}
                className="w-full text-left px-3 py-2 text-sm text-primary hover:bg-page transition-colors flex items-center gap-2"
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: BADGE_STYLES[status]?.color ?? '#9CA3AF' }}
                />
                Mark as {status}
              </button>
            ))}
          </div>
          <div className="border-t border-border py-1">
            <button
              type="button"
              onClick={() => { onEdit(goal); setOpen(false) }}
              className="w-full text-left px-3 py-2 text-sm text-primary hover:bg-page transition-colors flex items-center gap-2"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit Goal
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Goal Modal (Add & Edit) ───────────────────────────────────────────────────

function GoalModal({ initialGoal, onSave, onClose }) {
  const isEdit = Boolean(initialGoal)

  const [title,       setTitle]       = useState(initialGoal?.title       ?? '')
  const [description, setDescription] = useState(initialGoal?.description ?? '')
  const [targetDate,  setTargetDate]  = useState(
    initialGoal?.date ? displayDateToIso(initialGoal.date) : ''
  )
  const titleRef = useRef(null)

  useEffect(() => { titleRef.current?.focus() }, [])

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  function handleSubmit(e) {
    e.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    const now = new Date()
    onSave({
      title:       trimmedTitle,
      description: description.trim(),
      date:        targetDate
                     ? formatDateDisplay(targetDate)
                     : now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time:        now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    })
    onClose()
  }

  const isValid = title.trim().length > 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      onMouseDown={onClose}
    >
      <div
        className="bg-card rounded-2xl w-full flex flex-col"
        style={{ maxWidth: '480px', margin: '0 16px', boxShadow: '0 8px 40px rgba(0,0,0,0.18)' }}
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 pt-7 pb-5 border-b border-border">
          <h3 className="text-lg font-bold text-primary">{isEdit ? 'Edit Goal' : 'Add New Goal'}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-primary hover:bg-page transition-colors p-1.5 rounded-lg"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 flex flex-col gap-5">

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-primary">
              Goal Title <span className="text-unread">*</span>
            </label>
            <input
              ref={titleRef}
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Meditate for 10 minutes daily"
              className="w-full border border-border rounded-xl px-4 py-3 text-sm text-primary placeholder:text-muted outline-none focus:border-[#8B9CF4] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-primary">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe what this goal means to you…"
              rows={3}
              className="w-full border border-border rounded-xl px-4 py-3 text-sm text-primary placeholder:text-muted outline-none focus:border-[#8B9CF4] transition-colors resize-none leading-relaxed"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-primary">Target Date</label>
            <input
              type="date"
              value={targetDate}
              onChange={e => setTargetDate(e.target.value)}
              className="w-full border border-border rounded-xl px-4 py-3 text-sm text-primary outline-none focus:border-[#8B9CF4] transition-colors"
            />
          </div>

          {!isEdit && (
            <p className="text-xs text-secondary flex items-center gap-1.5">
              <span
                className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: '#00C9B1' }}
              />
              New goals are added as <span className="font-medium text-primary">Upcoming</span> by default.
            </p>
          )}

          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-medium text-secondary px-5 py-2.5 rounded-xl border border-border hover:bg-page transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-[#1A1A1A] text-white hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isEdit ? 'Save Changes' : 'Add New Goal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Wellness() {
  const [goals,       setGoals]       = useState(INITIAL_GOALS)
  const [activeTab,   setActiveTab]   = useState('All Goals')
  const [showModal,   setShowModal]   = useState(false)
  const [editingGoal, setEditingGoal] = useState(null)
  const nextId                        = useRef(INITIAL_GOALS.length + 1)

  function addGoal({ title, description, date, time }) {
    const circleColor = CIRCLE_COLORS[goals.length % CIRCLE_COLORS.length]
    setGoals(prev => [
      ...prev,
      { id: nextId.current++, title, description, date, time, status: 'Upcoming', circleColor },
    ])
  }

  function handleStatusChange(goalId, newStatus) {
    setGoals(prev => prev.map(g => g.id === goalId ? { ...g, status: newStatus } : g))
  }

  function handleEditOpen(goal) {
    setEditingGoal(goal)
    setShowModal(true)
  }

  function handleModalClose() {
    setShowModal(false)
    setEditingGoal(null)
  }

  function handleModalSave(data) {
    if (editingGoal) {
      setGoals(prev => prev.map(g => g.id === editingGoal.id ? { ...g, ...data } : g))
    } else {
      addGoal(data)
    }
    handleModalClose()
  }

  const filtered =
    activeTab === 'All Goals'
      ? goals
      : goals.filter(g => g.status === activeTab)

  return (
    <>
      <div className="flex flex-col gap-6 pt-2">

        <header className="flex items-center justify-between py-6 flex-shrink-0">
          <div>
            <h1 className="text-3xl font-bold text-primary leading-tight">
              Your Wellness Timeline
            </h1>
            <p className="text-sm text-secondary mt-1">
              Track your journey, goals, and milestones
            </p>
          </div>

          <button
            type="button"
            onClick={() => { setEditingGoal(null); setShowModal(true) }}
            className="bg-[#1A1A1A] text-white text-sm font-semibold px-5 py-3 rounded-xl hover:opacity-90 transition-opacity cursor-pointer flex-shrink-0"
          >
            + Add New Goal
          </button>
        </header>

        <div className="bg-card rounded-2xl shadow-card">

          {/* Tab bar */}
          <div className="flex border-b border-border px-10">
            {TABS.map(tab => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={[
                  'flex-1 py-5 text-sm cursor-pointer transition-colors relative',
                  activeTab === tab
                    ? 'text-link font-semibold'
                    : 'text-secondary font-medium hover:text-primary',
                ].join(' ')}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-link" />
                )}
              </button>
            ))}
          </div>

          {/* Timeline list */}
          <div className="p-10">
            {filtered.length === 0 ? (
              <p className="text-sm text-secondary text-center py-12">
                No goals in this category yet.
              </p>
            ) : (
              <div className="flex flex-col">
                {filtered.map((goal, i) => {
                  const isLast = i === filtered.length - 1
                  return (
                    <div key={goal.id} className="flex gap-6">
                      <GoalCircle circleColor={goal.circleColor} isLast={isLast} />
                      <div
                        className={`flex-1 flex items-start justify-between gap-4 min-w-0 ${
                          isLast ? 'pb-4' : 'pb-14'
                        }`}
                      >
                        <div className="space-y-2 min-w-0">
                          <p className="text-base font-bold text-primary leading-snug">
                            {goal.title}
                          </p>
                          <p className="text-sm text-secondary leading-relaxed">
                            {goal.description}
                          </p>
                          <p className="text-xs text-muted">
                            {goal.date}
                            <span className="mx-2 text-border">|</span>
                            {goal.time}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <StatusBadge status={goal.status} />
                          <GoalOptionsMenu
                            goal={goal}
                            onStatusChange={handleStatusChange}
                            onEdit={handleEditOpen}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <GoalModal
          initialGoal={editingGoal}
          onSave={handleModalSave}
          onClose={handleModalClose}
        />
      )}
    </>
  )
}

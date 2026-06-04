import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

// ── Toggle ────────────────────────────────────────────────────────────────────

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative inline-flex h-7 w-12 flex-shrink-0 rounded-full focus:outline-none"
      style={{ backgroundColor: checked ? '#8B9CF4' : 'var(--color-border)' }}
    >
      <span
        className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform absolute top-1"
        style={{ left: checked ? '26px' : '4px', transition: 'left 0.2s ease' }}
      />
    </button>
  )
}

// ── Section icon ──────────────────────────────────────────────────────────────

function SectionIcon({ children }) {
  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-insight"
         style={{ color: '#8B9CF4' }}>
      {children}
    </div>
  )
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}

function QuietHoursIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  )
}

// ── Row variants ──────────────────────────────────────────────────────────────

function ToggleRow({ label, checked, onChange, divider = true }) {
  return (
    <div>
      <div className="flex items-center justify-between py-4 px-6">
        <span className="text-sm text-secondary">{label}</span>
        <Toggle checked={checked} onChange={onChange} />
      </div>
      {divider && <hr className="border-border mx-6" />}
    </div>
  )
}

function ChevronRow({ label, value, divider = true }) {
  return (
    <div>
      <button type="button" className="w-full flex items-center justify-between py-4 px-6 hover:bg-page transition-colors">
        <span className="text-sm text-secondary">{label}</span>
        <div className="flex items-center gap-1 text-muted">
          {value && <span className="text-sm text-secondary">{value}</span>}
          <ChevronRight />
        </div>
      </button>
      {divider && <hr className="border-border mx-6" />}
    </div>
  )
}

// ── Profile section ───────────────────────────────────────────────────────────

function ProfileSection() {
  const [username,    setUsername]    = useState('wellness_user')
  const [editing,     setEditing]     = useState(false)
  const [draft,       setDraft]       = useState(username)
  const [error,       setError]       = useState('')

  function handleEdit() {
    setDraft(username)
    setError('')
    setEditing(true)
  }

  function handleSave() {
    const trimmed = draft.trim().replace(/\s+/g, '_')
    if (trimmed.length < 3) { setError('Username must be at least 3 characters.'); return }
    if (trimmed.length > 20) { setError('Username must be 20 characters or fewer.'); return }
    if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) { setError('Only letters, numbers, and underscores.'); return }
    setUsername(trimmed)
    setEditing(false)
    setError('')
  }

  function handleCancel() {
    setEditing(false)
    setError('')
  }

  return (
    <div className="bg-card rounded-2xl shadow-card overflow-hidden">
      <div className="flex items-center gap-3 px-6 pt-6 pb-4">
        <SectionIcon><UserIcon /></SectionIcon>
        <h2 className="text-base font-semibold text-primary">Profile</h2>
      </div>

      <div className="px-6 pb-6 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4 py-2">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-xs text-muted">Username</span>
            {editing ? (
              <div className="flex flex-col gap-1.5 mt-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted flex-shrink-0">@</span>
                  <input
                    type="text"
                    value={draft}
                    onChange={e => { setDraft(e.target.value); setError('') }}
                    onKeyDown={e => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') handleCancel() }}
                    autoFocus
                    maxLength={20}
                    className="border border-border rounded-xl px-3 py-2 text-sm text-primary outline-none focus:border-[#8B9CF4] transition-colors bg-card w-48"
                  />
                </div>
                {error && <p className="text-xs text-unread">{error}</p>}
                <p className="text-xs text-muted">Letters, numbers, underscores · 3–20 chars</p>
              </div>
            ) : (
              <span className="text-sm font-semibold text-primary">@{username}</span>
            )}
          </div>

          {editing ? (
            <div className="flex items-center gap-2 flex-shrink-0">
              <button type="button" onClick={handleCancel}
                className="text-xs font-medium text-secondary px-3 py-2 rounded-lg border border-border hover:bg-page transition-colors">
                Cancel
              </button>
              <button type="button" onClick={handleSave}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-[#1A1A1A] text-white hover:opacity-90 transition-opacity">
                <CheckIcon />
                Save
              </button>
            </div>
          ) : (
            <button type="button" onClick={handleEdit}
              className="flex items-center gap-1.5 text-xs font-medium text-link hover:opacity-70 transition-opacity flex-shrink-0">
              <EditIcon />
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Quiet Hours section ───────────────────────────────────────────────────────

function QuietHoursSection() {
  const [enabled,   setEnabled]   = useState(false)
  const [startTime, setStartTime] = useState('22:00')
  const [endTime,   setEndTime]   = useState('07:00')

  function fmt(time) {
    const [h, m] = time.split(':').map(Number)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const hour = h % 12 || 12
    return `${hour}:${String(m).padStart(2, '0')} ${ampm}`
  }

  return (
    <div className="bg-card rounded-2xl shadow-card overflow-hidden">
      <div className="flex items-center gap-3 px-6 pt-6 pb-4">
        <SectionIcon><QuietHoursIcon /></SectionIcon>
        <div className="flex-1">
          <h2 className="text-base font-semibold text-primary">Quiet Hours</h2>
          <p className="text-xs text-secondary mt-0.5">Pause all notifications during a set time window</p>
        </div>
        <Toggle checked={enabled} onChange={setEnabled} />
      </div>

      <div
        className="overflow-hidden transition-all"
        style={{ maxHeight: enabled ? '200px' : '0', opacity: enabled ? 1 : 0, transition: 'max-height 0.25s ease, opacity 0.2s ease' }}
      >
        <hr className="border-border mx-6" />
        <div className="px-6 py-5 flex flex-col gap-4">
          <p className="text-xs text-muted leading-relaxed">
            You won't receive any notifications between {fmt(startTime)} and {fmt(endTime)}.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-secondary">Start time</label>
              <input
                type="time"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="border border-border rounded-xl px-3 py-2.5 text-sm text-primary outline-none focus:border-[#8B9CF4] transition-colors bg-card"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-secondary">End time</label>
              <input
                type="time"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                className="border border-border rounded-xl px-3 py-2.5 text-sm text-primary outline-none focus:border-[#8B9CF4] transition-colors bg-card"
              />
            </div>
          </div>
          <p className="text-xs text-muted">Duration: {getDuration(startTime, endTime)}</p>
        </div>
      </div>

      {!enabled && <div className="pb-2" />}
    </div>
  )
}

function getDuration(start, end) {
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)
  let mins = (eh * 60 + em) - (sh * 60 + sm)
  if (mins <= 0) mins += 24 * 60
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return h > 0 ? `${h}h${m > 0 ? ` ${m}m` : ''}` : `${m}m`
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Settings() {
  const { isDark, toggle } = useTheme()
  const [notifs, setNotifs] = useState({
    dailyCheckin:  true,
    weeklyUpdates: true,
    newMessages:   false,
  })

  function setNotif(key, val) {
    setNotifs(prev => ({ ...prev, [key]: val }))
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl py-8">
      <h1 className="text-3xl font-bold text-primary">Settings</h1>

      {/* Profile */}
      <ProfileSection />

      {/* Notifications */}
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <div className="flex items-center gap-3 px-6 pt-6 pb-4">
          <SectionIcon><BellIcon /></SectionIcon>
          <h2 className="text-base font-semibold text-primary">Notifications</h2>
        </div>
        <ToggleRow label="Daily check-in reminders"  checked={notifs.dailyCheckin}  onChange={v => setNotif('dailyCheckin', v)} />
        <ToggleRow label="Weekly progress updates"   checked={notifs.weeklyUpdates} onChange={v => setNotif('weeklyUpdates', v)} />
        <ToggleRow label="New messages"              checked={notifs.newMessages}   onChange={v => setNotif('newMessages', v)} divider={false} />
        <div className="pb-2" />
      </div>

      {/* Quiet Hours */}
      <QuietHoursSection />

      {/* Privacy & Security */}
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <div className="flex items-center gap-3 px-6 pt-6 pb-4">
          <SectionIcon><LockIcon /></SectionIcon>
          <h2 className="text-base font-semibold text-primary">Privacy &amp; Security</h2>
        </div>
        <ChevronRow label="Profile visibility"   value="Friends only" />
        <ChevronRow label="Show activity status" value="On" />
        <ChevronRow label="Data sharing"         value="Off" divider={false} />
        <div className="pb-2" />
      </div>

      {/* Appearance */}
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <div className="flex items-center gap-3 px-6 pt-6 pb-4">
          <SectionIcon><MoonIcon /></SectionIcon>
          <h2 className="text-base font-semibold text-primary">Appearance</h2>
        </div>
        <ToggleRow label="Dark mode" checked={isDark} onChange={toggle} divider={false} />
        <div className="pb-2" />
      </div>

      {/* Help & Links */}
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <ChevronRow label="Help &amp; Support" />
        <ChevronRow label="Terms &amp; Conditions | Privacy Policy" divider={false} />
      </div>
    </div>
  )
}

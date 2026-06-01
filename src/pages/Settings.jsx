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
        style={{
          left: checked ? '26px' : '4px',
          transition: 'left 0.2s ease',
        }}
      />
    </button>
  )
}

// ── Section icon ──────────────────────────────────────────────────────────────

function SectionIcon({ children }) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-insight"
      style={{ color: '#8B9CF4' }}
    >
      {children}
    </div>
  )
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
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
      <button
        type="button"
        className="w-full flex items-center justify-between py-4 px-6 hover:bg-page transition-colors"
      >
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

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Settings() {
  const { isDark, toggle } = useTheme()
  const [notifs, setNotifs] = useState({
    dailyCheckin: true,
    weeklyUpdates: true,
    newMessages: false,
  })

  function setNotif(key, val) {
    setNotifs(prev => ({ ...prev, [key]: val }))
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl py-8">
      <h1 className="text-3xl font-bold text-primary">Settings</h1>

      {/* Notifications */}
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <div className="flex items-center gap-3 px-6 pt-6 pb-4">
          <SectionIcon><BellIcon /></SectionIcon>
          <h2 className="text-base font-semibold text-primary">Notifications</h2>
        </div>

        <ToggleRow
          label="Daily check-in reminders"
          checked={notifs.dailyCheckin}
          onChange={v => setNotif('dailyCheckin', v)}
        />
        <ToggleRow
          label="Weekly progress updates"
          checked={notifs.weeklyUpdates}
          onChange={v => setNotif('weeklyUpdates', v)}
        />
        <ToggleRow
          label="New messages"
          checked={notifs.newMessages}
          onChange={v => setNotif('newMessages', v)}
          divider={false}
        />
        <div className="pb-2" />
      </div>

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

        <ToggleRow
          label="Dark mode"
          checked={isDark}
          onChange={toggle}
          divider={false}
        />
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

import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import metaLogo from '../assets/meta_logo.png'

const DashboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
)

const WellnessTimelineIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
)

const CommunityIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

const MyGroupsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
)

const MessagesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)

const JournalIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <line x1="9" y1="7" x2="15" y2="7"/>
    <line x1="9" y1="11" x2="15" y2="11"/>
    <line x1="9" y1="15" x2="13" y2="15"/>
  </svg>
)

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
)

const LogOutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
)

const NAV_ITEMS = [
  { id: 'dashboard',         label: 'Dashboard',        icon: <DashboardIcon />,        to: '/dashboard' },
  { id: 'wellness-timeline', label: 'Wellness Timeline', icon: <WellnessTimelineIcon />, to: '/wellness' },
  { id: 'journal',           label: 'Journal',           icon: <JournalIcon />,          to: '/journal' },
  { id: 'community',         label: 'Community',         icon: <CommunityIcon />,        to: '/community' },
  { id: 'my-groups',         label: 'My Groups',         icon: <MyGroupsIcon />,         to: '/my-groups' },
  { id: 'messages',          label: 'Messages',          icon: <MessagesIcon />,         to: '/messages' },
  { id: 'settings',          label: 'Settings',          icon: <SettingsIcon />,         to: '/settings' },
]

function NavItem({ item, active }) {
  const cls = `w-full flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
    active ? 'bg-nav-active text-on-dark' : 'text-primary hover:bg-page'
  }`

  if (item.to) {
    return (
      <Link to={item.to} className={cls}>
        {item.icon}
        {item.label}
      </Link>
    )
  }

  return (
    <button type="button" className={cls}>
      {item.icon}
      {item.label}
    </button>
  )
}

function LogoutModal({ onCancel, onConfirm }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      onMouseDown={onCancel}
    >
      <div
        className="bg-card rounded-2xl p-6 flex flex-col gap-5 shadow-card"
        style={{ maxWidth: '380px', width: 'calc(100% - 32px)' }}
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="flex flex-col gap-1.5">
          <h3 className="text-base font-semibold text-primary">Log Out</h3>
          <p className="text-sm text-secondary">Are you sure you want to log out? You'll need to log back in to continue your wellness journey.</p>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-secondary font-medium px-4 py-2 rounded-xl hover:bg-page transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="text-sm font-semibold px-4 py-2 rounded-xl bg-[#1A1A1A] text-white hover:opacity-90 transition-opacity"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Sidebar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [showLogout, setShowLogout] = useState(false)

  function handleLogoutConfirm() {
    setShowLogout(false)
    navigate('/')
  }

  return (
    <>
      <aside className="w-60 h-screen flex flex-col flex-shrink-0 bg-sidebar shadow-sidebar">
        <div className="h-20 flex items-center px-6 flex-shrink-0">
          <img src={metaLogo} alt="Meta-Xi" className="h-9 w-auto object-contain" />
        </div>

        <nav className="flex-1 px-2 flex flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map(item => (
            <NavItem
              key={item.id}
              item={item}
              active={item.to ? pathname.startsWith(item.to) : false}
            />
          ))}
        </nav>

        <div className="px-4 pb-6 flex-shrink-0">
          <hr className="border-border my-4" />
          <button
            type="button"
            onClick={() => setShowLogout(true)}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium text-primary hover:bg-page rounded-lg transition-colors"
          >
            <LogOutIcon />
            Log Out
          </button>
        </div>
      </aside>

      {showLogout && (
        <LogoutModal
          onCancel={() => setShowLogout(false)}
          onConfirm={handleLogoutConfirm}
        />
      )}
    </>
  )
}

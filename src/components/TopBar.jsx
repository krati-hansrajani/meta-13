import { useState, useRef, useEffect } from 'react'

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
)

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'insight',
    title: 'Weekly Insight Ready',
    body: 'Your mental stability improved by 18% compared to last week.',
    time: '2 min ago',
    read: false,
  },
  {
    id: 2,
    type: 'reminder',
    title: 'Daily Check-in Reminder',
    body: "You haven't logged your mood today. Take 30 seconds to check in.",
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    type: 'goal',
    title: 'Goal Achieved 🎉',
    body: 'You completed your 7-day check-in streak!',
    time: '3 hours ago',
    read: true,
  },
  {
    id: 4,
    type: 'chat',
    title: 'New Message from Joy Companion',
    body: 'Joy: "Remember to take a few deep breaths today."',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 5,
    type: 'reminder',
    title: 'Breathing Exercise Due',
    body: 'Your scheduled breathing exercise is ready. Only 5 minutes!',
    time: 'Yesterday',
    read: true,
  },
]

const TYPE_META = {
  insight:  { bg: '#EDE9F8', color: '#8B9CF4' },
  reminder: { bg: '#FEF3C7', color: '#F59E0B' },
  goal:     { bg: '#D1FAE5', color: '#34D399' },
  chat:     { bg: '#DBEAFE', color: '#60A5FA' },
}

function TypeIcon({ type }) {
  const style = { color: TYPE_META[type]?.color ?? '#8B9CF4' }
  if (type === 'insight') return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={style}>
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  )
  if (type === 'reminder') return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={style}>
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  )
  if (type === 'goal') return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={style}>
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={style}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )
}

function NotificationPopup({ onClose }) {
  const [items, setItems] = useState(NOTIFICATIONS)
  const unread = items.filter(n => !n.read).length

  function markRead(id) {
    setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }
  function markAllRead() {
    setItems(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <div
      className="absolute right-0 top-full mt-2 bg-card border border-border rounded-2xl z-50 flex flex-col"
      style={{ width: '360px', boxShadow: '0 8px 32px rgba(0,0,0,0.14)', maxHeight: '480px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-primary">Notifications</span>
          {unread > 0 && (
            <span className="text-[10px] font-semibold bg-unread text-white rounded-full px-1.5 py-0.5 leading-none">
              {unread}
            </span>
          )}
        </div>
        {unread > 0 && (
          <button
            type="button"
            onClick={markAllRead}
            className="text-xs text-link font-medium hover:underline"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <div className="overflow-y-auto flex-1">
        {items.map(item => {
          const meta = TYPE_META[item.type] ?? TYPE_META.insight
          return (
            <div
              key={item.id}
              className={`flex gap-3 px-5 py-4 border-b border-border last:border-b-0 ${!item.read ? 'bg-[#FAFAFA]' : ''}`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: meta.bg }}
              >
                <TypeIcon type={item.type} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-xs leading-snug ${item.read ? 'font-medium text-primary' : 'font-semibold text-primary'}`}>
                    {item.title}
                  </p>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-[10px] text-muted whitespace-nowrap">{item.time}</span>
                    {!item.read && <span className="w-1.5 h-1.5 rounded-full bg-unread flex-shrink-0" />}
                  </div>
                </div>
                <p className="text-xs text-secondary mt-0.5 leading-relaxed">{item.body}</p>
                {!item.read && (
                  <button
                    type="button"
                    onClick={() => markRead(item.id)}
                    className="mt-1 text-[10px] text-link font-medium hover:underline"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function TopBar() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="flex items-center justify-between px-8 py-6 flex-shrink-0">
      <div>
        <h1 className="text-3xl font-bold text-primary leading-tight">
          Welcome back!
        </h1>
        <p className="text-sm text-secondary mt-1">
          Here's how you have been doing.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative" ref={ref}>
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            className="relative p-2 text-primary"
          >
            <BellIcon />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-unread text-white text-[10px] font-semibold flex items-center justify-center leading-none">
                {unreadCount}
              </span>
            )}
          </button>
          {open && <NotificationPopup onClose={() => setOpen(false)} />}
        </div>

        <div className="w-10 h-10 rounded-full bg-purple flex items-center justify-center text-sm font-semibold text-primary flex-shrink-0">
          KH
        </div>
      </div>
    </header>
  )
}

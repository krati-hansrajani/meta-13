import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'insight',
    title: 'Weekly Insight Ready',
    body: 'Your mental stability improved by 18% compared to last week. View your full report.',
    time: '2 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'reminder',
    title: 'Daily Check-in Reminder',
    body: "You haven't logged your mood today. Take 30 seconds to record how you're feeling.",
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    type: 'goal',
    title: 'Goal Achieved 🎉',
    body: 'You completed your 7-day check-in streak! A new milestone has been added to your Wellness Timeline.',
    time: '3 hours ago',
    read: true,
  },
  {
    id: 4,
    type: 'chat',
    title: 'New Message from Joy Companion',
    body: 'Joy: "Remember to take a few deep breaths today. How are you feeling right now?"',
    time: 'Yesterday, 4:30 PM',
    read: true,
  },
  {
    id: 5,
    type: 'reminder',
    title: 'Breathing Exercise Due',
    body: "Your scheduled breathing exercise is ready. It only takes 5 minutes and can reduce anxiety significantly.",
    time: 'Yesterday, 10:00 AM',
    read: true,
  },
  {
    id: 6,
    type: 'insight',
    title: 'Stability Dip Detected',
    body: "We noticed a dip in your mental stability on Friday. Consider journalling or speaking with your companion.",
    time: '2 days ago',
    read: true,
  },
  {
    id: 7,
    type: 'goal',
    title: 'New Goal Suggested',
    body: 'Based on your recent activity, we suggest adding "Limit screen time before bed" to your action items.',
    time: '3 days ago',
    read: true,
  },
]

const TYPE_META = {
  insight:  { bg: '#EDE9F8', color: '#8B9CF4', icon: InsightIcon  },
  reminder: { bg: '#FEF3C7', color: '#F59E0B', icon: ReminderIcon },
  goal:     { bg: '#D1FAE5', color: '#34D399', icon: GoalIcon     },
  chat:     { bg: '#DBEAFE', color: '#60A5FA', icon: ChatIcon     },
}

function InsightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  )
}
function ReminderIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}
function GoalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}
function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )
}
function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  )
}

function NotificationRow({ item, onMarkRead }) {
  const meta = TYPE_META[item.type] ?? TYPE_META.insight
  const Icon = meta.icon

  return (
    <div
      className={`flex gap-4 px-6 py-5 border-b border-border last:border-b-0 transition-colors ${
        item.read ? '' : 'bg-[#FAFAFA]'
      }`}
    >
      {/* Type icon */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ backgroundColor: meta.bg, color: meta.color }}
      >
        <Icon />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <p className={`text-sm leading-snug ${item.read ? 'font-medium text-primary' : 'font-semibold text-primary'}`}>
            {item.title}
          </p>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-muted whitespace-nowrap">{item.time}</span>
            {!item.read && (
              <span className="w-2 h-2 rounded-full bg-unread flex-shrink-0" />
            )}
          </div>
        </div>
        <p className="text-sm text-secondary mt-1 leading-relaxed">{item.body}</p>
        {!item.read && (
          <button
            type="button"
            onClick={() => onMarkRead(item.id)}
            className="mt-2 text-xs text-link font-medium hover:underline"
          >
            Mark as read
          </button>
        )}
      </div>
    </div>
  )
}

export default function Notifications() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)

  const unreadCount = notifications.filter(n => !n.read).length

  function markRead(id) {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <div className="flex flex-col gap-6 pt-2">

      {/* Page header — same rhythm as Dashboard */}
      <header className="flex items-center justify-between py-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 text-secondary hover:text-primary hover:bg-page rounded-lg transition-colors"
          >
            <BackIcon />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-primary leading-tight">Notifications</h1>
            <p className="text-sm text-secondary mt-1">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllRead}
            className="text-sm text-link font-medium hover:underline flex-shrink-0"
          >
            Mark all as read
          </button>
        )}
      </header>

      {/* Notifications card */}
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        {notifications.length === 0 ? (
          <p className="text-sm text-secondary text-center py-16">No notifications yet.</p>
        ) : (
          notifications.map(item => (
            <NotificationRow key={item.id} item={item} onMarkRead={markRead} />
          ))
        )}
      </div>
    </div>
  )
}

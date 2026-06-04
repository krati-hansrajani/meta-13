import { useNavigate } from 'react-router-dom'

const CHATS = [
  { id: 1, initials: 'CH', color: '#C4B5FD', name: 'Connie Hyatt',       preview: 'That sounds really difficult...', time: '2h',        unread: 2 },
  { id: 2, initials: 'SR', color: '#6EE7B7', name: 'Dr. Samuel Reid',    preview: 'How have you been feeling?',     time: '5h',        unread: 0 },
  { id: 3, initials: 'CD', color: '#FCA5A5', name: 'Christy Deva',       preview: "I understand, let's try...",    time: 'Yesterday', unread: 1 },
  { id: 4, initials: 'WG', color: '#93C5FD', name: 'The Wellness Group', preview: 'Alex: What helped me was...',   time: 'Yesterday', unread: 0 },
  { id: 5, initials: 'JC', color: '#FCD34D', name: 'Joy Companion',      preview: 'Remember to breathe...',        time: '2d',        unread: 0 },
]

export default function RecentChats() {
  const navigate = useNavigate()

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-primary">Recent Chats</h2>
        <button
          type="button"
          onClick={() => navigate('/messages')}
          className="text-xs text-link font-medium hover:opacity-70 transition-opacity"
        >
          View All
        </button>
      </div>

      <ul className="flex flex-col gap-3">
        {CHATS.map(chat => (
          <li key={chat.id} className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-primary flex-shrink-0"
              style={{ backgroundColor: chat.color }}
            >
              {chat.initials}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary truncate">{chat.name}</p>
              <p className="text-xs text-secondary truncate mt-0.5">{chat.preview}</p>
            </div>

            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span className="text-xs text-muted">{chat.time}</span>
              {chat.unread > 0 && (
                <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-unread text-white text-[10px] font-semibold flex items-center justify-center leading-none">
                  {chat.unread}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

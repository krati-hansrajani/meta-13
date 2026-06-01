const EVENTS = [
  { id: 1, label: 'Mental stability improved', date: 'Apr 20, 2025', color: 'var(--color-t-pink)' },
  { id: 2, label: 'You had a chat with your companion', date: 'Apr 21, 2025', color: 'var(--color-t-green)' },
  { id: 3, label: 'Journal entry completed', date: 'Apr 22, 2025', color: 'var(--color-t-blue)' },
  { id: 4, label: 'Mental breakdown recorded', date: 'Apr 22, 2025', color: 'var(--color-t-yellow)' },
  { id: 5, label: 'Mental stability improved', date: 'Apr 23, 2025', color: 'var(--color-t-pink)' },
]

export default function RecentTimeline() {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-primary">Recent Timeline</h2>
        <a href="#" className="text-xs text-link font-medium">View All</a>
      </div>

      <ul className="flex flex-col gap-3">
        {EVENTS.map(event => (
          <li key={event.id} className="flex items-center gap-3">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: event.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-primary truncate">{event.label}</p>
              <p className="text-xs text-secondary mt-0.5">{event.date}</p>
            </div>
            <svg
              className="flex-shrink-0 text-muted"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  )
}

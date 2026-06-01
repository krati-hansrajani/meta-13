import { useState, useRef, useEffect } from 'react'

const INITIAL_ITEMS = [
  { id: 1, label: 'Your overall mental stability over time', done: true,  priority: 'medium' },
  { id: 2, label: 'Practice breathing exercise',            done: true,  priority: 'high'   },
  { id: 3, label: 'Write a journal',                        done: false, priority: 'medium' },
  { id: 4, label: 'Limit social media (30 mins)',           done: false, priority: 'low'    },
]

const PRIORITY_META = {
  high:   { label: 'High',   bg: '#FEE2E2', color: '#EF4444' },
  medium: { label: 'Medium', bg: '#FEF3C7', color: '#F59E0B' },
  low:    { label: 'Low',    bg: '#D1FAE5', color: '#10B981' },
}

function PriorityBadge({ priority }) {
  const meta = PRIORITY_META[priority] ?? PRIORITY_META.medium
  return (
    <span
      className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
      style={{ backgroundColor: meta.bg, color: meta.color }}
    >
      {meta.label}
    </span>
  )
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function CircleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6"  y1="6" x2="18" y2="18" />
    </svg>
  )
}

function AddItemModal({ onAdd, onClose }) {
  const [text, setText]         = useState('')
  const [priority, setPriority] = useState('medium')
  const inputRef                = useRef(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  useEffect(() => {
    function handleKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  function handleAdd() {
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed, priority)
    onClose()
  }

  function handleSubmit(e) {
    e.preventDefault()
    handleAdd()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      onMouseDown={onClose}
    >
      <div
        className="bg-card rounded-2xl p-6 w-full shadow-card flex flex-col gap-5"
        style={{ maxWidth: '420px', margin: '0 16px' }}
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-primary">Add Action Item</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-primary transition-colors p-1 rounded-lg hover:bg-page"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-secondary">Action Item</label>
            <input
              ref={inputRef}
              type="text"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Enter action item…"
              className="w-full border border-border rounded-xl px-4 py-2.5 text-sm text-primary placeholder:text-muted outline-none focus:border-[#8B9CF4] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-secondary">Priority Level</label>
            <div className="flex gap-2">
              {Object.entries(PRIORITY_META).map(([key, meta]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPriority(key)}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold border-2 transition-all"
                  style={{
                    backgroundColor: priority === key ? meta.bg : 'transparent',
                    color: priority === key ? meta.color : '#9CA3AF',
                    borderColor: priority === key ? meta.color : '#E5E7EB',
                  }}
                >
                  {meta.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-secondary font-medium px-4 py-2 rounded-xl hover:bg-page transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!text.trim()}
              className="text-sm font-semibold px-4 py-2 rounded-xl bg-[#1A1A1A] text-white hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function ActionItems() {
  const [items,     setItems]     = useState(INITIAL_ITEMS)
  const [showModal, setShowModal] = useState(false)
  const nextId                    = useRef(INITIAL_ITEMS.length + 1)

  function toggleItem(id) {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, done: !item.done } : item
    ))
  }

  function addItem(label, priority) {
    setItems(prev => [...prev, { id: nextId.current++, label, priority, done: false }])
  }

  return (
    <>
      <div className="bg-card rounded-2xl p-6 shadow-card flex flex-col">
        <h2 className="text-base font-semibold text-primary mb-4">Action Items</h2>

        <ul className="flex flex-col gap-3">
          {items.map(item => (
            <li key={item.id}>
              <div className="flex items-center gap-3 w-full">
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="flex items-center gap-3 flex-1 text-left group cursor-pointer min-w-0"
                >
                  <span className={`flex-shrink-0 transition-colors ${
                    item.done ? 'text-done' : 'text-muted group-hover:text-secondary'
                  }`}>
                    {item.done ? <CheckIcon /> : <CircleIcon />}
                  </span>

                  <span className={`text-sm leading-snug transition-colors truncate ${
                    item.done ? 'line-through text-muted' : 'text-primary'
                  }`}>
                    {item.label}
                  </span>
                </button>

                <PriorityBadge priority={item.priority} />
              </div>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="mt-4 self-start text-xs text-link font-medium hover:underline transition-all"
        >
          + Add New Action Item
        </button>
      </div>

      {showModal && (
        <AddItemModal
          onAdd={addItem}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}

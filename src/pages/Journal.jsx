import { useState, useEffect, useRef } from 'react'

// ── Static data ───────────────────────────────────────────────────────────────

const GUIDED_PROMPTS = [
  'What are three things you\'re grateful for today?',
  'Describe a challenge you faced recently and how you handled it.',
  'How are you feeling emotionally right now, and why?',
  'What brought you joy today, even if it was small?',
  'What\'s one thing you\'d like to improve about yourself?',
  'What\'s been weighing on your mind lately?',
  'Describe a moment today where you felt proud of yourself.',
  'What would make tomorrow a great day?',
  'How did you take care of yourself today?',
  'What\'s one thing you\'re looking forward to?',
]

const TABS = ['Daily Journal', 'Journal History']

const STORAGE_KEY = 'meta_journal_entries'

// ── Helpers ───────────────────────────────────────────────────────────────────

function loadEntries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

function formatDateTime(isoString) {
  const d = new Date(isoString)
  const date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return { date, time }
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

// ── Entry Detail Modal ────────────────────────────────────────────────────────

function EntryModal({ entry, onClose }) {
  const { date, time } = formatDateTime(entry.createdAt)

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      onMouseDown={onClose}
    >
      <div
        className="bg-card rounded-2xl w-full flex flex-col"
        style={{ maxWidth: '560px', margin: '0 16px', boxShadow: '0 8px 40px rgba(0,0,0,0.18)', maxHeight: '80vh' }}
        onMouseDown={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-7 pb-5 border-b border-border flex-shrink-0">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-lg font-bold text-primary">Journal Entry</h3>
            <p className="text-xs text-muted">{date} · {time}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-primary hover:bg-page transition-colors p-1.5 rounded-lg"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-6 flex flex-col gap-5 overflow-y-auto">
          {/* Prompt */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-muted uppercase tracking-wide">Prompt</span>
            <p className="text-sm font-medium text-primary leading-relaxed bg-page rounded-xl px-4 py-3">
              {entry.prompt}
            </p>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-muted uppercase tracking-wide">Entry</span>
            <p className="text-sm text-secondary leading-relaxed whitespace-pre-wrap">
              {entry.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Daily Journal Tab ─────────────────────────────────────────────────────────

function DailyJournalTab({ onSave }) {
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [customPrompt,   setCustomPrompt]   = useState('')
  const [mode,           setMode]           = useState(null) // 'guided' | 'custom' | 'free'
  const [content,        setContent]        = useState('')
  const [saved,          setSaved]          = useState(false)
  const textareaRef = useRef(null)

  function selectGuided(prompt) {
    setSelectedPrompt(prompt)
    setMode('guided')
    setContent('')
    setSaved(false)
    setTimeout(() => textareaRef.current?.focus(), 50)
  }

  function selectFreeWrite() {
    setSelectedPrompt('Free Write — write whatever is on your mind.')
    setMode('free')
    setContent('')
    setSaved(false)
    setTimeout(() => textareaRef.current?.focus(), 50)
  }

  function handleCustomPromptSubmit() {
    const trimmed = customPrompt.trim()
    if (!trimmed) return
    setSelectedPrompt(trimmed)
    setMode('custom')
    setContent('')
    setSaved(false)
    setTimeout(() => textareaRef.current?.focus(), 50)
  }

  function handleSave() {
    if (!content.trim() || !selectedPrompt) return
    onSave({ prompt: selectedPrompt, content: content.trim() })
    setSaved(true)
    setTimeout(() => {
      setSelectedPrompt(null)
      setMode(null)
      setContent('')
      setCustomPrompt('')
      setSaved(false)
    }, 1400)
  }

  const activePrompt = selectedPrompt
  const canSave = content.trim().length > 0

  return (
    <div className="p-8 flex flex-col gap-8">

      {/* Active prompt + textarea */}
      {activePrompt && (
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-muted uppercase tracking-wide">Today's Prompt</span>
              <p className="text-base font-semibold text-primary leading-snug">{activePrompt}</p>
            </div>
            <button
              type="button"
              onClick={() => { setSelectedPrompt(null); setMode(null); setContent(''); setSaved(false) }}
              className="text-muted hover:text-primary hover:bg-page transition-colors p-1.5 rounded-lg flex-shrink-0"
            >
              <CloseIcon />
            </button>
          </div>

          <textarea
            ref={textareaRef}
            value={content}
            onChange={e => { setContent(e.target.value); setSaved(false) }}
            placeholder="Start writing your thoughts here…"
            rows={8}
            className="w-full border border-border rounded-xl px-4 py-3 text-sm text-primary placeholder:text-muted outline-none focus:border-[#8B9CF4] transition-colors resize-none leading-relaxed bg-card"
          />

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => { setSelectedPrompt(null); setMode(null); setContent(''); setSaved(false) }}
              className="text-sm font-medium text-secondary px-5 py-2.5 rounded-xl border border-border hover:bg-page transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!canSave || saved}
              className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-[#1A1A1A] text-white hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saved ? (
                <>
                  <CheckIcon />
                  Saved
                </>
              ) : 'Save Entry'}
            </button>
          </div>
        </div>
      )}

      {/* Prompt selection UI — only shown when no prompt active */}
      {!activePrompt && (
        <>
          {/* Guided prompts */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-primary">Guided Prompts</h2>
            <div className="flex flex-col gap-2">
              {GUIDED_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectGuided(prompt)}
                  className="w-full text-left px-4 py-3.5 rounded-xl border border-border bg-card hover:border-[#8B9CF4] hover:bg-insight transition-colors text-sm text-primary leading-snug"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Custom prompt */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-primary">Write Your Own Prompt</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={customPrompt}
                onChange={e => setCustomPrompt(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleCustomPromptSubmit() }}
                placeholder="Type your own prompt…"
                className="flex-1 border border-border rounded-xl px-4 py-3 text-sm text-primary placeholder:text-muted outline-none focus:border-[#8B9CF4] transition-colors bg-card"
              />
              <button
                type="button"
                onClick={handleCustomPromptSubmit}
                disabled={!customPrompt.trim()}
                className="text-sm font-semibold px-5 py-3 rounded-xl bg-[#1A1A1A] text-white hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              >
                Use
              </button>
            </div>
          </div>

          {/* Free write */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-primary">Free Write</h2>
            <button
              type="button"
              onClick={selectFreeWrite}
              className="w-full text-left px-4 py-4 rounded-xl border-2 border-dashed border-border bg-card hover:border-[#8B9CF4] hover:bg-insight transition-colors text-sm text-secondary"
            >
              No prompt — just write whatever is on your mind.
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// ── Journal History Tab ───────────────────────────────────────────────────────

function JournalHistoryTab({ entries }) {
  const [selectedEntry, setSelectedEntry] = useState(null)

  const sorted = [...entries].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  if (sorted.length === 0) {
    return (
      <div className="p-8 flex flex-col items-center justify-center py-20 gap-3">
        <p className="text-base font-medium text-secondary">No journal entries yet.</p>
        <p className="text-sm text-muted">Switch to the Daily Journal tab to write your first entry.</p>
      </div>
    )
  }

  return (
    <>
      <div className="p-8 flex flex-col gap-3">
        {sorted.map(entry => {
          const { date, time } = formatDateTime(entry.createdAt)
          return (
            <button
              key={entry.id}
              type="button"
              onClick={() => setSelectedEntry(entry)}
              className="w-full text-left px-5 py-4 rounded-xl border border-border bg-card hover:border-[#8B9CF4] hover:bg-insight transition-colors flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-primary line-clamp-1 flex-1">{entry.prompt}</p>
                <span className="text-xs text-muted flex-shrink-0">{date} · {time}</span>
              </div>
              <p className="text-sm text-secondary line-clamp-2 leading-relaxed">{entry.content}</p>
            </button>
          )
        })}
      </div>

      {selectedEntry && (
        <EntryModal
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
        />
      )}
    </>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Journal() {
  const [activeTab, setActiveTab] = useState('Daily Journal')
  const [entries,   setEntries]   = useState(loadEntries)

  function handleSave({ prompt, content }) {
    const entry = {
      id:        crypto.randomUUID(),
      prompt,
      content,
      createdAt: new Date().toISOString(),
    }
    const next = [entry, ...entries]
    setEntries(next)
    saveEntries(next)
  }

  return (
    <div className="flex flex-col gap-6 pt-2">

      {/* Page header */}
      <header className="py-6 flex-shrink-0">
        <h1 className="text-3xl font-bold text-primary leading-tight">Daily Journal</h1>
        <p className="text-sm text-secondary mt-1">Reflect, write, and track your mental wellness journey.</p>
      </header>

      {/* Main card */}
      <div className="bg-card rounded-2xl shadow-card">

        {/* Tab bar */}
        <div className="flex border-b border-border px-8">
          {TABS.map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={[
                'py-5 px-2 mr-6 text-sm cursor-pointer transition-colors relative whitespace-nowrap',
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

        {activeTab === 'Daily Journal' && (
          <DailyJournalTab onSave={handleSave} />
        )}
        {activeTab === 'Journal History' && (
          <JournalHistoryTab entries={entries} />
        )}
      </div>
    </div>
  )
}

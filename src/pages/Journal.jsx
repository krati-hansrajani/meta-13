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

function makeSampleEntries() {
  const now = new Date()
  function daysAgo(n, hour = 9) {
    const d = new Date(now)
    d.setDate(d.getDate() - n)
    d.setHours(hour, 0, 0, 0)
    return d.toISOString()
  }
  return [
    { id: 'sample-1',  prompt: "What are three things you're grateful for today?",       feelingScore: 7, createdAt: daysAgo(0, 8),  content: "I'm grateful for my morning coffee ritual, a good conversation with a friend, and the fact that I managed to go for a short walk despite feeling tired. Small things, but they really do matter." },
    { id: 'sample-2',  prompt: "How are you feeling emotionally right now, and why?",    feelingScore: 4, createdAt: daysAgo(1, 21), content: "Feeling a bit anxious about the upcoming week. Work has been piling up and I haven't been sleeping well. But I reminded myself that I've handled tough weeks before — and I will again." },
    { id: 'sample-3',  prompt: "What brought you joy today, even if it was small?",      feelingScore: 8, createdAt: daysAgo(2, 19), content: "Listened to my favourite playlist on the commute. Made a really good lunch for myself. Had a quiet moment in the evening where everything just felt peaceful — rare but wonderful." },
    { id: 'sample-4',  prompt: "Describe a challenge you faced recently and how you handled it.", feelingScore: 6, createdAt: daysAgo(3, 20), content: "Had a disagreement with a colleague. Instead of avoiding it, I asked to talk it through. We didn't fully agree but both felt heard. That felt like real growth for me." },
    { id: 'sample-5',  prompt: "What's been weighing on your mind lately?",              feelingScore: 3, createdAt: daysAgo(4, 22), content: "Financial stress has been a recurring theme. I sat down today and made a rough budget — not perfect, but it felt good to face it rather than keep pushing it away." },
    { id: 'sample-6',  prompt: "How did you take care of yourself today?",               feelingScore: 7, createdAt: daysAgo(5, 18), content: "Took a 20-minute break in the afternoon and did some stretching. Drank enough water. Said no to something that would have drained me. These small acts of care add up more than I realise." },
    { id: 'sample-7',  prompt: "What's one thing you're looking forward to?",            feelingScore: 9, createdAt: daysAgo(6, 17), content: "Really looking forward to the weekend hike we planned. Being outdoors always resets my mind. Also excited about the book I started — first time in months I've been genuinely hooked by something." },
    { id: 'sample-8',  prompt: "What's one thing you'd like to improve about yourself?", feelingScore: 5, createdAt: daysAgo(10, 20), content: "I want to be more patient — with others and with myself. I catch myself rushing through things and then feeling unsatisfied. Slowing down is something I'm actively working on." },
    { id: 'sample-9',  prompt: "Describe a moment today where you felt proud of yourself.", feelingScore: 8, createdAt: daysAgo(15, 19), content: "Completed a project I'd been putting off for two weeks. The relief was enormous. It reminded me that starting is always the hardest part — once I'm in it, it flows." },
    { id: 'sample-10', prompt: "What would make tomorrow a great day?",                  feelingScore: 6, createdAt: daysAgo(22, 21), content: "A good night's sleep, a healthy breakfast, and tackling the most important task first thing. Simple formula, but when I actually follow it the whole day just flows so much better." },
  ]
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

function loadEntries() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    if (stored.length === 0) {
      const samples = makeSampleEntries()
      saveEntries(samples)
      return samples
    }
    return stored
  } catch {
    return []
  }
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

// ── Feeling Score Scale ───────────────────────────────────────────────────────

function FeelingScale({ value, onChange }) {
  function scoreColor(n, selected) {
    if (n <= 3) return selected
      ? { bg: '#FEE2E2', border: '#EF4444', text: '#EF4444' }
      : { bg: 'transparent', border: 'var(--color-border)', text: 'var(--color-muted)' }
    if (n <= 6) return selected
      ? { bg: '#FEF9C3', border: '#CA8A04', text: '#CA8A04' }
      : { bg: 'transparent', border: 'var(--color-border)', text: 'var(--color-muted)' }
    return selected
      ? { bg: '#D1FAE5', border: '#10B981', text: '#10B981' }
      : { bg: 'transparent', border: 'var(--color-border)', text: 'var(--color-muted)' }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-primary">How are you feeling today?</h2>
        {value != null && (
          <button type="button" onClick={() => onChange(null)}
            className="text-xs text-muted hover:text-primary transition-colors">
            Clear
          </button>
        )}
      </div>
      <div className="flex gap-1.5 justify-between">
        {Array.from({ length: 10 }, (_, i) => i + 1).map(n => {
          const sel = value === n
          const c   = scoreColor(n, sel)
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(sel ? null : n)}
              className="flex-1 h-10 rounded-xl text-sm font-semibold border transition-all"
              style={{ backgroundColor: c.bg, borderColor: c.border, color: c.text }}
            >
              {n}
            </button>
          )
        })}
      </div>
      <div className="flex justify-between">
        <span className="text-[11px] text-muted">Extremely Unwell</span>
        <span className="text-[11px] text-muted">Perfect</span>
      </div>
    </div>
  )
}

// ── Daily Journal Tab ─────────────────────────────────────────────────────────

function DailyJournalTab({ onSave }) {
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [customPrompt,   setCustomPrompt]   = useState('')
  const [,               setMode]           = useState(null)
  const [content,        setContent]        = useState('')
  const [saved,          setSaved]          = useState(false)
  const [feelingScore,   setFeelingScore]   = useState(null)
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
    onSave({ prompt: selectedPrompt, content: content.trim(), feelingScore })
    setSaved(true)
    setTimeout(() => {
      setSelectedPrompt(null)
      setMode(null)
      setContent('')
      setCustomPrompt('')
      setFeelingScore(null)
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
              onClick={() => { setSelectedPrompt(null); setMode(null); setContent(''); setFeelingScore(null); setSaved(false) }}
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

          <FeelingScale value={feelingScore} onChange={setFeelingScore} />

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => { setSelectedPrompt(null); setMode(null); setContent(''); setFeelingScore(null); setSaved(false) }}
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

  function handleSave({ prompt, content, feelingScore }) {
    const entry = {
      id:           crypto.randomUUID(),
      prompt,
      content,
      feelingScore: feelingScore ?? null,
      createdAt:    new Date().toISOString(),
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

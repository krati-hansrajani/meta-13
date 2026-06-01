import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

// ── Data ──────────────────────────────────────────────────────────────────────

const CONVERSATIONS = [
  { id: 1, name: 'Connie Hyatt',       preview: 'Remember to focus on your schedule for this week', time: '2 mins',  unread: 1, initials: 'CH', avatarColor: '#F9A8D4', status: null },
  { id: 2, name: 'Carroll Streich',    preview: 'I trust you when you shared about the trauma',     time: '43 mins', unread: 2, initials: 'CS', avatarColor: '#86EFAC', status: null },
  { id: 3, name: 'Christy Dare',       preview: "I guess it's perfectly normal to feel overwhelmed",time: '17:52',   unread: 0, initials: 'CD', avatarColor: '#93C5FD', status: 'active' },
  { id: 4, name: 'The Wellness Group', preview: 'Sam: Hey there, just checking in. All good?',      time: '22 Apr',  unread: 0, initials: 'WG', avatarColor: '#C4B5FD', status: null },
  { id: 5, name: 'Tommie Weimann',     preview: 'How is it going with all the meditative sessions', time: '18 Apr',  unread: 0, initials: 'TW', avatarColor: '#FCD34D', status: null },
]

const INITIAL_MESSAGES = {
  1: [
    { id: 1, sent: false, text: 'Hi! How are you doing today?', time: '09:30' },
    { id: 2, sent: true,  text: "I'm doing pretty well, thank you for asking!", time: '09:32' },
    { id: 3, sent: false, text: 'Remember to focus on your schedule for this week. Staying consistent is key!', time: '09:35' },
    { id: 4, sent: true,  text: "You're right. I've been working on building better habits lately.", time: '09:38' },
  ],
  2: [
    { id: 1, sent: true,  text: 'I wanted to reach out about what we discussed in our last session.', time: '15:10' },
    { id: 2, sent: false, text: 'I trust you when you shared about the trauma. It takes real courage.', time: '15:15' },
    { id: 3, sent: true,  text: "Thank you. It's been weighing on me for a while.", time: '15:18' },
    { id: 4, sent: false, text: "That's understandable. We'll work through it together at your pace.", time: '15:20' },
  ],
  3: [
    { id: 1, sent: false, text: 'Hey! How are you feeling today?', time: '17:52' },
    { id: 2, sent: true,  text: 'Much better, thanks! That meditation technique you shared really helped.', time: '21:10' },
    { id: 3, sent: false, text: "That's wonderful to hear! I'm so glad it worked for you.", time: '21:12' },
    { id: 4, sent: false, text: 'Have you tried the body scan meditation yet?', time: '21:14' },
    { id: 5, sent: true,  text: "Not yet, but I'd love to try it. Can you guide me through it?", time: '21:18' },
    { id: 6, sent: false, text: "Absolutely! Let's schedule a time this week.", time: '21:22' },
  ],
  4: [
    { id: 1, sent: false, text: 'Hey there, just checking in. All good?', time: '22 Apr' },
    { id: 2, sent: true,  text: 'Yes, doing great! Thanks for checking in everyone.', time: '22 Apr' },
    { id: 3, sent: false, text: 'Remember our group session is this Friday at 6 PM!', time: '22 Apr' },
  ],
  5: [
    { id: 1, sent: false, text: 'How is it going with all the meditative sessions?', time: '18 Apr' },
    { id: 2, sent: true,  text: "Going well! I've been consistent this week — 5 days in a row.", time: '18 Apr' },
    { id: 3, sent: false, text: "That's amazing progress! Keep it up!", time: '18 Apr' },
  ],
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

// ── Avatar ────────────────────────────────────────────────────────────────────

function Avatar({ initials, color, status, size = 'md' }) {
  const sz = size === 'lg' ? 'w-12 h-12 text-base' : 'w-10 h-10 text-sm'
  return (
    <div
      className={`${sz} rounded-full flex items-center justify-center font-semibold text-primary flex-shrink-0 relative`}
      style={{ backgroundColor: color }}
    >
      {initials}
      {status === 'active' && (
        <span
          className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2"
          style={{ borderColor: 'var(--color-card)' }}
        />
      )}
    </div>
  )
}

// ── ConversationItem ──────────────────────────────────────────────────────────

function ConversationItem({ conv, active, onClick }) {
  const { isDark } = useTheme()
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors border-b border-border last:border-b-0 hover:bg-page"
      style={{ backgroundColor: active ? (isDark ? '#23233E' : '#F5F3FF') : undefined }}
    >
      <Avatar initials={conv.initials} color={conv.avatarColor} status={conv.status} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <p className="text-sm font-semibold text-primary truncate">{conv.name}</p>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {conv.unread > 0 && (
              <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-unread text-white text-[11px] flex items-center justify-center font-semibold leading-none">
                {conv.unread}
              </span>
            )}
            <span className="text-xs text-muted whitespace-nowrap">{conv.time}</span>
          </div>
        </div>
        <p className="text-xs text-muted truncate">{conv.preview}</p>
      </div>
    </button>
  )
}

// ── ChatWindow ────────────────────────────────────────────────────────────────

function ChatWindow({ conv, messages, inputValue, onInputChange, onSend }) {
  const { isDark } = useTheme()
  const bottomRef  = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey && inputValue.trim()) {
      e.preventDefault()
      onSend()
    }
  }

  const chatBg = isDark
    ? 'linear-gradient(160deg, #0F0F1A 0%, #141428 60%, #1A1A32 100%)'
    : 'linear-gradient(160deg, #F8F6FF 0%, #EEE8FF 60%, #E8DFFF 100%)'

  const bubbleBg   = isDark ? '#23233E' : '#ffffff'
  const bubbleShadow = isDark
    ? '0 1px 4px rgba(0,0,0,0.35)'
    : '0 1px 4px rgba(0,0,0,0.07)'

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-border flex-shrink-0 bg-card">
        <Avatar initials={conv.initials} color={conv.avatarColor} status={conv.status} size="lg" />
        <div>
          <p className="text-base font-bold text-primary leading-snug">{conv.name}</p>
          {conv.status === 'active' ? (
            <p className="text-xs font-medium flex items-center gap-1.5 mt-0.5" style={{ color: '#22C55E' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Active now
            </p>
          ) : (
            <p className="text-xs text-muted mt-0.5">Offline</p>
          )}
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4"
        style={{ background: chatBg }}
      >
        {messages.map(msg => (
          <div key={msg.id} className={`flex flex-col gap-1 ${msg.sent ? 'items-end' : 'items-start'}`}>
            <div
              className="max-w-[62%] px-4 py-3 rounded-2xl text-sm leading-relaxed text-primary"
              style={{ backgroundColor: bubbleBg, boxShadow: bubbleShadow }}
            >
              {msg.text}
            </div>
            <span className="text-[11px] text-muted px-1">{msg.time}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-6 py-4 flex-shrink-0 bg-card border-t border-border">
        <div className="flex items-center gap-3 rounded-2xl px-4 py-3 border border-border bg-page">
          <input
            type="text"
            value={inputValue}
            onChange={e => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here"
            className="flex-1 bg-transparent text-sm text-primary placeholder:text-muted outline-none"
          />
          <button
            type="button"
            onClick={onSend}
            disabled={!inputValue.trim()}
            className="flex-shrink-0 transition-opacity disabled:opacity-30 hover:opacity-70"
            style={{ color: '#8B9CF4' }}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Messages() {
  const [activeId, setActiveId]             = useState(CONVERSATIONS[0].id)
  const [messagesByConv, setMessagesByConv] = useState(INITIAL_MESSAGES)
  const [conversations, setConversations]   = useState(CONVERSATIONS)
  const [inputValue, setInputValue]         = useState('')
  const [search, setSearch]                 = useState('')

  const activeConv = conversations.find(c => c.id === activeId)
  const messages   = messagesByConv[activeId] ?? []

  const filteredConversations = search.trim()
    ? conversations.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : conversations

  function handleSelect(id) {
    setActiveId(id)
    setInputValue('')
    setConversations(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c))
  }

  function handleSend() {
    const text = inputValue.trim()
    if (!text) return
    const now  = new Date()
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    setMessagesByConv(prev => ({
      ...prev,
      [activeId]: [...(prev[activeId] ?? []), { id: Date.now(), sent: true, text, time }],
    }))
    setConversations(prev =>
      prev.map(c => c.id === activeId ? { ...c, preview: text, time: 'Just now' } : c)
    )
    setInputValue('')
  }

  return (
    <div className="flex h-full pt-2">
      <div className="flex flex-1 bg-card rounded-2xl shadow-card overflow-hidden">

        {/* Left: conversation list */}
        <div className="w-[300px] flex-shrink-0 border-r border-border flex flex-col">
          <div className="px-5 pt-6 pb-4 flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary">Messages</h1>
          </div>

          <div className="px-4 pb-3 flex-shrink-0">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search"
                className="w-full bg-page border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-primary placeholder:text-muted outline-none focus:border-[#8B9CF4] transition-colors"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <p className="text-sm text-muted text-center py-8">No conversations found.</p>
            ) : (
              filteredConversations.map(conv => (
                <ConversationItem
                  key={conv.id}
                  conv={conv}
                  active={conv.id === activeId}
                  onClick={() => handleSelect(conv.id)}
                />
              ))
            )}
          </div>
        </div>

        {/* Right: chat window */}
        <div className="flex-1 min-w-0 flex flex-col">
          {activeConv ? (
            <ChatWindow
              conv={activeConv}
              messages={messages}
              inputValue={inputValue}
              onInputChange={setInputValue}
              onSend={handleSend}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-muted">Select a conversation to start chatting</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

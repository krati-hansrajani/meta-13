import { useState } from 'react'

// ── Static data ───────────────────────────────────────────────────────────────

const MY_GROUPS = [
  {
    id: 1,
    name: 'Meditation Beginners',
    members: 234,
    initials: 'MB',
    color: '#C4B5FD',
    description: 'Starting your meditation journey? Join us for daily practices and support.',
  },
  {
    id: 2,
    name: 'Anxiety Warriors',
    members: 567,
    initials: 'AW',
    color: '#F9A8D4',
    description: 'A safe space to share experiences and coping strategies for anxiety.',
  },
  {
    id: 3,
    name: 'Sleep Better Together',
    members: 188,
    initials: 'SB',
    color: '#93C5FD',
    description: 'Share tips and support for improving sleep quality and routines.',
  },
]

const A1 = { name: 'Connie Hyatt',       initials: 'CH', color: '#F9A8D4' }
const A2 = { name: 'Lindsay McLaughlin', initials: 'LM', color: '#86EFAC' }
const A3 = { name: 'Tommie Weimann',     initials: 'TW', color: '#93C5FD' }
const A4 = { name: 'Marcus Reid',        initials: 'MR', color: '#FCD34D' }
const A5 = { name: 'Priya Nair',         initials: 'PN', color: '#C4B5FD' }

let _nextId = 500

function makePost(author, text, time, reactions, comments = []) {
  return { id: _nextId++, author, text, time, reactions, comments }
}

const INITIAL_FEED = {
  1: [
    makePost(
      A1,
      'Just completed my first 10-minute meditation session! It was challenging to quiet my mind but I felt so calm afterwards. Has anyone else struggled in the beginning?',
      '2h ago',
      { '❤️': 14, '🤗': 9, '💪': 7, '🌟': 4 },
      [
        { id: _nextId++, author: A2, text: 'It definitely takes practice! The first few weeks are the hardest. Keep going — it gets easier and more rewarding each time.', time: '1h ago' },
        { id: _nextId++, author: A3, text: 'Same here. Focusing on the breath instead of trying to "empty" the mind really helped me. Great job on starting!', time: '45m ago' },
      ],
    ),
    makePost(
      A2,
      'Sharing a technique that changed everything for me: body scan meditation before sleep. You mentally move from toes to head, noticing sensations without judgment. Works wonders for winding down!',
      '5h ago',
      { '❤️': 22, '🤗': 15, '💪': 11, '🌟': 18 },
      [
        { id: _nextId++, author: A4, text: 'Tried this last night after reading your post. Fell asleep much faster than usual. Thank you for sharing!', time: '3h ago' },
      ],
    ),
  ],
  2: [
    makePost(
      A3,
      'Had a really rough morning with anxiety. What grounding techniques do you all use when it hits unexpectedly? Trying to build a toolkit for those moments.',
      '30m ago',
      { '❤️': 6, '🤗': 11, '💪': 3, '🌟': 1 },
      [
        { id: _nextId++, author: A5, text: 'The 5-4-3-2-1 method: name 5 things you see, 4 you hear, 3 you can touch, 2 you smell, 1 you taste. Brings me back instantly.', time: '20m ago' },
        { id: _nextId++, author: A1, text: 'Sending so much warmth 🤗 Cold water on your wrists also helps me reset quickly. Hope your day gets brighter!', time: '15m ago' },
      ],
    ),
    makePost(
      A4,
      "Milestone: 30 days of daily journaling for anxiety management. I can't believe how much lighter I feel. Even on hard days, getting thoughts out of my head and onto paper makes them less overwhelming.",
      '1d ago',
      { '❤️': 31, '🤗': 27, '💪': 24, '🌟': 19 },
      [],
    ),
  ],
  3: [
    makePost(
      A5,
      "My sleep hygiene routine that finally worked after months of trial and error: no screens 1 hour before bed, magnesium supplement, white noise machine, and keeping the room cool around 67°F. What's in your wind-down routine?",
      '3h ago',
      { '❤️': 18, '🤗': 12, '💪': 8, '🌟': 14 },
      [
        { id: _nextId++, author: A2, text: 'The cool room tip is a game-changer! Swapped my phone for a book 30 minutes before sleep and quality improved noticeably within a week.', time: '2h ago' },
      ],
    ),
    makePost(
      A3,
      "Anyone else notice their sleep is way worse during stressful work periods? Last week was brutal and I could really feel the impact. Would love to hear how others keep work stress from bleeding into rest.",
      '1d ago',
      { '❤️': 25, '🤗': 20, '💪': 14, '🌟': 9 },
      [
        { id: _nextId++, author: A4, text: "A strict shutdown ritual at 6pm helped me a lot — I write tomorrow's top 3 tasks, then mentally close the laptop. Signals to my brain that work is done.", time: '20h ago' },
        { id: _nextId++, author: A1, text: 'Progressive muscle relaxation before bed neutralises a lot of the physical tension from stressful days for me. Give it a try!', time: '18h ago' },
      ],
    ),
  ],
}

const REACTIONS = [
  { emoji: '❤️', label: 'Warm' },
  { emoji: '🤗', label: 'Supportive' },
  { emoji: '💪', label: 'Empowering' },
  { emoji: '🌟', label: 'Inspiring' },
]

// ── Icons ─────────────────────────────────────────────────────────────────────

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

function ChevronUpIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Avatar({ author, size = 36 }) {
  return (
    <div
      style={{
        width: size, height: size,
        borderRadius: '50%',
        backgroundColor: author.color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: Math.round(size * 0.34), fontWeight: 700, color: '#1A1A1A',
        flexShrink: 0, userSelect: 'none',
      }}
    >
      {author.initials}
    </div>
  )
}

function GroupListItem({ group, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${
        selected ? 'bg-insight' : 'hover:bg-page'
      }`}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 text-white"
        style={{ backgroundColor: group.color }}
      >
        {group.initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-semibold leading-snug truncate ${selected ? 'text-[#6B5CE7]' : 'text-primary'}`}>
          {group.name}
        </p>
        <p className="text-xs text-muted mt-0.5">{group.members} members</p>
      </div>
      {selected && <div className="w-1.5 h-1.5 rounded-full bg-[#8B9CF4] flex-shrink-0" />}
    </button>
  )
}

function PostComposer({ onSubmit }) {
  const [text, setText] = useState('')

  function handlePost() {
    const trimmed = text.trim()
    if (!trimmed) return
    onSubmit(trimmed)
    setText('')
  }

  return (
    <div className="bg-card rounded-2xl shadow-card p-5">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-insight flex items-center justify-center text-xs font-bold text-[#8B9CF4] flex-shrink-0">
          Me
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Share a thought, reflection, or experience with the group..."
            rows={3}
            className="w-full resize-none bg-page rounded-xl px-4 py-3 text-sm text-primary placeholder:text-muted outline-none focus:ring-2 focus:ring-[#8B9CF4]/30 transition-all leading-relaxed"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handlePost}
              disabled={!text.trim()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B9CF4] text-white text-sm font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              <SendIcon />
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ReactionBar({ postId, reactions, myReacted, onToggle }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {REACTIONS.map(({ emoji, label }) => {
        const count = reactions[emoji] ?? 0
        const active = myReacted.has(emoji)
        return (
          <button
            key={emoji}
            type="button"
            title={label}
            onClick={() => onToggle(postId, emoji)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
            style={{
              backgroundColor: active ? 'var(--color-insight)' : 'var(--color-page)',
              color: active ? 'var(--color-purple)' : 'var(--color-secondary)',
              border: active ? '1px solid var(--color-purple)' : '1px solid transparent',
            }}
          >
            <span>{emoji}</span>
            <span>{count}</span>
          </button>
        )
      })}
    </div>
  )
}

function CommentItem({ comment }) {
  return (
    <div className="flex items-start gap-2.5">
      <Avatar author={comment.author} size={28} />
      <div className="flex-1 bg-page rounded-xl px-3.5 py-2.5">
        <div className="flex items-baseline gap-2 mb-0.5">
          <span className="text-xs font-semibold text-primary">{comment.author.name}</span>
          <span className="text-[10px] text-muted">{comment.time}</span>
        </div>
        <p className="text-xs text-secondary leading-relaxed">{comment.text}</p>
      </div>
    </div>
  )
}

function CommentThread({ postId, comments, onAdd }) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')

  function handleAdd() {
    const trimmed = draft.trim()
    if (!trimmed) return
    onAdd(postId, trimmed)
    setDraft('')
  }

  return (
    <div className="border-t border-border pt-3 mt-1">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 text-xs text-secondary font-medium hover:text-primary transition-colors"
      >
        {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
        {comments.length === 0
          ? 'Add a comment'
          : `${comments.length} comment${comments.length !== 1 ? 's' : ''}`}
      </button>

      {open && (
        <div className="mt-3 flex flex-col gap-3">
          {comments.map(c => <CommentItem key={c.id} comment={c} />)}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-insight flex items-center justify-center text-[10px] font-bold text-[#8B9CF4] flex-shrink-0">
              Me
            </div>
            <input
              type="text"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleAdd() }}
              placeholder="Write a supportive comment..."
              className="flex-1 bg-page rounded-xl px-3.5 py-2 text-xs text-primary placeholder:text-muted outline-none focus:ring-2 focus:ring-[#8B9CF4]/30 transition-all"
            />
            <button
              type="button"
              onClick={handleAdd}
              disabled={!draft.trim()}
              className="text-[#8B9CF4] disabled:opacity-40 hover:opacity-70 transition-opacity"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function PostCard({ post, myReacted, onToggleReaction, onAddComment }) {
  return (
    <div className="bg-card rounded-2xl shadow-card p-5 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Avatar author={post.author} size={38} />
        <div>
          <p className="text-sm font-semibold text-primary">{post.author.name}</p>
          <p className="text-xs text-muted">{post.time}</p>
        </div>
      </div>
      <p className="text-sm text-secondary leading-relaxed">{post.text}</p>
      <ReactionBar
        postId={post.id}
        reactions={post.reactions}
        myReacted={myReacted}
        onToggle={onToggleReaction}
      />
      <CommentThread postId={post.id} comments={post.comments} onAdd={onAddComment} />
    </div>
  )
}

function GroupFeed({ group, posts, myReactions, onAddPost, onToggleReaction, onAddComment }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Group header card */}
      <div className="bg-card rounded-2xl shadow-card p-6">
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
            style={{ backgroundColor: group.color }}
          >
            {group.initials}
          </div>
          <div>
            <h2 className="text-base font-bold text-primary">{group.name}</h2>
            <p className="text-xs text-muted mt-0.5">{group.members} members</p>
            <p className="text-sm text-secondary mt-1.5 leading-relaxed max-w-lg">{group.description}</p>
          </div>
        </div>
      </div>

      <PostComposer onSubmit={onAddPost} />

      {posts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          myReacted={myReactions[post.id] ?? new Set()}
          onToggleReaction={onToggleReaction}
          onAddComment={onAddComment}
        />
      ))}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MyGroups() {
  const [selectedId, setSelectedId] = useState(MY_GROUPS[0].id)
  const [feed, setFeed] = useState(INITIAL_FEED)
  const [myReactions, setMyReactions] = useState({})

  const group = MY_GROUPS.find(g => g.id === selectedId)
  const posts = feed[selectedId] ?? []

  function handleAddPost(text) {
    const post = {
      id: _nextId++,
      author: { name: 'You', initials: 'Me', color: '#EDE9F8' },
      text,
      time: 'Just now',
      reactions: { '❤️': 0, '🤗': 0, '💪': 0, '🌟': 0 },
      comments: [],
    }
    setFeed(f => ({ ...f, [selectedId]: [post, ...f[selectedId]] }))
  }

  function handleToggleReaction(postId, emoji) {
    const wasReacted = (myReactions[postId] ?? new Set()).has(emoji)

    setMyReactions(prev => {
      const updated = new Set(prev[postId] ?? [])
      wasReacted ? updated.delete(emoji) : updated.add(emoji)
      return { ...prev, [postId]: updated }
    })

    setFeed(f => ({
      ...f,
      [selectedId]: f[selectedId].map(p =>
        p.id !== postId ? p : {
          ...p,
          reactions: {
            ...p.reactions,
            [emoji]: Math.max(0, (p.reactions[emoji] ?? 0) + (wasReacted ? -1 : 1)),
          },
        }
      ),
    }))
  }

  function handleAddComment(postId, text) {
    const comment = {
      id: _nextId++,
      author: { name: 'You', initials: 'Me', color: '#EDE9F8' },
      text,
      time: 'Just now',
    }
    setFeed(f => ({
      ...f,
      [selectedId]: f[selectedId].map(p =>
        p.id !== postId ? p : { ...p, comments: [...p.comments, comment] }
      ),
    }))
  }

  return (
    <div className="flex flex-col gap-6 pt-2">
      <header className="flex items-center justify-between py-6 flex-shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-primary leading-tight">My Groups</h1>
          <p className="text-sm text-secondary mt-1">Your spaces for shared reflection and support</p>
        </div>
      </header>

      <div className="flex gap-6 items-start">
        {/* Left — group list (sticky) */}
        <div className="w-60 flex-shrink-0 sticky top-6 self-start">
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <p className="text-[11px] font-semibold text-muted uppercase tracking-wider">Joined Groups</p>
            </div>
            {MY_GROUPS.map(g => (
              <GroupListItem
                key={g.id}
                group={g}
                selected={g.id === selectedId}
                onClick={() => setSelectedId(g.id)}
              />
            ))}
          </div>
        </div>

        {/* Right — feed */}
        <div className="flex-1 min-w-0">
          <GroupFeed
            group={group}
            posts={posts}
            myReactions={myReactions}
            onAddPost={handleAddPost}
            onToggleReaction={handleToggleReaction}
            onAddComment={handleAddComment}
          />
        </div>
      </div>
    </div>
  )
}

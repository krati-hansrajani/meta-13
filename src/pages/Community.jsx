import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ── Data ──────────────────────────────────────────────────────────────────────

const FRIENDS = [
  { id: 1, name: 'Connie Hyatt',    initials: 'CH', avatarColor: '#F9A8D4', mutualConnects: 3,  interests: ['Meditation', 'Yoga', 'Art Therapy'],        goal: 'Building daily mindfulness practice', status: 'active' },
  { id: 2, name: 'Carroll Streich', initials: 'CS', avatarColor: '#86EFAC', mutualConnects: 7,  interests: ['Journaling', 'Breathing Exercises'],         goal: 'Managing anxiety better',             status: null },
  { id: 3, name: 'Christy Dare',    initials: 'CD', avatarColor: '#93C5FD', mutualConnects: 5,  interests: ['Running', 'Mindfulness', 'Reading'],         goal: 'Better work-life balance',            status: 'active' },
]

const SENT_REQUESTS = [
  { id: 4, name: 'Tommie Weimann',      initials: 'TW', avatarColor: '#FCD34D', mutualConnects: 18, interests: ['Photography', 'Hiking'],             goal: 'Coping with anxiety',              sentAt: '2 days ago' },
  { id: 5, name: 'Lindsay McLaughlin',  initials: 'LM', avatarColor: '#C4B5FD', mutualConnects: 11, interests: ['Journaling', 'Reading', 'Cooking'],  goal: 'Managing work-life balance',       sentAt: '5 days ago' },
]

const MY_GROUPS = [
  {
    id: 1, name: 'Meditation Beginners', initials: 'MB', iconColor: '#C4B5FD', members: 234, myRole: 'Student',
    description: 'Starting your meditation journey? Join us for daily practices and support.',
    membersList: [
      { id: 1, name: 'Sarah Johnson', initials: 'SJ', avatarColor: '#F9A8D4', role: 'Admin' },
      { id: 2, name: 'Dr. Mike Chen', initials: 'MC', avatarColor: '#86EFAC', role: 'Teacher' },
      { id: 3, name: 'Emma Wilson',   initials: 'EW', avatarColor: '#93C5FD', role: 'Teacher' },
      { id: 4, name: 'You',           initials: 'ME', avatarColor: '#C4B5FD', role: 'Student', isMe: true },
      { id: 5, name: 'Alex Turner',   initials: 'AT', avatarColor: '#FCD34D', role: 'Student' },
      { id: 6, name: 'Priya Nair',    initials: 'PN', avatarColor: '#6EE7B7', role: 'Student' },
    ],
  },
  {
    id: 2, name: 'Anxiety Warriors', initials: 'AW', iconColor: '#F9A8D4', members: 567, myRole: 'Student',
    description: 'A safe space to share experiences and coping strategies for anxiety.',
    membersList: [
      { id: 1, name: 'Dr. Lisa Park',     initials: 'LP', avatarColor: '#F9A8D4', role: 'Admin' },
      { id: 2, name: 'James Rodriguez',   initials: 'JR', avatarColor: '#86EFAC', role: 'Teacher' },
      { id: 3, name: 'You',               initials: 'ME', avatarColor: '#C4B5FD', role: 'Student', isMe: true },
      { id: 4, name: 'Nina Patel',        initials: 'NP', avatarColor: '#FCD34D', role: 'Student' },
      { id: 5, name: 'Sam Liu',           initials: 'SL', avatarColor: '#93C5FD', role: 'Student' },
    ],
  },
]

const SENT_GROUP_REQUESTS = [
  { id: 3, name: 'Sleep Better Together', initials: 'SB', iconColor: '#93C5FD', members: 188, description: 'Share tips and support for improving sleep quality and routines.', sentAt: '1 day ago' },
]

const DISCOVER_PEOPLE = [
  { id: 10, name: 'Avery Chen',   initials: 'AC', avatarColor: '#C4B5FD', mutualConnects: 4, interests: ['Meditation', 'Yoga', 'Breathing'], goal: 'Reduce daily anxiety' },
  { id: 11, name: 'Marcus Reid',  initials: 'MR', avatarColor: '#86EFAC', mutualConnects: 2, interests: ['Journaling', 'Walking'],           goal: 'Build emotional resilience' },
  { id: 12, name: 'Ella Ortiz',   initials: 'EO', avatarColor: '#6EE7B7', mutualConnects: 9, interests: ['Running', 'Mindfulness', 'Art'],   goal: 'Growing through challenges' },
]

const DISCOVER_GROUPS = [
  { id: 4, name: 'Sleep Better Together', initials: 'SB', iconColor: '#93C5FD', members: 188, description: 'Share tips and support for improving sleep quality and routines.' },
  { id: 5, name: 'Mindful Mornings',      initials: 'MM', iconColor: '#6EE7B7', members: 312, description: 'Start your day with intention. Daily morning routines and check-ins.' },
  { id: 6, name: 'Stress-Free Zone',      initials: 'SZ', iconColor: '#FCD34D', members: 445, description: 'Practical strategies and peer support for managing stress at work and home.' },
]

const RECOMMENDED_PEOPLE = [
  { id: 20, name: 'Priya Sharma',  initials: 'PS', avatarColor: '#FCD34D', mutualConnects: 6, interests: ['Meditation', 'Journaling'],         goal: 'Finding inner peace' },
  { id: 21, name: 'Leon Brooks',   initials: 'LB', avatarColor: '#F9A8D4', mutualConnects: 3, interests: ['Yoga', 'Reading', 'Breathing'],      goal: 'Managing stress daily' },
  { id: 22, name: 'Nadia Osei',    initials: 'NO', avatarColor: '#6EE7B7', mutualConnects: 8, interests: ['Running', 'Mindfulness', 'Art'],     goal: 'Building healthy routines' },
]

const RECOMMENDED_GROUPS = [
  { id: 7, name: 'Gratitude Circle',  initials: 'GC', iconColor: '#FCD34D', members: 271, description: 'Daily gratitude practices and positive affirmations for a healthier mindset.' },
  { id: 8, name: 'Burnout Recovery',  initials: 'BR', iconColor: '#F9A8D4', members: 394, description: 'Recover from burnout with community support, rest strategies and gentle habits.' },
  { id: 9, name: 'Calm & Focused',    initials: 'CF', iconColor: '#86EFAC', members: 158, description: 'Techniques for staying calm, improving focus and managing overwhelm at work.' },
]

const ROLE_ORDER = { Admin: 0, Teacher: 1, Student: 2 }
const ROLE_STYLE = {
  Admin:   { bg: '#FEE2E2', color: '#EF4444' },
  Teacher: { bg: '#D1FAE5', color: '#10B981' },
  Student: { bg: '#EDE9F8', color: '#8B9CF4' },
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>
    </svg>
  )
}

function UserPlusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="8.5" cy="7" r="4"/>
      <line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>
    </svg>
  )
}

function MessageIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}

function ChevronIcon({ open }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function SearchBar({ search, setSearch, placeholder }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"><SearchIcon/></span>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={placeholder}
          className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-primary placeholder:text-muted outline-none focus:border-[#8B9CF4] transition-colors"/>
      </div>
      <button type="button"
        className="flex items-center gap-2 bg-card border border-border rounded-xl px-5 py-3 text-sm font-medium text-primary hover:bg-page transition-colors whitespace-nowrap flex-shrink-0">
        <FilterIcon/>
        Filter Results
      </button>
    </div>
  )
}

function InnerTabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ backgroundColor: 'var(--color-page)' }}>
      {tabs.map(tab => (
        <button key={tab.key} type="button" onClick={() => onChange(tab.key)}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
          style={{
            backgroundColor: active === tab.key ? 'var(--color-card)' : 'transparent',
            color: active === tab.key ? 'var(--color-primary)' : 'var(--color-muted)',
            boxShadow: active === tab.key ? 'var(--shadow-card)' : 'none',
          }}>
          {tab.label}
          {tab.count != null && (
            <span className="ml-1.5 text-[11px] font-bold px-1.5 py-0.5 rounded-full"
              style={{
                backgroundColor: active === tab.key ? '#EDE9F8' : 'var(--color-border)',
                color: active === tab.key ? '#8B9CF4' : 'var(--color-muted)',
              }}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

// ── Friend card (existing friend) ─────────────────────────────────────────────

function FriendCard({ person, onMessage }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="relative w-11 h-11 flex-shrink-0">
          <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold text-primary"
            style={{ backgroundColor: person.avatarColor }}>
            {person.initials}
          </div>
          {person.status === 'active' && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2"
              style={{ borderColor: 'var(--color-card)' }}/>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-primary leading-snug">{person.name}</p>
          <p className="text-xs text-muted mt-0.5">{person.mutualConnects} Mutual Connects</p>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-link mb-2">Interests</p>
        <div className="flex flex-wrap gap-1.5">
          {person.interests.map(tag => (
            <span key={tag} className="text-xs text-secondary bg-page px-2.5 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-link mb-1">Goals</p>
        <p className="text-xs text-secondary leading-relaxed">{person.goal}</p>
      </div>
      <button type="button" onClick={onMessage}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium mt-auto transition-opacity hover:opacity-80"
        style={{ backgroundColor: '#EDE9F8', color: '#8B9CF4' }}>
        <MessageIcon/>
        Message
      </button>
    </div>
  )
}

// ── Sent friend request row ───────────────────────────────────────────────────

function SentRequestRow({ person, onCancel }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-page">
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-primary flex-shrink-0"
        style={{ backgroundColor: person.avatarColor }}>
        {person.initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-primary">{person.name}</p>
        <p className="text-xs text-muted mt-0.5">{person.mutualConnects} Mutual Connects · Sent {person.sentAt}</p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {person.interests.map(tag => (
            <span key={tag} className="text-[11px] text-secondary bg-card px-2 py-0.5 rounded-full border border-border">{tag}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-xs text-muted px-2.5 py-1 rounded-full bg-card border border-border font-medium">Pending</span>
        <button type="button" onClick={() => onCancel(person.id)}
          className="text-xs font-semibold px-3 py-2 rounded-lg border transition-colors hover:opacity-80"
          style={{ borderColor: '#FECACA', color: '#EF4444', backgroundColor: '#FEF2F2' }}>
          Cancel
        </button>
      </div>
    </div>
  )
}

// ── My group card with expandable member list ─────────────────────────────────

function MyGroupCard({ group, isExpanded, onToggleExpand }) {
  const sorted = [...group.membersList].sort((a, b) => (ROLE_ORDER[a.role] ?? 3) - (ROLE_ORDER[b.role] ?? 3))
  const rs = ROLE_STYLE[group.myRole]

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-5 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold text-primary flex-shrink-0"
            style={{ backgroundColor: group.iconColor }}>
            {group.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-primary leading-snug">{group.name}</p>
            <p className="text-xs text-muted mt-0.5">{group.members} members</p>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
            style={{ backgroundColor: rs?.bg, color: rs?.color }}>
            {group.myRole}
          </span>
        </div>
        <p className="text-xs text-secondary leading-relaxed">{group.description}</p>
        <button type="button" onClick={onToggleExpand}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
          style={{ backgroundColor: '#EDE9F8', color: '#8B9CF4' }}>
          <UsersIcon/>
          {isExpanded ? 'Hide Members' : 'View Members'}
          <ChevronIcon open={isExpanded}/>
        </button>
      </div>

      {isExpanded && (
        <div className="border-t border-border px-5 pb-5">
          <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mt-4 mb-3">Group Members</p>
          <div className="flex flex-col gap-2.5">
            {sorted.map(m => {
              const rc = ROLE_STYLE[m.role]
              return (
                <div key={m.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-primary flex-shrink-0"
                    style={{ backgroundColor: m.avatarColor }}>
                    {m.initials}
                  </div>
                  <p className={`text-xs font-medium flex-1 min-w-0 truncate ${m.isMe ? 'text-link' : 'text-primary'}`}>
                    {m.name}{m.isMe ? ' (You)' : ''}
                  </p>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: rc?.bg, color: rc?.color }}>
                    {m.role}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Sent group request row ────────────────────────────────────────────────────

function SentGroupRequestRow({ group, onCancel }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-page">
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-primary flex-shrink-0"
        style={{ backgroundColor: group.iconColor }}>
        {group.initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-primary">{group.name}</p>
        <p className="text-xs text-muted mt-0.5">{group.members} members · Requested {group.sentAt}</p>
        <p className="text-xs text-secondary mt-1 leading-relaxed line-clamp-1">{group.description}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-xs text-muted px-2.5 py-1 rounded-full bg-card border border-border font-medium">Pending</span>
        <button type="button" onClick={() => onCancel(group.id)}
          className="text-xs font-semibold px-3 py-2 rounded-lg border transition-opacity hover:opacity-80"
          style={{ borderColor: '#FECACA', color: '#EF4444', backgroundColor: '#FEF2F2' }}>
          Cancel
        </button>
      </div>
    </div>
  )
}

// ── Discover person card ──────────────────────────────────────────────────────

function PersonCard({ person }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold text-primary flex-shrink-0"
          style={{ backgroundColor: person.avatarColor }}>
          {person.initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-primary leading-snug">{person.name}</p>
          <p className="text-xs text-muted mt-0.5">{person.mutualConnects} Mutual Connects</p>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-link mb-2">Interests</p>
        <div className="flex flex-wrap gap-1.5">
          {person.interests.map(tag => (
            <span key={tag} className="text-xs text-secondary bg-page px-2.5 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-link mb-1">Goals</p>
        <p className="text-xs text-secondary leading-relaxed">{person.goal}</p>
      </div>
      <button type="button"
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium mt-auto transition-opacity hover:opacity-80"
        style={{ backgroundColor: '#EDE9F8', color: '#8B9CF4' }}>
        <UserPlusIcon/>
        Connect
      </button>
    </div>
  )
}

// ── Discover group card ───────────────────────────────────────────────────────

function GroupCard({ group }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold text-primary flex-shrink-0"
          style={{ backgroundColor: group.iconColor }}>
          {group.initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-primary leading-snug">{group.name}</p>
          <p className="text-xs text-muted mt-0.5">{group.members} members</p>
        </div>
      </div>
      <div className="flex-1">
        <p className="text-xs font-semibold text-link mb-1">Group Description</p>
        <p className="text-sm text-secondary leading-relaxed">{group.description}</p>
      </div>
      <button type="button"
        className="w-full flex items-center justify-center py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
        style={{ backgroundColor: '#EDE9F8', color: '#8B9CF4' }}>
        Join Group
      </button>
    </div>
  )
}

// ── Friends tab ───────────────────────────────────────────────────────────────

function FriendsTab() {
  const navigate = useNavigate()
  const [search, setSearch]           = useState('')
  const [innerTab, setInnerTab]       = useState('friends')
  const [sentRequests, setSentRequests] = useState(SENT_REQUESTS)

  const filtered = search.trim()
    ? FRIENDS.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.interests.some(i => i.toLowerCase().includes(search.toLowerCase()))
      )
    : FRIENDS

  return (
    <div className="flex flex-col gap-6">
      <SearchBar search={search} setSearch={setSearch} placeholder="Search friends by name or interest…"/>

      <section className="bg-card rounded-2xl shadow-card p-6 flex flex-col gap-5">
        <InnerTabs
          tabs={[
            { key: 'friends',  label: 'My Friends',      count: FRIENDS.length },
            { key: 'requests', label: 'Friend Requests', count: sentRequests.length },
          ]}
          active={innerTab}
          onChange={setInnerTab}
        />

        {innerTab === 'friends' && (
          filtered.length === 0 ? (
            <p className="text-sm text-muted text-center py-10">No friends match your search.</p>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {filtered.map(p => (
                <FriendCard key={p.id} person={p} onMessage={() => navigate('/messages')}/>
              ))}
            </div>
          )
        )}

        {innerTab === 'requests' && (
          sentRequests.length === 0 ? (
            <p className="text-sm text-muted text-center py-10">No pending friend requests.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {sentRequests.map(r => (
                <SentRequestRow key={r.id} person={r} onCancel={id => setSentRequests(prev => prev.filter(x => x.id !== id))}/>
              ))}
            </div>
          )
        )}
      </section>

      <section className="bg-card rounded-2xl shadow-card p-6 flex flex-col gap-5">
        <h2 className="text-base font-bold text-primary">Discover People</h2>
        <div className="grid grid-cols-3 gap-4">
          {DISCOVER_PEOPLE.map(p => <PersonCard key={p.id} person={p}/>)}
        </div>
        <div className="flex justify-center pt-1">
          <button type="button" onClick={() => navigate('/explore-people')} className="text-sm text-secondary hover:text-primary transition-colors font-medium">
            Explore more people →
          </button>
        </div>
      </section>

      <section className="bg-card rounded-2xl shadow-card p-6 flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-primary">Recommended for You</h2>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: '#EDE9F8', color: '#8B9CF4' }}>
            Suggested
          </span>
        </div>
        <p className="text-xs text-muted -mt-2">Based on your interests and wellness goals</p>
        <div className="grid grid-cols-3 gap-4">
          {RECOMMENDED_PEOPLE.map(p => <PersonCard key={p.id} person={p}/>)}
        </div>
      </section>
    </div>
  )
}

// ── Groups tab ────────────────────────────────────────────────────────────────

function GroupsTab() {
  const navigate                                = useNavigate()
  const [search, setSearch]                     = useState('')
  const [innerTab, setInnerTab]                 = useState('groups')
  const [sentGroupRequests, setSentGroupRequests] = useState(SENT_GROUP_REQUESTS)
  const [expandedId, setExpandedId]             = useState(null)

  const filteredGroups = search.trim()
    ? MY_GROUPS.filter(g =>
        g.name.toLowerCase().includes(search.toLowerCase()) ||
        g.description.toLowerCase().includes(search.toLowerCase())
      )
    : MY_GROUPS

  return (
    <div className="flex flex-col gap-6">
      <SearchBar search={search} setSearch={setSearch} placeholder="Search groups by name or topic…"/>

      <section className="bg-card rounded-2xl shadow-card p-6 flex flex-col gap-5">
        <InnerTabs
          tabs={[
            { key: 'groups',   label: 'My Groups',      count: MY_GROUPS.length },
            { key: 'requests', label: 'Group Requests', count: sentGroupRequests.length },
          ]}
          active={innerTab}
          onChange={setInnerTab}
        />

        {innerTab === 'groups' && (
          filteredGroups.length === 0 ? (
            <p className="text-sm text-muted text-center py-10">No groups match your search.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filteredGroups.map(g => (
                <MyGroupCard
                  key={g.id}
                  group={g}
                  isExpanded={expandedId === g.id}
                  onToggleExpand={() => setExpandedId(prev => prev === g.id ? null : g.id)}
                />
              ))}
            </div>
          )
        )}

        {innerTab === 'requests' && (
          sentGroupRequests.length === 0 ? (
            <p className="text-sm text-muted text-center py-10">No pending group requests.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {sentGroupRequests.map(r => (
                <SentGroupRequestRow
                  key={r.id}
                  group={r}
                  onCancel={id => setSentGroupRequests(prev => prev.filter(x => x.id !== id))}
                />
              ))}
            </div>
          )
        )}
      </section>

      <section className="bg-card rounded-2xl shadow-card p-6 flex flex-col gap-5">
        <h2 className="text-base font-bold text-primary">Join a Support Group</h2>
        <div className="grid grid-cols-3 gap-4">
          {DISCOVER_GROUPS.map(g => <GroupCard key={g.id} group={g}/>)}
        </div>
        <div className="flex justify-center pt-1">
          <button type="button" onClick={() => navigate('/explore-groups')} className="text-sm text-secondary hover:text-primary transition-colors font-medium">
            Explore more groups →
          </button>
        </div>
      </section>

      <section className="bg-card rounded-2xl shadow-card p-6 flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-primary">Recommended for You</h2>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: '#EDE9F8', color: '#8B9CF4' }}>
            Suggested
          </span>
        </div>
        <p className="text-xs text-muted -mt-2">Groups that match your wellness journey</p>
        <div className="grid grid-cols-3 gap-4">
          {RECOMMENDED_GROUPS.map(g => <GroupCard key={g.id} group={g}/>)}
        </div>
      </section>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Community() {
  const [mainTab, setMainTab] = useState('friends')

  return (
    <div className="flex flex-col gap-6 pt-2">
      <header className="flex items-center justify-between py-6 flex-shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-primary leading-tight">Community</h1>
          <p className="text-sm text-secondary mt-1">Connect with others on similar wellness journeys</p>
        </div>

        <div className="flex gap-1 p-1 rounded-xl border border-border" style={{ backgroundColor: 'var(--color-card)' }}>
          {[{ key: 'friends', label: 'Friends' }, { key: 'groups', label: 'Groups' }].map(tab => (
            <button key={tab.key} type="button" onClick={() => setMainTab(tab.key)}
              className="px-6 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                backgroundColor: mainTab === tab.key ? 'var(--color-nav-active)' : 'transparent',
                color: mainTab === tab.key ? 'var(--color-on-dark)' : 'var(--color-muted)',
              }}>
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {mainTab === 'friends' ? <FriendsTab/> : <GroupsTab/>}
    </div>
  )
}

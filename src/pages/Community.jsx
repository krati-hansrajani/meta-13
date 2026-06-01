import { useState } from 'react'

// ── Data ──────────────────────────────────────────────────────────────────────

const PEOPLE = [
  {
    id: 1,
    name: 'Connie Hyatt',
    mutualConnects: 3,
    initials: 'CH',
    avatarColor: '#F9A8D4',
    interests: ['Meditation', 'Yoga', 'Art Therapy', 'Running'],
    goal: 'Building daily mindfulness practice',
  },
  {
    id: 2,
    name: 'Lindsay McLaughlin',
    mutualConnects: 11,
    initials: 'LM',
    avatarColor: '#86EFAC',
    interests: ['Journaling', 'Reading', 'Cooking'],
    goal: 'Managing work-life balance',
  },
  {
    id: 3,
    name: 'Tommie Weimann',
    mutualConnects: 18,
    initials: 'TW',
    avatarColor: '#93C5FD',
    interests: ['Photography', 'Hiking'],
    goal: 'Coping with anxiety',
  },
]

const GROUPS = [
  {
    id: 1,
    name: 'Meditation Beginners',
    members: 234,
    initials: 'MB',
    iconColor: '#C4B5FD',
    description: 'Starting your meditation journey? Join us for daily practices and support.',
  },
  {
    id: 2,
    name: 'Anxiety Warriors',
    members: 567,
    initials: 'AW',
    iconColor: '#F9A8D4',
    description: 'A safe space to share experiences and coping strategies for anxiety.',
  },
  {
    id: 3,
    name: 'Sleep Better Together',
    members: 188,
    initials: 'SB',
    iconColor: '#93C5FD',
    description: 'Share tips and support for improving sleep quality and routines.',
  },
]

// ── Icons ─────────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="4"  y1="6"  x2="20" y2="6"  />
      <line x1="8"  y1="12" x2="16" y2="12" />
      <line x1="10" y1="18" x2="14" y2="18" />
    </svg>
  )
}

function UserPlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  )
}

// ── Cards ─────────────────────────────────────────────────────────────────────

function PersonCard({ person }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4">
      {/* Avatar + name */}
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold text-primary flex-shrink-0"
          style={{ backgroundColor: person.avatarColor }}
        >
          {person.initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-primary leading-snug">{person.name}</p>
          <p className="text-xs text-muted mt-0.5">{person.mutualConnects} Mutual Connects</p>
        </div>
      </div>

      {/* Interests */}
      <div>
        <p className="text-xs font-semibold text-link mb-2">Interests</p>
        <div className="flex flex-wrap gap-1.5">
          {person.interests.map(tag => (
            <span
              key={tag}
              className="text-xs text-secondary bg-page px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Goals */}
      <div>
        <p className="text-xs font-semibold text-link mb-1">Goals</p>
        <p className="text-xs text-secondary leading-relaxed">{person.goal}</p>
      </div>

      {/* Connect button */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium mt-auto transition-opacity hover:opacity-80"
        style={{ backgroundColor: '#EDE9F8', color: '#8B9CF4' }}
      >
        <UserPlusIcon />
        Connect
      </button>
    </div>
  )
}

function GroupCard({ group }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4">
      {/* Icon + name */}
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold text-primary flex-shrink-0"
          style={{ backgroundColor: group.iconColor }}
        >
          {group.initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-primary leading-snug">{group.name}</p>
          <p className="text-xs text-muted mt-0.5">{group.members} members</p>
        </div>
      </div>

      {/* Description */}
      <div className="flex-1">
        <p className="text-xs font-semibold text-link mb-1">Group Description</p>
        <p className="text-sm text-secondary leading-relaxed">{group.description}</p>
      </div>

      {/* Join button */}
      <button
        type="button"
        className="w-full flex items-center justify-center py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
        style={{ backgroundColor: '#EDE9F8', color: '#8B9CF4' }}
      >
        Join Group
      </button>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Community() {
  const [search, setSearch] = useState('')

  const filteredPeople = search.trim()
    ? PEOPLE.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.interests.some(i => i.toLowerCase().includes(search.toLowerCase())) ||
        p.goal.toLowerCase().includes(search.toLowerCase())
      )
    : PEOPLE

  return (
    <div className="flex flex-col gap-6 pt-2">

      {/* Page header — same rhythm as Dashboard / Wellness */}
      <header className="flex items-center justify-between py-6 flex-shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-primary leading-tight">
            Discover Your Community
          </h1>
          <p className="text-sm text-secondary mt-1">
            Connect with others on similar wellness journeys
          </p>
        </div>
      </header>

      {/* Search bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by interest, goals or hobbies..."
            className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-primary placeholder:text-muted outline-none focus:border-[#8B9CF4] transition-colors"
          />
        </div>
        <button
          type="button"
          className="flex items-center gap-2 bg-card border border-border rounded-xl px-5 py-3 text-sm font-medium text-primary hover:bg-page transition-colors whitespace-nowrap flex-shrink-0"
        >
          <FilterIcon />
          Filter Results
        </button>
      </div>

      {/* ── Discover People ── */}
      <section className="bg-card rounded-2xl shadow-card p-6 flex flex-col gap-5">
        <h2 className="text-base font-bold text-primary">Discover People</h2>

        {filteredPeople.length === 0 ? (
          <p className="text-sm text-secondary text-center py-8">
            No people match your search.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filteredPeople.map(p => <PersonCard key={p.id} person={p} />)}
          </div>
        )}

        <div className="flex justify-center pt-1">
          <button
            type="button"
            className="text-sm text-secondary hover:text-primary transition-colors font-medium"
          >
            Explore more people →
          </button>
        </div>
      </section>

      {/* ── Join a Support Group ── */}
      <section className="bg-card rounded-2xl shadow-card p-6 flex flex-col gap-5">
        <h2 className="text-base font-bold text-primary">Join a Support Group</h2>

        <div className="grid grid-cols-3 gap-4">
          {GROUPS.map(g => <GroupCard key={g.id} group={g} />)}
        </div>

        <div className="flex justify-center pt-1">
          <button
            type="button"
            className="text-sm text-secondary hover:text-primary transition-colors font-medium"
          >
            Explore more groups →
          </button>
        </div>
      </section>

    </div>
  )
}

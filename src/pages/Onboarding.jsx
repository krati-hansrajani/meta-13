import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TOTAL = 8

// ── Data ──────────────────────────────────────────────────────────────────────

const FEELINGS = [
  { id: 'anxiety',    label: 'Anxiety Support',  emoji: '😰' },
  { id: 'depression', label: 'Depression',        emoji: '💙' },
  { id: 'focus',      label: '#MindFocus',        emoji: '🎯' },
  { id: 'sleep',      label: 'Sleep & Rest',      emoji: '🌙' },
  { id: 'mindful',    label: 'Mindfulness',       emoji: '🧘' },
  { id: 'stress',     label: 'Stress Management', emoji: '🌊' },
]

const HELP_OPTIONS = [
  'Take a short walk outside',
  'Practice a 5-minute meditation',
  'Call or text a friend',
  'Listen to calming music',
  'Do some gentle stretching',
]

const TIMES = [
  { value: 'morning',   label: 'Morning (9:00 AM)' },
  { value: 'afternoon', label: 'Afternoon (12:00 PM)' },
  { value: 'evening',   label: 'Evening (6:00 PM)' },
  { value: 'night',     label: 'Night (9:00 PM)' },
]

const AGE_RANGES = ['Under 18', '18–24', '25–34', '35–44', '45–54', '55+']
const GENDERS    = ['Male', 'Female', 'Non-binary', 'Prefer not to say']

const DEGREES = [
  'High School', 'Some College', "Associate's", "Bachelor's",
  "Master's", 'PhD / Doctoral', 'Trade / Vocational', 'Prefer not to say',
]

const PASSIONS = [
  'Photography', 'Music', 'Writing', 'Reading', 'Hiking',
  'Cooking', 'Art', 'Gaming', 'Fitness', 'Travel',
  'Yoga', 'Meditation', 'Dancing', 'Gardening', 'Volunteering',
]

const COMMUNITY_ROLES = [
  { id: 'mentor',   label: 'Mentor',        desc: 'I can guide and support others',  emoji: '🎓' },
  { id: 'mentee',   label: 'Mentee',        desc: 'I want to learn and grow',         emoji: '🌱' },
  { id: 'both',     label: 'Both',          desc: "I'm open to mentoring and learning",emoji: '🤝' },
]

// ── Shared UI pieces ──────────────────────────────────────────────────────────

function BackArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <polyline points="2 6.5 5 9.5 10 3" stroke="white" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function StepEmoji({ emoji }) {
  return (
    <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 select-none"
         style={{ backgroundColor: '#FDE8F0' }}>
      {emoji}
    </div>
  )
}

function PrimaryBtn({ onClick, disabled = false, label = 'Continue', accent = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full py-3.5 rounded-xl text-sm font-semibold transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
      style={{ backgroundColor: accent ? '#8B9CF4' : '#111827', color: '#fff' }}
    >
      {label}
    </button>
  )
}

function styledInput(extraProps = {}) {
  return {
    className: 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-white',
    style: { transition: 'border-color 0.15s, box-shadow 0.15s' },
    onFocus: e => { e.target.style.borderColor = '#8B9CF4'; e.target.style.boxShadow = '0 0 0 3px rgba(139,156,244,0.18)' },
    onBlur:  e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' },
    ...extraProps,
  }
}

// ── Step 1 — Welcome + Name ───────────────────────────────────────────────────

function Step1({ a, update, onNext }) {
  return (
    <div className="flex flex-col gap-6">
      <StepEmoji emoji="💜" />

      <div className="text-center">
        <h2 className="text-[22px] font-bold text-gray-900 mb-2">Welcome to Meta-Xi</h2>
        <p className="text-sm text-gray-500 leading-relaxed max-w-[280px] mx-auto">
          Let's personalise your wellness journey. This will only take a few minutes.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">What should we call you?</label>
        <input
          type="text"
          value={a.name}
          onChange={e => update('name', e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && a.name.trim()) onNext() }}
          placeholder="Your name"
          autoFocus
          {...styledInput()}
        />
      </div>

      <PrimaryBtn onClick={onNext} disabled={!a.name.trim()} />
    </div>
  )
}

// ── Step 2 — Create Username ──────────────────────────────────────────────────

function Step2({ a, update, onNext }) {
  const [error, setError] = useState('')

  const suggested = a.name.trim()
    ? a.name.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '').slice(0, 18) + '_xi'
    : ''

  function validate() {
    const val = a.username.trim()
    if (val.length < 3) { setError('Username must be at least 3 characters.'); return false }
    if (val.length > 20) { setError('Username can be 20 characters max.'); return false }
    if (!/^[a-zA-Z0-9_]+$/.test(val)) { setError('Only letters, numbers, and underscores.'); return false }
    return true
  }

  function handleNext() {
    if (validate()) onNext()
  }

  return (
    <div className="flex flex-col gap-6">
      <StepEmoji emoji="✏️" />

      <div className="text-center">
        <h2 className="text-[22px] font-bold text-gray-900 mb-2">Create your username</h2>
        <p className="text-sm text-gray-500 leading-relaxed max-w-[280px] mx-auto">
          This is how others in the community will find and recognise you.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Username</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm select-none">@</span>
          <input
            type="text"
            value={a.username}
            onChange={e => { update('username', e.target.value.replace(/\s/g, '_')); setError('') }}
            onKeyDown={e => { if (e.key === 'Enter') handleNext() }}
            placeholder="your_username"
            maxLength={20}
            autoFocus
            {...styledInput({ className: 'w-full border border-gray-200 rounded-xl pl-8 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-white' })}
          />
        </div>
        {error && <p className="text-xs" style={{ color: '#EF4444' }}>{error}</p>}
        <p className="text-xs text-gray-400">Letters, numbers, and underscores · 3–20 characters</p>
      </div>

      {suggested && !a.username && (
        <div className="rounded-xl px-4 py-3 flex items-center justify-between gap-2"
             style={{ backgroundColor: '#EDE9F8' }}>
          <div>
            <p className="text-xs font-medium" style={{ color: '#5B48D9' }}>Suggested</p>
            <p className="text-sm font-semibold" style={{ color: '#5B48D9' }}>@{suggested}</p>
          </div>
          <button
            type="button"
            onClick={() => { update('username', suggested); setError('') }}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg"
            style={{ backgroundColor: '#8B9CF4', color: '#fff' }}
          >
            Use this
          </button>
        </div>
      )}

      <PrimaryBtn onClick={handleNext} disabled={!a.username.trim()} />
    </div>
  )
}

// ── Step 3 — Current Feeling ──────────────────────────────────────────────────

function Step3({ a, toggle, onNext }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-[22px] font-bold text-gray-900 mb-2">How are you feeling right now?</h2>
        <p className="text-sm text-gray-500">Choose the emotion that resonates most</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {FEELINGS.map(f => {
          const on = a.feelings.includes(f.id)
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => toggle('feelings', f.id)}
              className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-left"
              style={{
                border:          `2px solid ${on ? '#8B9CF4' : '#E5E7EB'}`,
                backgroundColor: on ? '#EDE9F8' : '#F9FAFB',
                color:           on ? '#5B48D9' : '#374151',
                transition: 'border-color 0.15s, background-color 0.15s, color 0.15s',
              }}
            >
              <span className="text-xl leading-none">{f.emoji}</span>
              <span className="text-sm font-medium leading-snug">{f.label}</span>
            </button>
          )
        })}
      </div>

      <p className="text-xs text-gray-400 text-center -mt-2">Select all that apply</p>

      <PrimaryBtn onClick={onNext} disabled={a.feelings.length === 0} />
    </div>
  )
}

// ── Step 4 — Journal ──────────────────────────────────────────────────────────

function Step4({ a, update, onNext }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <h2 className="text-[22px] font-bold text-gray-900 mb-2">What's on your mind?</h2>
        <p className="text-sm text-gray-500">Share your thoughts. This is a safe space.</p>
      </div>

      <textarea
        value={a.journal}
        onChange={e => update('journal', e.target.value)}
        placeholder="Write freely… there is no right or wrong answer…"
        rows={5}
        {...styledInput({ className: 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none resize-none leading-relaxed bg-white' })}
      />

      <div className="rounded-xl px-4 py-3 flex items-start gap-2.5" style={{ backgroundColor: '#EDE9F8' }}>
        <span className="text-base leading-none mt-0.5">💡</span>
        <p className="text-xs leading-relaxed" style={{ color: '#6B5CE7' }}>
          Tip: Journaling can help you process emotions and gain clarity about your feelings.
        </p>
      </div>

      <PrimaryBtn onClick={onNext} />
    </div>
  )
}

// ── Step 5 — Help Options ─────────────────────────────────────────────────────

function Step5({ a, toggle, onNext }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-[22px] font-bold text-gray-900 mb-2">
          What would you need help with right now?
        </h2>
        <p className="text-sm text-gray-500">Select what feels right for this moment</p>
      </div>

      <div className="flex flex-col gap-2.5">
        {HELP_OPTIONS.map(opt => {
          const on = a.helpWith.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle('helpWith', opt)}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-left"
              style={{
                border:          `1.5px solid ${on ? '#8B9CF4' : '#E5E7EB'}`,
                backgroundColor: on ? '#EDE9F8' : '#F9FAFB',
                transition: 'border-color 0.15s, background-color 0.15s',
              }}
            >
              <div
                className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                style={{
                  border:          `2px solid ${on ? '#8B9CF4' : '#D1D5DB'}`,
                  backgroundColor: on ? '#8B9CF4' : 'transparent',
                  transition: 'border-color 0.15s, background-color 0.15s',
                }}
              >
                {on && <CheckIcon />}
              </div>
              <span className="text-sm text-gray-700">{opt}</span>
            </button>
          )
        })}
      </div>

      <PrimaryBtn onClick={onNext} disabled={a.helpWith.length === 0} />
    </div>
  )
}

// ── Step 6 — Check-in Reminder ────────────────────────────────────────────────

function Step6({ a, update, onNext }) {
  return (
    <div className="flex flex-col gap-6">
      <StepEmoji emoji="🔔" />

      <div className="text-center">
        <h2 className="text-[22px] font-bold text-gray-900 mb-2">When do you want to check in?</h2>
        <p className="text-sm text-gray-500">Set a daily reminder to log your mental state</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Preferred Time</label>
        <div className="relative">
          <select
            value={a.reminderTime}
            onChange={e => update('reminderTime', e.target.value)}
            className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none bg-white cursor-pointer"
            style={{ transition: 'border-color 0.15s' }}
          >
            {TIMES.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
               width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>

      <div className="flex items-center justify-between py-3.5 px-4 rounded-xl bg-gray-50 border border-gray-200">
        <span className="text-sm text-gray-700 select-none">Send me daily reminders</span>
        <button
          type="button"
          onClick={() => update('dailyReminders', !a.dailyReminders)}
          className="relative w-11 h-6 rounded-full flex-shrink-0"
          style={{ backgroundColor: a.dailyReminders ? '#8B9CF4' : '#D1D5DB', transition: 'background-color 0.2s' }}
        >
          <span
            className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
            style={{ left: a.dailyReminders ? '22px' : '2px', transition: 'left 0.2s' }}
          />
        </button>
      </div>

      <PrimaryBtn onClick={onNext} />
    </div>
  )
}

// ── Step 7 — Demographics ─────────────────────────────────────────────────────

function Step7({ a, update, onNext }) {
  return (
    <div className="flex flex-col gap-6">
      <StepEmoji emoji="✨" />

      <div className="text-center">
        <h2 className="text-[22px] font-bold text-gray-900 mb-2">A little about you</h2>
        <p className="text-sm text-gray-500 leading-relaxed max-w-[280px] mx-auto">
          Help us personalise your wellness experience just for you.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Age Range</label>
        <div className="grid grid-cols-3 gap-2">
          {AGE_RANGES.map(age => {
            const on = a.ageRange === age
            return (
              <button key={age} type="button" onClick={() => update('ageRange', age)}
                className="py-2.5 rounded-xl text-sm font-medium"
                style={{
                  border:          `2px solid ${on ? '#8B9CF4' : '#E5E7EB'}`,
                  backgroundColor: on ? '#EDE9F8' : '#F9FAFB',
                  color:           on ? '#5B48D9' : '#374151',
                  transition: 'border-color 0.15s, background-color 0.15s, color 0.15s',
                }}
              >
                {age}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Gender</label>
        <div className="grid grid-cols-2 gap-2">
          {GENDERS.map(g => {
            const on = a.gender === g
            return (
              <button key={g} type="button" onClick={() => update('gender', g)}
                className="py-2.5 px-3 rounded-xl text-sm font-medium"
                style={{
                  border:          `2px solid ${on ? '#8B9CF4' : '#E5E7EB'}`,
                  backgroundColor: on ? '#EDE9F8' : '#F9FAFB',
                  color:           on ? '#5B48D9' : '#374151',
                  transition: 'border-color 0.15s, background-color 0.15s, color 0.15s',
                }}
              >
                {g}
              </button>
            )
          })}
        </div>
      </div>

      <PrimaryBtn onClick={onNext} />
    </div>
  )
}

// ── Step 8 — Background & Community Role ─────────────────────────────────────

function Step8({ a, update, toggle, onNext }) {
  return (
    <div className="flex flex-col gap-6">
      <StepEmoji emoji="🌟" />

      <div className="text-center">
        <h2 className="text-[22px] font-bold text-gray-900 mb-2">Your background &amp; passions</h2>
        <p className="text-sm text-gray-500 leading-relaxed max-w-[280px] mx-auto">
          Help us match you with the right people and groups.
        </p>
      </div>

      {/* Degree */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Highest Education</label>
        <div className="relative">
          <select
            value={a.degree}
            onChange={e => update('degree', e.target.value)}
            className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none bg-white cursor-pointer"
            style={{ transition: 'border-color 0.15s' }}
          >
            <option value="">Select your degree…</option>
            {DEGREES.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
               width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>

      {/* Passions / Hobbies */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Passions &amp; Hobbies</label>
        <p className="text-xs text-gray-400 -mt-1">Select all that apply</p>
        <div className="flex flex-wrap gap-2">
          {PASSIONS.map(p => {
            const on = a.passions.includes(p)
            return (
              <button
                key={p}
                type="button"
                onClick={() => toggle('passions', p)}
                className="px-3 py-1.5 rounded-xl text-sm font-medium"
                style={{
                  border:          `2px solid ${on ? '#8B9CF4' : '#E5E7EB'}`,
                  backgroundColor: on ? '#EDE9F8' : '#F9FAFB',
                  color:           on ? '#5B48D9' : '#374151',
                  transition: 'border-color 0.15s, background-color 0.15s, color 0.15s',
                }}
              >
                {p}
              </button>
            )
          })}
        </div>
      </div>

      {/* Community Role */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Community Role</label>
        <div className="flex flex-col gap-2">
          {COMMUNITY_ROLES.map(r => {
            const on = a.communityRole === r.id
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => update('communityRole', r.id)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left"
                style={{
                  border:          `2px solid ${on ? '#8B9CF4' : '#E5E7EB'}`,
                  backgroundColor: on ? '#EDE9F8' : '#F9FAFB',
                  transition: 'border-color 0.15s, background-color 0.15s',
                }}
              >
                <span className="text-xl leading-none">{r.emoji}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold" style={{ color: on ? '#5B48D9' : '#374151' }}>
                    {r.label}
                  </p>
                  <p className="text-xs" style={{ color: on ? '#6B5CE7' : '#9CA3AF' }}>{r.desc}</p>
                </div>
                {on && (
                  <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                       style={{ backgroundColor: '#8B9CF4' }}>
                    <CheckIcon />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <PrimaryBtn
        onClick={onNext}
        label="Let's Get Started 🎉"
        accent
      />
    </div>
  )
}

// ── Main Onboarding page ──────────────────────────────────────────────────────

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep]       = useState(1)
  const [answers, setAnswers] = useState({
    name:           '',
    username:       '',
    feelings:       [],
    journal:        '',
    helpWith:       [],
    reminderTime:   'morning',
    dailyReminders: true,
    ageRange:       '',
    gender:         '',
    degree:         '',
    passions:       [],
    communityRole:  '',
  })

  function update(key, value) {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  function toggle(key, value) {
    setAnswers(prev => {
      const arr = prev[key]
      return { ...prev, [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] }
    })
  }

  function next() {
    if (step < TOTAL) setStep(s => s + 1)
    else navigate('/dashboard')
  }

  function back() {
    if (step > 1) setStep(s => s - 1)
    else navigate('/')
  }

  const stepContent = [
    <Step1 key="s1" a={answers} update={update} onNext={next} />,
    <Step2 key="s2" a={answers} update={update} onNext={next} />,
    <Step3 key="s3" a={answers} toggle={toggle} onNext={next} />,
    <Step4 key="s4" a={answers} update={update} onNext={next} />,
    <Step5 key="s5" a={answers} toggle={toggle} onNext={next} />,
    <Step6 key="s6" a={answers} update={update} onNext={next} />,
    <Step7 key="s7" a={answers} update={update} onNext={next} />,
    <Step8 key="s8" a={answers} update={update} toggle={toggle} onNext={next} />,
  ]

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8F7FF' }}>

      {/* Top header */}
      <div className="flex-shrink-0 px-5 pt-6">
        <div className="max-w-lg mx-auto">

          <div className="flex items-center gap-2 mb-1">
            <button
              type="button"
              onClick={back}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 rounded-lg px-1 py-1 -ml-1 flex-shrink-0"
              style={{ transition: 'color 0.15s' }}
            >
              <BackArrowIcon />
              <span className="font-medium">Back</span>
            </button>

            <div className="flex-1 text-center">
              <p className="text-sm font-semibold text-gray-800">Mental Check-In</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Take a moment for yourself</p>
            </div>

            <div style={{ width: 52 }} />
          </div>

          <p className="text-[11px] text-gray-400 text-center mb-3">
            Step {step} of {TOTAL}
          </p>

          <div className="flex gap-1.5 mb-8">
            {Array.from({ length: TOTAL }, (_, i) => (
              <div
                key={i}
                className="flex-1 h-1.5 rounded-full"
                style={{
                  backgroundColor: i < step ? '#8B9CF4' : '#E5E7EB',
                  transition: 'background-color 0.35s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Step card */}
      <div className="flex-1 flex items-start justify-center px-4 pb-12">
        <div
          key={step}
          className="bg-white rounded-3xl w-full max-w-lg p-8"
          style={{
            boxShadow: '0 4px 24px rgba(139,156,244,0.12), 0 1px 6px rgba(0,0,0,0.06)',
            animation: 'stepIn 0.28s ease-out both',
          }}
        >
          {stepContent[step - 1]}
        </div>
      </div>
    </div>
  )
}

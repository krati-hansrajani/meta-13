import { useNavigate } from 'react-router-dom'
import metaLogo from '../assets/meta_logo.png'

// ── Icons ─────────────────────────────────────────────────────────────────────

function TrackIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  )
}

function UnderstandIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )
}

function TakeActionIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}

function TrackingIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  )
}

function ActionItemsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4"/>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  )
}

function AIIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    </svg>
  )
}

function PeersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}

function TimelineIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10"/>
      <line x1="18" y1="20" x2="18" y2="4"/>
      <line x1="6"  y1="20" x2="6"  y2="16"/>
    </svg>
  )
}

function MoodIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
      <line x1="9" y1="9" x2="9.01" y2="9"/>
      <line x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>
  )
}

// ── Section components ────────────────────────────────────────────────────────

function Navbar({ onGetStarted }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <img src={metaLogo} alt="Meta-Xi" className="h-8 w-auto object-contain" />

        <div className="hidden md:flex items-center gap-8">
          {['Features', 'How It Works', 'About'].map(label => (
            <a key={label} href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">
              {label}
            </a>
          ))}
          <a
            href="#"
            onClick={e => { e.preventDefault(); onGetStarted() }}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            Login
          </a>
        </div>

        <button
          type="button"
          onClick={onGetStarted}
          className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors"
        >
          Get Started
        </button>
      </div>
    </nav>
  )
}

function HeroSection({ onGetStarted }) {
  return (
    <section className="pt-16 min-h-screen flex items-center bg-white">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row items-center gap-12 py-20">
          {/* Left content */}
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Your Space To<br />
              Reflect, Heal,<br />
              And Grow!
            </h1>
            <p className="text-base text-gray-500 leading-relaxed max-w-md">
              Track your mental well-being, get personalized insights, and build better habits—at your own pace.
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={onGetStarted}
                className="text-sm font-semibold px-6 py-3 rounded-xl border-2 border-gray-900 text-gray-900 hover:bg-gray-50 transition-colors"
              >
                See How It Works
              </button>
              <button
                type="button"
                onClick={onGetStarted}
                className="text-sm font-semibold px-6 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors"
              >
                Start Your Journey
              </button>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <div className="flex -space-x-2">
                {['#C4B5FD', '#93C5FD', '#6EE7B7'].map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {['A', 'B', 'C'][i]}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 font-medium">
                Join thousands building a better mind space
              </p>
            </div>
          </div>

          {/* Right — Group 31 hero image */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-full max-w-[420px]">
              <img
                src="/Group 31.png"
                alt="Mental wellness — meditate and reflect"
                className="w-full h-auto object-contain"
                style={{ borderRadius: '24px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const steps = [
    {
      icon: <TrackIcon />,
      iconBg: '#EDE9F8',
      iconColor: '#8B9CF4',
      title: 'Track',
      desc: 'Log your thoughts, moods, and daily experiences in just a few taps.',
    },
    {
      icon: <UnderstandIcon />,
      iconBg: '#D1FAE5',
      iconColor: '#34D399',
      title: 'Understand',
      desc: 'Get personalized insights and patterns about your mental well-being.',
    },
    {
      icon: <TakeActionIcon />,
      iconBg: '#FEF3C7',
      iconColor: '#F59E0B',
      title: 'Take Action',
      desc: 'Build better habits with guided exercises and actionable steps.',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">How It Works?</h2>
          <p className="text-gray-500 text-sm">Simple steps to start your mental wellness journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map(step => (
            <div key={step.title} className="bg-white rounded-2xl p-8 flex flex-col items-center text-center gap-4 shadow-sm">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: step.iconBg, color: step.iconColor }}
              >
                {step.icon}
              </div>
              <h3 className="text-base font-semibold text-gray-900">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Exact replicas of the real dashboard widgets ──────────────────────────────

const X_START = 75, X_END = 500, Y_TOP = 25, Y_BTM = 145
const rnd = n => parseFloat(n.toFixed(1))

function buildPaths(values) {
  const n = values.length
  const xStep = (X_END - X_START) / (n - 1)
  const yRange = Y_BTM - Y_TOP
  const pts = values.map((v, i) => ({ x: X_START + i * xStep, y: Y_BTM - v * yRange }))
  const head = { x: 2 * pts[0].x - pts[1].x, y: 2 * pts[0].y - pts[1].y }
  const tail = { x: 2 * pts[n-1].x - pts[n-2].x, y: 2 * pts[n-1].y - pts[n-2].y }
  const ext = [head, ...pts, tail]
  let curves = ''
  for (let i = 0; i < n - 1; i++) {
    const [p0, p1, p2, p3] = [ext[i], ext[i+1], ext[i+2], ext[i+3]]
    const cp1x = p1.x + (p2.x - p0.x) / 6, cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6, cp2y = p2.y - (p3.y - p1.y) / 6
    curves += ` C ${rnd(cp1x)} ${rnd(cp1y)},${rnd(cp2x)} ${rnd(cp2y)},${rnd(p2.x)} ${rnd(p2.y)}`
  }
  const line = `M ${rnd(pts[0].x)} ${rnd(pts[0].y)}${curves}`
  const area = `M ${rnd(pts[0].x)} ${Y_BTM} L ${rnd(pts[0].x)} ${rnd(pts[0].y)}${curves} L ${rnd(pts[n-1].x)} ${Y_BTM} Z`
  return { line, area, xPositions: pts.map(p => rnd(p.x)) }
}

function MoodTrendsPreview() {
  const values = [0.50, 0.30, 0.85, 0.55, 0.35, 0.75, 0.90]
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const { line, area, xPositions } = buildPaths(values)

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-gray-800">Mood Trends</h3>
        <span className="text-[10px] text-gray-400 border border-gray-200 rounded-lg px-2 py-0.5">Weekly ▾</span>
      </div>
      <p className="text-[10px] text-gray-400 mb-2">Here's your mental stability over this week</p>

      <svg viewBox="0 0 520 175" width="100%" aria-hidden="true">
        <defs>
          <linearGradient id="lpAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#F5C6D8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F5C6D8" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <text x="68" y="29"  textAnchor="end" fontSize="10" fill="#9CA3AF">Stable</text>
        <text x="68" y="89"  textAnchor="end" fontSize="10" fill="#9CA3AF">Moderate</text>
        <text x="68" y="149" textAnchor="end" fontSize="10" fill="#9CA3AF">Struggling</text>
        <line x1="75" y1="25"  x2="505" y2="25"  stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="75" y1="85"  x2="505" y2="85"  stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="75" y1="145" x2="505" y2="145" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 4" />
        <path d={area} fill="url(#lpAreaGrad)" />
        <path d={line} fill="none" stroke="#8B9CF4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {labels.map((lbl, i) => (
          <text key={lbl} x={xPositions[i]} y="170" textAnchor="middle" fontSize="10" fill="#9CA3AF">{lbl}</text>
        ))}
      </svg>

      <div className="mt-2 bg-[#EDE9F8] rounded-xl px-3 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-start gap-2 min-w-0">
          <svg className="mt-0.5 flex-shrink-0 text-[#8B9CF4]" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p className="text-[10px] text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-800">Weekly Insight</span>
            {' — '}Your stability is <span className="font-medium text-gray-800">improving</span> over the last 3 days. Great job! 🎉
          </p>
        </div>
        <span className="text-[10px] text-blue-500 font-medium whitespace-nowrap flex-shrink-0">View Analytics →</span>
      </div>
    </div>
  )
}

function TodaysActionsPreview() {
  const items = [
    { id: 1, label: 'Your overall mental stability', done: true,  priority: 'medium' },
    { id: 2, label: 'Practice breathing exercise',   done: true,  priority: 'high'   },
    { id: 3, label: 'Write a journal',               done: false, priority: 'medium' },
    { id: 4, label: 'Limit social media (30 mins)',  done: false, priority: 'low'    },
  ]
  const PRIORITY = {
    high:   { label: 'High',   bg: '#FEE2E2', color: '#EF4444' },
    medium: { label: 'Medium', bg: '#FEF3C7', color: '#F59E0B' },
    low:    { label: 'Low',    bg: '#D1FAE5', color: '#10B981' },
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col">
      <h3 className="text-sm font-semibold text-gray-800 mb-4">Today's Actions</h3>
      <ul className="flex flex-col gap-3 flex-1">
        {items.map(item => {
          const p = PRIORITY[item.priority]
          return (
            <li key={item.id} className="flex items-center gap-3">
              <span className={`flex-shrink-0 ${item.done ? 'text-[#00C9B1]' : 'text-gray-300'}`}>
                {item.done ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="9"/>
                  </svg>
                )}
              </span>
              <span className={`text-xs flex-1 leading-snug ${item.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {item.label}
              </span>
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: p.bg, color: p.color }}
              >
                {p.label}
              </span>
            </li>
          )
        })}
      </ul>
      <button type="button" className="mt-4 self-start text-[11px] text-blue-500 font-medium">
        + Add New Action Item
      </button>
    </div>
  )
}

function DashboardPreviewSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Simple, Intuitive Dashboard</h2>
          <p className="text-gray-500 text-sm">Everything you need to understand and improve your mental well-being in one place.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <MoodTrendsPreview />
          <TodaysActionsPreview />
        </div>
      </div>
    </section>
  )
}

function CTASection({ onGetStarted }) {
  return (
    <section className="py-20" style={{ background: 'linear-gradient(135deg, #EDE9F8 0%, #E0E7FF 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl font-bold text-gray-900 leading-tight">
          Start Building A<br />Better Mental Space Today
        </h2>
        <p className="text-gray-600 text-sm max-w-md">
          Join thousands on their journey to better mental well-being.
        </p>
        <button
          type="button"
          onClick={onGetStarted}
          className="text-sm font-semibold px-8 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors"
        >
          Get Started
        </button>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: <TrackingIcon />,
      iconBg: '#EDE9F8',
      iconColor: '#8B9CF4',
      title: 'Mental Health Tracking',
      desc: 'Visualize your emotional journey with beautiful, easy-to-read graphs and insights.',
    },
    {
      icon: <ActionItemsIcon />,
      iconBg: '#D1FAE5',
      iconColor: '#34D399',
      title: 'Action Items',
      desc: 'Get personalized daily tasks designed to improve your mental well-being.',
    },
    {
      icon: <AIIcon />,
      iconBg: '#DBEAFE',
      iconColor: '#60A5FA',
      title: 'AI Guidance',
      desc: 'Get thoughtful, evidence-based recommendations tailored to you.',
    },
    {
      icon: <PeersIcon />,
      iconBg: '#FEF3C7',
      iconColor: '#F59E0B',
      title: 'Connect With Peers',
      desc: 'Join a supportive community on similar wellness journeys.',
    },
    {
      icon: <TimelineIcon />,
      iconBg: '#FCE7F3',
      iconColor: '#EC4899',
      title: 'Timeline & Goals',
      desc: 'Set meaningful goals and track your progress over time.',
    },
    {
      icon: <MoodIcon />,
      iconBg: '#F0FDF4',
      iconColor: '#16A34A',
      title: 'Daily Mood Check-In',
      desc: 'A quick 30-second check-in to keep your wellness journey on track.',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Everything You Need</h2>
          <p className="text-gray-500 text-sm">Comprehensive tools designed for your mental wellness journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(feat => (
            <div key={feat.title} className="rounded-2xl p-6 flex flex-col gap-3 bg-gray-50">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: feat.iconBg, color: feat.iconColor }}
              >
                {feat.icon}
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{feat.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">
        <div className="flex items-center gap-8">
          {['About', 'Privacy', 'Terms', 'Contact'].map(label => (
            <a key={label} href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              {label}
            </a>
          ))}
        </div>
        <p className="text-xs text-gray-500">© 2026 Meta-Xi. All rights reserved.</p>
      </div>
    </footer>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const navigate = useNavigate()

  function goToDashboard() {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onGetStarted={goToDashboard} />
      <HeroSection onGetStarted={goToDashboard} />
      <HowItWorksSection />
      <DashboardPreviewSection />
      <CTASection onGetStarted={goToDashboard} />
      <FeaturesSection />
      <Footer />
    </div>
  )
}

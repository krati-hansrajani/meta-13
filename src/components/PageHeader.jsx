import { useNavigate } from 'react-router-dom'

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
)

export default function PageHeader() {
  const navigate = useNavigate()

  return (
    <header className="flex items-center justify-between py-6 flex-shrink-0">
      <div>
        <h1 className="text-3xl font-bold text-primary leading-tight">Welcome back!</h1>
        <p className="text-sm text-secondary mt-1">Here's how you have been doing.</p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/notifications')}
          className="relative p-2 text-primary hover:bg-page rounded-lg transition-colors"
        >
          <BellIcon />
          <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-unread text-white text-[10px] font-semibold flex items-center justify-center leading-none">
            2
          </span>
        </button>
        <div className="w-10 h-10 rounded-full bg-purple flex items-center justify-center text-sm font-semibold text-primary flex-shrink-0">
          KH
        </div>
      </div>
    </header>
  )
}

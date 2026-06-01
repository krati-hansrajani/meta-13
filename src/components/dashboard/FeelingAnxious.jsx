import { useState } from 'react'
import BreathingModal from './BreathingModal'

export default function FeelingAnxious() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="bg-card rounded-2xl p-6 shadow-card flex flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-primary leading-snug">Feeling Anxious?</h2>
            <p className="text-xs text-secondary mt-1.5 leading-relaxed max-w-[180px]">
              Let's start a breather &amp; deep things down together
            </p>
          </div>
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-insight flex items-center justify-center text-2xl select-none">
            🧘
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-5 w-full py-3 rounded-xl bg-teal text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Start Grounding Exercise
        </button>
      </div>

      {open && <BreathingModal onClose={() => setOpen(false)} />}
    </>
  )
}

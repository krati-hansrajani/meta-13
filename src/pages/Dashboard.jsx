import MentalStability from '../components/dashboard/MentalStability'
import FeelingAnxious from '../components/dashboard/FeelingAnxious'
import ActionItems from '../components/dashboard/ActionItems'
import RecentTimeline from '../components/dashboard/RecentTimeline'
import RecentChats from '../components/dashboard/RecentChats'
import PageHeader from '../components/PageHeader'

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 pt-2">
      <PageHeader />

      {/* Top row: Mental Stability (left) + Feeling Anxious / Action Items (right) */}
      <div className="grid gap-6" style={{ gridTemplateColumns: '3fr 2fr' }}>
        <MentalStability />
        <div className="flex flex-col gap-6">
          <FeelingAnxious />
          <ActionItems />
        </div>
      </div>

      {/* Bottom row: Recent Timeline + Recent Chats */}
      <div className="grid grid-cols-2 gap-6">
        <RecentTimeline />
        <RecentChats />
      </div>
    </div>
  )
}

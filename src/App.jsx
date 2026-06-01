import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Wellness from './pages/Wellness'
import Notifications from './pages/Notifications'
import Community from './pages/Community'
import Messages from './pages/Messages'
import Settings from './pages/Settings'
import MyGroups from './pages/MyGroups'
import LandingPage from './pages/LandingPage'

function AppWithLayout() {
  return (
    <Layout>
      <Routes>
        <Route path="/dashboard"     element={<Dashboard />}     />
        <Route path="/wellness"      element={<Wellness />}      />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/community"     element={<Community />}     />
        <Route path="/my-groups"     element={<MyGroups />}     />
        <Route path="/messages"      element={<Messages />}      />
        <Route path="/settings"      element={<Settings />}      />
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/"   element={<LandingPage />} />
      <Route path="/*"  element={<AppWithLayout />} />
    </Routes>
  )
}

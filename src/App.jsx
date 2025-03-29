import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { NotificationProvider } from './context/NotificationContext'
import Navbar from './components/Navbar'
import DashboardLayout from './components/DashboardLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Apply from './pages/Apply'
import Invest from './pages/Invest'
import HowItWorks from './pages/HowItWorks'
import SuccessStories from './pages/SuccessStories'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import Investments from './pages/dashboard/Investments'
import Wallet from './pages/dashboard/Wallet'
import Transactions from './pages/dashboard/Transactions'
import Opportunities from './pages/dashboard/Opportunities'
import Documents from './pages/dashboard/Documents'
import Analytics from './pages/dashboard/Analytics'
import Notifications from './pages/dashboard/Notifications'
import Settings from './pages/dashboard/Settings'
import Help from './pages/dashboard/Help'
import ApplyLoan from './pages/dashboard/ApplyLoan'
import AIsupport from './pages/AIsupport'
import Vapiapply from './pages/dashboard/VapiApply'

function App() {
  const isDashboardRoute = (pathname) => pathname.startsWith('/dashboard');

  return (
    <NotificationProvider>
      <div className="min-h-screen">
        {!isDashboardRoute(window.location.pathname) && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/invest" element={<Invest />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/dashboard/investments" element={<DashboardLayout><Investments /></DashboardLayout>} />
          <Route path="/dashboard/wallet" element={<DashboardLayout><Wallet /></DashboardLayout>} />
          <Route path="/dashboard/transactions" element={<DashboardLayout><Transactions /></DashboardLayout>} />
          <Route path="/dashboard/opportunities" element={<DashboardLayout><Opportunities /></DashboardLayout>} />
          <Route path="/dashboard/documents" element={<DashboardLayout><Documents /></DashboardLayout>} />
          <Route path="/dashboard/analytics" element={<DashboardLayout><Analytics /></DashboardLayout>} />
          <Route path="/dashboard/apply" element={<DashboardLayout><ApplyLoan /></DashboardLayout>} />
          <Route path="/dashboard/vapi-apply" element={<DashboardLayout><Vapiapply /></DashboardLayout>} />
          <Route path="/dashboard/ai-support" element={<DashboardLayout><AIsupport /></DashboardLayout>} />
          <Route path="/dashboard/notifications" element={<DashboardLayout><Notifications /></DashboardLayout>} />
          <Route path="/dashboard/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
          <Route path="/dashboard/help" element={<DashboardLayout><Help /></DashboardLayout>} />
        </Routes>
      </div>
    </NotificationProvider>
  )
}

export default App
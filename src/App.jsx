import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import RoleRoute from './components/RoleRoute.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { SocketProvider } from './context/SocketContext.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import Impact from './pages/Impact.jsx'
import Landing from './pages/Landing.jsx'
import MissionVision from './pages/MissionVision.jsx'
import Login from './pages/auth/Login.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import OTPVerification from './pages/auth/OTPVerification.jsx'
import ResetPassword from './pages/auth/ResetPassword.jsx'
import RegisterAcceptor from './pages/auth/RegisterAcceptor.jsx'
import RegisterDonor from './pages/auth/RegisterDonor.jsx'
import RegisterVolunteer from './pages/auth/RegisterVolunteer.jsx'
import AcceptorDashboard from './pages/acceptor/AcceptorDashboard.jsx'
import BrowseFood from './pages/acceptor/BrowseFood.jsx'
import RequestHistory from './pages/acceptor/RequestHistory.jsx'
import AcceptorProfile from './pages/acceptor/AcceptorProfile.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import DonorDashboard from './pages/donor/DonorDashboard.jsx'
import DonationHistory from './pages/donor/DonationHistory.jsx'
import DonorProfile from './pages/donor/DonorProfile.jsx'
import PostDonation from './pages/donor/PostDonation.jsx'
import AssignedPickups from './pages/volunteer/AssignedPickups.jsx'
import OTPScanner from './pages/volunteer/OTPScanner.jsx'
import RouteMap from './pages/volunteer/RouteMap.jsx'
import VolunteerDashboard from './pages/volunteer/VolunteerDashboard.jsx'
import VolunteerProfile from './pages/volunteer/VolunteerProfile.jsx'

export default function App() {
  const location = useLocation()

  return (
    <AuthProvider>
      <SocketProvider>
        <div className="min-h-screen bg-bg text-text-dark">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/mission-vision" element={<MissionVision />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/register/donor" element={<RegisterDonor />} />
              <Route path="/register/acceptor" element={<RegisterAcceptor />} />
              <Route path="/register/volunteer" element={<RegisterVolunteer />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-otp" element={<OTPVerification />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              <Route element={<ProtectedRoute />}>
                <Route element={<RoleRoute role="donor" />}>
                  <Route path="/donor/dashboard" element={<DonorDashboard />} />
                  <Route path="/donor/post" element={<PostDonation />} />
                  <Route path="/donor/history" element={<DonationHistory />} />
                  <Route path="/donor/profile" element={<DonorProfile />} />
                </Route>

                <Route element={<RoleRoute role="acceptor" />}>
                  <Route
                    path="/acceptor/dashboard"
                    element={<AcceptorDashboard />}
                  />
                  <Route path="/acceptor/browse" element={<BrowseFood />} />
                  <Route path="/acceptor/requests" element={<RequestHistory />} />
                  <Route path="/acceptor/profile" element={<AcceptorProfile />} />
                </Route>

                <Route element={<RoleRoute role="volunteer" />}>
                  <Route
                    path="/volunteer/dashboard"
                    element={<VolunteerDashboard />}
                  />
                  <Route
                    path="/volunteer/pickups"
                    element={<AssignedPickups />}
                  />
                  <Route path="/volunteer/otp" element={<OTPScanner />} />
                  <Route path="/volunteer/route" element={<RouteMap />} />
                  <Route
                    path="/volunteer/profile"
                    element={<VolunteerProfile />}
                  />
                </Route>

                <Route element={<RoleRoute role="admin" />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Route>
              </Route>
            </Routes>
          </AnimatePresence>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                borderRadius: 16,
                background: '#ffffff',
                color: '#1C1917',
                boxShadow: '0 12px 30px rgba(28,25,23,0.12)',
              },
            }}
          />
        </div>
      </SocketProvider>
    </AuthProvider>
  )
}

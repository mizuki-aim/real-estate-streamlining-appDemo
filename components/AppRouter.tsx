import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import LoginPage from '../pages/LoginPage'
import DashboardPage from '../pages/DashboardPage'
import PropertiesPage from '../pages/PropertiesPage'
import PropertyDetailPage from '../pages/PropertyDetailPage'
import SendLinkPage from '../pages/SendLinkPage'
import PhotoUploadPage from '../pages/PhotoUploadPage'
import ReportPage from '../pages/ReportPage'
import BiddingPage from '../pages/BiddingPage'

// Simple auth check (replace with your actual auth logic)
const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true'
}

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />
}

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        } />
        <Route path="/properties" element={
          <PrivateRoute>
            <PropertiesPage />
          </PrivateRoute>
        } />
        <Route path="/properties/:id" element={
          <PrivateRoute>
            <PropertyDetailPage />
          </PrivateRoute>
        } />
        <Route path="/send-link" element={
          <PrivateRoute>
            <SendLinkPage />
          </PrivateRoute>
        } />
        <Route path="/photo-upload" element={
          <PrivateRoute>
            <PhotoUploadPage />
          </PrivateRoute>
        } />
        <Route path="/report/:id" element={
          <PrivateRoute>
            <ReportPage />
          </PrivateRoute>
        } />
        <Route path="/bidding" element={
          <PrivateRoute>
            <BiddingPage />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </Router>
  )
}


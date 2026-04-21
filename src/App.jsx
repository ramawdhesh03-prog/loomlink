import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ManufacturerRegister from './pages/ManufacturerRegister'
import WholesalerRegister from './pages/WholesalerRegister'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Login from './pages/Login.jsx'
import ManufacturerDashboard from './pages/ManufacturerDashboard'
import WholesalerDashboard from './pages/WholesalerDashboard'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: 'transparent', color: '#1A1A2E', fontFamily: "'Mukta', sans-serif" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manufacturer" element={<ManufacturerRegister />} />
          <Route path="/wholesaler" element={<WholesalerRegister />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manufacturer-dashboard" element={<ManufacturerDashboard />} />
          <Route path="/wholesaler-dashboard" element={<WholesalerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
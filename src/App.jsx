import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ManufacturerRegister from './pages/ManufacturerRegister'
import WholesalerRegister from './pages/WholesalerRegister'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#F8F9FC', color: '#1A1A2E', fontFamily: "'Mukta', sans-serif" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manufacturer" element={<ManufacturerRegister />} />
          <Route path="/wholesaler" element={<WholesalerRegister />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
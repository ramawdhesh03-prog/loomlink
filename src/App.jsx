import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ManufacturerRegister from './pages/ManufacturerRegister'
import WholesalerRegister from './pages/WholesalerRegister'

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#FAF7F2', color: '#2D2D2D', fontFamily: "'Mukta', sans-serif" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manufacturer" element={<ManufacturerRegister />} />
          <Route path="/wholesaler" element={<WholesalerRegister />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

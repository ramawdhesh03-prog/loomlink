import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/loomlink_logo_transparent.png'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'hi' ? 'en' : 'hi')
  }

  return (
    <nav style={{
      background: '#FFFFFF',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '68px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      borderBottom: '1px solid #F0F0F0',
    }}>

      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="LoomLink" style={{ height: '95px', width: 'auto' }} />
      </Link>

      {/* Desktop Links */}
      <div style={{
        display: 'flex', gap: '32px', alignItems: 'center',
        '@media (max-width: 768px)': { display: 'none' }
      }} className="desktop-nav">
        <Link to="/about" style={{ color: '#1A1A2E', textDecoration: 'none', fontSize: '0.95rem', fontFamily: "'Mukta', sans-serif", fontWeight: 500 }}>About Us</Link>
        <Link to="/contact" style={{ color: '#1A1A2E', textDecoration: 'none', fontSize: '0.95rem', fontFamily: "'Mukta', sans-serif", fontWeight: 500 }}>Contact Us</Link>
        <button onClick={toggleLang} style={{
          background: 'rgba(232,130,26,0.15)', border: '1px solid #E8821A',
          borderRadius: '20px', padding: '4px 14px', cursor: 'pointer',
          color: '#E8821A', fontSize: '0.85rem', fontFamily: "'Mukta', sans-serif", fontWeight: 600,
        }}>
          {i18n.language === 'hi' ? 'EN' : 'हिं'}
        </button>
        <Link to="/login" style={{
          background: '#1B3A6B', color: '#fff', padding: '8px 22px',
          borderRadius: '6px', fontWeight: 600, fontSize: '0.95rem',
          textDecoration: 'none', fontFamily: "'Mukta', sans-serif",
        }}>Login</Link>
      </div>

      {/* Mobile Right Side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="mobile-nav">
        <button onClick={toggleLang} style={{
          background: 'rgba(232,130,26,0.15)', border: '1px solid #E8821A',
          borderRadius: '20px', padding: '4px 12px', cursor: 'pointer',
          color: '#E8821A', fontSize: '0.8rem', fontFamily: "'Mukta', sans-serif", fontWeight: 600,
        }}>
          {i18n.language === 'hi' ? 'EN' : 'हिं'}
        </button>

        {/* Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '8px', display: 'flex', flexDirection: 'column',
            gap: '5px', justifyContent: 'center', alignItems: 'center'
          }}
        >
          <div style={{ width: '24px', height: '2px', background: '#1B3A6B', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <div style={{ width: '24px', height: '2px', background: '#1B3A6B', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
          <div style={{ width: '24px', height: '2px', background: '#1B3A6B', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '68px', left: 0, right: 0,
          background: '#fff', boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '4px',
          zIndex: 99, borderBottom: '2px solid #F0F0F0'
        }}>
          <Link to="/about" onClick={() => setMenuOpen(false)} style={{
            color: '#1A1A2E', textDecoration: 'none', fontSize: '1rem',
            fontFamily: "'Mukta', sans-serif", fontWeight: 500,
            padding: '12px 0', borderBottom: '1px solid #f0f0f0'
          }}>📄 About Us</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} style={{
            color: '#1A1A2E', textDecoration: 'none', fontSize: '1rem',
            fontFamily: "'Mukta', sans-serif", fontWeight: 500,
            padding: '12px 0', borderBottom: '1px solid #f0f0f0'
          }}>📞 Contact Us</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)} style={{
            background: '#1B3A6B', color: '#fff', padding: '12px 24px',
            borderRadius: '8px', fontWeight: 600, fontSize: '1rem',
            textDecoration: 'none', fontFamily: "'Mukta', sans-serif",
            textAlign: 'center', marginTop: '8px', display: 'block'
          }}>🔐 Login</Link>
        </div>
      )}

      {/* CSS for responsive */}
      <style>{`
        .mobile-nav { display: none !important; }
        .desktop-nav { display: flex !important; }
        @media (max-width: 768px) {
          .mobile-nav { display: flex !important; }
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
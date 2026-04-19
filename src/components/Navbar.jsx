import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/loomlink_logo_1.png'

const styles = {
  nav: {
    background: '#FFFFFF',
    padding: '0 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '68px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    borderBottom: '1px solid #F0F0F0',
  },
  logoArea: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  links: {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
  },
  link: {
    color: '#1A1A2E',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontFamily: "'Mukta', sans-serif",
    fontWeight: 500,
    transition: 'color 0.2s',
  },
  loginBtn: {
    background: '#1B3A6B',
    color: '#fff',
    padding: '8px 22px',
    borderRadius: '6px',
    fontWeight: 600,
    fontSize: '0.95rem',
    textDecoration: 'none',
    fontFamily: "'Mukta', sans-serif",
    transition: 'all 0.2s',
  },
  toggleBtn: {
    background: 'rgba(232,130,26,0.15)',
    border: '1px solid #E8821A',
    borderRadius: '20px',
    padding: '4px 14px',
    cursor: 'pointer',
    color: '#E8821A',
    fontSize: '0.85rem',
    fontFamily: "'Mukta', sans-serif",
    fontWeight: 600,
    transition: 'all 0.2s',
  },
}

export default function Navbar() {
  const { t, i18n } = useTranslation()

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'hi' ? 'en' : 'hi')
  }

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logoArea}>
        <img
          src={logo}
          alt="LoomLink"
          style={{ height: '42px', width: 'auto' }}
        />
      </Link>
      <div style={styles.links}>
        <Link to="/about" style={styles.link}>About Us</Link>
        <Link to="/contact" style={styles.link}>Contact Us</Link>
        <button onClick={toggleLang} style={styles.toggleBtn}>
          {i18n.language === 'hi' ? 'EN' : 'हिं'}
        </button>
        <Link to="/login" style={styles.loginBtn}>Login</Link>
      </div>
    </nav>
  )
}
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const styles = {
  nav: {
    background: '#8B1A1A',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 12px rgba(139,26,26,0.3)',
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.6rem',
    fontWeight: 700,
    color: '#C9A84C',
    textDecoration: 'none',
    letterSpacing: '1px',
  },
  links: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  link: {
    color: '#FAF7F2',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontFamily: "'Mukta', sans-serif",
    fontWeight: 500,
    transition: 'color 0.2s',
  },
  toggleBtn: {
    background: 'rgba(201,168,76,0.2)',
    border: '1px solid #C9A84C',
    borderRadius: '20px',
    padding: '4px 14px',
    cursor: 'pointer',
    color: '#C9A84C',
    fontSize: '0.85rem',
    fontFamily: "'Mukta', sans-serif",
    fontWeight: 600,
    transition: 'all 0.2s',
    marginLeft: '16px',
  },
  mobileMenu: {
    display: 'none',
  }
}

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'hi' ? 'en' : 'hi')
  }

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>LoomLink</Link>
      <div style={styles.links}>
        <Link to="/manufacturer" style={styles.link}>{t('nav.manufacturer')}</Link>
        <Link to="/wholesaler" style={styles.link}>{t('nav.wholesaler')}</Link>
        <button onClick={toggleLang} style={styles.toggleBtn}>
          {i18n.language === 'hi' ? 'EN' : 'हिं'}
        </button>
      </div>
    </nav>
  )
}

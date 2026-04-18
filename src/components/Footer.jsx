import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer style={{
      background: '#2D2D2D',
      color: '#FAF7F2',
      padding: '48px 24px 24px',
      marginTop: '80px',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px', marginBottom: '40px' }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#C9A84C', fontWeight: 700, marginBottom: '8px' }}>
              LoomLink
            </div>
            <p style={{ color: '#aaa', maxWidth: '280px', lineHeight: 1.6, fontSize: '0.95rem' }}>
              {t('footer.tagline')}
            </p>
          </div>
          <div>
            <div style={{ color: '#C9A84C', fontWeight: 600, marginBottom: '12px', fontSize: '1rem' }}>Quick Links</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/manufacturer" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.9rem' }}>Manufacturer Registration</Link>
              <Link to="/wholesaler" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.9rem' }}>Wholesaler Registration</Link>
            </div>
          </div>
          <div>
            <div style={{ color: '#C9A84C', fontWeight: 600, marginBottom: '12px', fontSize: '1rem' }}>Contact</div>
            <p style={{ color: '#ccc', fontSize: '0.9rem' }}>{t('footer.contact')}</p>
            <p style={{ color: '#ccc', fontSize: '0.9rem', marginTop: '6px' }}>loomlink.in</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #444', paddingTop: '20px', textAlign: 'center', color: '#888', fontSize: '0.85rem' }}>
          {t('footer.rights')}
        </div>
      </div>
    </footer>
  )
}

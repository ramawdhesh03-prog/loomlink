import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function Home() {
  const { t } = useTranslation()

  return (
    <main>
      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg, #8B1A1A 0%, #6B1414 50%, #4A0E0E 100%)',
        padding: '100px 24px 120px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative background pattern */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.05,
          backgroundImage: 'repeating-linear-gradient(45deg, #C9A84C 0px, #C9A84C 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }} />

        <div style={{ position: 'relative', maxWidth: '720px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(201,168,76,0.15)',
            border: '1px solid rgba(201,168,76,0.4)',
            borderRadius: '30px',
            padding: '6px 20px',
            color: '#C9A84C',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '1.5px',
            marginBottom: '24px',
            textTransform: 'uppercase',
          }}>
            B2B Saree Marketplace
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.4rem, 6vw, 4rem)',
            color: '#FAF7F2',
            margin: '0 0 8px',
            lineHeight: 1.2,
          }}>
            {t('hero.tagline')}
          </h1>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: '#C9A84C',
            margin: '0 0 24px',
            fontWeight: 600,
          }}>
            {t('hero.subtagline')}
          </h2>
          <p style={{
            color: 'rgba(250,247,242,0.8)',
            fontSize: '1.1rem',
            lineHeight: 1.7,
            marginBottom: '48px',
            maxWidth: '560px',
            margin: '0 auto 48px',
          }}>
            {t('hero.description')}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/manufacturer" style={{
              background: '#C9A84C',
              color: '#2D2D2D',
              padding: '16px 36px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '1rem',
              textDecoration: 'none',
              fontFamily: "'Mukta', sans-serif",
              transition: 'all 0.2s',
              boxShadow: '0 4px 20px rgba(201,168,76,0.4)',
            }}>
              🏭 {t('hero.btn_manufacturer')}
            </Link>
            <Link to="/wholesaler" style={{
              background: 'transparent',
              color: '#FAF7F2',
              padding: '16px 36px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '1rem',
              textDecoration: 'none',
              fontFamily: "'Mukta', sans-serif",
              border: '2px solid rgba(250,247,242,0.5)',
              transition: 'all 0.2s',
            }}>
              🛍️ {t('hero.btn_wholesaler')}
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
          color: '#8B1A1A',
          textAlign: 'center',
          marginBottom: '56px',
        }}>
          {t('how.title')}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
          {[
            { num: '01', title: t('how.step1_title'), desc: t('how.step1_desc'), icon: '📝' },
            { num: '02', title: t('how.step2_title'), desc: t('how.step2_desc'), icon: '🤝' },
            { num: '03', title: t('how.step3_title'), desc: t('how.step3_desc'), icon: '💰' },
          ].map(step => (
            <div key={step.num} style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '36px 28px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
              border: '1px solid rgba(139,26,26,0.08)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: '-16px', right: '-8px',
                fontFamily: "'Playfair Display', serif",
                fontSize: '5rem', fontWeight: 700,
                color: 'rgba(139,26,26,0.05)',
                lineHeight: 1,
              }}>{step.num}</div>
              <div style={{ fontSize: '2.4rem', marginBottom: '16px' }}>{step.icon}</div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.3rem', color: '#8B1A1A',
                marginBottom: '10px',
              }}>{step.title}</h3>
              <p style={{ color: '#555', lineHeight: 1.7, fontSize: '0.97rem' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY LOOMLINK */}
      <section style={{
        background: 'linear-gradient(180deg, #FAF7F2 0%, #F3EDE3 100%)',
        padding: '80px 24px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
            color: '#8B1A1A',
            textAlign: 'center',
            marginBottom: '56px',
          }}>
            {t('why.title')}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            {[
              { title: t('why.p1_title'), desc: t('why.p1_desc'), icon: '🚫', color: '#8B1A1A' },
              { title: t('why.p2_title'), desc: t('why.p2_desc'), icon: '📍', color: '#C9A84C' },
              { title: t('why.p3_title'), desc: t('why.p3_desc'), icon: '✅', color: '#2D7A4A' },
            ].map(point => (
              <div key={point.title} style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '36px 28px',
                borderTop: `4px solid ${point.color}`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '14px' }}>{point.icon}</div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.25rem',
                  color: '#2D2D2D',
                  marginBottom: '10px',
                }}>{point.title}</h3>
                <p style={{ color: '#666', lineHeight: 1.7, fontSize: '0.97rem' }}>{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BOTTOM */}
      <section style={{
        background: '#8B1A1A',
        padding: '64px 24px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          color: '#FAF7F2',
          marginBottom: '12px',
        }}>
          Abhi join karo — Free Registration
        </h2>
        <p style={{ color: 'rgba(250,247,242,0.7)', marginBottom: '36px', fontSize: '1rem' }}>
          Surat, Varanasi manufacturers aur UP/Bihar/Gujarat wholesalers — sab ek platform pe
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/manufacturer" style={{
            background: '#C9A84C', color: '#2D2D2D',
            padding: '14px 32px', borderRadius: '8px',
            fontWeight: 700, fontSize: '1rem',
            textDecoration: 'none', fontFamily: "'Mukta', sans-serif",
          }}>
            Manufacturer Register →
          </Link>
          <Link to="/wholesaler" style={{
            background: 'transparent', color: '#FAF7F2',
            padding: '14px 32px', borderRadius: '8px',
            fontWeight: 700, fontSize: '1rem',
            textDecoration: 'none', fontFamily: "'Mukta', sans-serif",
            border: '2px solid rgba(250,247,242,0.4)',
          }}>
            Wholesaler Register →
          </Link>
        </div>
      </section>
    </main>
  )
}

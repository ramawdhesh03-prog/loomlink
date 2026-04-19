import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import saree1 from '../assets/saree1.png'
import saree2 from '../assets/saree2.png'
import saree3 from '../assets/saree3.png'
import saree4 from '../assets/saree4.png'
import saree5 from '../assets/saree5.png'
import saree6 from '../assets/saree6.png'
import saree7 from '../assets/saree7.png'
import saree8 from '../assets/saree8.png'

const sareeImages = [saree1, saree2, saree3, saree4, saree5, saree6, saree7, saree8]

export default function Home() {
  const { t } = useTranslation()
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % sareeImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main>
      {/* HERO */}
      <section style={{
        position: 'relative',
        padding: '120px 24px 140px',
        textAlign: 'center',
        overflow: 'hidden',
        minHeight: '600px',
      }}>
        {sareeImages.map((img, index) => (
          <div key={index} style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: index === currentImage ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
          }} />
        ))}

        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(27,58,107,0.82) 0%, rgba(15,32,64,0.88) 100%)',
        }} />

        <div style={{ position: 'relative', maxWidth: '720px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(232,130,26,0.2)',
            border: '1px solid rgba(232,130,26,0.5)',
            borderRadius: '30px',
            padding: '6px 20px',
            color: '#F5A623',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '1.5px',
            marginBottom: '24px',
            textTransform: 'uppercase',
          }}>
            India ka #1 B2B Saree Marketplace
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.4rem, 6vw, 4rem)',
            color: '#FFFFFF',
            margin: '0 0 8px',
            lineHeight: 1.2,
          }}>
            Manufacturer se Seedha
          </h1>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: '#F5A623',
            margin: '0 0 24px',
            fontWeight: 600,
          }}>
            Bina Beech Wale Ke
          </h2>

          <p style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '1.1rem',
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto 48px',
          }}>
            India ke verified manufacturers se directly connect karein UP, Bihar aur Gujarat ke wholesalers se — koi commission nahi, koi middleman nahi
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/manufacturer" style={{
              background: '#E8821A',
              color: '#fff',
              padding: '16px 36px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '1rem',
              textDecoration: 'none',
              fontFamily: "'Mukta', sans-serif",
              boxShadow: '0 4px 20px rgba(232,130,26,0.4)',
            }}>
              🏭 Main Manufacturer Hoon
            </Link>
            <Link to="/wholesaler" style={{
              background: 'transparent',
              color: '#FFFFFF',
              padding: '16px 36px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '1rem',
              textDecoration: 'none',
              fontFamily: "'Mukta', sans-serif",
              border: '2px solid rgba(255,255,255,0.6)',
            }}>
              🛍️ Main Wholesaler Hoon
            </Link>
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '40px' }}>
            {sareeImages.map((_, index) => (
              <div key={index} onClick={() => setCurrentImage(index)} style={{
                width: index === currentImage ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: index === currentImage ? '#F5A623' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section style={{ background: '#1B3A6B', padding: '32px 24px' }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto',
          display: 'flex', justifyContent: 'center',
          gap: '48px', flexWrap: 'wrap',
        }}>
          {[
            { num: '500+', label: 'Manufacturers' },
            { num: '1000+', label: 'Wholesalers' },
            { num: '20+', label: 'Cities' },
            { num: '100%', label: 'Free Registration' },
          ].map(item => (
            <div key={item.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2rem', fontWeight: 700,
                color: '#F5A623',
              }}>{item.num}</div>
              <div style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '0.9rem',
                fontFamily: "'Mukta', sans-serif",
              }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
          color: '#1B3A6B',
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
              border: '1px solid rgba(27,58,107,0.08)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: '-16px', right: '-8px',
                fontFamily: "'Playfair Display', serif",
                fontSize: '5rem', fontWeight: 700,
                color: 'rgba(27,58,107,0.05)',
                lineHeight: 1,
              }}>{step.num}</div>
              <div style={{ fontSize: '2.4rem', marginBottom: '16px' }}>{step.icon}</div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.3rem', color: '#1B3A6B',
                marginBottom: '10px',
              }}>{step.title}</h3>
              <p style={{ color: '#555', lineHeight: 1.7, fontSize: '0.97rem' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY LOOMLINK */}
      <section style={{
        background: 'linear-gradient(180deg, #F8F9FC 0%, #EEF2F8 100%)',
        padding: '80px 24px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
            color: '#1B3A6B',
            textAlign: 'center',
            marginBottom: '56px',
          }}>
            {t('why.title')}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            {[
              { title: t('why.p1_title'), desc: t('why.p1_desc'), icon: '🚫', color: '#1B3A6B' },
              { title: t('why.p2_title'), desc: t('why.p2_desc'), icon: '📍', color: '#E8821A' },
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
        background: '#1B3A6B',
        padding: '64px 24px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          color: '#FAF7F2',
          marginBottom: '12px',
        }}>
          Abhi Join Karo — Free Registration
        </h2>
        <p style={{ color: 'rgba(250,247,242,0.7)', marginBottom: '36px', fontSize: '1rem' }}>
          Surat, Varanasi ke manufacturers aur UP/Bihar/Gujarat ke wholesalers — sab ek platform pe
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/manufacturer" style={{
            background: '#E8821A', color: '#fff',
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
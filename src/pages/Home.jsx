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
        {/* Slideshow Background */}
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

        {/* Dark Blue Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(27,58,107,0.82) 0%, rgba(15,32,64,0.88) 100%)',
        }} />

        {/* Content */}
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
            Surat aur Varanasi ke manufacturers directly connect karein UP, Bihar aur Gujarat ke wholesalers se — koi commission nahi, koi middleman nahi
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
              fontS
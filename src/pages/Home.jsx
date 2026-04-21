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
import review1 from '../assets/review1.png'
import review2 from '../assets/review2.png'
import review3 from '../assets/review3.png'

const sareeImages = [saree1, saree2, saree3, saree4, saree5, saree6, saree7, saree8]

const listings = [
  { name: 'Shri Ram Silk House', cityEn: 'Varanasi, UP', cityHi: 'वाराणसी, UP', type: 'Banarasi', tagsEn: ['Pure Silk', 'Zari Work'], tagsHi: ['शुद्ध सिल्क', 'जरी वर्क'], price: '₹1,200 – ₹4,500', moqEn: 'MOQ: 10 pcs', moqHi: 'MOQ: 10 पीस', wa: '919999999901', img: saree1 },
  { name: 'Surat Saree Palace', cityEn: 'Surat, Gujarat', cityHi: 'सूरत, Gujarat', type: 'Georgette', tagsEn: ['Georgette', 'Embroidery'], tagsHi: ['जॉर्जेट', 'एम्ब्रॉयडरी'], price: '₹450 – ₹1,800', moqEn: 'MOQ: 20 pcs', moqHi: 'MOQ: 20 पीस', wa: '919999999902', img: saree2 },
  { name: 'Lakshmi Textiles', cityEn: 'Varanasi, UP', cityHi: 'वाराणसी, UP', type: 'Kanjivaram', tagsEn: ['Silk', 'Temple Border'], tagsHi: ['सिल्क', 'टेम्पल बॉर्डर'], price: '₹2,500 – ₹8,000', moqEn: 'MOQ: 5 pcs', moqHi: 'MOQ: 5 पीस', wa: '919999999903', img: saree3 },
  { name: 'Rajdhani Fabrics', cityEn: 'Ahmedabad, Gujarat', cityHi: 'अहमदाबाद, Gujarat', type: 'Cotton', tagsEn: ['Cotton', 'Block Print'], tagsHi: ['कॉटन', 'ब्लॉक प्रिंट'], price: '₹280 – ₹750', moqEn: 'MOQ: 50 pcs', moqHi: 'MOQ: 50 पीस', wa: '919999999904', img: saree4 },
  { name: 'Madhya Silk Weavers', cityEn: 'Chanderi, MP', cityHi: 'चंदेरी, MP', type: 'Chanderi', tagsEn: ['Chanderi', 'Gold Border'], tagsHi: ['चंदेरी', 'गोल्ड बॉर्डर'], price: '₹800 – ₹2,200', moqEn: 'MOQ: 15 pcs', moqHi: 'MOQ: 15 पीस', wa: '919999999905', img: saree5 },
  { name: 'Bengal Loom Co.', cityEn: 'Kolkata, WB', cityHi: 'कोलकाता, WB', type: 'Linen', tagsEn: ['Linen', 'Handwoven'], tagsHi: ['लिनन', 'हैंडवोवन'], price: '₹600 – ₹1,500', moqEn: 'MOQ: 25 pcs', moqHi: 'MOQ: 25 पीस', wa: '919999999906', img: saree6 },
]

const testimonials = [
  {
    nameEn: 'Ramesh Gupta', nameHi: 'रमेश गुप्ता',
    roleEn: 'Saree Manufacturer, Varanasi', roleHi: 'साड़ी निर्माता, वाराणसी',
    quoteEn: 'LoomLink ne mera business completely badal diya. Pehle sirf local buyers the, ab Rajasthan aur Gujarat se bhi orders aa rahe hain. Koi commission nahi, seedha deal!',
    quoteHi: 'LoomLink ने मेरा बिज़नेस पूरी तरह बदल दिया। पहले सिर्फ लोकल buyers थे, अब राजस्थान और गुजरात से भी orders आ रहे हैं। कोई कमीशन नहीं, सीधी डील!',
    stars: 5,
    img: review1,
    badge: '⭐ Verified Manufacturer',
  },
  {
    nameEn: 'Sunita Devi', nameHi: 'सुनीता देवी',
    roleEn: 'Wholesaler, Lucknow, UP', roleHi: 'थोक विक्रेता, लखनऊ, UP',
    quoteEn: 'Pehle manufacturer dhundhne mein bahut time lagta tha. LoomLink se seedha Surat aur Varanasi ke manufacturers se WhatsApp pe baat karte hain. Margin bhi badh gayi!',
    quoteHi: 'पहले manufacturer ढूंढने में बहुत time लगता था। LoomLink से सीधे सूरत और वाराणसी के manufacturers से WhatsApp पे बात करते हैं। Margin भी बढ़ गई!',
    stars: 5,
    img: review2,
    badge: '✅ Verified Wholesaler',
  },
  {
    nameEn: 'Mohd. Arif Khan', nameHi: 'मो. आरिफ खान',
    roleEn: 'Banarasi Weaver, Azamgarh', roleHi: 'बनारसी बुनकर, आजमगढ़',
    quoteEn: 'Hamare jaisa chhota weaver pehle sirf local market pe depend karta tha. Ab LoomLink se Bihar aur Gujarat tak sarees pahunch rahi hain. Bahut achha platform hai!',
    quoteHi: 'हमारे जैसा छोटा बुनकर पहले सिर्फ local market पे depend करता था। अब LoomLink से Bihar और Gujarat तक साड़ियाँ पहुँच रही हैं। बहुत अच्छा platform है!',
    stars: 5,
    img: review3,
    badge: '🏭 Verified Weaver',
  },
  
export default function Home() {
  const { t, i18n } = useTranslation()
  const [currentImage, setCurrentImage] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const isHindi = i18n.language === 'hi'

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % sareeImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const t2 = testimonials[currentTestimonial]

  return (
    <main style={{ margin: 0, padding: 0, overflowX: 'hidden' }}>

      {/* MARQUEE TICKER */}
      <div style={{
        background: '#1B3A6B',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        padding: '10px 0',
        borderBottom: '2px solid #F5A623',
      }}>
        <div style={{
          display: 'inline-block',
          animation: 'marquee 30s linear infinite',
          color: '#FAF7F2',
          fontSize: '0.85rem',
          fontFamily: "'Mukta', sans-serif",
          fontWeight: 500,
        }}>
          {[
            '🏭 200+ Verified Manufacturers',
            '📍 Varanasi • Surat • Kolkata • Azamgarh • Mau • Bhagalpur • Purvi Champaran • Chanderi • Ahmedabad',
            '✅ Zero Commission',
            '🛍️ Free Registration',
            '⚡ Direct WhatsApp Connection',
            '💰 Better Margins, No Middlemen',
            '🏭 200+ Verified Manufacturers',
            '📍 Varanasi • Surat • Kolkata • Azamgarh • Mau • Bhagalpur • Purvi Champaran • Chanderi • Ahmedabad',
            '✅ Zero Commission',
            '🛍️ Free Registration',
            '⚡ Direct WhatsApp Connection',
            '💰 Better Margins, No Middlemen',
          ].join('   |   ')}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(100vw); }
            100% { transform: translateX(-100%); }
          }
        `}</style>
      </div>

      {/* HERO */}
      <section style={{
        position: 'relative',
        padding: '120px 24px 140px',
        textAlign: 'center',
        overflow: 'hidden',
        minHeight: '600px',
        width: '100%',
        boxSizing: 'border-box',
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
          background: 'linear-gradient(to right, rgba(15,32,64,0.93) 0%, rgba(15,32,64,0.90) 35%, rgba(27,58,107,0.45) 68%, rgba(27,58,107,0.12) 100%)',
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
            {isHindi ? 'भारत का #1 B2B साड़ी मार्केटप्लेस' : "India's #1 B2B Saree Marketplace"}
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.4rem, 6vw, 4rem)',
            color: '#FFFFFF',
            margin: '0 0 8px',
            lineHeight: 1.2,
          }}>
            {isHindi ? 'निर्माता से सीधा' : 'Direct from Manufacturer'}
          </h1>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: '#F5A623',
            margin: '0 0 24px',
            fontWeight: 600,
          }}>
            {isHindi ? 'बिना बीच वाले के' : 'No Middlemen'}
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '1.1rem',
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto 48px',
          }}>
            {isHindi
              ? 'भारत के वेरिफाइड निर्माताओं से UP, Bihar और Gujarat के थोक विक्रेताओं से सीधे जुड़ें — कोई कमीशन नहीं, कोई बिचौलिया नहीं'
              : 'Connect directly with verified manufacturers across India — no commission, no middlemen, better margins'}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/manufacturer" style={{
              background: '#E8821A', color: '#fff',
              padding: '16px 36px', borderRadius: '8px',
              fontWeight: 700, fontSize: '1rem',
              textDecoration: 'none', fontFamily: "'Mukta', sans-serif",
              boxShadow: '0 4px 20px rgba(232,130,26,0.4)',
            }}>
              {isHindi ? '🏭 मैं निर्माता हूँ' : '🏭 I am a Manufacturer'}
            </Link>
            <Link to="/wholesaler" style={{
              background: 'transparent', color: '#FFFFFF',
              padding: '16px 36px', borderRadius: '8px',
              fontWeight: 700, fontSize: '1rem',
              textDecoration: 'none', fontFamily: "'Mukta', sans-serif",
              border: '2px solid rgba(255,255,255,0.6)',
            }}>
              {isHindi ? '🛍️ मैं थोक विक्रेता हूँ' : '🛍️ I am a Wholesaler'}
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '40px' }}>
            {sareeImages.map((_, index) => (
              <div key={index} onClick={() => setCurrentImage(index)} style={{
                width: index === currentImage ? '24px' : '8px',
                height: '8px', borderRadius: '4px',
                background: index === currentImage ? '#F5A623' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer', transition: 'all 0.3s',
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section style={{ background: '#1B3A6B', padding: '32px 24px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto',
          display: 'flex', justifyContent: 'center',
          gap: '48px', flexWrap: 'wrap',
        }}>
          {[
            { num: '200+', label: isHindi ? 'निर्माता' : 'Manufacturers' },
            { num: '1000+', label: isHindi ? 'थोक विक्रेता' : 'Wholesalers' },
            { num: '15+', label: isHindi ? 'शहर' : 'Cities' },
            { num: '100%', label: isHindi ? 'मुफ्त रजिस्ट्रेशन' : 'Free Registration' },
          ].map(item => (
            <div key={item.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2rem', fontWeight: 700, color: '#F5A623',
              }}>{item.num}</div>
              <div style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '0.9rem', fontFamily: "'Mukta', sans-serif",
              }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section style={{ padding: '80px 24px', background: '#FAF7F2', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
            color: '#1B3A6B', textAlign: 'center', marginBottom: '8px',
          }}>
            {t('listings.title')}
          </h2>
          <p style={{
            textAlign: 'center', color: '#666',
            fontSize: '1rem', marginBottom: '48px',
            fontFamily: "'Mukta', sans-serif",
          }}>
            {t('listings.subtitle')}
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px', marginBottom: '40px',
          }}>
            {listings.map(item => (
              <div
                key={item.name}
                style={{
                  background: '#fff', borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
                  border: '1px solid rgba(27,58,107,0.08)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <img src={item.img} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '18px 20px' }}>
                  <span style={{
                    display: 'inline-block',
                    background: 'rgba(232,130,26,0.12)',
                    color: '#E8821A', fontSize: '0.75rem',
                    fontWeight: 600, padding: '3px 10px',
                    borderRadius: '20px', marginBottom: '10px',
                    fontFamily: "'Mukta', sans-serif",
                  }}>{item.type}</span>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#1B3A6B', fontWeight: 700, marginBottom: '4px' }}>{item.name}</div>
                  <div style={{ color: '#888', fontSize: '0.85rem', marginBottom: '10px', fontFamily: "'Mukta', sans-serif" }}>📍 {isHindi ? item.cityHi : item.cityEn}</div>
                  <div style={{ marginBottom: '10px' }}>
                    {(isHindi ? item.tagsHi : item.tagsEn).map(tag => (
                      <span key={tag} style={{ display: 'inline-block', background: '#EEF2F8', color: '#1B3A6B', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px', marginRight: '4px', fontFamily: "'Mukta', sans-serif" }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ color: '#2D7A4A', fontWeight: 700, fontSize: '1rem', marginBottom: '4px', fontFamily: "'Mukta', sans-serif" }}>{item.price} / {isHindi ? 'पीस' : 'piece'}</div>
                  <div style={{ color: '#999', fontSize: '0.8rem', marginBottom: '14px', fontFamily: "'Mukta', sans-serif" }}>{isHindi ? item.moqHi : item.moqEn}</div>
                  <div
                    onClick={() => window.open(`https://wa.me/${item.wa}?text=${encodeURIComponent(isHindi ? `नमस्ते! मैं ${item.name} से साड़ी के बारे में जानना चाहता हूँ।` : `Hi! I'm interested in sarees from ${item.name}.`)}`, '_blank')}
                    style={{ display: 'block', textAlign: 'center', background: '#25D366', color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', fontFamily: "'Mukta', sans-serif" }}
                  >
                    {t('listings.whatsapp_btn')}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button style={{ background: 'transparent', border: '2px solid #1B3A6B', color: '#1B3A6B', padding: '14px 36px', borderRadius: '8px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', fontFamily: "'Mukta', sans-serif" }}>
              {t('listings.view_all')}
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '80px 24px', width: '100%', boxSizing: 'border-box', background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: '#1B3A6B', textAlign: 'center', marginBottom: '56px' }}>
            {t('how.title')}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
            {[
              { num: '01', title: t('how.step1_title'), desc: t('how.step1_desc'), icon: '📝' },
              { num: '02', title: t('how.step2_title'), desc: t('how.step2_desc'), icon: '🤝' },
              { num: '03', title: t('how.step3_title'), desc: t('how.step3_desc'), icon: '💰' },
            ].map(step => (
              <div key={step.num} style={{ background: '#fff', borderRadius: '16px', padding: '36px 28px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid rgba(27,58,107,0.08)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ fontSize: '2.4rem', marginBottom: '16px' }}>{step.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: '#1B3A6B', marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ color: '#555', lineHeight: 1.7, fontSize: '0.97rem' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: '#1B3A6B', padding: '80px 24px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: '#FAF7F2', textAlign: 'center', marginBottom: '8px' }}>
            {isHindi ? 'हमारे Users क्या कहते हैं' : 'What Our Users Say'}
          </h2>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', marginBottom: '48px', fontFamily: "'Mukta', sans-serif" }}>
            {isHindi ? 'वास्तविक निर्माता और थोक विक्रेता, वास्तविक अनुभव' : 'Real manufacturers & wholesalers, real experiences'}
          </p>

          {/* Main Testimonial Card */}
          <div style={{ background: '#fff', borderRadius: '20px', padding: '40px', display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap', boxShadow: '0 8px 40px rgba(0,0,0,0.2)' }}>
            <img
              src={t2.img}
              alt={isHindi ? t2.nameHi : t2.nameEn}
              style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #F5A623', flexShrink: 0 }}
            />
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ color: '#F5A623', fontSize: '1.8rem', lineHeight: 1, marginBottom: '12px' }}>"</div>
              <p style={{ color: '#333', fontSize: '1.05rem', lineHeight: 1.8, fontFamily: "'Mukta', sans-serif", marginBottom: '20px', fontStyle: 'italic' }}>
                {isHindi ? t2.quoteHi : t2.quoteEn}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#1B3A6B', fontWeight: 700 }}>
                    {isHindi ? t2.nameHi : t2.nameEn}
                  </div>
                  <div style={{ color: '#888', fontSize: '0.85rem', fontFamily: "'Mukta', sans-serif" }}>
                    {isHindi ? t2.roleHi : t2.roleEn}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                  <div style={{ color: '#F5A623', fontSize: '1.2rem' }}>{'★'.repeat(t2.stars)}</div>
                  <div style={{ background: 'rgba(27,58,107,0.1)', color: '#1B3A6B', fontSize: '0.75rem', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', fontFamily: "'Mukta', sans-serif" }}>
                    {t2.badge}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '28px' }}>
            {testimonials.map((_, i) => (
              <div key={i} onClick={() => setCurrentTestimonial(i)} style={{ width: i === currentTestimonial ? '28px' : '10px', height: '10px', borderRadius: '5px', background: i === currentTestimonial ? '#F5A623' : 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'all 0.3s' }} />
            ))}
          </div>

          {/* Prev/Next Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '20px' }}>
            <button onClick={() => setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', width: '44px', height: '44px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem' }}>←</button>
            <button onClick={() => setCurrentTestimonial(prev => (prev + 1) % testimonials.length)} style={{ background: '#F5A623', border: 'none', color: '#fff', width: '44px', height: '44px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem' }}>→</button>
          </div>
        </div>
      </section>

      {/* WHY LOOMLINK */}
      <section style={{ background: 'linear-gradient(180deg, #F8F9FC 0%, #EEF2F8 100%)', padding: '80px 24px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: '#1B3A6B', textAlign: 'center', marginBottom: '56px' }}>
            {t('why.title')}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            {[
              { title: t('why.p1_title'), desc: t('why.p1_desc'), icon: '🚫', color: '#1B3A6B' },
              { title: t('why.p2_title'), desc: t('why.p2_desc'), icon: '📍', color: '#E8821A' },
              { title: t('why.p3_title'), desc: t('why.p3_desc'), icon: '✅', color: '#2D7A4A' },
            ].map(point => (
              <div key={point.title} style={{ background: '#fff', borderRadius: '16px', padding: '36px 28px', borderTop: `4px solid ${point.color}`, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '14px' }}>{point.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: '#2D2D2D', marginBottom: '10px' }}>{point.title}</h3>
                <p style={{ color: '#666', lineHeight: 1.7, fontSize: '0.97rem' }}>{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BOTTOM */}
      <section style={{ background: '#1B3A6B', padding: '64px 24px', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: '#FAF7F2', marginBottom: '12px' }}>
          {isHindi ? 'अभी जुड़ें — मुफ्त रजिस्ट्रेशन' : 'Join Now — Free Registration'}
        </h2>
        <p style={{ color: 'rgba(250,247,242,0.7)', marginBottom: '36px', fontSize: '1rem' }}>
          {isHindi ? 'भारत के निर्माता और थोक विक्रेता — सब एक प्लेटफॉर्म पर' : 'Manufacturers and wholesalers across India — all on one platform'}
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/manufacturer" style={{ background: '#E8821A', color: '#fff', padding: '14px 32px', borderRadius: '8px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', fontFamily: "'Mukta', sans-serif" }}>
            {isHindi ? 'निर्माता रजिस्टर →' : 'Manufacturer Register →'}
          </Link>
          <Link to="/wholesaler" style={{ background: 'transparent', color: '#FAF7F2', padding: '14px 32px', borderRadius: '8px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', fontFamily: "'Mukta', sans-serif", border: '2px solid rgba(250,247,242,0.4)' }}>
            {isHindi ? 'थोक विक्रेता रजिस्टर →' : 'Wholesaler Register →'}
          </Link>
        </div>
      </section>

      {/* WHATSAPP FLOAT BUTTON */}
      <div
        onClick={() => window.open('https://wa.me/919999999999?text=Hello%20LoomLink!%20I%20want%20to%20know%20more.', '_blank')}
        style={{
          position: 'fixed', bottom: '28px', right: '28px',
          background: '#25D366', color: '#fff',
          width: '60px', height: '60px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.8rem', boxShadow: '0 4px 20px rgba(37,211,102,0.5)',
          cursor: 'pointer', zIndex: 999,
        }}
      >
        💬
      </div>

    </main>
  )
}
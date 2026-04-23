import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabase'

export default function ContactUs() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'
  const isHinglish = i18n.language === 'hl'
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState(null)

  const content = {
    en: {
      title: 'Contact Us',
      subtitle: 'Any question? We are here!',
      infoTitle: '📬 About Us',
      formTitle: '✉️ Send Message',
      nameLabel: 'Your Name *',
      emailLabel: 'Email',
      phoneLabel: 'Phone Number',
      msgLabel: 'Message *',
      namePlaceholder: 'Ram Awdhesh',
      msgPlaceholder: 'Write your question or message here...',
      submitBtn: 'Send Message →',
      sending: 'Sending...',
      whatsapp: '💬 Contact on WhatsApp',
      successTitle: 'Message Sent!',
      successMsg: 'We received your message! We will reply within 24 hours.',
      errorTitle: 'Error!',
      errorMsg: 'Something went wrong. Please try again.',
      ok: 'OK 👍',
      tryAgain: 'Try Again',
    },
    hi: {
      title: 'संपर्क करें',
      subtitle: 'कोई भी सवाल हो — हम हाज़िर हैं!',
      infoTitle: '📬 हमारे बारे में',
      formTitle: '✉️ संदेश भेजें',
      nameLabel: 'आपका नाम *',
      emailLabel: 'ईमेल',
      phoneLabel: 'फोन नंबर',
      msgLabel: 'संदेश *',
      namePlaceholder: 'राम अवधेश',
      msgPlaceholder: 'अपना सवाल या संदेश यहाँ लिखें...',
      submitBtn: 'संदेश भेजें →',
      sending: 'भेज रहे हैं...',
      whatsapp: '💬 WhatsApp पर संपर्क करें',
      successTitle: 'संदेश भेज दिया!',
      successMsg: 'आपका संदेश मिल गया! हम 24 घंटे में जवाब देंगे।',
      errorTitle: 'त्रुटि!',
      errorMsg: 'कुछ गलत हुआ। कृपया पुनः प्रयास करें।',
      ok: 'ठीक है 👍',
      tryAgain: 'पुनः प्रयास करें',
    },
    hl: {
      title: 'Contact Karo',
      subtitle: 'Koi bhi sawaal ho — hum haazir hain!',
      infoTitle: '📬 Hamare Baare Mein',
      formTitle: '✉️ Message Bhejo',
      nameLabel: 'Aapka Naam *',
      emailLabel: 'Email',
      phoneLabel: 'Phone Number',
      msgLabel: 'Message *',
      namePlaceholder: 'Ram Awdhesh',
      msgPlaceholder: 'Aapka sawaal ya message yahan likhein...',
      submitBtn: 'Message Bhejo →',
      sending: 'Bhej rahe hain...',
      whatsapp: '💬 WhatsApp pe Contact Karo',
      successTitle: 'Message Bhej Diya!',
      successMsg: 'Aapka message mil gaya! Hum 24 ghante mein reply karenge.',
      errorTitle: 'Error!',
      errorMsg: 'Kuch galat hua. Please try again.',
      ok: 'OK 👍',
      tryAgain: 'Try Again',
    }
  }

  const c = isHindi ? content.hi : isHinglish ? content.hl : content.en

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.message) {
      alert(isHindi ? 'नाम और संदेश जरूरी है!' : isHinglish ? 'Naam aur message zaroori hai!' : 'Name and message are required!')
      return
    }
    setStatus('loading')
    try {
      const { error } = await supabase.from('contacts').insert([{
        name: formData.name, email: formData.email,
        phone: formData.phone, message: formData.message,
        created_at: new Date().toISOString(),
      }])
      if (error) throw error
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px', borderRadius: '8px',
    border: '1.5px solid #e0e0e0', fontSize: '0.95rem',
    outline: 'none', boxSizing: 'border-box',
    fontFamily: "'Mukta', sans-serif"
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', paddingTop: '80px' }}>

      {/* Success Popup */}
      {status === 'success' && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '48px 40px', textAlign: 'center', maxWidth: '400px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>✅</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#2D7A4A', fontSize: '1.6rem', marginBottom: '12px' }}>{c.successTitle}</h2>
            <p style={{ color: '#555', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px', fontFamily: "'Mukta', sans-serif" }}>{c.successMsg}</p>
            <button onClick={() => setStatus(null)} style={{ background: '#1B3A6B', color: 'white', border: 'none', padding: '12px 32px', borderRadius: '8px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', fontFamily: "'Mukta', sans-serif", width: '100%' }}>{c.ok}</button>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {status === 'error' && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '48px 40px', textAlign: 'center', maxWidth: '400px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>❌</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#8B1A1A', fontSize: '1.6rem', marginBottom: '12px' }}>{c.errorTitle}</h2>
            <p style={{ color: '#555', fontSize: '1rem', marginBottom: '24px', fontFamily: "'Mukta', sans-serif" }}>{c.errorMsg}</p>
            <button onClick={() => setStatus(null)} style={{ background: '#8B1A1A', color: 'white', border: 'none', padding: '12px 32px', borderRadius: '8px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', fontFamily: "'Mukta', sans-serif", width: '100%' }}>{c.tryAgain}</button>
          </div>
        </div>
      )}

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1B3A6B 0%, #2D5A9E 100%)', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 700, marginBottom: '16px' }}>{c.title}</h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, fontFamily: "'Mukta', sans-serif" }}>{c.subtitle}</p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>

          {/* Contact Info */}
          <div>
            <h2 style={{ color: '#1B3A6B', fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: '24px' }}>{c.infoTitle}</h2>
            {[
              { icon: '📧', label: 'Email', value: 'info@loomlink.in', href: 'mailto:info@loomlink.in' },
              { icon: '📱', label: 'Phone / WhatsApp', value: '+91 8225080825', href: 'tel:8225080825' },
              { icon: '📍', label: 'Address', value: 'Varanasi, Uttar Pradesh, India', href: null },
            ].map((item, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '20px', marginBottom: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ fontSize: '1.8rem' }}>{item.icon}</div>
                <div>
                  <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '2px', fontFamily: "'Mukta', sans-serif" }}>{item.label}</div>
                  {item.href
                    ? <a href={item.href} style={{ color: '#1B3A6B', fontWeight: 600, textDecoration: 'none', fontFamily: "'Mukta', sans-serif" }}>{item.value}</a>
                    : <span style={{ color: '#1B3A6B', fontWeight: 600, fontFamily: "'Mukta', sans-serif" }}>{item.value}</span>
                  }
                </div>
              </div>
            ))}
            <a href="https://wa.me/918225080825" target="_blank" rel="noopener noreferrer" style={{ display: 'block', background: '#25D366', color: 'white', textAlign: 'center', padding: '14px', borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', marginTop: '8px', fontFamily: "'Mukta', sans-serif" }}>
              {c.whatsapp}
            </a>
          </div>

          {/* Form */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <h2 style={{ color: '#1B3A6B', fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: '24px' }}>{c.formTitle}</h2>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: '#444', fontSize: '0.9rem', marginBottom: '6px', fontWeight: 500, fontFamily: "'Mukta', sans-serif" }}>{c.nameLabel}</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={c.namePlaceholder} style={inputStyle} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: '#444', fontSize: '0.9rem', marginBottom: '6px', fontWeight: 500, fontFamily: "'Mukta', sans-serif" }}>{c.emailLabel}</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@email.com" style={inputStyle} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: '#444', fontSize: '0.9rem', marginBottom: '6px', fontWeight: 500, fontFamily: "'Mukta', sans-serif" }}>{c.phoneLabel}</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" style={inputStyle} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#444', fontSize: '0.9rem', marginBottom: '6px', fontWeight: 500, fontFamily: "'Mukta', sans-serif" }}>{c.msgLabel}</label>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder={c.msgPlaceholder} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
            <button onClick={handleSubmit} disabled={status === 'loading'} style={{
              width: '100%', background: status === 'loading' ? '#aaa' : 'linear-gradient(135deg, #1B3A6B, #2D5A9E)',
              color: 'white', border: 'none', padding: '14px', borderRadius: '10px',
              fontSize: '1rem', fontWeight: 600, cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              fontFamily: "'Mukta', sans-serif"
            }}>
              {status === 'loading' ? c.sending : c.submitBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
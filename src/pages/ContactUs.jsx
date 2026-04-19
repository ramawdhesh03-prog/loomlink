import React, { useState } from 'react'

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', paddingTop: '80px' }}>
      <div style={{ background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '16px' }}>Contact Us</h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Koi bhi sawaal ho — hum haazir hain!</p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>

          <div>
            <h2 style={{ color: '#1a237e', fontSize: '1.5rem', marginBottom: '24px' }}>📬 Hamare Baare Mein</h2>
            <div style={{ background: 'white', borderRadius: '12px', padding: '20px', marginBottom: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '1.8rem' }}>📧</div>
              <div>
                <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '2px' }}>Email</div>
                <a href="mailto:info@loomlink.in" style={{ color: '#1a237e', fontWeight: '600', textDecoration: 'none' }}>info@loomlink.in</a>
              </div>
            </div>
            <div style={{ background: 'white', borderRadius: '12px', padding: '20px', marginBottom: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '1.8rem' }}>📱</div>
              <div>
                <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '2px' }}>Phone / WhatsApp</div>
                <a href="tel:8225080825" style={{ color: '#1a237e', fontWeight: '600', textDecoration: 'none' }}>+91 8225080825</a>
              </div>
            </div>
            <div style={{ background: 'white', borderRadius: '12px', padding: '20px', marginBottom: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '1.8rem' }}>📍</div>
              <div>
                <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '2px' }}>Address</div>
                <span style={{ color: '#1a237e', fontWeight: '600' }}>Varanasi, Uttar Pradesh, India</span>
              </div>
            </div>
            <a href="https://wa.me/918225080825" target="_blank" rel="noopener noreferrer" style={{ display: 'block', background: '#25D366', color: 'white', textAlign: 'center', padding: '14px', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '1rem', marginTop: '8px' }}>
              💬 WhatsApp pe Contact Karo
            </a>
          </div>

          <div style={{ background: 'white', borderRadius: '16px', padding: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
                <h3 style={{ color: '#1a237e', fontSize: '1.4rem', marginBottom: '8px' }}>Message bhej diya!</h3>
                <p style={{ color: '#666' }}>Hum 24 ghante mein reply karenge.</p>
                <button onClick={() => setSubmitted(false)} style={{ marginTop: '20px', background: '#1a237e', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                  Naya Message Bhejo
                </button>
              </div>
            ) : (
              <div>
                <h2 style={{ color: '#1a237e', fontSize: '1.5rem', marginBottom: '24px' }}>✉️ Message Bhejo</h2>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', color: '#444', fontSize: '0.9rem', marginBottom: '6px', fontWeight: '500' }}>Aapka Naam *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ram Awdhesh" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #e0e0e0', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', color: '#444', fontSize: '0.9rem', marginBottom: '6px', fontWeight: '500' }}>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@email.com" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #e0e0e0', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', color: '#444', fontSize: '0.9rem', marginBottom: '6px', fontWeight: '500' }}>Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #e0e0e0', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: '#444', fontSize: '0.9rem', marginBottom: '6px', fontWeight: '500' }}>Message *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Aapka sawaal ya message yahan likhein..." rows={4} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #e0e0e0', fontSize: '0.95rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                </div>
                <button onClick={handleSubmit} style={{ width: '100%', background: 'linear-gradient(135deg, #1a237e, #3949ab)', color: 'white', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}>
                  Message Bhejo →
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default ContactUs
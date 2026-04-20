import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

const SAREE_TYPES = [
  'Banarasi Silk', 'Kanjivaram Silk', 'Georgette', 'Chiffon',
  'Cotton', 'Linen', 'Tussar Silk', 'Chanderi', 'Patola',
  'Bandhani', 'Leheriya', 'Net', 'Crepe', 'Organza'
]

const inputStyle = {
  width: '100%', padding: '12px 16px', border: '1.5px solid #ddd',
  borderRadius: '8px', fontSize: '1rem', fontFamily: "'Mukta', sans-serif",
  color: '#2D2D2D', background: '#fff', outline: 'none',
  transition: 'border-color 0.2s', boxSizing: 'border-box',
}

const labelStyle = {
  display: 'block', marginBottom: '6px', fontWeight: 600,
  fontSize: '0.9rem', color: '#2D2D2D',
}

export default function ManufacturerRegister() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', business: '', city: '',
    phone: '', whatsapp: '',
    sareeTypes: [], moq: '', priceRange: '',
    email: '', password: '',
  })
  const [catalog, setCatalog] = useState(null)
  const [status, setStatus] = useState(null)

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const toggleSareeType = type => {
    setForm(prev => ({
      ...prev,
      sareeTypes: prev.sareeTypes.includes(type)
        ? prev.sareeTypes.filter(t => t !== type)
        : [...prev.sareeTypes, type],
    }))
  }

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.business || !form.email || !form.password) {
      alert('Sabhi required fields bharein!')
      return
    }
    if (form.password.length < 6) {
      alert('Password kam se kam 6 characters ka hona chahiye!')
      return
    }
    setStatus('loading')
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { role: 'manufacturer' } }
      })
      if (authError) throw authError

      let catalogUrl = null
      if (catalog) {
        const fileExt = catalog.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('catalogs').upload(fileName, catalog)
        if (!uploadError) catalogUrl = uploadData.path
      }

      const { error: dbError } = await supabase.from('manufacturers').insert([{
        user_id: authData.user.id,
        name: form.name,
        business_name: form.business,
        city: form.city,
        phone: form.phone,
        whatsapp: form.whatsapp,
        saree_types: form.sareeTypes,
        moq: form.moq,
        price_range: form.priceRange,
        catalog_url: catalogUrl,
        created_at: new Date().toISOString(),
      }])
      if (dbError) throw dbError

      setStatus('success')
      setForm({ name: '', business: '', city: '', phone: '', whatsapp: '', sareeTypes: [], moq: '', priceRange: '', email: '', password: '' })

      // 3 second baad login page pe redirect
      setTimeout(() => navigate('/login'), 3000)

    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <main style={{ padding: '60px 24px', maxWidth: '680px', margin: '0 auto' }}>

      {/* SUCCESS POPUP */}
      {status === 'success' && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white', borderRadius: '20px',
            padding: '48px 40px', textAlign: 'center',
            maxWidth: '400px', width: '90%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            animation: 'fadeIn 0.3s ease'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              color: '#2D7A4A', fontSize: '1.6rem', marginBottom: '12px'
            }}>
              Registration Successful!
            </h2>
            <p style={{ color: '#555', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Welcome to LoomLink! Ab login karke apna dashboard access karo.
            </p>
            <div style={{
              background: '#f0faf4', borderRadius: '10px',
              padding: '12px', color: '#2D7A4A', fontSize: '0.9rem', fontWeight: 600
            }}>
              ⏳ 3 seconds mein login page pe redirect ho rahe hain...
            </div>
            <button
              onClick={() => navigate('/login')}
              style={{
                marginTop: '20px', background: '#1B3A6B', color: 'white',
                border: 'none', padding: '12px 32px', borderRadius: '8px',
                fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
                fontFamily: "'Mukta', sans-serif", width: '100%'
              }}
            >
              Login Now →
            </button>
          </div>
        </div>
      )}

      {/* ERROR POPUP */}
      {status === 'error' && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white', borderRadius: '20px',
            padding: '48px 40px', textAlign: 'center',
            maxWidth: '400px', width: '90%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>❌</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              color: '#8B1A1A', fontSize: '1.6rem', marginBottom: '12px'
            }}>
              Registration Failed!
            </h2>
            <p style={{ color: '#555', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Email already registered hai ya koi aur error aaya. Please try again.
            </p>
            <button
              onClick={() => setStatus(null)}
              style={{
                background: '#8B1A1A', color: 'white', border: 'none',
                padding: '12px 32px', borderRadius: '8px',
                fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
                fontFamily: "'Mukta', sans-serif", width: '100%'
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <div style={{
        background: 'linear-gradient(135deg, #8B1A1A, #6B1414)',
        borderRadius: '16px 16px 0 0', padding: '32px 36px', color: '#FAF7F2',
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏭</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', margin: 0, color: '#FAF7F2' }}>
          {t('manufacturer_form.title')}
        </h1>
        <p style={{ color: 'rgba(250,247,242,0.7)', marginTop: '8px', fontSize: '0.95rem' }}>
          Apna saree business LoomLink pe register karo — free mein
        </p>
      </div>

      <div style={{ background: '#fff', borderRadius: '0 0 16px 16px', padding: '36px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'grid', gap: '20px' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>{t('manufacturer_form.name')} *</label>
              <input name="name" value={form.name} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>{t('manufacturer_form.business')} *</label>
              <input name="business" value={form.business} onChange={handleChange} style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>{t('manufacturer_form.city')}</label>
            <input name="city" value={form.city} onChange={handleChange} style={inputStyle} placeholder="Apna shehar likhein — jaise Surat, Varanasi, Mumbai..." />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>{t('manufacturer_form.phone')} *</label>
              <input name="phone" value={form.phone} onChange={handleChange} style={inputStyle} type="tel" />
            </div>
            <div>
              <label style={labelStyle}>{t('manufacturer_form.whatsapp')}</label>
              <input name="whatsapp" value={form.whatsapp} onChange={handleChange} style={inputStyle} type="tel" />
            </div>
          </div>

          <div style={{ background: '#f8f9fa', borderRadius: '12px', padding: '20px', border: '1px solid #e0e0e0' }}>
            <p style={{ margin: '0 0 16px', fontWeight: 600, color: '#1B3A6B', fontSize: '0.95rem' }}>
              🔐 Login Details — Dashboard access ke liye
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Email Address *</label>
                <input name="email" value={form.email} onChange={handleChange} style={inputStyle} type="email" placeholder="aapka@email.com" />
              </div>
              <div>
                <label style={labelStyle}>Password * (min 6 characters)</label>
                <input name="password" value={form.password} onChange={handleChange} style={inputStyle} type="password" placeholder="••••••••" />
              </div>
            </div>
          </div>

          <div>
            <label style={labelStyle}>{t('manufacturer_form.saree_types')}</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '4px' }}>
              {SAREE_TYPES.map(type => (
                <button key={type} type="button" onClick={() => toggleSareeType(type)} style={{
                  padding: '8px 18px', borderRadius: '24px',
                  border: `2px solid ${form.sareeTypes.includes(type) ? '#8B1A1A' : '#ddd'}`,
                  background: form.sareeTypes.includes(type) ? '#8B1A1A' : '#fff',
                  color: form.sareeTypes.includes(type) ? '#FAF7F2' : '#666',
                  cursor: 'pointer', fontFamily: "'Mukta', sans-serif",
                  fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s',
                }}>
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>{t('manufacturer_form.moq')}</label>
              <input name="moq" value={form.moq} onChange={handleChange} style={inputStyle} placeholder="e.g. 50" />
            </div>
            <div>
              <label style={labelStyle}>{t('manufacturer_form.price_range')}</label>
              <input name="priceRange" value={form.priceRange} onChange={handleChange} style={inputStyle} placeholder="e.g. ₹500–₹2000" />
            </div>
          </div>

          <div>
            <label style={labelStyle}>{t('manufacturer_form.catalog')}</label>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setCatalog(e.target.files[0])} style={{ ...inputStyle, padding: '10px 12px', cursor: 'pointer' }} />
          </div>

          <button onClick={handleSubmit} disabled={status === 'loading'} style={{
            background: status === 'loading' ? '#aaa' : '#8B1A1A',
            color: '#FAF7F2', padding: '16px', border: 'none',
            borderRadius: '8px', fontSize: '1.05rem', fontWeight: 700,
            fontFamily: "'Mukta', sans-serif",
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s', width: '100%', marginTop: '8px',
          }}>
            {status === 'loading' ? 'Registering...' : t('manufacturer_form.submit')}
          </button>
        </div>
      </div>
    </main>
  )
}
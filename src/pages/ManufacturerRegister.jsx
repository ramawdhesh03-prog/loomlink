import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabase'

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
      // Supabase Auth mein account banao
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { role: 'manufacturer' }
        }
      })
      if (authError) throw authError

      // Catalog upload
      let catalogUrl = null
      if (catalog) {
        const fileExt = catalog.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('catalogs').upload(fileName, catalog)
        if (!uploadError) catalogUrl = uploadData.path
      }

      // Database mein data save karo
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

      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'manufacturer', name: form.name,
          business: form.business, phone: form.phone,
        }),
      })

      setStatus('success')
      setForm({ name: '', business: '', city: '', phone: '', whatsapp: '', sareeTypes: [], moq: '', priceRange: '', email: '', password: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <main style={{ padding: '60px 24px', maxWidth: '680px', margin: '0 auto' }}>
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
        {status === 'success' && (
          <div style={{ background: '#f0faf4', border: '1px solid #2D7A4A', color: '#2D7A4A', padding: '14px 18px', borderRadius: '8px', marginBottom: '24px', fontWeight: 600 }}>
            ✅ Registration successful! Ab login karo apne dashboard ke liye.
          </div>
        )}
        {status === 'error' && (
          <div style={{ background: '#fff5f5', border: '1px solid #8B1A1A', color: '#8B1A1A', padding: '14px 18px', borderRadius: '8px', marginBottom: '24px', fontWeight: 600 }}>
            ❌ Kuch galat hua. Email already registered ho sakta hai.
          </div>
        )}

        <div style={{ display: 'grid', gap: '20px' }}>

          {/* Name + Business */}
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

          {/* City */}
          <div>
            <label style={labelStyle}>{t('manufacturer_form.city')}</label>
            <input name="city" value={form.city} onChange={handleChange} style={inputStyle} placeholder="Apna shehar likhein — jaise Surat, Varanasi, Mumbai..." />
          </div>

          {/* Phone + WhatsApp */}
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

          {/* Email + Password */}
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

          {/* Saree Types */}
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

          {/* MOQ + Price Range */}
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

          {/* Catalog Upload */}
          <div>
            <label style={labelStyle}>{t('manufacturer_form.catalog')}</label>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setCatalog(e.target.files[0])} style={{ ...inputStyle, padding: '10px 12px', cursor: 'pointer' }} />
          </div>

          {/* Submit */}
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
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabase'

const SAREE_TYPES = [
  'Banarasi Silk', 'Kanjivaram Silk', 'Georgette', 'Chiffon',
  'Cotton', 'Linen', 'Tussar Silk', 'Chanderi', 'Patola',
  'Bandhani', 'Leheriya', 'Net', 'Crepe', 'Organza'
]

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  border: '1.5px solid #ddd',
  borderRadius: '8px',
  fontSize: '1rem',
  fontFamily: "'Mukta', sans-serif",
  color: '#2D2D2D',
  background: '#fff',
  outline: 'none',
  boxSizing: 'border-box',
}

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontWeight: 600,
  fontSize: '0.9rem',
  color: '#2D2D2D',
}

export default function WholesalerRegister() {
  const { t } = useTranslation()
  const [form, setForm] = useState({
    name: '', business: '', city: '',
    phone: '', whatsapp: '',
    monthlyReq: '',
    sareeTypes: [],
    budget: '',
  })
  const [status, setStatus] = useState(null)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const toggleSareeType = type => {
    setForm(prev => ({
      ...prev,
      sareeTypes: prev.sareeTypes.includes(type)
        ? prev.sareeTypes.filter(t => t !== type)
        : [...prev.sareeTypes, type],
    }))
  }

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.business) {
      alert('Please fill required fields.')
      return
    }
    setStatus('loading')
    try {
      const { error } = await supabase.from('wholesalers').insert([{
        name: form.name,
        business_name: form.business,
        city: form.city,
        phone: form.phone,
        whatsapp: form.whatsapp,
        monthly_requirement: form.monthlyReq,
        saree_types: form.sareeTypes,
        budget_range: form.budget,
        created_at: new Date().toISOString(),
      }])
      if (error) throw error

      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'wholesaler',
          name: form.name,
          business: form.business,
          phone: form.phone,
        }),
      })

      setStatus('success')
      setForm({ name: '', business: '', city: '', phone: '', whatsapp: '', monthlyReq: '', sareeTypes: [], budget: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <main style={{ padding: '60px 24px', maxWidth: '680px', margin: '0 auto' }}>
      <div style={{
        background: 'linear-gradient(135deg, #C9A84C, #A8873D)',
        borderRadius: '16px 16px 0 0',
        padding: '32px 36px',
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🛍️</div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.8rem', margin: 0, color: '#2D2D2D',
        }}>{t('wholesaler_form.title')}</h1>
        <p style={{ color: 'rgba(45,45,45,0.7)', marginTop: '8px', fontSize: '0.95rem' }}>
          Seedha manufacturer se source karo — free registration
        </p>
      </div>

      <div style={{
        background: '#fff',
        borderRadius: '0 0 16px 16px',
        padding: '36px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      }}>
        {status === 'success' && (
          <div style={{
            background: '#f0faf4', border: '1px solid #2D7A4A', color: '#2D7A4A',
            padding: '14px 18px', borderRadius: '8px', marginBottom: '24px', fontWeight: 600,
          }}>
            ✅ {t('wholesaler_form.success')}
          </div>
        )}
        {status === 'error' && (
          <div style={{
            background: '#fff5f5', border: '1px solid #8B1A1A', color: '#8B1A1A',
            padding: '14px 18px', borderRadius: '8px', marginBottom: '24px', fontWeight: 600,
          }}>
            ❌ {t('wholesaler_form.error')}
          </div>
        )}

        <div style={{ display: 'grid', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>{t('wholesaler_form.name')} *</label>
              <input name="name" value={form.name} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>{t('wholesaler_form.business')} *</label>
              <input name="business" value={form.business} onChange={handleChange} style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>{t('wholesaler_form.city')}</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Apna shehar likhein — jaise Lucknow, Patna, Ahmedabad..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>{t('wholesaler_form.phone')} *</label>
              <input name="phone" value={form.phone} onChange={handleChange} style={inputStyle} type="tel" />
            </div>
            <div>
              <label style={labelStyle}>{t('wholesaler_form.whatsapp')}</label>
              <input name="whatsapp" value={form.whatsapp} onChange={handleChange} style={inputStyle} type="tel" />
            </div>
          </div>

          <div>
            <label style={labelStyle}>{t('wholesaler_form.saree_types')}</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '4px' }}>
              {SAREE_TYPES.map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleSareeType(type)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '24px',
                    border: `2px solid ${form.sareeTypes.includes(type) ? '#C9A84C' : '#ddd'}`,
                    background: form.sareeTypes.includes(type) ? '#C9A84C' : '#fff',
                    color: form.sareeTypes.includes(type) ? '#2D2D2D' : '#666',
                    cursor: 'pointer',
                    fontFamily: "'Mukta', sans-serif",
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    transition: 'all 0.2s',
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>{t('wholesaler_form.monthly_req')}</label>
              <input name="monthlyReq" value={form.monthlyReq} onChange={handleChange} style={inputStyle} placeholder="e.g. 200" />
            </div>
            <div>
              <label style={labelStyle}>{t('wholesaler_form.budget')}</label>
              <input name="budget" value={form.budget} onChange={handleChange} style={inputStyle} placeholder="e.g. ₹300–₹800" />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={status === 'loading'}
            style={{
              background: status === 'loading' ? '#aaa' : '#C9A84C',
              color: '#2D2D2D',
              padding: '16px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.05rem',
              fontWeight: 700,
              fontFamily: "'Mukta', sans-serif",
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              width: '100%',
              marginTop: '8px',
            }}
          >
            {status === 'loading' ? 'Submitting...' : t('wholesaler_form.submit')}
          </button>
        </div>
      </div>
    </main>
  )
}
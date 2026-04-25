import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function PlaceOrderModal({ manufacturer, onClose, onSuccess }) {
  const [quantity, setQuantity] = useState(1)
  const [pricePerPiece, setPricePerPiece] = useState('')
  const [sareeType, setSareeType] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const SAREE_TYPES = [
    'Banarasi Silk', 'Kanjivaram Silk', 'Georgette', 'Chiffon',
    'Cotton', 'Linen', 'Tussar Silk', 'Chanderi', 'Patola',
    'Bandhani', 'Leheriya', 'Net', 'Crepe', 'Organza'
  ]

  const total = (quantity * (parseFloat(pricePerPiece) || 0)).toFixed(2)

  const handlePlaceOrder = async () => {
    setError('')
    if (!sareeType) { setError('Saree type select karo.'); return }
    if (!pricePerPiece || parseFloat(pricePerPiece) <= 0) { setError('Price per piece daalo.'); return }
    if (quantity < 1) { setError('Quantity kam se kam 1 honi chahiye.'); return }

    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()

    const { error: insertError } = await supabase.from('orders').insert({
      wholesaler_id: user.id,
      manufacturer_id: manufacturer.user_id,
      listing_id: manufacturer.id,
      saree_type: sareeType,
      quantity: parseInt(quantity),
      price_per_piece: parseFloat(pricePerPiece),
      notes: notes.trim() || null,
    })

    setLoading(false)
    if (insertError) {
      setError('Order place nahi hua. Dobara try karo.')
      console.error(insertError)
    } else {
      onSuccess()
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '16px'
    }}>
      <div style={{
        background: '#fff', borderRadius: '16px',
        padding: '28px', width: '100%', maxWidth: '460px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
        maxHeight: '90vh', overflowY: 'auto'
      }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#1B3A6B', margin: '0 0 8px' }}>
          📦 Order Place Karo
        </h2>

        <div style={{
          background: '#f0f4ff', borderRadius: '10px',
          padding: '12px 16px', marginBottom: '20px', fontSize: '0.9rem', color: '#444'
        }}>
          <strong>{manufacturer.business_name}</strong> — 📍 {manufacturer.city}
        </div>

        <label style={labelStyle}>Saree Type *</label>
        <select
          value={sareeType}
          onChange={e => setSareeType(e.target.value)}
          style={inputStyle}
        >
          <option value=''>-- Select karo --</option>
          {SAREE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <label style={labelStyle}>Price per Piece (₹) *</label>
        <input
          type='number' min='1'
          value={pricePerPiece}
          onChange={e => setPricePerPiece(e.target.value)}
          placeholder='e.g. 450'
          style={inputStyle}
        />

        <label style={labelStyle}>Quantity (pieces) *</label>
        <input
          type='number' min='1'
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>Notes (optional)</label>
        <textarea
          placeholder='Koi special requirement? Yahan likho...'
          value={notes}
          onChange={e => setNotes(e.target.value)}
          style={{ ...inputStyle, height: '70px', resize: 'vertical' }}
        />

        <div style={{
          marginTop: '4px', padding: '10px 14px',
          background: '#eef9ee', borderRadius: '8px',
          fontSize: '1rem', color: '#2a7a2a', fontWeight: 600
        }}>
          💰 Total: ₹{total}
        </div>

        {error && <p style={{ color: 'red', fontSize: '0.85rem', marginTop: '8px' }}>{error}</p>}

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={onClose} disabled={loading} style={{
            flex: 1, padding: '10px', border: '1.5px solid #ccc',
            borderRadius: '8px', background: '#fff', cursor: 'pointer',
            fontFamily: "'Mukta', sans-serif", fontSize: '0.95rem'
          }}>Cancel</button>
          <button onClick={handlePlaceOrder} disabled={loading} style={{
            flex: 2, padding: '10px', background: '#1B3A6B', color: '#fff',
            border: 'none', borderRadius: '8px', cursor: 'pointer',
            fontFamily: "'Mukta', sans-serif", fontSize: '0.95rem', fontWeight: 600
          }}>
            {loading ? 'Placing...' : '✅ Order Place Karo'}
          </button>
        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%', padding: '10px 14px', borderRadius: '8px',
  border: '1.5px solid #ddd', fontSize: '0.95rem',
  fontFamily: "'Mukta', sans-serif", outline: 'none',
  boxSizing: 'border-box', marginBottom: '4px'
}

const labelStyle = {
  display: 'block', fontWeight: 600, fontSize: '0.85rem',
  color: '#888', marginBottom: '6px', marginTop: '14px'
}
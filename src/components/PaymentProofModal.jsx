import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function PaymentProofModal({ order, onClose, onSuccess }) {
  const [utr, setUtr] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (!selected) return
    const allowed = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowed.includes(selected.type)) {
      setError('Sirf JPG, PNG, WEBP image upload kar sakte hain')
      return
    }
    if (selected.size > 5 * 1024 * 1024) {
      setError('File size 5MB se kam honi chahiye')
      return
    }
    setError('')
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  const handleSubmit = async () => {
    setError('')
    if (!utr.trim() && !file) {
      setError('UTR number ya screenshot — koi ek toh daalo')
      return
    }

    setLoading(true)
    let proofUrl = null

    if (file) {
      const ext = file.name.split('.').pop()
      const fileName = `order_${order.id}_${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('payment-proofs')
        .upload(fileName, file, { cacheControl: '3600', upsert: false })

      if (uploadError) {
        setError('Screenshot upload nahi hua: ' + uploadError.message)
        setLoading(false)
        return
      }

      const { data: urlData } = supabase.storage
        .from('payment-proofs')
        .getPublicUrl(fileName)
      proofUrl = urlData.publicUrl
    }

    const { error: updateError } = await supabase
      .from('orders')
      .update({
        utr_number: utr.trim() || null,
        payment_proof_url: proofUrl,
        payment_submitted_at: new Date().toISOString(),
      })
      .eq('id', order.id)

    setLoading(false)

    if (updateError) {
      setError('Submit nahi hua: ' + updateError.message)
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
        padding: '28px', width: '100%', maxWidth: '440px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
        maxHeight: '90vh', overflowY: 'auto'
      }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#1B3A6B', margin: '0 0 8px' }}>
          💳 Payment Proof Submit Karo
        </h2>

        <div style={{
          background: '#f0f4ff', borderRadius: '10px',
          padding: '12px 16px', marginBottom: '20px', fontSize: '0.9rem', color: '#444'
        }}>
          <strong>{order.manufacturer_business}</strong>
          <div style={{ marginTop: '4px', color: '#666' }}>
            {order.saree_type} • {order.quantity} pcs • <strong>₹{order.total_amount}</strong>
          </div>
        </div>

        <label style={labelStyle}>UTR Number (optional)</label>
        <input
          type='text'
          placeholder='e.g. 426111234567'
          value={utr}
          onChange={e => setUtr(e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>Payment Screenshot (optional)</label>
        <label style={{
          display: 'block', border: '2px dashed #C9A84C',
          borderRadius: '12px', padding: '20px', textAlign: 'center',
          cursor: 'pointer', background: '#fffdf5', marginBottom: '4px'
        }}>
          <input
            type='file'
            accept='.jpg,.jpeg,.png,.webp'
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {preview ? (
            <img src={preview} alt='preview' style={{
              maxWidth: '100%', maxHeight: '180px',
              borderRadius: '8px', objectFit: 'contain'
            }} />
          ) : (
            <div>
              <div style={{ fontSize: '2rem' }}>📸</div>
              <div style={{ color: '#888', fontSize: '0.85rem', marginTop: '6px' }}>
                Click karke screenshot select karo
              </div>
            </div>
          )}
        </label>

        {error && <p style={{ color: 'red', fontSize: '0.85rem', marginTop: '8px' }}>{error}</p>}

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={onClose} disabled={loading} style={{
            flex: 1, padding: '10px', border: '1.5px solid #ccc',
            borderRadius: '8px', background: '#fff', cursor: 'pointer',
            fontFamily: "'Mukta', sans-serif", fontSize: '0.95rem'
          }}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading} style={{
            flex: 2, padding: '10px', background: '#C9A84C', color: '#2D2D2D',
            border: 'none', borderRadius: '8px', cursor: 'pointer',
            fontFamily: "'Mukta', sans-serif", fontSize: '0.95rem', fontWeight: 600
          }}>
            {loading ? 'Submitting...' : '✅ Submit Karo'}
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
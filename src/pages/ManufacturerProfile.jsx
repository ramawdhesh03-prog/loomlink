import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function ManufacturerProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [manufacturer, setManufacturer] = useState(null)
  const [catalogs, setCatalogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [enquiryForm, setEnquiryForm] = useState({ name: '', business: '', city: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [popup, setPopup] = useState({ show: false, message: '', type: '' })
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    fetchManufacturer()
  }, [id])

  const showPopup = (message, type = 'success') => {
    setPopup({ show: true, message, type })
    setTimeout(() => setPopup({ show: false, message: '', type: '' }), 4000)
  }

  const fetchManufacturer = async () => {
    const { data, error } = await supabase
      .from('manufacturers')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) { navigate('/'); return }
    setManufacturer(data)
    fetchCatalogs(data.id)
    setLoading(false)
  }

  const fetchCatalogs = async (manufacturerId) => {
    const { data, error } = await supabase
      .storage
      .from('catalogs')
      .list(`manufacturer_${manufacturerId}`, {
        limit: 50,
        sortBy: { column: 'created_at', order: 'desc' }
      })

    if (!error && data) {
      const withUrls = data
        .filter(f => f.name !== '.emptyFolderPlaceholder')
        .map(file => {
          const { data: urlData } = supabase.storage
            .from('catalogs')
            .getPublicUrl(`manufacturer_${manufacturerId}/${file.name}`)
          return { ...file, url: urlData.publicUrl }
        })
      setCatalogs(withUrls)
    }
  }

  const handleEnquiry = async () => {
    if (!enquiryForm.name || !enquiryForm.message) {
      showPopup('Naam aur message zaroori hai', 'error')
      return
    }

    setSubmitting(true)

    const { error } = await supabase
      .from('enquiries')
      .insert({
        manufacturer_id: manufacturer.id,
        wholesaler_name: enquiryForm.name,
        wholesaler_business: enquiryForm.business,
        wholesaler_city: enquiryForm.city,
        message: enquiryForm.message,
        status: 'pending'
      })

    setSubmitting(false)

    if (!error) {
      showPopup('Enquiry send ho gayi! Manufacturer jaldi reply karega. ✅')
      setEnquiryForm({ name: '', business: '', city: '', message: '' })
    } else {
      showPopup('Kuch error aaya: ' + error.message, 'error')
    }
  }

  const isImage = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase()
    return ['jpg', 'jpeg', 'png', 'webp'].includes(ext)
  }

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '100px', color: '#1B3A6B', fontSize: '1.2rem' }}>
      Loading...
    </div>
  )

  const tabStyle = (tab) => ({
    padding: '10px 24px', border: 'none', cursor: 'pointer',
    fontFamily: "'Mukta', sans-serif", fontWeight: 600, fontSize: '0.95rem',
    borderBottom: activeTab === tab ? '3px solid #F5A623' : '3px solid transparent',
    color: activeTab === tab ? '#1B3A6B' : '#888',
    background: 'transparent', transition: 'all 0.2s'
  })

  return (
    <main style={{ background: '#f8f9fa', minHeight: '100vh', paddingBottom: '60px' }}>

      {popup.show && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px', zIndex: 9999,
          background: popup.type === 'error' ? '#D32F2F' : '#2D7A4A',
          color: 'white', padding: '14px 24px', borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)', fontFamily: "'Mukta', sans-serif",
          fontSize: '0.95rem', maxWidth: '320px'
        }}>
          {popup.message}
        </div>
      )}

      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1B3A6B 0%, #2D5A9E 100%)',
        padding: '48px 24px', color: 'white', textAlign: 'center'
      }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontSize: '2.5rem', margin: '0 auto 16px'
        }}>🏭</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', margin: '0 0 8px', fontWeight: 700 }}>
          {manufacturer?.business_name}
        </h1>
        <p style={{ opacity: 0.8, fontSize: '1rem', margin: '0 0 16px' }}>
          📍 {manufacturer?.city}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{
            background: 'rgba(245,166,35,0.2)', border: '1px solid #F5A623',
            color: '#F5A623', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem'
          }}>✅ Verified Manufacturer</span>
          <span style={{
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)',
            color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem'
          }}>📁 {catalogs.length} Catalogs</span>
          <span style={{
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)',
            color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem'
          }}>🧵 {(manufacturer?.saree_types || []).length} Saree Types</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #eee',
        display: 'flex', justifyContent: 'center', gap: '8px',
        position: 'sticky', top: '0', zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>
        <button style={tabStyle('profile')} onClick={() => setActiveTab('profile')}>📋 Profile</button>
        <button style={tabStyle('catalogs')} onClick={() => setActiveTab('catalogs')}>📁 Catalogs ({catalogs.length})</button>
        <button style={tabStyle('enquiry')} onClick={() => setActiveTab('enquiry')}>✉️ Enquiry Bhejo</button>
      </div>

      <div style={{ maxWidth: '900px', margin: '32px auto', padding: '0 24px' }}>

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div style={{ display: 'grid', gap: '24px' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <h2 style={{ color: '#1B3A6B', fontFamily: "'Playfair Display', serif", marginBottom: '24px', fontSize: '1.3rem' }}>
                🏢 Business Details
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {[
                  { label: 'Business Name', value: manufacturer?.business_name, icon: '🏭' },
                  { label: 'Location', value: manufacturer?.city, icon: '📍' },
                  { label: 'Minimum Order Qty', value: manufacturer?.moq, icon: '📦' },
                  { label: 'Price Range', value: manufacturer?.price_range, icon: '💰' },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '16px', background: '#f8f9fa', borderRadius: '12px', borderLeft: '4px solid #F5A623' }}>
                    <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '4px', fontFamily: "'Mukta', sans-serif" }}>
                      {item.icon} {item.label}
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1B3A6B', fontFamily: "'Mukta', sans-serif" }}>
                      {item.value || '—'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <h2 style={{ color: '#1B3A6B', fontFamily: "'Playfair Display', serif", marginBottom: '20px', fontSize: '1.3rem' }}>
                🧵 Saree Types
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {(manufacturer?.saree_types || []).length > 0
                  ? manufacturer.saree_types.map(type => (
                    <span key={type} style={{
                      padding: '8px 20px', borderRadius: '24px',
                      background: 'linear-gradient(135deg, #8B1A1A, #6B1414)',
                      color: 'white', fontSize: '0.9rem', fontFamily: "'Mukta', sans-serif"
                    }}>{type}</span>
                  ))
                  : <span style={{ color: '#aaa' }}>Koi saree type add nahi kiya</span>
                }
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #F5A623, #E8821A)',
              borderRadius: '16px', padding: '32px', textAlign: 'center', color: 'white'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✉️</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', margin: '0 0 8px' }}>
                Is Manufacturer se Baat Karein
              </h3>
              <p style={{ opacity: 0.9, marginBottom: '20px', fontFamily: "'Mukta', sans-serif" }}>
                Apni requirement bhejo — manufacturer jaldi reply karega
              </p>
              <button onClick={() => setActiveTab('enquiry')} style={{
                background: 'white', color: '#E8821A', border: 'none',
                padding: '12px 32px', borderRadius: '10px', cursor: 'pointer',
                fontWeight: 700, fontSize: '1rem', fontFamily: "'Mukta', sans-serif"
              }}>
                Enquiry Bhejo →
              </button>
            </div>
          </div>
        )}

        {/* CATALOGS TAB */}
        {activeTab === 'catalogs' && (
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
            <h2 style={{ color: '#1B3A6B', fontFamily: "'Playfair Display', serif", marginBottom: '24px', fontSize: '1.3rem' }}>
              📁 Saree Catalogs
            </h2>
            {catalogs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', color: '#aaa', fontFamily: "'Mukta', sans-serif" }}>
                Abhi koi catalog upload nahi hua hai
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                {catalogs.map(file => (
                  <a key={file.name} href={file.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                    <div style={{
                      border: '1.5px solid #f0f0f0', borderRadius: '12px',
                      overflow: 'hidden', background: '#fafafa',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: 'pointer'
                    }}>
                      {isImage(file.name) ? (
                        <img src={file.url} alt={file.name}
                          style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} />
                      ) : (
                        <div style={{
                          height: '180px', display: 'flex', flexDirection: 'column',
                          alignItems: 'center', justifyContent: 'center',
                          background: 'linear-gradient(135deg, #fff5f5, #ffe8e8)'
                        }}>
                          <div style={{ fontSize: '3.5rem' }}>📄</div>
                          <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '8px' }}>PDF Catalog</div>
                        </div>
                      )}
                      <div style={{ padding: '12px' }}>
                        <div style={{ fontSize: '0.85rem', color: '#1B3A6B', fontWeight: 600, fontFamily: "'Mukta', sans-serif" }}>
                          👁️ View Catalog
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ENQUIRY TAB */}
        {activeTab === 'enquiry' && (
          <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
            <h2 style={{ color: '#1B3A6B', fontFamily: "'Playfair Display', serif", marginBottom: '8px', fontSize: '1.3rem' }}>
              ✉️ Enquiry Bhejo
            </h2>
            <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '28px', fontFamily: "'Mukta', sans-serif" }}>
              {manufacturer?.business_name} ko apni requirement bhejo. Aapka contact detail manufacturer ko nahi dikhega.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              {[
                { label: 'Aapka Naam *', key: 'name', placeholder: 'Jaise: Ramesh Sharma' },
                { label: 'Business Name', key: 'business', placeholder: 'Jaise: Sharma Sarees' },
                { label: 'Aapka Shehar', key: 'city', placeholder: 'Jaise: Lucknow' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#555', marginBottom: '6px', fontFamily: "'Mukta', sans-serif" }}>
                    {field.label}
                  </label>
                  <input
                    value={enquiryForm[field.key]}
                    onChange={e => setEnquiryForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: '8px',
                      border: '1.5px solid #ddd', fontSize: '0.95rem',
                      fontFamily: "'Mukta', sans-serif", outline: 'none', boxSizing: 'border-box'
                    }}
                  />
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#555', marginBottom: '6px', fontFamily: "'Mukta', sans-serif" }}>
                Aapki Requirement *
              </label>
              <textarea
                value={enquiryForm.message}
                onChange={e => setEnquiryForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Jaise: Mujhe 50 pcs Banarasi Silk chahiye, price range 800-1200 per piece, delivery Lucknow..."
                rows={5}
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: '8px',
                  border: '1.5px solid #ddd', fontSize: '0.95rem',
                  fontFamily: "'Mukta', sans-serif", outline: 'none',
                  boxSizing: 'border-box', resize: 'vertical'
                }}
              />
            </div>

            <div style={{
              background: '#fff8e1', border: '1px solid #FFD54F',
              borderRadius: '10px', padding: '14px 18px', marginBottom: '24px',
              fontSize: '0.85rem', color: '#795548', fontFamily: "'Mukta', sans-serif"
            }}>
              ⚠️ <strong>Note:</strong> Aapka phone number ya email manufacturer ko nahi dikhega. Saari baat LoomLink platform pe hogi.
            </div>

            <button
              onClick={handleEnquiry}
              disabled={submitting}
              style={{
                width: '100%', padding: '14px',
                background: submitting ? '#ccc' : 'linear-gradient(135deg, #1B3A6B, #2D5A9E)',
                color: 'white', border: 'none', borderRadius: '10px',
                cursor: submitting ? 'not-allowed' : 'pointer',
                fontWeight: 700, fontSize: '1rem', fontFamily: "'Mukta', sans-serif"
              }}
            >
              {submitting ? '⏳ Bhej rahe hain...' : '✉️ Enquiry Bhejo'}
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
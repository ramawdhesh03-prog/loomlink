import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function ManufacturerDashboard() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({})
  const [catalogs, setCatalogs] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')
  const [popup, setPopup] = useState({ show: false, message: '', type: '' })
  const navigate = useNavigate()

  const SAREE_TYPES = [
    'Banarasi Silk', 'Kanjivaram Silk', 'Georgette', 'Chiffon',
    'Cotton', 'Linen', 'Tussar Silk', 'Chanderi', 'Patola',
    'Bandhani', 'Leheriya', 'Net', 'Crepe', 'Organza'
  ]

  useEffect(() => {
    fetchProfile()
  }, [])

  const showPopup = (message, type = 'success') => {
    setPopup({ show: true, message, type })
    setTimeout(() => setPopup({ show: false, message: '', type: '' }), 3000)
  }

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { navigate('/login'); return }

    const { data } = await supabase
      .from('manufacturers')
      .select('*')
      .eq('user_id', user.id)
      .single()

    setProfile(data)
    setForm(data || {})
    setLoading(false)

    if (data?.id) fetchCatalogs(data.id)
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

  const handleCatalogUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length || !profile?.id) return

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
    const invalidFiles = files.filter(f => !allowedTypes.includes(f.type))
    if (invalidFiles.length) {
      showPopup('Sirf JPG, PNG, WEBP ya PDF upload kar sakte hain', 'error')
      return
    }

    const maxSize = 10 * 1024 * 1024 // 10MB
    const tooBig = files.filter(f => f.size > maxSize)
    if (tooBig.length) {
      showPopup('File size 10MB se kam honi chahiye', 'error')
      return
    }

    setUploading(true)

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      setUploadProgress(`Uploading ${i + 1}/${files.length}: ${file.name}`)

      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 6)}.${ext}`
      const filePath = `manufacturer_${profile.id}/${fileName}`

      const { error } = await supabase.storage
        .from('catalogs')
        .upload(filePath, file, { cacheControl: '3600', upsert: false })

      if (error) {
        showPopup(`${file.name} upload failed: ${error.message}`, 'error')
      }
    }

    setUploading(false)
    setUploadProgress('')
    showPopup(`${files.length} file(s) successfully upload ho gaye! 🎉`)
    fetchCatalogs(profile.id)
    e.target.value = ''
  }

  const handleDeleteCatalog = async (fileName) => {
    if (!window.confirm('Kya aap is file ko delete karna chahte hain?')) return

    const filePath = `manufacturer_${profile.id}/${fileName}`
    const { error } = await supabase.storage
      .from('catalogs')
      .remove([filePath])

    if (!error) {
      showPopup('File delete ho gayi')
      fetchCatalogs(profile.id)
    } else {
      showPopup('Delete failed: ' + error.message, 'error')
    }
  }

  const handleSave = async () => {
    const { error } = await supabase
      .from('manufacturers')
      .update({
        name: form.name,
        business_name: form.business_name,
        city: form.city,
        whatsapp: form.whatsapp,
        moq: form.moq,
        price_range: form.price_range,
        saree_types: form.saree_types,
      })
      .eq('id', profile.id)

    if (!error) {
      setProfile(form)
      setEditing(false)
      showPopup('Profile save ho gaya! ✅')
    } else {
      showPopup('Save failed: ' + error.message, 'error')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const toggleSareeType = type => {
    const current = form.saree_types || []
    setForm(prev => ({
      ...prev,
      saree_types: current.includes(type)
        ? current.filter(t => t !== type)
        : [...current, type]
    }))
  }

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase()
    if (ext === 'pdf') return '📄'
    if (['jpg', 'jpeg', 'png', 'webp'].includes(ext)) return '🖼️'
    return '📁'
  }

  const isImage = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase()
    return ['jpg', 'jpeg', 'png', 'webp'].includes(ext)
  }

  const formatFileSize = (bytes) => {
    if (!bytes) return '—'
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '100px', color: '#1B3A6B', fontSize: '1.2rem' }}>
      Loading...
    </div>
  )

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: '8px',
    border: '1.5px solid #ddd', fontSize: '0.95rem',
    fontFamily: "'Mukta', sans-serif", outline: 'none', boxSizing: 'border-box'
  }

  return (
    <main style={{ padding: '40px 24px', maxWidth: '800px', margin: '0 auto' }}>

      {/* Popup */}
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

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #8B1A1A, #6B1414)',
        borderRadius: '16px', padding: '28px 32px',
        color: 'white', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '24px', flexWrap: 'wrap', gap: '16px'
      }}>
        <div>
          <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>🏭</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', margin: 0 }}>
            Manufacturer Dashboard
          </h1>
          <p style={{ opacity: 0.8, marginTop: '4px', fontSize: '0.9rem' }}>
            {profile?.business_name || 'Aapka Business'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {!editing ? (
            <button onClick={() => setEditing(true)} style={{
              background: 'rgba(255,255,255,0.2)', color: 'white',
              border: '1px solid rgba(255,255,255,0.4)', padding: '10px 20px',
              borderRadius: '8px', cursor: 'pointer', fontWeight: 600,
              fontFamily: "'Mukta', sans-serif"
            }}>
              ✏️ Edit Profile
            </button>
          ) : (
            <>
              <button onClick={handleSave} style={{
                background: '#2D7A4A', color: 'white', border: 'none',
                padding: '10px 20px', borderRadius: '8px', cursor: 'pointer',
                fontWeight: 600, fontFamily: "'Mukta', sans-serif"
              }}>
                ✅ Save
              </button>
              <button onClick={() => setEditing(false)} style={{
                background: 'rgba(255,255,255,0.2)', color: 'white',
                border: '1px solid rgba(255,255,255,0.4)', padding: '10px 20px',
                borderRadius: '8px', cursor: 'pointer', fontWeight: 600,
                fontFamily: "'Mukta', sans-serif"
              }}>
                Cancel
              </button>
            </>
          )}
          <button onClick={handleLogout} style={{
            background: 'transparent', color: 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(255,255,255,0.3)', padding: '10px 20px',
            borderRadius: '8px', cursor: 'pointer', fontFamily: "'Mukta', sans-serif"
          }}>
            Logout
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px', marginBottom: '24px'
      }}>
        {[
          { label: 'Catalogs Uploaded', value: catalogs.length, icon: '📁' },
          { label: 'Saree Types', value: (profile?.saree_types || []).length, icon: '🧵' },
          { label: 'Profile Status', value: profile?.city ? 'Active' : 'Incomplete', icon: '✅' },
        ].map((stat, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: '12px', padding: '20px',
            textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.07)'
          }}>
            <div style={{ fontSize: '1.5rem' }}>{stat.icon}</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1B3A6B', fontFamily: "'Playfair Display', serif" }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '2px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Profile Card */}
      <div style={{
        background: '#fff', borderRadius: '16px',
        padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        marginBottom: '24px'
      }}>
        <h2 style={{ color: '#1B3A6B', fontFamily: "'Playfair Display', serif", marginBottom: '24px' }}>
          📋 Mera Profile
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {[
            { label: 'Aapka Naam', key: 'name' },
            { label: 'Business Name', key: 'business_name' },
            { label: 'City', key: 'city' },
            { label: 'WhatsApp', key: 'whatsapp' },
            { label: 'Min Order Qty', key: 'moq' },
            { label: 'Price Range', key: 'price_range' },
          ].map(field => (
            <div key={field.key}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#888', marginBottom: '6px' }}>
                {field.label}
              </label>
              {editing ? (
                <input
                  value={form[field.key] || ''}
                  onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                  style={inputStyle}
                />
              ) : (
                <div style={{ padding: '10px 14px', background: '#f8f9fa', borderRadius: '8px', fontSize: '0.95rem', color: '#2D2D2D' }}>
                  {profile?.[field.key] || '—'}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Saree Types */}
        <div style={{ marginTop: '24px' }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: '#888', marginBottom: '10px' }}>
            Saree Types
          </label>
          {editing ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {SAREE_TYPES.map(type => (
                <button key={type} onClick={() => toggleSareeType(type)} style={{
                  padding: '6px 16px', borderRadius: '20px',
                  border: `2px solid ${(form.saree_types || []).includes(type) ? '#8B1A1A' : '#ddd'}`,
                  background: (form.saree_types || []).includes(type) ? '#8B1A1A' : '#fff',
                  color: (form.saree_types || []).includes(type) ? 'white' : '#666',
                  cursor: 'pointer', fontFamily: "'Mukta', sans-serif", fontSize: '0.85rem'
                }}>{type}</button>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {(profile?.saree_types || []).map(type => (
                <span key={type} style={{
                  padding: '6px 16px', borderRadius: '20px',
                  background: '#8B1A1A', color: 'white', fontSize: '0.85rem'
                }}>{type}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===================== CATALOG UPLOAD SECTION ===================== */}
      <div style={{
        background: '#fff', borderRadius: '16px',
        padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}>
        <h2 style={{ color: '#1B3A6B', fontFamily: "'Playfair Display', serif", marginBottom: '8px' }}>
          📁 Mera Catalog
        </h2>
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '24px', fontFamily: "'Mukta', sans-serif" }}>
          Apne saree catalog ki images ya PDF yahan upload karein. Wholesalers inhe dekh payenge.
        </p>

        {/* Upload Box */}
        <label style={{
          display: 'block', border: '2px dashed #F5A623',
          borderRadius: '16px', padding: '36px', textAlign: 'center',
          cursor: uploading ? 'not-allowed' : 'pointer',
          background: uploading ? '#fffbf0' : '#fffdf5',
          transition: 'all 0.2s', marginBottom: '24px'
        }}>
          <input
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.webp,.pdf"
            onChange={handleCatalogUpload}
            disabled={uploading}
            style={{ display: 'none' }}
          />
          {uploading ? (
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>⏳</div>
              <div style={{ color: '#E8821A', fontWeight: 600, fontFamily: "'Mukta', sans-serif" }}>
                {uploadProgress}
              </div>
              <div style={{ color: '#888', fontSize: '0.85rem', marginTop: '4px' }}>Please wait...</div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📤</div>
              <div style={{ color: '#1B3A6B', fontWeight: 700, fontSize: '1.1rem', fontFamily: "'Mukta', sans-serif" }}>
                Click karke files upload karein
              </div>
              <div style={{ color: '#888', fontSize: '0.85rem', marginTop: '6px' }}>
                JPG, PNG, WEBP ya PDF • Max 10MB per file • Multiple files allowed
              </div>
            </div>
          )}
        </label>

        {/* Catalog Grid */}
        {catalogs.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '40px', color: '#aaa',
            fontFamily: "'Mukta', sans-serif", fontSize: '0.95rem'
          }}>
            Abhi koi catalog upload nahi hua hai. Upar se upload karein! 👆
          </div>
        ) : (
          <div>
            <h3 style={{ color: '#1B3A6B', fontSize: '1rem', marginBottom: '16px', fontFamily: "'Mukta', sans-serif" }}>
              Uploaded Files ({catalogs.length})
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              {catalogs.map(file => (
                <div key={file.name} style={{
                  border: '1.5px solid #f0f0f0', borderRadius: '12px',
                  overflow: 'hidden', background: '#fafafa',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  {/* Preview */}
                  {isImage(file.name) ? (
                    <a href={file.url} target="_blank" rel="noreferrer">
                      <img
                        src={file.url}
                        alt={file.name}
                        style={{ width: '100%', height: '150px', objectFit: 'cover', display: 'block' }}
                      />
                    </a>
                  ) : (
                    <a href={file.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                      <div style={{
                        height: '150px', display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center',
                        background: 'linear-gradient(135deg, #fff5f5, #ffe8e8)'
                      }}>
                        <div style={{ fontSize: '3rem' }}>📄</div>
                        <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '8px' }}>PDF File</div>
                      </div>
                    </a>
                  )}

                  {/* File Info */}
                  <div style={{ padding: '12px' }}>
                    <div style={{
                      fontSize: '0.8rem', color: '#333', fontWeight: 600,
                      fontFamily: "'Mukta', sans-serif",
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                    }}>
                      {getFileIcon(file.name)} {file.name.split('_').slice(2).join('_') || file.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '4px' }}>
                      {formatFileSize(file.metadata?.size)}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          flex: 1, padding: '6px', textAlign: 'center',
                          background: '#1B3A6B', color: 'white', borderRadius: '6px',
                          fontSize: '0.78rem', textDecoration: 'none', fontFamily: "'Mukta', sans-serif"
                        }}
                      >
                        👁️ View
                      </a>
                      <button
                        onClick={() => handleDeleteCatalog(file.name)}
                        style={{
                          flex: 1, padding: '6px', background: '#fff0f0',
                          color: '#D32F2F', border: '1px solid #ffcdd2',
                          borderRadius: '6px', cursor: 'pointer',
                          fontSize: '0.78rem', fontFamily: "'Mukta', sans-serif"
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

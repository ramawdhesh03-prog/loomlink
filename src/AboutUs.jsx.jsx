import React from 'react';

const AboutUs = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', paddingTop: '80px' }}>
      
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '16px' }}>
          About LoomLink
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
          India ka pehla dedicated B2B Saree Marketplace — Manufacturers aur Wholesalers ko directly connect karta hai
        </p>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>

        {/* Mission Card */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '40px',
          marginBottom: '30px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          borderLeft: '5px solid #1a237e'
        }}>
          <h2 style={{ color: '#1a237e', fontSize: '1.6rem', marginBottom: '16px' }}>🎯 Our Mission</h2>
          <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: '1.8' }}>
            LoomLink ka mission hai India ke saree manufacturers aur wholesalers ke beech ki distance ko khatam karna. 
            Hum ek transparent, efficient aur trusted B2B platform provide karte hain jahan verified manufacturers 
            apna catalog list kar sakte hain aur wholesalers directly source kar sakte hain — bina kisi middleman ke.
          </p>
        </div>

        {/* Founder Card */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '40px',
          marginBottom: '30px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{ color: '#1a237e', fontSize: '1.6rem', marginBottom: '24px' }}>👤 Founder</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{
              width: '80px', height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1a237e, #3949ab)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '1.8rem', fontWeight: '700',
              flexShrink: 0
            }}>
              RC
            </div>
            <div>
              <h3 style={{ color: '#1a237e', fontSize: '1.3rem', marginBottom: '4px' }}>Ram Awdhesh Chauhan</h3>
              <p style={{ color: '#888', fontSize: '0.95rem', marginBottom: '8px' }}>Founder & CEO, LoomLink</p>
              <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Mechanical & Solar EPC Engineer with a vision to digitize India's saree trade. 
                LoomLink ke through, Ram saree industry ke manufacturers aur wholesalers ko ek powerful B2B network se connect kar rahe hain.
              </p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {[
            { icon: '📅', label: 'Founded', value: '18 November 2025' },
            { icon: '📍', label: 'Headquarters', value: 'Varanasi, Uttar Pradesh' },
            { icon: '🌐', label: 'Platform', value: 'www.loomlink.in' },
            { icon: '🎯', label: 'Focus', value: 'B2B Saree Marketplace' }
          ].map((item, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{item.icon}</div>
              <div style={{ color: '#888', fontSize: '0.85rem', marginBottom: '4px' }}>{item.label}</div>
              <div style={{ color: '#1a237e', fontSize: '1rem', fontWeight: '600' }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div style={{
          background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
          borderRadius: '16px',
          padding: '40px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '24px' }}>📞 Contact Information</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ opacity: 0.7, fontSize: '0.85rem', marginBottom: '4px' }}>Email</div>
              <a href="mailto:info@loomlink.in" style={{ color: 'white', fontSize: '1.05rem', textDecoration: 'none', fontWeight: '600' }}>
                info@loomlink.in
              </a>
            </div>
            <div>
              <div style={{ opacity: 0.7, fontSize: '0.85rem', marginBottom: '4px' }}>Phone</div>
              <a href="tel:8225080825" style={{ color: 'white', fontSize: '1.05rem', textDecoration: 'none', fontWeight: '600' }}>
                +91 8225080825
              </a>
            </div>
            <div>
              <div style={{ opacity: 0.7, fontSize: '0.85rem', marginBottom: '4px' }}>Address</div>
              <span style={{ fontSize: '1.05rem', fontWeight: '600' }}>Varanasi, UP</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
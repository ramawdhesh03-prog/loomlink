import { useTranslation } from 'react-i18next'

export default function AboutUs() {
  const { i18n } = useTranslation()
  const isHindi = i18n.language === 'hi'
  const isHinglish = i18n.language === 'hl'

  const content = {
    en: {
      title: 'About LoomLink',
      subtitle: "India's first dedicated B2B Saree Marketplace — directly connecting Manufacturers and Wholesalers",
      missionTitle: '🎯 Our Mission',
      mission: "LoomLink's mission is to eliminate the distance between India's saree manufacturers and wholesalers. We provide a transparent, efficient and trusted B2B platform where verified manufacturers can list their catalog and wholesalers can source directly — without any middleman.",
      founded: 'Founded',
      foundedVal: '18 November 2025',
      hq: 'Headquarters',
      hqVal: 'Varanasi, Uttar Pradesh',
      platform: 'Platform',
      focus: 'Focus',
      focusVal: 'B2B Saree Marketplace',
      contactTitle: '📞 Contact Information',
    },
    hi: {
      title: 'LoomLink के बारे में',
      subtitle: 'भारत का पहला B2B साड़ी मार्केटप्लेस — निर्माताओं और थोक विक्रेताओं को सीधे जोड़ता है',
      missionTitle: '🎯 हमारा मिशन',
      mission: 'LoomLink का मिशन है भारत के साड़ी निर्माताओं और थोक विक्रेताओं के बीच की दूरी को खत्म करना। हम एक transparent, efficient और trusted B2B platform provide करते हैं जहाँ verified manufacturers अपना catalog list कर सकते हैं और wholesalers directly source कर सकते हैं — बिना किसी middleman के।',
      founded: 'स्थापित',
      foundedVal: '18 नवंबर 2025',
      hq: 'मुख्यालय',
      hqVal: 'वाराणसी, उत्तर प्रदेश',
      platform: 'प्लेटफॉर्म',
      focus: 'फोकस',
      focusVal: 'B2B साड़ी मार्केटप्लेस',
      contactTitle: '📞 संपर्क जानकारी',
    },
    hl: {
      title: 'LoomLink Ke Baare Mein',
      subtitle: "India ka pehla dedicated B2B Saree Marketplace — Manufacturers aur Wholesalers ko seedha connect karta hai",
      missionTitle: '🎯 Hamara Mission',
      mission: "LoomLink ka mission hai India ke saree manufacturers aur wholesalers ke beech ki doori khatam karna. Hum ek transparent, efficient aur trusted B2B platform provide karte hain jahan verified manufacturers apna catalog list kar sakte hain aur wholesalers directly source kar sakte hain — bina kisi middleman ke.",
      founded: 'Founded',
      foundedVal: '18 November 2025',
      hq: 'Headquarters',
      hqVal: 'Varanasi, Uttar Pradesh',
      platform: 'Platform',
      focus: 'Focus',
      focusVal: 'B2B Saree Marketplace',
      contactTitle: '📞 Contact Information',
    }
  }

  const c = isHindi ? content.hi : isHinglish ? content.hl : content.en

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', paddingTop: '80px' }}>

      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1B3A6B 0%, #2D5A9E 100%)',
        color: 'white', padding: '60px 20px', textAlign: 'center'
      }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 700, marginBottom: '16px' }}>
          {c.title}
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto', fontFamily: "'Mukta', sans-serif" }}>
          {c.subtitle}
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>

        {/* Mission Card */}
        <div style={{
          background: 'white', borderRadius: '16px', padding: '40px',
          marginBottom: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          borderLeft: '5px solid #1B3A6B'
        }}>
          <h2 style={{ color: '#1B3A6B', fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', marginBottom: '16px' }}>
            {c.missionTitle}
          </h2>
          <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: 1.8, fontFamily: "'Mukta', sans-serif" }}>
            {c.mission}
          </p>
        </div>

        {/* Info Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px', marginBottom: '30px'
        }}>
          {[
            { icon: '📅', label: c.founded, value: c.foundedVal },
            { icon: '📍', label: c.hq, value: c.hqVal },
            { icon: '🌐', label: c.platform, value: 'www.loomlink.in' },
            { icon: '🎯', label: c.focus, value: c.focusVal },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'white', borderRadius: '12px', padding: '24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{item.icon}</div>
              <div style={{ color: '#888', fontSize: '0.85rem', marginBottom: '4px', fontFamily: "'Mukta', sans-serif" }}>{item.label}</div>
              <div style={{ color: '#1B3A6B', fontSize: '1rem', fontWeight: 600, fontFamily: "'Mukta', sans-serif" }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div style={{
          background: 'linear-gradient(135deg, #1B3A6B 0%, #2D5A9E 100%)',
          borderRadius: '16px', padding: '40px', color: 'white', textAlign: 'center'
        }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', marginBottom: '24px' }}>
            {c.contactTitle}
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ opacity: 0.7, fontSize: '0.85rem', marginBottom: '4px' }}>Email</div>
              <a href="mailto:info@loomlink.in" style={{ color: 'white', fontSize: '1.05rem', textDecoration: 'none', fontWeight: 600 }}>info@loomlink.in</a>
            </div>
            <div>
              <div style={{ opacity: 0.7, fontSize: '0.85rem', marginBottom: '4px' }}>Phone</div>
              <a href="tel:8225080825" style={{ color: 'white', fontSize: '1.05rem', textDecoration: 'none', fontWeight: 600 }}>+91 8225080825</a>
            </div>
            <div>
              <div style={{ opacity: 0.7, fontSize: '0.85rem', marginBottom: '4px' }}>Address</div>
              <span style={{ fontSize: '1.05rem', fontWeight: 600 }}>Varanasi, UP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
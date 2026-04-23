import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', paddingTop: '80px' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1B3A6B 0%, #2D5A9E 100%)',
        color: 'white', padding: '60px 20px', textAlign: 'center'
      }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 700, marginBottom: '16px' }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: '1rem', opacity: 0.8, fontFamily: "'Mukta', sans-serif" }}>
          Last updated: April 2026
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>

        {[
          {
            title: '1. Introduction',
            content: 'LoomLink ("we", "us", or "our") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform at www.loomlink.in.'
          },
          {
            title: '2. Information We Collect',
            content: 'We collect the following information: Personal details (name, email address, phone number, WhatsApp number), Business information (business name, city, GST number if provided), Usage data (pages visited, time spent, device information), Communication data (messages sent through our platform, enquiries submitted).'
          },
          {
            title: '3. How We Use Your Information',
            content: 'Your information is used to: create and manage your account, connect manufacturers with wholesalers, send important platform notifications, improve our services, prevent fraud and ensure platform security, and comply with legal obligations. We do NOT use your data for unrelated advertising.'
          },
          {
            title: '4. Data Sharing',
            content: 'We do NOT sell your personal data to third parties. We may share limited information with: service providers who help us operate the platform (e.g., hosting, database), law enforcement when legally required. Your contact details (phone, WhatsApp) are NEVER shared directly with other users without your consent.'
          },
          {
            title: '5. Data Security',
            content: 'We use industry-standard security measures to protect your data including encrypted connections (HTTPS), secure database storage via Supabase, and regular security reviews. However, no internet transmission is 100% secure and we cannot guarantee absolute security.'
          },
          {
            title: '6. Cookies',
            content: 'LoomLink uses minimal cookies to maintain your login session and remember your language preference. We do not use advertising or tracking cookies. You can disable cookies in your browser settings, but this may affect platform functionality.'
          },
          {
            title: '7. Your Rights',
            content: 'You have the right to: access the personal data we hold about you, request correction of inaccurate data, request deletion of your account and associated data, withdraw consent for data processing. To exercise these rights, contact us at info@loomlink.in.'
          },
          {
            title: '8. Data Retention',
            content: 'We retain your data for as long as your account is active. If you delete your account, we will remove your personal data within 30 days, except where we are legally required to retain it.'
          },
          {
            title: '9. Children\'s Privacy',
            content: 'LoomLink is a B2B platform intended for business use only. We do not knowingly collect data from anyone under 18 years of age. If we discover we have collected data from a minor, we will delete it immediately.'
          },
          {
            title: '10. Changes to This Policy',
            content: 'We may update this Privacy Policy from time to time. We will notify registered users of significant changes via email. Continued use of the platform after changes constitutes acceptance of the updated policy.'
          },
          {
            title: '11. Contact Us',
            content: 'For any privacy-related questions or requests, contact us at: Email: info@loomlink.in | Phone: +91 8225080825 | Address: LoomLink, Varanasi, Uttar Pradesh, India'
          },
        ].map((section, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: '16px', padding: '32px',
            marginBottom: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            borderLeft: '4px solid #2D7A4A'
          }}>
            <h2 style={{ color: '#1B3A6B', fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', marginBottom: '12px' }}>
              {section.title}
            </h2>
            <p style={{ color: '#555', lineHeight: 1.8, fontFamily: "'Mukta', sans-serif", fontSize: '0.97rem', margin: 0 }}>
              {section.content}
            </p>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/" style={{
            background: '#1B3A6B', color: 'white', padding: '12px 32px',
            borderRadius: '8px', textDecoration: 'none', fontWeight: 600,
            fontFamily: "'Mukta', sans-serif"
          }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
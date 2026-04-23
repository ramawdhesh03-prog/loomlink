import { Link } from 'react-router-dom'

export default function TermsConditions() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', paddingTop: '80px' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1B3A6B 0%, #2D5A9E 100%)',
        color: 'white', padding: '60px 20px', textAlign: 'center'
      }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 700, marginBottom: '16px' }}>
          Terms & Conditions
        </h1>
        <p style={{ fontSize: '1rem', opacity: 0.8, fontFamily: "'Mukta', sans-serif" }}>
          Last updated: April 2026
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>

        {[
          {
            title: '1. Acceptance of Terms',
            content: 'By accessing or using LoomLink (www.loomlink.in), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our platform. These terms apply to all users including manufacturers, wholesalers, and visitors.'
          },
          {
            title: '2. Platform Role',
            content: 'LoomLink is a B2B marketplace platform that connects saree manufacturers with wholesalers. LoomLink acts as an intermediary and is NOT a buyer or seller of any goods. All transactions are directly between manufacturers and wholesalers. LoomLink does not hold inventory or take possession of any goods.'
          },
          {
            title: '3. User Registration',
            content: 'Users must provide accurate and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials. LoomLink reserves the right to suspend or terminate accounts that provide false information or violate these terms. Each user may only maintain one account.'
          },
          {
            title: '4. Manufacturer Responsibilities',
            content: 'Manufacturers must ensure all product listings are accurate, including pricing, MOQ, and product descriptions. Manufacturers are responsible for the quality of goods supplied. Any false or misleading listings may result in immediate account suspension. Manufacturers must honor confirmed orders.'
          },
          {
            title: '5. Wholesaler Responsibilities',
            content: 'Wholesalers must provide accurate business information. Confirmed orders must be honored. Wholesalers must raise any disputes within 48 hours of receiving goods. Repeated cancellations or fraudulent behavior may result in account suspension.'
          },
          {
            title: '6. Prohibited Activities',
            content: 'The following are strictly prohibited: sharing contact information to bypass the platform, creating multiple accounts, posting false reviews or ratings, using the platform for any illegal activities, attempting to hack or disrupt platform services, and soliciting other users outside the platform.'
          },
          {
            title: '7. Commission & Fees',
            content: 'LoomLink is currently free for both manufacturers and wholesalers. LoomLink reserves the right to introduce service fees in the future with prior notice of 30 days to registered users.'
          },
          {
            title: '8. Limitation of Liability',
            content: 'LoomLink is not liable for any losses arising from transactions between manufacturers and wholesalers. We do not guarantee the quality, safety, or legality of items listed. LoomLink\'s maximum liability shall not exceed the service fees paid by the user in the preceding 3 months.'
          },
          {
            title: '9. Account Termination',
            content: 'LoomLink reserves the right to suspend or permanently terminate any account that violates these terms, engages in fraudulent activity, receives multiple genuine complaints, or misuses the platform in any way.'
          },
          {
            title: '10. Governing Law',
            content: 'These Terms shall be governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Varanasi, Uttar Pradesh, India.'
          },
          {
            title: '11. Contact Us',
            content: 'For any questions regarding these Terms & Conditions, please contact us at: Email: info@loomlink.in | Phone: +91 8225080825 | Address: LoomLink, Varanasi, Uttar Pradesh, India'
          },
        ].map((section, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: '16px', padding: '32px',
            marginBottom: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            borderLeft: '4px solid #1B3A6B'
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
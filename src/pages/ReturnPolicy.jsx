import { Link } from 'react-router-dom'

export default function ReturnPolicy() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', paddingTop: '80px' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1B3A6B 0%, #2D5A9E 100%)',
        color: 'white', padding: '60px 20px', textAlign: 'center'
      }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 700, marginBottom: '16px' }}>
          Return & Dispute Policy
        </h1>
        <p style={{ fontSize: '1rem', opacity: 0.8, fontFamily: "'Mukta', sans-serif" }}>
          Last updated: April 2026
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>

        {/* Important Notice */}
        <div style={{
          background: '#fff8e1', border: '2px solid #F5A623',
          borderRadius: '16px', padding: '24px', marginBottom: '32px'
        }}>
          <h3 style={{ color: '#E8821A', fontFamily: "'Playfair Display', serif", marginBottom: '8px' }}>
            ⚠️ Important Notice
          </h3>
          <p style={{ color: '#555', fontFamily: "'Mukta', sans-serif", lineHeight: 1.8, margin: 0 }}>
            LoomLink is a marketplace platform — we connect manufacturers and wholesalers. We are NOT a direct seller. Returns and disputes are primarily between the buyer (wholesaler) and seller (manufacturer), with LoomLink acting as a mediator when needed.
          </p>
        </div>

        {[
          {
            title: '1. Return Eligibility',
            content: 'Returns may be considered in the following cases: Wrong product delivered (different from what was ordered), Damaged or defective goods received, Significant quality difference from catalog/sample shown, Quantity shortage in delivered order. Returns are NOT accepted for: change of mind after delivery, minor color variations due to screen display, goods damaged by the buyer after delivery.'
          },
          {
            title: '2. Dispute Reporting Timeline',
            content: 'All disputes must be reported within 48 hours of receiving the goods. To report a dispute, contact LoomLink at info@loomlink.in or WhatsApp +91 8225080825 with: your order details, photos/videos of the issue, description of the problem. Disputes reported after 48 hours may not be eligible for resolution.'
          },
          {
            title: '3. Dispute Resolution Process',
            content: 'Step 1: Wholesaler reports dispute to LoomLink within 48 hours with evidence. Step 2: LoomLink reviews the evidence and contacts the manufacturer within 24 hours. Step 3: Manufacturer responds within 48 hours. Step 4: LoomLink mediates and proposes resolution within 72 hours. Step 5: If unresolved, LoomLink makes a final decision based on evidence provided.'
          },
          {
            title: '4. Possible Resolutions',
            content: 'Depending on the dispute, resolutions may include: replacement of goods by manufacturer, partial or full refund, credit note for future orders, or mutual agreement between parties. LoomLink\'s decision in mediation cases shall be final and binding on both parties.'
          },
          {
            title: '5. Return Shipping',
            content: 'If a return is approved: For manufacturer\'s fault — return shipping cost is borne by the manufacturer. For disputed cases — LoomLink will determine who bears the shipping cost based on investigation. Goods must be returned in original packaging where possible.'
          },
          {
            title: '6. LoomLink\'s Role & Limitations',
            content: 'LoomLink will make best efforts to mediate disputes fairly. However, LoomLink is not liable for: quality of goods manufactured or supplied, losses arising from delayed deliveries, disputes where neither party can provide sufficient evidence. LoomLink\'s maximum liability is limited to the platform service fee collected, if any.'
          },
          {
            title: '7. Manufacturer Accountability',
            content: 'Manufacturers with repeated quality complaints or disputes may face: warning notices, temporary account suspension, permanent removal from the platform. LoomLink maintains the right to take action to protect wholesaler interests and platform integrity.'
          },
          {
            title: '8. Contact for Disputes',
            content: 'To raise a dispute or for any return-related queries, contact us immediately at: Email: info@loomlink.in | WhatsApp: +91 8225080825 | Response Time: Within 24 hours on business days'
          },
        ].map((section, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: '16px', padding: '32px',
            marginBottom: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            borderLeft: '4px solid #E8821A'
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
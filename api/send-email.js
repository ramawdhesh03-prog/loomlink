// api/send-email.js — Vercel Serverless Function

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { type, name, business, phone } = req.body

  const isManufacturer = type === 'manufacturer'
  const subject = isManufacturer
    ? `New Manufacturer Registration: ${business}`
    : `New Wholesaler Registration: ${business}`

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #8B1A1A; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #C9A84C; margin: 0; font-size: 1.8rem;">LoomLink</h1>
        <p style="color: rgba(250,247,242,0.8); margin: 8px 0 0;">New ${isManufacturer ? 'Manufacturer' : 'Wholesaler'} Registration</p>
      </div>
      <div style="background: #f9f9f9; padding: 32px; border: 1px solid #eee; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%;">
          <tr><td style="padding: 8px 0; color: #666;">Name:</td><td style="font-weight: 600;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Business:</td><td style="font-weight: 600;">${business}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Phone:</td><td style="font-weight: 600;">${phone}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Type:</td><td style="font-weight: 600; color: #8B1A1A;">${isManufacturer ? 'Manufacturer' : 'Wholesaler'}</td></tr>
        </table>
        <p style="margin-top: 24px; color: #888; font-size: 0.85rem;">This registration was submitted via loomlink.in</p>
      </div>
    </div>
  `

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'LoomLink <noreply@loomlink.in>',
        to: ['hello@loomlink.in'],
        subject,
        html,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      throw new Error(err)
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Resend error:', error)
    return res.status(500).json({ error: 'Email failed' })
  }
}

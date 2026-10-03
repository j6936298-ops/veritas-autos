// Vercel serverless endpoint. Configure RESEND_API_KEY and MAIL_FROM in Vercel
// before expecting real email delivery. Never expose provider secrets in React.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email, name, ticketId, subject, status } = req.body || {};
  if (!email || !ticketId || !status) return res.status(400).json({ error: 'Missing required fields' });
  if (!process.env.RESEND_API_KEY || !process.env.MAIL_FROM) {
    return res.status(202).json({ delivered: false, demo: true, message: 'Email provider is not configured yet.' });
  }
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.MAIL_FROM,
        to: [email],
        subject: `Veritas Autos support ticket ${ticketId}: ${status}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#172334"><h2>Veritas Autos Support</h2><p>Hello ${escapeHtml(name || 'there')},</p><p>Your ticket <b>${escapeHtml(ticketId)}</b> — ${escapeHtml(subject || 'Support request')} — has been marked <b>${escapeHtml(status)}</b>.</p><p>Sign in to your Veritas Autos dashboard to read the latest reply.</p><p>Genuine parts. Greater journeys.</p></div>`
      })
    });
    const data = await response.json();
    if (!response.ok) return res.status(502).json({ error: 'Email provider rejected the request', detail: data.message || 'Unknown provider error' });
    return res.status(200).json({ delivered: true, id: data.id });
  } catch {
    return res.status(500).json({ error: 'Unable to send notification right now' });
  }
}
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

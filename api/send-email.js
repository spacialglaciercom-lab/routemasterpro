import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, message' });
  }

  const toEmail = process.env.CONTACT_EMAIL || process.env.TO_EMAIL;
  if (!process.env.RESEND_API_KEY || !toEmail) {
    console.error('Missing RESEND_API_KEY or CONTACT_EMAIL/TO_EMAIL');
    return res.status(500).json({ error: 'Email not configured' });
  }

  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'RouteMaster Pro <contact@routemasterpro.ca>',
      to: toEmail,
      replyTo: email,
      subject: `New Beta Signup from ${name}`,
      html: [
        `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
        `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
        company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : '',
        `<p><strong>Message:</strong></p><p>${escapeHtml(message)}</p>`,
      ].join(''),
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    res.status(500).json({ error: error.message || 'Failed to send email' });
  }
}

function escapeHtml(text) {
  if (!text) return '';
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(text).replace(/[&<>"']/g, (c) => map[c]);
}

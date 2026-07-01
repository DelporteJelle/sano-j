export type ContactFields = {
  naam: string
  email: string
  telefoon?: string
  bericht: string
}

export async function sendContactEmail(fields: ContactFields): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) throw new Error('BREVO_API_KEY is not set')

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Sano-J Website', email: 'jonasquintyn@gmail.com' }, // update to noreply@yourdomain.be once domain + Brevo sender is verified
      to: [{ email: 'jonasquintyn@gmail.com', name: 'Jonas Quintyn' }],
      replyTo: { email: fields.email, name: fields.naam },
      subject: `Nieuw contactbericht van ${fields.naam}`,
      htmlContent: `
        <h2>Nieuw bericht via sano-j.be</h2>
        <p><strong>Naam:</strong> ${fields.naam}</p>
        <p><strong>E-mail:</strong> ${fields.email}</p>
        ${fields.telefoon ? `<p><strong>Telefoon:</strong> ${fields.telefoon}</p>` : ''}
        <p><strong>Bericht:</strong></p>
        <p>${fields.bericht.replace(/\n/g, '<br/>')}</p>
      `,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Brevo API error: ${error}`)
  }
}

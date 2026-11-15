import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/brevo'

export async function POST(req: NextRequest) {
  let body: { naam?: string; email?: string; telefoon?: string; bericht?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ongeldig verzoek.' }, { status: 400 })
  }
  const { naam, email, telefoon, bericht } = body
  const telefoonnummer = typeof telefoon === 'string' ? telefoon.trim() : ''

  if (!naam || !email || !telefoonnummer || !bericht) {
    return NextResponse.json({ error: 'Naam, e-mail, telefoonnummer en bericht zijn verplicht.' }, { status: 400 })
  }

  try {
    await sendContactEmail({ naam, email, telefoon: telefoonnummer, bericht })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Bericht kon niet worden verstuurd. Probeer het later opnieuw.' }, { status: 500 })
  }
}

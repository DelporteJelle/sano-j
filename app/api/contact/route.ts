import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/brevo'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { naam, email, telefoon, bericht } = body

  if (!naam || !email || !bericht) {
    return NextResponse.json({ error: 'Naam, e-mail en bericht zijn verplicht.' }, { status: 400 })
  }

  try {
    await sendContactEmail({ naam, email, telefoon, bericht })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Bericht kon niet worden verstuurd. Probeer het later opnieuw.' }, { status: 500 })
  }
}

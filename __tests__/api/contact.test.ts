import { POST } from '@/app/api/contact/route'
import { NextRequest } from 'next/server'

// Mock brevo so we don't hit the real API in tests
vi.mock('@/lib/brevo', () => ({
  sendContactEmail: vi.fn().mockResolvedValue(undefined),
}))

function makeRequest(body: Record<string, string>) {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/contact', () => {
  it('returns 200 with valid fields', async () => {
    const req = makeRequest({
      naam: 'Jan Peeters',
      email: 'jan@example.com',
      telefoon: '0499123456',
      bericht: 'Ik wil graag een afspraak.',
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
  })

  it('returns 400 when naam is missing', async () => {
    const req = makeRequest({ email: 'jan@example.com', bericht: 'test' })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 when email is missing', async () => {
    const req = makeRequest({ naam: 'Jan', bericht: 'test' })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 when bericht is missing', async () => {
    const req = makeRequest({ naam: 'Jan', email: 'jan@example.com' })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})

'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const data = {
      naam: (form.elements.namedItem('naam') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      telefoon: (form.elements.namedItem('telefoon') as HTMLInputElement).value,
      bericht: (form.elements.namedItem('bericht') as HTMLTextAreaElement).value,
    }

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      setState('success')
      form.reset()
    } else {
      const json = await res.json()
      setErrorMsg(json.error ?? 'Er ging iets mis.')
      setState('error')
    }
  }

  const inputClass = 'w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] text-brand-black focus:outline-none focus:border-yellow transition-colors'

  if (state === 'success') {
    return (
      <div className="bg-yellow/20 border border-yellow rounded-xl p-8 text-center">
        <p className="font-serif text-2xl text-brand-black mb-2">Bedankt!</p>
        <p className="text-[14px] text-brand-gray">Uw bericht is ontvangen. Jonas neemt zo snel mogelijk contact met u op.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[12px] font-semibold text-brand-black mb-1.5" htmlFor="naam">
            Naam <span className="text-yellow">*</span>
          </label>
          <input id="naam" name="naam" type="text" required className={inputClass} placeholder="Jan Peeters" />
        </div>
        <div>
          <label className="block text-[12px] font-semibold text-brand-black mb-1.5" htmlFor="email">
            E-mailadres <span className="text-yellow">*</span>
          </label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="jan@email.com" />
        </div>
      </div>
      <div>
        <label className="block text-[12px] font-semibold text-brand-black mb-1.5" htmlFor="telefoon">
          Telefoonnummer <span className="text-yellow">*</span>
        </label>
        <input id="telefoon" name="telefoon" type="tel" required className={inputClass} placeholder="0499 00 00 00" />
      </div>
      <div>
        <label className="block text-[12px] font-semibold text-brand-black mb-1.5" htmlFor="bericht">
          Bericht <span className="text-yellow">*</span>
        </label>
        <textarea
          id="bericht"
          name="bericht"
          required
          rows={5}
          className={inputClass}
          placeholder="Stel uw vraag of omschrijf uw noden..."
        />
      </div>

      {state === 'error' && (
        <p className="text-red-600 text-[13px]">{errorMsg}</p>
      )}

      <Button variant="primary" type="submit" disabled={state === 'loading'}>
        {state === 'loading' ? 'Bezig met verzenden...' : 'Verstuur bericht →'}
      </Button>
    </form>
  )
}

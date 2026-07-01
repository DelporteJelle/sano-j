'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NAV_LINKS } from '@/lib/content'
import Button from '@/components/ui/Button'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-sm'
          : 'bg-gradient-to-b from-black/52 to-transparent'
      }`}
    >
      <nav className="flex items-center gap-0 px-8 md:px-12 py-5">
        {/* Logo */}
        <Link
          href="/"
          className={`font-serif text-[22px] tracking-wide mr-9 flex-shrink-0 ${
            scrolled ? 'text-brand-black' : 'text-yellow'
          }`}
        >
          Sano-J
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-7 flex-1 list-none">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-[13px] font-medium transition-colors ${
                  scrolled
                    ? 'text-brand-black hover:text-yellow'
                    : 'text-white/85 hover:text-yellow'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button variant="primary" href="/afspraak" className="hidden md:inline-flex flex-shrink-0">
          Maak uw afspraak
        </Button>

        {/* Hamburger */}
        <button
          className="md:hidden ml-auto p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu openen"
        >
          <span className={`block w-6 h-0.5 mb-1.5 transition-colors ${scrolled ? 'bg-brand-black' : 'bg-white'}`} />
          <span className={`block w-6 h-0.5 mb-1.5 transition-colors ${scrolled ? 'bg-brand-black' : 'bg-white'}`} />
          <span className={`block w-6 h-0.5 transition-colors ${scrolled ? 'bg-brand-black' : 'bg-white'}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-8 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-brand-black font-medium text-base"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="primary" href="/afspraak" className="mt-2 w-full justify-center">
            Maak uw afspraak
          </Button>
        </div>
      )}
    </header>
  )
}

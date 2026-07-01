# Grouped Cal.com Booking Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the single flat Cal.com booking embed on `/afspraak` with a 3-step, URL-driven flow (category → session variant → Cal.com calendar for one specific event type), and deep-link into it from `/behandelingen`.

**Architecture:** All grouping logic lives in this repo's own data/components — Cal.com never sees "categories," it only ever renders the calendar for one event type at a time via `calLink="jelle-d-odewhk/<calSlug>"`. State (`type`, `sessie`) lives in the URL query string so back/forward and deep links work for free.

**Tech Stack:** Next.js 16 App Router, React 19, `@calcom/embed-react`, Tailwind v4, Vitest + Testing Library.

## Global Constraints

- Cal.com username: `jelle-d-odewhk`. Embed namespace: `sano-j` (both copied verbatim from current `app/afspraak/page.tsx`).
- `calSlug` naming convention: `<categorie-kort>-<lichaamsdeel>-<duur>` (e.g. `ontspanning-volledig-90`), fixed values are listed in Task 1 — do not deviate, since these must match event types created manually in the Cal.com dashboard.
- All user-facing copy is Dutch, matching existing site tone (see current `app/afspraak/page.tsx`, `app/behandelingen/page.tsx`).
- Tailwind utility classes must reuse existing design tokens already used in the codebase: `bg-cream`, `bg-brand-black`, `text-brand-black`, `text-brand-gray`, `bg-yellow`, `text-yellow` — do not invent new colors.
- `TARIEVEN` and `ABONNEMENTEN` remain consumed unchanged by `app/tarieven/page.tsx` and `app/abonnementen/page.tsx` (they only read `.naam` and `.rijen[].{behandeling,duur,prijs}`) — additive fields only, no breaking changes to those pages.

---

### Task 1: Data model — category slugs, calSlug mapping, startprijs

**Files:**
- Modify: `lib/content.ts`
- Modify: `components/sections/TreatmentsGrid.tsx`
- Test: `__tests__/lib/content.test.ts`

**Interfaces:**
- Produces: `Behandeling.startprijs: string`; `TarievenRij = { behandeling: string; duur: string; prijs: string; calSlug: string }`; `TarievenGroep = { slug: string; naam: string; rijen: TarievenRij[] }`; `AbonnementRij = { behandeling: string; duur: string; prijs: string }`; `AbonnementGroep = { naam: string; rijen: AbonnementRij[] }`.
- Consumes: nothing (this is the base data task).

- [ ] **Step 1: Write the failing data-integrity test**

Create `__tests__/lib/content.test.ts`:

```ts
import { BEHANDELINGEN, TARIEVEN } from '@/lib/content'

describe('content data integrity', () => {
  it('gives every Behandeling a startprijs', () => {
    BEHANDELINGEN.forEach((b) => {
      expect(b.startprijs).toBeTruthy()
    })
  })

  it('links every TARIEVEN group to a matching Behandeling slug', () => {
    const behandelingSlugs = BEHANDELINGEN.map((b) => b.slug)
    TARIEVEN.forEach((groep) => {
      expect(behandelingSlugs).toContain(groep.slug)
    })
  })

  it('gives every TARIEVEN row a unique calSlug', () => {
    const calSlugs = TARIEVEN.flatMap((groep) => groep.rijen.map((r) => r.calSlug))
    expect(new Set(calSlugs).size).toBe(calSlugs.length)
    calSlugs.forEach((slug) => expect(slug).toBeTruthy())
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run __tests__/lib/content.test.ts`
Expected: FAIL — `TypeError` or assertion failure, since `slug`/`calSlug`/`startprijs` don't exist on the current data yet (values are `undefined`).

- [ ] **Step 3: Update `lib/content.ts`**

Replace the `Behandeling` type and `BEHANDELINGEN` array with (adding `startprijs` to the type and to each entry — keep all other existing fields/values exactly as they are today):

```ts
export type Behandeling = {
  slug: string
  naam: string
  tagline: string
  beschrijving: string
  indicaties: string[]
  afbeelding: string
  afbeeldingAlt: string
  startprijs: string
}
```

Add `startprijs: '€50'` to the `ontspanningsmassage` entry, `startprijs: '€40'` to `sportmassage`, `startprijs: '€25'` to `cupping`, `startprijs: '€15'` to `medical-taping` (these match the values already hardcoded in `components/sections/TreatmentsGrid.tsx`'s `START_PRIJZEN`).

Replace the `TarievenGroep` type and `TARIEVEN` array with:

```ts
export type TarievenRij = {
  behandeling: string
  duur: string
  prijs: string
  calSlug: string
}

export type TarievenGroep = {
  slug: string
  naam: string
  rijen: TarievenRij[]
}

export const TARIEVEN: TarievenGroep[] = [
  {
    slug: 'ontspanningsmassage',
    naam: 'Ontspanningsmassage',
    rijen: [
      { behandeling: 'Volledig lichaam', duur: "90'", prijs: '€100', calSlug: 'ontspanning-volledig-90' },
      { behandeling: 'Volledig lichaam', duur: "60'", prijs: '€70', calSlug: 'ontspanning-volledig-60' },
      { behandeling: 'Rug-nek-benen', duur: "60'", prijs: '€70', calSlug: 'ontspanning-rug-nek-benen-60' },
      { behandeling: 'Rug-nek', duur: "50'", prijs: '€60', calSlug: 'ontspanning-rug-nek-50' },
      { behandeling: 'Rug-nek', duur: "40'", prijs: '€50', calSlug: 'ontspanning-rug-nek-40' },
      { behandeling: 'Benen', duur: "40'", prijs: '€50', calSlug: 'ontspanning-benen-40' },
    ],
  },
  {
    slug: 'sportmassage',
    naam: 'Sportmassage',
    rijen: [
      { behandeling: 'Rug-nek-benen', duur: "90'", prijs: '€100', calSlug: 'sport-rug-nek-benen-90' },
      { behandeling: 'Rug-nek-benen', duur: "60'", prijs: '€70', calSlug: 'sport-rug-nek-benen-60' },
      { behandeling: 'Rug-nek', duur: "40'", prijs: '€50', calSlug: 'sport-rug-nek-40' },
      { behandeling: 'Benen', duur: "40'", prijs: '€50', calSlug: 'sport-benen-40' },
      { behandeling: 'Rug-nek', duur: "30'", prijs: '€40', calSlug: 'sport-rug-nek-30' },
      { behandeling: 'Benen', duur: "30'", prijs: '€40', calSlug: 'sport-benen-30' },
    ],
  },
  {
    slug: 'cupping',
    naam: 'Hijama Cupping',
    rijen: [
      { behandeling: 'Hijama Cupping massage', duur: "30'", prijs: '€40', calSlug: 'cupping-massage-30' },
      { behandeling: 'Hijama Cupping', duur: "20'", prijs: '€25', calSlug: 'cupping-20' },
    ],
  },
  {
    slug: 'medical-taping',
    naam: 'Medical Taping',
    rijen: [
      { behandeling: 'Plaats waar nodig', duur: "15'", prijs: '€15', calSlug: 'taping-15' },
    ],
  },
]
```

Replace `export type AbonnementGroep = TarievenGroep` with its own independent type (leave `ABONNEMENTEN`'s array contents unchanged):

```ts
export type AbonnementRij = { behandeling: string; duur: string; prijs: string }
export type AbonnementGroep = { naam: string; rijen: AbonnementRij[] }
```

- [ ] **Step 4: Update `components/sections/TreatmentsGrid.tsx` to use the new `startprijs` field**

Remove the local `START_PRIJZEN` map and the now-unnecessary `Record` usage. Replace:

```tsx
const START_PRIJZEN: Record<string, string> = {
  ontspanningsmassage: '€50',
  sportmassage: '€40',
  cupping: '€25',
  'medical-taping': '€15',
}
```

(delete this block entirely), and change:

```tsx
startprijs={START_PRIJZEN[b.slug]}
```

to:

```tsx
startprijs={b.startprijs}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run __tests__/lib/content.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 6: Run full suite to confirm no regressions**

Run: `npx vitest run`
Expected: PASS (all test files, including `TreatmentCard.test.tsx`)

- [ ] **Step 7: Commit**

```bash
git add lib/content.ts components/sections/TreatmentsGrid.tsx __tests__/lib/content.test.ts
git commit -m "feat: add category slugs and Cal.com slug mapping to pricing data"
```

---

### Task 2: `CategoryStep` component (Step A — category picker)

**Files:**
- Create: `components/booking/CategoryStep.tsx`
- Test: `__tests__/components/CategoryStep.test.tsx`

**Interfaces:**
- Consumes: `BEHANDELINGEN` from `@/lib/content` (each item has `slug`, `naam`, `startprijs`, `afbeelding`, `afbeeldingAlt` — from Task 1); `TreatmentCard` from `@/components/ui/TreatmentCard` (props: `naam`, `startprijs`, `afbeelding`, `afbeeldingAlt`, `href`).
- Produces: `CategoryStep` default export, no props: `() => JSX.Element`. Renders one `TreatmentCard`-wrapped link per category, each linking to `/afspraak?type=<slug>`.

- [ ] **Step 1: Write the failing test**

Create `__tests__/components/CategoryStep.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import CategoryStep from '@/components/booking/CategoryStep'

describe('CategoryStep', () => {
  it('renders a card for every treatment category', () => {
    render(<CategoryStep />)
    expect(screen.getByText('Ontspanningsmassage')).toBeInTheDocument()
    expect(screen.getByText('Sportmassage')).toBeInTheDocument()
    expect(screen.getByText('Cupping')).toBeInTheDocument()
    expect(screen.getByText('Medical Taping')).toBeInTheDocument()
  })

  it('links each card to /afspraak with the category type in the query string', () => {
    render(<CategoryStep />)
    expect(screen.getByRole('link', { name: /sportmassage/i })).toHaveAttribute(
      'href',
      '/afspraak?type=sportmassage'
    )
    expect(screen.getByRole('link', { name: /medical taping/i })).toHaveAttribute(
      'href',
      '/afspraak?type=medical-taping'
    )
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run __tests__/components/CategoryStep.test.tsx`
Expected: FAIL — cannot find module `@/components/booking/CategoryStep`.

- [ ] **Step 3: Write minimal implementation**

Create `components/booking/CategoryStep.tsx`:

```tsx
import { BEHANDELINGEN } from '@/lib/content'
import TreatmentCard from '@/components/ui/TreatmentCard'

export default function CategoryStep() {
  return (
    <div>
      <p className="text-center text-[15px] text-brand-gray mb-8">
        Kies eerst uw behandeling.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {BEHANDELINGEN.map((b) => (
          <TreatmentCard
            key={b.slug}
            naam={b.naam}
            startprijs={b.startprijs}
            afbeelding={b.afbeelding}
            afbeeldingAlt={b.afbeeldingAlt}
            href={`/afspraak?type=${b.slug}`}
          />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run __tests__/components/CategoryStep.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add components/booking/CategoryStep.tsx __tests__/components/CategoryStep.test.tsx
git commit -m "feat: add CategoryStep booking component"
```

---

### Task 3: `SessionStep` component (Step B — session variant picker)

**Files:**
- Create: `components/booking/SessionStep.tsx`
- Test: `__tests__/components/SessionStep.test.tsx`

**Interfaces:**
- Consumes: `TarievenGroep` type from `@/lib/content` (Task 1).
- Produces: `SessionStep` default export, props `{ groep: TarievenGroep }`: `(props: { groep: TarievenGroep }) => JSX.Element`. Renders a back link to `/afspraak`, a heading with `groep.naam`, and one link per `groep.rijen[i]` to `/afspraak?type=${groep.slug}&sessie=${rij.calSlug}`.

- [ ] **Step 1: Write the failing test**

Create `__tests__/components/SessionStep.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import SessionStep from '@/components/booking/SessionStep'
import type { TarievenGroep } from '@/lib/content'

const groep: TarievenGroep = {
  slug: 'sportmassage',
  naam: 'Sportmassage',
  rijen: [
    { behandeling: 'Rug-nek-benen', duur: "90'", prijs: '€100', calSlug: 'sport-rug-nek-benen-90' },
    { behandeling: 'Benen', duur: "30'", prijs: '€40', calSlug: 'sport-benen-30' },
  ],
}

describe('SessionStep', () => {
  it('renders the category name as a heading', () => {
    render(<SessionStep groep={groep} />)
    expect(screen.getByRole('heading', { name: 'Sportmassage' })).toBeInTheDocument()
  })

  it('renders a link per session variant with the correct deep link', () => {
    render(<SessionStep groep={groep} />)
    expect(screen.getByRole('link', { name: /Rug-nek-benen.*90'/ })).toHaveAttribute(
      'href',
      '/afspraak?type=sportmassage&sessie=sport-rug-nek-benen-90'
    )
    expect(screen.getByRole('link', { name: /Benen.*30'/ })).toHaveAttribute(
      'href',
      '/afspraak?type=sportmassage&sessie=sport-benen-30'
    )
  })

  it('shows the price for each variant', () => {
    render(<SessionStep groep={groep} />)
    expect(screen.getByText('€100')).toBeInTheDocument()
    expect(screen.getByText('€40')).toBeInTheDocument()
  })

  it('links back to the category picker', () => {
    render(<SessionStep groep={groep} />)
    expect(screen.getByRole('link', { name: /alle behandelingen/i })).toHaveAttribute('href', '/afspraak')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run __tests__/components/SessionStep.test.tsx`
Expected: FAIL — cannot find module `@/components/booking/SessionStep`.

- [ ] **Step 3: Write minimal implementation**

Create `components/booking/SessionStep.tsx`:

```tsx
import Link from 'next/link'
import type { TarievenGroep } from '@/lib/content'

type SessionStepProps = {
  groep: TarievenGroep
}

export default function SessionStep({ groep }: SessionStepProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/afspraak"
        className="text-[13px] text-brand-gray hover:text-brand-black mb-6 inline-block"
      >
        ← Alle behandelingen
      </Link>
      <h2 className="font-serif text-2xl text-brand-black mb-6">{groep.naam}</h2>
      <div className="flex flex-col gap-3">
        {groep.rijen.map((rij) => (
          <Link
            key={rij.calSlug}
            href={`/afspraak?type=${groep.slug}&sessie=${rij.calSlug}`}
            className="flex items-center justify-between px-5 py-4 bg-white rounded-[8px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="text-[15px] text-brand-black font-medium">
              {rij.behandeling} · {rij.duur}
            </span>
            <span className="text-[15px] font-bold text-brand-black">{rij.prijs}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run __tests__/components/SessionStep.test.tsx`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add components/booking/SessionStep.tsx __tests__/components/SessionStep.test.tsx
git commit -m "feat: add SessionStep booking component"
```

---

### Task 4: `BookingCalendar` component (Step C — scoped Cal.com embed)

**Files:**
- Create: `components/booking/BookingCalendar.tsx`
- Test: `__tests__/components/BookingCalendar.test.tsx`

**Interfaces:**
- Consumes: `Cal` (default export) and `getCalApi` from `@calcom/embed-react`.
- Produces: `BookingCalendar` default export, props `{ calSlug: string; backHref: string }`: `(props: { calSlug: string; backHref: string }) => JSX.Element`. Renders a back link to `backHref` and a `<Cal>` embed scoped to `calLink="jelle-d-odewhk/${calSlug}"`.

- [ ] **Step 1: Write the failing test**

Create `__tests__/components/BookingCalendar.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import BookingCalendar from '@/components/booking/BookingCalendar'

vi.mock('@calcom/embed-react', () => ({
  __esModule: true,
  default: ({ calLink }: { calLink: string }) => <div data-testid="cal-embed" data-cal-link={calLink} />,
  getCalApi: vi.fn().mockResolvedValue(vi.fn()),
}))

describe('BookingCalendar', () => {
  it('embeds the calendar scoped to the given calSlug', () => {
    render(<BookingCalendar calSlug="sport-rug-nek-40" backHref="/afspraak?type=sportmassage" />)
    expect(screen.getByTestId('cal-embed')).toHaveAttribute(
      'data-cal-link',
      'jelle-d-odewhk/sport-rug-nek-40'
    )
  })

  it('links back to the given backHref', () => {
    render(<BookingCalendar calSlug="sport-rug-nek-40" backHref="/afspraak?type=sportmassage" />)
    expect(screen.getByRole('link', { name: /andere sessie kiezen/i })).toHaveAttribute(
      'href',
      '/afspraak?type=sportmassage'
    )
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run __tests__/components/BookingCalendar.test.tsx`
Expected: FAIL — cannot find module `@/components/booking/BookingCalendar`.

- [ ] **Step 3: Write minimal implementation**

Create `components/booking/BookingCalendar.tsx`:

```tsx
'use client'

import Cal, { getCalApi } from '@calcom/embed-react'
import Link from 'next/link'
import { useEffect } from 'react'

type BookingCalendarProps = {
  calSlug: string
  backHref: string
}

export default function BookingCalendar({ calSlug, backHref }: BookingCalendarProps) {
  useEffect(() => {
    getCalApi({ namespace: 'sano-j' }).then((cal) => {
      cal('ui', {
        theme: 'light',
        styles: {
          branding: { brandColor: '#d1ca22' },
        },
        hideEventTypeDetails: false,
      })
    })
  }, [])

  return (
    <div>
      <Link
        href={backHref}
        className="text-[13px] text-brand-gray hover:text-brand-black mb-6 inline-block"
      >
        ← Andere sessie kiezen
      </Link>
      <Cal
        namespace="sano-j"
        calLink={`jelle-d-odewhk/${calSlug}`}
        style={{ width: '100%', height: '100%', overflow: 'scroll' }}
        config={{ layout: 'month_view' }}
      />
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run __tests__/components/BookingCalendar.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add components/booking/BookingCalendar.tsx __tests__/components/BookingCalendar.test.tsx
git commit -m "feat: add BookingCalendar component scoped to a single Cal.com event type"
```

---

### Task 5: `BookingFlow` orchestrator (URL-driven step selection)

**Files:**
- Create: `components/booking/BookingFlow.tsx`
- Test: `__tests__/components/BookingFlow.test.tsx`

**Interfaces:**
- Consumes: `CategoryStep` (Task 2, no props), `SessionStep` (Task 3, prop `groep: TarievenGroep`), `BookingCalendar` (Task 4, props `calSlug: string`, `backHref: string`), `TARIEVEN` (Task 1), `useSearchParams` from `next/navigation`.
- Produces: `BookingFlow` default export, no props, `'use client'`. Reads `type`/`sessie` query params and renders `CategoryStep`, `SessionStep`, or `BookingCalendar` per the fallback rules in the spec.

- [ ] **Step 1: Write the failing test**

Create `__tests__/components/BookingFlow.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import BookingFlow from '@/components/booking/BookingFlow'

const searchParamsMock = vi.hoisted(() => ({ value: new URLSearchParams() }))

vi.mock('next/navigation', () => ({
  useSearchParams: () => searchParamsMock.value,
}))

vi.mock('@calcom/embed-react', () => ({
  __esModule: true,
  default: ({ calLink }: { calLink: string }) => <div data-testid="cal-embed" data-cal-link={calLink} />,
  getCalApi: vi.fn().mockResolvedValue(vi.fn()),
}))

describe('BookingFlow', () => {
  it('shows the category picker when there is no type param', () => {
    searchParamsMock.value = new URLSearchParams()
    render(<BookingFlow />)
    expect(screen.getByText('Ontspanningsmassage')).toBeInTheDocument()
  })

  it('shows the category picker when type is unrecognized', () => {
    searchParamsMock.value = new URLSearchParams('type=onbekend')
    render(<BookingFlow />)
    expect(screen.getByText('Ontspanningsmassage')).toBeInTheDocument()
  })

  it('shows the session list for a valid type with no sessie', () => {
    searchParamsMock.value = new URLSearchParams('type=sportmassage')
    render(<BookingFlow />)
    expect(screen.getByRole('heading', { name: 'Sportmassage' })).toBeInTheDocument()
  })

  it('falls back to the session list when sessie is unrecognized', () => {
    searchParamsMock.value = new URLSearchParams('type=sportmassage&sessie=onbekend')
    render(<BookingFlow />)
    expect(screen.getByRole('heading', { name: 'Sportmassage' })).toBeInTheDocument()
  })

  it('shows the scoped calendar for a valid type and sessie', () => {
    searchParamsMock.value = new URLSearchParams('type=sportmassage&sessie=sport-rug-nek-40')
    render(<BookingFlow />)
    expect(screen.getByTestId('cal-embed')).toHaveAttribute(
      'data-cal-link',
      'jelle-d-odewhk/sport-rug-nek-40'
    )
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run __tests__/components/BookingFlow.test.tsx`
Expected: FAIL — cannot find module `@/components/booking/BookingFlow`.

- [ ] **Step 3: Write minimal implementation**

Create `components/booking/BookingFlow.tsx`:

```tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { TARIEVEN } from '@/lib/content'
import CategoryStep from './CategoryStep'
import SessionStep from './SessionStep'
import BookingCalendar from './BookingCalendar'

export default function BookingFlow() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const sessie = searchParams.get('sessie')

  const groep = TARIEVEN.find((g) => g.slug === type)

  if (!groep) {
    return <CategoryStep />
  }

  const rij = groep.rijen.find((r) => r.calSlug === sessie)

  if (!rij) {
    return <SessionStep groep={groep} />
  }

  return <BookingCalendar calSlug={rij.calSlug} backHref={`/afspraak?type=${groep.slug}`} />
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run __tests__/components/BookingFlow.test.tsx`
Expected: PASS (5 tests)

- [ ] **Step 5: Commit**

```bash
git add components/booking/BookingFlow.tsx __tests__/components/BookingFlow.test.tsx
git commit -m "feat: add BookingFlow orchestrator with URL-driven step selection"
```

---

### Task 6: Wire up `/afspraak` and deep-link from `/behandelingen`

**Files:**
- Modify: `app/afspraak/page.tsx`
- Modify: `app/behandelingen/page.tsx`

**Interfaces:**
- Consumes: `BookingFlow` (Task 5).

- [ ] **Step 1: Replace `app/afspraak/page.tsx`**

`useSearchParams` requires the component that calls it to sit under a `<Suspense>` boundary in the App Router, otherwise `next build` fails with "useSearchParams() should be wrapped in a suspense boundary". `BookingFlow` is the only part of this page that needs client interactivity, so the header can go back to being server-rendered and only `BookingFlow` needs wrapping:

```tsx
import { Suspense } from 'react'
import BookingFlow from '@/components/booking/BookingFlow'

export default function AfspraakPage() {
  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-brand-black px-8 md:px-12 pt-32 pb-14 text-center">
        <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-yellow mb-3">
          Online reserveren
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Maak uw afspraak</h1>
        <p className="text-[15px] text-white/55 max-w-md mx-auto">
          Kies uw behandeling en selecteer een beschikbaar tijdslot. U ontvangt een
          bevestiging per e-mail.
        </p>
      </div>

      <div className="px-4 py-12">
        <Suspense fallback={null}>
          <BookingFlow />
        </Suspense>
      </div>
    </div>
  )
}
```

This fully replaces the file's previous contents (the old inline `'use client'` + `<Cal>` embed logic has moved into `BookingCalendar`).

- [ ] **Step 2: Deep-link from `app/behandelingen/page.tsx`**

Find this line inside the `BEHANDELINGEN.map((b, i) => ...)` section:

```tsx
              <Button variant="primary" href="/afspraak">
                Maak een afspraak →
              </Button>
```

Replace it with:

```tsx
              <Button variant="primary" href={`/afspraak?type=${b.slug}`}>
                Maak een afspraak →
              </Button>
```

- [ ] **Step 3: Run the full test suite**

Run: `npx vitest run`
Expected: PASS (all test files)

- [ ] **Step 4: Type-check and build**

Run: `npm run build`
Expected: build completes successfully with no TypeScript errors and no "useSearchParams() should be wrapped in a suspense boundary" error.

- [ ] **Step 5: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add app/afspraak/page.tsx app/behandelingen/page.tsx
git commit -m "feat: wire up grouped booking flow on /afspraak and deep-link from /behandelingen"
```

---

### Task 7: Manual verification

**Files:** none (manual smoke test using the running dev server).

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`

- [ ] **Step 2: Verify Step A**

Visit `http://localhost:3000/afspraak`. Expected: 4 category cards (Ontspanningsmassage, Sportmassage, Cupping, Medical Taping), no Cal.com calendar visible yet.

- [ ] **Step 3: Verify Step B**

Click "Sportmassage". Expected: URL becomes `/afspraak?type=sportmassage`, page shows only Sportmassage's 6 session variants (Rug-nek-benen 90'/60', Rug-nek 40'/30', Benen 40'/30') with prices, plus a back link to Step A.

- [ ] **Step 4: Verify Step C**

Click any session variant. Expected: URL becomes `/afspraak?type=sportmassage&sessie=<calSlug>`, a Cal.com calendar embed appears. Note: if the corresponding event type doesn't exist yet in the Cal.com dashboard under `jelle-d-odewhk`, the embed will show a Cal.com "This event type is not found" state — that's expected until the event types from Task 1's checklist are created there; confirm the calendar *attempts* to load the correct slug (check browser network/console for the request URL containing the expected `calSlug`).

- [ ] **Step 5: Verify deep link from Behandelingen**

Visit `http://localhost:3000/behandelingen`, click "Maak een afspraak" under the Cupping section. Expected: lands directly on `/afspraak?type=cupping` showing only Cupping's 2 session variants (skips Step A).

- [ ] **Step 6: Verify fallback behavior**

Visit `http://localhost:3000/afspraak?type=onbekend`. Expected: falls back to Step A (4 categories).
Visit `http://localhost:3000/afspraak?type=sportmassage&sessie=onbekend`. Expected: falls back to Step B for Sportmassage.

- [ ] **Step 7: Verify back/forward navigation**

From Step C, click the back link — expected to land on Step B for the same category. Use the browser's back button from there — expected to land on Step A. Use the browser's forward button twice — expected to walk forward through B then C again.

- [ ] **Step 8: Report the Cal.com event type checklist to the user**

After verifying the flow works structurally, tell the user which `calSlug` values (from Task 1) still need real event types created in the Cal.com dashboard for booking to actually work end-to-end.

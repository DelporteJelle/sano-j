# Grouped Cal.com booking flow — design

## Problem

The `/afspraak` page embeds Cal.com's flat user page (`calLink="https://cal.com/jelle-d-odewhk"`), which lists every event type in a single unordered list. As more session variants are added per treatment (duration × body area combinations), this list becomes too long to be usable.

Cal.com has no native concept of "categories" grouping event types for a solo (non-Team) account, and its built-in "multiple duration" picker only varies along a single duration axis — it can't represent two offerings of the same duration but different body area (e.g. Ontspanningsmassage has both "Rug-nek 40'" and "Benen 40'" at €50). So grouping has to be built in the site's own code, not in Cal.com.

## Goals

- On `/afspraak` with no query params: show the 4 treatment categories first (Ontspanningsmassage, Sportmassage, Cupping, Medical Taping).
- Clicking a category shows only the session variants (duration/body-area/price) belonging to that category.
- Clicking a session variant shows the Cal.com date/time picker scoped to that single event type only.
- From `/behandelingen`, clicking "Maak een afspraak" within a treatment's section jumps straight to that category's session list (skips the category picker).
- Invalid/unknown/missing URL params fall back to the nearest valid step rather than erroring.

## Non-goals

- No changes to `/abonnementen` (subscription packages) booking flow.
- No Cal.com API integration — event types are created manually in the Cal.com dashboard.
- No online payment collection (out of scope for this design; see "Future considerations").

## Data model (`lib/content.ts`)

`TarievenGroep` gains a `slug` (matching `Behandeling.slug`) and each row gains a `calSlug`:

```ts
export type TarievenRij = {
  behandeling: string
  duur: string
  prijs: string
  calSlug: string
}

export type TarievenGroep = {
  slug: string // matches Behandeling.slug
  naam: string
  rijen: TarievenRij[]
}
```

`ABONNEMENTEN` is not part of this booking flow, so it's split into its own type instead of continuing to alias `TarievenGroep`:

```ts
export type AbonnementRij = { behandeling: string; duur: string; prijs: string }
export type AbonnementGroep = { naam: string; rijen: AbonnementRij[] }
```

### calSlug checklist (Cal.com event types to create/rename)

Convention: `<categorie-kort>-<lichaamsdeel>-<duur>`.

| Categorie (slug) | Behandeling | Duur | Prijs | calSlug |
|---|---|---|---|---|
| ontspanningsmassage | Volledig lichaam | 90' | €100 | `ontspanning-volledig-90` |
| ontspanningsmassage | Volledig lichaam | 60' | €70 | `ontspanning-volledig-60` |
| ontspanningsmassage | Rug-nek-benen | 60' | €70 | `ontspanning-rug-nek-benen-60` |
| ontspanningsmassage | Rug-nek | 50' | €60 | `ontspanning-rug-nek-50` |
| ontspanningsmassage | Rug-nek | 40' | €50 | `ontspanning-rug-nek-40` |
| ontspanningsmassage | Benen | 40' | €50 | `ontspanning-benen-40` |
| sportmassage | Rug-nek-benen | 90' | €100 | `sport-rug-nek-benen-90` |
| sportmassage | Rug-nek-benen | 60' | €70 | `sport-rug-nek-benen-60` |
| sportmassage | Rug-nek | 40' | €50 | `sport-rug-nek-40` |
| sportmassage | Benen | 40' | €50 | `sport-benen-40` |
| sportmassage | Rug-nek | 30' | €40 | `sport-rug-nek-30` |
| sportmassage | Benen | 30' | €40 | `sport-benen-30` |
| cupping | Hijama Cupping massage | 30' | €40 | `cupping-massage-30` |
| cupping | Hijama Cupping | 20' | €25 | `cupping-20` |
| medical-taping | Plaats waar nodig | 15' | €15 | `taping-15` |

This table is the source of truth for both the `calSlug` values written into `lib/content.ts` and the event types that need to exist in the Cal.com dashboard (`cal.com/jelle-d-odewhk/<calSlug>`). If a slug in Cal.com doesn't match, that variant's booking step will 404 inside the embed — Cal.com owns whether the event type exists and its actual bookable duration/availability; this site owns the label, price, and category grouping.

## Routing & UX flow

`/afspraak` becomes a client component reading `type` and `sessie` from `useSearchParams()`:

- **Step A** — no `type`, or `type` doesn't match any `TARIEVEN` group slug: render the 4 category cards. Each links to `/afspraak?type=<slug>`.
- **Step B** — valid `type`, no `sessie` (or `sessie` doesn't match any `calSlug` within that group): render that category's session variants as cards (behandeling / duur / prijs), each linking to `/afspraak?type=<slug>&sessie=<calSlug>`. Includes a back link to `/afspraak`.
- **Step C** — valid `type` and `sessie`: render the Cal.com embed scoped to `calLink="jelle-d-odewhk/<calSlug>"`. Includes a back link to `/afspraak?type=<slug>`.

Because state lives entirely in the URL, browser back/forward works without extra wiring, and links to any step are shareable/bookmarkable.

`/behandelingen`: each treatment section's `<Button href="/afspraak">` becomes `<Button href={`/afspraak?type=${b.slug}`}>`, landing directly on Step B for that category.

## Component architecture

- `app/afspraak/page.tsx` — orchestrator; reads search params, decides which step to render, keeps the existing hero header across all steps.
- `components/booking/CategoryStep.tsx` — Step A. Category cards sourced from `BEHANDELINGEN`, visually consistent with the existing `TreatmentCard`.
- `components/booking/SessionStep.tsx` — Step B. Looks up `TARIEVEN.find(g => g.slug === type)`, renders its `rijen`.
- `components/booking/BookingCalendar.tsx` — Step C. Wraps the `<Cal namespace calLink style config>` logic that currently lives inline in `page.tsx`, parameterized by `calSlug`.
- `app/behandelingen/page.tsx` — one-line change to the button `href` per section.

## Error handling

- Unrecognized/missing `type` → Step A.
- Unrecognized/missing `sessie` (or one that doesn't belong to the resolved `type`) → Step B for that category.
- No client-side validation beyond matching against local `TARIEVEN` data — if Cal.com itself doesn't have a matching event type for a valid `calSlug`, that's surfaced by Cal.com's own embed (out of this design's control).

## Testing / verification

No logic complex enough to warrant unit tests (array lookups + conditional rendering). Verify manually via dev server:
1. Visit `/afspraak` directly → 4 category cards shown.
2. Click a category → Step B shows only that category's session variants.
3. From `/behandelingen`, click "Maak een afspraak" under a specific treatment → lands directly on that category's Step B.
4. Click a session variant → Cal.com embed shown, scoped to that one event type (verify only one event type's calendar appears, not the flat list).
5. Visit `/afspraak?type=onbekend` and `/afspraak?type=sportmassage&sessie=onbekend` → fall back to Step A / Step B respectively.
6. Browser back button steps back through C → B → A correctly.

## Future considerations

- If online payment is added later and needs to vary by session variant, the per-`calSlug` event-type-per-variant structure already supports that (payment would be configured per Cal.com event type) — no redesign needed.
- `ServicesStrip` and `TreatmentsGrid` on the homepage are unaffected; they link to `/behandelingen`, not `/afspraak`, and are out of scope here.

// lib/content.ts

export const CONTACT_INFO = {
  phone: '0499/36.68.33',
  phoneHref: 'tel:+32499366833',
  email: 'jonasquintyn@gmail.com',
  address: 'Zwijnaardsesteenweg, Merelbeke',
  facebook: 'https://www.facebook.com/Sano-J',
  instagram: 'https://www.instagram.com/sanojmassage',
} as const

export const OPENING_HOURS = {
  weekdays: 'Maandag – vrijdag: 10u – 20u',
  weekend: 'Zaterdag & zondag: gesloten',
} as const

export const NAV_LINKS = [
  { label: 'Behandelingen', href: '/behandelingen' },
  { label: 'Tarieven', href: '/tarieven' },
  { label: 'Abonnementen', href: '/abonnementen' },
  { label: 'Over mij', href: '/over-mij' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Contact', href: '/contact' },
] as const

export type Behandeling = {
  slug: string
  naam: string
  tagline: string
  beschrijving: string
  indicaties: string[]
  afbeelding: string
  afbeeldingAlt: string
}

export const BEHANDELINGEN: Behandeling[] = [
  {
    slug: 'ontspanningsmassage',
    naam: 'Ontspanningsmassage',
    tagline: 'Laat stress los, herstel je evenwicht.',
    beschrijving:
      'Een ontspanningsmassage is een zachte, vloeiende massage die spanning in spieren en gewrichten verlicht. Ideaal als je nood hebt aan diepe rust en herstel van lichaam én geest.',
    indicaties: ['Stress en burn-out', 'Spierspanning', 'Slaapproblemen', 'Algemeen welzijn'],
    afbeelding: '/images/behandelingen/ontspanning.jpg',
    afbeeldingAlt: 'Ontspanningsmassage bij Sano-J Merelbeke',
  },
  {
    slug: 'sportmassage',
    naam: 'Sportmassage',
    tagline: 'Herstel sneller. Presteer beter.',
    beschrijving:
      'Een sportmassage richt zich op spiergroepen die intensief belast worden tijdens sport. Jonas combineert zijn verpleegkundige achtergrond met kennis van het bewegingsapparaat voor een gerichte, effectieve behandeling.',
    indicaties: ['Spierherstel na inspanning', 'Blessurepreventie', 'Prestatieoptimalisatie', 'Spierkrampen'],
    afbeelding: '/images/behandelingen/sport.jpg',
    afbeeldingAlt: 'Sportmassage bij Sano-J Merelbeke',
  },
  {
    slug: 'cupping',
    naam: 'Cupping',
    tagline: 'Diepe ontspanning via vacuümtherapie.',
    beschrijving:
      'Cupping is een vacuümtherapie waarbij cups op de huid worden geplaatst om de doorbloeding te stimuleren en diepe spierspanning te verlichten. Kan gecombineerd worden met massage of als zelfstandige behandeling.',
    indicaties: ['Chronische rugpijn', 'Diepe spierspanning', 'Slechte doorbloeding', 'Littekenweefsel'],
    afbeelding: '/images/behandelingen/cupping.jpg',
    afbeeldingAlt: 'Cupping therapie bij Sano-J Merelbeke',
  },
  {
    slug: 'medical-taping',
    naam: 'Medical Taping',
    tagline: 'Ondersteuning die beweegt met jou.',
    beschrijving:
      'Medical taping ondersteunt spieren en gewrichten zonder de beweging te beperken. De elastische tape stimuleert de huid en bevordert de doorbloeding. Ideaal als aanvulling op massage of als herstelondersteuning.',
    indicaties: ['Sportblessures', 'Gewrichtspijn', 'Zwelling', 'Postoperatief herstel'],
    afbeelding: '/images/behandelingen/taping.jpg',
    afbeeldingAlt: 'Medical taping bij Sano-J Merelbeke',
  },
]

export type TarievenGroep = {
  naam: string
  rijen: { behandeling: string; duur: string; prijs: string }[]
}

export const TARIEVEN: TarievenGroep[] = [
  {
    naam: 'Ontspanningsmassage',
    rijen: [
      { behandeling: 'Volledig lichaam', duur: "90'", prijs: '€100' },
      { behandeling: 'Volledig lichaam', duur: "60'", prijs: '€70' },
      { behandeling: 'Rug-nek-benen', duur: "60'", prijs: '€70' },
      { behandeling: 'Rug-nek', duur: "50'", prijs: '€60' },
      { behandeling: 'Rug-nek', duur: "40'", prijs: '€50' },
      { behandeling: 'Benen', duur: "40'", prijs: '€50' },
    ],
  },
  {
    naam: 'Sportmassage',
    rijen: [
      { behandeling: 'Rug-nek-benen', duur: "90'", prijs: '€100' },
      { behandeling: 'Rug-nek-benen', duur: "60'", prijs: '€70' },
      { behandeling: 'Rug-nek', duur: "40'", prijs: '€70' },
      { behandeling: 'Benen', duur: "40'", prijs: '€60' },
      { behandeling: 'Rug-nek', duur: "30'", prijs: '€50' },
      { behandeling: 'Benen', duur: "30'", prijs: '€50' },
    ],
  },
  {
    naam: 'Cupping',
    rijen: [
      { behandeling: 'Cupping massage', duur: "30'", prijs: '€40' },
      { behandeling: 'Cupping zonder massage', duur: "20'", prijs: '€25' },
    ],
  },
  {
    naam: 'Medical Taping',
    rijen: [
      { behandeling: 'Plaats waar nodig', duur: "15'", prijs: '€15' },
    ],
  },
]

export type Review = {
  naam: string
  sterren: number
  tekst: string
}

export const REVIEWS: Review[] = [
  {
    naam: 'Thomas V.',
    sterren: 5,
    tekst: 'Fantastische sportmassage na mijn wielerwedstrijd. Jonas weet exact waar de spanning zit en hoe die weg te werken.',
  },
  {
    naam: 'Lies D.',
    sterren: 5,
    tekst: 'Eindelijk volledige ontspanning gevonden. De sfeer is rustig, Jonas is vriendelijk en professioneel. Absolute aanrader!',
  },
  {
    naam: 'Marc B.',
    sterren: 5,
    tekst: 'De cupping behandeling heeft wonderen gedaan voor mijn rug. Ik ga zeker terug!',
  },
  {
    naam: 'Sarah M.',
    sterren: 5,
    tekst: 'Zeer professionele aanpak. Jonas luistert goed naar wat je nodig hebt en past de massage daar perfect op aan.',
  },
  {
    naam: 'Pieter K.',
    sterren: 5,
    tekst: 'Al meerdere keren geweest voor een sportmassage. Iedere keer opnieuw top!',
  },
  {
    naam: 'An V.',
    sterren: 5,
    tekst: 'De combinatie van massage en medical taping na mijn knieblessure heeft echt geholpen. Aanrader voor sporters!',
  },
]

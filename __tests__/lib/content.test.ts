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

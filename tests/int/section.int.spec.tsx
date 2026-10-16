import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Section } from '@/components/base/Section'

describe('Section', () => {
  it('provides shared section spacing, theme surface, and max-width container', () => {
    render(
      <Section aria-label="Example section">
        <p>Section content</p>
      </Section>,
    )

    const section = screen.getByRole('region', { name: 'Example section' })
    const container = section.firstElementChild

    expect(section.classList.contains('section-container')).toBe(true)
    expect(section.classList.contains('bg-background')).toBe(true)
    expect(section.classList.contains('section-padding')).toBe(true)
    expect(container?.classList.contains('max-width-container')).toBe(true)
    expect(screen.getByText('Section content')).toBeDefined()
  })

  it('allows section surfaces and container layout to be customized', () => {
    render(
      <Section
        aria-label="Card section"
        className="bg-card"
        containerClassName="max-w-3xl"
      >
        <p>Card content</p>
      </Section>,
    )

    const section = screen.getByRole('region', { name: 'Card section' })

    expect(section.classList.contains('bg-card')).toBe(true)
    expect(section.firstElementChild?.classList.contains('max-w-3xl')).toBe(true)
  })
})

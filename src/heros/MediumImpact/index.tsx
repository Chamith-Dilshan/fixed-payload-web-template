import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Section } from '@/components/base/Section'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <Section>
      {richText && <RichText className="title-gap max-w-3xl" data={richText} enableGutter={false} />}

      {Array.isArray(links) && links.length > 0 && (
        <ul className="mb-8 flex flex-wrap gap-4">
          {links.map(({ link }, i) => (
            <li key={i}>
              <CMSLink {...link} />
            </li>
          ))}
        </ul>
      )}

      {media && typeof media === 'object' && (
        <div>
          <Media imgClassName="rounded-lg border border-border" priority resource={media} />
          {media.caption && (
            <div className="mt-4 max-w-3xl">
              <RichText data={media.caption} enableGutter={false} />
            </div>
          )}
        </div>
      )}
    </Section>
  )
}

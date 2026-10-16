import React from "react"

import type { Page } from "@/payload-types"

import { CMSLink } from "@/components/Link"
import { Media } from "@/components/Media"
import RichText from "@/components/RichText"
import { Section } from "@/components/base/Section"
import { cn } from "cn"

export const HighImpactHero: React.FC<Page["hero"]> = ({
  links,
  media,
  richText,
}) => {
  const heroMedia = media && typeof media === "object" ? media : undefined

  return (
    <Section
      className="isolate"
      containerClassName="relative flex min-h-[70svh] items-center justify-center"
    >
      {heroMedia && (
        <div className="absolute inset-0">
          <Media
            className="absolute inset-0"
            fill
            imgClassName="object-cover"
            priority
            resource={heroMedia}
          />
          <div className="absolute inset-0 bg-[var(--hero-overlay)]" />
        </div>
      )}
      <div
        className={cn(
          "relative z-10 max-w-3xl text-center",
          heroMedia ? "text-[var(--hero-foreground)]" : "text-foreground"
        )}
      >
        {richText && (
          <RichText
            className={cn("title-gap", heroMedia && "prose-invert")}
            data={richText}
            enableGutter={false}
          />
        )}
        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-4">
            {links.map(({ link }, i) => (
              <li key={i}>
                <CMSLink
                  {...link}
                  className={
                    heroMedia
                      ? "border-[var(--hero-foreground)] bg-transparent text-[var(--hero-foreground)] hover:bg-[color-mix(in_oklab,var(--hero-foreground)_10%,transparent)] hover:text-[var(--hero-foreground)]"
                      : undefined
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  )
}

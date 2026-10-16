
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import { formatDateTime } from "@/utilities/formatDateTime"
import { Section } from '@/components/base/Section'
import { cn } from 'cn'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''
  const heroMedia = heroImage && typeof heroImage !== 'string' ? heroImage : undefined

  return (
    <Section
      className="isolate"
      containerClassName="relative flex min-h-[70svh] items-end"
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
          <div className="absolute inset-0 bg-linear-to-t from-[var(--hero-overlay)] to-transparent" />
        </div>
      )}
      <div
        className={cn(
          "relative z-10 max-w-4xl pb-8",
          heroMedia ? "text-[var(--hero-foreground)]" : "text-foreground"
        )}
      >
        <div className="mb-4 text-sm uppercase">
          {categories?.map((category, index) => {
            if (typeof category === 'object' && category !== null) {
              const titleToUse = category.title || 'Untitled category'
              const isLast = index === categories.length - 1

              return (
                <React.Fragment key={index}>
                  {titleToUse}
                  {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                </React.Fragment>
              )
            }
            return null
          })}
        </div>

        <h1 className="title-gap text-3xl md:text-5xl lg:text-6xl">{title}</h1>

        <div className="flex flex-col gap-4 md:flex-row md:gap-16">
          {hasAuthors && (
            <div className="flex flex-col gap-1">
              <p
                className={cn(
                  "text-sm",
                  heroMedia
                    ? "text-[var(--hero-foreground)] opacity-80"
                    : "text-muted-foreground"
                )}
              >
                Author
              </p>
              <p>{formatAuthors(populatedAuthors)}</p>
            </div>
          )}
          {publishedAt && (
            <div className="flex flex-col gap-1">
              <p
                className={cn(
                  "text-sm",
                  heroMedia
                    ? "text-[var(--hero-foreground)] opacity-80"
                    : "text-muted-foreground"
                )}
              >
                Date Published
              </p>
              <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}

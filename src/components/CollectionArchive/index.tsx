import { cn } from "cn"
import React from "react"

import { Section } from "@/components/base/Section"
import { Card, CardPostData } from "@/components/Card"

export type Props = {
  className?: string
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { className, posts } = props

  return (
    <Section className={cn(className)}>
      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {posts?.map((result, index) => {
          if (typeof result === "object" && result !== null) {
            return (
              <Card
                className="h-full"
                doc={result}
                key={index}
                relationTo="posts"
                showCategories
              />
            )
          }

          return null
        })}
      </div>
    </Section>
  )
}

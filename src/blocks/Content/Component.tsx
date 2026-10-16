import { cn } from "cn"
import React from "react"
import RichText from "@/components/RichText"
import { Section } from "@/components/base/Section"

import type { ContentBlock as ContentBlockProps } from "@/payload-types"

import { CMSLink } from "../../components/Link"

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: "lg:col-span-12",
    half: "lg:col-span-6",
    oneThird: "lg:col-span-4",
    twoThirds: "lg:col-span-8",
  }

  return (
    <Section>
      <div className="grid grid-cols-4 gap-x-8 gap-y-8 lg:grid-cols-12">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <div
                className={cn(
                  "col-span-4 md:col-span-2",
                  colsSpanClasses[size ?? "oneThird"],
                  size === "full" && "md:col-span-4"
                )}
                key={index}
              >
                {richText && <RichText data={richText} enableGutter={false} />}

                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </Section>
  )
}

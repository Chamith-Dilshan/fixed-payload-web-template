import type { BannerBlock as BannerBlockProps } from "@/payload-types"

import { cn } from "cn"
import React from "react"
import RichText from "@/components/RichText"

type Props = {
  className?: string
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({ className, content, style }) => {
  return (
    <div className={cn("mx-auto my-8 w-full", className)}>
      <div
        className={cn("flex items-center rounded border px-6 py-3", {
          "border-border bg-card text-card-foreground": style === "info",
          "border-destructive bg-destructive/10 text-destructive": style === "error",
          "border-primary bg-primary/10 text-foreground": style === "success",
          "border-secondary bg-secondary/10 text-secondary-foreground": style === "warning",
        })}
      >
        <RichText data={content} enableGutter={false} enableProse={false} />
      </div>
    </div>
  )
}

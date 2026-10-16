import type { StaticImageData } from "next/image"

import { cn } from "cn"
import React from "react"
import RichText from "@/components/RichText"

import type { MediaBlock as MediaBlockProps } from "@/payload-types"

import { Media } from "../../components/Media"
import { Section } from "@/components/base/Section"

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props

  let caption
  if (media && typeof media === "object") caption = media.caption

  const content = (
    <>
      {(media || staticImage) && (
        <Media
          imgClassName={cn(
            "rounded-[0.8rem] border border-border",
            imgClassName
          )}
          resource={media}
          src={staticImage}
        />
      )}
      {caption && (
        <div className={cn("mt-4", !disableInnerContainer && "max-width-container", captionClassName)}>
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </>
  )

  if (enableGutter) {
    return (
      <Section className={className}>
        {content}
      </Section>
    )
  }

  return <div className={cn("section-container", className)}>{content}</div>
}

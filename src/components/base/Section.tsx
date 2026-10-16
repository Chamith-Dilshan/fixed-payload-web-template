import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react"
import { cn } from "cn"

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  children: ReactNode
  className?: string
  containerClassName?: string
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, containerClassName, children, ...sectionProps }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "section-container bg-background section-padding",
          className
        )}
        {...sectionProps}
      >
        <div className={cn("max-width-container", containerClassName)}>
          {children}
        </div>
      </section>
    )
  }
)

Section.displayName = "Section"

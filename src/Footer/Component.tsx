import { getCachedGlobal } from "@/utilities/getGlobals"
import Link from "next/link"
import React from "react"

import { CMSLink } from "@/components/Link"
import { Logo } from "@/components/Logo/Logo"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

export async function Footer() {
  const footerData = await getCachedGlobal("footer", 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="section-container bg-card text-card-foreground">
      <div className="max-width-container flex flex-col gap-8 py-8 md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="flex flex-col-reverse items-start gap-10 md:flex-row md:items-center">
          <AnimatedThemeToggler />
          <nav className="flex flex-col gap-4 md:flex-row">
            {navItems.map(({ link }, i) => {
              return (
                <CMSLink className="text-card-foreground" key={i} {...link} />
              )
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}

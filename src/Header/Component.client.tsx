"use client"
import Link from "next/link"
import React from "react"

import type { Header } from "@/payload-types"

import { Logo } from "@/components/Logo/Logo"
import { HeaderNav } from "./Nav"

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  return (
    <header className="relative z-20 max-width-container">
      <div className="flex justify-between px-3 py-5">
        <Link href="/">
          <Logo loading="eager" priority="high" className="invert" />
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}

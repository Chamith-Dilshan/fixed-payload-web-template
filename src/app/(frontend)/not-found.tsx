import Link from "next/link"
import React from "react"

import { Button } from "@/components/ui/button"
import { Section } from "@/components/base/Section"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <Section className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center gap-8 px-4 text-center">
        {/* 404 Text */}
        <div className="animate-bounce">
          <h1 className="animate-pulse bg-linear-to-r from-primary to-secondary bg-clip-text text-9xl font-black text-transparent">
            404
          </h1>
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-primary to-secondary opacity-10 blur-3xl"></div>
        </div>

        {/* Heading & Description */}
        <div className="max-w-2xl">
          <h2 className="mb-4 text-foreground">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground">
            The page you&#39;re looking for doesn&#39;t exist or has been moved.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button variant="secondary" size="lg">
            <Link href="/" className="flex items-center gap-2">
              <Home size={20} />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}

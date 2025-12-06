"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="MathTutor Logo" width={32} height={32} className="h-8 w-8" />
          <span className="text-xl font-bold text-foreground">Sway3 dyal l Math</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Page d'accueil
          </Link>
          <Link href="#features" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Fonctionnalités
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Tarifs
          </Link>
          <Link href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            À propos
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            Connexion
          </Button>
          <Link href="/chat">
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Commencer
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

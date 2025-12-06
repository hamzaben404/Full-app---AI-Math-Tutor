"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Prêt à transformer votre apprentissage?</h2>
            <p className="text-lg text-muted-foreground">
              Rejoignez des milliers d'étudiants qui ont amélioré leurs résultats en mathématiques
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/chat">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Commencer gratuitement
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Planifier une démo
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Pas de carte de crédit requise. Accès complet pendant 14 jours.
          </p>
        </div>
      </div>
    </section>
  )
}

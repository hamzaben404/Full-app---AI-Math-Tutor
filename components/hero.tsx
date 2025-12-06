import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { QuizCTAButton } from "@/components/quiz-cta-boutton"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Apprentissage intelligent</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Maîtrisez les <span className="text-primary">mathématiques</span> avec confiance
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Apprenez les mathématiques à votre rythme avec nos tuteurs IA personnalisés. Des exercices adaptatifs,
                des explications claires et un suivi de progression en temps réel.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Commencer gratuitement
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Voir la démo
              </Button>
              
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <QuizCTAButton text="✨ Essayes Quiz generation fonction " /> 
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold text-foreground">10K+</p>
                <p className="text-sm text-muted-foreground">Étudiants actifs</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">4.9★</p>
                <p className="text-sm text-muted-foreground">Note moyenne</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">95%</p>
                <p className="text-sm text-muted-foreground">Taux de réussite</p>
              </div>
            </div>
          </div>

          <div className="relative h-96 md:h-full min-h-96 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold text-primary/20">∫</div>
                <p className="text-muted-foreground">Tableau de bord interactif</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

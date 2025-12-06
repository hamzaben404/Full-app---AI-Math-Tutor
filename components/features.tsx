import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, BarChart3, Zap, Users, Shield, Clock } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "IA Personnalisée",
    description: "Tuteur IA adapté à votre style d'apprentissage et votre niveau",
  },
  {
    icon: BarChart3,
    title: "Suivi Détaillé",
    description: "Analysez votre progression avec des statistiques en temps réel",
  },
  {
    icon: Zap,
    title: "Exercices Adaptatifs",
    description: "Les exercices s'ajustent à votre niveau de compétence",
  },
  {
    icon: Users,
    title: "Communauté",
    description: "Connectez-vous avec d'autres étudiants et partagez vos progrès",
  },
  {
    icon: Shield,
    title: "Sécurisé",
    description: "Vos données sont protégées avec les normes de sécurité les plus élevées",
  },
  {
    icon: Clock,
    title: "Disponible 24/7",
    description: "Apprenez quand vous voulez, où vous voulez",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Pourquoi choisir MathTutor?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une plateforme complète conçue pour transformer votre apprentissage des mathématiques
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

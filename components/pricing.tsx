import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    description: "Parfait pour débuter",
    price: "9",
    features: ["Accès à 5 leçons par mois", "Tuteur IA basique", "Suivi de progression", "Support par email"],
  },
  {
    name: "Pro",
    description: "Le plus populaire",
    price: "29",
    popular: true,
    features: [
      "Accès illimité aux leçons",
      "Tuteur IA avancé",
      "Suivi détaillé et analytics",
      "Support prioritaire",
      "Exercices personnalisés",
      "Certificats de complétion",
    ],
  },
  {
    name: "Enterprise",
    description: "Pour les institutions",
    price: "Sur devis",
    features: [
      "Tout ce qui est en Pro",
      "Gestion de classe",
      "Rapports détaillés",
      "Intégrations personnalisées",
      "Support dédié",
      "Formation des enseignants",
    ],
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Plans simples et transparents</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choisissez le plan qui correspond à vos besoins
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-border transition-all ${
                plan.popular ? "md:scale-105 border-primary/50 shadow-lg" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Populaire
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-foreground">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                  {plan.price !== "Sur devis" && <span className="text-muted-foreground">/mois</span>}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "border border-border hover:bg-muted"
                  }`}
                >
                  Commencer
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

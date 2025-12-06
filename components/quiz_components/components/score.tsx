//import { Progress } from "@/components/ui/progress"
//import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Card, CardContent} from "@/components/ui/card"


interface QuizScoreProps {
  correctAnswers: number
  totalQuestions: number
}

export default function QuizScore({ correctAnswers, totalQuestions }: QuizScoreProps) {
  const score = (correctAnswers / totalQuestions) * 100
  const roundedScore = Math.round(score)

  const getMessage = () => {
    if (score === 100) return "Excellent résultat! Parfait!"
    if (score >= 80) return "Très Bon résultat! Tu peux toujours essayer un autre quiz"
    if (score >= 60) return "Bon résultat! Je t'encourage à réessayer pour t'améliorer."
    if (score >= 40) return "Résultat moyen ! Tu peux faire mieux 😀 "
    return "Continue à apprendre!"
  }

  return (
    <Card className="w-full">
      <CardContent className="space-y-4 p-8">
        <div className="text-center">
          <p className="text-4xl font-bold">{roundedScore}%</p>
          <p className="text-sm text-muted-foreground">
            {correctAnswers} out of {totalQuestions} correct
          </p>
        </div>
        <p className="text-center font-medium">{getMessage()}</p>
      </CardContent>
    </Card>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuizCTAButtonProps {
  className?: string
  text?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
}

export function QuizCTAButton({ 
  className, 
  text = "Générer un Quiz", 
  variant = "default",
  size = "lg"
}: QuizCTAButtonProps) {
  return (
    <Link href="/quiz">
      <Button 
        size={size} 
        variant={variant}
        className={cn(
          "group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg",
          variant === 'default' && "bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-600/90 text-primary-foreground border-0",
          className
        )}
      >
        <span className="relative z-10 flex items-center gap-2">
          <Sparkles className="h-4 w-4 animate-pulse" />
          {text}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
        
        {/* Shine effect overlay */}
        {variant === 'default' && (
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
        )}
      </Button>
    </Link>
  )
}
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Pricing } from "@/components/pricing"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main
      className="min-h-screen bg-background"
      style={{
        backgroundImage: "url('/backgroundplateform.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="min-h-screen bg-black/40">
        <Header />
        <Hero />
        <Features />
        <Pricing />
        <CTA />
        <Footer />
      </div>
    </main>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChefHat } from "lucide-react"

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-orange-100 p-4 text-center">
      <div className="mb-8 flex items-center justify-center rounded-full bg-orange-500 p-6">
        <ChefHat className="h-16 w-16 text-white" />
      </div>
      <h1 className="mb-2 text-4xl font-bold text-orange-800 md:text-5xl">Tommy AI Chef</h1>
      <p className="mb-8 max-w-md text-xl text-orange-700">Welcome to the world of food with Tommy AI Chef</p>
      <p className="mb-8 max-w-lg text-gray-600">
        Tell Tommy what ingredients you have, and he'll suggest delicious recipes, guide you step-by-step, and share
        nutrition information - all powered by Google's Gemini AI.
      </p>
      <Link href="/signup">
        <Button className="bg-orange-600 px-8 py-6 text-lg hover:bg-orange-700">Get Started</Button>
      </Link>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { RecipeCard } from "@/components/recipe-card"
import shrimp from "@/assets/garlic-shrimp.jpg"
import curry from "@/assets/chickpea-curry.jpg"
import pizza from "@/assets/pizza.jpg"
import toast from "@/assets/avocado-toast.jpg"
import stirfry from "@/assets/beef-stirfry.jpg"
import cookies from "@/assets/cookies.jpg"
// Sample recipe data
const popularRecipes = [
  {
    id: 1,
    title: "Garlic Butter Shrimp Pasta",
    image: shrimp,
    time: "25 mins",
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "Vegetarian Chickpea Curry",
    image: curry,
    time: "35 mins",
    difficulty: "Medium",
  },
  {
    id: 3,
    title: "Classic Margherita Pizza",
    image: pizza,
    time: "45 mins",
    difficulty: "Medium",
  },
  {
    id: 4,
    title: "Avocado & Egg Toast",
    image: toast,
    time: "10 mins",
    difficulty: "Easy",
  },
  {
    id: 5,
    title: "Beef Stir Fry with Vegetables",
    image: stirfry,
    time: "30 mins",
    difficulty: "Medium",
  },
  {
    id: 6,
    title: "Chocolate Chip Cookies",
    image: cookies,
    time: "25 mins",
    difficulty: "Easy",
  },
]

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
    // Check if user is logged in (for demo purposes)
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/signup")
    }
  }, [router])

  if (!isClient) {
    return null // Prevent hydration errors
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <main className="container mx-auto px-4 pb-20 pt-6">
        <h1 className="mb-6 text-3xl font-bold text-orange-800">Popular Recipes</h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {popularRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </main>

      <Navbar />
    </div>
  )
}

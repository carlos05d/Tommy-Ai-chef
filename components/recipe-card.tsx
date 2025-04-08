import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, BarChart } from "lucide-react"

type Recipe = {
  id: number
  title: string
  image: string
  time: string
  difficulty: string
}

type RecipeCardProps = {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 w-full">
        <Image src={recipe.image || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="mb-2 font-medium">{recipe.title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {recipe.time}
          </div>
          <div className="flex items-center">
            <BarChart className="mr-1 h-4 w-4" />
            {recipe.difficulty}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

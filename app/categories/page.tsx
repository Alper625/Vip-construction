import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { apiClient } from "@/lib/api-client"
import { Category, CategoriesResponse } from "@/types/Category"

async function getCategories(): Promise<Category[]> {
  try {
    
    const response = await apiClient.getCategories() as CategoriesResponse

    return Array.isArray(response?.categories) ? response.categories : []
  } catch (error) {
    console.error("Failed to fetch categories:", error)
    return []
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Product Categories</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Browse our comprehensive selection of construction tools and equipment organized by category.
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category: any) => (
            <Link key={category.id} href={`/catalog?category=${category.id}`}>
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-6">

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-orange-500 transition-colors">
                      {category.name}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed">{category.description}</p>

            
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-600 text-lg">No categories available at the moment.</p>
        </div>
      )}
    </div>
  )
}

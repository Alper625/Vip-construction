import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "./components/product-card"
import { ArrowRight, Shield, Truck, Clock } from "lucide-react"
import { apiClient } from "@/lib/api-client"
import {Product, ProductsResponse} from "@/types/product"

async function getFeaturedProducts() {
  try {
    const products = await apiClient.getProducts() as  ProductsResponse
    // Filter for featured products or return first few
    return Array.isArray(products) ? products.slice(0, 4) : []
  } catch (error) {
    console.error("Failed to fetch featured products:", error)
    // Fallback to mock data
    return [
      {
        id: "1",
        name: "DeWalt 20V MAX Cordless Drill",
        price: 129.99,
        image: "/placeholder.svg?height=300&width=300",
        description: "High-performance cordless drill with 20V MAX battery",
        category: "power-tools",
        brand: "DeWalt",
        stock: 15,
        featured: true,
      },
      {
        id: "2",
        name: "Milwaukee M18 Circular Saw",
        price: 199.99,
        image: "/placeholder.svg?height=300&width=300",
        description: '7-1/4" circular saw with brushless motor',
        category: "power-tools",
        brand: "Milwaukee",
        stock: 8,
        featured: true,
      },
    ]
  }
}

async function getCategories() {
  try {
    const categories = await apiClient.getCategories()

    return Array.isArray(categories) ? categories : []
  } catch (error) {
    console.error("Failed to fetch categories:", error)
    // Fallback to mock data
    return [
      {
        id: "power-tools",
        name: "Power Tools",
        description: "Electric and battery-powered tools for construction",
        image: "/placeholder.svg?height=200&width=200",
        productCount: 45,
      },
      {
        id: "hand-tools",
        name: "Hand Tools",
        description: "Manual tools for precision work",
        image: "/placeholder.svg?height=200&width=200",
        productCount: 78,
      },
    ]
  }
}

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([getFeaturedProducts(), getCategories()])

  return (
    <div>
      {/* Hero Section */}
      <section className="construction-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">Professional Tools for Every Job</h1>
              <p className="text-xl mb-8 text-blue-100">
                Trusted by contractors and DIY enthusiasts. Quality tools, competitive prices, and expert service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/catalog">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/catalog">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    View Catalog
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Construction tools"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
                <p className="text-slate-600">All tools backed by manufacturer warranties and our quality promise.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Truck className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
                <p className="text-slate-600">Free shipping on orders over $99. Same-day shipping available.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
                <p className="text-slate-600">Get help from our tool experts. Available 7 days a week.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Featured Products</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Discover our most popular tools and equipment, trusted by professionals nationwide.
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {featuredProducts.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="text-center">
                <Link href="/catalog">
                  <Button size="lg" className="btn-primary">
                    View All Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600">Loading featured products...</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Shop by Category</h2>
            <p className="text-slate-600">Find exactly what you need for your next project.</p>
          </div>

          {categories.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category: any) => (
                <Link key={category.id} href={`/catalog?category=${category.id}`}>
                  <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="aspect-square relative mb-4 overflow-hidden rounded-lg bg-slate-100">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-500 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-slate-600 text-sm mb-3">{category.description}</p>
                      <p className="text-orange-500 font-medium">{category.productCount || 0} products</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600">Loading categories...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

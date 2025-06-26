"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "../components/product-card"
import { ProductFilters } from "../components/product-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import {Product, ProductsResponse} from "@/types/Product"
import {getProducts} from "@/services/productservice";

function CatalogContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "", 
    brands: [],
    categories: [],
  })

  useEffect(() => {
    fetchProducts()
  }, [searchParams, filters])

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)

    try {
      const params: any = {}

      //  if (searchParams.get("search")) params.search = searchParams.get("search")!
      //  if (searchParams.get("category")) params.category = searchParams.get("category")!
      //  if (filters.minPrice) params.price_from = parseFloat(filters.minPrice)
      //  if (filters.maxPrice) params.price_to = parseFloat(filters.maxPrice)

      //  if (filters.brands.length > 0) 
      //   {
      //       params.manufacturer_id = filters.brands.map(brand => parseInt(brand))
      //   }

      //  if (filters.categories.length > 0)
      //   {
      //       params.category_id = filters.categories.map(category => parseInt(category))
      //   }
    
      const products = await getProducts();
      console.log("Fetched products:", products)
     setProducts(Array.isArray(products) ? products : [])
    } catch (error) {
      console.error("Failed to fetch products:", error)
      setError("Failed to load products. Please try again.")
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (searchQuery) {
      params.set("search", searchQuery)
    } else {
      params.delete("search")
    }
    window.history.pushState(null, "", `?${params.toString()}`)
    fetchProducts()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <Input
              type="text"
              placeholder="Търси продукти..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4" />
            </Button>
          </form>

          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:block ${showFilters ? "block" : "hidden"}`}>
          <ProductFilters onFiltersChange={setFilters} />
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-slate-200 animate-pulse rounded-lg h-96"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg mb-4">{error}</p>
              <Button onClick={fetchProducts}>Try Again</Button>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-slate-600">{products.length} намерени продукти</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No products found matching your criteria.</p>
              <Button
                onClick={() => {
                  setFilters({ minPrice: "", maxPrice: "", brands: [], categories: [] })
                  setSearchQuery("")
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div>Зареждане...</div>}>
      <CatalogContent />
    </Suspense>
  )
}

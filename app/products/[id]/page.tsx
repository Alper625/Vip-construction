import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { AddToCartButton } from "../../components/add-to-cart-button"
import { apiClient } from "@/lib/api-client"
import{Product, ProductsResponse} from "@/types/Product"

async function getProduct(id: string): Promise<Product[] | null> {
  try {
    const product = await apiClient.getProduct(id) as ProductsResponse
    return Array.isArray(product?.products) ? product.products : []
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const products = await getProduct(params.id)

  if (!products) {
    notFound()
  }

   return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-12">
        {products.map((product: Product, index: number) => (
          <div key={product.id || index} className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            {/* <div>
              <div className="aspect-square relative mb-4 overflow-hidden rounded-lg bg-slate-100">
                <Image
                  src={product.image || product.imageUrl || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div> */}

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-4">{product.name}</h1>

                <p className="text-slate-600 text-lg mb-6">{product.full_description}</p>

                <div className="text-4xl font-bold text-orange-500 mb-6">
                  ${typeof product.price === "number" ? product.price.toFixed(2) : product.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
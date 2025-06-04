import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddToCartButton } from "./add-to-cart-button"

interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  stock: number
  brand: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <div className="aspect-square relative mb-4 overflow-hidden rounded-lg bg-slate-100">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          </div>
        </Link>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {product.brand}
            </Badge>
            <Badge
              variant={product.stock > 10 ? "default" : product.stock > 0 ? "secondary" : "destructive"}
              className="text-xs"
            >
              {product.stock > 10 ? "In Stock" : product.stock > 0 ? `${product.stock} left` : "Out of Stock"}
            </Badge>
          </div>

          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-slate-800 group-hover:text-orange-500 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-slate-600 line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between pt-2">
            <span className="text-2xl font-bold text-orange-500">${product.price.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <AddToCartButton product={product} disabled={product.stock === 0} className="w-full" />
      </CardFooter>
    </Card>
  )
}

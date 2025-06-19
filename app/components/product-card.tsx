import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddToCartButton } from "./add-to-cart-button"
import {Product} from "@/types/Product"
 

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <div className="aspect-square relative mb-4 overflow-hidden rounded-lg bg-slate-100">
            <Image
              src={product.images[1] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          </div>
        </Link>

        <div className="space-y-2">
      

          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-slate-800 group-hover:text-orange-500 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-slate-600 line-clamp-2">{product.short_description}</p>

          <div className="flex items-center justify-between pt-2">
            <span className="text-2xl font-bold text-orange-500">${product.price.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>

    </Card>
  )
}

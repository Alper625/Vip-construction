"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "./cart-provider"
import { ShoppingCart } from "lucide-react"
import { apiClient } from "@/lib/api-client"
import { useState } from "react"

interface Product {
  id: string
  name: string
  price: number
  image?: string
  imageUrl?: string
}

interface AddToCartButtonProps {
  product: Product
  disabled?: boolean
  className?: string
}

export function AddToCartButton({ product, disabled, className }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    setIsLoading(true)

    try {
      // Add to local cart
      addToCart({
        id: product.id,
        name: product.name,
        price: typeof product.price === "number" ? product.price : Number.parseFloat(product.price as string),
        image: product.image || product.imageUrl || "/placeholder.svg",
      })

      // Send to API
      await apiClient.addToCart(product.id, 1)
    } catch (error) {
      console.error("Failed to add to cart:", error)
      // You might want to show a toast notification here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleAddToCart} disabled={disabled || isLoading} className={className}>
      <ShoppingCart className="w-4 h-4 mr-2" />
      {isLoading ? "Adding..." : disabled ? "Out of Stock" : "Add to Cart"}
    </Button>
  )
}

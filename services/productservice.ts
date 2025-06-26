import { apiClient } from "@/lib/api-client"
import {Product, ProductsResponse} from "@/types/Product"

export async  function getProducts(): Promise<Product[]> {
  try {
 
    const response = await apiClient.getProducts() as ProductsResponse

    return response.products
  } catch (error) {
    console.error("Failed to fetch Products:", error)
    return []
  }
}

export async function getFeaturedProducts():  Promise<Product[]> {
    try {
      const products = await apiClient.getProducts() as  ProductsResponse
  
      return Array.isArray(products?.products) ? products.products.slice(0, 4) : []
    } catch (error) {
      console.error("Failed to fetch featured products:", error)
      return []
    }
  }
  
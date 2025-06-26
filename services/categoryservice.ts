import { apiClient } from "@/lib/api-client"
import { Category, CategoriesResponse } from "@/types/Category"
import { Manufacturer, ManufacturerResponse } from "@/types/Manufacturer"

export async  function getCategories(): Promise<Category[]> {
  try {
    
    const response = await apiClient.getCategories() as CategoriesResponse

    return Array.isArray(response?.categories) ? response.categories : []
  } catch (error) {
    console.error("Failed to fetch categories:", error)
    return []
  }
}

export async  function getManufacturer(): Promise<Manufacturer[]> {
    try {
      
      const response = await apiClient.getManufacturer() as ManufacturerResponse

      return Array.isArray(response?.manufacturers) ? response.manufacturers : []
    } catch (error) {
      console.error("Failed to fetch manufacturer:", error)
      return []
    }
  }

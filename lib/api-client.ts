const API_BASE_URL = "https://localhost:55659/api"

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

  const config: RequestInit = {
      ...options,
      headers: {
          "Content-Type": "application/json",
          ...options.headers,
      },
  }

    try {
      
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, url)
      throw error
    }
  } 

  async getCategories() {
    return this.request("/categories")
  }

  async getProducts(params?: {
    category?: string
    search?: string
    minPrice?: string
    maxPrice?: string
    brand?: string
  }) {
    const searchParams = new URLSearchParams()

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          searchParams.append(key, value)
        }
      })
    }

    const endpoint = `/products${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
    return this.request(endpoint)
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`)
  }

  async getManufacturer() {
    return this.request(`/manufacturers`)
  }

  async addToCart(productId: string, quantity: number) {
    return this.request("/cart", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)

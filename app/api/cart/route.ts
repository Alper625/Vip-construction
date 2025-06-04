import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const { productId, quantity } = body

  // In a real app, you'd save this to a database
  // For now, we'll just return a success response
  return NextResponse.json({
    success: true,
    message: "Item added to cart",
    productId,
    quantity,
  })
}

export interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  category: string
  rating: number
  reviews: number
  sizes: string[]
  colors: string[]
  description: string
  inStock: boolean
}

export interface CartItem {
  product: Product
  quantity: number
  size?: string
  color?: string
}

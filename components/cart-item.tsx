"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import type { CartItem as CartItemType } from "@/lib/types"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()
  const { product, quantity } = item

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(product.id)
    } else {
      updateQuantity(product.id, newQuantity)
    }
  }

  const handleRemove = () => {
    removeItem(product.id)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">{product.brand}</p>
                <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
                {item.size && <p className="text-sm text-muted-foreground">Size: {item.size}</p>}
                {item.color && <p className="text-sm text-muted-foreground">Color: {item.color}</p>}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex justify-between items-center">
              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <Button variant="outline" size="sm" onClick={() => handleQuantityChange(quantity + 1)}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="font-semibold text-lg">${(product.price * quantity).toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">${product.price} each</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

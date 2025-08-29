"use client"

import { useCart } from "@/hooks/use-cart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function CheckoutSummary() {
  const { items, total } = useCart()

  const subtotal = total
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const finalTotal = subtotal + shipping + tax

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-3">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={item.product.image || "/placeholder.svg"}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-medium text-sm leading-tight">{item.product.name}</h4>
                <p className="text-xs text-muted-foreground">{item.product.brand}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Qty: {item.quantity}</span>
                  <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
                {item.size && <p className="text-xs text-muted-foreground">Size: {item.size}</p>}
                {item.color && <p className="text-xs text-muted-foreground">Color: {item.color}</p>}
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Order Totals */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <div className="flex items-center gap-2">
              {shipping === 0 ? (
                <Badge variant="secondary" className="text-xs">
                  Free
                </Badge>
              ) : (
                <span>${shipping.toFixed(2)}</span>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>

        {/* Shipping Info */}
        <div className="text-center text-sm text-muted-foreground space-y-1">
          {shipping === 0 && <p className="text-primary font-medium">🎉 You qualify for free shipping!</p>}
          <p>Estimated delivery: 3-5 business days</p>
          <p>30-day return policy</p>
        </div>
      </CardContent>
    </Card>
  )
}

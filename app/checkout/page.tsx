"use client"

import { useState } from "react"
import { useCart } from "@/hooks/use-cart"
import { CheckoutForm } from "@/components/checkout-form"
import { CheckoutSummary } from "@/components/checkout-summary"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const { items, total } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  // Redirect to cart if no items
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">No Items to Checkout</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your cart is empty. Add some items before proceeding to checkout.
            </p>
            <Button asChild size="lg">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/cart">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-muted-foreground">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <CheckoutForm isProcessing={isProcessing} setIsProcessing={setIsProcessing} />
          </div>

          {/* Order Summary */}
          <div>
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </div>
  )
}

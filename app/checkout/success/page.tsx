"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package, Mail, ArrowLeft, CreditCard } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function CheckoutSuccessPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [paymentIntentId, setPaymentIntentId] = useState("")
  const searchParams = useSearchParams()

  useEffect(() => {
    // Generate a random order number
    const randomOrderNumber = "BO" + Math.random().toString(36).substr(2, 9).toUpperCase()
    setOrderNumber(randomOrderNumber)

    // Get payment intent ID from URL params (Stripe redirect)
    const paymentIntent = searchParams.get("payment_intent")
    if (paymentIntent) {
      setPaymentIntentId(paymentIntent)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase. Your payment has been processed successfully.
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Order Number:</span>
                <span className="font-mono text-primary">{orderNumber}</span>
              </div>

              {paymentIntentId && (
                <div className="flex justify-between items-center">
                  <span className="font-medium">Payment ID:</span>
                  <span className="font-mono text-sm text-muted-foreground">{paymentIntentId}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="font-medium">Order Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Estimated Delivery:</span>
                <span>{new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Confirmation */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Confirmed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your payment has been securely processed through Stripe. You will receive a receipt via email shortly.
              </p>
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Order Confirmation Email</h3>
                  <p className="text-sm text-muted-foreground">
                    We've sent a confirmation email with your order details and tracking information.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Processing & Shipping</h3>
                  <p className="text-sm text-muted-foreground">
                    Your order will be processed within 1-2 business days and shipped via standard delivery.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/account/orders">View Order Status</Link>
            </Button>
          </div>

          {/* Support */}
          <div className="text-center mt-8 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Need help with your order? Contact our support team at{" "}
              <a href="mailto:support@brandoutlet.com" className="text-primary hover:underline">
                support@brandoutlet.com
              </a>{" "}
              or call{" "}
              <a href="tel:+15551234567" className="text-primary hover:underline">
                (555) 123-4567
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

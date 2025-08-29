"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CreditCard } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useRouter } from "next/navigation"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutFormProps {
  customerInfo: {
    email: string
    firstName: string
    lastName: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
  }
}

function CheckoutForm({ customerInfo }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const { total, clearCart } = useCart()

  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState("")

  // Calculate final total with tax
  const finalTotal = total * 1.08

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: finalTotal,
        metadata: {
          customerEmail: customerInfo.email,
          customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret)
        } else {
          setError("Failed to initialize payment")
        }
      })
      .catch(() => setError("Failed to initialize payment"))
  }, [finalTotal, customerInfo])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements || !clientSecret) {
      return
    }

    setIsProcessing(true)
    setError(null)

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      setError("Card element not found")
      setIsProcessing(false)
      return
    }

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setError(submitError.message || "An error occurred")
      setIsProcessing(false)
      return
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
        payment_method_data: {
          billing_details: {
            name: `${customerInfo.firstName} ${customerInfo.lastName}`,
            email: customerInfo.email,
            phone: customerInfo.phone,
            address: {
              line1: customerInfo.address,
              city: customerInfo.city,
              state: customerInfo.state,
              postal_code: customerInfo.zipCode,
              country: "US",
            },
          },
        },
      },
      redirect: "if_required",
    })

    if (confirmError) {
      setError(confirmError.message || "Payment failed")
      setIsProcessing(false)
    } else {
      // Payment succeeded
      clearCart()
      router.push("/checkout/success")
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="p-4 border rounded-lg bg-background">
            <CardElement options={cardElementOptions} />
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Your payment information is secure and encrypted.</p>
            <p>Total amount: ${finalTotal.toFixed(2)}</p>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={!stripe || !clientSecret || isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing Payment...
              </>
            ) : (
              `Pay $${finalTotal.toFixed(2)}`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

interface StripeCheckoutProps {
  customerInfo: {
    email: string
    firstName: string
    lastName: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
  }
}

export function StripeCheckout({ customerInfo }: StripeCheckoutProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm customerInfo={customerInfo} />
    </Elements>
  )
}

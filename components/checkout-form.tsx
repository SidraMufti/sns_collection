"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Truck, User } from "lucide-react"
import { StripeCheckout } from "./stripe-checkout"

interface CheckoutFormProps {
  isProcessing: boolean
  setIsProcessing: (processing: boolean) => void
}

interface FormData {
  // Customer Info
  email: string
  firstName: string
  lastName: string
  phone: string

  // Shipping Address
  address: string
  city: string
  state: string
  zipCode: string
  country: string

  // Payment
  paymentMethod: string

  // Options
  saveInfo: boolean
  sameAsBilling: boolean
  specialInstructions: string
}

export function CheckoutForm({ isProcessing, setIsProcessing }: CheckoutFormProps) {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    paymentMethod: "stripe",
    saveInfo: false,
    sameAsBilling: true,
    specialInstructions: "",
  })

  const [showPayment, setShowPayment] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    const requiredFields = ["email", "firstName", "lastName", "address", "city", "state", "zipCode"]
    const missingFields = requiredFields.filter((field) => !formData[field as keyof FormData])

    if (missingFields.length > 0) {
      alert("Please fill in all required fields")
      return
    }

    setShowPayment(true)
  }

  if (showPayment) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Customer:</strong> {formData.firstName} {formData.lastName}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Shipping:</strong> {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
            </p>
            <Button variant="outline" size="sm" onClick={() => setShowPayment(false)} className="mt-4">
              Edit Information
            </Button>
          </CardContent>
        </Card>

        <StripeCheckout
          customerInfo={{
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
          }}
        />
      </div>
    )
  }

  return (
    <form onSubmit={handleContinueToPayment} className="space-y-6">
      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              placeholder="john@example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
                placeholder="John"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Shipping Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              required
              placeholder="123 Main Street"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                required
                placeholder="New York"
              />
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                required
                placeholder="NY"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="zipCode">ZIP Code *</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                required
                placeholder="10001"
              />
            </div>
            <div>
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={formData.paymentMethod}
            onValueChange={(value) => handleInputChange("paymentMethod", value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="stripe" id="stripe" />
              <Label htmlFor="stripe">Credit/Debit Card (Secure)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paypal" id="paypal" disabled />
              <Label htmlFor="paypal" className="text-muted-foreground">
                PayPal (Coming Soon)
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Special Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Special Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.specialInstructions}
            onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
            placeholder="Any special delivery instructions..."
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Options */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="saveInfo"
              checked={formData.saveInfo}
              onCheckedChange={(checked) => handleInputChange("saveInfo", checked as boolean)}
            />
            <Label htmlFor="saveInfo">Save this information for next time</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="sameAsBilling"
              checked={formData.sameAsBilling}
              onCheckedChange={(checked) => handleInputChange("sameAsBilling", checked as boolean)}
            />
            <Label htmlFor="sameAsBilling">Billing address same as shipping</Label>
          </div>
        </CardContent>
      </Card>

      {/* Continue Button */}
      <Button type="submit" className="w-full" size="lg">
        Continue to Payment
      </Button>
    </form>
  )
}

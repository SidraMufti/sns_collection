"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your store settings</p>
      </div>

      {/* Store Information */}
      <Card>
        <CardHeader>
          <CardTitle>Store Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="storeName">Store Name</Label>
              <Input id="storeName" defaultValue="BrandOutlet" />
            </div>
            <div>
              <Label htmlFor="storeEmail">Store Email</Label>
              <Input id="storeEmail" type="email" defaultValue="info@brandoutlet.com" />
            </div>
          </div>

          <div>
            <Label htmlFor="storeDescription">Store Description</Label>
            <Textarea
              id="storeDescription"
              defaultValue="Your trusted destination for authentic branded clothing at outlet prices."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="storePhone">Phone Number</Label>
              <Input id="storePhone" defaultValue="(555) 123-4567" />
            </div>
            <div>
              <Label htmlFor="storeAddress">Address</Label>
              <Input id="storeAddress" defaultValue="123 Fashion St, Style City, SC 12345" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="stripeKey">Stripe Publishable Key</Label>
            <Input id="stripeKey" placeholder="pk_test_..." />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Enable PayPal</Label>
              <p className="text-sm text-muted-foreground">Allow customers to pay with PayPal</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Apple Pay</Label>
              <p className="text-sm text-muted-foreground">Allow customers to pay with Apple Pay</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Shipping Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Shipping Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="freeShippingThreshold">Free Shipping Threshold</Label>
              <Input id="freeShippingThreshold" type="number" defaultValue="50" />
            </div>
            <div>
              <Label htmlFor="standardShipping">Standard Shipping Cost</Label>
              <Input id="standardShipping" type="number" step="0.01" defaultValue="9.99" />
            </div>
          </div>

          <div>
            <Label htmlFor="shippingTime">Estimated Shipping Time</Label>
            <Input id="shippingTime" defaultValue="3-5 business days" />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive email notifications for new orders</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Low Stock Alerts</Label>
              <p className="text-sm text-muted-foreground">Get notified when products are low in stock</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Customer Reviews</Label>
              <p className="text-sm text-muted-foreground">Allow customers to leave product reviews</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  )
}

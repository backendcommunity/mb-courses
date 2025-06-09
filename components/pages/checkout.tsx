"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { CreditCard, Shield, ArrowLeft, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { routes } from "@/lib/routes"

interface CheckoutPageProps {
  onNavigate: (path: string) => void
}

export function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const pathname = usePathname()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")

  // Extract checkout type and ID from the URL
  const pathSegments = pathname?.split("/").filter(Boolean) || []
  const checkoutType = pathSegments.length > 2 ? pathSegments[2] : "subscription"
  const checkoutId = pathSegments.length > 3 ? pathSegments[3] : "pro"

  // Mock checkout data based on type and ID
  const checkoutData = {
    subscription: {
      pro: {
        name: "Pro Subscription",
        description: "Monthly subscription to MasteringBackend Pro",
        price: 39.99,
        billingCycle: "monthly",
      },
      enterprise: {
        name: "Enterprise Subscription",
        description: "Monthly subscription to MasteringBackend Enterprise",
        price: 99.99,
        billingCycle: "monthly",
      },
    },
    course: {
      "advanced-nodejs": {
        name: "Advanced Node.js Patterns",
        description: "Lifetime access to Advanced Node.js Patterns course",
        price: 149.99,
        type: "one-time",
      },
    },
    bootcamp: {
      "backend-mastery": {
        name: "Backend Mastery Bootcamp",
        description: "8-week intensive backend development bootcamp",
        price: 999.99,
        type: "one-time",
      },
    },
  }

  // Get the current checkout item
  const currentItem = checkoutData[checkoutType as keyof typeof checkoutData]?.[checkoutId as any]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      // Redirect to success page
      onNavigate(routes.subscriptionSuccess)
    }, 2000)
  }

  const handleBack = () => {
    if (checkoutType === "subscription") {
      onNavigate(routes.subscriptionPlans)
    } else if (checkoutType === "course") {
      onNavigate(routes.courseDetail(checkoutId))
    } else if (checkoutType === "bootcamp") {
      onNavigate(routes.bootcampDetail(checkoutId))
    } else {
      onNavigate(routes.dashboard)
    }
  }

  if (!currentItem) {
    return (
      <div className="container max-w-4xl py-12">
        <Card>
          <CardHeader>
            <CardTitle>Checkout Error</CardTitle>
            <CardDescription>The requested item was not found.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => onNavigate(routes.dashboard)}>Return to Dashboard</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-10">
      <Button variant="ghost" size="sm" className="mb-8" onClick={handleBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Order Summary */}
        <Card className="md:col-span-1 h-fit">
          <CardHeader className="pb-4">
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Review your order details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <h3 className="font-medium">{currentItem.name}</h3>
              <p className="text-sm text-muted-foreground">{currentItem.description}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${currentItem.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground text-sm">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${currentItem.price.toFixed(2)}</span>
            </div>

            <div className="text-sm text-muted-foreground pt-2">
              {currentItem.billingCycle ? (
                <p>
                  You will be charged ${currentItem.price.toFixed(2)} every {currentItem.billingCycle}.
                </p>
              ) : (
                <p>One-time payment. No recurring charges.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>Complete your purchase securely</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Payment Method Selection */}
              <div className="space-y-3">
                <Label>Payment Method</Label>
                <RadioGroup
                  defaultValue="card"
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid grid-cols-3 gap-4"
                >
                  <div>
                    <RadioGroupItem value="card" id="card" className="peer sr-only" />
                    <Label
                      htmlFor="card"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <CreditCard className="mb-2 h-6 w-6" />
                      Credit Card
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
                    <Label
                      htmlFor="paypal"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 h-6 w-6 flex items-center justify-center font-bold text-blue-600">P</div>
                      PayPal
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="apple" id="apple" className="peer sr-only" />
                    <Label
                      htmlFor="apple"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 h-6 w-6 flex items-center justify-center font-bold">A</div>
                      Apple Pay
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {paymentMethod === "card" && (
                <>
                  {/* Card Details */}
                  <div className="space-y-5">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name on Card</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" required />
                      </div>
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="space-y-5 pt-2">
                    <h3 className="font-medium">Billing Address</h3>
                    <div className="grid gap-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="123 Main St" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="New York" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="postal-code">Postal Code</Label>
                        <Input id="postal-code" placeholder="10001" required />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" placeholder="United States" required />
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === "paypal" && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground mb-4">
                    You will be redirected to PayPal to complete your payment.
                  </p>
                  <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto flex items-center justify-center text-white font-bold text-2xl">
                    P
                  </div>
                </div>
              )}

              {paymentMethod === "apple" && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground mb-4">
                    You will be redirected to Apple Pay to complete your payment.
                  </p>
                  <div className="w-16 h-16 bg-black rounded-full mx-auto flex items-center justify-center text-white font-bold text-2xl">
                    A
                  </div>
                </div>
              )}

              {/* Security Note */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-6">
                <Shield className="h-4 w-4" />
                <span>Your payment information is encrypted and secure.</span>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full mt-4" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Processing...
                  </>
                ) : (
                  <>
                    Complete Purchase
                    <Check className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Terms and Conditions */}
      <div className="mt-10 text-center text-sm text-muted-foreground">
        <p>
          By completing this purchase, you agree to our{" "}
          <Button variant="link" className="h-auto p-0">
            Terms of Service
          </Button>{" "}
          and{" "}
          <Button variant="link" className="h-auto p-0">
            Privacy Policy
          </Button>
          .
        </p>
      </div>
    </div>
  )
}

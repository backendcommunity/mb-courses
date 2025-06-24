"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Calendar,
  ChevronRight,
  Download,
  Crown,
  AlertTriangle,
  Check,
  ArrowRight,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { routes } from "@/lib/routes";
import { useUser } from "@/hooks/use-user";
import { dataStore } from "@/lib/data";

interface SubscriptionManagementPageProps {
  onNavigate: (path: string) => void;
}

export function SubscriptionManagementPage({
  onNavigate,
}: SubscriptionManagementPageProps) {
  const user = useUser();
  const [activeTab, setActiveTab] = useState("subscription");
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const plans = dataStore.plans;

  // Mock subscription data
  const subscription: any = user.isPremium
    ? user?.subscription
    : {
        plan: { name: "Free", monthlyPrice: 0 },
        // status: "active",
        expiry: "Free forever",
        paymentMethod: "No card added",
        startDate: user.createdAt,
      };

  const activePlan = plans.find((p) =>
    p.name.includes(subscription?.plan?.name! ?? subscription.plan)
  );

  // Mock billing history
  const billingHistory = [
    {
      id: "INV-2024-0612",
      date: "June 15, 2024",
      amount: 39.99,
      status: "Paid",
      description: "MasteringBackend Pro - Monthly Subscription",
    },
    {
      id: "INV-2024-0512",
      date: "May 15, 2024",
      amount: 39.99,
      status: "Paid",
      description: "MasteringBackend Pro - Monthly Subscription",
    },
    {
      id: "INV-2024-0412",
      date: "April 15, 2024",
      amount: 39.99,
      status: "Paid",
      description: "MasteringBackend Pro - Monthly Subscription",
    },
    {
      id: "INV-2024-0312",
      date: "March 15, 2024",
      amount: 39.99,
      status: "Paid",
      description: "MasteringBackend Pro - Monthly Subscription",
    },
    {
      id: "INV-2024-0212",
      date: "February 15, 2024",
      amount: 39.99,
      status: "Paid",
      description: "MasteringBackend Pro - Monthly Subscription",
    },
    {
      id: "INV-2024-0112",
      date: "January 15, 2024",
      amount: 39.99,
      status: "Paid",
      description: "MasteringBackend Pro - Monthly Subscription",
    },
  ];

  const handleCancelSubscription = () => {
    console.log("Cancelling subscription?...");
    setCancelDialogOpen(false);
    // In a real app, this would make an API call to cancel the subscription
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    console.log("Downloading invoice:", invoiceId);
    // In a real app, this would download the invoice PDF
  };

  return (
    <div className="container px-4 py-6 md:py-8 lg:py-10 max-w-5xl mx-auto space-y-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          Subscription & Billing
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your subscription and billing information
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="billing">Billing History</TabsTrigger>
        </TabsList>

        {/* Subscription Tab */}
        <TabsContent value="subscription" className="space-y-6">
          {/* Current Plan */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-[#F2C94C]" />
                Current Plan
              </CardTitle>
              <CardDescription>
                Your current subscription plan and details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold flex items-center">
                    {subscription?.plan?.name} Plan
                    <Badge className="ml-2 bg-green-100 text-green-700 border-green-200">
                      {subscription?.plan?.name === "Free"
                        ? "Active"
                        : subscription?.status === "active"
                        ? "Active"
                        : "Inactive"}
                    </Badge>
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    ${subscription?.plan?.monthlyPrice?.toFixed(2)}/month •
                    Renews on {subscription?.expiry}
                  </p>
                </div>
                <Button onClick={() => onNavigate(routes.subscriptionPlans)}>
                  {subscription.plan.name.includes("Free")
                    ? "Upgrade to Pro"
                    : "Change Plan"}
                </Button>
              </div>

              <Separator className="my-4" />

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-3">Subscription Details</h4>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Status:</dt>
                      <dd className="font-medium">
                        {subscription?.plan?.name === "Free"
                          ? "Active"
                          : subscription?.status === "active"
                          ? "Active"
                          : "Inactive"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Start Date:</dt>
                      <dd className="font-medium">
                        {new Intl.DateTimeFormat("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }).format(new Date(subscription?.startDate))}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Next Billing:</dt>
                      <dd className="font-medium">{subscription?.expiry}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Amount:</dt>
                      <dd className="font-medium">
                        ${subscription?.plan?.monthlyPrice?.toFixed(2)}/month
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Payment Method</h4>
                  <div className="flex items-center gap-3 p-4 border rounded-lg">
                    <CreditCard className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {subscription?.paymentMethod}
                      </p>
                      {!subscription?.paymentMethod?.includes(
                        "No card added"
                      ) && (
                        <p className="text-sm text-muted-foreground">
                          Expires 12/2025
                        </p>
                      )}
                    </div>
                  </div>
                  {!subscription?.paymentMethod?.includes("No card added") && (
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      Update Payment Method
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button
                variant="outline"
                onClick={() => onNavigate(routes.subscriptionPlans)}
              >
                View Available Plans
              </Button>

              {!subscription.plan.name.includes("Free") && (
                <Dialog
                  open={cancelDialogOpen}
                  onOpenChange={setCancelDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="destructive">Cancel Subscription</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cancel Your Subscription?</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to cancel your{" "}
                        {subscription?.plan?.name} subscription? You'll lose
                        access to all premium features when your current billing
                        period ends on {subscription?.expiry}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Warning</AlertTitle>
                        <AlertDescription>
                          Cancelling will remove access to premium courses,
                          bootcamps, and features when your current billing
                          period ends.
                        </AlertDescription>
                      </Alert>
                      <div className="space-y-2">
                        <h4 className="font-medium">You'll lose access to:</h4>
                        <ul className="space-y-2 text-sm mt-3">
                          <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
                            <span>All premium courses and bootcamps</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
                            <span>Interview preparation materials</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
                            <span>Certification exams</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setCancelDialogOpen(false)}
                      >
                        Keep Subscription
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleCancelSubscription}
                      >
                        Confirm Cancellation
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </CardFooter>
          </Card>

          {/* Plan Benefits */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>
                Your {subscription?.plan?.name} Plan Benefits
              </CardTitle>
              <CardDescription>
                Enjoy these premium features with your current subscription
              </CardDescription>
            </CardHeader>
            {/* HERE */}
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {activePlan?.features?.map((f, i) => (
                  <React.Fragment key={i}>
                    {i % 2 === 0 ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          {f.included ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
                          )}

                          <span>{f.name}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          {f.included ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
                          )}
                          <span>{f.name}</span>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing History Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#13AECE]" />
                Billing History
              </CardTitle>
              <CardDescription>
                View and download your past invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {billingHistory.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{invoice.description}</h4>
                        <Badge
                          variant={
                            invoice.status === "Paid" ? "default" : "secondary"
                          }
                          className={
                            invoice.status === "Paid"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : ""
                          }
                        >
                          {invoice.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Invoice #{invoice.id}</span>
                        <span>{invoice.date}</span>
                        <span>${invoice.amount?.toFixed(2)}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadInvoice(invoice.id)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-4">
              <Button variant="outline" className="w-full">
                View All Invoices
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          {/* Payment Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Payment Summary</CardTitle>
              <CardDescription>
                Your payment history at a glance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#13AECE]">
                    $
                    {billingHistory.length *
                      subscription?.plan?.monthlyPrice?.toFixed(2)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Total Paid
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#F2C94C]">
                    {billingHistory.length}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Invoices</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {billingHistory.filter((i) => i.status === "Paid").length}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Successful Payments
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Upgrade Suggestion */}
      {subscription?.plan === "Pro" && (
        <Card className="bg-gradient-to-r from-[#EB5757]/10 to-[#EB5757]/5 border-[#EB5757]/20 mt-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <Crown className="h-10 w-10 text-[#EB5757]" />
                <div>
                  <h3 className="text-xl font-semibold">
                    Upgrade to Enterprise
                  </h3>
                  <p className="text-muted-foreground">
                    Get 1-on-1 mentorship, career services, and priority support
                  </p>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                    <span>✓ 1-on-1 mentorship sessions</span>
                    <span>✓ Career placement assistance</span>
                    <span>✓ Priority support</span>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-right">
                <Button
                  size="lg"
                  onClick={() => onNavigate(routes.subscriptionPlans)}
                >
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Starting at $99.99/month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

import { CreditCard, Crown, Gift } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";

interface PaymentDialogProps {
  data: any;
  onHandlePreview: (id?: string) => void;
  onHandlePurchase: (id?: string, type?: string) => void;
  onClose: () => void;
  open: boolean;
}

export function PaymentDialog({
  data,
  open,
  onHandlePreview,
  onHandlePurchase,
  onClose,
}: PaymentDialogProps) {
  const [showPaymentDialog, setShowPaymentDialog] = useState(open);

  const canAccessCourse = (data: any) => {
    return subscription.plan !== "Free" || data?.enrolled || data?.isFree;
  };

  const getXPCost = (amount: number) => {
    return Math.round(amount * 50); // 1 dollar = 50 MB
  };

  // Mock subscription data
  const subscription = {
    plan: "Pro", // Free, Pro, Enterprise
    status: "active",
    xpBalance: 2450,
  };

  const hasAccess = canAccessCourse(data);
  const xpCost = getXPCost(data?.amount);

  return (
    <div className="space-y-2">
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="w-[95vw] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base md:text-lg">
              Get Access to {data.title}
            </DialogTitle>
            <DialogDescription className="text-sm">
              Choose how you'd like to access this course
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 md:space-y-4">
            <Card
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onHandlePurchase(data.id, "subscription")}
            >
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-3">
                  <Crown className="h-6 w-6 md:h-8 md:w-8 text-[#F2C94C] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm md:text-base">
                      Upgrade to Pro
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Get unlimited access to all courses
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm md:text-base">
                      $39.99/mo
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Best value
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onHandlePurchase(data.id, "individual")}
            >
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-6 w-6 md:h-8 md:w-8 text-[#13AECE] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm md:text-base">
                      Buy This Course
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      One-time purchase for lifetime access
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm md:text-base">
                      ${data?.amount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      One-time
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onHandlePurchase(data.id, "xp")}
            >
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-3">
                  <Gift className="h-6 w-6 md:h-8 md:w-8 text-[#EB5757] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm md:text-base">
                      Redeem with MB
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Use your earned MB points
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm md:text-base">
                      {xpCost?.toLocaleString()} MB
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Balance: {subscription?.xpBalance?.toLocaleString()} MB
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

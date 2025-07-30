import { CreditCard, Crown, Gift } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useUser } from "@/hooks/use-user";
import { useEffect, useState } from "react";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useTheme } from "next-themes";
import countries from "@/lib/countries.json";
import { toast } from "sonner";
import { useAppStore } from "@/lib/store";
import Link from "next/link";

interface PaymentDialogProps {
  data: any;
  onHandlePreview: (id?: string) => void;
  onHandlePurchase: (id: string, type: string, success: boolean) => void;
  onClose: () => void;
  open: boolean;
}

const SELLER_ID = Number(process.env.NEXT_PUBLIC_SELLER_ID);
const PADDLE_TOKEN = process.env.NEXT_PUBLIC_PADDLE_TOKEN as string;
const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV;

const PADDLE_ENVIRONMENT = NODE_ENV === "dev" ? "sandbox" : "production";

export function PaymentDialog({
  data,
  open,
  onHandlePreview,
  onHandlePurchase,
  onClose,
}: PaymentDialogProps) {
  const user = useUser();
  const store = useAppStore();
  const { theme } = useTheme();
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    initializePaddle({
      token: PADDLE_TOKEN,
      // seller: SELLER_ID,
      eventCallback: function (data: any) {
        switch (data.name) {
          case "checkout.loaded":
            console.log("Checkout loaded", data);
            onClose();
            break;
          case "checkout.closed":
            console.log("Checkout closed");
            break;
          case "checkout.completed":
            console.log("Checkout completed");
            const c_data = data?.custom_data;
            // Track payment (GA or Google)
            onHandlePurchase(c_data.id, c_data.method, true);
            break;
        }
      },
      environment: PADDLE_ENVIRONMENT,
    }).then((paddleInstance: Paddle | undefined) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });
  }, []);

  // Callback to open a checkout
  const openCheckout = (priceId: string, data: any) => {
    paddle?.Checkout.open({
      settings: {
        allowedPaymentMethods: [
          "alipay",
          "apple_pay",
          "bancontact",
          "card",
          "google_pay",
          "ideal",
          "paypal",
        ],
        theme: theme?.includes("dark") ? "dark" : "light",
      },
      items: [{ priceId }],
      customData: data,
      customer: {
        email: user?.email,
        address: {
          countryCode:
            countries.find((c) => c.name.includes(user?.country))?.code ?? "",
          // postalCode: "10021",
        },
      },
    });
  };

  const getXPCost = (amount: number) => {
    return Math.round(amount * 100); // 1 dollar = 100 MB
  };

  const xpCost = getXPCost(data?.amount);

  const handleMBPayment = async () => {
    try {
      // get user MB balance
      const mb = user?.points ?? 0;
      if (mb < xpCost) {
        toast.warning("Insufficient MB points to purchase");
        return;
      }

      const payload = {
        type: data.type,
        id: data.id,
        mb: xpCost,
      };

      const purchased = await store.handleMBPayment(payload);
      return purchased;
    } catch (error: any) {
      const res = error?.response?.data ?? error;
      toast.error(res?.message ?? "An error occurred");
    }
  };

  const handlePayment = async (id: string, type: string) => {
    let enrolled: any = null;

    console.log(data, "asas");

    if (type?.includes("subscription")) {
      openCheckout("pri_01k049swct0nvgdsw8zwh6ys64", {});
    }

    if (type?.includes("individual")) {
      const priceId = data?.paddle_price_id?.trim();
      const customData = {
        method: "individual",
        id: data?.id,
        type: "course",
      };
      if (priceId) openCheckout(priceId, customData);
    }

    if (type?.includes("mb")) {
      enrolled = await handleMBPayment();
    }
  };

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
              className="cursor-pointer  border hover:border-primary"
              onClick={() => handlePayment(data.id, "subscription")}
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
                  <div>
                    <div className="text-right">
                      <div className="font-bold text-sm md:text-base">
                        $39.99/mo
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Best value
                      </div>
                    </div>
                    <Link
                      href={"/subscription/plans"}
                      className="text-xs text-primary z-10"
                    >
                      {" "}
                      Choose another plan
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:bg-muted/50 border hover:border-primary"
              onClick={() => handlePayment(data.id, "individual")}
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
              className="cursor-pointer hover:bg-muted/50 border hover:border-primary"
              onClick={() => handlePayment(data.id, "mb")}
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
                      Balance: {user?.points?.toLocaleString()} MB
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

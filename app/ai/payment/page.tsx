"use client";

import { useUser } from "@/hooks/use-user";
import { useEffect, useState } from "react";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useTheme } from "next-themes";
import { useAppStore } from "@/lib/store";
import { PaymentChannel } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

interface PaymentDialogProps {
  data: any;
  disableMB?: boolean;
  disableOnetime?: boolean;
  disableSubscription?: boolean;
  onHandlePreview: (id?: string) => void;
  onHandlePurchase: (id: string, type: string, success: boolean) => void;
  onClose: () => void;
  open: boolean;
}

const SELLER_ID = Number(process.env.NEXT_PUBLIC_SELLER_ID);
const PADDLE_TOKEN = process.env.NEXT_PUBLIC_PADDLE_TOKEN as string;
const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV;

const PADDLE_ENVIRONMENT = NODE_ENV === "dev" ? "sandbox" : "production";

export default function XPayment({}) {
  const user = useUser();
  const store = useAppStore();
  const { theme } = useTheme();
  const [paddle, setPaddle] = useState<Paddle>();
  const searchParams = useSearchParams();
  const coupon = searchParams.get("coupon");

  //   const [plan, setPlan] = useState<Plan>();
  const [channel, setChannel] = useState<PaymentChannel>();

  const priceId =
    coupon === "EARLYBIRD20"
      ? "pri_01kh4061zp13hm9f4f4z4n8kwr" //500
      : "pri_01kh40552sfyf8vz39pzb75je1"; //150

  useEffect(() => {
    initializePaddle({
      token: PADDLE_TOKEN,
      // seller: SELLER_ID,
      eventCallback: function (data: any) {
        switch (data.name) {
          case "checkout.loaded":
            console.log("Checkout loaded", data);
            break;
          case "checkout.closed":
            console.log("Checkout closed");
            break;
          case "checkout.completed":
            const c_data = data?.custom_data;
            // Track payment (GA or Google)
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
      discountCode: "AIEARLYBIRD",
      items: [{ priceId }],
      customData: data,
    });
  };

  openCheckout(priceId, {});

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => openCheckout(priceId, {})}
      >
        Click here to proceed with payment
      </Button>
    </div>
  );
}

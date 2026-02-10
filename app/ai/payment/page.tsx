"use client";

import { useEffect, useState } from "react";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const PADDLE_TOKEN = process.env.NEXT_PUBLIC_PADDLE_TOKEN as string;
const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV;

const PADDLE_ENVIRONMENT = NODE_ENV === "dev" ? "sandbox" : "production";

export default function XPayment({}) {
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const [paddle, setPaddle] = useState<Paddle>();
  const [coupon, setCoupon] = useState<string | null>(null);

  useEffect(() => {
    const coupon = searchParams.get("coupon");
    if (coupon) {
      setCoupon(coupon);
    }
  }, [searchParams]);

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

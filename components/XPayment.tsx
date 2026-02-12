"use client";

import { useEffect, useState } from "react";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const PADDLE_TOKEN = process.env.NEXT_PUBLIC_PADDLE_TOKEN as string;
const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV;
const PADDLE_ENVIRONMENT = NODE_ENV === "dev" ? "sandbox" : "production";

export default function XPayment({
  coupon,
  ref,
  from,
}: {
  coupon: string | null;
  ref: any;
  from: string | null;
}) {
  const { theme } = useTheme();
  const [paddle, setPaddle] = useState<Paddle>();

  // const priceId =
  //   coupon === "EARLYBIRD20"
  //     ? "pri_01kh4061zp13hm9f4f4z4n8kwr"
  //     : "pri_01kh40552sfyf8vz39pzb75je1";

  const priceId =
    from === "true"
      ? "pri_01kh40552sfyf8vz39pzb75je1"
      : "pri_01kh4061zp13hm9f4f4z4n8kwr";

  useEffect(() => {
    initializePaddle({
      token: PADDLE_TOKEN,
      environment: PADDLE_ENVIRONMENT,
      eventCallback: function (data: any) {
        if (data.name === "checkout.completed") {
          console.log("Payment success");
        }
      },
    }).then((instance) => instance && setPaddle(instance));
  }, []);

  const openCheckout = () => {
    paddle?.Checkout.open({
      settings: {
        theme: theme?.includes("dark") ? "dark" : "light",
      },
      discountCode: coupon ? coupon : undefined,
      items: [{ priceId }],
      customData: { ref, from },
    });
  };

  openCheckout();

  return (
    <div className="space-y-2">
      <Button className="w-full" onClick={openCheckout}>
        Click here to proceed with payment
      </Button>
    </div>
  );
}

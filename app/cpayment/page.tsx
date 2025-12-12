"use client";

import { useEffect, useState } from "react";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const SELLER_ID = Number(process.env.NEXT_PUBLIC_SELLER_ID);
const PADDLE_TOKEN = process.env.NEXT_PUBLIC_PADDLE_TOKEN as string;
const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV;

const PADDLE_ENVIRONMENT = NODE_ENV === "dev" ? "sandbox" : "production";

export default function XPayment({}) {
  const [price, setPrice] = useState("");
  const { theme } = useTheme();
  const [paddle, setPaddle] = useState<Paddle>();
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null
  );

  const [package1, setPackage1] = useState("");
  const [team, setTeam] = useState("");
  const [slug, setSlug] = useState("");
  const [ref, setRef] = useState("");

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSearchParams(new URLSearchParams(window.location.search));
    }
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
      discountCode: package1 === "single" ? "PRESALE" : "",
      items: [{ priceId }],
      customData: {
        type: "roadmap", // Change this to be dynamic
        slug: slug,
        isExternal: true,
        package: package1,
        team: team,
        ref: ref ?? "payment_unknown",
      },
    });
  };

  useEffect(() => {
    if (!searchParams) return;

    const price = searchParams.get("id");
    const package1 = searchParams.get("package1");
    const team = searchParams.get("team");
    const slug = searchParams.get("slug");
    const ref = searchParams.get("ref");

    setPrice(price || "");
    setPackage1(package1 || "");
    setTeam(team || "");
    setSlug(slug || "");
    setRef(ref || "");
  }, [searchParams]);

  if (price) {
    openCheckout(price, {});
  }

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => openCheckout(price, {})}
      >
        Click here to proceed with payment
      </Button>
    </div>
  );
}

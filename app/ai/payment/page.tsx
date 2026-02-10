// app/ai/payment/page.tsx

import XPayment from "@/components/XPayment";

export default function Page({ searchParams }: any) {
  return <XPayment coupon={searchParams.coupon ?? null} />;
}

// app/ai/payment/page.tsx

import XPayment from "@/components/XPayment";

type SearchParams = Promise<{
  coupon?: string;
  from?: string;
  ref?: string;
}>;

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  return (
    <XPayment
      coupon={params.coupon ?? null}
      from={params.from ?? null}
      refCode={params.ref ?? ""}
    />
  );
}

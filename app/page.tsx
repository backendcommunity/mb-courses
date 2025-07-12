// "use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { DashboardContent } from "@/components/dashboard-content";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import axios from "axios";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore?.toString();

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081/api/v3",
    withCredentials: true, // if you're using cookies
    headers: {
      Cookie: cookieHeader,
    },
  });
  let user;
  try {
    const { data } = await api.get("/auth/me");
    if (!data?.success) return redirect("/auth/login");
    user = data.data;
  } catch (error) {
    return redirect("/auth/login");
  }

  return (
    <DashboardLayout>
      <DashboardContent user={user} />
    </DashboardLayout>
  );
}

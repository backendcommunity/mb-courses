"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle, Loader2 } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { useAuth } from "@/store/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulate API call for password reset
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const isSent = await auth.sendForgotPasswordEmail(email);

      if (!isSent) {
        toast.error("Please retry again");
        return;
      }

      // For demo purposes, we'll always succeed
      setIsEmailSent(true);
    } catch (error: any) {
      const message = error?.response?.data?.message ?? error?.message;
      toast.error(message);
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);

    try {
      // Simulate resend API call
      const isSent = await auth.sendForgotPasswordEmail(email);
      if (!isSent) {
        toast.error("Please retry again");
        return;
      }
      // Reset would be successful
      toast.success("Code Resent Successfully");
    } catch (err: any) {
      const message = err?.response?.data?.message ?? err?.message;
      toast.error(message);
      setError("Failed to resend email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setIsLoading(true);
    try {
      const isVerified = await auth.verifyCode(email, code);

      if (!isVerified)
        throw new Error("We could not verify code. Please try again");

      return router.push(
        `/auth/password/reset?token=${code}&email=${encodeURIComponent(email)}`
      );
    } catch (error: any) {
      const message = error?.response?.data?.message ?? error?.message;
      toast.error(message);
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-white to-[#97C3CC]/20 dark:from-[#0A0F1C] dark:via-[#1E293B] dark:to-[#0F172A] flex items-center justify-center p-4">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-[#13AECE]/10 dark:bg-[#0EA5E9]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-[#97C3CC]/10 dark:bg-[#475569]/20 rounded-full blur-3xl"></div>
        </div>

        {/* Back to Login */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/auth/login"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Login</span>
          </Link>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            {/* Success Card */}
            <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-2xl p-8 shadow-2xl text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>

              <h1 className="text-2xl font-bold text-white mb-4">
                Check Your Email
              </h1>
              <p className="text-white/70 mb-6">
                We've sent a password reset link to{" "}
                <span className="text-white font-medium break-all">
                  {email}
                </span>
              </p>

              <div className="bg-white/5 rounded-lg p-4 mb-6 text-left">
                <h3 className="text-white font-medium mb-2">What's next?</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Check your email inbox</li>
                  <li>• Copy the code and past it below</li>
                  <li>• Click on verify code</li>
                  <li>• Create a new password</li>
                  <li>• Sign in with your new password</li>
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 py-5">
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      id="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      name="code"
                      required
                      className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your code here"
                    />
                  </div>
                </div>
              </form>

              <div className="space-y-4">
                <button
                  onClick={handleVerifyCode}
                  disabled={isLoading}
                  className="w-full mb-5 bg-[#0E1F33] dark:bg-[#0EA5E9] text-white py-3 px-4 rounded-lg hover:bg-[#0E1F33]/90 dark:hover:bg-[#0284C7] transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  Verify Code
                </button>

                <hr />
                <button
                  onClick={handleResendEmail}
                  disabled={isLoading}
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Resending...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      <span>Resend Email</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-white/50 text-sm mt-6">
                Didn't receive the email? Check your spam folder or contact
                support.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-white to-[#97C3CC]/20 dark:from-[#0A0F1C] dark:via-[#1E293B] dark:to-[#0F172A] flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-[#13AECE]/10 dark:bg-[#0EA5E9]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-[#97C3CC]/10 dark:bg-[#475569]/20 rounded-full blur-3xl"></div>
      </div>

      {/* Back to Login */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/auth/login"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Login</span>
        </Link>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full flex flex-col max-w-md">
          {/* Glass Card */}
          <div className="mx-auto flex text-center mb-10">
            <BrandLogo />
          </div>
          <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-2xl p-8 shadow-2xl">
            {/* Logo */}

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">
                Forgot Password?
              </h1>
              <p className="text-white/70">
                No worries, we'll send you reset instructions
              </p>
            </div>

            {/* Reset Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white/90 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                </div>
                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full bg-[#0E1F33] dark:bg-[#0EA5E9] text-white py-3 px-4 rounded-lg hover:bg-[#0E1F33]/90 dark:hover:bg-[#0284C7] transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    <span>Send Reset Instructions</span>
                  </>
                )}
              </button>
            </form>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-white/5 rounded-lg">
              <h3 className="text-white font-medium text-sm mb-2">
                Security Notice
              </h3>
              <p className="text-white/70 text-xs">
                For your security, password reset links expire after 24 hours.
                If you don't receive an email within a few minutes, please check
                your spam folder.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft, Check, CheckCircle } from "lucide-react";
import { useAuth } from "@/store/auth";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const auth = useAuth();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    const emailToken = searchParams.get("email");

    if (tokenParam) setToken(tokenParam);
    if (emailToken) setEmail(emailToken);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      setIsLoading(true);
      const passwordReset = await auth.resetPassword(
        token,
        email,
        formData.password
      );

      if (!passwordReset)
        throw new Error("Password reset failed. Please try again");

      setIsLoading(false);
      setIsSuccess(true);
    } catch (error: any) {
      const message = error?.response?.data?.message ?? error?.message;
      toast.error(message);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Check password strength
    if (name === "password") {
      setPasswordStrength({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /\d/.test(value),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      });
    }
  };

  const getPasswordStrengthScore = () => {
    return Object.values(passwordStrength).filter(Boolean).length;
  };

  const getPasswordStrengthColor = () => {
    const score = getPasswordStrengthScore();
    if (score <= 2) return "bg-red-500";
    if (score <= 3) return "bg-yellow-500";
    if (score <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-white to-[#97C3CC]/20 dark:from-[#0A0F1C] dark:via-[#1E293B] dark:to-[#0F172A] flex items-center justify-center p-4">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-[#13AECE]/10 dark:bg-[#0EA5E9]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-[#97C3CC]/10 dark:bg-[#475569]/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            {/* Success Card */}
            <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-2xl p-8 shadow-2xl text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>

              <h1 className="text-2xl font-bold text-white mb-4">
                Password Reset Successful!
              </h1>
              <p className="text-white/70 mb-8">
                Your password has been successfully reset. You can now sign in
                with your new password.
              </p>

              <Link
                href="/auth/login"
                className="w-full bg-[#0E1F33] dark:bg-[#0EA5E9] text-white py-3 px-4 rounded-lg hover:bg-[#0E1F33]/90 dark:hover:bg-[#0284C7] transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                Continue to Login
              </Link>
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
        <div className="w-full max-w-md">
          {/* Glass Card */}
          <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-2xl p-8 shadow-2xl">
            {/* Logo */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">
                Reset Your Password
              </h1>
              <p className="text-white/70">Enter your new password below</p>
            </div>

            {/* Reset Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="py-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white/90 mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors duration-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                            i <= getPasswordStrengthScore()
                              ? getPasswordStrengthColor()
                              : "bg-white/20"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-white/70 space-y-1">
                      <div className="flex items-center gap-2">
                        <Check
                          className={`w-3 h-3 ${
                            passwordStrength.length
                              ? "text-green-400"
                              : "text-white/30"
                          }`}
                        />
                        <span>At least 8 characters</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check
                          className={`w-3 h-3 ${
                            passwordStrength.uppercase
                              ? "text-green-400"
                              : "text-white/30"
                          }`}
                        />
                        <span>One uppercase letter</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check
                          className={`w-3 h-3 ${
                            passwordStrength.number
                              ? "text-green-400"
                              : "text-white/30"
                          }`}
                        />
                        <span>One number</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="py-3">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-white/90 mb-2"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Confirm your new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors duration-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword &&
                  formData.password !== formData.confirmPassword && (
                    <p className="text-red-400 text-xs mt-1">
                      Passwords do not match
                    </p>
                  )}
              </div>
              <div className="py-3">
                <button
                  type="submit"
                  disabled={
                    isLoading ||
                    formData.password !== formData.confirmPassword ||
                    !formData.password
                  }
                  className="w-full bg-[#0E1F33] dark:bg-[#0EA5E9] text-white py-3 px-4 rounded-lg hover:bg-[#0E1F33]/90 dark:hover:bg-[#0284C7] transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Resetting password...</span>
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

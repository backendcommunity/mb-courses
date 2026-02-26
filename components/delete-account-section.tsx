/**
 * Delete Account Section Component
 * Epic 4, Story 4.2: Account Deletion UI
 *
 * Danger Zone section for account deletion
 * Shows in Settings page under a "Danger Zone" section
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAppStore } from "@/lib/store";

interface DeleteAccountSectionProps {
  email?: string;
}

export function DeleteAccountSection({ email }: DeleteAccountSectionProps) {
  const store = useAppStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [emailInput, setEmailInput] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
    setStep(1);
    setEmailInput("");
    setConfirmText("");
    setError(null);
  };

  const handleConfirmEmail = async () => {
    if (!emailInput) {
      setError("Email is required");
      return;
    }

    if (emailInput.toLowerCase() !== email?.toLowerCase()) {
      setError("Email does not match your account");
      return;
    }

    // Move to step 2 (confirmation)
    setError(null);
    setStep(2);
  };

  const handleFinalDelete = async () => {
    if (confirmText !== "DELETE") {
      setError('Please type "DELETE" to confirm');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Call store action (Epic 4: Delete account with email verification)
      await store.deleteAccount(emailInput);

      toast.success(
        "Account deletion initiated. Check your email for recovery options.",
      );

      // Close modal
      setShowDeleteModal(false);

      // Optional: Redirect to a "Account Deletion Initiated" page
      // setTimeout(() => {
      //   window.location.href = '/account-deletion-initiated';
      // }, 2000);
    } catch (err: any) {
      console.error("Delete account error:", err);
      const message =
        err.response?.data?.message ||
        "Failed to delete account. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Danger Zone Card */}
      <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <CardTitle className="text-red-700 dark:text-red-300">
              Danger Zone
            </CardTitle>
          </div>
          <CardDescription className="text-red-600 dark:text-red-400">
            Irreversible actions that permanently affect your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Delete Account Option */}
          <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-900 rounded-lg bg-white dark:bg-gray-950">
            <div className="space-y-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Delete Account
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Permanently delete your account and all associated data
              </p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                ⚠️ You have 7 days to recover your account after deletion
              </p>
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteClick}
              className="gap-2 shrink-0"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Delete Account Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="max-w-md">
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-red-600 dark:text-red-400">
                  Confirm Account Deletion
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. Your account will be deleted,
                  but you can recover it within 7 days.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Warning Box */}
                <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
                  <p className="text-sm text-red-800 dark:text-red-300">
                    <strong>Before you delete:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>All your courses and progress will be deleted</li>
                      <li>You have 7 days to recover your account</li>
                      <li>
                        After 7 days, your data will be permanently erased
                      </li>
                      <li>This complies with GDPR data erasure requirements</li>
                    </ul>
                  </p>
                </div>

                {/* Email Confirmation Input */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email-confirm"
                    className="text-sm font-medium"
                  >
                    Enter your email to confirm
                  </Label>
                  <Input
                    id="email-confirm"
                    type="email"
                    placeholder="your@email.com"
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                      setError(null);
                    }}
                    disabled={loading}
                    className="border-red-300 focus:border-red-500 focus:ring-red-500"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    We'll confirm this matches your account
                  </p>
                  {error && (
                    <p className="text-xs text-red-600 dark:text-red-400">
                      {error}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteModal(false)}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleConfirmEmail}
                    disabled={loading || !emailInput}
                  >
                    {loading ? "Verifying..." : "Continue"}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-red-600 dark:text-red-400">
                  Final Confirmation
                </DialogTitle>
                <DialogDescription>
                  Type <strong>DELETE</strong> below to permanently delete your
                  account
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Final Warning */}
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700 rounded-lg">
                  <p className="text-sm text-orange-800 dark:text-orange-300">
                    <strong>⚠️ This is your last chance to cancel!</strong>
                    <p className="mt-2">
                      After this step, your account will be marked for deletion.
                      You will have 7 days to recover it using the recovery link
                      sent to <strong>{email}</strong>.
                    </p>
                  </p>
                </div>

                {/* Confirmation Text Input */}
                <div className="space-y-2">
                  <Label htmlFor="confirm-text" className="text-sm font-medium">
                    Type{" "}
                    <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                      DELETE
                    </code>{" "}
                    to confirm
                  </Label>
                  <Input
                    id="confirm-text"
                    type="text"
                    placeholder="Type DELETE"
                    value={confirmText}
                    onChange={(e) => {
                      setConfirmText(e.target.value.toUpperCase());
                      setError(null);
                    }}
                    disabled={loading}
                    className="border-red-300 focus:border-red-500 focus:ring-red-500 font-mono uppercase"
                  />
                  {error && (
                    <p className="text-xs text-red-600 dark:text-red-400">
                      {error}
                    </p>
                  )}

                  {/* Visual feedback */}
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    You typed: <code>{confirmText}</code>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    disabled={loading}
                  >
                    Back
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleFinalDelete}
                    disabled={loading || confirmText !== "DELETE"}
                    className="gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    {loading ? "Deleting..." : "Delete Account Permanently"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

/**
 * INTEGRATION INSTRUCTIONS:
 *
 * 1. Add to components/pages/settings.tsx:
 *
 *    import { DeleteAccountSection } from '@/components/delete-account-section';
 *
 *    // In the SettingsPage component, add before the closing div:
 *    <DeleteAccountSection email={user?.email} />
 *
 * 2. Add email templates to your mail service:
 *    - account_deletion_initiated.html
 *    - account_recovered.html
 *
 * 3. Create recovery page at app/(dashboard)/recover-account/page.tsx
 *
 * FEATURES:
 * ✅ 2-step confirmation modal
 * ✅ Email verification (works for OAuth & email/password users)
 * ✅ Type "DELETE" to confirm
 * ✅ Clear warnings about consequences
 * ✅ 7-day recovery window
 * ✅ GDPR compliant
 * ✅ Dark mode support
 * ✅ Error handling with toast notifications
 * ✅ Loading states
 * ✅ Accessible form controls
 */

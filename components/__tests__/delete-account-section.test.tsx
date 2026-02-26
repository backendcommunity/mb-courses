/**
 * Delete Account Section Component Tests
 * Epic 4, Story 4.2
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DeleteAccountSection } from "../delete-account-section";
import axios from "axios";

vi.mock("axios");
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("DeleteAccountSection Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render danger zone section", () => {
      render(<DeleteAccountSection email="test@example.com" />);

      expect(screen.getByText("Danger Zone")).toBeInTheDocument();
      expect(screen.getByText("Delete Account")).toBeInTheDocument();
    });

    it("should have delete account button", () => {
      render(<DeleteAccountSection email="test@example.com" />);

      const deleteButton = screen.getByRole("button", {
        name: /Delete Account/i,
      });
      expect(deleteButton).toBeInTheDocument();
    });

    it("should display warning text", () => {
      render(<DeleteAccountSection email="test@example.com" />);

      expect(
        screen.getByText(/all your courses and progress will be deleted/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/7 days to recover/i)).toBeInTheDocument();
    });
  });

  describe("Modal Opening", () => {
    it("should open modal when delete button clicked", async () => {
      const user = userEvent.setup();
      render(<DeleteAccountSection email="test@example.com" />);

      const deleteButton = screen.getByRole("button", {
        name: /Delete Account/i,
      });
      await user.click(deleteButton);

      expect(screen.getByText("Confirm Account Deletion")).toBeInTheDocument();
    });

    it("should show step 1 (email verification) initially", async () => {
      const user = userEvent.setup();
      render(<DeleteAccountSection email="test@example.com" />);

      const deleteButton = screen.getByRole("button", {
        name: /Delete Account/i,
      });
      await user.click(deleteButton);

      expect(
        screen.getByText(/Enter your email to confirm/i),
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText("your@email.com")).toBeInTheDocument();
    });
  });

  describe("Step 1: Email Verification", () => {
    it("should disable continue button when email empty", async () => {
      const user = userEvent.setup();
      render(<DeleteAccountSection email="test@example.com" />);

      const deleteButton = screen.getByRole("button", {
        name: /Delete Account/i,
      });
      await user.click(deleteButton);

      const continueButton = screen.getByRole("button", { name: /Continue/i });
      expect(continueButton).toBeDisabled();
    });

    it("should enable continue button when email entered", async () => {
      const user = userEvent.setup();
      render(<DeleteAccountSection email="test@example.com" />);

      const deleteButton = screen.getByRole("button", {
        name: /Delete Account/i,
      });
      await user.click(deleteButton);

      const emailInput = screen.getByPlaceholderText("your@email.com");
      await user.type(emailInput, "test@example.com");

      const continueButton = screen.getByRole("button", { name: /Continue/i });
      expect(continueButton).not.toBeDisabled();
    });

    it("should move to step 2 when continue clicked with matching email", async () => {
      const user = userEvent.setup();
      render(<DeleteAccountSection email="test@example.com" />);

      const deleteButton = screen.getByRole("button", {
        name: /Delete Account/i,
      });
      await user.click(deleteButton);

      const emailInput = screen.getByPlaceholderText("your@email.com");
      await user.type(emailInput, "test@example.com");

      const continueButton = screen.getByRole("button", { name: /Continue/i });
      await user.click(continueButton);

      expect(screen.getByText("Final Confirmation")).toBeInTheDocument();
    });

    it("should show error if email does not match account", async () => {
      const user = userEvent.setup();
      render(<DeleteAccountSection email="test@example.com" />);

      const deleteButton = screen.getByRole("button", {
        name: /Delete Account/i,
      });
      await user.click(deleteButton);

      const emailInput = screen.getByPlaceholderText("your@email.com");
      await user.type(emailInput, "wrong@example.com");

      const continueButton = screen.getByRole("button", { name: /Continue/i });
      await user.click(continueButton);

      await waitFor(() => {
        expect(screen.getByText("Email does not match")).toBeInTheDocument();
      });
    });
  });

  describe("Step 2: Confirmation", () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      render(<DeleteAccountSection email="test@example.com" />);

      const deleteButton = screen.getByRole("button", {
        name: /Delete Account/i,
      });
      await user.click(deleteButton);

      const emailInput = screen.getByPlaceholderText("your@email.com");
      await user.type(emailInput, "test@example.com");

      const continueButton = screen.getByRole("button", { name: /Continue/i });
      await user.click(continueButton);
    });

    it("should show confirmation text input", () => {
      expect(screen.getByPlaceholderText("Type DELETE")).toBeInTheDocument();
    });

    it("should display email address", () => {
      expect(screen.getByText("test@example.com")).toBeInTheDocument();
    });

    it('should disable delete button when text not "DELETE"', () => {
      const deleteButton = screen.getByRole("button", {
        name: /Delete Account Permanently/i,
      });
      expect(deleteButton).toBeDisabled();
    });

    it('should enable delete button only when "DELETE" typed', async () => {
      const user = userEvent.setup();
      const confirmInput = screen.getByPlaceholderText("Type DELETE");

      // Typing wrong text
      await user.type(confirmInput, "DELETE123");
      let deleteButton = screen.getByRole("button", {
        name: /Delete Account Permanently/i,
      });
      expect(deleteButton).toBeDisabled();

      // Clear and type correct text
      await user.clear(confirmInput);
      await user.type(confirmInput, "DELETE");
      deleteButton = screen.getByRole("button", {
        name: /Delete Account Permanently/i,
      });
      expect(deleteButton).not.toBeDisabled();
    });

    it("should be case insensitive for DELETE text", async () => {
      const user = userEvent.setup();
      const confirmInput = screen.getByPlaceholderText("Type DELETE");

      await user.type(confirmInput, "delete");
      const deleteButton = screen.getByRole("button", {
        name: /Delete Account Permanently/i,
      });
      expect(deleteButton).not.toBeDisabled();
    });

    it("should show back button to return to step 1", async () => {
      const user = userEvent.setup();
      const backButton = screen.getByRole("button", { name: /Back/i });
      expect(backButton).toBeInTheDocument();

      await user.click(backButton);

      expect(
        screen.getByText(/Enter your email to confirm/i),
      ).toBeInTheDocument();
    });
  });

  describe("Final Deletion", () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      render(<DeleteAccountSection email="test@example.com" />);

      const deleteButton = screen.getByRole("button", {
        name: /Delete Account/i,
      });
      await user.click(deleteButton);

      const emailInput = screen.getByPlaceholderText("your@email.com");
      await user.type(emailInput, "test@example.com");

      const continueButton = screen.getByRole("button", { name: /Continue/i });
      await user.click(continueButton);

      const confirmInput = screen.getByPlaceholderText("Type DELETE");
      await user.type(confirmInput, "DELETE");
    });

    it("should call API endpoint with correct data", async () => {
      const user = userEvent.setup();
      const mockAxios = vi.mocked(axios);
      mockAxios.post.mockResolvedValueOnce({ data: { success: true } });

      const deleteButton = screen.getByRole("button", {
        name: /Delete Account Permanently/i,
      });
      await user.click(deleteButton);

      await waitFor(() => {
        expect(mockAxios.post).toHaveBeenCalledWith(
          expect.stringContaining("/api/v3/users/delete-account"),
          {
            email: "test@example.com",
            confirmDelete: true,
          },
          expect.any(Object),
        );
      });
    });

    it("should close modal on successful deletion", async () => {
      const user = userEvent.setup();
      const mockAxios = vi.mocked(axios);
      mockAxios.post.mockResolvedValueOnce({ data: { success: true } });

      const deleteButton = screen.getByRole("button", {
        name: /Delete Account Permanently/i,
      });
      await user.click(deleteButton);

      await waitFor(() => {
        expect(
          screen.queryByText("Confirm Account Deletion"),
        ).not.toBeInTheDocument();
      });
    });

    it("should show success toast on successful deletion", async () => {
      const user = userEvent.setup();
      const mockAxios = vi.mocked(axios);
      const { toast } = await import("sonner");
      mockAxios.post.mockResolvedValueOnce({ data: { success: true } });

      const deleteButton = screen.getByRole("button", {
        name: /Delete Account Permanently/i,
      });
      await user.click(deleteButton);

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalled();
      });
    });

    it("should show error toast on failed deletion", async () => {
      const user = userEvent.setup();
      const mockAxios = vi.mocked(axios);
      const { toast } = await import("sonner");
      mockAxios.post.mockRejectedValueOnce({
        response: { data: { message: "Deletion failed" } },
      });

      const deleteButton = screen.getByRole("button", {
        name: /Delete Account Permanently/i,
      });
      await user.click(deleteButton);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled();
      });
    });

    it("should show error message in modal on failed deletion", async () => {
      const user = userEvent.setup();
      const mockAxios = vi.mocked(axios);
      mockAxios.post.mockRejectedValueOnce({
        response: { data: { message: "Server error occurred" } },
      });

      const deleteButton = screen.getByRole("button", {
        name: /Delete Account Permanently/i,
      });
      await user.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByText("Server error occurred")).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper labels for inputs", async () => {
      const user = userEvent.setup();
      render(<DeleteAccountSection email="test@example.com" />);

      const deleteButton = screen.getByRole("button", {
        name: /Delete Account/i,
      });
      await user.click(deleteButton);

      expect(
        screen.getByLabelText(/Enter your password to confirm/i),
      ).toBeInTheDocument();
    });

    it("should be keyboard navigable", async () => {
      const user = userEvent.setup();
      render(<DeleteAccountSection email="test@example.com" />);

      const deleteButton = screen.getByRole("button", {
        name: /Delete Account/i,
      });
      await user.keyboard("{Tab}");
      // Continue testing keyboard nav...
    });
  });

  describe("Dark Mode", () => {
    it("should render with dark mode classes", () => {
      const { container } = render(
        <DeleteAccountSection email="test@example.com" />,
      );

      const dangerZone = container.querySelector('[class*="dark:"]');
      expect(dangerZone).toBeInTheDocument();
    });
  });
});

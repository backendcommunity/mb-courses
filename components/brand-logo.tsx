interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  variant?: "default" | "white" | "dark";
}

export function BrandLogo({
  size = "lg",
  showText = true,
  variant = "default",
}: BrandLogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-2xl",
  };

  const starSizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  };

  // Updated color handling for dark mode
  const logoColors = {
    default: "bg-[#0E1F33] dark:bg-[#0EA5E9]",
    white: "bg-white",
    dark: "bg-[#0E1F33]",
  };

  const textColors = {
    default: "text-[#0E1F33] dark:text-[#F1F5F9]",
    white: "text-white",
    dark: "text-[#0E1F33]",
  };

  return (
    <div className="flex items-center space-x-2">
      <div
        className={`${sizeClasses[size]}  rounded-lg flex items-center justify-center relative`}
      >
        <span
          className={`${
            variant === "white" ? "text-[#0E1F33]" : "text-white"
          } font-bold ${size === "sm" ? "text-xs" : "text-sm"}`}
        >
          <img src="/logo.png" alt="logo" />
        </span>
      </div>
    </div>
  );
}

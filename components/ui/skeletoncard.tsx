import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // If you're using shadcn/ui or similar

export const SkeletonCard = () => {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg shadow-sm animate-pulse">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};

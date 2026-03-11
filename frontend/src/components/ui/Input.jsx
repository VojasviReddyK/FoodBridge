import React from 'react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Input = React.forwardRef(({ className, type, label, error, ...props }, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-neutral-700">{label}</label>}
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus:ring-red-500/50 focus:border-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";

import React from 'react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef(({ className, variant = 'primary', size = 'default', children, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-emerald-600 shadow-sm hover:shadow-md focus:ring-primary",
    secondary: "bg-secondary text-white hover:bg-amber-600 shadow-sm hover:shadow-md focus:ring-secondary",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary",
    ghost: "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    default: "h-11 px-6 py-3",
    lg: "h-14 px-8 text-lg",
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "w-full h-11 rounded-md border border-rule bg-page/60 px-3.5 text-[15px] text-ink placeholder:text-muted",
        "focus:border-accent focus:bg-page focus:outline-none",
        "disabled:opacity-60",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full min-h-[120px] rounded-md border border-rule bg-page/60 px-3.5 py-3 text-[15px] text-ink placeholder:text-muted",
      "focus:border-accent focus:bg-page focus:outline-none",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

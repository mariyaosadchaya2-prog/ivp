import * as React from "react";
import { cn } from "@/lib/utils";

export function Section({
  className,
  bleed = false,
  ...props
}: React.HTMLAttributes<HTMLElement> & { bleed?: boolean }) {
  return (
    <section
      className={cn("py-16 md:py-24", bleed && "bg-card", className)}
      {...props}
    />
  );
}

export function SectionHeader({
  kicker,
  title,
  lead,
  align = "left",
}: {
  kicker?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <header
      className={cn(
        "mb-10 md:mb-14 max-w-3xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      {kicker && <div className="kicker mb-4">{kicker}</div>}
      <h2 className="text-display-2 font-display text-ink">{title}</h2>
      {lead && <p className="mt-5 text-lg text-muted leading-relaxed">{lead}</p>}
    </header>
  );
}

import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "compact",
}: {
  className?: string;
  variant?: "compact" | "full";
}) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-3 group text-ink hover:text-accent transition-colors",
        className
      )}
      aria-label="Институт вокальной психологии — на главную"
    >
      <span
        aria-hidden
        className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-accent text-white font-display text-[15px] font-semibold tracking-tight"
      >
        ИВП
      </span>
      {variant === "full" && (
        <span className="hidden sm:flex flex-col leading-tight">
          <span className="font-display text-[15px] font-semibold">
            Институт вокальной психологии
          </span>
          <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
            Первый в России профильный
          </span>
        </span>
      )}
      {variant === "compact" && (
        <span className="hidden sm:inline font-display text-[15px] font-semibold">
          Институт вокальной психологии
        </span>
      )}
    </Link>
  );
}

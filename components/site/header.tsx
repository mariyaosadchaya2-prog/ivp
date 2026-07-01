"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/utils";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/programs", label: "Программы" },
  { href: "/programs?type=course", label: "Мини-курсы" },
  { href: "/free", label: "Бесплатные материалы" },
  { href: "/test", label: "Диагностика" },
  { href: "/methodology", label: "Методология" },
  { href: "/about", label: "О нас" },
  { href: "/for-schools", label: "Школам" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-page/90 backdrop-blur transition-colors",
        scrolled && "border-b border-rule/70"
      )}
    >
      <div className="container-tight flex h-16 md:h-20 items-center justify-between gap-6">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1 text-[14px]">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 rounded-md text-ink/80 hover:text-accent hover:bg-accent-soft/40 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={siteConfig.lmsUrl}
            className="text-[14px] text-muted hover:text-accent"
          >
            Личный кабинет
          </a>
          <Button asChild size="sm">
            <Link href="#apply">Оставить заявку</Link>
          </Button>
        </div>

        <button
          className="lg:hidden p-2 -mr-2 text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-rule bg-page">
          <nav className="container-tight py-4 flex flex-col divide-y divide-rule/60">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[15px] text-ink hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={siteConfig.lmsUrl}
              className="py-3 text-[15px] text-muted"
            >
              Личный кабинет
            </a>
            <div className="pt-4">
              <Button asChild className="w-full" onClick={() => setOpen(false)}>
                <Link href="#apply">Оставить заявку</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

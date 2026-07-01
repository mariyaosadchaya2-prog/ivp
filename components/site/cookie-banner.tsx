"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "ivp.cookie.consent.v1";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* private mode */
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Согласие на использование cookie"
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:bottom-6 md:max-w-md z-50"
    >
      <div className="bg-page border border-rule rounded-lg shadow-card p-5">
        <p className="text-[14px] text-ink leading-relaxed">
          Мы используем cookie, чтобы сайт работал корректно и мы могли понимать, как им пользуются.
          Подробнее — в{" "}
          <Link href="/legal/privacy" className="link-underline">
            политике обработки персональных данных
          </Link>
          .
        </p>
        <div className="mt-4 flex gap-3">
          <Button size="sm" onClick={accept}>
            Принять
          </Button>
          <Button size="sm" variant="secondary" onClick={accept}>
            Только необходимые
          </Button>
        </div>
      </div>
    </div>
  );
}

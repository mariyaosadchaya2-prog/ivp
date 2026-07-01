"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitLead } from "@/app/actions";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LeadKind =
  | "contact"
  | "program-apply"
  | "test-result"
  | "school-audit"
  | "subscribe";

const initialState = { ok: false } as { ok: boolean; error?: string };

export function LeadForm({
  kind,
  submitLabel = "Оставить заявку",
  hiddenFields,
  showName = true,
  showEmail = true,
  showPhone = true,
  showMessage = false,
  successTitle = "Заявка принята",
  successNote = "Ответим в течение рабочего дня.",
  className,
  intro,
}: {
  kind: LeadKind;
  submitLabel?: string;
  hiddenFields?: Record<string, string>;
  showName?: boolean;
  showEmail?: boolean;
  showPhone?: boolean;
  showMessage?: boolean;
  successTitle?: string;
  successNote?: string;
  className?: string;
  intro?: React.ReactNode;
}) {
  const [state, action] = useFormState(submitLead, initialState);

  if (state?.ok) {
    return (
      <div
        className={cn(
          "rounded-lg border border-rule bg-page p-6 md:p-8 animate-fade-up",
          className
        )}
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-0.5" />
          <div>
            <p className="font-display text-lg font-medium text-ink">
              {successTitle}
            </p>
            <p className="mt-1 text-[14px] text-muted">{successNote}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className={cn("space-y-4", className)}>
      <input type="hidden" name="kind" value={kind} />
      {hiddenFields &&
        Object.entries(hiddenFields).map(([k, v]) => (
          <input key={k} type="hidden" name={k} value={v} />
        ))}

      {intro && <div className="text-[14px] text-muted mb-1">{intro}</div>}

      {showName && (
        <div className="space-y-1.5">
          <label htmlFor={`${kind}-name`} className="text-[13px] text-muted">
            Имя
          </label>
          <Input
            id={`${kind}-name`}
            name="name"
            autoComplete="name"
            required
            placeholder="Как к вам обращаться"
          />
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {showEmail && (
          <div className="space-y-1.5">
            <label htmlFor={`${kind}-email`} className="text-[13px] text-muted">
              Email
            </label>
            <Input
              id={`${kind}-email`}
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>
        )}
        {showPhone && (
          <div className="space-y-1.5">
            <label htmlFor={`${kind}-phone`} className="text-[13px] text-muted">
              Телефон
            </label>
            <Input
              id={`${kind}-phone`}
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="+7 ___ ___-__-__"
            />
          </div>
        )}
      </div>
      {showMessage && (
        <div className="space-y-1.5">
          <label htmlFor={`${kind}-msg`} className="text-[13px] text-muted">
            Сообщение
          </label>
          <Textarea
            id={`${kind}-msg`}
            name="message"
            placeholder="Что важно рассказать заранее"
          />
        </div>
      )}

      <label className="flex items-start gap-2.5 text-[13px] text-muted leading-relaxed">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 rounded border-rule text-accent focus:ring-accent"
        />
        <span>
          Даю согласие на обработку персональных данных согласно{" "}
          <Link href="/legal/privacy" className="link-underline">
            политике
          </Link>
          .
        </span>
      </label>

      {state?.error && (
        <p className="text-[13px] text-red-700 bg-red-50 border border-red-100 rounded px-3 py-2">
          {state.error}
        </p>
      )}

      <SubmitButton>{submitLabel}</SubmitButton>
    </form>
  );
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Отправляем…" : children}
    </Button>
  );
}

"use server";

import { deliverLead, type FormLead } from "@/lib/mail";

export async function submitLead(
  _prev: { ok: boolean; error?: string } | undefined,
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  const kind = (formData.get("kind") ?? "contact") as FormLead["kind"];
  const name = str(formData.get("name"));
  const email = str(formData.get("email"));
  const phone = str(formData.get("phone"));
  const message = str(formData.get("message"));
  const consent = formData.get("consent") === "on" || formData.get("consent") === "true";

  if (!name && !email && !phone) {
    return { ok: false, error: "Заполните хотя бы имя и способ связи." };
  }
  if (!consent) {
    return { ok: false, error: "Нужно согласие на обработку персональных данных." };
  }

  const meta: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (["kind", "name", "email", "phone", "message", "consent"].includes(key)) continue;
    if (typeof value === "string" && value) meta[key] = value;
  }

  await deliverLead({ kind, name, email, phone, message, meta });
  return { ok: true };
}

function str(v: FormDataEntryValue | null): string | undefined {
  if (typeof v !== "string") return undefined;
  const s = v.trim();
  return s || undefined;
}

// Простой транспорт для форм. По умолчанию — лог в консоль (для локальной разработки).
// Когда команда ИВП определится с почтой, подключим Resend/Sendgrid через RESEND_API_KEY.

export type FormLead = {
  kind:
    | "contact"
    | "program-apply"
    | "test-result"
    | "school-audit"
    | "subscribe";
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  meta?: Record<string, string | number | boolean | null | undefined>;
};

export async function deliverLead(lead: FormLead): Promise<{ ok: true }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL ?? "hello@ivp.example";

  if (!apiKey) {
    console.log("[ivp-lead]", JSON.stringify(lead, null, 2));
    return { ok: true };
  }

  const body = renderPlain(lead);
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: `ИВП сайт <no-reply@${new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ivp.example").hostname}>`,
      to,
      subject: `[${lead.kind}] заявка с сайта`,
      text: body,
    }),
  }).catch((err) => {
    console.error("[ivp-lead] delivery failed", err);
  });

  return { ok: true };
}

function renderPlain(lead: FormLead): string {
  const lines: string[] = [
    `Тип: ${lead.kind}`,
    lead.name ? `Имя: ${lead.name}` : "",
    lead.email ? `Email: ${lead.email}` : "",
    lead.phone ? `Телефон: ${lead.phone}` : "",
    lead.message ? `Сообщение: ${lead.message}` : "",
  ].filter(Boolean);
  if (lead.meta) {
    lines.push("--");
    for (const [k, v] of Object.entries(lead.meta)) {
      if (v !== null && v !== undefined && v !== "") lines.push(`${k}: ${v}`);
    }
  }
  return lines.join("\n");
}

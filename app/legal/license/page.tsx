import type { Metadata } from "next";

export const metadata: Metadata = { title: "Лицензия и документы" };

export default function LicensePage() {
  return (
    <article className="space-y-6 text-[15px] leading-relaxed text-ink/90">
      <div className="kicker mb-2">Документы</div>
      <h1 className="font-display text-display-3 text-ink">
        Лицензия и документы института
      </h1>

      <p>
        Институт вокальной психологии ведёт образовательную деятельность на основании
        лицензии. Выпускники программ повышения квалификации получают удостоверения
        государственного образца.
      </p>

      <div className="grid gap-4 mt-6">
        {[
          { title: "Лицензия на образовательную деятельность", status: "будет опубликована после получения" },
          { title: "Свидетельство о регистрации", status: "будет опубликовано после регистрации" },
          { title: "Образец удостоверения о ПК", status: "публикуется после первого выпуска" },
        ].map((d) => (
          <div key={d.title} className="rounded-md border border-rule bg-card p-4">
            <div className="font-display text-[16px] text-ink">{d.title}</div>
            <div className="mt-1 text-[13px] text-muted">Статус: {d.status}</div>
          </div>
        ))}
      </div>

      <p className="text-[14px] text-muted pt-6">
        По вопросам, связанным с документами, пишите на{" "}
        <a href="mailto:hello@ivp.example" className="link-underline">
          hello@ivp.example
        </a>
        .
      </p>
    </article>
  );
}

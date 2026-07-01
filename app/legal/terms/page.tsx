import type { Metadata } from "next";

export const metadata: Metadata = { title: "Пользовательское соглашение" };

export default function TermsPage() {
  return (
    <article className="space-y-6 text-[15px] leading-relaxed text-ink/90">
      <div className="kicker mb-2">Пользовательское соглашение</div>
      <h1 className="font-display text-display-3 text-ink">
        Пользовательское соглашение сайта ИВП
      </h1>
      <p className="text-[13px] text-muted">
        Последнее обновление — {new Date().getFullYear()} г.
      </p>
      <p className="rounded-md border border-dashed border-rule bg-card/60 p-4 text-[13px] text-muted">
        Заменяется финальным текстом от заказчика.
      </p>

      <h2 className="font-display text-xl text-ink pt-4">1. Условия использования</h2>
      <p>
        Настоящее соглашение регулирует отношения между посетителем сайта и оператором
        сайта. Использование сайта означает согласие с условиями настоящего соглашения.
      </p>

      <h2 className="font-display text-xl text-ink pt-4">2. Интеллектуальная собственность</h2>
      <p>
        Все материалы сайта, включая тексты, изображения, видео, дизайн, программы,
        принадлежат Институту вокальной психологии и/или указанным правообладателям.
      </p>

      <h2 className="font-display text-xl text-ink pt-4">3. Ответственность</h2>
      <p>
        Информация на сайте предоставляется «как есть». Оператор не несёт ответственности
        за возможные ошибки, но стремится поддерживать актуальность.
      </p>

      <h2 className="font-display text-xl text-ink pt-4">4. Изменение условий</h2>
      <p>
        Оператор вправе изменять условия настоящего соглашения. Актуальная версия всегда
        доступна на этой странице.
      </p>
    </article>
  );
}

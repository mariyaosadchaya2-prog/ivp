import type { Metadata } from "next";

export const metadata: Metadata = { title: "Оферта" };

export default function OfferPage() {
  return (
    <article className="space-y-6 text-[15px] leading-relaxed text-ink/90">
      <div className="kicker mb-2">Публичная оферта</div>
      <h1 className="font-display text-display-3 text-ink">
        Оферта на оказание образовательных услуг
      </h1>
      <p className="text-[13px] text-muted">
        Последнее обновление — {new Date().getFullYear()} г.
      </p>
      <p className="rounded-md border border-dashed border-rule bg-card/60 p-4 text-[13px] text-muted">
        Текст оферты передаётся заказчиком (юридическое лицо ИВП) в финальной редакции
        и заменяет этот шаблон.
      </p>

      <h2 className="font-display text-xl text-ink pt-4">1. Общие положения</h2>
      <p>
        Настоящий документ представляет собой публичную оферту в соответствии со
        ст. 437 Гражданского кодекса РФ. Акцептом оферты является оплата услуг заказчиком.
      </p>

      <h2 className="font-display text-xl text-ink pt-4">2. Предмет договора</h2>
      <p>
        Исполнитель обязуется оказать заказчику образовательные услуги в объёме и порядке,
        предусмотренном программой обучения. Заказчик обязуется принять и оплатить услуги.
      </p>

      <h2 className="font-display text-xl text-ink pt-4">3. Стоимость и порядок оплаты</h2>
      <p>
        Стоимость услуг указывается на странице соответствующей программы. Оплата
        производится в порядке 100% предоплаты или через доступные варианты рассрочки.
      </p>

      <h2 className="font-display text-xl text-ink pt-4">4. Возврат средств</h2>
      <p>
        Заказчик имеет право отказаться от услуг в течение 7 календарных дней с момента
        старта программы с полным возвратом уплаченных средств.
      </p>

      <h2 className="font-display text-xl text-ink pt-4">5. Реквизиты исполнителя</h2>
      <p className="text-muted">[Заполняется заказчиком: наименование, ИНН, ОГРН, адрес, банк]</p>
    </article>
  );
}

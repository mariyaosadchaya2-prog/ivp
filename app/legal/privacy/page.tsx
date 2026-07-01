import type { Metadata } from "next";

export const metadata: Metadata = { title: "Политика обработки персональных данных" };

export default function PrivacyPage() {
  return (
    <article className="space-y-6 text-[15px] leading-relaxed text-ink/90">
      <div className="kicker mb-2">Политика ПД</div>
      <h1 className="font-display text-display-3 text-ink">
        Политика обработки персональных данных
      </h1>
      <p className="text-[13px] text-muted">
        Последнее обновление — {new Date().getFullYear()} г.
      </p>
      <p className="rounded-md border border-dashed border-rule bg-card/60 p-4 text-[13px] text-muted">
        Финальный текст политики оформляется по 152-ФЗ и передаётся заказчиком.
      </p>

      <h2 className="font-display text-xl text-ink pt-4">1. Оператор</h2>
      <p>
        Оператором персональных данных является [юридическое лицо ИВП]. Настоящая политика
        применяется ко всей информации, которую оператор может получить о пользователе
        в связи с использованием сайта ivp.example.
      </p>

      <h2 className="font-display text-xl text-ink pt-4">2. Какие данные обрабатываются</h2>
      <ul className="list-disc ml-5 space-y-1">
        <li>Имя (если указано в форме)</li>
        <li>Email и/или телефон</li>
        <li>Данные, оставленные в поле «сообщение» форм</li>
        <li>Технические данные: IP-адрес, cookie, user-agent</li>
      </ul>

      <h2 className="font-display text-xl text-ink pt-4">3. Цели обработки</h2>
      <ul className="list-disc ml-5 space-y-1">
        <li>Ответ на заявку пользователя</li>
        <li>Организация обучения</li>
        <li>Информирование о новых программах (при согласии на рассылку)</li>
      </ul>

      <h2 className="font-display text-xl text-ink pt-4">4. Права субъекта данных</h2>
      <p>
        Пользователь имеет право потребовать удаление своих персональных данных, направив
        письмо на адрес оператора. Оператор рассматривает такие запросы в срок не более 10 рабочих дней.
      </p>

      <h2 className="font-display text-xl text-ink pt-4">5. Cookie</h2>
      <p>
        Сайт использует cookie для базовой работы (запоминание согласия) и аналитики
        (Яндекс.Метрика, Google Analytics). Пользователь может отказаться от cookie в
        настройках браузера.
      </p>
    </article>
  );
}

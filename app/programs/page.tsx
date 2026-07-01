import type { Metadata } from "next";
import { Suspense } from "react";
import { ProgramsCatalog } from "./catalog";

export const metadata: Metadata = {
  title: "Каталог программ",
  description:
    "Программы повышения квалификации, мини-курсы, практикумы и открытые материалы Института вокальной психологии.",
};

export default function ProgramsPage() {
  return (
    <div className="container-tight py-14 md:py-20">
      <header className="max-w-3xl mb-10 md:mb-14">
        <div className="kicker mb-4">Каталог</div>
        <h1 className="text-display-2 font-display text-ink">
          Программы и практикумы института
        </h1>
        <p className="mt-5 text-lg text-muted leading-relaxed">
          Отфильтруйте по типу формата, ядру и траектории. Полные программы ПК ведутся
          на основании лицензии и завершаются удостоверением о повышении квалификации.
        </p>
      </header>
      <Suspense
        fallback={
          <div className="text-muted py-20 text-center">Загружаем каталог…</div>
        }
      >
        <ProgramsCatalog />
      </Suspense>
    </div>
  );
}

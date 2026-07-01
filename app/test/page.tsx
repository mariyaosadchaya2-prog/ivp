import type { Metadata } from "next";
import { TestFlow } from "./flow";

export const metadata: Metadata = {
  title: "Диагностический тест «Ваша траектория»",
  description:
    "15 вопросов о вашей практике — на выходе персональная рекомендация с чего начинать в вокальной психологии.",
};

export default function TestPage() {
  return (
    <div className="container-tight py-14 md:py-20">
      <header className="max-w-2xl mx-auto text-center mb-10 md:mb-14">
        <div className="kicker justify-center mb-4">Диагностика</div>
        <h1 className="text-display-2 font-display text-ink">
          Ваша траектория в вокальной психологии
        </h1>
        <p className="mt-5 text-lg text-muted leading-relaxed">
          15 вопросов о том, как вы устроены как специалист. На выходе — рекомендация,
          с какой программы стоит начать. Без «психологической» оптики: только про то,
          что вам близко в работе.
        </p>
      </header>
      <TestFlow />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ProgramCard } from "@/components/site/program-card";
import { programs } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Бесплатные материалы",
  description: "Открытые мастер-классы, разборы кейсов и диагностика — вход в методологию Института вокальной психологии.",
};

export default function FreePage() {
  const free = programs.filter((p) => p.type === "sampler");
  const ready = free.filter((p) => p.status === "ready");
  const coming = free.filter((p) => p.status !== "ready");

  return (
    <div className="container-tight py-14 md:py-20">
      <header className="max-w-2xl mb-10 md:mb-14">
        <div className="kicker mb-4">Бесплатно</div>
        <h1 className="text-display-2 font-display text-ink">
          Открытые мастер-классы и разборы
        </h1>
        <p className="mt-5 text-lg text-muted leading-relaxed">
          Разовые форматы, чтобы посмотреть, как устроен наш язык и подход. Без обязательств.
          Диагностический тест на 15 вопросов — быстрый способ понять, с чего начать.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/test">Пройти диагностический тест</Link>
          </Button>
        </div>
      </header>

      <Section className="py-8">
        <SectionHeader title="Доступно сейчас" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ready.map((p) => (
            <ProgramCard key={p.id} program={p} />
          ))}
        </div>
      </Section>

      {coming.length > 0 && (
        <Section className="py-8">
          <SectionHeader
            title="Скоро запустим"
            lead="Оставьте контакт на форме на главной — расскажем сразу, как только откроется запись."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coming.map((p) => (
              <ProgramCard key={p.id} program={p} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

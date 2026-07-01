import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ScrollText, Users2, Building2 } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "О нас",
  description:
    "Институт вокальной психологии: первый в России профильный институт вокальной психологии как самостоятельной прикладной дисциплины.",
};

const founders = [
  {
    name: "Мария Осадчая",
    role: "Основатель институту, ведущий методист",
    about:
      "Разработчик методологии вокальной психологии. Работает на стыке вокальной педагогики и психологии более 15 лет. Автор базовой программы «Основы вокальной психологии и психосоматики».",
    href: "/team/mariya-osadchaya",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-rule">
        <div className="container-tight py-14 md:py-24">
          <div className="max-w-3xl">
            <div className="kicker mb-4">Об институте</div>
            <h1 className="text-display-1 font-display text-ink">
              Первый в России профильный институт вокальной психологии
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted leading-relaxed">
              ИВП формулирует и передаёт вокальную психологию как самостоятельную
              прикладную дисциплину — не «психологию для педагогов вообще» и не «вокал
              для психологов», а специфическую пограничную компетенцию.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="container-tight">
          <SectionHeader
            kicker="Идея института"
            title="Работа с состоянием ученика в моменте голосового акта"
            lead="Там, где переплетаются телесное, эмоциональное, когнитивное и идентичностное. Именно на этом стыке классическая вокальная методика перестаёт работать — и туда мы приходим."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: ScrollText,
                title: "Дисциплинарная позиция",
                text:
                  "Мы описываем свою область на языке смежных дисциплин, но не сводим её ни к одной из них. Вокальная психология имеет собственные категории и рабочие протоколы.",
              },
              {
                icon: Users2,
                title: "Коллегиальность",
                text:
                  "Институт — не проект вокруг одной фигуры. У нас коллегиальная методическая работа, обмен супервизиями, распределённая ответственность.",
              },
              {
                icon: Building2,
                title: "Государственная лицензия",
                text:
                  "Образовательная деятельность ведётся на основании лицензии. Выпускники получают удостоверения о повышении квалификации государственного образца.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="p-6 md:p-7 rounded-lg border border-rule/60 bg-card/60"
              >
                <span className="grid h-10 w-10 place-items-center rounded-md bg-accent-soft text-accent">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl text-ink">{v.title}</h3>
                <p className="mt-2 text-[15px] text-muted leading-relaxed">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-card">
        <div className="container-tight">
          <SectionHeader
            kicker="Основатель"
            title="Кто ведёт институт"
          />
          <div className="grid md:grid-cols-[1fr,2fr] gap-8 md:gap-12 items-start">
            {founders.map((f) => (
              <div key={f.name} className="rounded-lg bg-page border border-rule p-6 md:p-7">
                <div className="aspect-[4/5] rounded-md bg-card border border-dashed border-rule mb-5 grid place-items-center">
                  {/* Плейсхолдер, пока фото Марии не загружено в public/team/ */}
                  <div className="text-center px-6">
                    <div className="grid h-16 w-16 mx-auto place-items-center rounded-full bg-accent-soft text-accent font-display text-xl">
                      МО
                    </div>
                    <div className="mt-3 text-[12px] text-muted uppercase tracking-[0.14em]">
                      Портрет
                    </div>
                  </div>
                </div>
                <Badge variant="default">Основатель методологии</Badge>
                <h3 className="mt-3 font-display text-2xl text-ink">{f.name}</h3>
                <div className="text-[13px] text-muted mt-1">{f.role}</div>
              </div>
            ))}
            <div>
              <p className="text-[17px] text-ink/90 leading-relaxed">
                Институт основан{" "}
                <Link href="/team/mariya-osadchaya" className="link-underline">
                  Марией Осадчей
                </Link>{" "}
                — методистом, автором подхода к работе со состоянием ученика на
                стыке вокальной педагогики и психологии.
              </p>
              <p className="mt-4 text-[16px] text-muted leading-relaxed">
                Мария выделяется как разработчик методологии; при этом брендинг института
                — коллегиальный. Мы намеренно строим школу так, чтобы знание сохранялось на
                уровне института, а не удерживалось одной фигурой.
              </p>
              <div className="mt-6">
                <Button asChild variant="secondary">
                  <Link href="/team/mariya-osadchaya">
                    Страница основателя
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-tight">
          <div className="rounded-lg border border-rule bg-card p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="kicker mb-4">Методология</div>
              <h2 className="text-display-3 font-display text-ink">
                Как устроен наш подход
              </h2>
              <p className="mt-4 text-[15px] text-muted leading-relaxed max-w-md">
                Отдельная страница «Методология» описывает наш подход к диагностике,
                уровни работы с состоянием ученика и границы дисциплины.
              </p>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/methodology">Открыть раздел «Методология»</Link>
                </Button>
              </div>
            </div>
            <ul className="space-y-4 text-[15px] text-ink/90">
              {[
                "Уровни работы с учеником: физиология → эмоция → когниция → идентичность",
                "Границы педагогики и терапии — где заканчивается один и начинается другой",
                "Профилактика выгорания как встроенная часть практики, а не «дополнение»",
              ].map((l) => (
                <li key={l} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}

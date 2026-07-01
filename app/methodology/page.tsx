import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Методология",
  description:
    "Подход Института вокальной психологии — как устроена работа с состоянием ученика на стыке телесного, эмоционального, когнитивного и идентичностного.",
};

export default function MethodologyPage() {
  return (
    <>
      <section className="border-b border-rule">
        <div className="container-tight py-14 md:py-24">
          <div className="max-w-3xl">
            <div className="kicker mb-4">Методология</div>
            <h1 className="text-display-1 font-display text-ink">
              Четыре уровня работы с состоянием ученика
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted leading-relaxed">
              Наш метод базируется на разделении работы с учеником на четыре уровня —
              и понимании, что «не идёт голос» в каждом из них означает разное.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="container-tight">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                n: "01",
                title: "Физиология",
                text:
                  "Тело как источник звука: дыхание, опора, положение гортани, состояние резонаторов. Уровень, где классическая вокальная педагогика чувствует себя уверенно.",
              },
              {
                n: "02",
                title: "Эмоция",
                text:
                  "Что чувствует ученик в моменте голосового акта — и что он с этим делает. Именно здесь чаще всего живут «зажим», «ступор», «слёзы вместо ноты».",
              },
              {
                n: "03",
                title: "Когниция",
                text:
                  "Что ученик думает о себе, о своём голосе, о ситуации. Установки, самоатрибуции, синдром самозванца, ожидания от урока.",
              },
              {
                n: "04",
                title: "Идентичность",
                text:
                  "Кто он «в голосе»: артист, ученик, работник, участник конкурса. Что он через голос заявляет — и что боится заявить.",
              },
            ].map((l) => (
              <div
                key={l.n}
                className="p-6 md:p-8 rounded-lg border border-rule/60 bg-card/60"
              >
                <div className="font-display text-[48px] leading-none text-accent/40">
                  {l.n}
                </div>
                <h3 className="mt-4 font-display text-2xl text-ink">{l.title}</h3>
                <p className="mt-2 text-[15px] text-muted leading-relaxed">
                  {l.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-card">
        <div className="container-tight">
          <SectionHeader
            kicker="Ответственность"
            title="Что мы делаем — и чего мы не делаем"
            lead="Мы явно отделяем свою рамку от других дисциплин, чтобы работа была профессионально корректной."
          />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-7 rounded-lg bg-page border border-rule">
              <h3 className="font-display text-xl text-ink">Мы делаем</h3>
              <ul className="mt-4 space-y-3 text-[15px] text-ink/90">
                {[
                  "Обучаем работать с состоянием ученика в моменте голосового акта",
                  "Даём инструменты диагностики и рабочие протоколы для педагога",
                  "Проводим супервизию и разбор реальных кейсов",
                ].map((li) => (
                  <li key={li} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-7 rounded-lg bg-page border border-rule">
              <h3 className="font-display text-xl text-ink">Мы не делаем</h3>
              <ul className="mt-4 space-y-3 text-[15px] text-muted">
                {[
                  "Не заменяем психотерапевтическую работу — и учим, когда направить дальше",
                  "Не даём «универсальных секретных методик» — есть только рабочие протоколы",
                  "Не гарантируем результатов за один урок — работа с состоянием требует времени",
                ].map((li) => (
                  <li key={li} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-bronze shrink-0" />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-tight text-center">
          <p className="text-muted max-w-xl mx-auto">
            Раздел «Методология» будет пополняться материалами по мере запуска новых
            программ и проведения открытых семинаров.
          </p>
          <div className="mt-6">
            <Button asChild variant="secondary">
              <Link href="/programs">Смотреть программы</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

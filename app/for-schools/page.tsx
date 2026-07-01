import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ClipboardCheck,
  LineChart,
  Users,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/site/lead-form";
import { AuditTool } from "./audit";

export const metadata: Metadata = {
  title: "Для руководителей школ",
  description:
    "Внедряем вокально-психологический подход в команде педагогов. Аудит готовности школы + программы корпоративного обучения.",
};

const value = [
  {
    icon: ClipboardCheck,
    title: "Аудит методической зрелости",
    text: "Самозаполняемая диагностика по 20 показателям — команда, методика, ученики, устойчивость школы.",
  },
  {
    icon: Users,
    title: "Групповое обучение команды",
    text: "Корпоративный формат с адаптацией под ваш профиль школы — от 5 до 30 педагогов, от 3 до 12 месяцев.",
  },
  {
    icon: LineChart,
    title: "Методическое сопровождение",
    text: "Внедрение стандартов работы с состоянием ученика на уровне протоколов, регламентов, оценок.",
  },
];

export default function ForSchoolsPage() {
  return (
    <>
      <section className="border-b border-rule">
        <div className="container-tight py-14 md:py-24">
          <div className="max-w-3xl">
            <div className="kicker mb-4">
              <Building2 className="h-3.5 w-3.5" />
              Для руководителей школ и студий
            </div>
            <h1 className="text-display-1 font-display text-ink">
              Строим вокально-психологическую работу на уровне команды
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted leading-relaxed">
              Для владельцев студий, методистов, руководителей коллективов, которые
              хотят перевести работу с состоянием ученика из интуиции отдельных
              педагогов в системный стандарт школы.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="#audit">
                  Пройти аудит готовности
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="#contact">Запрос на корпоративное обучение</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="container-tight">
          <SectionHeader
            kicker="Что мы делаем со школами"
            title="Три направления работы"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {value.map((v) => (
              <div
                key={v.title}
                className="p-6 md:p-7 rounded-lg border border-rule/60 bg-card/60"
              >
                <span className="grid h-10 w-10 place-items-center rounded-md bg-accent-soft text-accent">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl text-ink">
                  {v.title}
                </h3>
                <p className="mt-2 text-[15px] text-muted leading-relaxed">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="audit" className="bg-card">
        <div className="container-tight">
          <SectionHeader
            kicker="Аудит-инструмент"
            title="Карта готовности вашей школы к работе с состоянием ученика"
            lead="20 показателей, разделённых на 4 среза. Заполняете сами — получаете отчёт с приоритетами внедрения. Займёт 5–7 минут."
          />
          <AuditTool />
        </div>
      </Section>

      <Section id="contact" className="pb-24 md:pb-32">
        <div className="container-tight">
          <div className="grid lg:grid-cols-[1fr,1.1fr] gap-14 items-start">
            <div>
              <SectionHeader
                kicker="Запрос на консультацию"
                title="Подберём формат работы под вашу школу"
                lead="Расскажите про масштаб команды и главную задачу — предложим 2–3 варианта форматов и сориентируем по срокам и стоимости."
              />
            </div>
            <div className="rounded-lg border border-rule bg-card p-6 md:p-8">
              <LeadForm
                kind="school-audit"
                submitLabel="Отправить запрос"
                showMessage
                intro="Расскажите: сколько педагогов в команде, какой профиль школы, что сейчас не работает"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

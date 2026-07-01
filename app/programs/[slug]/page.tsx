import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BookOpenText,
  CalendarClock,
  GraduationCap,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AccordionRoot,
  AccordionItem,
} from "@/components/ui/accordion";
import { LeadForm } from "@/components/site/lead-form";
import {
  findProgram,
  programs,
  typeLabels,
  statusLabels,
  trackLabels,
} from "@/lib/programs";
import { getProgramContent } from "@/lib/program-content";

interface PageParams {
  params: { slug: string };
}

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageParams): Metadata {
  const p = findProgram(params.slug);
  if (!p) return { title: "Программа не найдена" };
  return {
    title: p.title,
    description: p.short,
  };
}

export default function ProgramPage({ params }: PageParams) {
  const program = findProgram(params.slug);
  if (!program) notFound();

  const content = getProgramContent(program.slug);

  return (
    <>
      {/* HERO */}
      <section className="border-b border-rule">
        <div className="container-tight pt-10 md:pt-14 pb-14 md:pb-20">
          <nav className="text-[13px] text-muted flex items-center gap-2 mb-8">
            <Link href="/" className="hover:text-accent">
              Главная
            </Link>
            <span>·</span>
            <Link href="/programs" className="hover:text-accent">
              Программы
            </Link>
          </nav>

          <div className="grid lg:grid-cols-[1.3fr,1fr] gap-14 items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <Badge variant="accent">{typeLabels[program.type]}</Badge>
                {program.code && (
                  <Badge variant="outline">{program.code}</Badge>
                )}
                {program.status !== "ready" && (
                  <Badge variant="planned">
                    {statusLabels[program.status]}
                  </Badge>
                )}
              </div>
              <h1 className="text-display-1 font-display text-ink">
                {program.title}
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
                {program.short}
              </p>
              {content?.intro && (
                <p className="mt-5 text-[16px] text-ink/80 leading-relaxed max-w-2xl">
                  {content.intro}
                </p>
              )}
            </div>

            <aside className="lg:sticky lg:top-24">
              <div className="rounded-lg border border-rule bg-card p-6 md:p-7">
                <dl className="space-y-4">
                  {program.hours && (
                    <FactRow icon={<CalendarClock className="h-4 w-4" />} label="Объём">
                      {program.hours} академических часов
                    </FactRow>
                  )}
                  {program.duration && (
                    <FactRow icon={<CalendarClock className="h-4 w-4" />} label="Длительность">
                      {program.duration}
                    </FactRow>
                  )}
                  {program.format && (
                    <FactRow icon={<BookOpenText className="h-4 w-4" />} label="Формат">
                      {program.format}
                    </FactRow>
                  )}
                  <FactRow icon={<ShieldCheck className="h-4 w-4" />} label="Документ">
                    Удостоверение о ПК государственного образца
                  </FactRow>
                  {program.price && (
                    <FactRow icon={<GraduationCap className="h-4 w-4" />} label="Стоимость">
                      {program.price} · рассрочка от банка
                    </FactRow>
                  )}
                </dl>
                <Button asChild size="lg" className="mt-6 w-full">
                  <Link href="#apply">Записаться</Link>
                </Button>
                <p className="mt-3 text-[12px] text-muted text-center">
                  Ответим в течение рабочего дня
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Кому подходит */}
      {content?.audiences && (
        <Section>
          <div className="container-tight">
            <div className="max-w-2xl mb-10">
              <div className="kicker mb-4">Кому подходит</div>
              <h2 className="text-display-3 font-display text-ink">
                Три входа в программу
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {content.audiences.map((a) => (
                <div
                  key={a.title}
                  className="p-6 md:p-7 rounded-lg border border-rule/60 bg-card/60"
                >
                  <Badge variant="muted">{a.tag}</Badge>
                  <h3 className="mt-4 font-display text-xl text-ink">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-[15px] text-muted leading-relaxed">
                    {a.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Что получите */}
      {content?.outcomes && (
        <Section className="bg-card">
          <div className="container-tight">
            <div className="grid lg:grid-cols-[1fr,1.2fr] gap-14 items-start">
              <div>
                <div className="kicker mb-4">Что вы получите</div>
                <h2 className="text-display-3 font-display text-ink">
                  Компетенции, а не набор лекций
                </h2>
                <p className="mt-5 text-[16px] text-muted leading-relaxed">
                  Мы формулируем результаты обучения как то, что вы сможете делать
                  завтра на своём уроке — а не как то, что мы вам расскажем.
                </p>
              </div>
              <ul className="space-y-4 text-[16px] text-ink/90">
                {content.outcomes.map((o) => (
                  <li
                    key={o}
                    className="flex items-start gap-4 pb-4 border-b border-rule/60 last:border-0"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    <span className="leading-relaxed">{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      )}

      {/* Учебный план */}
      {content?.modules && (
        <Section>
          <div className="container-tight">
            <div className="max-w-2xl mb-10">
              <div className="kicker mb-4">Учебный план</div>
              <h2 className="text-display-3 font-display text-ink">
                Модули программы
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {content.modules.map((m, i) => (
                <div
                  key={m.title}
                  className="p-6 md:p-7 rounded-lg bg-card border border-rule/60"
                >
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <div className="font-display text-[32px] leading-none text-accent/40">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    {m.hours && (
                      <div className="text-[12px] uppercase tracking-[0.14em] text-muted">
                        {m.hours} ч
                      </div>
                    )}
                  </div>
                  <h3 className="font-display text-lg text-ink">{m.title}</h3>
                  <p className="mt-2 text-[14px] text-muted leading-relaxed">
                    {m.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Преподаватели */}
      {content?.teachers && (
        <Section className="bg-card">
          <div className="container-tight">
            <div className="max-w-2xl mb-10">
              <div className="kicker mb-4">Преподаватели</div>
              <h2 className="text-display-3 font-display text-ink">
                Методисты института, ведущие программу
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {content.teachers.map((t) => (
                <div
                  key={t.name}
                  className="p-6 md:p-7 rounded-lg bg-page border border-rule/60"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-accent-soft text-accent font-display text-sm">
                      {initials(t.name)}
                    </div>
                    <div>
                      <div className="font-display text-[16px] text-ink">
                        {t.name}
                      </div>
                      <div className="text-[12px] text-muted">{t.role}</div>
                    </div>
                  </div>
                  <p className="mt-4 text-[14px] text-muted leading-relaxed">
                    {t.about}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Документ */}
      <Section>
        <div className="container-tight">
          <div className="rounded-lg border border-rule bg-card p-8 md:p-12 grid md:grid-cols-[1fr,1.4fr] gap-10 items-center">
            <div>
              <div className="kicker mb-4">Документ по окончании</div>
              <h2 className="text-display-3 font-display text-ink">
                Удостоверение о повышении квалификации
              </h2>
              <p className="mt-4 text-[15px] text-muted leading-relaxed max-w-md">
                Государственного образца, в соответствии с лицензией на образовательную
                деятельность. Выдаётся после защиты итоговой работы.
              </p>
              <ul className="mt-6 space-y-2.5 text-[14px] text-ink/80">
                {[
                  "Регистрируется в реестре",
                  "Даёт основание для работы в образовательных организациях",
                  "Отправляется физической почтой + скан в личный кабинет",
                ].map((l) => (
                  <li key={l} className="flex items-start gap-2.5">
                    <ShieldCheck className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-[4/3] rounded-md bg-page border border-dashed border-rule flex items-center justify-center">
              <div className="text-center px-6">
                <div className="text-[12px] uppercase tracking-[0.14em] text-muted">
                  Образец удостоверения
                </div>
                <div className="mt-3 font-display text-lg text-muted/80">
                  Скан будет размещён после первого выпуска
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      {content?.faq && (
        <Section className="bg-card">
          <div className="container-prose">
            <div className="mb-10">
              <div className="kicker mb-4">Частые вопросы</div>
              <h2 className="text-display-3 font-display text-ink">
                Что важно понимать до записи
              </h2>
            </div>
            <AccordionRoot type="single" collapsible className="bg-page rounded-lg border border-rule px-6">
              {content.faq.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`item-${i}`}
                  title={f.q}
                >
                  {f.a}
                </AccordionItem>
              ))}
            </AccordionRoot>
          </div>
        </Section>
      )}

      {/* Отзывы */}
      {content?.reviews && (
        <Section>
          <div className="container-tight">
            <div className="max-w-2xl mb-10">
              <div className="kicker mb-4">Отзывы выпускников</div>
              <h2 className="text-display-3 font-display text-ink">
                Что говорят о программе
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {content.reviews.map((r) => (
                <figure
                  key={r.name}
                  className="p-7 md:p-8 rounded-lg bg-card border border-rule"
                >
                  <blockquote className="font-display text-[19px] leading-relaxed text-ink">
                    «{r.quote}»
                  </blockquote>
                  <figcaption className="mt-5 text-[13px] text-muted">
                    <div className="text-ink">{r.name}</div>
                    <div>{r.role}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Форма записи */}
      <Section id="apply" className="pb-24 md:pb-32">
        <div className="container-tight">
          <div className="grid lg:grid-cols-[1fr,1.1fr] gap-14 items-start">
            <div>
              <div className="kicker mb-4">Запись на программу</div>
              <h2 className="text-display-3 font-display text-ink">
                Оставьте контакт — свяжемся и всё расскажем
              </h2>
              <p className="mt-4 text-[15px] text-muted leading-relaxed max-w-md">
                Мы не звоним для «прогрева» — только чтобы ответить на ваши вопросы,
                уточнить формат оплаты и рассрочку и подтвердить дату старта.
              </p>
              <div className="mt-8 space-y-3">
                <FactRow
                  icon={<Users className="h-4 w-4" />}
                  label="Ближайший поток"
                >
                  Формируется — оставьте контакт, чтобы забронировать место
                </FactRow>
                <FactRow
                  icon={<ShieldCheck className="h-4 w-4" />}
                  label="Гарантия возврата"
                >
                  7 дней с момента старта, без вопросов
                </FactRow>
              </div>
            </div>
            <div className="rounded-lg border border-rule bg-card p-6 md:p-8">
              <LeadForm
                kind="program-apply"
                submitLabel="Записаться на программу"
                hiddenFields={{ program: program.title, slug: program.slug }}
                showMessage
                intro={`Программа: ${program.title}`}
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function FactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-8 w-8 place-items-center rounded-md bg-page text-accent border border-rule shrink-0 mt-0.5">
        {icon}
      </span>
      <div>
        <dt className="text-[11px] uppercase tracking-[0.14em] text-muted">
          {label}
        </dt>
        <dd className="mt-0.5 text-[14px] text-ink">{children}</dd>
      </div>
    </div>
  );
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

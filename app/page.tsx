import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  HeartHandshake,
  Mic2,
  Sparkles,
  Users,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgramCard } from "@/components/site/program-card";
import { LeadForm } from "@/components/site/lead-form";
import { programs, findProgram } from "@/lib/programs";

const tracks = [
  {
    id: "vocalist",
    icon: Mic2,
    title: "Педагог по вокалу",
    text:
      "Вы работаете с учеником, у которого голос не идёт по невокальным причинам — зажим, страх, потеря мотивации, ролевой конфликт. Получаете инструменты, которых нет в классической методике.",
    entry: "/programs/osnovy-vokalnoy-psihologii",
  },
  {
    id: "psychologist",
    icon: HeartHandshake,
    title: "Психолог",
    text:
      "Вы заходите в вокальную специализацию — нишу с высокой востребованностью, где ваш профильный опыт получает конкретную рабочую рамку и клиентский поток.",
    entry: "/programs/osnovy-vokalnoy-psihologii",
  },
  {
    id: "artist",
    icon: Sparkles,
    title: "Артист-педагог",
    text:
      "Вы переводите свой сценический опыт в педагогическую методологию — так, чтобы её можно было передавать другим, а не только показывать собой.",
    entry: "/programs/osnovy-vokalnoy-psihologii",
  },
];

const promises = [
  {
    icon: GraduationCap,
    title: "Профессиональная идентичность",
    text:
      "Не «психология для педагогов вообще» и не «вокал для психологов», а специфическая пограничная компетенция — работа с состоянием ученика в моменте голосового акта.",
  },
  {
    icon: HeartHandshake,
    title: "Лицензированные удостоверения",
    text:
      "Институт ведёт образовательную деятельность на основании лицензии и выдаёт удостоверения о повышении квалификации государственного образца.",
  },
  {
    icon: Users,
    title: "Институциональная школа",
    text:
      "Коллектив методистов и преподавателей, а не проект вокруг одной фигуры. Знания сохраняются и передаются на уровне института.",
  },
];

const ladder = [
  {
    step: "01",
    title: "Бесплатно попробовать",
    text: "Мастер-класс, диагностический тест или подкаст — чтобы понять, ваш ли это язык.",
    cta: { href: "/free", label: "Открыть бесплатные материалы" },
  },
  {
    step: "02",
    title: "Мини-курс или практикум",
    text: "Короткий формат под конкретную задачу — 10–20 часов, с обратной связью.",
    cta: { href: "/programs?type=course", label: "Смотреть мини-курсы" },
  },
  {
    step: "03",
    title: "Полная программа ПК",
    text: "От 48 до 72 часов, с лицензированным удостоверением о повышении квалификации.",
    cta: { href: "/programs?type=program", label: "Смотреть программы" },
  },
];

export default function HomePage() {
  const flagship = findProgram("osnovy-vokalnoy-psihologii");
  const samplers = programs.filter(
    (p) => p.type === "sampler" && p.status === "ready"
  );
  const featured = programs.filter((p) => p.featured);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(60% 55% at 78% 18%, #EDE4F0 0%, transparent 60%), radial-gradient(50% 45% at 8% 90%, #F1E7D8 0%, transparent 55%)",
          }}
        />
        <div className="container-tight pt-16 md:pt-24 pb-20 md:pb-28">
          <div className="grid lg:grid-cols-[1.15fr,1fr] gap-14 items-start">
            <div className="max-w-2xl animate-fade-up">
              <div className="kicker mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-bronze" />
                Институт вокальной психологии — первый в России профильный
              </div>
              <h1 className="text-display-1 font-display text-ink">
                Профессиональное образование в вокальной&nbsp;психологии
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-xl">
                Мы обучаем работать с голосом ученика тогда, когда техника не помогает.
                Для педагогов по вокалу, психологов и артистов-педагогов.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/test">
                    Пройти тест «Ваша траектория»
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/programs">Смотреть программы</Link>
                </Button>
              </div>
              <dl className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-muted">
                    Продуктов
                  </dt>
                  <dd className="mt-1 font-display text-2xl text-ink">30+</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-muted">
                    Лицензия
                  </dt>
                  <dd className="mt-1 font-display text-2xl text-ink">Гос. образец</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-muted">
                    Формат
                  </dt>
                  <dd className="mt-1 font-display text-2xl text-ink">Онлайн</dd>
                </div>
              </dl>
            </div>

            {/* Boxed side card: three tracks */}
            <div className="lg:pt-6 animate-fade-up [animation-delay:100ms]">
              <div className="rounded-lg border border-rule bg-card p-6 md:p-7">
                <div className="kicker mb-4">Три входа в институт</div>
                <p className="font-display text-[19px] text-ink leading-snug mb-5">
                  Не знаете, с чего начать — начните с траектории.
                </p>
                <ul className="space-y-3.5">
                  {tracks.map((t) => (
                    <li key={t.id}>
                      <Link
                        href={t.entry}
                        className="group flex items-start gap-3 rounded-md p-2 -m-2 hover:bg-accent-soft/50 transition-colors"
                      >
                        <span className="grid h-9 w-9 place-items-center rounded-md bg-page text-accent border border-rule shrink-0">
                          <t.icon className="h-4 w-4" />
                        </span>
                        <div>
                          <div className="text-[15px] font-medium text-ink group-hover:text-accent flex items-center gap-1.5">
                            {t.title}
                            <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </div>
                          <div className="text-[13px] text-muted leading-relaxed mt-0.5">
                            Программы под этот вход
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/test"
                  className="mt-6 inline-flex items-center gap-1.5 text-[14px] text-accent font-medium"
                >
                  Пройти диагностику за 3 минуты
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Что даёт ИВП */}
      <Section>
        <div className="container-tight">
          <SectionHeader
            kicker="Что даёт институт"
            title="Специализация, которую невозможно собрать самостоятельно"
            lead="Работа с состоянием ученика в моменте голосового акта — там, где переплетаются телесное, эмоциональное, когнитивное и идентичностное."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {promises.map((p) => (
              <div
                key={p.title}
                className="p-6 md:p-7 rounded-lg border border-rule/60 bg-card/60"
              >
                <span className="grid h-10 w-10 place-items-center rounded-md bg-accent-soft text-accent">
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl text-ink">{p.title}</h3>
                <p className="mt-2 text-[15px] text-muted leading-relaxed">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Три траектории — подробно */}
      <Section className="bg-card">
        <div className="container-tight">
          <SectionHeader
            kicker="Кому ИВП"
            title="Три траектории — три языка описания"
            lead="У каждой траектории свой набор входных программ и своя логика движения."
          />
          <div className="grid lg:grid-cols-3 gap-6">
            {tracks.map((t, i) => (
              <Card key={t.id} className="bg-page flex flex-col">
                <div className="p-6 md:p-7 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-md bg-accent text-white">
                      <t.icon className="h-5 w-5" />
                    </span>
                    <Badge variant="muted">Траектория {i + 1}</Badge>
                  </div>
                  <h3 className="mt-5 font-display text-2xl text-ink leading-tight">
                    {t.title}
                  </h3>
                  <p className="mt-3 text-[15px] text-muted leading-relaxed">
                    {t.text}
                  </p>
                  <Link
                    href={t.entry}
                    className="mt-6 inline-flex items-center gap-1.5 text-[14px] text-accent font-medium hover:text-accent-hover"
                  >
                    Рекомендованная программа для входа
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Лестница трёх уровней */}
      <Section>
        <div className="container-tight">
          <SectionHeader
            kicker="Как устроено обучение"
            title="Три уровня — от пробы до профессиональной ступени"
            lead="Вы двигаетесь по институтской лестнице в своём темпе. Каждый уровень — законченный формат, а не «часть» большего."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {ladder.map((s) => (
              <div
                key={s.step}
                className="relative p-6 md:p-7 rounded-lg border border-rule/60 bg-card/60"
              >
                <div className="font-display text-[44px] leading-none text-accent/40">
                  {s.step}
                </div>
                <h3 className="mt-4 font-display text-xl text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] text-muted leading-relaxed">
                  {s.text}
                </p>
                <Link
                  href={s.cta.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-[14px] text-accent font-medium"
                >
                  {s.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Флагман — ПК №3 */}
      {flagship && (
        <Section className="bg-card">
          <div className="container-tight">
            <SectionHeader
              kicker="Флагманская программа"
              title="Базовая ступень входа в специальность"
              lead="Лицензированная программа повышения квалификации на 72 часа. С неё начинают выпускники всех трёх траекторий."
            />
            <div className="grid lg:grid-cols-[1.2fr,1fr] gap-6 items-stretch">
              <ProgramCard program={flagship} variant="featured" />
              <div className="rounded-lg bg-page border border-rule p-7 md:p-8">
                <h3 className="font-display text-xl text-ink">
                  Что вы получите
                </h3>
                <ul className="mt-5 space-y-3.5 text-[15px] text-ink/90">
                  {[
                    "Компетенцию работать с учеником, когда голос не идёт по невокальным причинам",
                    "Инструменты диагностики состояния ученика в моменте голосового акта",
                    "Практику работы под супервизией методистов института",
                    "Удостоверение о повышении квалификации государственного образца",
                  ].map((li) => (
                    <li key={li} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex gap-3">
                  <Button asChild>
                    <Link href={`/programs/${flagship.slug}`}>
                      Программа подробно
                    </Link>
                  </Button>
                  <Button asChild variant="secondary">
                    <Link href="#apply">Записаться</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* Бесплатные материалы */}
      <Section>
        <div className="container-tight">
          <SectionHeader
            kicker="Бесплатно"
            title="Открытые мастер-классы и разборы"
            lead="Разовые форматы, чтобы посмотреть, как устроен наш язык и подход. Без обязательств."
          />
          <div className="grid md:grid-cols-2 gap-6">
            {samplers.slice(0, 4).map((s) => (
              <ProgramCard key={s.id} program={s} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button asChild variant="secondary">
              <Link href="/free">Все бесплатные материалы</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Отзывы — плейсхолдер */}
      <Section className="bg-card">
        <div className="container-tight">
          <SectionHeader
            kicker="Отзывы выпускников"
            title="Так меняется практика после обучения"
            lead="Мы публикуем реальные отзывы выпускников с описанием конкретных изменений в работе. Раздел откроется одновременно с первым набором."
          />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: "Педагог по вокалу, 12 лет практики",
                city: "Санкт-Петербург",
                quote:
                  "После курса я перестала «уговаривать» ученика петь. Появился словарь для того, что раньше делалось интуицией — и результат стал воспроизводимым.",
              },
              {
                name: "Психолог-консультант",
                city: "Москва",
                quote:
                  "Программа дала конкретную рамку: с чем работаю я, где заканчивается моя ответственность, куда направляю. Без этого зайти в вокальную нишу было невозможно.",
              },
            ].map((r) => (
              <figure
                key={r.name}
                className="p-7 md:p-8 rounded-lg bg-page border border-rule"
              >
                <blockquote className="font-display text-[19px] leading-relaxed text-ink">
                  «{r.quote}»
                </blockquote>
                <figcaption className="mt-5 text-[13px] text-muted">
                  <div className="text-ink">{r.name}</div>
                  <div>{r.city}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      {/* Для руководителей — тизер */}
      <Section>
        <div className="container-tight">
          <div className="rounded-lg border border-rule bg-card p-8 md:p-12 grid md:grid-cols-[1.2fr,1fr] gap-10 items-center">
            <div>
              <div className="kicker mb-4">Для школ и студий</div>
              <h2 className="text-display-3 font-display text-ink">
                Внедряем вокально-психологический подход в команде педагогов
              </h2>
              <p className="mt-4 text-[15px] text-muted leading-relaxed max-w-lg">
                Проведите аудит готовности вашей школы — получите отчёт с приоритетами
                и рекомендациями. Инструмент разработан для директоров студий,
                методистов и руководителей коллективов.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/for-schools">Раздел для руководителей</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/for-schools#audit">Пройти аудит</Link>
                </Button>
              </div>
            </div>
            <ul className="space-y-4 text-[15px] text-ink/90">
              {[
                "Диагностика зрелости методической базы школы",
                "Приоритеты внедрения по слоям: педагог → команда → система",
                "Форматы корпоративного обучения от 3 до 12 месяцев",
              ].map((li) => (
                <li key={li} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-bronze shrink-0" />
                  <span>{li}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Форма заявки */}
      <Section id="apply" className="pb-24 md:pb-32">
        <div className="container-tight">
          <div className="grid lg:grid-cols-[1fr,1.1fr] gap-14 items-start">
            <div>
              <SectionHeader
                kicker="Оставить заявку"
                title="Расскажем о программах и подберём вход"
                lead={
                  <>
                    Ответим в течение рабочего дня. Никаких автозвонков и рассылок — только
                    ответ на ваш запрос.
                  </>
                }
              />
              <div className="mt-4 text-[14px] text-muted">
                Или напишите нам напрямую: <a href="mailto:hello@ivp.example" className="link-underline">hello@ivp.example</a>
              </div>
            </div>
            <div className="rounded-lg border border-rule bg-card p-6 md:p-8">
              <LeadForm
                kind="contact"
                showMessage
                submitLabel="Отправить заявку"
                intro="Заполните любые удобные поля — Email или телефон достаточно."
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

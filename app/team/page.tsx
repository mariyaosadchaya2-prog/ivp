import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Преподаватели",
  description: "Методисты, супервизоры и приглашённые эксперты Института вокальной психологии.",
};

const team = [
  {
    slug: "mariya-osadchaya",
    name: "Мария Осадчая",
    role: "Основатель · ведущий методист",
    about:
      "Автор методологии. Ведёт базовую программу и супервизии выпускников.",
    tags: ["Методология", "Супервизия"],
  },
];

const upcoming = [
  {
    name: "Куратор потока",
    role: "Ведущий супервизии",
    about: "Индивидуальные разборы кейсов и групповая супервизия.",
  },
  {
    name: "Приглашённые эксперты",
    role: "Спец-модули",
    about: "Фониатры, соматические практики, психотерапевты — для узких тем внутри модулей.",
  },
];

export default function TeamPage() {
  return (
    <>
      <section className="border-b border-rule">
        <div className="container-tight py-14 md:py-20">
          <div className="max-w-3xl">
            <div className="kicker mb-4">Преподаватели</div>
            <h1 className="text-display-1 font-display text-ink">
              Команда института
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              Методисты, супервизоры и приглашённые эксперты, ведущие программы.
              По мере запуска новых потоков раздел будет расширяться.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="container-tight">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((t) => (
              <Link
                key={t.slug}
                href={`/team/${t.slug}`}
                className="rounded-lg border border-rule bg-card hover:bg-page transition-colors p-6"
              >
                <div className="grid h-14 w-14 place-items-center rounded-full bg-accent text-white font-display">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
                <h3 className="mt-5 font-display text-lg text-ink">{t.name}</h3>
                <div className="text-[13px] text-muted mt-1">{t.role}</div>
                <p className="mt-3 text-[14px] text-muted leading-relaxed">
                  {t.about}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {t.tags.map((tag) => (
                    <Badge key={tag} variant="muted">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-14">
            <h2 className="font-display text-display-3 text-ink">
              Ещё в команде
            </h2>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              {upcoming.map((t) => (
                <div
                  key={t.name}
                  className="p-6 rounded-lg border border-dashed border-rule bg-card/40"
                >
                  <h3 className="font-display text-lg text-ink">{t.name}</h3>
                  <div className="text-[13px] text-muted mt-1">{t.role}</div>
                  <p className="mt-3 text-[14px] text-muted leading-relaxed">
                    {t.about}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

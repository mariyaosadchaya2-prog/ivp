import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Мария Осадчая",
  description:
    "Основатель Института вокальной психологии, автор методологии и ведущий методист базовой программы.",
};

export default function MariyaPage() {
  return (
    <>
      <section className="border-b border-rule">
        <div className="container-tight py-14 md:py-20">
          <nav className="text-[13px] text-muted flex items-center gap-2 mb-6">
            <Link href="/about" className="hover:text-accent inline-flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              О нас
            </Link>
          </nav>
          <div className="grid md:grid-cols-[1fr,1.6fr] gap-10 items-start">
            <div>
              <div className="aspect-[4/5] rounded-lg border border-dashed border-rule bg-card grid place-items-center">
                {/* Заменить на <Image src="/team/mariya.jpg" ... /> после загрузки фото */}
                <div className="text-center px-6">
                  <div className="grid h-24 w-24 mx-auto place-items-center rounded-full bg-accent-soft text-accent font-display text-3xl">
                    МО
                  </div>
                  <div className="mt-4 text-[12px] text-muted uppercase tracking-[0.14em]">
                    Портрет
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Badge variant="default">Основатель · ведущий методист</Badge>
              <h1 className="mt-4 text-display-2 font-display text-ink">
                Мария Осадчая
              </h1>
              <p className="mt-4 text-lg text-muted leading-relaxed">
                Разработчик методологии вокальной психологии. Работает на стыке вокальной
                педагогики и психологии, ведёт базовую программу института и супервизии.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-4 max-w-md">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-muted">
                    Практика
                  </dt>
                  <dd className="mt-1 font-display text-xl text-ink">15+ лет</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-muted">
                    Роль в институте
                  </dt>
                  <dd className="mt-1 font-display text-xl text-ink">Основатель</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="container-prose">
          <h2 className="font-display text-display-3 text-ink">
            О чём эта работа
          </h2>
          <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-ink/90">
            <p>
              Мария разрабатывает вокальную психологию как отдельную прикладную дисциплину
              — не «психологию для педагогов вообще» и не «вокал для психологов», а
              специфическую пограничную компетенцию: работу с состоянием ученика в моменте
              голосового акта.
            </p>
            <p>
              За годы практики Мария сформулировала базовую четырёхуровневую модель
              (физиология → эмоция → когниция → идентичность), на которой строится вся
              методология института, и разработала методические инструменты для педагогов,
              желающих освоить эту работу.
            </p>
            <p>
              Институциональный шаг — от индивидуальной практики к передаче знания — стал
              для Марии осознанным выбором: сделать методологию воспроизводимой, независимой
              от одной фигуры, и передать её сообществу профессионалов.
            </p>
          </div>

          <div className="mt-10 rounded-lg bg-card border border-rule p-7">
            <h3 className="font-display text-xl text-ink">Ведёт программы</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/programs/osnovy-vokalnoy-psihologii"
                  className="link-underline"
                >
                  «Основы вокальной психологии и психосоматики» (ПК №3)
                </Link>
                <span className="text-muted"> — базовая программа для входа в специальность</span>
              </li>
              <li>
                <Link
                  href="/programs?core=pro"
                  className="link-underline"
                >
                  Супервизионные группы для выпускников
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <Button asChild>
              <Link href="/programs">Смотреть все программы института</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

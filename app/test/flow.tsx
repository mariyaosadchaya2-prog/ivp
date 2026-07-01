"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LeadForm } from "@/components/site/lead-form";
import {
  questions,
  scoreAnswers,
  trackProfiles,
  type Track,
} from "@/lib/test-questions";
import { cn } from "@/lib/utils";

type Phase = "intro" | "quiz" | "result";

export function TestFlow() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<Record<number, string>>({});

  const q = questions[step];
  const answered = q ? !!picked[q.id] : false;
  const isLast = step === questions.length - 1;

  const result = useMemo(() => {
    if (phase !== "result") return null;
    return scoreAnswers(picked);
  }, [phase, picked]);

  const restart = () => {
    setPicked({});
    setStep(0);
    setPhase("intro");
  };

  if (phase === "intro") {
    return (
      <div className="max-w-2xl mx-auto rounded-lg border border-rule bg-card p-8 md:p-10 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-md bg-accent-soft text-accent">
          <Sparkles className="h-5 w-5" />
        </div>
        <h2 className="mt-5 font-display text-2xl text-ink">
          Займёт около 3 минут
        </h2>
        <p className="mt-3 text-[15px] text-muted leading-relaxed">
          Ответьте на 15 вопросов. Вопросы — не про «какой вы правильный», а про
          то, как вы работаете. Разных верных ответов нет. Ваши ответы никуда не
          отправляются — расчёт делается в браузере.
        </p>
        <Button size="lg" className="mt-8" onClick={() => setPhase("quiz")}>
          Начать
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  if (phase === "quiz" && q) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between text-[13px] text-muted mb-3">
            <span>
              Вопрос {step + 1} из {questions.length}
            </span>
            <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
          </div>
          <Progress value={step + 1} max={questions.length} />
        </div>

        <div className="rounded-lg border border-rule bg-card p-6 md:p-9">
          <h2 className="font-display text-xl md:text-2xl text-ink leading-snug">
            {q.question}
          </h2>
          <div className="mt-6 space-y-3">
            {q.options.map((o) => {
              const selected = picked[q.id] === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() =>
                    setPicked((s) => ({ ...s, [q.id]: o.id }))
                  }
                  className={cn(
                    "w-full text-left rounded-md border p-4 md:p-5 transition-colors",
                    "text-[15px] leading-relaxed",
                    selected
                      ? "border-accent bg-accent-soft/60 text-ink"
                      : "border-rule bg-page hover:border-accent/60 hover:bg-accent-soft/30 text-ink/90"
                  )}
                >
                  <span className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-1 h-4 w-4 rounded-full border-2 shrink-0 transition-colors",
                        selected
                          ? "border-accent bg-accent"
                          : "border-rule"
                      )}
                    />
                    <span>{o.text}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              <ArrowLeft className="h-4 w-4" />
              Назад
            </Button>
            <Button
              disabled={!answered}
              onClick={() => {
                if (isLast) setPhase("result");
                else setStep((s) => s + 1);
              }}
            >
              {isLast ? "Показать результат" : "Дальше"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (result) {
    const profile = trackProfiles[result.primary];
    return (
      <div className="max-w-3xl mx-auto">
        <div className="rounded-lg border border-accent/40 bg-page shadow-card p-7 md:p-10 animate-fade-up">
          <div className="kicker mb-4">Ваш результат</div>
          <h2 className="font-display text-display-3 text-ink">
            {profile.title}
          </h2>
          <p className="mt-2 text-lg text-muted">{profile.headline}</p>
          {result.mixed && (
            <div className="mt-5 rounded-md border border-bronze/40 bg-bronze/10 px-4 py-3 text-[13px] text-ink/80">
              У вас смешанный вход — вторая шкала близко. Это нормально: многие
              выпускники приходят к нам между двух траекторий. Мы расскажем, как
              с этим работать.
            </div>
          )}
          <p className="mt-6 text-[16px] text-ink/80 leading-relaxed">
            {profile.intro}
          </p>

          <ul className="mt-6 space-y-3.5 text-[15px] text-ink/90">
            {profile.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={`/programs/${profile.recommendedSlug}`}>
                Программа: {profile.recommendedTitle}
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href={`/programs/${profile.freeSlug}`}>
                {profile.freeTitle}
              </Link>
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {(Object.keys(result.scores) as Track[]).map((t) => (
              <div
                key={t}
                className={cn(
                  "rounded-md border p-3 text-center",
                  t === result.primary
                    ? "border-accent bg-accent-soft/50"
                    : "border-rule bg-card/60"
                )}
              >
                <div className="text-[11px] uppercase tracking-[0.14em] text-muted">
                  {trackProfiles[t].title}
                </div>
                <div className="mt-1 font-display text-xl text-ink">
                  {result.scores[t]}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-rule bg-card p-6 md:p-8">
          <h3 className="font-display text-xl text-ink">
            Прислать расширенный разбор траектории на почту?
          </h3>
          <p className="mt-2 text-[14px] text-muted">
            Выберем 3 программы под ваш результат и добавим приглашение на ближайший
            открытый мастер-класс.
          </p>
          <div className="mt-5">
            <LeadForm
              kind="test-result"
              submitLabel="Прислать разбор"
              hiddenFields={{
                track: profile.title,
                scoreV: String(result.scores.V),
                scoreP: String(result.scores.P),
                scoreA: String(result.scores.A),
              }}
              showName={false}
              showPhone={false}
              intro={`Ваша траектория: ${profile.title}`}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="ghost" onClick={restart}>
            <RotateCcw className="h-4 w-4" />
            Пройти ещё раз
          </Button>
        </div>
      </div>
    );
  }

  return null;
}

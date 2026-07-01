"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  auditQuestions,
  dimensionLabels,
  answerLabels,
  scoreAudit,
  levelCopy,
  type Answer,
  type Dimension,
} from "@/lib/audit-questions";
import { cn } from "@/lib/utils";
import { LeadForm } from "@/components/site/lead-form";

type Phase = "intro" | "quiz" | "result";

export function AuditTool() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [step, setStep] = useState(0);

  const q = auditQuestions[step];
  const answered = q ? answers[q.id] !== undefined : false;
  const isLast = step === auditQuestions.length - 1;

  const result = useMemo(() => {
    if (phase !== "result") return null;
    return scoreAudit(answers);
  }, [phase, answers]);

  const restart = () => {
    setAnswers({});
    setStep(0);
    setPhase("intro");
  };

  if (phase === "intro") {
    return (
      <div className="max-w-2xl mx-auto rounded-lg border border-rule bg-page p-8 md:p-10 text-center">
        <h3 className="font-display text-2xl text-ink">
          Аудит из 20 показателей
        </h3>
        <p className="mt-3 text-[15px] text-muted leading-relaxed">
          Оцените текущее состояние по 4 срезам: команда, методика, ученики,
          устойчивость. Отчёт — сразу на экране. Данные никуда не отправляются, если
          вы сами не оставите почту для сохранения результата.
        </p>
        <Button size="lg" className="mt-8" onClick={() => setPhase("quiz")}>
          Начать аудит
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
              Пункт {step + 1} из {auditQuestions.length} · срез:{" "}
              {dimensionLabels[q.dimension]}
            </span>
            <span>{Math.round(((step + 1) / auditQuestions.length) * 100)}%</span>
          </div>
          <Progress value={step + 1} max={auditQuestions.length} />
        </div>

        <div className="rounded-lg border border-rule bg-page p-6 md:p-9">
          <h3 className="font-display text-lg md:text-xl text-ink leading-snug">
            {q.text}
          </h3>
          <div className="mt-6 grid gap-3">
            {([0, 1, 2, 3] as Answer[]).map((a) => {
              const selected = answers[q.id] === a;
              return (
                <button
                  key={a}
                  type="button"
                  onClick={() =>
                    setAnswers((s) => ({ ...s, [q.id]: a }))
                  }
                  className={cn(
                    "text-left rounded-md border p-3.5 transition-colors text-[14px]",
                    selected
                      ? "border-accent bg-accent-soft/60 text-ink"
                      : "border-rule bg-card/60 hover:border-accent/60 text-ink/90"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        "h-4 w-4 rounded-full border-2 shrink-0",
                        selected ? "border-accent bg-accent" : "border-rule"
                      )}
                    />
                    <span>{answerLabels[a]}</span>
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
              Назад
            </Button>
            <Button
              disabled={!answered}
              onClick={() =>
                isLast ? setPhase("result") : setStep((s) => s + 1)
              }
            >
              {isLast ? "Показать отчёт" : "Дальше"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (result) {
    const overall = Math.round((result.total / result.maxTotal) * 100);
    return (
      <div className="max-w-3xl mx-auto animate-fade-up">
        <div className="rounded-lg border border-rule bg-page p-7 md:p-10">
          <div className="kicker mb-4">Отчёт по аудиту</div>
          <h3 className="font-display text-display-3 text-ink">
            {levelCopy[result.level].title}
          </h3>
          <p className="mt-4 text-[16px] text-muted leading-relaxed">
            {levelCopy[result.level].text}
          </p>

          <div className="mt-8">
            <div className="flex justify-between text-[13px] text-muted mb-2">
              <span>Общий уровень готовности</span>
              <span className="text-ink font-medium">{overall}%</span>
            </div>
            <Progress value={overall} className="h-2.5" />
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {(Object.entries(result.scores) as [Dimension, number][]).map(
              ([dim, s]) => {
                const pct = Math.round((s / result.maxByDim) * 100);
                return (
                  <div
                    key={dim}
                    className="rounded-md border border-rule bg-card p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-[13px] text-muted">
                        {dimensionLabels[dim]}
                      </div>
                      <div className="text-[13px] font-medium text-ink">
                        {pct}%
                      </div>
                    </div>
                    <Progress value={pct} />
                  </div>
                );
              }
            )}
          </div>

          <div className="mt-10">
            <h4 className="font-display text-lg text-ink">
              Приоритеты внедрения
            </h4>
            <ol className="mt-4 space-y-3 text-[15px] text-ink/90">
              {result.priorities.slice(0, 3).map((p, i) => (
                <li
                  key={p.dim}
                  className="flex items-start gap-4 pb-3 border-b border-rule/60 last:border-0"
                >
                  <span className="font-display text-xl text-accent w-6 shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <div className="font-medium text-ink">
                      {dimensionLabels[p.dim]}
                    </div>
                    <div className="mt-1 text-[13px] text-muted">
                      Текущий уровень: {p.percent}% · рекомендуем начать отсюда
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-rule bg-card p-7 md:p-8">
          <h4 className="font-display text-xl text-ink">
            Прислать расширенный отчёт с рекомендациями?
          </h4>
          <p className="mt-2 text-[14px] text-muted">
            Составим карту внедрения под ваш профиль школы, предложим форматы
            корпоративного обучения.
          </p>
          <div className="mt-5">
            <LeadForm
              kind="school-audit"
              submitLabel="Прислать отчёт"
              hiddenFields={{
                overall: `${overall}%`,
                team: `${result.scores.team}/${result.maxByDim}`,
                method: `${result.scores.method}/${result.maxByDim}`,
                students: `${result.scores.students}/${result.maxByDim}`,
                resilience: `${result.scores.resilience}/${result.maxByDim}`,
              }}
              showMessage={false}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
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

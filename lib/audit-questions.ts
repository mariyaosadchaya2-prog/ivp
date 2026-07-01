// Аудит «Карта готовности вашей школы к работе с состоянием ученика».
// 20 вопросов по 4 срезам: команда, методика, ученики, устойчивость.
// Ответ: шкала Лайкерта 0–3 (нет / фрагментарно / стабильно / встроено в систему).
// Итог: 4 балла по срезам + общий уровень готовности + приоритеты внедрения.

export type Answer = 0 | 1 | 2 | 3;
export type Dimension = "team" | "method" | "students" | "resilience";

export const dimensionLabels: Record<Dimension, string> = {
  team: "Команда педагогов",
  method: "Методическая база",
  students: "Работа с учениками",
  resilience: "Устойчивость школы",
};

export const answerLabels: Record<Answer, string> = {
  0: "Нет",
  1: "Фрагментарно",
  2: "Стабильно",
  3: "Встроено в систему",
};

export interface AuditQuestion {
  id: number;
  dimension: Dimension;
  text: string;
}

export const auditQuestions: AuditQuestion[] = [
  // Команда
  { id: 1, dimension: "team", text: "В команде есть общий словарь для описания состояния ученика на уроке" },
  { id: 2, dimension: "team", text: "Педагоги умеют отличать вокальные и невокальные причины «непопадания»" },
  { id: 3, dimension: "team", text: "Регулярно проходят внутренние супервизии сложных случаев" },
  { id: 4, dimension: "team", text: "Молодые педагоги обучаются работе с состоянием ученика, а не только методике" },
  { id: 5, dimension: "team", text: "Есть человек, к которому педагог может пойти со сложным кейсом" },

  // Методика
  { id: 6, dimension: "method", text: "В школе есть диагностика ученика, включающая невокальные показатели" },
  { id: 7, dimension: "method", text: "Учебные планы учитывают возрастные и психологические особенности" },
  { id: 8, dimension: "method", text: "Есть протоколы работы со сценическим волнением у учеников" },
  { id: 9, dimension: "method", text: "Работа с зажимом описана в методичках школы" },
  { id: 10, dimension: "method", text: "Учебный план имеет модуль по психосоматике голоса" },

  // Ученики
  { id: 11, dimension: "students", text: "Ученики понимают, что психологическая работа с педагогом — нормальная часть обучения" },
  { id: 12, dimension: "students", text: "Родители подростков вовлечены в работу с состоянием ребёнка" },
  { id: 13, dimension: "students", text: "Есть каналы, куда ученик может обратиться при трудностях вне урока" },
  { id: 14, dimension: "students", text: "Ученики регулярно выходят на публику и школа готовит их к этому системно" },
  { id: 15, dimension: "students", text: "Есть протокол работы после провала — концертного, конкурсного, экзаменационного" },

  // Устойчивость
  { id: 16, dimension: "resilience", text: "У школы есть система профилактики выгорания педагогов" },
  { id: 17, dimension: "resilience", text: "Педагоги регулярно проходят повышение квалификации" },
  { id: 18, dimension: "resilience", text: "У руководителя есть партнёр по методической работе — коллега или методист" },
  { id: 19, dimension: "resilience", text: "Стандарты школы не зависят от одного ключевого преподавателя" },
  { id: 20, dimension: "resilience", text: "Есть система обратной связи от учеников и родителей, кроме отзывов" },
];

export interface AuditResult {
  scores: Record<Dimension, number>;
  maxByDim: number;
  total: number;
  maxTotal: number;
  level: "start" | "mid" | "solid";
  priorities: { dim: Dimension; score: number; percent: number }[];
}

export function scoreAudit(answers: Record<number, Answer>): AuditResult {
  const scores: Record<Dimension, number> = {
    team: 0,
    method: 0,
    students: 0,
    resilience: 0,
  };
  const counts: Record<Dimension, number> = {
    team: 0,
    method: 0,
    students: 0,
    resilience: 0,
  };
  for (const q of auditQuestions) {
    const a = answers[q.id];
    if (a !== undefined) {
      scores[q.dimension] += a;
      counts[q.dimension] += 1;
    }
  }
  const maxByDim = 5 * 3;
  const total = Object.values(scores).reduce((s, v) => s + v, 0);
  const maxTotal = 20 * 3;
  const percentTotal = (total / maxTotal) * 100;
  const level =
    percentTotal < 33 ? "start" : percentTotal < 66 ? "mid" : "solid";

  const priorities = (Object.entries(scores) as [Dimension, number][])
    .map(([dim, s]) => ({
      dim,
      score: s,
      percent: Math.round((s / maxByDim) * 100),
    }))
    .sort((a, b) => a.percent - b.percent);

  return { scores, maxByDim, total, maxTotal, level, priorities };
}

export const levelCopy: Record<
  AuditResult["level"],
  { title: string; text: string }
> = {
  start: {
    title: "Ранняя стадия — есть поле для быстрых внедрений",
    text:
      "Сейчас работа с состоянием ученика существует в школе в основном как индивидуальный талант отдельных педагогов. Хорошая новость: базовые протоколы дают заметный эффект уже в первые 3 месяца после внедрения.",
  },
  mid: {
    title: "Средняя зрелость — стоит собирать в систему",
    text:
      "У школы есть отдельные встроенные практики. Стоит инвестировать в общий язык команды и методические стандарты, чтобы работа не зависела от конкретного педагога.",
  },
  solid: {
    title: "Зрелая система — работаем над узкими точками",
    text:
      "Школа обладает системными практиками работы с состоянием ученика. Смысл дальнейшей работы — в узких доработках и передаче методологии новым педагогам.",
  },
};

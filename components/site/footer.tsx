import Link from "next/link";
import { Logo } from "./logo";
import { siteConfig } from "@/lib/utils";

const columns = [
  {
    title: "Обучение",
    links: [
      { href: "/programs", label: "Все программы" },
      { href: "/programs?type=course", label: "Мини-курсы" },
      { href: "/programs?type=practicum", label: "Практикумы" },
      { href: "/free", label: "Бесплатные материалы" },
    ],
  },
  {
    title: "Институт",
    links: [
      { href: "/about", label: "О нас" },
      { href: "/methodology", label: "Методология" },
      { href: "/team", label: "Преподаватели" },
      { href: "/for-schools", label: "Для руководителей" },
    ],
  },
  {
    title: "Информация",
    links: [
      { href: "/legal/license", label: "Лицензия и документы" },
      { href: "/legal/offer", label: "Оферта" },
      { href: "/legal/privacy", label: "Политика ПД" },
      { href: "/legal/terms", label: "Пользовательское соглашение" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="rule bg-card mt-auto">
      <div className="container-tight py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Logo variant="full" />
            <p className="mt-5 text-sm text-muted leading-relaxed max-w-[260px]">
              Профессиональное образование в вокальной психологии как самостоятельной прикладной дисциплине.
            </p>
          </div>
          {columns.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-[13px] uppercase tracking-[0.14em] text-muted mb-4">
                {c.title}
              </h4>
              <ul className="space-y-2.5 text-[14px]">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-ink/80 hover:text-accent transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-rule/70 flex flex-col md:flex-row md:items-center gap-4 md:justify-between text-[13px] text-muted">
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. Все права защищены.
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 md:items-center">
            <a href={`mailto:${siteConfig.email}`} className="hover:text-accent">
              {siteConfig.email}
            </a>
            <span className="hidden md:inline">·</span>
            <span>ООО «Название» · ИНН 0000000000 · ОГРН 0000000000000</span>
          </div>
        </div>

        <p className="mt-6 text-[12px] text-muted/80 leading-relaxed">
          Образовательная деятельность осуществляется на основании лицензии
          №&nbsp;<span className="text-muted">[будет указан после получения]</span>.
        </p>
      </div>
    </footer>
  );
}

import Link from "next/link";

const nav = [
  { href: "/legal/offer", label: "Оферта" },
  { href: "/legal/privacy", label: "Политика ПД" },
  { href: "/legal/terms", label: "Пользовательское соглашение" },
  { href: "/legal/license", label: "Лицензия и документы" },
];

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-tight py-14 md:py-20">
      <div className="grid lg:grid-cols-[240px,1fr] gap-10">
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="kicker mb-3">Юридические документы</div>
          <nav className="flex flex-col text-[14px]">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="py-2 border-b border-rule/60 text-ink/80 hover:text-accent"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="prose-legal max-w-none">
          <div className="max-w-2xl">{children}</div>
        </div>
      </div>
    </div>
  );
}

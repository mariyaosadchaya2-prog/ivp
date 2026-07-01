import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  type Program,
  typeLabels,
  statusLabels,
} from "@/lib/programs";
import { cn } from "@/lib/utils";

export function ProgramCard({
  program,
  variant = "default",
}: {
  program: Program;
  variant?: "default" | "featured";
}) {
  const isFeatured = variant === "featured";
  const inactive = program.status !== "ready";

  return (
    <Card
      className={cn(
        "flex flex-col h-full",
        isFeatured &&
          "bg-page border-accent/40 shadow-card [&:hover]:border-accent"
      )}
    >
      <div className="p-6 md:p-7 flex-1 flex flex-col">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant={isFeatured ? "accent" : "default"}>
            {typeLabels[program.type]}
          </Badge>
          {program.code && (
            <Badge variant="outline">{program.code}</Badge>
          )}
          {inactive && (
            <Badge variant="planned">
              {statusLabels[program.status]}
            </Badge>
          )}
        </div>

        <h3
          className={cn(
            "font-display text-ink font-medium leading-tight",
            isFeatured ? "text-[24px] md:text-[28px]" : "text-[19px]"
          )}
        >
          {program.title}
        </h3>

        <p className="mt-3 text-[15px] text-muted leading-relaxed">
          {program.short}
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-3 text-[13px] text-muted">
          {program.hours && (
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-muted/80">
                Часы
              </dt>
              <dd className="mt-0.5 text-ink">{program.hours} ч</dd>
            </div>
          )}
          {program.duration && (
            <div>
              <dt className="text-[11px] uppercase tracking-[0.14em] text-muted/80">
                Длительность
              </dt>
              <dd className="mt-0.5 text-ink">{program.duration}</dd>
            </div>
          )}
          {program.price && (
            <div className="col-span-2">
              <dt className="text-[11px] uppercase tracking-[0.14em] text-muted/80">
                Стоимость
              </dt>
              <dd className="mt-0.5 text-ink font-medium">{program.price}</dd>
            </div>
          )}
        </dl>

        <div className="mt-auto pt-6">
          {inactive ? (
            <span className="inline-flex items-center gap-1.5 text-[14px] text-muted">
              Расскажем о запуске письмом →
            </span>
          ) : (
            <Link
              href={`/programs/${program.slug}`}
              className="inline-flex items-center gap-1.5 text-[14px] text-accent hover:text-accent-hover font-medium"
            >
              Подробнее
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}

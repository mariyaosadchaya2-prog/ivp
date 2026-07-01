"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProgramCard } from "@/components/site/program-card";
import {
  type ProductType,
  type Core,
  type Track,
  coreLabels,
  typeLabels,
  trackLabels,
  programs,
} from "@/lib/programs";
import { cn } from "@/lib/utils";

type TypeFilter = "all" | ProductType;
type CoreFilter = "all" | Core;
type TrackFilter = "all" | Track;

const typeOptions: { key: TypeFilter; label: string }[] = [
  { key: "all", label: "Все форматы" },
  { key: "program", label: typeLabels.program },
  { key: "course", label: typeLabels.course },
  { key: "practicum", label: typeLabels.practicum },
  { key: "sampler", label: "Бесплатно" },
];

const coreOptions: { key: CoreFilter; label: string }[] = [
  { key: "all", label: "Все ядра" },
  { key: "entry", label: coreLabels.entry },
  { key: "pro", label: coreLabels.pro },
  { key: "master", label: coreLabels.master },
  { key: "b2b", label: coreLabels.b2b },
];

const trackOptions: { key: TrackFilter; label: string }[] = [
  { key: "all", label: "Любая траектория" },
  { key: "vocalist", label: trackLabels.vocalist },
  { key: "psychologist", label: trackLabels.psychologist },
  { key: "artist", label: trackLabels.artist },
  { key: "school", label: trackLabels.school },
];

export function ProgramsCatalog() {
  const params = useSearchParams();
  const router = useRouter();
  const initialType = (params.get("type") ?? "all") as TypeFilter;
  const initialCore = (params.get("core") ?? "all") as CoreFilter;
  const initialTrack = (params.get("track") ?? "all") as TrackFilter;

  const [type, setType] = useState<TypeFilter>(initialType);
  const [core, setCore] = useState<CoreFilter>(initialCore);
  const [track, setTrack] = useState<TrackFilter>(initialTrack);

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      if (type !== "all" && p.type !== type) return false;
      if (core !== "all" && p.core !== core) return false;
      if (track !== "all" && !p.tracks.includes(track)) return false;
      return true;
    });
  }, [type, core, track]);

  const updateQuery = (patch: {
    type?: TypeFilter;
    core?: CoreFilter;
    track?: TrackFilter;
  }) => {
    const next = new URLSearchParams(params.toString());
    const nextType = patch.type ?? type;
    const nextCore = patch.core ?? core;
    const nextTrack = patch.track ?? track;
    if (nextType === "all") next.delete("type");
    else next.set("type", nextType);
    if (nextCore === "all") next.delete("core");
    else next.set("core", nextCore);
    if (nextTrack === "all") next.delete("track");
    else next.set("track", nextTrack);
    router.replace(`/programs${next.size ? `?${next.toString()}` : ""}`, {
      scroll: false,
    });
  };

  return (
    <div>
      <div className="rounded-lg border border-rule bg-card/60 p-4 md:p-5 mb-10 space-y-4">
        <FilterRow
          label="Формат"
          value={type}
          options={typeOptions}
          onChange={(v) => {
            setType(v as TypeFilter);
            updateQuery({ type: v as TypeFilter });
          }}
        />
        <FilterRow
          label="Ядро"
          value={core}
          options={coreOptions}
          onChange={(v) => {
            setCore(v as CoreFilter);
            updateQuery({ core: v as CoreFilter });
          }}
        />
        <FilterRow
          label="Траектория"
          value={track}
          options={trackOptions}
          onChange={(v) => {
            setTrack(v as TrackFilter);
            updateQuery({ track: v as TrackFilter });
          }}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted">
          По этой комбинации фильтров пока пусто. Попробуйте расширить критерии.
        </div>
      ) : (
        <>
          <div className="text-[13px] text-muted mb-4">
            Найдено: {filtered.length}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProgramCard key={p.id} program={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function FilterRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { key: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3">
      <div className="text-[12px] uppercase tracking-[0.14em] text-muted md:w-28 shrink-0">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.key}
            type="button"
            onClick={() => onChange(o.key)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-[13px] border transition-colors",
              value === o.key
                ? "bg-accent text-white border-accent"
                : "bg-page/60 text-ink/80 border-rule hover:border-accent hover:text-accent"
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

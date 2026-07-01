"use client";

import * as React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const AccordionRoot = Accordion.Root;

export function AccordionItem({
  value,
  title,
  children,
  className,
}: {
  value: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Accordion.Item
      value={value}
      className={cn("border-b border-rule/70 group", className)}
    >
      <Accordion.Header>
        <Accordion.Trigger className="flex w-full items-center justify-between gap-4 py-5 text-left text-[17px] font-medium text-ink hover:text-accent transition-colors">
          <span>{title}</span>
          <ChevronDown
            className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-data-[state=open]:rotate-180"
            aria-hidden
          />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden text-muted leading-relaxed data-[state=closed]:animate-none">
        <div className="pb-5 pr-8 text-[15px]">{children}</div>
      </Accordion.Content>
    </Accordion.Item>
  );
}

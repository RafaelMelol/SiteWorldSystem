"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export function Tabs({ items, defaultId }: { items: TabItem[]; defaultId?: string }) {
  const [activeId, setActiveId] = useState(defaultId ?? items[0]?.id);
  const baseId = useId();
  const active = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Categorias"
        className="flex flex-wrap gap-2 border-b border-border-subtle"
      >
        {items.map((item) => {
          const isActive = item.id === active?.id;
          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${item.id}`}
              onClick={() => setActiveId(item.id)}
              className={cn(
                "-mb-px rounded-t-lg border-b-2 px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                isActive
                  ? "border-brand-fg text-brand-fg"
                  : "border-transparent text-foreground/60 hover:text-foreground"
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          id={`${baseId}-panel-${item.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={item.id !== active?.id}
          className="pt-6"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}

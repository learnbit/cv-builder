"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

export default function List({ className }: { className?: string }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const cvs = [
    { name: "CV for google", id: 1 },
    { name: "CV for facebook", id: 2 },
    { name: "CV for amazon", id: 3 },
  ];

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  return (
    <aside className={`w-64 bg-blue-950 p-3 ${className}`}>
      <ul className="space-y-1">
        {cvs.map((cv) => (
          <li key={cv.id}>
            <button
              className={cn(
                "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer",
                "hover:bg-red-400",
                selectedId === cv.id && "bg-white/20"
              )}
              onClick={() => handleSelect(cv.id)}
            >
              {cv.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

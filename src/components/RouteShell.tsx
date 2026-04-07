"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function RouteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return <div key={pathname}>{children}</div>;
}

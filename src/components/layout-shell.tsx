"use client";

import { usePathname } from "next/navigation";

type LayoutShellProps = {
  children: React.ReactNode;
  navBar: React.ReactNode;
};

export function LayoutShell({ children, navBar }: LayoutShellProps) {
  const pathname = usePathname();
  const showNavBar = pathname !== "/auth";

  return (
    <>
      {showNavBar ? navBar : null}
      <div className={showNavBar ? "py-10" : undefined}>{children}</div>
    </>
  );
}

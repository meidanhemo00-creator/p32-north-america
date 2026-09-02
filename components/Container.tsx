/**
 * The one grid every section aligns to: a shared max-width and horizontal
 * padding scale. Nothing should introduce its own px-* / max-w-* pairing —
 * route it through here so headlines, copy, cards, and images all share
 * the same left/right edges up and down the page.
 */
export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-[1600px] px-6 md:px-14 ${className}`}>{children}</div>;
}

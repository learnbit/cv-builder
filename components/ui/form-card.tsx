export function FormCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-card border border-border/80 rounded-lg p-6 space-y-4 ${className}`}
    >
      {children}
    </div>
  );
}

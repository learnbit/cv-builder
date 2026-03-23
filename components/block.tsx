type BlockProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Block({ children, className }: BlockProps) {
  return <div className={`flow-root ${className ?? ""}`}>{children}</div>;
}

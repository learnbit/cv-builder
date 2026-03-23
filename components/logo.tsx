export default function Logo({ className }: { className: string }) {
  // <Image src="" alt="CV builder logo"/>
  return (
    <div
      className={`
    text-lg font-semibold tracking-tight text-white
    ${className}
  `}
    >
      CV
    </div>
  );
}

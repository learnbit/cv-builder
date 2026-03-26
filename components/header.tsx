import Logo from "./logo";
import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="flex items-center justify-between h-full px-6 sm:px-9 border-b border-white/10">
      <Logo className="mx-auto" />
      <UserButton />
    </header>
  );
}

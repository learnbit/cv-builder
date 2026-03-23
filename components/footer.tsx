export default function Footer() {
  return (
    <footer
      className="
        w-full border-t border-white/5 bg-black
        px-6 sm:px-9 py-5 
        flex flex-col gap-3
        sm:flex-row sm:items-center sm:justify-between
        text-sm text-muted-foreground
      "
    >
      <div className="flex items-center gap-3 flex-wrap">
        <span>© 2026 Wilson Balderrama</span>

        <span
          className="
            text-xs px-2 py-1 rounded-full
            bg-emerald-500/4
            text-emerald-400/90
            border border-emerald-500/15
          "
        >
          Open to freelance
        </span>
      </div>

      <div className="flex items-center gap-4">
        <a
          href="https://www.linkedin.com/in/wilsonbalderrama"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition"
        >
          LinkedIn
        </a>
        <a
          href="https://t.me/wilsonbalderrama"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition"
        >
          Telegram
        </a>
      </div>
    </footer>
  );
}

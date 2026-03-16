export default function Footer() {
  return (
    <footer className="px-6 pb-10 pt-4 md:px-8">
      <div className="mx-auto flex max-w-container flex-col gap-4 border-t border-[var(--line)] pt-6 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <p>Enterprise systems, product delivery, and careful modernization.</p>
        <div
          className="flex items-center gap-6 text-xs uppercase tracking-[0.24em]"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          <a
            href="https://github.com/qoxmfaktmxj"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[var(--foreground)]"
          >
            GitHub
          </a>
          <a
            href="https://qoxmfaktmxj.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[var(--foreground)]"
          >
            Blog
          </a>
          <span>© 2026 minseok91.cloud</span>
        </div>
      </div>
    </footer>
  );
}

import { colophon } from "@/data/siteContent";

export default function ColophonFooter() {
  return (
    <footer className="border-t-2 border-ink px-5 py-8 md:px-10">
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 md:flex-row md:justify-between">
        <span className="font-mono text-[10px] tracking-[0.2em] text-ink-soft">
          {colophon.publisher}
        </span>
        <nav className="flex gap-6">
          {colophon.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="font-mono text-xs font-bold tracking-widest text-ink underline-offset-4 transition-colors hover:text-vermilion hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <span className="text-center font-mono text-[10px] text-ink-faint">
          {colophon.copyright}
        </span>
      </div>
    </footer>
  );
}

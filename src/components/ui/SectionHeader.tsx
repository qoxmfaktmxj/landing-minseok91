import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  inverse?: boolean;
  className?: string;
  titleClassName?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  inverse = false,
  className,
  titleClassName,
}: SectionHeaderProps) {
  const eyebrowClass = inverse ? "text-[var(--accent)]" : "text-[#1F5EFF]";
  const titleClass = inverse ? "text-[var(--foreground)]" : "text-[#12192C]";
  const descriptionClass = inverse ? "text-[var(--muted)]" : "text-[#596176]";

  return (
    <div className={cn("max-w-3xl", className)}>
      <p
        className={`mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] ${eyebrowClass}`}
        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          `text-3xl font-semibold tracking-[-0.02em] md:text-4xl ${titleClass}`,
          titleClassName
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-base leading-7 md:text-lg ${descriptionClass}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

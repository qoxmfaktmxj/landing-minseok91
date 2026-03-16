interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  inverse?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  inverse = false,
}: SectionHeaderProps) {
  const eyebrowClass = inverse ? "text-[var(--accent)]" : "text-[#1F5EFF]";
  const titleClass = inverse ? "text-[var(--foreground)]" : "text-[#12192C]";
  const descriptionClass = inverse ? "text-[var(--muted)]" : "text-[#596176]";

  return (
    <div className="max-w-3xl">
      <p
        className={`mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] ${eyebrowClass}`}
        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
      >
        {eyebrow}
      </p>
      <h2 className={`text-3xl font-semibold tracking-[-0.02em] md:text-4xl ${titleClass}`}>
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

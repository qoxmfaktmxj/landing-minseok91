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
  const eyebrowClass = inverse ? "text-[#B6C3FF]" : "text-[#3559D6]";
  const titleClass = inverse ? "text-white" : "text-[#12192C]";
  const descriptionClass = inverse ? "text-[#CDD5EA]" : "text-[#596176]";

  return (
    <div className="max-w-3xl">
      <p
        className={`mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] ${eyebrowClass}`}
        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
      >
        {eyebrow}
      </p>
      <h2 className={`text-3xl font-semibold tracking-tight md:text-4xl ${titleClass}`}>
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

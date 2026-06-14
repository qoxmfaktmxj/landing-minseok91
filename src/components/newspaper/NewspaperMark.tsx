type NewspaperMarkProps = {
  className?: string;
};

export default function NewspaperMark({
  className = "h-3.5 w-3.5 translate-y-[1px]",
}: NewspaperMarkProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={`inline-block shrink-0 ${className}`}
    >
      <rect x="3.5" y="5" width="17" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="6" y="7.6" width="11.5" height="2.6" rx="0.6" fill="currentColor" />
      <rect x="6" y="12.6" width="5" height="4.6" rx="0.6" fill="#ff4f30" />
      <rect x="13" y="12.9" width="4.5" height="1.5" rx="0.6" fill="currentColor" />
      <rect x="13" y="15.9" width="4.5" height="1.5" rx="0.6" fill="currentColor" />
    </svg>
  );
}

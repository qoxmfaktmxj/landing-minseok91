import { cn } from "@/lib/utils";

interface SectionFrameProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionFrame({
  children,
  className,
}: SectionFrameProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-container rounded-[34px] border border-[var(--line)]",
        "bg-[linear-gradient(180deg,rgba(23,31,51,0.94),rgba(11,19,38,0.96))]",
        "p-8 shadow-[0_24px_90px_rgba(2,6,23,0.34)] md:p-10",
        className
      )}
    >
      {children}
    </div>
  );
}

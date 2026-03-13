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
        "mx-auto max-w-container rounded-[40px] border border-[rgba(18,25,44,0.08)]",
        "bg-[linear-gradient(135deg,_rgba(31,94,255,0.1),_rgba(255,255,255,0.88)_32%,_rgba(18,25,44,0.02))]",
        "p-8 shadow-[0_18px_70px_rgba(18,25,44,0.08)] md:p-10",
        className
      )}
    >
      {children}
    </div>
  );
}

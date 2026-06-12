import { tickerItems } from "@/data/siteContent";

export default function BreakingTicker() {
  return (
    <div className="mt-3 overflow-hidden bg-ink py-2 text-paper">
      <div className="ticker-track flex w-max whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex" aria-hidden={dup === 1}>
            {tickerItems.map((item) => (
              <span
                key={`${dup}-${item.label}-${item.text}`}
                className="mx-6 font-mono text-[11px] tracking-[0.2em] md:text-xs"
              >
                <strong className="mr-2 font-bold text-vermilion-soft">
                  {item.label}
                </strong>
                {item.text}
                <span className="ml-6 text-ink-faint">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

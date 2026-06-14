import { tickerItems } from "@/data/siteContent";
import NewspaperMark from "./NewspaperMark";

export default function BreakingTicker() {
  return (
    <div className="mt-3 bg-ink py-2 text-paper">
      <div className="overflow-hidden motion-reduce:hidden">
        <div className="ticker-track flex w-max whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex" aria-hidden={dup === 1}>
              {tickerItems.map((item) => (
                <span
                  key={`${dup}-${item.label}-${item.text}`}
                  className="mx-6 inline-flex items-center font-mono text-[11px] tracking-[0.2em] md:text-xs"
                >
                  <strong className="mr-2 font-bold text-vermilion-soft">
                    {item.label}
                  </strong>
                  {item.text}
                  <NewspaperMark className="ml-6 h-3 w-3 text-ink-faint" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div
        className="hidden flex-wrap justify-center gap-x-6 gap-y-2 px-5 motion-reduce:flex"
        data-reduced-ticker
      >
        {tickerItems.map((item) => (
          <span
            key={`${item.label}-${item.text}`}
            className="font-mono text-[11px] tracking-[0.16em] md:text-xs"
          >
            <strong className="mr-2 font-bold text-vermilion-soft">
              {item.label}
            </strong>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}

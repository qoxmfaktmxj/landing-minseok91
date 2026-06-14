import { Fragment } from "react";
import { masthead } from "@/data/siteContent";

function NewspaperMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="inline-block h-3.5 w-3.5 shrink-0 translate-y-[1px]"
    >
      <rect x="3.5" y="5" width="17" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="6" y="7.6" width="11.5" height="2.6" rx="0.6" fill="currentColor" />
      <rect x="6" y="12.6" width="5" height="4.6" rx="0.6" fill="#ff4f30" />
      <rect x="13" y="12.9" width="4.5" height="1.5" rx="0.6" fill="currentColor" />
      <rect x="13" y="15.9" width="4.5" height="1.5" rx="0.6" fill="currentColor" />
    </svg>
  );
}

export default function Masthead() {
  const statusParts = masthead.statusLine.split("✦");
  return (
    <header className="px-5 pt-8 md:px-10 md:pt-12">
      <div className="mx-auto max-w-container">
        <div className="flex items-center justify-between border-b border-ink pb-2 font-mono text-[10px] tracking-[0.15em] text-ink-soft md:text-xs">
          <span>{masthead.cityLine}</span>
          <span className="hidden items-center gap-1.5 md:inline-flex">
            {statusParts.map((part, i) => (
              <Fragment key={i}>
                <span>{part.trim()}</span>
                {i < statusParts.length - 1 && <NewspaperMark />}
              </Fragment>
            ))}
          </span>
          <span>{masthead.priceLine}</span>
        </div>
        <h1 className="my-5 whitespace-nowrap text-center font-serif text-[9vw] font-black leading-none tracking-tight text-ink md:my-8 md:text-[8vw] lg:text-8xl">
          The <span className="text-vermilion">Minseok</span> Times
        </h1>
        <div className="rule-double flex items-center justify-between py-2 font-mono text-[10px] tracking-[0.15em] text-ink-soft md:text-xs">
          <span>{masthead.volume}</span>
          <span className="font-bold text-ink">{masthead.tagline}</span>
          <span>{masthead.established}</span>
        </div>
      </div>
    </header>
  );
}

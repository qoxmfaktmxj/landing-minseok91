import { Fragment } from "react";
import { masthead } from "@/data/siteContent";
import NewspaperMark from "./NewspaperMark";

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

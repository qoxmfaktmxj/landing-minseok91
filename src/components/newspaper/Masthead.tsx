import { masthead } from "@/data/siteContent";

export default function Masthead() {
  return (
    <header className="px-5 pt-8 md:px-10 md:pt-12">
      <div className="mx-auto max-w-container">
        <div className="flex items-center justify-between border-b border-ink pb-2 font-mono text-[10px] tracking-[0.15em] text-ink-soft md:text-xs">
          <span>{masthead.cityLine}</span>
          <span className="hidden md:inline">{masthead.statusLine}</span>
          <span>{masthead.priceLine}</span>
        </div>
        <h1 className="my-5 text-center font-serif text-[13vw] font-black leading-none tracking-tight text-ink md:my-8 md:text-8xl">
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

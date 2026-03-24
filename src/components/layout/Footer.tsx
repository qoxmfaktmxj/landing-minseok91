export default function Footer() {
  return (
    <footer className="w-full bg-[#f5f7f8] py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-8 md:flex-row">
        <div className="text-lg font-bold text-on-background">MINSEOK91</div>

        <div className="flex flex-wrap justify-center gap-8 text-xs font-medium uppercase tracking-widest text-on-surface-variant">
          <a
            href="https://github.com/qoxmfaktmxj"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 transition-colors hover:text-primary hover:opacity-100"
          >
            GitHub
          </a>
          <a
            href="https://qoxmfaktmxj.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 transition-colors hover:text-primary hover:opacity-100"
          >
            Blog
          </a>
          <a
            href="mailto:qoxmfaktmxj@naver.com"
            className="opacity-80 transition-colors hover:text-primary hover:opacity-100"
          >
            Contact
          </a>
        </div>

        <div className="text-[10px] font-medium text-outline">
          &copy; 2026 minseok91.cloud
        </div>
      </div>
    </footer>
  );
}

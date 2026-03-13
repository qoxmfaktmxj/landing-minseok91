export default function Footer() {
  return (
    <footer className="px-6 pb-10 pt-4 md:px-8">
      <div className="mx-auto flex max-w-container flex-col gap-2 border-t border-[rgba(18,25,44,0.08)] pt-6 text-sm text-[#596176] md:flex-row md:items-center md:justify-between">
        <p>AI 를 활용해 엔터프라이즈 시스템을 개선하는 빌더.</p>
        <p
          className="text-xs uppercase tracking-[0.24em] text-[#7B8599]"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          © 2026 minseok91.cloud
        </p>
      </div>
    </footer>
  );
}

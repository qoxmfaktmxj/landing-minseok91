import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page section-shell">
      <Link className="wordmark" href="/">
        minseok.
      </Link>
      <div className="not-found-copy">
        <h1>페이지를 찾을 수 없습니다.</h1>
        <p>
          주소가 변경되었거나 존재하지 않는 페이지입니다. 포트폴리오 첫 화면으로
          돌아가거나 프로젝트 목록에서 다시 찾아보세요.
        </p>
        <div className="not-found-actions">
          <Link className="button button-primary" href="/">
            <ArrowLeft size={18} aria-hidden="true" />첫 화면으로
          </Link>
          <Link className="button button-case" href="/#work">
            프로젝트 보기
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <Link className="text-link" href="/#contact">
          도움이 필요하면 연락하기
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}

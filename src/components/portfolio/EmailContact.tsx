"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

const email = "qoxmfaktmxj@naver.com";

export default function EmailContact() {
  const addressRef = useRef<HTMLAnchorElement>(null);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<"idle" | "copied" | "manual">("idle");

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      if (addressRef.current) {
        const range = document.createRange();
        range.selectNodeContents(addressRef.current);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      setStatus("manual");
    }
  };

  return (
    <div className="email-contact">
      <a className="email-address" ref={addressRef} href={`mailto:${email}`}>
        {email}
      </a>
      {ready && (
        <button className="email-copy" type="button" onClick={copyEmail}>
          {status === "copied" ? (
            <Check size={16} aria-hidden="true" />
          ) : (
            <Copy size={16} aria-hidden="true" />
          )}
          {status === "copied" ? "복사 완료" : "이메일 주소 복사"}
        </button>
      )}
      <p className="email-help">
        이메일 주소를 누르면 메일 앱이 열립니다. 앱이 없으면 주소를 복사해
        주세요.
      </p>
      <p
        className="email-feedback"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {status === "copied"
          ? "이메일 주소를 복사했습니다."
          : status === "manual"
            ? "자동 복사를 사용할 수 없습니다. 선택된 주소를 직접 복사해 주세요."
            : ""}
      </p>
    </div>
  );
}

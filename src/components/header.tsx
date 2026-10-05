"use client";
import { normalizePathname } from "@/lib/paths";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/content/portfolio";
import { resumePdf } from "@/content/resume";
import { withBasePath } from "@/lib/paths";
import { Arrow } from "./ui";

export function Header() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          href="/"
          className="wordmark"
          data-transition
          aria-label="J2AN 홈"
        >
          J2AN<span className="wordmark-dot">.</span>
        </Link>
        <nav aria-label="주 메뉴">
          <ul>
            {navigation.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  data-transition
                  aria-current={normalizePathname(pathname) === href ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a
          className="header-contact"
          href={withBasePath(resumePdf)}
          download="하승진_프론트엔드_이력서.pdf"
          aria-label="하승진 이력서 PDF 다운로드"
        >
          <span>이력서 PDF ↓</span>
          <Arrow />
        </a>
      </div>
    </header>
  );
}

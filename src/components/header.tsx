"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/content/portfolio";
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
                  aria-current={pathname === href ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a
          className="header-contact"
          href="mailto:ha99104@gmail.com"
          aria-label="Let’s talk · 하승진에게 이메일 보내기"
        >
          <span>Let’s talk</span>
          <Arrow />
        </a>
      </div>
    </header>
  );
}

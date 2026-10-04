import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Arrow({
  diagonal = true,
  className,
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={cn("arrow", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-7-7 7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SectionHeading({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading" data-reveal>
      <div className="section-index">
        <span className="mono">
          {number} / {eyebrow}
        </span>
      </div>
      <div>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
    </div>
  );
}

export function TextLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  return external ? (
    <a
      className={cn("text-link", className)}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <Arrow />
      <span className="sr-only"> (새 탭)</span>
    </a>
  ) : (
    <Link className={cn("text-link", className)} href={href} data-transition>
      {children}
      <Arrow />
    </Link>
  );
}

export function Tags({ items }: { items: string[] }) {
  return (
    <ul className="tags" aria-label="사용 기술">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function PageIntro({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
}) {
  return (
    <section className="page-intro container">
      <p className="eyebrow">
        <span className="status-dot" />
        {eyebrow}
      </p>
      <h1>
        {title}
        {accent && (
          <>
            <br />
            <span className="accent">{accent}</span>
          </>
        )}
      </h1>
      <p className="page-intro-description">{description}</p>
    </section>
  );
}

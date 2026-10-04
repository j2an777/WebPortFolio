"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { gsap as Gsap } from "gsap";

export function RouteTransitions({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const active = useRef(false);
  const generation = useRef(0);
  const animation = useRef<gsap.core.Timeline | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const library = useRef<typeof Gsap | null>(null);
  const previous = useRef(pathname);

  useEffect(() => {
    const reset = () => {
      animation.current?.kill();
      if (timeout.current) clearTimeout(timeout.current);
      if (curtain.current) {
        curtain.current.style.visibility = "hidden";
        curtain.current
          .querySelectorAll<HTMLElement>(".route-panel")
          .forEach((panel) => {
            panel.style.transform = "translateY(100%)";
          });
      }
      active.current = false;
    };
    const handleClick = async (event: MouseEvent) => {
      const anchor = (
        event.target as Element | null
      )?.closest<HTMLAnchorElement>("a[data-transition]");
      if (
        !anchor ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      )
        return;
      const url = new URL(anchor.href);
      if (
        url.origin !== location.origin ||
        url.pathname === location.pathname ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      event.preventDefault();
      if (active.current) return;
      active.current = true;
      const ticket = ++generation.current;
      const destination = `${url.pathname}${url.search}${url.hash}`;
      try {
        const { gsap } = await import("gsap");
        if (ticket !== generation.current || !curtain.current) return;
        library.current = gsap;
        const panels = curtain.current.querySelectorAll(".route-panel");
        const brand = curtain.current.querySelector(".route-brand");
        gsap.set(curtain.current, { visibility: "visible" });
        gsap.set(panels, { y: 0, yPercent: 100 });
        gsap.set(brand, { opacity: 0 });
        timeout.current = setTimeout(reset, 5000);
        animation.current = gsap
          .timeline({ onComplete: () => router.push(destination) })
          .to(panels, {
            yPercent: 0,
            duration: 0.3,
            stagger: 0.045,
            ease: "power3.inOut",
          })
          .to(brand, { opacity: 1, duration: 0.1 }, "-=.1");
      } catch {
        reset();
        router.push(destination);
      }
    };
    const handleHistory = () => {
      ++generation.current;
      reset();
    };
    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handleHistory);
    return () => {
      handleHistory();
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handleHistory);
    };
  }, [router]);

  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    document
      .querySelector<HTMLElement>("#main")
      ?.focus({ preventScroll: true });
    if (!active.current || !library.current || !curtain.current) return;
    if (timeout.current) clearTimeout(timeout.current);
    const gsap = library.current;
    animation.current?.kill();
    animation.current = gsap
      .timeline({
        onComplete: () => {
          if (curtain.current)
            gsap.set(curtain.current, { visibility: "hidden" });
          active.current = false;
        },
      })
      .to(curtain.current.querySelector(".route-brand"), {
        opacity: 0,
        duration: 0.1,
      })
      .to(
        curtain.current.querySelectorAll(".route-panel"),
        {
          yPercent: -100,
          duration: 0.42,
          stagger: 0.045,
          ease: "power3.inOut",
        },
        0,
      );
  }, [pathname]);

  return (
    <>
      {children}
      <div ref={curtain} className="route-curtain" aria-hidden="true">
        <div className="route-panel" />
        <div className="route-panel" />
        <div className="route-panel" />
        <div className="route-brand">
          <strong>
            J2AN<span>.</span>
          </strong>
          <span>THOUGHTFUL CODE. BETTER EXPERIENCES.</span>
        </div>
      </div>
    </>
  );
}

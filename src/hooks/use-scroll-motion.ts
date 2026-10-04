"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Defer nonessential motion until after the initial rendering work. Scope and revert every animation on route changes. */
export function useScrollMotion() {
  const pathname = usePathname();
  useEffect(() => {
    let disposed = false;
    let revert: (() => void) | undefined;
    const timer = window.setTimeout(async () => {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference)", () => {
          const scope = document.querySelector("[data-route-content]");
          if (!scope) return;
          const context = gsap.context(() => {
            scope
              .querySelectorAll<HTMLElement>("[data-reveal]")
              .forEach((element, index) => {
                // Never conceal the initial viewport or previously read content.
                if (element.getBoundingClientRect().top < window.innerHeight)
                  return;
                gsap.from(element, {
                  y: 32,
                  opacity: 0,
                  duration: 0.65,
                  ease: "power3.out",
                  delay: (index % 3) * 0.045,
                  scrollTrigger: {
                    trigger: element,
                    start: "top 94%",
                    once: true,
                  },
                  onComplete: () =>
                    gsap.set(element, { clearProps: "transform,opacity" }),
                });
              });
            scope
              .querySelectorAll<HTMLElement>("[data-image-motion]")
              .forEach((frame) => {
                const picture = frame.querySelector("[data-parallax-layer]");
                if (!picture) return;
                gsap.fromTo(
                  picture,
                  { yPercent: -3 },
                  {
                    yPercent: 3,
                    ease: "none",
                    scrollTrigger: {
                      trigger: frame,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: 0.6,
                    },
                  },
                );
              });
          }, scope);
          return () => context.revert();
        });
        revert = () => media.revert();
      } catch {
        // Motion is progressive enhancement; every server-rendered section stays readable.
      }
    }, 1200);
    return () => {
      disposed = true;
      clearTimeout(timer);
      revert?.();
    };
  }, [pathname]);
}

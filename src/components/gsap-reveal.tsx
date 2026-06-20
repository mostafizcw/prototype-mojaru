"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { gsap } from "gsap";

type GsapRevealProps = ComponentPropsWithoutRef<"div"> & {
  selector?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  y?: number;
};

export function GsapReveal({
  children,
  className = "",
  selector = "[data-gsap-reveal]",
  delay = 0.1,
  duration = 0.7,
  stagger = 0.08,
  y = 20,
  ...props
}: GsapRevealProps) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = scopeRef.current;

    if (!scope) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        selector,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          delay,
          duration,
          ease: "power3.out",
          stagger,
        },
      );
    }, scope);

    return () => context.revert();
  }, [delay, duration, selector, stagger, y]);

  return (
    <div ref={scopeRef} className={className} {...props}>
      {children}
    </div>
  );
}

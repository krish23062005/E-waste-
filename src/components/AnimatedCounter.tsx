"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const STEPS = 30; // Total state updates per animation — minimises React re-renders

export default function AnimatedCounter({
  value,
  duration = 2,
  prefix = "",
  suffix = "",
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    let frame = 0;
    const totalFrames = STEPS;
    const stepDuration = (duration * 1000) / totalFrames;

    const timer = setInterval(() => {
      frame++;
      // easeOutExpo curve applied at step granularity
      const progress = frame / totalFrames;
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * value));

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCount(value); // guarantee exact final value
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

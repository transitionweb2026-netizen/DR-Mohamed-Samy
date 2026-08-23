"use client";

import { useEffect } from "react";

// Several source pages share this exact inline <script>: elements tagged
// `.reveal-on-scroll` fade/slide in the first time they cross the
// viewport, then stop being observed. Ported as one reusable effect
// instead of duplicating the same IntersectionObserver setup per page.
export default function ScrollRevealInit() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.1 },
    );

    document
      .querySelectorAll(".reveal-on-scroll")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}

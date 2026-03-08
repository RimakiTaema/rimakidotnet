"use client"

import { useEffect } from "react";

export default function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    fetch(`/api/views/${slug}`, { method: "POST" }).catch(() => {
      // silently fail — view tracking is non-critical
    });
  }, [slug]);

  return null;
}

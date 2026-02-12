"use client";

import { useEffect } from "react";

export default function usePageTitle(title) {
  useEffect(() => {
    if (!title) return;

    const prevTitle = document.title;
    document.title = title;

    return () => {
      document.title = prevTitle; // optional cleanup
    };
  }, [title]);
}

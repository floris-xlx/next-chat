"use client";

// ui
import React, { useEffect, useState, useRef } from "react";
import { NextMessageBox } from "@/package/NextMessage";
import { useWindowSize } from "@uidotdev/usehooks";

export default function NextMessageProvider({
  thread_id,
  domain,
}: {
  thread_id: string;
  domain: string;
}) {
  const { width, height } = useWindowSize();
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLFormElement>(null);

  // Calculate height multiplier based on screen size
  // For smaller screens, we use a smaller multiplier to leave more space
  const getHeightMultiplier = (screenHeight: number) => {
    if (screenHeight <= 600) return 0.82;
    if (screenHeight <= 900) return 0.85;
    if (screenHeight <= 1200) return 0.845;
    return 0.89; // Default for large screens
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setContainerSize({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const heightMultiplier = getHeightMultiplier(height || 0);
  console.log("🚀 ~ heightMultiplier:", heightMultiplier)
  const effectiveWidth = width;
  const effectiveHeight = height ? height * heightMultiplier : 0;

  return (
    <form id={"next-chat-provider"} className='overflow-x-hidden' ref={containerRef}>
      <NextMessageBox
        thread_id={thread_id}
        domain={domain}
        style={{
          width: `${effectiveWidth}px`,
          height: `${effectiveHeight}px`,
        }}
      />
    </form>
  );
}

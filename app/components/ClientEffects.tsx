"use client";

import dynamic from "next/dynamic";

// Dynamically import with no SSR to prevent hydration mismatches
const CanvasBackground = dynamic(
  () => import("./CanvasBackground").then((m) => ({ default: m.CanvasBackground })),
  { ssr: false }
);

const LanternCursor = dynamic(
  () => import("./LanternCursor").then((m) => ({ default: m.LanternCursor })),
  { ssr: false }
);

export const ClientEffects = () => {
  return (
    <>
      <CanvasBackground />
      <LanternCursor />
    </>
  );
};

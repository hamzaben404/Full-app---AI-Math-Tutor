// app/chat/page.tsx
"use client";

import { Assistant } from "@/components/math-coach/assistant";

export default function ChatPage() {
  return (
    <main className="h-dvh w-dvw bg-background text-foreground">
      {/* Assistant already manages sidebar + header + thread layout */}
      <Assistant />
    </main>
  );
}

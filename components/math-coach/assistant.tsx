// components/math-coach/assistant.tsx
"use client";

import {
  AssistantRuntimeProvider,
  useLocalRuntime,
  type ChatModelAdapter,
  type ChatModelRunResult,
  type ThreadMessage,
} from "@assistant-ui/react";

import { Thread } from "@/components/math-coach/assistant-ui/thread";
import { ThreadListSidebar } from "@/components/math-coach/assistant-ui/threadlist-sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Helper: extract latest user text from the thread
function getLatestUserMessage(messages: readonly ThreadMessage[]): string {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const firstContent = lastUser?.content?.[0];

  if (firstContent && firstContent.type === "text") {
    return firstContent.text ?? "";
  }

  return "";
}

// ChatModelAdapter that calls our Next.js API `/api/chat`
function createChatModelAdapter(): ChatModelAdapter {
  return {
    async run({ messages, abortSignal }): Promise<ChatModelRunResult> {
      try {
        const userMessage = getLatestUserMessage(messages);

        if (!userMessage) {
          return {
            content: [
              {
                type: "text",
                text: "Je n'ai pas trouvé ta question. Peux-tu la reformuler ?",
              },
            ],
          };
        }

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: userMessage }),
          signal: abortSignal,
        });

        if (!res.ok) {
          console.error("Error from /api/chat:", res.status, res.statusText);
          return {
            content: [
              {
                type: "text",
                text: `Erreur du service RAG (code ${res.status}).`,
              },
            ],
          };
        }

        const data = (await res.json()) as { answer?: string };
        const answer =
          data.answer ?? "Le service RAG n'a pas renvoyé de réponse utilisable.";

        return {
          content: [
            {
              type: "text",
              text: answer,
            },
          ],
        };
      } catch (error) {
        console.error("Chat runtime error:", error);
        return {
          content: [
            {
              type: "text",
              text:
                "Erreur lors de l'appel au service RAG. Vérifie que l'API Python est bien démarrée.",
            },
          ],
        };
      }
    },
  };
}

export const Assistant = () => {
  // Local runtime, driven by our custom ChatModelAdapter
  const runtime = useLocalRuntime(createChatModelAdapter());

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <SidebarProvider>
        {/* Full-screen assistant: height comes from <main className="h-dvh"> */}
        <div className="flex h-full w-full pr-0.5">
          <ThreadListSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/">
                      Sway3 dyal l Math – Coach
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Chat</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>

            {/* This area hosts the scrollable thread */}
            <div className="flex-1 overflow-hidden">
              <Thread />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AssistantRuntimeProvider>
  );
};

"use client";

import {
  ArrowDownIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  PencilIcon,
  RefreshCwIcon,
  Square,
  Sparkles,
  BookOpen,
  Sigma,
  HelpCircle,
  SendHorizontal,
} from "lucide-react";

import {
  ActionBarPrimitive,
  BranchPickerPrimitive,
  ComposerPrimitive,
  ErrorPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
} from "@assistant-ui/react";

import type { FC } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import * as m from "motion/react-m";

import { Button } from "@/components/ui/button";
import { MarkdownText } from "@/components/math-coach/assistant-ui/markdown-text";
import { ToolFallback } from "@/components/math-coach/assistant-ui/tool-fallback";
import { TooltipIconButton } from "@/components/math-coach/assistant-ui/tooltip-icon-button";
import {
  ComposerAddAttachment,
  ComposerAttachments,
  UserMessageAttachments,
} from "@/components/math-coach/assistant-ui/attachment";
import { cn } from "@/lib/utils";

export const Thread: FC = () => {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <ThreadPrimitive.Root
          className="aui-root aui-thread-root flex h-full w-full flex-col bg-background items-center"
        >
          <ThreadPrimitive.Viewport className="aui-thread-viewport flex w-full max-w-3xl flex-1 flex-col overflow-y-auto px-4 pt-10 pb-40 scroll-smooth">
            
            {/* --- EMPTY STATE: Center everything --- */}
            <ThreadPrimitive.If empty>
              <EmptyThread />
            </ThreadPrimitive.If>

            {/* --- ACTIVE STATE: Messages + Floating Input --- */}
            <ThreadPrimitive.If empty={false}>
              <ThreadPrimitive.Messages
                components={{
                  UserMessage,
                  EditComposer,
                  AssistantMessage,
                }}
              />
              {/* When chatting, Composer is fixed at the bottom */}
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-10">
                <Composer />
              </div>
            </ThreadPrimitive.If>

          </ThreadPrimitive.Viewport>
        </ThreadPrimitive.Root>
      </MotionConfig>
    </LazyMotion>
  );
};

/* ---------- Empty thread: Central Layout ---------- */

const EmptyThread: FC = () => {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center -mt-10">
      <div className="flex w-full flex-col gap-8 items-center">
        {/* 1. Welcome Text */}
        <ThreadWelcome />
        
        {/* 2. Suggestions Grid */}
        <div className="w-full max-w-2xl">
          <ThreadSuggestions />
        </div>

        {/* 3. Inline Composer (Under suggestions) */}
        <div className="w-full max-w-2xl mt-4">
          <Composer />
        </div>
      </div>
    </div>
  );
};

const ThreadWelcome: FC = () => {
  return (
    <div className="aui-thread-welcome-root flex w-full flex-col items-center justify-center text-center">
      <m.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent pb-2"
      >
        
      </m.div>

      <m.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent pb-2"
      >
        Salut Futur Major !
      </m.div>
    </div>
  );
};

const ThreadSuggestions: FC = () => {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-2">
      {[
        {
          icon: Sigma,
          label: "C'est quoi un quantificateur ?",
          action: "Explique le rôle du quantificateur universel.",
        },
        {
          icon: BookOpen,
          label: "Intuition de l'implication",
          action: "Donne-moi l’intuition d’une implication logique p ⇒ q.",
        },
        {
          icon: Sparkles,
          label: "Fonction croissante",
          action: "Rappelle-moi la définition d’une fonction croissante.",
        },
        {
          icon: HelpCircle,
          label: "Pièges équations 1er degré",
          action: "Quels sont les pièges fréquents avec les équations du 1er degré ?",
        },
      ].map((item, index) => (
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={index}
        >
          <ThreadPrimitive.Suggestion prompt={item.action} send asChild>
            <Button
              variant="outline"
              className="h-auto w-full justify-start gap-3 p-3 text-left hover:bg-muted/50 hover:border-blue-500/30 transition-all hover:-translate-y-0.5 shadow-sm bg-background/60 backdrop-blur-sm"
            >
              <div className="rounded-lg bg-blue-100/50 p-2 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <item.icon className="h-4 w-4" />
              </div>
              <span className="font-medium text-sm text-foreground/90">
                {item.label}
              </span>
            </Button>
          </ThreadPrimitive.Suggestion>
        </m.div>
      ))}
    </div>
  );
};

/* ---------- Composer (Styling handles both Inline and Fixed) ---------- */

const ThreadScrollToBottom: FC = () => {
  return (
    <ThreadPrimitive.ScrollToBottom asChild>
      <TooltipIconButton
        tooltip="Aller en bas"
        variant="outline"
        className="absolute -top-16 left-1/2 -translate-x-1/2 z-20 rounded-full border shadow-md bg-background/80 backdrop-blur disabled:invisible hover:bg-muted"
      >
        <ArrowDownIcon className="h-4 w-4" />
      </TooltipIconButton>
    </ThreadPrimitive.ScrollToBottom>
  );
};

const Composer: FC = () => {
  return (
    <>
      <ThreadScrollToBottom />
      <ComposerPrimitive.Root className="relative flex w-full flex-col rounded-3xl border border-border/40 bg-background/80 backdrop-blur-xl px-2 pt-2 shadow-xl ring-1 ring-black/5 dark:ring-white/10 transition-shadow focus-within:shadow-blue-500/20">
        <ComposerAttachments />

        <div className="flex items-end gap-2 p-2">
          <div className="mb-1">
            <ComposerAddAttachment />
          </div>

          <ComposerPrimitive.Input
            placeholder="Pose ta question de maths..."
            className="flex-1 max-h-40 min-h-[44px] resize-none bg-transparent px-2 py-3 text-base outline-none placeholder:text-muted-foreground/70"
            rows={1}
            autoFocus
          />

          <div className="mb-1">
            <ComposerAction />
          </div>
        </div>
      </ComposerPrimitive.Root>
    </>
  );
};

const ComposerAction: FC = () => {
  return (
    <>
      <ThreadPrimitive.If running={false}>
        <ComposerPrimitive.Send asChild>
          <Button
            size="icon"
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white h-10 w-10 shadow-md transition-transform hover:scale-105"
          >
            <SendHorizontal className="h-5 w-5 ml-0.5" />
          </Button>
        </ComposerPrimitive.Send>
      </ThreadPrimitive.If>

      <ThreadPrimitive.If running>
        <ComposerPrimitive.Cancel asChild>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full h-10 w-10 border border-border"
          >
            <Square className="h-3.5 w-3.5 fill-foreground" />
          </Button>
        </ComposerPrimitive.Cancel>
      </ThreadPrimitive.If>
    </>
  );
};

/* ---------- Messages (Assistant + User) ---------- */

const MessageError: FC = () => {
  return (
    <MessagePrimitive.Error>
      <ErrorPrimitive.Root className="mt-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-200">
        <ErrorPrimitive.Message />
      </ErrorPrimitive.Root>
    </MessagePrimitive.Error>
  );
};

const AssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="group/message relative w-full py-6">
      <div className="flex w-full gap-4">
        {/* Avatar */}
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/20">
          <Sparkles className="h-4 w-4 text-white" />
        </div>

        <div className="flex-1 space-y-2 overflow-hidden">
          <div className="prose prose-neutral dark:prose-invert max-w-none leading-7 text-foreground/90">
            <MessagePrimitive.Parts
              components={{
                Text: MarkdownText,
                tools: { Fallback: ToolFallback },
              }}
            />
          </div>
          <MessageError />
          
          {/* Action Bar (hidden until hover) */}
          <div className="opacity-0 transition-opacity group-hover/message:opacity-100 pt-1">
            <AssistantActionBar />
          </div>
        </div>
      </div>
    </MessagePrimitive.Root>
  );
};

const AssistantActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      className="flex gap-1"
    >
      <ActionBarPrimitive.Copy asChild>
        <TooltipIconButton tooltip="Copier" variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
          <MessagePrimitive.If copied>
            <CheckIcon className="h-3.5 w-3.5" />
          </MessagePrimitive.If>
          <MessagePrimitive.If copied={false}>
            <CopyIcon className="h-3.5 w-3.5" />
          </MessagePrimitive.If>
        </TooltipIconButton>
      </ActionBarPrimitive.Copy>
      <ActionBarPrimitive.Reload asChild>
        <TooltipIconButton tooltip="Régénérer" variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
          <RefreshCwIcon className="h-3.5 w-3.5" />
        </TooltipIconButton>
      </ActionBarPrimitive.Reload>
    </ActionBarPrimitive.Root>
  );
};

const UserMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="group/message flex w-full flex-col items-end py-6">
      <div className="flex max-w-[85%] flex-col items-end gap-2">
        <div className="relative rounded-[20px] rounded-tr-sm bg-blue-600 px-5 py-3 text-white shadow-md">
          <MessagePrimitive.Content />
        </div>
        <UserMessageAttachments />
      </div>
      <div className="mt-2 opacity-0 transition-opacity group-hover/message:opacity-100">
        <UserActionBar />
      </div>
    </MessagePrimitive.Root>
  );
};

const UserActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      className="flex flex-col items-end"
    >
      <ActionBarPrimitive.Edit asChild>
        <TooltipIconButton
          tooltip="Modifier"
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground"
        >
          <PencilIcon className="h-3 w-3" />
        </TooltipIconButton>
      </ActionBarPrimitive.Edit>
    </ActionBarPrimitive.Root>
  );
};

const EditComposer: FC = () => {
  return (
    <div className="my-4 w-full rounded-xl bg-muted/50 p-4">
      <ComposerPrimitive.Root className="flex w-full flex-col gap-2">
        <ComposerPrimitive.Input
          className="flex min-h-[60px] w-full resize-none bg-transparent outline-none placeholder:text-muted-foreground"
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <ComposerPrimitive.Cancel asChild>
            <Button variant="ghost" size="sm">Annuler</Button>
          </ComposerPrimitive.Cancel>
          <ComposerPrimitive.Send asChild>
            <Button size="sm">Mettre à jour</Button>
          </ComposerPrimitive.Send>
        </div>
      </ComposerPrimitive.Root>
    </div>
  );
};

const BranchPicker: FC<BranchPickerPrimitive.Root.Props> = ({
  className,
  ...rest
}) => {
  return (
    <BranchPickerPrimitive.Root
      hideWhenSingleBranch
      className={cn(
        "inline-flex items-center text-xs text-muted-foreground",
        className,
      )}
      {...rest}
    >
      <BranchPickerPrimitive.Previous asChild>
        <TooltipIconButton tooltip="Précédent">
          <ChevronLeftIcon />
        </TooltipIconButton>
      </BranchPickerPrimitive.Previous>
      <span className="font-medium">
        <BranchPickerPrimitive.Number /> / <BranchPickerPrimitive.Count />
      </span>
      <BranchPickerPrimitive.Next asChild>
        <TooltipIconButton tooltip="Suivant">
          <ChevronRightIcon />
        </TooltipIconButton>
      </BranchPickerPrimitive.Next>
    </BranchPickerPrimitive.Root>
  );
};
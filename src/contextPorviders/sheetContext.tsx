"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { isEqual } from "lodash";
import { useTranslations } from "next-intl";

import React, { createContext, useEffect, useState } from "react";

export type TSheetContextType = {
  open: () => void;
  isOpen: boolean;
  close: () => void;
  setSheetContent: (props: SetSheetContentProps) => void;
};

export const SheetContext = createContext<TSheetContextType | null>(null);

type SetSheetContentProps = {
  side: "bottom" | "top" | "left" | "right";
  content?: React.ReactNode;
  slug?: string;
  title?: string;
  subtitle?: string;
};

export default function SheetContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations() as any;
  const [state, setState] = useState<SetSheetContentProps>({
    side: "bottom",
    title: undefined,
    slug: undefined,
    subtitle: undefined,
    content: undefined,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  function setSheetContent(props: SetSheetContentProps) {
    if (isEqual(props, state)) setIsOpen(true);
    else setIsOpen(false);
    setState(props);
  }

  function close() {
    setIsOpen(false);
  }

  function open() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (state.title || state.content || state.slug) setIsOpen(true);
  }, [state]);

  const titleSlug = `sheets.${state.slug}.title`;
  const subtitleSlug = `sheets.${state.slug}.subtitle`;

  const title = t(titleSlug) === titleSlug ? state.title : t(titleSlug);
  const subtitle =
    t(subtitleSlug) === subtitleSlug ? state.subtitle : t(subtitleSlug);

  return (
    <SheetContext.Provider
      value={{
        open,
        isOpen,
        close,
        setSheetContent,
      }}
    >
      {children}

      <Sheet
        open={isOpen}
        onOpenChange={(state) => {
          setIsOpen(state);
        }}
      >
        <SheetContent side={state.side}>
          {(title || subtitle) && (
            <SheetHeader>
              {title && <SheetTitle>{title}</SheetTitle>}
              {subtitle && <SheetDescription>{subtitle}</SheetDescription>}
            </SheetHeader>
          )}
          <div
            className={cn(
              "h-full",
              state.side === "bottom" &&
                "max-h-[calc(100svh-123px)] overflow-y-auto overflow-x-hidden",
            )}
          >
            {state.content && <>{state.content}</>}
          </div>
        </SheetContent>
      </Sheet>
    </SheetContext.Provider>
  );
}

"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "./separator";
import IconX from "@/icons/x";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed top-0 left-0 w-full h-full inset-0 z-50 bg-[#000000] opacity-50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "relative z-50 gap-4 bg-background px-6 py-4 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "w-full max-w-2xl h-min data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top rounded-b-lg",
        bottom:
          "w-full max-w-2xl max-h-[calc(100svh-50px)] h-min data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom rounded-t-lg",
        left: "h-full w-3/4 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm rounded-r-lg",
        right:
          "h-full w-3/4 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm rounded-l-lg",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

const sheetContainerVariants = cva("fixed inset-0 z-50 w-full h-full flex", {
  variants: {
    side: {
      top: "items-start justify-center",
      bottom: "items-end justify-center",
      left: "items-start justify-start",
      right: "items-start justify-end",
    },
  },
  defaultVariants: {
    side: "right",
  },
});

const SheetClose = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Close>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Close
    ref={ref}
    className={cn(
      "absolute top-4 right-4 inline-flex items-center justify-center rounded-full p-1",
      "focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
      className,
    )}
    {...props}
  >
    <IconX />
    <span className="sr-only">Close</span>
  </SheetPrimitive.Close>
));
SheetClose.displayName = SheetPrimitive.Close.displayName;

const SheetCloseTrigger = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Close>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Close
    ref={ref}
    className={cn("w-full", className)}
    {...props}
  >
    {props.children}
  </SheetPrimitive.Close>
));
SheetCloseTrigger.displayName = SheetPrimitive.Close.displayName;

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
  VariantProps<typeof sheetVariants> { }

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetOverlay>
    <SheetPortal>
      {/* <div className="fixed w-full h-full z-50 bg-[#000000] opacity-50 top-0 left-0" /> */}
      <div className={cn(sheetContainerVariants({ side }))}>
        <SheetPrimitive.Content
          ref={ref}
          className={cn(sheetVariants({ side }), className)}
          {...props}
        >
          {children}
          {side === "bottom" && (
            <>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 rounded-full bg-[#D9D9D9] h-1 w-12" />
              <SheetClose></SheetClose>
            </>
          )}
        </SheetPrimitive.Content>
      </div>
    </SheetPortal>
  </SheetOverlay>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div>
    <div
      className={cn("flex flex-col space-y-2 text-left", className)}
      {...props}
    />
    <Separator className="mt-4 mb-2" />
  </div>
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    // add ml-8 to the title when the side is bottom
    className={cn("text-xl font-semibold text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetClose,
  SheetCloseTrigger,
  SheetDescription,
};

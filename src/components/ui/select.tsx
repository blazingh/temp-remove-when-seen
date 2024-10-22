"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";
import IconChevron from "@/icons/chevron";
import { Label } from "./label";

const Select = SelectPrimitive.Root;

// const Select: React.FC<SelectPrimitive.SelectProps> = (props) => {
//   const [isOpen, setIsOpen] = React.useState(false);
//   return (
//     <SelectContext.Provider value={setIsOpen}>
//       <SelectPrimitive.Root open={isOpen} onOpenChange={setIsOpen} {...props} />
//     </SelectContext.Provider>
//   )
// };

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    required?: boolean;
    icon?: React.ReactNode;
    hideChevron?: boolean;
    placeholderClassName?: string;
  }
>(
  (
    {
      className,
      placeholderClassName,
      required,
      icon,
      children,
      hideChevron,
      ...props
    },
    ref,
  ) => {
    return (
      <SelectPrimitive.Trigger
        ref={ref}
        style={{ borderWidth: "1px" }}
        className={cn(
          "group flex h-12 w-full items-center justify-between border-foreground br-1 rounded-lg border outline-none text-foreground focus-visible:outline-none bg-bg-accent px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 relative gap-2 text-ellipsis overflow-hidden whitespace-nowrap",
          props.placeholder === "" && "",
          className,
        )}
        {...props}
      >
        {icon && <div className="">{icon}</div>}
        <div className=" w-[calc(100%-20px)] pointer-events-none flex items-center text-[#000] text-md">
          <span
            data-id="selectbox-datas17"
            className={cn(
              props.placeholder &&
                props.placeholder !== "" &&
                "mt-4 w-[98%] overflow-hidden text-ellipsis whitespace-nowrap text-left",
            )}
          >
            {children}
          </span>
          {props.placeholder && props.placeholder !== "" && (
            <Label
              className={cn(
                `
            duration-200 rounded-md absolute -mt-10 text-gray-500 pt-4 ml-0 
            group-data-[placeholder]:text-base
            group-data-[placeholder]:-mt-4
            
            group-data-[placeholder]:text-black
            group-data-[state=open]:text-base
            group-data-[state=open]:-mt-10"
            `,
                placeholderClassName,
              )}
            >
              {props.placeholder}
            </Label>
          )}
          <span className="text-blue-600 absolute right-1 top-0">
            {required ? "*" : ""}{" "}
          </span>
          {/* {!hideChevron && (
            // <SelectPrimitive.Icon asChild>
            //   <IconChevron className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 " />
            // </SelectPrimitive.Icon>
          )} */}
        </div>
      </SelectPrimitive.Trigger>
    );
  },
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={(ref) =>
        ref?.addEventListener("touchend", (e) => {
          //          e.preventDefault();
        })
      }
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};

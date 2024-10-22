"use client";
import {
  SheetContext,
  TSheetContextType,
} from "@/contextPorviders/sheetContext";
import { Button, ButtonProps } from "../ui/button";
import { Ref, forwardRef, useContext } from "react";

type Props = ButtonProps & {
  sheetProps: Parameters<TSheetContextType["setSheetContent"]>[0];
};

const SheetContentTrigger = forwardRef(
  ({ sheetProps, ...props }: Props, ref: Ref<HTMLButtonElement>) => {
    const Sheet = useContext(SheetContext);
    return (
      <Button
        ref={ref}
        variant="child"
        onClick={() => {
          Sheet?.setSheetContent(sheetProps);
        }}
        {...props}
      >
        {props.children}
      </Button>
    );
  },
);
SheetContentTrigger.displayName = "SheetContentTrigger";
export default SheetContentTrigger;

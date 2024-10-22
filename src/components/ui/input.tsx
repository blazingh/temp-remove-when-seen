import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps & { placeholderClassname?: string }>(
  ({ className, placeholder, placeholderClassname, required, type, ...props }, ref) => {
    const generated_id = props.id || String(Math.floor(Math.random() * 100));
    return (
      <div className="relative w-full">
        <input
          id={generated_id}
          type={type}
          autoComplete="on"
          placeholder=" "
          className={cn(
            "peer bg-white flex h-10 w-full rounded-md bg-background focus:bg-background border border-[#DBD1F8] focus:border px-4 pt-4 ring-offset-background font-medium h-14 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <label
          htmlFor={generated_id}
          className={cn(
            "pointer-events-none duration-200 absolute ml-4 text-[#757575] top-2 text-xs translate-y-0 font-semibold peer-focus:top-2 peer-focus:text-xs peer-focus:translate-y-0 peer-focus:text-black peer-focus:font-semibold peer-placeholder-shown:top-[50%] peer-placeholder-shown:text-base peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-foreground peer-placeholder-shown:font-medium peer-placeholder-shown:text-[#757575]",
            placeholderClassname
          )}
        >
          {placeholder}
        </label>
        <span className="text-blue-600 absolute right-1 top-0">
          {required ? "*" : ""}
        </span>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };

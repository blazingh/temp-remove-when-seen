"use client";

// eslint-disable-next-line
import Link, { LinkProps } from "next/link";
import { useSearchParams } from "next/navigation";
import { PropsWithChildren } from "react";

const RetainQueryLink = ({ href, ...props }: LinkProps & PropsWithChildren) => {
  const searchParams = useSearchParams();

  return (
    <Link
      {...props}
      href={
        `${href}${searchParams.toString() ? `?${searchParams.toString()}` : ""}` as any
      }
    />
  );
};
export default RetainQueryLink;

import React from "react";

function IconX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill="currentColor"
        d="M.48 15.52c.32.32.746.48 1.12.48.374 0 .8-.16 1.12-.48L8 10.24l5.28 5.28c.32.32.747.48 1.12.48.373 0 .8-.16 1.12-.48.64-.64.64-1.653 0-2.24L10.24 8l5.28-5.28c.64-.64.64-1.653 0-2.24-.64-.64-1.654-.64-2.24 0L8 5.76 2.72.48C2.08-.16 1.067-.16.48.48c-.64.64-.64 1.653 0 2.24L5.76 8 .48 13.28c-.64.64-.64 1.653 0 2.24z"
      ></path>
    </svg>
  );
}

export default IconX;

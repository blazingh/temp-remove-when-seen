import React from "react";

function IconCurrency(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect width="22" height="22" x="1" y="1" fill="#fff" rx="11"></rect>
      <rect
        width="22"
        height="22"
        x="1"
        y="1"
        stroke="currentColor"
        strokeWidth="2"
        rx="11"
      ></rect>
      <path
        fill="currentColor"
        d="M12.445 8.322v1.243H10.4V16H8.86V9.565H6.813V8.322h5.632zm2.344 6.457h2.53V16h-4.07V8.322h1.54v6.457z"
      ></path>
    </svg>
  );
}

export default IconCurrency


import React from "react";

function IconChevron(props: React.SVGProps<SVGSVGElement>) {
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
        fillRule="evenodd"
        d="M9.37 12.43c-.758.76-1.982.76-2.74 0L.576 6.37a1.985 1.985 0 010-2.8c.76-.76 1.983-.76 2.742 0l4.678 4.69 4.684-4.69c.76-.76 1.983-.76 2.742 0 .77.77.77 2.029 0 2.8L9.37 12.43z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default IconChevron;

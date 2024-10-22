import React from "react";

function IconFlagsGermany(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 640 480"
      {...props}
    >
      <path fill="#fc0" d="M0 320h640v160H0z"></path>
      <path fill="#000001" d="M0 0h640v160H0z"></path>
      <path fill="red" d="M0 160h640v160H0z"></path>
    </svg>
  );
}

export default IconFlagsGermany;

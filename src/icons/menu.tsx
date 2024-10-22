import * as React from "react";
const IconMenu = (props: any) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.5 6C3.5 5.17157 4.17157 4.5 5 4.5H19C19.8284 4.5 20.5 5.17157 20.5 6C20.5 6.82843 19.8284 7.5 19 7.5H5C4.17157 7.5 3.5 6.82843 3.5 6Z"
      fill="currentColor"
    />
    <rect x={3.5} y={10.5} width={17} height={3} rx={1.5} fill="currentColor" />
    <rect x={3.5} y={16.5} width={17} height={3} rx={1.5} fill="currentColor" />
  </svg>
);
export default IconMenu;
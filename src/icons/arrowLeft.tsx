import * as React from "react";
const SVGComponent = (props: any) => (
  <svg
    width={10}
    height={16}
    viewBox="0 0 10 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.57018 9.37079C-0.19006 8.61163 -0.19006 7.38838 0.57018 6.62921L6.63079 0.577205C7.40149 -0.192402 8.65912 -0.192402 9.42982 0.577205C10.1901 1.33637 10.1901 2.55962 9.42982 3.31878L4.73939 7.99745L9.42982 12.6812C10.1901 13.4404 10.1901 14.6636 9.42982 15.4228C8.65912 16.1924 7.40149 16.1924 6.63079 15.4228L0.57018 9.37079Z"
      fill="currentColor"
    />
  </svg>
);
export default SVGComponent;
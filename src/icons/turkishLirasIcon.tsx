import * as React from "react";
const SVGComponent = (props : any) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={1} y={1} width={22} height={22} rx={11} fill="white" />
    <rect
      x={1}
      y={1}
      width={22}
      height={22}
      rx={11}
      stroke="#212121"
      strokeWidth={2}
    />
    <path
      d="M12.4453 8.322V9.565H10.3993V16H8.85927V9.565H6.81327V8.322H12.4453ZM14.7889 14.779H17.3189V16H13.2489V8.322H14.7889V14.779Z"
      fill="#212121"
    />
  </svg>
);
export default SVGComponent;

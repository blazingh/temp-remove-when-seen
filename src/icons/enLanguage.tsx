import * as React from "react";
const SVGComponent = (props: any) => (
    <svg
        width={24}
        height={24}
        viewBox="0 0 22 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <rect
            x={0.85}
            y={0.943018}
            width={20.3}
            height={20.3}
            rx={10.15}
            fill="white"
        />
        <rect
            x={0.85}
            y={0.943018}
            width={20.3}
            height={20.3}
            rx={10.15}
            stroke="#212121"
            strokeWidth={2}
        />
        <path
            d="M6.48732 8.65802V10.583H9.07232V11.804H6.48732V13.839H9.40232V15.093H4.94732V7.40402H9.40232V8.65802H6.48732ZM17.0488 15.093H15.5088L12.0218 9.82402V15.093H10.4818V7.40402H12.0218L15.5088 12.684V7.40402H17.0488V15.093Z"
            fill="#212121"
        />
    </svg>
);
export default SVGComponent;

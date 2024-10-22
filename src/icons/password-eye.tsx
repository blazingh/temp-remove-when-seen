import React from "react";

function IconPasswordEye(props: React.SVGProps<SVGSVGElement> & { active: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 4.291c4.81 0 9.254 2.76 11.77 7.294L24 12l-.23.416c-2.515 4.534-6.96 7.293-11.77 7.293S2.745 16.95.23 12.416L0 12l.23-.415C2.745 7.05 7.19 4.29 12 4.29zm0 1.713c-3.93 0-7.6 2.137-9.869 5.73L1.968 12l.163.266c2.269 3.593 5.94 5.73 9.869 5.73 4.026 0 7.779-2.243 10.032-5.996C19.777 8.246 16.026 6.004 12 6.004zm0 1.713a4.283 4.283 0 110 8.566 4.283 4.283 0 010-8.566zm0 1.713a2.57 2.57 0 100 5.14 2.57 2.57 0 000-5.14z"
      ></path>
      {props.active === false && (
        <rect
          width="28.68"
          height="2.5"
          x="1.227"
          y="21.503"
          fill="currentColor"
          stroke="transparent"
          strokeWidth="0.5"
          rx="1.25"
          transform="rotate(-45 1.227 21.503)"
        ></rect>
      )}
    </svg>
  );
}

export default IconPasswordEye;

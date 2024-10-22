import React from "react";

function IconProfile(props: React.SVGProps<SVGSVGElement>) {
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
        stroke="currentColor"
        d="M6 7a6 6 0 1012.002-.002A6 6 0 006 7zm10.435 0A4.431 4.431 0 0112 11.435 4.431 4.431 0 017.565 7 4.431 4.431 0 0112 2.565 4.431 4.431 0 0116.435 7zM21.468 22.565c.22.406.741.55 1.125.32.385-.233.522-.755.302-1.19C20.672 17.58 16.501 15 12 15c-4.5 0-8.672 2.58-10.895 6.696-.22.405-.083.956.302 1.188a.743.743 0 00.411.116.789.789 0 00.714-.435C4.48 18.971 8.102 16.74 12 16.74c3.897 0 7.52 2.232 9.468 5.826h0z"
      ></path>
    </svg>
  );
}

export default IconProfile;


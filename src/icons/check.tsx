import React from 'react';

function IconCheck(props: React.SVGProps<SVGSVGElement>) {
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
        d="M12.077 1C5.967 1 1 5.967 1 12.077s4.967 11.077 11.077 11.077 11.077-4.967 11.077-11.077S18.187 1 12.077 1zm0 20.801c-5.364 0-9.724-4.36-9.724-9.724s4.36-9.724 9.724-9.724 9.724 4.36 9.724 9.724-4.36 9.724-9.724 9.724z"
      ></path>
      <path
        fill="currentColor"
        stroke="currentColor"
        d="M16.65 8.25l-6.164 6.681-3.137-3.4a.752.752 0 00-1.119 0 .913.913 0 000 1.213l3.686 3.994a.767.767 0 00.57.262c.22 0 .417-.095.57-.262l6.714-7.276a.913.913 0 000-1.212c-.307-.333-.79-.333-1.12 0z"
      ></path>
    </svg>
  );
}

export default IconCheck;

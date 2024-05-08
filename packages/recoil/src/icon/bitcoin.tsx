import React from "react";
import type { SVGProps } from "react";

export function BitcoinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="currentColor">
        <path d="M20.247 14.052a8.502 8.502 0 0 1-10.302 6.194C5.394 19.11 2.62 14.5 3.754 9.95c1.134-4.551 5.74-7.33 10.288-6.195c4.562 1.12 7.337 5.744 6.205 10.298Z"></path>
        <path
          strokeLinecap="square"
          strokeLinejoin="round"
          d="m9.4 14.912l1.693-6.792m-1.456-.363L13.818 8.8c2.728.68 2.12 3.877-.786 3.153c3.184.794 2.86 4.578-.907 3.639c-1.841-.46-3.813-.95-3.813-.95m1.994-3.368l2.669.665m-1.397-3.698l.363-1.455m-2.42 9.703l.363-1.456m3.634-6.308l.363-1.455m-2.419 9.703l.363-1.456"
        ></path>
      </g>
    </svg>
  );
}

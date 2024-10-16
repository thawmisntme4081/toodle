import type { SVGProps } from 'react'

export function IconXCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <circle cx={12} cy={12} r={10}></circle>
        <path d="m15 9l-6 6m0-6l6 6"></path>
      </g>
    </svg>
  )
}

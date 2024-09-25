import type { SVGProps } from 'react'

export function IconCircleUser(props: SVGProps<SVGSVGElement>) {
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
        <path d="M18 20a6 6 0 0 0-12 0"></path>
        <circle cx={12} cy={10} r={4}></circle>
        <circle cx={12} cy={12} r={10}></circle>
      </g>
    </svg>
  )
}

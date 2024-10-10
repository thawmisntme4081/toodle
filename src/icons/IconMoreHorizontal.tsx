import type { SVGProps } from 'react'

export function IconMoreHorizontal(props: SVGProps<SVGSVGElement>) {
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
        <circle cx={12} cy={12} r={1}></circle>
        <circle cx={19} cy={12} r={1}></circle>
        <circle cx={5} cy={12} r={1}></circle>
      </g>
    </svg>
  )
}

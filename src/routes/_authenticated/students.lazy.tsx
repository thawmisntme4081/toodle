import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/students')({
  component: () => <div>Hello /_authenticated/students!</div>,
})

import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/parents')({
  component: () => <div>Hello /_authenticated/parents!</div>,
})

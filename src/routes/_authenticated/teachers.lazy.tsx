import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/teachers')({
  component: () => <div>Hello /_authenticated/teachers!</div>,
})

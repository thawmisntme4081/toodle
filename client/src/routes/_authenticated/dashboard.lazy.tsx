import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/dashboard')({
  component: () => (
    <div className="grid md:flex gap-3">
      <div className="h-40 w-40 bg-red-500"></div>
      <div className="h-40 w-40 bg-red-500"></div>
      <div className="h-40 w-40 bg-red-500"></div>
      <div className="h-40 w-40 bg-red-500"></div>
    </div>
  ),
})

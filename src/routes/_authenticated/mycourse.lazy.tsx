import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/mycourse')({
  component: MyCourse,
})

function MyCourse() {
  return (
    <div>
        <div>Hello from About!</div>
    </div>
  )
}

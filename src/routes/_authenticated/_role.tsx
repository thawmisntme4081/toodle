import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_role')({
  beforeLoad: async ({ context }) => {
    const { checkRole } = context.role

    if (!checkRole()) {
      throw redirect({
        to: '/dashboard',
      })
    }
  },
})

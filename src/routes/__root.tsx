import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import ModalProvider from '@/containers/Modal/ModalProvider'

export const Route = createRootRoute({
  component: () => {
    return (
      <div className="min-h-screen bg-slate-100">
        <Outlet />
        <ModalProvider />
        {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
      </div>
    )
  },
})

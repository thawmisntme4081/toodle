import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { AuthContext } from '@/hooks/useAuth.hook'
import { RoleContext } from '@/hooks/useRole.hook'

type RouteContext = {
  auth: AuthContext
  role: RoleContext
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: () => {
    return (
      <div className="min-h-screen bg-slate-100">
        <Outlet />
        {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
      </div>
    )
  },
})

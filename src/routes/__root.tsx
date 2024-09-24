import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { AuthContext } from '@/hooks/useAuth.hook'

type RouteContext = {
  auth: AuthContext
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: () => (
    <div className="min-h-screen bg-slate-100">
      <Outlet />
      {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
    </div>
  ),
})

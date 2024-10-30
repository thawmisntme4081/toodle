import { createRouter, RouterProvider } from '@tanstack/react-router'
import { Toaster } from 'sonner'

import ErrorPage from '@/containers/ErrorPage'
import NotFound from '@/containers/NotFound'

import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
  defaultErrorComponent: ({ error }) => <ErrorPage error={error} />,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors closeButton position="top-right" />
    </>
  )
}

export default App

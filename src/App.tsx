import { createRouter, RouterProvider } from '@tanstack/react-router'
import { Toaster } from 'sonner'

import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
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

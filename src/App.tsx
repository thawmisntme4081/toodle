import { createRouter, RouterProvider } from '@tanstack/react-router'
import { Toaster } from 'sonner'

import ModalProvider from '@/containers/Modal/ModalProvider'
import { useAuth } from '@/hooks/useAuth.hook'

import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
  context: { auth: undefined! },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App = () => {
  const auth = useAuth()

  return (
    <>
      <RouterProvider router={router} context={{ auth }} />
      <Toaster richColors closeButton position="top-right" />
      <ModalProvider />
    </>
  )
}

export default App

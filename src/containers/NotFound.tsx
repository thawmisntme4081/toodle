import { Link } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'

const NotFound = () => {
  return (
    <div className="text-center text-white pt-20 bg-[#2f3349] h-screen">
      <p className="text-4xl font-bold">404</p>
      <p className="text-lg mb-4">Page not found</p>
      <Button asChild>
        <Link to="/">Go back</Link>
      </Button>
    </div>
  )
}

export default NotFound

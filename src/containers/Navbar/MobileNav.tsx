import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu as MenuIcon } from 'lucide-react'
import Navbar from './Navbar'

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent className='w-fit bg-primary m-0 p-0 border-0' side="left">
        <Navbar />
      </SheetContent>
    </Sheet>
  )
}

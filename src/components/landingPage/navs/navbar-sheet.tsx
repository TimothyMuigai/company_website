'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ChevronDown, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function NavbarSheet() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <Menu size={20} className="" />
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-black text-white">
          <SheetHeader className="flex flex-row items-center space-x-2 mb-2">
            <SheetTitle className="text-white flex">deeptrack</SheetTitle>
            <Image src={'/deeptrack-favicon.ico'} className="grayscale" width={30} height={30} alt="Logo" />
          </SheetHeader>
          <hr />
          <div className="flex flex-col space-y-6 mt-6">
            {/* Solutions dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2">
                <span>Solutions</span> <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Our Solutions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link href='/solution/image-authentication'>Image Authentication</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href='/solution/audio-authentication'>Audio Authentication</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href='/solution/gotham'>Gotham</Link></DropdownMenuItem>
                
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Use Cases dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2">
                <span>Use Cases</span> <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Our Use Cases</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link href='/media-use-case'>Media Use Case</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href='/finance-use-case'>Finance Use Case</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href='/government-use-case'>Government Use Case</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href='/executive-identity-shielding'>Executive Identity Shielding</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Support and Blog */}
            <Link href='/events'>Blog & Research</Link>
            <Link href='/news'>News Center</Link>
            <Link href='/investor-relations'>Investor Relations</Link>

            <Button>
              Get started
            </Button>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button className="absolute bottom-4">
                <X />
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}

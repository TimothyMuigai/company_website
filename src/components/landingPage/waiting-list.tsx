/*eslint-disable */

'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { MoveUpRight } from 'lucide-react'
import { Button } from '../ui/button'
import WaitlistForm from './waitlist-form';
import { usePathname } from 'next/navigation';

interface WaitlistButtonProps {
  id?: string;
}

export function WaitlistButton({ id }: WaitlistButtonProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='flex mt-2'>
          <Button
            id={id}
            variant="outline"
            className={
              isHome
                ? `
        inline-flex items-center justify-center rounded-md
              bg-[#0A1015] px-5 py-3 text-sm font-medium text-white
              hover:bg-gray-700 transition
              w-full sm:w-auto
      `
                : `
        flex items-center gap-2 p-5
        bg-[#001d2c96] hover:bg-[#001d2c5a]
        text-white border
        rounded-lg
        transition-all duration-200
        group
      `
            }
            style={
              !isHome
                ? {
                  boxShadow:
                    "2px 2px 5px 0px rgba(0,0,0,0.25), -2px -2px 5px 0px rgba(0,0,0,0.25)",
                  backdropFilter: "blur(32px)",
                }
                : undefined
            }
          >
            {isHome ? "See How it Works" : "Book a demo"}
            {/* <MoveUpRight className="w-4 h-4  text-black transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /> */}
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:m-2 bg-white text-black">
        <DialogHeader>
          <DialogTitle>Book a demo</DialogTitle>
          <DialogDescription>
            Click submit when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <WaitlistForm />
      </DialogContent>
    </Dialog>
  )
}

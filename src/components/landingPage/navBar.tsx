"use client"
import Link from 'next/link';
import Image from 'next/image';
import { NavbarSheet } from './navbar-sheet';
import { Button } from '../ui/button';
import {Navigation} from './navigation';
import { usePathname } from 'next/navigation';

export function Navbar() {
    const pathname = usePathname();
    const isHome = pathname === '/';

  return (
    <nav className={`
        w-full z-0 transition-colors duration-300
        ${isHome
        ? 'bg-transparent text-white'
        : 'text-black border-b border-gray-600'}
    `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">

          {/* LEFT */}
          <div className="flex items-center gap-10">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">deeptrack</span>
                <Image
                    src={isHome
                        ? '/deeptrack-favicon.ico'
                        : '/Group.png'
                    }
                    className="grayscale"
                    width={30}
                    height={30}
                    alt="Logo"
                />
              </div>
            </Link>
            <span className="hidden md:inline text-gray-500">|</span>
          </div>

          {/* CENTER */}
          <div className="flex flex-1 justify-center">
            <div className="hidden md:block">
              <Navigation isHome={isHome}/>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex">
            <Button className={`
                hidden md:inline-flex
                rounded-md
                px-4 py-2
                text-sm
                backdrop-blur-md
                transition
                ${isHome ? 'text-white bg-white/20 hover:bg-white/30': 'text-black bg-[#0191DA66] hover:bg-[#0000000A]'}

            `}
            >
              Get started
            </Button>
          </div>

          {/* MOBILE */}
          <div className="-mr-2 flex md:hidden">
            <NavbarSheet />
          </div>
        </div>
      </div>
    </nav>
  )
}
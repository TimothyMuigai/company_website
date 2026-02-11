'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import React from 'react'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  isHome: boolean
}

export default function NavLink({ href, children, isHome }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  const textColor = isHome ? 'text-white' : 'text-black'
  const underlineColor = isHome ? 'bg-white' : 'bg-black'

  return (
    <Link
      href={href}
      className={cn(
        'group relative py-2 text-sm font-medium transition-colors',
        textColor
      )}
    >
      {children}

      <span
        className={cn(
          'absolute -bottom-1 left-0 h-[2px] w-full transition-transform duration-300 origin-left',
          underlineColor,
          isActive
            ? 'scale-x-100'
            : 'scale-x-0 group-hover:scale-x-100'
        )}
      />
    </Link>
  )
}

'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import Image from 'next/image'
import NavLink from './navLink'
import { usePathname } from 'next/navigation'

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'



const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Media Use Case',
    href: '/use-cases/media-use-case',
    description: 'Precision deepfake detection for images, audio and video content.',
  },
  {
    title: 'Finance Use Case',
    href: '/use-cases/finance-use-case',
    description: 'Real-time risk assessment and fraud prevention.',
  },
  {
    title: 'Government Use Case',
    href: '/use-cases/government-use-case',
    description: 'AI-driven solutions for public sector challenges.',
  },
  //added use case for executive identity shielding
  {
    title: 'Executive Identity Shielding',
    href: '/use-cases/executive-identity-shielding',
    description: 'Securely shield your executive identity.',
  },
  // NEW: Insurance Use Case
  {
    title: 'Insurance Use Case',
    href: '/use-cases/insurance-use-case',
    description: 'AI-powered fraud detection for automotive claims and deepfake prevention.',
  }

]

export function Navigation({ isHome }: { isHome: boolean }) {
  const pathname = usePathname()
  
  const isSolutionsActive = pathname.startsWith('/solution');
  const isUseCasesActive = pathname.startsWith('/use-cases');

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList className="space-x-6">
          {/* Solutions menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger isHome={isHome} isActive={isSolutionsActive}>Solutions</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        <Image src={'/logos/deeptrack-high-resolution-logo-black-transparent.png'} width={200} height={50} alt="Logo" />
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Use AI to detect deepfakes. deeptrack is model agnostic
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/solution/image-authentication" title="Image Authentication">
                  Verify image authenticity and detect manipulations using advanced AI analysis.
                </ListItem>
                <ListItem href="/solution/audio-authentication" title="Audio Authentication">
                  Detect deepfakes and verify audio recordings with voice analysis technology.
                </ListItem>
                <ListItem href="/solution/gotham" title="Gotham">
                  Gotham Enterprise — media verification SaaS for enterprises. Verify media at scale with credit-based scans and detailed reports.
                </ListItem>

              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Use Cases menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger 
              isHome={isHome} 
              isActive={isUseCasesActive}
            >
              Use Cases
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-5"> {/* Changed from row-span-4 to row-span-5 */}
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        <Image src={'/logos/deeptrack-high-resolution-logo-black-transparent.png'} width={200} height={50} alt="Logo" />
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Use AI to detect deepfakes. deeptrack is model agnostic
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Blog & Research link */}

          <NavigationMenuLink asChild>
            <NavLink href="/blog" isHome={isHome}>
              Blog & Research
            </NavLink>
          </NavigationMenuLink>


          {/* News Center link */}

          <NavigationMenuLink asChild>
            <NavLink href="/news" isHome={isHome}>
              News Center
            </NavLink>
          </NavigationMenuLink>


          {/* About */}

          <NavigationMenuLink asChild>
            <NavLink href="/about" isHome={isHome}>
              About
            </NavLink>
          </NavigationMenuLink>


          {/* Careers */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <NavLink href="/careers" isHome={isHome}>
                Careers
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Contact */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <NavLink href="/contact" isHome={isHome}>
                Contact
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>
    </>
  )
}
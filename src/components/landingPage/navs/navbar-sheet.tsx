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
import { RequestAccessModal } from '@/components/layout/RequestAccessModal'

export function NavbarSheet() {
  const [showPitchDeckModal, setShowPitchDeckModal] = useState(false)
  const [showCapTableModal, setShowCapTableModal] = useState(false)
  const [showCompetitionAnalysisModal, setshowCompetitionAnalysisModal] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)


  // Handle opening and closing of the sheet and modals
  const handleInvestorRelationsClick = (modalType: 'pitchDeck' | 'capTable' | 'competition') => {
    setIsSheetOpen(false) // Close the sheet
    if (modalType === 'pitchDeck') {
      setShowPitchDeckModal(true) // Open Pitch Deck Modal
    } else if (modalType === 'capTable') {
      setShowCapTableModal(true) // Open Cap Table Modal
    }
    else if (modalType === 'competition') {
      setshowCompetitionAnalysisModal(true) // Open Competition analysis Modal
    }
  }

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
                <DropdownMenuItem><Link href='/use-case/media-use-case'>Media Use Case</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href='/use-case/finance-use-case'>Finance Use Case</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href='/use-case/government-use-case'>Government Use Case</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href='/use-case/executive-identity-shielding'>Executive Identity Shielding</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Support and Blog */}
            <Link href='/events'>Blog & Research</Link>
            <Link href='/news'>News Center</Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2">
                <span>Investor Relations</span> <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>Investor Materials</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => handleInvestorRelationsClick("pitchDeck")}
                >
                  Request Pitch Deck
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handleInvestorRelationsClick("capTable")}
                >
                  Request Cap Table
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handleInvestorRelationsClick("competition")}
                >
                  Request Competition Analysis
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button>
              <Link href="https://gotham.deeptrack.io/signup" target="_blank" >
                  Get started
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Modals */}
      <RequestAccessModal
        isOpen={showPitchDeckModal}
        onClose={() => setShowPitchDeckModal(false)}
        title="Request Pitch Deck"
      />
      <RequestAccessModal
        isOpen={showCapTableModal}
        onClose={() => setShowCapTableModal(false)}
        title="Request Cap Table"
      />
      <RequestAccessModal
        isOpen={showCompetitionAnalysisModal}
        onClose={() => setshowCompetitionAnalysisModal(false)}
        title="Request Competition Analysis"
      />
    </>
  )
}

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

interface WaitlistButtonProps {
  id?: string;
}

export function WaitlistButton({id}: WaitlistButtonProps) {

// backdrop-filter: blur(32.400001525878906px)


  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='flex mt-2'>
          <Button 
            id={id} 
            variant="outline"
            className="
              flex items-center gap-2 p-5
              bg-[#001d2c96] hover:bg-[#001d2c5a]
              text-white border
              rounded-lg
              transition-all duration-200 
              group
            "
            style={{
              boxShadow:
                '2px 2px 5px 0px rgba(0,0,0,0.25), -2px -2px 5px 0px rgba(0,0,0,0.25)',
              backdropFilter: 'blur(32px)',
            }}
          >
            Book a demo
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
        
        <DialogFooter className='flex'>
          {/* Button to open Privacy Policy modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant={'link'} 
                className="text-blue-500 underline"
              >
                View Privacy Policy
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl bg-white text-black">
              <DialogHeader>
                <DialogTitle className='text-2xl font-bold mb-2'>Privacy Policy for deeptrack Solution Demo Bookings</DialogTitle>
              </DialogHeader>
              <div className="overflow-y-auto max-h-96">
                {/* Privacy Policy content */}
                <h2 className='text-xl font-bold mb-2'>Introduction</h2>
                <p className='mb-2'>
                  deeptrack Solution ("we," "our," "us") is committed to protecting
                  the privacy and personal information of users ("you," "your")
                  who book a demo for our product. This Privacy Policy outlines how
                  we collect, use, and safeguard your information when you interact
                  with us through our demo booking platform.
                </p>
                <h2 className='text-xl font-bold mb-2'>Information We Collect</h2>
                <p>When you book a demo, we may collect the following information:</p>
                <h3 className='font-semibold mt-2 mb-2'>Personal Information:</h3>
                <ul className="list-disc list-inside ml-4">
                  <li className="mb-1">Full name</li>
                  <li className="mb-1">Email address (company email)</li>
                  <li className="mb-1">Phone number</li>
                  <li className="mb-1">Company name (if applicable)</li>
                  <li className="mb-1">Job title (if applicable)</li>
                </ul>
                <h3 className='font-semibold mt-2 mb-2'>Booking Details:</h3>
                <ul className="list-disc list-inside ml-4">
                  <li>Preferred demo date and time</li>
                  <li>Any additional comments or preferences you provide in the booking form</li>
                </ul>
                <h3 className='font-semibold mt-2 mb-2'>Automatically Collected Information:</h3>
                <ul className="list-disc list-inside ml-4">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Device information</li>
                  <li>Cookies and usage data</li>
                </ul>
                <h2 className='text-xl font-bold mb-2 mt-4'>How We Share Your Information</h2>
                <h3 className='font-semibold mt-2 mb-2'>With Service Providers:</h3>
                <p className='mb-2'>
                  Third-party tools or platforms used to schedule and conduct the demo (e.g., calendar services, video conferencing tools).
                </p>
                <h3 className='font-semibold mt-2 mb-2'>Legal Obligations:</h3>
                <p className='mb-2'>
                  When required by law or to protect our legal rights.
                </p>
                <h3 className='font-semibold mt-2 mb-2'>Business Transfers:</h3>
                <p className='mb-2'>
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.
                </p>

                <h2 className='text-xl font-bold mb-2 mt-4'>Data Security</h2>
                <p className='mb-2'>
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized
                  access, disclosure, or destruction. However, no method of data transmission or storage is 100% secure, and we cannot guarantee absolute security.
                </p>

                <h2 className='text-xl font-bold mb-2 mt-4'>Retention of Information</h2>
                <p className='mb-2'>
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy
                  or to comply with legal obligations. If you wish to have your information deleted, please contact us at info@deeptrack.io.
                </p>

                <h2 className='text-xl font-bold mb-2 mt-4'>Your Rights</h2>
                <p className='mb-2'>You have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside ml-4">
                  <li><strong>Access and Correction:</strong> You can request access to your information and ask us to update or correct inaccuracies.</li>
                  <li><strong>Data Deletion:</strong> You can request that we delete your personal information, subject to legal or contractual obligations.</li>
                  <li><strong>Opt-Out:</strong> You can opt out of receiving promotional emails by clicking the "unsubscribe" link in the email or contacting us directly.</li>
                  <li><strong>Data Portability:</strong> You can request a copy of your personal information in a machine-readable format.</li>
                </ul>

                <h2 className='text-xl font-bold mb-2 mt-4'>Cookies and Tracking Technologies</h2>
                <p className='mb-2'>
                  We use cookies and similar technologies to enhance your experience and gather analytics about demo bookings.
                  You can manage your cookie preferences through your browser settings.
                </p>

                <h2 className='text-xl font-bold mb-2 mt-4'>Changes to This Privacy Policy</h2>
                <p className='mb-2'>
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
                  We will notify you of significant changes by posting the updated policy on our website and updating the "Last Updated" date.
                </p>

                <h2 className='text-xl font-bold mb-2 mt-4'>Contact Us</h2>
                <p>
                  If you have any questions or concerns about this Privacy Policy or how your information is handled, please contact us at:
                </p>
                <div className="mt-4">
                  deeptrack Solution<br/>
                    Email: info@deeptrack.io<br/>
                      Phone: +254-796414653<br/>
                      </div>

                      <p><strong>Last Updated:</strong> 13/12/2024</p>
              </div>
            </DialogContent>
          </Dialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

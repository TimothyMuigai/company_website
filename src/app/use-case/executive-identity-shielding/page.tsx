'use-client';


import { Navbar } from '@/components/landingPage/navs/navBar';
import ExecutiveIdentityShielding from '@/components/use-case/executiveUseCase';
import ExtraSection from '@/components/use-case/extra-section';
import Head from 'next/head';

const Events = () => {
  return (
    <>
      <Head>
        <title>Executive Identity Shielding & CEO Deepfake Protection | deeptrack</title>
        <meta 
          name="description" 
          content="Protect executives from deepfake attacks with AI-powered identity shielding. Prevent CEO fraud, detect synthetic media threats, and secure corporate communications with enterprise-grade deepfake protection." 
        />
        <meta 
          name="keywords" 
          content="executive identity shielding, CEO deepfake protection, business deepfake protection, deepfake attacks on CEOs, voice deepfake fraud detection, deepfake email scam prevention, protect brand from deepfakes, corporate communication protection, enterprise deepfake detection, business authenticity verification, AI-powered enterprise security, synthetic media fraud detection, corporate deepfake defense, deepfake corporate security, business deepfake risks 2025, detect deepfake scams, enterprise media security, deepfake scam protection, deepfake monitoring solution, AI deepfake detector"
        />
        <meta property="og:title" content="Executive Identity Shielding & CEO Deepfake Protection Solutions" />
        <meta property="og:description" content="Advanced AI protection against deepfake attacks targeting executives and corporate leadership. Secure your organization with enterprise-grade identity shielding." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.deeptrack.io/executive-identity-shielding" />
      </Head>
    
      <div className="space-y-6">
        <Navbar />
       
        <ExecutiveIdentityShielding />
       
        <div>                
          <ExtraSection />
        </div>
      </div>
    </>
  )
}

export default Events
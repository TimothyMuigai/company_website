import React from 'react'
import Image from 'next/image';
import GovernmentUseCaseFeatureSection from './GovernmentuseCaseFeatureSection';
import FeatureHighlight from './feature-highlight';
import UseCaseFeatureInformation from './useCaseFeatureInformation';
import UseCaseInfoSection from './useCaseInfoSection';

const features = [
    {
        title: 'Signal-Level Precision',
        description: 'Detect audio, video, and image-based impersonations of your leadership team using deeptrack’s multimodal AI engine, fine-tuned to surface even subtle manipulations.'
    },
    {
        title: 'Seamless Integration',
        description: 'Deploy detection workflows via REST API, dashboards, or your existing threat intelligence platforms for smooth threat management.'
    },
    {
        title: 'Proactive Monitoring',
        subtitle: 'High-Risk Channel Surveillance:',
        description: 'Through partnerships with cyber intelligence and media surveillance services, deeptrack offers proactive monitoring across social, messaging, and internal corporate platforms.'
    }
]

const ExecutiveIdentityShielding = () => {
    return (
        <div className='space-y-6'>


            <GovernmentUseCaseFeatureSection
                useCase='Enterprise'
                title="Executive Identity Shielding"
                description="Protect leadership from deepfake impersonation threats."
                imageSrc='/use-cases/executive-shielding.webp' // Use your image here
            />

            <FeatureHighlight
                title="Combating Executive Impersonation with AI"
                subtitle='Real-Time Defense'
                description="Executives and public figures are increasingly targeted by synthetic impersonations — from deepfake audio scams to synthetic videos aimed at reputational damage. deeptrack detects and mitigates these threats before they escalate."
                imageSrc='/use-cases/realtime-defense.jpg'
                imageAlt='Detect Impersonations'
            />

            <UseCaseFeatureInformation features={features} title={''} description={''} />


            <UseCaseInfoSection
                title="Deeptrack Executive Monitoring"
                imageSrc="/use-cases/executive-monitoring.jpg"
                imageAlt="Deeptrack Executive Monitoring"
                content={[
                    {
                        subtitle: 'Real-World Stakes',
                        description: '$243,000 lost by a UK energy firm due to audio deepfake fraud. 6 in 10 executives report no preparedness for deepfakes. 82% of phishing kits now reference deepfake capabilities.',
                    },
                    {
                        subtitle: 'Real-Time Alerts & Incident Reports',
                        description: 'Receive instant alerts and forensic reports that empower your security team to respond quickly and mitigate operational and reputational damage.',
                    },
                ]}
            />



        </div>
    )
}

export default ExecutiveIdentityShielding;

import React from 'react'
import { BannerCard } from '../cards/bannerCard';

interface Banner {
    icon: string;
    title: string;
    description: string;
}

interface BannerProps {
    banner: Banner[];
}

const Banner = ({
    banner
}: BannerProps) => {
    return (
        <>
            <section className="max-w-7xl mx-auto px-6">                
                <h2 className="text-center font-semibold text-3xl lg:text-5xl mb-16">
                    See what’s real
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
                    {banner.map((item) => (
                        <BannerCard
                        key={item.title}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                        />
                    ))}
                </div>
            </section>
            <div className='bg-teal-600 max-w-7xl mx-auto mt-4 lg:mt-6' style={{ height: '1px' }} />
        </>
    )
}

export default Banner
import { cn } from '@/lib/utils';

interface ExploreSectionProps {
    types: string[];
}

export default function ExploreSection({
    types
}: ExploreSectionProps) {
    return (
        <section className="bg-card-gradient min-h-100 flex items-center w-full py-16 border-y border-customTeal">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center text-center">
                {/* Title */}
                <h1
                    data-aos="fade-up"
                    className="mb-12 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
                >
                    Stay up-to-date with new types of AI manipulation
                </h1>

                {/* Types */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {types.map((type) => (
                        <div
                            key={type}
                            className={cn(
                                'inline-flex items-center justify-center rounded-2xl border-2 border-gray-800 px-6 py-3',
                                'text-base backdrop-blur-sm transition-colors',
                                'cursor-pointer'
                            )}
                        >
                            {type}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

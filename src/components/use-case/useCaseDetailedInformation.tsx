
interface UseCaseDetailedInformationProps {
    title?: string
    subtitle: string
    description: string
}

const UseCaseDetailedInformation = ({
    title,
    subtitle,
    description,
}: UseCaseDetailedInformationProps) => {
    return (
        <>
            <section className="max-w-7xl mx-auto mt-4 p-4 min-h-[30vh] text-black">
                <div className="grid lg:grid-cols-2 gap-6justify-center">
                    {/* Left Section */}
                    <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left m-auto space-y-6">
                        <div>
                            <h1 className="text-4xl font-light mb-6">{title}</h1>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex justify-center lg:justify-end p-6 mt-2">
                        <div>
                            <h2 className="text-xl sm:text-xl text-gray-900 m-0">{subtitle}:</h2>
                            <p className="leading-relaxed max-w-lg text-gray-700">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default UseCaseDetailedInformation;

import Image from "next/image";

export default function WhyAttend() {
    return (
        <>
        {/* Additional Event Information */}
        <div className="text-black rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4 text-center">Why Attend deeptrack Events?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center pt-6">
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex justify-center">
                        <Image
                            src={"/blogs_research/Vector.svg"}
                            alt="Expert Insights"
                            width={42}
                            height={42}
                            className=""
                        />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-black">Expert Insights</h4>
                    <p className="text-gray-700">Learn from industry leaders in AI security and deepfake detection</p>
                </div>
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex justify-center">
                        <Image
                            src={"/blogs_research/Group.svg"}
                            alt="Hands-on Training"
                            width={42}
                            height={42}
                            className=""
                        />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-black">Hands-on Training</h4>
                    <p className="text-gray-700">Practical sessions on implementing detection technologies</p>
                </div>
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex justify-center">
                        <Image
                            src={"/blogs_research/streamline-ultimate_human-resources-network-bold.svg"}
                            alt="Networking"
                            width={42}
                            height={42}
                            className=""
                        />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-black">Networking</h4>
                    <p className="text-gray-700">Connect with cybersecurity professionals worldwide</p>
                </div>
            </div>
        </div>
        </>
    )
}
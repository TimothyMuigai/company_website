import Image from "next/image";
import Link from "next/link";

interface ApiFeatureSectionProps {
  title: string;
  description: string;
  imageSrc: string;
}

const ApiFeatureSection = ({
  title,
  description,
  imageSrc,
}: ApiFeatureSectionProps) => {
  return (
    <section className="max-w-7xl mx-auto px-10 py-20">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT IMAGE */}
        <div className="flex justify-center lg:justify-start">
          <Image
            src={imageSrc}
            alt="Deepfake detection preview"
            width={520}
            height={520}
            className="rounded-lg object-contain"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col gap-8">
          <h1 className="text-[48px] leading-[1.1] font-light text-gray-900">
            {title}
          </h1>
          <p className="text-lg text-gray-700 max-w-xl">{description}</p>

          <div className="flex gap-6 mt-2 flex-wrap">
            {/* Links to the dashboard console */}
            <Link
              href="/console"
              className="bg-gray-900 text-white px-8 py-4 rounded-md text-lg hover:bg-gray-700 transition flex items-center gap-2"
            >
              Start using RealAPI
              <span>↗</span>
            </Link>

            {/* Links to Mintlify docs */}
            <Link
              href="https://www.deeptrack.io/docs/introduction"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 text-white px-8 py-4 rounded-md text-lg hover:bg-gray-700 transition flex items-center gap-2"
            >
              View API docs
              <span>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApiFeatureSection;
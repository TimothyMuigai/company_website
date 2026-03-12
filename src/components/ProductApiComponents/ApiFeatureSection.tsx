// import Image from "next/image";

interface ApiFeatureSectionProps {
  title: string;
  description: string;
  // imageSrc?: string;
}

const ApiFeatureSection = ({
  title,
  description,
  // imageSrc,
}: ApiFeatureSectionProps) => {
  return (
    <section className="max-w-7xl mx-auto px-10 py-20">

      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT IMAGE (single image) */}
        <div className="flex justify-center lg:justify-start">
          {/* <Image
            src={imageSrc}
            alt="Deepfake detection preview"
            width={520}
            height={520}
            className="rounded-lg object-contain"
          /> */}
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col gap-8">

          {/* TITLE */}
          <h1 className="text-[48px] leading-[1.1] font-light text-gray-900">
            {title}
          </h1>

          {/* DESCRIPTION */}
          <p className="text-lg text-gray-700 max-w-xl">
            {description}
          </p>

          {/* BUTTONS */}
          <div className="flex gap-6 mt-2 flex-wrap">

            <button className="bg-gray-900 text-white px-8 py-4 rounded-md text-lg hover:bg-gray-700 transition flex items-center gap-2">
              Start using RealAPI
              <span>↗</span>
            </button>

            <button className="bg-gray-900 text-white px-8 py-4 rounded-md text-lg hover:bg-gray-700 transition flex items-center gap-2">
              View API docs
              <span>↗</span>
            </button>

          </div>

        </div>
      </div>

    </section>
  );
};

export default ApiFeatureSection;
"use client";

interface FeatureHighlightGothamProps {
  title: string;
  subtitle: string;
  description: string;
}

const FeatureHighlightGotham = ({
  title,
  subtitle,
  description,
}: FeatureHighlightGothamProps) => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto text-center space-y-8">

        <h2 className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
          {title}
        </h2>

        <p className="text-lg uppercase tracking-wide text-gray-500">
          {subtitle}
        </p>

        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
          {description}
        </p>

      </div>
    </section>
  );
};

export default FeatureHighlightGotham;
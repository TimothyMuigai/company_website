"use client";

interface ContentItem {
  subtitle: string;
  description: string;
}

interface UseCaseFooterGothamBannerProps {
  content: ContentItem[];
  title: string;
}

const UseCaseFooterGothamBanner = ({
  title,
  content,
}: UseCaseFooterGothamBannerProps) => {
  return (
    <section className="mt-2">

      <div className="max-w-7xl mx-auto px-6 py-14 space-y-16">

        <h2 className="text-4xl font-light text-gray-900 text-center">
          {title}
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {content.map((item, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-2xl font-medium text-gray-900">
                {item.subtitle}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-16 text-center border-t border-gray-200 bg-gray-50">
          <h3 className="text-3xl font-light text-gray-900 mb-6">
            Ready to Scale Media Verification?
          </h3>

          <a
            href="https://gotham.deeptrack.io"
            target="_blank"
            rel="noreferrer"
            className="inline-block px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Launch deeptrack Gotham
          </a>
        </div>

      </div>
    </section>
  );
};

export default UseCaseFooterGothamBanner;
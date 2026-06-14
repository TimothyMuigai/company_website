import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import {
  blogPosts,
  getBlogPostBySlug,
  getBlogPostMetadata,
} from '@/lib/seo/blog-posts'
import { blogComponents } from '@/components/blogsBody/blogsComponent'
import { Navbar } from '@/components/landingPage/navs/navBar'
import { WaitlistButton } from '@/components/landingPage/waiting-list'
import FinalCTASection from '@/components/Footer'

export function generateStaticParams() {
  const slugParams = blogPosts.map((post) => ({ slug: post.slug }))
  const legacyParams = blogPosts
    .filter((post) => post.legacyId)
    .map((post) => ({ slug: post.legacyId as string }))
  return [...slugParams, ...legacyParams]
}

function resolvePost(slug: string) {
  // Old links used /blog/0, /blog/1, /blog/2.
  const legacyPost = blogPosts.find((p) => p.legacyId === slug)
  if (legacyPost) return { post: legacyPost, isLegacy: true }

  const post = getBlogPostBySlug(slug)
  return { post, isLegacy: false }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { post } = resolvePost(params.slug)
  if (!post) {
    return {
      title: 'Blog Post Not Found | Deeptrack',
      description: 'The blog post you are looking for could not be found.',
    }
  }
  return getBlogPostMetadata(post)
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const { post, isLegacy } = resolvePost(params.slug)

  if (!post) {
    notFound()
  }

  // Permanently redirect old numeric URLs (/blog/0, /blog/1, /blog/2) to the new slug.
  if (isLegacy) {
    redirect(`/blog/${post.slug}`)
  }

  // Hand-built posts still render via the legacy component map.
  const BlogComponent = post.legacyId
    ? blogComponents[post.legacyId]
    : undefined

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Deeptrack Inc.',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.deeptrack.io/logos/deeptrack-high-resolution-logo-transparent.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.deeptrack.io/blog/${post.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navbar />
      <div className="py-10">
        {BlogComponent ? (
          <BlogComponent />
        ) : (
          <article className="max-w-4xl mx-auto p-8 text-black rounded-lg shadow-lg font-outfit">
            <h1 className="text-4xl font-light text-center mb-2 tracking-wide md:text-5xl">
              {post.title}
            </h1>
            <p className="text-sm md:text-lg text-gray-800 text-center mb-6 max-w-176.25 mx-auto text-[18px]">
              {post.description}
            </p>
            <div className="flex justify-center items-center text-gray-600 text-sm mb-6">
              <span>{post.readTime}</span>
            </div>
            <div className="w-full flex justify-center mb-6">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-111 object-cover shadow-md rounded-lg"
              />
            </div>
            <p className="text-lg text-gray-700 leading-loose text-justify w-full mb-6 md:text-lg">
              {post.description}
            </p>
          </article>
        )}
      </div>
      <section className="bg-[#F9FAFB] min-h-[400px] flex items-center w-full py-16 border-y-[1px] border-gray-600">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-5xl font-light text-gray-900 leading-tight">
                A Global Holistic
                <br />
                Audio Authenticity
                <br />
                Ecosystem
              </h2>
            </div>
            <div className="flex flex-col space-y-8">
              <p className="text-2xl text-gray-800 leading-relaxed">
                The deeptrack AI application is not just a tool—it is a global
                fraud prevention and audio authenticity command center serving
                businesses worldwide
              </p>
              <div className="w-full max-w-md">
                <WaitlistButton id="btn-blog-footer" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <FinalCTASection />
    </>
  )
}
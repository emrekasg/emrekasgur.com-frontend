import { notFound } from "next/navigation"
import { format } from "date-fns"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import remarkGfm from "remark-gfm"
import type { Metadata } from "next"

const tagColors = {
  containers: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  go: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  // Add more tags and colors as needed
}

async function getPost(slug: string) {
  const res = await fetch(`https://backend.emrekasgur.com/posts/${encodeURIComponent(slug)}?language=en`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) {
    throw new Error("Failed to fetch post")
  }
  return res.json()
}

async function getPosts() {
  const res = await fetch("https://backend.emrekasgur.com/posts?language=en", { next: { revalidate: 3600 } })
  if (!res.ok) {
    throw new Error("Failed to fetch posts")
  }
  return res.json()
}

export async function generateStaticParams() {
  const { data: posts } = await getPosts()
  return posts.map((post) => ({
    slug: post.post_link,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug
  const { data: post } = await getPost(slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: post.title,
    description: post.brief,
    openGraph: {
      title: post.title,
      description: post.brief,
      type: "article",
      publishedTime: post.created_at,
      authors: ["Emre Kasgur"],
      tags: [post.tag],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.brief,
    },
  }
}

export default async function Post({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const { data: post } = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-3xl mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
        <div className="flex items-center gap-4">
          <time className="text-sm text-muted-foreground">{format(new Date(post.created_at), "MMMM d, yyyy")}</time>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${tagColors[post.tag] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"}`}
          >
            {post.tag}
          </span>
        </div>
      </div>
      <p className="text-lg text-muted-foreground">{post.brief}</p>
      <ReactMarkdown
        className="prose prose-neutral dark:prose-invert max-w-none"
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "")
            return !inline && match ? (
              <SyntaxHighlighter
                {...props}
                children={String(children).replace(/\n$/, "")}
                style={atomDark}
                language={match[1]}
                PreTag="div"
              />
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            )
          },
          h1({ node, ...props }) {
            return <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />
          },
          h2({ node, ...props }) {
            return <h2 className="text-3xl font-bold mt-8 mb-4" {...props} />
          },
          h3({ node, ...props }) {
            return <h3 className="text-2xl font-bold mt-8 mb-4" {...props} />
          },
          h4({ node, ...props }) {
            return <h4 className="text-xl font-bold mt-8 mb-4" {...props} />
          },
          h5({ node, ...props }) {
            return <h5 className="text-lg font-bold mt-8 mb-4" {...props} />
          },
          h6({ node, ...props }) {
            return <h6 className="text-base font-bold mt-8 mb-4" {...props} />
          },
          ul({ node, ...props }) {
            return <ul className="list-disc pl-6 my-4" {...props} />
          },
          ol({ node, ...props }) {
            return <ol className="list-decimal pl-6 my-4" {...props} />
          },
          li({ node, ...props }) {
            return <li className="my-1" {...props} />
          },
          blockquote({ node, ...props }) {
            return (
              <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 my-4 italic" {...props} />
            )
          },
        }}
      >
        {post.content}
      </ReactMarkdown>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.brief,
            author: {
              "@type": "Person",
              name: "Emre Kasgur",
            },
            datePublished: post.created_at,
            dateModified: post.updated_at,
            keywords: post.tag,
          }),
        }}
      />
    </article>
  )
}


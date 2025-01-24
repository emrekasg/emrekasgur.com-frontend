import type { MetadataRoute } from "next"

// Add this line to enable static generation
export const dynamic = 'force-static'

async function getPosts() {
  const res = await fetch("https://backend.emrekasgur.com/posts?language=en", { next: { revalidate: 3600 } })
  if (!res.ok) {
    throw new Error("Failed to fetch posts")
  }
  return res.json()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: posts } = await getPosts()

  const postEntries = posts.map((post: any) => ({
    url: `https://emrekasgur.com/posts/${post.post_link}`,
    lastModified: post.updated_at,
  }))

  return [
    {
      url: "https://emrekasgur.com",
      lastModified: new Date(),
    },
    {
      url: "https://emrekasgur.com/about",
      lastModified: new Date(),
    },
    ...postEntries,
  ]
}


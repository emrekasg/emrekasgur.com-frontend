import { Post } from "./components/post"

async function getPosts() {
  const res = await fetch("https://backend.emrekasgur.com/posts?language=en")
  if (!res.ok) {
    throw new Error("Failed to fetch posts")
  }
  return res.json()
}

export default async function Home() {
  const { data: posts } = await getPosts()

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Latest Posts</h1>
      <section className="space-y-8">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </section>
    </div>
  )
}


import { format } from "date-fns"
import Link from "next/link"

interface PostProps {
  id: number
  title: string
  brief: string
  created_at: string
  post_link: string
  tag: string
}

const tagColors = {
  containers: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  go: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  // Add more tags and colors as needed
}

export function Post({ title, brief, created_at, post_link, tag }: PostProps) {
  return (
    <article className="space-y-4 pb-8 border-b last:border-b-0">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-1">
          <Link href={`/posts/${post_link}`} className="hover:underline">
            {title}
          </Link>
        </h2>
        <time className="text-sm text-muted-foreground">{format(new Date(created_at), "MMMM d, yyyy")}</time>
      </div>
      <p className="text-muted-foreground">{brief}</p>
      <div className="flex flex-wrap gap-2">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${tagColors[tag] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"}`}
        >
          {tag}
        </span>
      </div>
    </article>
  )
}



import Container from '@/components/blog/container'
import PostBody from '@/components/blog/post-body'
import PostHeader from '@/components/blog/post-header'
import { getPostBySlug } from '@/lib/blog'
import Head from 'next/head'
import markdownToHtml from '@/lib/markdownToHtml'
import type { Post } from '@/lib/blog'

import type { Metadata, ResolvingMetadata} from 'next'

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const post = getPostBySlug(params.slug) as Post

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [process.env.NEXT_PUBLIC_BASE_DOMAIN + post.ogImage.url],
    },
  }
}

export default async function Post({  params }) {

  const post = getPostBySlug(params.slug) as Post
  const content = await markdownToHtml(post.content || '')

  const title = `${post.title} | Contract Browser Blog`

  return (
    <Container>
      <>
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostBody content={content} />
        </article>
      </>
    </Container>
  )
}
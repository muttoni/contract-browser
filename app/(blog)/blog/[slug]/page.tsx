
import Container from '@/components/blog/container'
import PostBody from '@/components/blog/post-body'
import PostHeader from '@/components/blog/post-header'
import { getPostBySlug } from '@/lib/blog'
import Head from 'next/head'
import markdownToHtml from '@/lib/markdownToHtml'
import type { Post } from '@/lib/blog'

export default async function Post({  params }) {

  const post = getPostBySlug(params.slug) as Post
  const content = await markdownToHtml(post.content || '')

  const title = `${post.title} | Contract Browser Blog`

  return (
    <Container>
      <>
        <article className="mb-32">
          <Head>
            <title>{title}</title>
            <meta property="og:image" content={post.ogImage.url} />
          </Head>
          {/* <CoverImage src={post.coverImage} title={post.title} slug={post.slug}/> */}

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
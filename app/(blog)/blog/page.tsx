import Container from '@/components/blog/container'
import MoreStories from '@/components/blog/more-stories'
import HeroPost from '@/components/blog/hero-post'
import { getAllPosts } from '@/lib/blog'

export default function Index() {

  const allPosts = getAllPosts()
  const heroPost = allPosts ? allPosts[0] : null
  const morePosts = allPosts?.slice(1) || null

  return (
    <>
      <Container>
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts?.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </>
  )
}
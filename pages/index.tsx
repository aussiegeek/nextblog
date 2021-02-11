import { getAllPosts } from "../getAllPosts";
import PostSummary from "../components/PostSummary";

export default function Home({
  posts,
}: {
  posts: Array<{ slug: string; title: any }>;
}) {
  return (
    <div>
      {posts.map((post) => (
        <PostSummary key={post.slug} post={post} />
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const allPosts = await getAllPosts();
  return {
    props: {
      posts: allPosts,
    },
  };
}

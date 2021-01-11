import Link from "next/link";

interface PostProps {
  post: { slug: string; title: string };
}

const PostSummary: React.FC<PostProps> = ({ post }) => {
  const { slug, title } = post;

  return (
    <article>
      <Link href={"/posts/" + slug} passHref>
        <a>
          <h2>{title}</h2>
        </a>
      </Link>
      <Link href={"/posts/" + slug} passHref>
        <a>Read more →</a>
      </Link>
    </article>
  );
};

export default PostSummary;

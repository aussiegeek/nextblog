import matter from "gray-matter";
import * as fs from "fs";

function importAll(r) {
  return r.keys().map((fileName) => ({
    link: fileName.substr(1).replace(/\/index\.mdx$/, ""),
    module: r(fileName),
  }));
}

export const posts = importAll(
  require.context("./pages/posts/", true, /\.mdx$/)
);

export async function getAllPosts() {
  const context = require.context("./posts", true);
  const posts = [];
  for (const key of context.keys()) {
    const post = key.slice(2);
    console.log(key);
    const path = `./posts/${post}`;
    const content = fs.readFileSync(path, "utf-8");
    const meta = matter(content);
    posts.push({
      slug: post.slice(0, -10),
      title: meta.data.title,
    });
  }

  console.log(posts);
  return posts;
}

export async function getPostBySlug(slug) {
  const path = `./posts/${slug}/index.mdx`;

  const meta = matter(fs.readFileSync(path, "utf-8"));
  const { data, content } = matter(meta.content);
  return {
    title: meta.data.title,
    content: content,
  };
}

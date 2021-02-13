import matter from "gray-matter";
import * as fs from "fs";
import * as path from "path";
import renderToString from "next-mdx-remote/render-to-string";

const postsDirectory = path.join(process.cwd(), "posts");

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => fileName.replace(/\.md$/, "")).reverse();
};

export async function getPostBySlug(slug: string | string[] | undefined) {
  const path = `./posts/${slug}/index.mdx`;

  const { data, content } = matter(fs.readFileSync(path, "utf-8"));

  const mdxSource = await renderToString(content);

  return {
    title: data.title,
    slug,
    mdxSource,
  };
}

export const getAllPosts = async () => {
  return Promise.all(getAllPostIds().map((slug) => getPostBySlug(slug)));
};

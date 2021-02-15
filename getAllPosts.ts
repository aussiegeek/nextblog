import matter from "gray-matter";
import * as fs from "fs";
import * as path from "path";
import renderToString from "next-mdx-remote/render-to-string";
import { MdxRemote } from "next-mdx-remote/types";

export interface Post {
  title: string;
  slug: string;
  mdxSource: MdxRemote.Source;
}

const postsDirectory = path.join(process.cwd(), "posts");

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => fileName.replace(/\.md$/, "")).reverse();
};

export async function getPostBySlug(
  slug: string | string[] | undefined
): Promise<Post> {
  if (typeof slug !== "string") {
    throw "Post slug isn't a string";
  }
  const path = `./posts/${slug}/index.mdx`;

  const { data, content } = matter(fs.readFileSync(path, "utf-8"));

  const mdxSource = await renderToString(content);

  return {
    title: data.title ?? "Untitled",
    slug,
    mdxSource,
  };
}

export const getAllPosts = async () => {
  return Promise.all(getAllPostIds().map((slug) => getPostBySlug(slug)));
};

import * as React from "react";
import { getPostBySlug, getAllPosts } from "../../getAllPosts";
import MDX from "@mdx-js/runtime";
import Link from "next/link";
import Head from "next/head";

const Page = ({ content, title }) => (
  <article className="mt-5 prose prose-lg">
    <Head>
      <title>{title}</title>
    </Head>
    <h1>{title}</h1>
    <MDX>{content}</MDX>
  </article>
);

export default Page;

export async function getStaticProps(context) {
  return { props: await getPostBySlug(context.params.slug) };
}

export async function getStaticPaths() {
  let paths = await getAllPosts();
  paths = paths.map((post) => ({
    params: { slug: post.slug },
  }));
  return {
    paths: paths,
    fallback: false,
  };
}

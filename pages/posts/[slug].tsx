import * as React from "react";
import { getPostBySlug, getAllPosts } from "../../getAllPosts";
import Link from "next/link";
import Head from "next/head";
import { GetStaticProps } from "next";
import ConvertKitForm from "convertkit-react";
import { MdxRemote } from "next-mdx-remote/types";
import hydrate from "next-mdx-remote/hydrate";

const Page: (props: {
  mdxSource: MdxRemote.Source;
  title: string;
}) => JSX.Element = ({ mdxSource, title }) => {
  const content = hydrate(mdxSource);
  return (
    <>
      <article className="mt-5 prose prose-lg">
        <Head>
          <title>{title}</title>
        </Head>
        <h1>{title}</h1>
        {content}
      </article>
      <div className="m-5 w-full">
        <ConvertKitForm formId={1673792} template="mills" />
      </div>
    </>
  );
};

export default Page;

export const getStaticProps: GetStaticProps = async (context) => {
  return { props: await getPostBySlug(context.params?.slug) };
};

export async function getStaticPaths() {
  let paths = await getAllPosts();
  return {
    paths: paths.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
}

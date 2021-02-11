import * as React from "react";
import { getPostBySlug, getAllPosts } from "../../getAllPosts";
import Link from "next/link";
import Head from "next/head";
import { GetStaticProps } from "next";
import ConvertKitForm from "convertkit-react";

const Page: (props: { content: string; title: string }) => JSX.Element = ({
  content,
  title,
}) => (
  <>
    <article className="mt-5 prose prose-lg">
      <Head>
        <title>{title}</title>
      </Head>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
    <div className="m-5 w-full">
      <ConvertKitForm formId={1673792} template="mills" />
    </div>
  </>
);

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

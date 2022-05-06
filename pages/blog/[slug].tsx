import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Img from "../../components/Img";
import React from "react";
import useIsMobile from "../../components/isMobile";
import PostNavigation from "../../components/PostNavigation";
import StatCard from "../../components/StatCard";

import { NextSeo } from "next-seo";

export const getStaticPaths = async () => {
	const files = fs.readdirSync(path.join("posts"));
	const paths = files.map((filename) => ({
		params: {
			slug: filename.replace(".mdx", ""),
		},
	}));
	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async ({
	params: { slug },
}: {
	params: { slug: string };
}) => {
	const markdownWithMeta = fs.readFileSync(
		path.join("posts", slug + ".mdx"),
		"utf-8"
	);
	const files = fs.readdirSync(path.join("posts"));
	const slugs = files.map((filename) => filename.replace(".mdx", "")).sort();
	const slugIndex = slugs.findIndex((s) => s === slug);
	const { data: frontMatter, content } = matter(markdownWithMeta);
	const mdxSource = await serialize(content);
	return {
		props: {
			frontMatter,
			slug,
			nextSlug: slugIndex === slugs.length - 1 ? null : slugs[slugIndex + 1],
			previousSlug: slugIndex === 0 ? null : slugs[slugIndex - 1],
			mdxSource,
		},
	};
};

interface Props {
	frontMatter: {
		[key: string]: any;
	};
	nextSlug: string;
	previousSlug: string;
	mdxSource: MDXRemoteSerializeResult<Record<string, unknown>>;
}
const PostPage: React.FC<Props> = ({
	frontMatter,
	mdxSource,
	nextSlug,
	previousSlug,
}) => {
	const useMobile = useIsMobile();

	return (
		<div className="mt-4" style={{ width: "100%", position: "relative" }}>
			<NextSeo
				title={"BitterHike - " + frontMatter.title}
				description={frontMatter.description}
			/>
			<PostNavigation previousSlug={previousSlug} nextSlug={nextSlug} />
			<h1>{frontMatter.title}</h1>
			<StatCard data={frontMatter as any} />
			<div style={{ fontSize: useMobile ? undefined : 20 }}>
				<MDXRemote {...mdxSource} components={{ Img }} />
			</div>
			<PostNavigation previousSlug={previousSlug} nextSlug={nextSlug} />
		</div>
	);
};
export default PostPage;

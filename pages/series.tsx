import matter from "gray-matter";
import dynamic from "next/dynamic";
import path from "path";
import React from "react";
import Img from "../components/Img";
import fs from "fs";
import Link from "next/link";
import { Card } from "react-bootstrap";
import useIsMobile from "../components/isMobile";
import { NextSeo } from "next-seo";

export const getStaticProps = async () => {
	const files = fs.readdirSync(path.join("posts"));
	const posts = files.map((filename) => {
		if (filename.slice(filename.length - 3) !== "mdx") {
			return;
		}
		const markdownWithMeta = fs.readFileSync(
			path.join("posts", filename),
			"utf-8"
		);
		const { data: frontMatter } = matter(markdownWithMeta);
		return {
			frontMatter,
			slug: filename.split(".")[0],
		};
	});
	return {
		props: {
			posts: posts.filter((p) => p),
		},
	};
};
const Series = ({ posts }: { posts: any[] }) => {
	return (
		<div className="mt-3">
			<NextSeo
				title="BitterHike - Wanderungen"
				description="Eine Übersicht meiner Wanderungen in und um die Schweizer Alpen"
			/>
			<div
				style={{
					width: "100%",
					maxHeight: 250,
					overflow: "hidden",
					objectFit: "cover",
					marginBottom: 20,
				}}
			>
				<Img src="/NS/67.jpeg" d="" />
			</div>
		</div>
	);
};
export default Series;

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

import { NextSeo } from "next-seo";

import { Container, Col, Row, Card } from "react-bootstrap";
import useIsMobile from "../components/isMobile";
import { useRouter } from "next/router";
import React from "react";
import RemoveTagFilter from "../components/RemoveTagFilter";

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

export default function Home({ posts }: { posts: any[] }) {
	const router = useRouter();

	var dateOptions = {
		year: "numeric" as "numeric",
		month: "long" as "long",
		day: "numeric" as "numeric",
	};
	const mobile = useIsMobile();

	return (
		<Container fluid>
			<NextSeo
				title="BitterBooks - Marc's Book Blog"
				description="BitterBooks - Where I write about books I read."
			/>
			<h1>BitterBooks - My Book Blog</h1>
			<p>
				Sometimes I write about books I have read and liked (or disliked). You
				can find a better overview{" "}
				<Link href="/series/" passHref>
					<a>here</a>
				</Link>
				.
			</p>
			<h2>Newest Posts</h2>
			<Row xs={1} sm={1} md={2} lg={2} xl={2} xxl={2}>
				{posts.length > 0 ? (
					posts
						.sort((a, b) => (a.frontMatter.date < b.frontMatter.date ? 1 : -1))
						.slice(0, 4)
						.map((post, index) => (
							<Link href={"/blog/" + post.slug + "/"} passHref key={index}>
								<a style={{ color: "black", textDecoration: "none" }}>
									<Card style={{ marginBottom: 20, cursor: "pointer" }}>
										<div style={{ height: mobile ? 150 : 300 }}>
											<Card.Img
												variant="top"
												src={post.frontMatter.thumbnailUrl}
												height={"100%"}
												style={{ objectFit: "cover" }}
											/>
										</div>
										<Card.Body>
											<Card.Title style={{ fontSize: mobile ? 20 : undefined }}>
												{post.frontMatter.title}
											</Card.Title>
											<Card.Text style={{ fontSize: mobile ? 14 : undefined }}>
												{post.frontMatter.description}
											</Card.Text>
											<Card.Text
												className={"text-muted"}
												style={{ fontSize: mobile ? 14 : undefined }}
											>
												{new Date(post.frontMatter.date).toLocaleDateString(
													"de-CH",
													dateOptions
												)}
											</Card.Text>
										</Card.Body>
									</Card>
								</a>
							</Link>
						))
				) : (
					<div>no posts found</div>
				)}
				<Link href="/blog/" passHref>
					<a style={{ marginTop: -10, marginBottom: 10, fontSize: 26 }}>
						More Posts...
					</a>
				</Link>
			</Row>
		</Container>
	);
}

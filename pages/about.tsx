import Link from "next/link";
import React from "react";
import { NextSeo } from "next-seo";

const About = () => {
	return (
		<div className="mt-3">
			<NextSeo
				title="BitterBlog - About"
				description="I am Marc, I like to read books."
			/>
			<p className="display-4 text-center">About Me</p>
			<div>bla bla bla</div>
		</div>
	);
};
export default About;

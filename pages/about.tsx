import Link from "next/link";
import React from "react";
import { NextSeo } from "next-seo";

const About = () => {
	return (
		<div className="mt-3">
			<NextSeo
				title="BitterHike - Über Mich"
				description="Ich in Marc, der Autor dieses Blogs..."
			/>
			<p className="display-4 text-center">Marc Bitterli</p>
		</div>
	);
};
export default About;

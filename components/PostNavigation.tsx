const PostNavigation = ({
	previousSlug,
	nextSlug,
}: {
	previousSlug: string;
	nextSlug: string;
}) => {
	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				justifyContent: "space-between",
			}}
		>
			<a href={"/blog/" + previousSlug + "/"}>
				{previousSlug ? "← Previous Post" : ""}
			</a>
			<a href={"/blog/" + nextSlug + "/"}>{nextSlug ? "Next Post →" : ""}</a>
		</div>
	);
};
export default PostNavigation;

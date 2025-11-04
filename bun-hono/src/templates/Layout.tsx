import type { PropsWithChildren } from "hono/jsx";
import type { SiteData } from "../logic/types";

const Layout = (props: PropsWithChildren<SiteData>) => (
	<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta
				name="description"
				content="A Realtime collaborative TodoMVC written in Datastar and Bun+Hono."
			/>
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta http-equiv="X-UA-Compatible" content="ie=edge" />
			<title>{props.title}</title>
			<meta property="og:title" content="${props.title}" />
			<link rel="stylesheet" href="/static/modern-normalize.css" />
			<link rel="stylesheet" href="/static/styles.css" />
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/static/apple-touch-icon.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/static/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/static/favicon-16x16.png"
			/>
			<link rel="manifest" href="/static/site.webmanifest" />
			<script
				type="module"
				src="https://cdn.jsdelivr.net/gh/starfederation/datastar@1.0.0-RC.6/bundles/datastar.js"
			></script>
		</head>
		<body>
			{props.children}
			<footer>
				<p>Open the page in multiple tabs and see what happens!</p>
				<p>
					Made with ❤️ and&nbsp;<a href="https://www.data-star.dev">Datastar</a>
					&nbsp;by Khalid Jebbari
				</p>
			</footer>
		</body>
	</html>
);
export default Layout;

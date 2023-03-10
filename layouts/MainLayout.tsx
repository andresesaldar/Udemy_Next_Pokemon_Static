import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Container } from "@nextui-org/react";
import Head from "next/head";
import Navbar from "../components/Navbar";

type MainLayoutProps = {
	title?: string;
	description?: string;
	extra?: string[];
} & PropsWithChildren;

const MainLayout: FC<MainLayoutProps> = ({
	children,
	title = "Pokemon static App",
	description,
	extra,
}) => {
	const [origin, setOrigin] = useState("");
	useEffect(() => setOrigin(window.location.origin), []);
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="author" content="Andres Saldarriaga" />
				{description && (
					<meta name="description" content={description} />
				)}
				<meta
					name="keywords"
					content={`${
						extra ? extra.map((item) => item + ", ").join("") : ""
					}pokemon, pokedex`}
				/>
				<meta property="og:title" content={title} />
				{description && (
					<meta property="og:description" content={description} />
				)}
				<meta
					property="og:image"
					content={`${origin}/images/banner.png`}
				/>
			</Head>
			<Navbar />
			<main>
				<Container css={{ marginBottom: "$5", marginTop: "$5" }}>
					{children}
				</Container>
			</main>
		</>
	);
};

export default MainLayout;

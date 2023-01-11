import { Text, Navbar as UINavbar } from "@nextui-org/react";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

type NavbarItemProps = {
	route: string;
	text: string;
};

const NavbarItem: FC<NavbarItemProps> = ({ route, text }) => {
	const router = useRouter();
	return (
		<UINavbar.Link href={route} isActive={router.pathname === route}>
			{text}
		</UINavbar.Link>
	);
};

const Navbar: FC = () => (
	<UINavbar isBordered variant="sticky" color="">
		<Link href="/">
			<UINavbar.Brand>
				<Image
					src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
					alt="App Brand"
					width={70}
					height={70}
				/>
				<Text
					h3
					color="inherit"
					css={{ color: "$accents9", marginBottom: 0 }}
				>
					Pokémon
				</Text>
			</UINavbar.Brand>
		</Link>
		<UINavbar.Content enableCursorHighlight variant="underline">
			<NavbarItem route="/" text="Home" key="1" />
			<NavbarItem route="/favorites" text="Favorites" key="2" />
		</UINavbar.Content>
	</UINavbar>
);

export default Navbar;

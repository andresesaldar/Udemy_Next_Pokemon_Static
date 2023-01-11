import { Card, Text } from "@nextui-org/react";
import { ReactElement, useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { NextPageWithLayout } from "./_app";
import { Pokemon } from "../models/pokemon";
import PokemonGrid from "../components/PokemonGrid";
import { allFavorites } from "../integration/favorites";

const Favorites: NextPageWithLayout = () => {
	const [favorites, setFavorites] = useState<Pokemon[]>([]);
	useEffect(() => setFavorites(allFavorites()), []);
	return (
		<>
			<Text h2>Favorites</Text>
			{favorites.length <= 0 ? (
				<Card
					variant="bordered"
					css={{
						backgroundColor: "$primaryLight",
						borderColor: "$primary",
					}}
				>
					<Card.Body
						css={{ display: "flex", flexDirection: "column" }}
					>
						<Text b>No Favorites!</Text>
						<Text small>
							Save a pokemon as favorite and see it here.
						</Text>
					</Card.Body>
				</Card>
			) : (
				<PokemonGrid pokemonList={favorites} />
			)}
		</>
	);
};

Favorites.getLayout = (page): ReactElement => (
	<MainLayout
		title="Favorite pokemons list"
		description="Favorite pokemons list"
	>
		{page}
	</MainLayout>
);

export default Favorites;

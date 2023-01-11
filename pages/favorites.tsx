import MainLayout from "../layouts/MainLayout";
import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import { Text } from "@nextui-org/react";

const Favorites: NextPageWithLayout = () => <Text h2>Favorites</Text>;

Favorites.getLayout = (page): ReactElement => (
	<MainLayout
		title="Favorite pokemons list"
		description="Favorite pokemons list"
	>
		{page}
	</MainLayout>
);

export default Favorites;

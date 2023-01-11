import { getPokemon, maxPokemon } from "../integration/pokemon";
import { GetStaticProps } from "next";
import MainLayout from "../layouts/MainLayout";
import { NextPageWithLayout } from "./_app";
import { Pokemon } from "../models/pokemon";
import PokemonGrid from "../components/PokemonGrid";
import { ReactElement } from "react";

type HomeProps = {
	pokemonList: Pokemon[];
};

const Home: NextPageWithLayout<HomeProps> = ({ pokemonList }) => (
	<PokemonGrid pokemonList={pokemonList} />
);

Home.getLayout = (page): ReactElement => (
	<MainLayout
		title="All pokemons list"
		description="All pokemons on pokedex list"
	>
		{page}
	</MainLayout>
);

export const getStaticProps: GetStaticProps<HomeProps> = () =>
	getPokemon({ limit: maxPokemon }).then((pokemonList) => ({
		props: {
			pokemonList,
		},
	}));

export default Home;

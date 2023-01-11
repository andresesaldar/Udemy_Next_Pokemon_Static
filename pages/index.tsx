import { GetStaticProps } from "next";
import { Grid } from "@nextui-org/react";
import MainLayout from "../layouts/MainLayout";
import { NextPageWithLayout } from "./_app";
import { Pokemon } from "../models/pokemon";
import PokemonCard from "../components/PokemonCard";
import { ReactElement } from "react";
import { getPokemon } from "../integration/pokemon";

type HomeProps = {
	pokemonList: Pokemon[];
};

const Home: NextPageWithLayout<HomeProps> = ({ pokemonList }) => (
	<Grid.Container gap={1} justify="flex-start">
		{pokemonList.map((pokemon) => (
			<Grid xs={4} lg={3} key={pokemon.id}>
				<PokemonCard pokemon={pokemon} />
			</Grid>
		))}
	</Grid.Container>
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
	getPokemon({ limit: 151 }).then(({ results }) => ({
		props: {
			pokemonList: results.map<Pokemon>(({ name, url }) => {
				const id: number = url
					? Number(
							url
								.split("/")
								.filter((val) => !!val)
								.pop(),
					  )
					: 0;
				return {
					id,
					image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
					name: name || "",
					url: url || "",
				};
			}),
		},
	}));

export default Home;

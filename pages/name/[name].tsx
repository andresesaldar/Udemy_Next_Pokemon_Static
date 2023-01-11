import { GetStaticPaths, GetStaticProps } from "next";
import {
	getPokemon,
	getPokemonByIdOrName,
	maxPokemon,
} from "../../integration/pokemon";
import MainLayout from "../../layouts/MainLayout";
import { NextPageWithLayout } from "../_app";
import { PokemonDetail } from "../../models/pokemon";
import PokemonDetailUI from "../../components/PokemonDetail";
import { ReactElement } from "react";

type PokemonDetailPaths = {
	name: string;
};

type PokemonDetailProps = {
	pokemon: PokemonDetail;
};

const PokemonDetail: NextPageWithLayout<PokemonDetailProps> = ({ pokemon }) => (
	<PokemonDetailUI pokemon={pokemon} />
);

PokemonDetail.getLayout = (page, { pokemon: { name, id } }): ReactElement => {
	name = name[0].toUpperCase() + name.substring(1);
	return (
		<MainLayout
			title={`${name} Detail`}
			description={`${name} Pokémon Detail`}
			extra={[name, id.toString()]}
		>
			{page}
		</MainLayout>
	);
};

export const getStaticPaths: GetStaticPaths<PokemonDetailPaths> = async () => {
	const pokemonList = await getPokemon({ limit: maxPokemon });
	return {
		fallback: false,
		paths: pokemonList
			.map(({ name }) => ({
				params: { name: name || "" },
			}))
			.filter((item) => !!item),
	};
};

export const getStaticProps: GetStaticProps<
	PokemonDetailProps,
	PokemonDetailPaths
> = async (ctx) => {
	const name = ctx.params?.name || "";
	const pokemon = await getPokemonByIdOrName(name);
	return {
		props: {
			pokemon,
		},
	};
};

export default PokemonDetail;

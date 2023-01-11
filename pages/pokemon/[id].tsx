import { GetStaticPaths, GetStaticProps } from "next";
import MainLayout from "../../layouts/MainLayout";
import { NextPageWithLayout } from "../_app";
import { PokemonDetail } from "../../models/pokemon";
import PokemonDetailUI from "../../components/PokemonDetail";
import { ReactElement } from "react";
import { getPokemonById } from "../../integration/pokemon";

type PokemonDetailPaths = {
	id: string;
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

export const getStaticPaths: GetStaticPaths<PokemonDetailPaths> = () => ({
	fallback: false,
	paths: [...Array(151)].map((_, id) => ({ params: { id: `${id + 1}` } })),
});

export const getStaticProps: GetStaticProps<
	PokemonDetailProps,
	PokemonDetailPaths
> = async (ctx) => {
	const id = Number(ctx.params?.id);
	const pokemon = await getPokemonById(id);
	return {
		props: {
			pokemon,
		},
	};
};

export default PokemonDetail;

import { FC } from "react";
import { Grid } from "@nextui-org/react";
import { Pokemon } from "../models/pokemon";
import PokemonCard from "./PokemonCard";

type PokemonGridProps = {
	pokemonList: Pokemon[];
};

const PokemonGrid: FC<PokemonGridProps> = ({ pokemonList }) => (
	<Grid.Container gap={1} justify="flex-start">
		{pokemonList.map((pokemon) => (
			<Grid xs={4} lg={3} key={pokemon.id}>
				<PokemonCard pokemon={pokemon} />
			</Grid>
		))}
	</Grid.Container>
);

export default PokemonGrid;

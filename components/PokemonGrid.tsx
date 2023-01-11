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
			<Grid sm={4} xs={6} lg={3} key={pokemon.id}>
				<PokemonCard pokemon={pokemon} />
			</Grid>
		))}
	</Grid.Container>
);

export default PokemonGrid;

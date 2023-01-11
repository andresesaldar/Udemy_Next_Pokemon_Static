import { FullPokemonDetail, Pokemon, PokemonDetail } from "../models/pokemon";
import axios from "axios";

const client = axios.create({
	baseURL: "https://pokeapi.co/api/v2",
});

export const maxPokemon = 649;

type GetPokemonResponse = {
	count: number;
	next: string;
	previous?: string;
	results: Partial<Pokemon>[];
};

type GetPokemonOptions = {
	limit?: number;
};

export const getPokemon = async (
	opt?: GetPokemonOptions,
): Promise<Pokemon[]> => {
	const {
		data: { results },
	} = await client.get<GetPokemonResponse>("/pokemon", {
		params: { limit: opt?.limit },
	});
	return results.map<Pokemon>(({ name, url }) => {
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
	});
};

export const getPokemonByIdOrName = async (
	idOrName: string | number,
): Promise<PokemonDetail> => {
	const {
		data: {
			abilities,
			base_experience,
			height,
			id,
			name,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			sprites: { versions, animated, ...sprites },
			stats,
			types,
			weight,
		},
	} = await client.get<FullPokemonDetail>(`/pokemon/${idOrName}`);
	return {
		abilities,
		base_experience,
		height,
		id,
		name,
		sprites,
		stats,
		types,
		weight,
	};
};

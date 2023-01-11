import { Pokemon, PokemonDetail } from "../models/pokemon";
import axios from "axios";

const client = axios.create({
	baseURL: "https://pokeapi.co/api/v2",
});

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
): Promise<GetPokemonResponse> => {
	const { data } = await client.get<GetPokemonResponse>("/pokemon", {
		params: { limit: opt?.limit },
	});
	return data;
};

export const getPokemonById = async (id: number): Promise<PokemonDetail> => {
	const { data } = await client.get<PokemonDetail>(`/pokemon/${id}`);
	return data;
};

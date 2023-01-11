import { Pokemon } from "../models/pokemon";

const key = "favorites";

export const toggleFavorite = (pokemon: Pokemon): boolean => {
	let currentFavorites: Pokemon[] = JSON.parse(
		localStorage.getItem(key) || "[]",
	);
	!!currentFavorites.find((item) => item.id === pokemon.id)
		? (currentFavorites = currentFavorites.filter(
				(item) => item.id !== pokemon.id,
		  ))
		: currentFavorites.push(pokemon);
	localStorage.setItem(key, JSON.stringify(currentFavorites));
	return !!currentFavorites.find((item) => item.id === pokemon.id);
};

export const isFavorite = (id: number): boolean => {
	const currentFavorites: Pokemon[] = JSON.parse(
		localStorage.getItem(key) || "[]",
	);
	return !!currentFavorites.find((item) => item.id === id);
};

export const allFavorites = (): Pokemon[] =>
	JSON.parse(localStorage.getItem(key) || "[]");

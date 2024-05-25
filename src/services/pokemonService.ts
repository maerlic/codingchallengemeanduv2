import axios from 'axios'; // Import axios for making HTTP requests
import { FlavorText, PokemonSpecies } from '../interfaces/pokemonInterfaces'; // Import TypeScript interfaces for type definitions
import { getTranslationType } from '../utils/translationHelper'; // Import translationHelper to figure out the translation type for different Pokemon
import logger from '../utils/logger'; // Import the logger for logging info and error messages

// Base URLs for the PokeAPI and FunTranslations API
const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon-species';
const TRANSLATE_URL = 'https://api.funtranslations.com/translate';

/**
 * Fetches data for a given Pokemon species name.
 * @param name - The name of the Pokemon species.
 * @returns An object containing the Pokemon's name, description, habitat, and legendary status.
 */
export const getPokemonData = async (name: string) => {
    logger.info(`Fetching data for Pokemon: ${name}`); // Log the fetch attempt

    const url = `${POKEAPI_URL}/${name}`; // Construct the URL for the PokeAPI request
    const response = await axios.get<PokemonSpecies>(url); // Make an HTTP GET request to the PokeAPI
    const pokemon = response.data; // Extract the data from the response

    // Find the first English flavor text description, or set an empty string if not found
    const description = pokemon.flavor_text_entries.find((f: FlavorText) => f.language.name === 'en')?.flavor_text || '';

    // Return an object containing the relevant Pokemon details
    return {
        name: pokemon.name, // Name of the Pokemon
        description, // English flavor text description of the Pokemon
        habitat: pokemon.habitat?.name, // Habitat of the Pokemon
        isLegendary: pokemon.is_legendary, // Legendary status of the Pokemon
    };
};

/**
 * Fetches data for a given Pokemon species name and translates its description.
 * @param name - The name of the Pokemon species.
 * @returns An object containing the Pokemon's name, translated description, habitat, legendary status, and the translation type applied.
 */
export const getPokemonDataAndTranslateDescription = async (name: string) => {
    logger.info(`Fetching data for Pokemon and translating the description: ${name}`);

    const pokemonData = await getPokemonData(name);
    logger.info(`Fetched Pokemon data: ${JSON.stringify(pokemonData)}`);

    const { description, habitat, isLegendary } = pokemonData;
    const translationType = getTranslationType(habitat, isLegendary);
    logger.info(`Translation Type: ${translationType}`);

    const translationUrl = `${TRANSLATE_URL}/${translationType}.json?text=${description}`;
    logger.info(`Translation URL: ${translationUrl}`);

    const translationResponse = await axios.get(translationUrl);
    logger.info(`Translation response: ${JSON.stringify(translationResponse.data)}`);

    const translatedDescription = translationResponse.data.contents.translated;

    return {
        ...pokemonData,
        description: translatedDescription,
        translationApplied: translationType,
    };
};
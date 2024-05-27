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
    logger.debug(`Constructed URL: ${url}`); // Log the constructed URL

    const response = await axios.get<PokemonSpecies>(url); // Make an HTTP GET request to the PokeAPI
    logger.info(`Received response for Pokemon: ${name}`); // Log the response received

    const pokemon = response.data; // Extract the data from the response
    logger.debug(`Extracted data: ${JSON.stringify(pokemon)}`); // Log the extracted data

    // Find the first English flavor text description, or set an empty string if not found
    const description = pokemon.flavor_text_entries.find((f: FlavorText) => f.language.name === 'en')?.flavor_text || '';
    logger.debug(`Found description: ${description}`); // Log the found description

    // Construct the result object
    const result = {
        name: pokemon.name, // Name of the Pokemon
        description, // English flavor text description of the Pokemon
        habitat: pokemon.habitat?.name, // Habitat of the Pokemon
        isLegendary: pokemon.is_legendary, // Legendary status of the Pokemon
    };
    logger.info(`Constructed result for Pokemon: ${name}`, { result }); // Log the constructed result

    return result; // Return the result
};
/**
 * Fetches data for a given Pokemon species name and translates its description.
 * @param name - The name of the Pokemon species.
 * @returns An object containing the Pokemon's name, translated description, habitat, legendary status, and the translation type applied.
 */
export const getPokemonDataAndTranslateDescription = async (name: string) => {
    // Log the start of the process for fetching and translating Pokemon data
    logger.info(`Fetching data for Pokemon and translating the description: ${name}`);

    // Fetch the Pokemon data using the provided species name
    const pokemonData = await getPokemonData(name);
    // Log the fetched Pokemon data
    logger.info(`Fetched Pokemon data: ${JSON.stringify(pokemonData)}`);

    // Destructure the necessary properties from the fetched Pokemon data
    const { description, habitat, isLegendary } = pokemonData;
    // Determine the type of translation to apply based on the Pokemon's habitat and legendary status
    const translationType = getTranslationType(habitat, isLegendary);
    // Log the determined translation type
    logger.info(`Translation Type: ${translationType}`);

    // Construct the URL for the translation API request
    const translationUrl = `${TRANSLATE_URL}/${translationType}.json?text=${description}`;
    // Log the constructed translation URL
    logger.info(`Translation URL: ${translationUrl}`);

    // Fetch the translated description from the translation API
    const translationResponse = await axios.get(translationUrl);
    // Log the response received from the translation API
    logger.info(`Translation response: ${JSON.stringify(translationResponse.data)}`);

    // Extract the translated description from the translation API response
    const translatedDescription = translationResponse.data.contents.translated;

    // Construct the result object containing the original Pokemon data and the translated description
    const result = {
        ...pokemonData,
        description: translatedDescription,
        translationApplied: translationType,
    };
    // Log the constructed result object
    logger.info(`Constructed result for Pokemon: ${name}`, { result });

    // Return the result object
    return result;
};

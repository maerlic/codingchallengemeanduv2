import axios from 'axios'; // Import axios for making HTTP requests
import express from 'express'; // Import express for type definitions for the request and response objects
import { FlavorText, PokemonSpecies } from '../interfaces/pokemonInterfaces'; // Adjust the path as needed

// Function to handle GET requests to fetch Pokemon data by species name
export async function getPokemon(req: express.Request, res: express.Response) {
    try {
        const { name } = req.params; // Extract the Pokemon species name from the request parameters
        const url = `https://pokeapi.co/api/v2/pokemon-species/${name}`; // Construct the URL to fetch Pokemon species data
        const response = await axios.get<PokemonSpecies>(url); // Make an HTTP GET request to the PokeAPI
        const pokemon = response.data; // Extract the data from the response

        // Construct an object with the relevant Pokemon details
        const pokemonDetails = {
            name: pokemon.name, // Name of the Pokemon
            description: pokemon.flavor_text_entries.find((f: FlavorText) => f.language.name === 'en')?.flavor_text, // The first English flavor text description
            habitat: pokemon.habitat?.name, // Habitat of the Pokemon
            isLegendary: pokemon.is_legendary // Legendary status of the Pokemon
        };

        res.json(pokemonDetails); // Send the constructed object as a JSON response
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" }); // Handle errors by sending a 500 response with an error message
    }
}

// Function to handle GET requests to fetch and translate Pokemon descriptions by species name
export async function getPokemonTranslated(req: express.Request, res: express.Response) {
    try {
        const { name } = req.params; // Extract the Pokemon species name from the request parameters
        const url = `https://pokeapi.co/api/v2/pokemon-species/${name}`; // Construct the URL to fetch Pokemon species data
        const response = await axios.get<PokemonSpecies>(url); // Make an HTTP GET request to the PokeAPI
        const pokemon = response.data; // Extract the data from the response

        // Extract the first English flavor text description
        const description = pokemon.flavor_text_entries.find((f: FlavorText) => f.language.name === 'en')?.flavor_text;
        const habitat = pokemon.habitat?.name; // Extract the habitat of the Pokemon
        const isLegendary = pokemon.is_legendary; // Extract the legendary status of the Pokemon

        // Determine the translation type based on habitat and legendary status
        const translationType = (habitat === 'cave' || isLegendary) ? 'yoda' : 'shakespeare';
        const translationUrl = `https://api.funtranslations.com/translate/${translationType}.json?text=${description}`; // Construct the URL for the FunTranslations API

        const translationResponse = await axios.get(translationUrl); // Make an HTTP GET request to the FunTranslations API
        const translatedDescription = translationResponse.data.contents.translated; // Extract the translated description from the response

        // Construct an object with the relevant Pokemon details and the translated description
        const pokemonTranslatedDetails = {
            name: pokemon.name, // Name of the Pokemon
            description: translatedDescription, // Translated description of the Pokemon
            habitat, // Habitat of the Pokemon
            isLegendary, // Legendary status of the Pokemon
            translationApplied: translationType // The type of translation applied (Yoda or Shakespeare)
        };

        res.json(pokemonTranslatedDetails); // Send the constructed object as a JSON response
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch or translate data" }); // Handle errors by sending a 500 response with an error message
    }
}

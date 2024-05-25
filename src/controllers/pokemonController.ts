import express from 'express'; // Import express for type definitions for the request and response objects
import { getPokemonData, getTranslatedDescription } from '../services/pokemonService'; // Import the service functions
import logger from '../utils/logger'; // Import the logger for logging error and info messages

/**
 * Controller function to handle GET requests for fetching Pokemon data by species name.
 * It retrieves Pokemon data and sends it back as a JSON response.
 */
export const getPokemon = async (req: express.Request, res: express.Response) => {
    try {
        const { name } = req.params; // Extract the Pokemon species name from the request parameters
        const pokemonData = await getPokemonData(name); // Fetch Pokemon data using the service function
        res.json(pokemonData); // Send the fetched Pokemon data as a JSON response
    } catch (error) {
        // Log the error message and stack trace for debugging purposes
        logger.error(`Failed to fetch data for Pokemon: ${req.params.name}. Error: ${(error as Error).message}`, {
            stack: (error as Error).stack,
        });
        res.status(500).json({ error: 'Failed to fetch data' }); // Send a 500 response with an error message
    }
};

/**
 * Controller function to handle GET requests for fetching and translating Pokemon data's descriptions by species name.
 * It retrieves Pokemon data, translates the description, and sends it back as a JSON response.
 */
export const getPokemonTranslated = async (req: express.Request, res: express.Response) => {
    try {
        const { name } = req.params; // Extract the Pokemon species name from the request parameters
        const translatedData = await getTranslatedDescription(name); // Fetch and translate Pokemon description using the service function
        res.json(translatedData); // Send the translated Pokemon data as a JSON response
    } catch (error) {
        // Log the error message and stack trace for debugging purposes
        logger.error(`Failed to fetch or translate data for Pokemon: ${req.params.name}. Error: ${(error as Error).message}`, {
            stack: (error as Error).stack,
        });
        res.status(500).json({ error: 'Failed to fetch or translate data' }); // Send a 500 response with an error message
    }
};

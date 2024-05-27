import express from 'express'; // Import express for type definitions for the request and response objects
import { getPokemonData, getPokemonDataAndTranslateDescription } from '../services/pokemonService'; // Import the service functions
import logger from '../utils/logger'; // Import the logger for logging error and info messages
import { validatePokemonName } from '../utils/validation'; // Import the validation function

/**
 * Controller function to handle GET requests for fetching Pokemon data by species name.
 * It retrieves Pokemon data and sends it back as a JSON response.
 */
export const getPokemon = async (req: express.Request, res: express.Response) => {
    try {
        // Extract the Pokemon species name from the request parameters
        const { name } = req.params; 

        // Validate the Pokemon species name to ensure it contains only valid characters
        if (!validatePokemonName(name)) {
            // If the validation fails, return a 400 response with an appropriate error message
            return res.status(400).json({ error: 'Invalid Pokemon name. It contains invalid characters.' });
        }
        // Fetch Pokemon data using the service function
        const pokemonData = await getPokemonData(name); 

        // Send the fetched Pokemon data as a JSON response
        res.json(pokemonData); 
    } catch (error) {
        // Log the error message and stack trace for debugging purposes
        logger.error(`Failed to fetch data for Pokemon: ${req.params.name}. Error: ${(error as Error).message}`, {
            stack: (error as Error).stack,
        });
        // Send a 500 response with an error message
        res.status(500).json({ error: 'Failed to fetch data' }); 
    }
};

/**
 * Controller function to handle GET requests for fetching and translating Pokemon data's descriptions by species name.
 * It retrieves Pokemon data, translates the description, and sends it back as a JSON response.
 */
export const getPokemonTranslated = async (req: express.Request, res: express.Response) => {
    try {
        // Extract the Pokemon species name from the request parameters
        const { name } = req.params; 

        // Validate the Pokemon species name to ensure it contains only valid characters
        if (!validatePokemonName(name)) {
            // If the validation fails, return a 400 response with an appropriate error message
            return res.status(400).json({ error: 'Invalid Pokemon name. It contains invalid characters.' });
        }
        // Fetch and translate Pokemon description using the service function
        const translatedData = await getPokemonDataAndTranslateDescription(name); 

        // Send the translated Pokemon data as a JSON response
        res.json(translatedData); 
    } catch (error) {
        // Log the error message and stack trace for debugging purposes
        logger.error(`Failed to fetch or translate data for Pokemon: ${req.params.name}. Error: ${(error as Error).message}`, {
            stack: (error as Error).stack,
        });
        // Send a 500 response with an error message
        res.status(500).json({ error: 'Failed to fetch or translate data' }); 
    }
};

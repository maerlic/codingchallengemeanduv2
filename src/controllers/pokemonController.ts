import express from 'express'; // Import express for type definitions for the request and response objects
import { getPokemonData, getTranslatedDescription } from '../services/pokemonService';

export const getPokemon = async (req: express.Request, res: express.Response) => {
    try {
        const { name } = req.params;
        const pokemonData = await getPokemonData(name);
        res.json(pokemonData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

export const getPokemonTranslated = async (req: express.Request, res: express.Response) => {
    try {
        const { name } = req.params;
        const translatedData = await getTranslatedDescription(name);
        res.json(translatedData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch or translate data' });
    }
};

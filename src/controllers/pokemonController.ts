import axios from 'axios';
import express from 'express'; 

interface FlavorText {
    flavor_text: string;
    language: {
        name: string;
    };
    version: {
        name: string;
    };
}

interface PokemonSpecies {
    name: string;
    habitat: {
        name: string;
    };
    is_legendary: boolean;
    flavor_text_entries: FlavorText[];
}

export async function getPokemon(req: express.Request, res: express.Response) {
    try {
        const { name } = req.params;
        const url = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
        const response = await axios.get<PokemonSpecies>(url);
        const pokemon = response.data;

        const pokemonDetails = {
            name: pokemon.name,
            description: pokemon.flavor_text_entries.find((f: FlavorText) => f.language.name === 'en')?.flavor_text,
            habitat: pokemon.habitat?.name,
            isLegendary: pokemon.is_legendary
        };

        res.json(pokemonDetails);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
}

export async function getPokemonTranslated(req: express.Request, res: express.Response) {
    try {
        const { name } = req.params;
        const url = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
        const response = await axios.get<PokemonSpecies>(url);
        const pokemon = response.data;

        const description = pokemon.flavor_text_entries.find((f: FlavorText) => f.language.name === 'en')?.flavor_text;
        const habitat = pokemon.habitat?.name;
        const isLegendary = pokemon.is_legendary;
        const translationType = (habitat === 'cave' || isLegendary) ? 'yoda' : 'shakespeare';
        const translationUrl = `https://api.funtranslations.com/translate/${translationType}.json?text=${description}`;

        const translationResponse = await axios.get(translationUrl);
        const translatedDescription = translationResponse.data.contents.translated;

        const pokemonTranslatedDetails = {
            name: pokemon.name,
            description: translatedDescription,
            habitat,
            isLegendary,
            translationApplied: translationType
        };

        res.json(pokemonTranslatedDetails);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch or translate data" });
    }
}

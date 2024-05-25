import axios from 'axios';
import { FlavorText, PokemonSpecies } from '../interfaces/pokemonInterfaces';

const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon-species';
const TRANSLATE_URL = 'https://api.funtranslations.com/translate';

export const getPokemonData = async (name: string) => {
    const url = `${POKEAPI_URL}/${name}`;
    const response = await axios.get<PokemonSpecies>(url);
    const pokemon = response.data;

    const description = pokemon.flavor_text_entries.find((f: FlavorText) => f.language.name === 'en')?.flavor_text || '';

    return {
        name: pokemon.name,
        description,
        habitat: pokemon.habitat?.name,
        isLegendary: pokemon.is_legendary,
    };
};

export const getTranslatedDescription = async (name: string) => {
    const pokemonData = await getPokemonData(name);
    const { description, habitat, isLegendary } = pokemonData;
    const translationType = (habitat === 'cave' || isLegendary) ? 'yoda' : 'shakespeare';
    const translationUrl = `${TRANSLATE_URL}/${translationType}.json?text=${description}`;

    const translationResponse = await axios.get(translationUrl);
    const translatedDescription = translationResponse.data.contents.translated;

    return {
        ...pokemonData,
        description: translatedDescription,
        translationApplied: translationType,
    };
};

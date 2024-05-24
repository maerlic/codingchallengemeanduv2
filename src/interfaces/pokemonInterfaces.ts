// Define an interface for the structure of the flavor text entries in the PokeAPI response
export interface FlavorText {
    flavor_text: string; // The flavor text description of the Pokemon
    language: {
        name: string; // The language in which the flavor text is provided
    };
    version: {
        name: string; // The version of the game from which the flavor text is taken
    };
}

// Define an interface for the structure of the Pokemon species data in the PokeAPI response
export interface PokemonSpecies {
    name: string; // The name of the Pokemon
    habitat: {
        name: string; // The habitat of the Pokemon
    };
    is_legendary: boolean; // Indicates if the Pokemon is legendary
    flavor_text_entries: FlavorText[]; // An array of flavor text entries
}

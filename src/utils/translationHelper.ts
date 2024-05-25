import { translationConfig } from '../config/translationConfig'; // Import the translation configuration object

/**
 * Determines the translation type based on the habitat and legendary status of a Pokemon.
 * @param habitat - The habitat of the Pokemon.
 * @param isLegendary - The legendary status of the Pokemon.
 * @returns The translation type to be applied.
 */
export const getTranslationType = (habitat: string, isLegendary: boolean): string => {
    // Iterate over each rule in the translation configuration
    for (const rule of translationConfig.rules) {
        // Check if the current rule's condition function returns true
        if (rule.condition(habitat, isLegendary)) {
            // If the condition is met, return the translation type specified by the rule
            return rule.translation;
        }
    }
    // If no rules match, return the default translation type
    return translationConfig.default;
};

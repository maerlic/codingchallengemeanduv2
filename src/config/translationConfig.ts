// Configuration object for translation settings
export const translationConfig = {
    // Default translation type to use if no conditions match
    default: 'shakespeare',

    // Array of translation rules to determine the translation type based on certain conditions
    rules: [
        {
            // Condition function that checks if the Pokemon's habitat is 'cave' or if it is legendary
            // If this condition is true, the 'yoda' translation type will be used
            condition: (habitat: string, isLegendary: boolean) => habitat === 'cave' || isLegendary,

            // Translation type to apply if the condition is met
            translation: 'yoda'
        }
    ]
};

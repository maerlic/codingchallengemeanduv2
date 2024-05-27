/**
 * Validates that the provided name contains only valid characters and no multiple consecutive spaces.
 * @param name - The name to validate.
 * @returns boolean indicating if the name is valid.
 */
export const validatePokemonName = (name: string): boolean => {
    // Trim leading and trailing spaces
    const trimmedName = name.trim();
    // Regular expression to check if the name contains valid characters and no multiple consecutive spaces
    const regex = /^(?!.* {2})[a-zA-Z0-9 .♀♂'-]+$/;
    return regex.test(trimmedName);
};

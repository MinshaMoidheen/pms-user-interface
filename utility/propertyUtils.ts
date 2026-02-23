/**
 * Utility to retrieve a value from a flexibleFields object using fuzzy key matching.
 * This handles inconsistencies like "bathroom" vs "bathrooms" vs "Bathrooms".
 *
 * @param flexibleFields The object containing flexible fields
 * @param possibleKeys An array of possible keys to look for (e.g., ["bedroom", "bedrooms"])
 * @returns The value of the field if found, otherwise undefined
 */
export const getFlexibleField = (
  flexibleFields: any,
  possibleKeys: string[],
): any => {
  if (!flexibleFields || typeof flexibleFields !== "object") return undefined;

  const actualKeys = Object.keys(flexibleFields);

  // 1. Try exact match from possibleKeys first (following order of preference)
  for (const key of possibleKeys) {
    if (flexibleFields[key] !== undefined) {
      return flexibleFields[key];
    }
  }

  // 2. Try case-insensitive exact match
  for (const requestedKey of possibleKeys) {
    const lowerRequested = requestedKey.toLowerCase();
    const foundKey = actualKeys.find((k) => k.toLowerCase() === lowerRequested);
    if (foundKey) {
      return flexibleFields[foundKey];
    }
  }

  // 3. Try partial fuzzy match (if any actual key contains a requested key or vice-versa)
  // This helps with things like "Bathromms" (typo) - though perfect fuzzy matching is hard without a library,
  // we can check if the strings are very similar or contain each other.
  for (const requestedKey of possibleKeys) {
    const lowerRequested = requestedKey.toLowerCase();

    // Check for keys that contain the requested string (e.g., "num_bathrooms" matches "bathroom")
    const partialMatch = actualKeys.find((k) => {
      const lowerActual = k.toLowerCase();
      return (
        lowerActual.includes(lowerRequested) ||
        lowerRequested.includes(lowerActual)
      );
    });

    if (partialMatch) {
      return flexibleFields[partialMatch];
    }
  }

  return undefined;
};

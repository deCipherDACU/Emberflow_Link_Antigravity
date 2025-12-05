
export const errorMessages = {
  // Firebase Firestore Errors
  firestore: {
    permissionDenied: "You don't have permission to access this data. Please check your login status.",
    unavailable: "The database is temporarily unavailable. Please try again later.",
    notFound: "The requested document or collection could not be found.",
    unknown: "An unknown database error occurred.",
  },

  // Firebase Authentication Errors
  auth: {
    invalidEmail: "The email address is not valid.",
    userNotFound: "No account found with this email.",
    wrongPassword: "The password is incorrect. Please try again.",
    emailAlreadyInUse: "This email address is already in use by another account.",
    weakPassword: "The password is too weak. Please use at least 6 characters.",
    requiresRecentLogin: "This action requires you to have recently logged in. Please sign out and sign in again.",
    networkRequestFailed: "A network error occurred. Please check your connection and try again.",
  },

  // Genkit / AI Errors
  ai: {
    generationFailed: "The AI failed to generate a response. Please try again.",
    rateLimitExceeded: "You've made too many requests to the AI service. Please wait a moment before trying again.",
    contentFiltered: "The AI response was blocked due to safety filters.",
    unavailable: "The AI service is currently unavailable. Please try again later.",
  },

  // General Network Errors
  network: {
    offline: "You are currently offline. Please check your internet connection.",
    requestFailed: "A network request failed. Please check your connection and try again.",
  },

  // Generic/Unknown Errors
  unknown: "An unexpected error occurred. Please try again or contact support if the problem persists.",
};

export type ErrorCategory = keyof typeof errorMessages;
export type ErrorKey<T extends ErrorCategory> = keyof (typeof errorMessages)[T];

/**
 * A helper function to get a specific error message.
 * @param category - The category of the error.
 * @param key - The specific error key.
 * @returns A user-friendly error string.
 */
export function getErrorMessage<T extends ErrorCategory>(category: T, key: ErrorKey<T>): string {
    return errorMessages[category][key] || errorMessages.unknown;
}

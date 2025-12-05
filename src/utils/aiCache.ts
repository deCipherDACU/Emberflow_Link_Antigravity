/**
 * @fileOverview A client-side caching utility for Gemini AI responses.
 *
 * This utility provides a simple, localStorage-based cache to store results
 * from AI generations, reducing redundant API calls for repeated prompts.
 *
 * It includes features for:
 * - Storing and retrieving responses based on a hash of the prompt.
 * - Time-to-live (TTL) for cache entries (default is 1 hour).
 * - Automatic cache eviction (FIFO) when the size limit (50 entries) is reached.
 * - Manual cache invalidation for specific entries or the entire cache.
 */

const CACHE_KEY = 'gemini-ai-cache';
const MAX_CACHE_SIZE = 50;
const DEFAULT_TTL = 3600000; // 1 hour in milliseconds

interface CacheEntry<T> {
  response: T;
  timestamp: number;
}

interface CacheIndex {
  [key: string]: number; // Maps hash to timestamp
}

/**
 * A simple hashing function to create a key from a string prompt.
 * @param str The string to hash.
 * @returns A numeric hash.
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

/**
 * Retrieves the cache index from localStorage.
 * @returns The cache index object.
 */
function getCacheIndex(): CacheIndex {
  try {
    const index = localStorage.getItem(`${CACHE_KEY}-index`);
    return index ? JSON.parse(index) : {};
  } catch (error) {
    console.error("Failed to read AI cache index:", error);
    return {};
  }
}

/**
 * Saves the cache index to localStorage.
 * @param index The cache index object to save.
 */
function saveCacheIndex(index: CacheIndex) {
  try {
    localStorage.setItem(`${CACHE_KEY}-index`, JSON.stringify(index));
  } catch (error) {
    console.error("Failed to save AI cache index:", error);
  }
}

/**
 * Retrieves a cached AI response.
 * @param prompt The original AI prompt string.
 * @returns The cached response if found and valid, otherwise null.
 */
export function get<T>(prompt: string): T | null {
  if (typeof window === 'undefined') return null;

  const key = simpleHash(prompt).toString();
  
  try {
    const item = localStorage.getItem(`${CACHE_KEY}-${key}`);
    if (!item) return null;

    const entry: CacheEntry<T> = JSON.parse(item);
    const isExpired = (Date.now() - entry.timestamp) > DEFAULT_TTL;

    if (isExpired) {
      invalidate(prompt);
      return null;
    }

    return entry.response;
  } catch (error) {
    console.error(`Failed to retrieve AI cache for key ${key}:`, error);
    return null;
  }
}

/**
 * Stores an AI response in the cache.
 * Handles cache size limits by evicting the oldest entry if necessary.
 * @param prompt The original AI prompt string.
 * @param response The AI response to cache.
 */
export function set<T>(prompt: string, response: T) {
  if (typeof window === 'undefined') return;
  
  const key = simpleHash(prompt).toString();
  const entry: CacheEntry<T> = { response, timestamp: Date.now() };

  try {
    const index = getCacheIndex();

    // Evict oldest entry if cache is full and the new key is not already present
    if (Object.keys(index).length >= MAX_CACHE_SIZE && !index[key]) {
      const oldestKey = Object.entries(index).sort(([, a], [, b]) => a - b)[0]?.[0];
      if (oldestKey) {
        localStorage.removeItem(`${CACHE_KEY}-${oldestKey}`);
        delete index[oldestKey];
      }
    }

    // Set new item and update index
    localStorage.setItem(`${CACHE_KEY}-${key}`, JSON.stringify(entry));
    index[key] = entry.timestamp;
    saveCacheIndex(index);
  } catch (error) {
     console.error(`Failed to set AI cache for key ${key}:`, error);
     // If storage is full, try to clear the whole cache and retry
     if (error instanceof DOMException && (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
        console.warn('Cache quota exceeded. Clearing cache and retrying.');
        clear();
        try {
            localStorage.setItem(`${CACHE_KEY}-${key}`, JSON.stringify(entry));
            const index = { [key]: entry.timestamp };
            saveCacheIndex(index);
        } catch (retryError) {
             console.error('Failed to set AI cache even after clearing:', retryError);
        }
     }
  }
}

/**
 * Removes a specific prompt's response from the cache.
 * @param prompt The original AI prompt string to invalidate.
 */
export function invalidate(prompt: string) {
  if (typeof window === 'undefined') return;
  
  const key = simpleHash(prompt).toString();
  try {
    localStorage.removeItem(`${CACHE_KEY}-${key}`);
    const index = getCacheIndex();
    delete index[key];
    saveCacheIndex(index);
  } catch (error) {
    console.error(`Failed to invalidate AI cache for key ${key}:`, error);
  }
}

/**
 * Clears the entire AI response cache from localStorage.
 */
export function clear() {
  if (typeof window === 'undefined') return;

  try {
    const index = getCacheIndex();
    for (const key in index) {
      localStorage.removeItem(`${CACHE_KEY}-${key}`);
    }
    localStorage.removeItem(`${CACHE_KEY}-index`);
  } catch (error) {
    console.error("Failed to clear AI cache:", error);
  }
}

const aiCache = {
  get,
  set,
  invalidate,
  clear,
};

export default aiCache;

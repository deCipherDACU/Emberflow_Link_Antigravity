/**
 * @fileOverview A utility for measuring client-side performance in development.
 *
 * This module provides simple functions to start and end performance timers.
 * It is designed to be completely inert in production environments to avoid
 * any performance overhead.
 *
 * - startTimer(): Begins a timer.
 * - endTimer(startTime, label): Ends a timer and logs the duration.
 * - measureAsync(label, promise): Wraps a promise to measure its resolution time.
 */

const IS_DEV = process.env.NODE_ENV === 'development';
const SLOW_OPERATION_THRESHOLD = 3000; // 3 seconds in milliseconds

type TimerHandle = number | null;

/**
 * Starts a performance timer. Only runs in development mode.
 * @returns A high-resolution timestamp from `performance.now()` or null if in production.
 */
export function startTimer(): TimerHandle {
  if (!IS_DEV || typeof window === 'undefined' || !window.performance) {
    return null;
  }
  return window.performance.now();
}

/**
 * Ends a performance timer and logs the duration to the console.
 * It will log a warning for operations that exceed the SLOW_OPERATION_THRESHOLD.
 * This function does nothing if the startTime is null (i.e., in production).
 *
 * @param startTime - The timestamp returned by startTimer.
 * @param label - A descriptive label for the operation being measured (e.g., "Component Render: MyComponent").
 */
export function endTimer(startTime: TimerHandle, label: string): void {
  if (startTime === null || typeof window === 'undefined' || !window.performance) {
    return;
  }

  const duration = window.performance.now() - startTime;

  if (duration > SLOW_OPERATION_THRESHOLD) {
    console.warn(
      `%c🐢 Slow Operation%c: "${label}" took %c${duration.toFixed(2)}ms`,
      'color: yellow; font-weight: bold;',
      'color: inherit;',
      'color: red; font-weight: bold;'
    );
  } else {
    // Uncomment the line below if you want to log all performance timings
    // console.log(`%c⏱️ Perf%c: "${label}" took %c${duration.toFixed(2)}ms`, 'color: cyan;', 'color: inherit;', 'color: lightgreen;');
  }
}

/**
 * A helper function to wrap and measure the duration of an asynchronous operation (Promise).
 *
 * @template T - The type of the promise's resolution value.
 * @param {string} label - A descriptive label for the async operation.
 * @param {Promise<T>} promise - The promise to measure.
 * @returns {Promise<T>} The original promise.
 */
export async function measureAsync<T>(label: string, promise: Promise<T>): Promise<T> {
  const startTime = startTimer();
  
  try {
    return await promise;
  } finally {
    endTimer(startTime, label);
  }
}

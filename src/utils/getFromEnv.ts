/**
 * Utility function to safely retrieve environment variables with fallback values
 * Handles the boilerplate of checking for environment variables and providing defaults
 */

/**
 * Get a string value from environment variables with a fallback
 * @param key - The environment variable key to look for (without the VITE_ prefix)
 * @param fallback - The default value to use if the environment variable is not set
 * @returns The environment variable value or the fallback
 */
export const getStringFromEnv = (key: string, fallback: string): string => {
  const fullKey = `VITE_${key}`;
  return import.meta.env[fullKey] || fallback;
};

/**
 * Get a boolean value from environment variables with a fallback
 * @param key - The environment variable key to look for (without the VITE_ prefix)
 * @param fallback - The default value to use if the environment variable is not set
 * @returns The environment variable value as a boolean or the fallback
 */
export const getBooleanFromEnv = (key: string, fallback: boolean): boolean => {
  const fullKey = `VITE_${key}`;
  const value = import.meta.env[fullKey];
  
  if (value === undefined) return fallback;
  if (typeof value === 'boolean') return value;
  
  // Handle string values like 'true', 'false'
  return value === 'true' || value === '1';
};

/**
 * Get a number value from environment variables with a fallback
 * @param key - The environment variable key to look for (without the VITE_ prefix)
 * @param fallback - The default value to use if the environment variable is not set
 * @returns The environment variable value as a number or the fallback
 */
export const getNumberFromEnv = (key: string, fallback: number): number => {
  const fullKey = `VITE_${key}`;
  const value = import.meta.env[fullKey];
  
  if (value === undefined) return fallback;
  
  const parsed = Number(value);
  return isNaN(parsed) ? fallback : parsed;
};

// Common environment variables used in the application
export const getFlowLauncherPath = (): string => {
  return getStringFromEnv('FLOW_LAUNCHER_PATH', 'C:\\Program Files\\FlowLauncher\\Flow.Launcher.exe');
};

export const getUseAutoTiling = (): boolean => {
  return getBooleanFromEnv('USE_AUTOTILING', false);
};

export const getAutoTilingWebSocketUri = (): string => {
  return getStringFromEnv('AUTOTILING_WEBSOCKET_URI', 'ws://localhost:6123');
};
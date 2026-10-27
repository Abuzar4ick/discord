/** Central place for Vite env vars — import this instead of import.meta.env everywhere. */
export const env = {
  apiUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:4000',
  useMock: (import.meta.env.VITE_USE_MOCK ?? 'true') !== 'false',
} as const

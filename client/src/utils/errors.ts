import axios from 'axios'

/** Pull a human-readable message from axios or generic errors. */
export function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string; error?: string } | undefined
    if (data?.message) return data.message
    if (data?.error) return data.error
    if (error.message) return error.message
  }
  if (error instanceof Error && error.message) return error.message
  return fallback
}

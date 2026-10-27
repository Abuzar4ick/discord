import axios from 'axios'
import { env } from '../config/env'

/** Shared axios instance — point VITE_API_URL at your backend when ready. */
export const apiClient = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
})

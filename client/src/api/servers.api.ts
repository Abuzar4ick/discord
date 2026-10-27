import { env } from '../config/env'
import { mockServers } from '../data/mock/servers'
import type { Server } from '../types/models'
import { apiClient } from './client'

const MOCK_DELAY_MS = 600

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Replace mock branch with apiClient.get('/servers') when backend exists. */
export async function fetchServers(): Promise<Server[]> {
  if (env.useMock) {
    await delay(MOCK_DELAY_MS)
    return structuredClone(mockServers)
  }

  const { data } = await apiClient.get<Server[]>('/servers')
  return data
}

import { create } from "zustand"

type SimulationParams = {
  order_size_usd: number
  fee_rate?: number
  order_type: string
  asset: string
  volatility: number
}

type Store = {
  tick: any
  metrics: any
  history: { time: string; latency: number }[]
  setLiveConfig: (config: SimulationParams) => void
  fetchLiveOutput: () => void
  fetchTick: () => void 
}

export const useTickStore = create<Store>((set, get) => ({
  tick: null,
  metrics: null,
  history: [], 

  fetchTick: async () => {
    const res = await fetch("http://localhost:8000/api/v1/tick")
    const data = await res.json()
    const now = new Date().toLocaleTimeString()
    const latency = data.latency_ms ?? 0

    set({
      tick: data,
      history: [...get().history.slice(-29), { time: now, latency }],
    })
  },

  setLiveConfig: async (config) => {
    await fetch("http://localhost:8000/api/v1/live-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    })
  },

  fetchLiveOutput: async () => {
    const res = await fetch("http://localhost:8000/api/v1/live-output")
    const data = await res.json()
    set({ metrics: data })
  },

  
}))

// lib/store.ts
import { create } from "zustand"

type Output = {
  slippage: number
  fee: number
  market_impact: number
  net_cost: number
  latency_ms: number
  maker_taker_ratio: string
  asset: string
}

type Store = {
  output: Output | null
  setOutput: (o: Output) => void
}

export const useOutputStore = create<Store>((set) => ({
  output: null,
  setOutput: (o) => set({ output: o }),
}))

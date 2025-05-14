"use client"

import { useEffect } from "react"
import { useTickStore } from "@/lib/tickStore"
import MetricCard from "./MetricCard"

export default function OutputMetrics() {
  const { metrics, fetchLiveOutput } = useTickStore()

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLiveOutput()
    }, 1000)

    return () => clearInterval(interval)
  }, [fetchLiveOutput])

  if (!metrics) return <p className="text-muted-foreground">Waiting for live metrics...</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MetricCard label="Asset" value={metrics.asset} />
      <MetricCard label="Slippage" value={`${metrics.slippage}`} />
      <MetricCard label="Fee" value={`${metrics.fee}`} />
      <MetricCard label="Market Impact" value={`${metrics.market_impact}`} />
      <MetricCard label="Net Cost" value={`${metrics.net_cost}`} />
      <MetricCard label="Latency" value={`${metrics.latency_ms} ms`} />
      <MetricCard label="Maker/Taker Ratio" value={metrics.maker_taker_ratio} />
    </div>
  )
}

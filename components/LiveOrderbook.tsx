
"use client"

import { useTickStore } from "@/lib/tickStore"

export default function LiveOrderbook() {
  const tick = useTickStore((s) => s.tick)

  if (!tick) return <p className="text-muted-foreground">Waiting for tick...</p>

  return (
    <div className="p-4 bg-card rounded-xl shadow-lg ring-1 ring-muted/10">
      <h3 className="font-semibold mb-2">Live Orderbook</h3>
      <p>Best Bid: <span className="text-green-500">${tick.best_bid}</span></p>
      <p>Best Ask: <span className="text-red-500">${tick.best_ask}</span></p>
      <p>Mid Price: <span className="text-blue-500">${tick.mid_price}</span></p>
      <p className="text-xs text-muted-foreground mt-1">Updated: {new Date(tick.timestamp).toLocaleTimeString()}</p>
    </div>
  )
}


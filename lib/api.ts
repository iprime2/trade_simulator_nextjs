// lib/api.ts
export async function simulateTrade(data: {
    order_size_usd: number
    fee_rate?: number
    order_type: string
    volatility: number
    asset: string
  }) {
    const res = await fetch("http://localhost:8000/api/v1/simulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  
    if (!res.ok) throw new Error("Failed to simulate trade")
    return await res.json()
  }
  
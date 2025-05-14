// lib/api.ts
export async function simulateTrade(data: {
    order_size_usd: number
    fee_rate?: number
    order_type: string
    volatility: number
    asset: string
  }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PYTHON_API_URL}/simulate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  
    if (!res.ok) throw new Error("Failed to simulate trade")
    return await res.json()
  }
  
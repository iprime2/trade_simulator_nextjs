"use client"

import InputForm from "@/components/InputForm"
import LatencyChart from "@/components/LatencyChart"
import LiveOrderbook from "@/components/LiveOrderbook"
import OutputMetrics from "@/components/OutputMetrics"
import { useTickStore } from "@/lib/tickStore"
import { useEffect } from "react"

export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 min-h-screen bg-background text-foreground">
      <div className="bg-card p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Trade Parameters</h2>
        <InputForm />
      </div>
      <div className="bg-card p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Simulated Cost Output</h2>
        <OutputMetrics />
        <LiveOrderbook />
        <LatencyChart />
      </div>
    </main>
  )
}

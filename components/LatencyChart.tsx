"use client"

import { Line } from "react-chartjs-2"
import { useTickStore } from "@/lib/tickStore"
import { useEffect } from "react"
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js"

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip)

export default function LatencyChart() {
  const history = useTickStore((s) => s.history)
  const fetchTick = useTickStore((s) => s.fetchTick)

  useEffect(() => {
    const interval = setInterval(fetchTick, 1000)
    return () => clearInterval(interval)
  }, [fetchTick])

  return (
    <div className="p-4 bg-card rounded-xl shadow mt-4">
      <h3 className="font-semibold mb-2">Tick Latency (ms)</h3>
      <Line
        data={{
          labels: history.map((h) => h.time),
          datasets: [
            {
              label: "Latency",
              data: history.map((h) => h.latency),
              borderColor: "rgb(59,130,246)",
              backgroundColor: "rgba(59,130,246,0.2)",
              tension: 0.4,
              fill: true,
              pointRadius: 2,
            },
          ],
        }}
        options={{
          responsive: true,
          animation: false,
          scales: { y: { beginAtZero: true } },
          plugins: {
            tooltip: {
              callbacks: {
                // @ts-ignore
                label: (ctx) => ` ${ctx.raw.toFixed(4)} ms`,
              },
            },
          },
        }}
      />
    </div>
  )
}

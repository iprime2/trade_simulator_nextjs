"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { simulateTrade } from "@/lib/api"
import { useOutputStore } from "@/lib/store"
import { SpotAssetCombobox } from "./SpotAssetCombobox"
import { useTickStore } from "@/lib/tickStore"
import toast from "react-hot-toast"

export default function InputForm() {
  const [orderSize, setOrderSize] = useState("100")
  const [feeRate, setFeeRate] = useState("0.001")
  const [orderType, setOrderType] = useState("taker")
  const [volatility, setVolatility] = useState(0.5)
  const [assets, setAssets] = useState<string[]>([])
  const [selectedAsset, setSelectedAsset] = useState("BTC-USDT")
  const setOutput = useOutputStore((s) => s.setOutput)
  const [loading, setLoading] = useState(false)
  const { setLiveConfig } = useTickStore()


  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await fetch("https://www.okx.com/api/v5/public/instruments?instType=SPOT")
        const data = await res.json()
        const symbols = data.data.map((d: any) => d.instId).slice(0, 50) // first 50 assets
        setAssets(symbols)
      } catch (err) {
        console.error("Failed to fetch OKX spot assets", err)
      }
    }
    fetchAssets()
  }, [])

  // useEffect(() => {
  //   if (selectedAsset) {
  //     fetch("http://localhost:8000/api/v1/select-asset", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ asset: selectedAsset })
  //     })
  //   }
  // }, [selectedAsset])


// useEffect(() => {
//   if (selectedAsset) {
//     setLiveConfig({
//       order_size_usd: parseFloat(orderSize),
//       fee_rate: parseFloat(feeRate) || undefined,
//       order_type: orderType,
//       asset: selectedAsset,
//       volatility,
//     })
//   }
// }, [orderSize, feeRate, orderType, selectedAsset, volatility])


  const handleSimulate = async () => {
    if (!orderSize || isNaN(+orderSize)) return toast.error("Invalid order size")
    setLoading(true)
    try {
      if (selectedAsset) {
        fetch("http://localhost:8000/api/v1/select-asset", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ asset: selectedAsset })
        })
      }
      setLiveConfig({
        order_size_usd: parseFloat(orderSize),
        fee_rate: feeRate ? parseFloat(feeRate) : undefined,
        order_type: orderType,
        asset: selectedAsset,
        volatility: volatility,
      })

      toast.success("Trade Parameters Updated!")
      
      // const result = await simulateTrade({
      //   order_size_usd: parseFloat(orderSize),
      //   fee_rate: parseFloat(feeRate),
      //   order_type: orderType,
      //   volatility,
      //   asset: selectedAsset,
      // })
      // setOutput(result)

    } catch (err) {
      toast.error("Simulation failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="asset">Spot Asset</Label>
        <SpotAssetCombobox
          options={assets}
          value={selectedAsset}
          onChange={(val) => setSelectedAsset(val)}
        />
      </div>
      <div>
        <Label>Order Size (USD)</Label>
        <Input value={orderSize} onChange={(e) => setOrderSize(e.target.value)} />
      </div>
      <div>
        <Label>Fee Rate (%)</Label>
        <Input value={feeRate} onChange={(e) => setFeeRate(e.target.value)} />
      </div>
      <div>
        <Label>Order Type</Label>
        <Select value={orderType} onValueChange={setOrderType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="maker">Maker</SelectItem>
            <SelectItem value="taker">Taker</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Volatility</Label>
        <Slider value={[volatility]} onValueChange={(v) => setVolatility(v[0])} min={0.1} max={1.0} step={0.05} />
        <p className="text-sm text-muted-foreground">{volatility.toFixed(2)}</p>
      </div>
      <Button onClick={handleSimulate} disabled={loading}>
        {loading ? "Simulating..." : "Simulate"}
      </Button>
    </div>
  )
}

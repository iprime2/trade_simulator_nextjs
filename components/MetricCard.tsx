// components/MetricCard.tsx
interface MetricCardProps {
  label: string
  value: string | number
}

export default function MetricCard({ label, value }: MetricCardProps) {
  const isCurrency = /slippage|fee|cost|impact/i.test(label)
  const formattedValue = isCurrency ? `$${value}` : value

  return (
    <div className="border p-4 rounded-xl bg-background shadow-sm">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-xl font-semibold text-foreground">{formattedValue}</div>
    </div>
  )
}

  
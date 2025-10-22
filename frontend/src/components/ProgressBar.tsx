interface ProgressBarProps {
  value: number
  color?: string
}

export default function ProgressBar({ value, color = 'bg-circular-blue' }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-500 ease-out rounded-full`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

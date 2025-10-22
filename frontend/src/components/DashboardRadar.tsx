import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'

interface DashboardRadarProps {
  governance: number
  economic: number
  social: number
  environmental: number
}

export default function DashboardRadar({ governance, economic, social, environmental }: DashboardRadarProps) {
  const data = [
    { subject: 'Gouvernance', value: governance, fullMark: 100 },
    { subject: 'Économique', value: economic, fullMark: 100 },
    { subject: 'Social', value: social, fullMark: 100 },
    { subject: 'Environnemental', value: environmental, fullMark: 100 },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280' }} />
        <Radar 
          name="Score" 
          dataKey="value" 
          stroke="#91E0EB" 
          fill="#91E0EB" 
          fillOpacity={0.6} 
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}

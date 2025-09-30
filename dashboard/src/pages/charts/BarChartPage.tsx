export default function BarChartPage() {
  const data = [
    { label: '分类一', value: 27 },
    { label: '分类二', value: 25 },
    { label: '分类三', value: 18 },
    { label: '分类四', value: 15 },
    { label: '分类五', value: 10 },
    { label: '分类六', value: 8 },
  ]

  const max = Math.max(...data.map(d => d.value))
  const width = 600
  const height = 300
  const padding = 40
  const barHeight = (height - padding * 2) / data.length - 8

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>柱状图（纯 SVG）</h3>
      <svg width={width} height={height} style={{ background: 'transparent' }}>
        {data.map((d, i) => {
          const y = padding + i * (barHeight + 8)
          const w = ((width - padding * 2) * d.value) / max
          return (
            <g key={d.label} transform={`translate(${padding}, ${y})`}>
              <rect width={w} height={barHeight} fill="#52c41a" rx={4} />
              <text x={-8} y={barHeight / 2} dominantBaseline="middle" textAnchor="end" fill="#888">
                {d.label}
              </text>
              <text x={w + 6} y={barHeight / 2} dominantBaseline="middle" fill="#999">{d.value}</text>
            </g>
          )
        })}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#eee" />
      </svg>
    </div>
  )
}



export default function LineChartPage() {
  const pts = Array.from({ length: 12 }).map((_, i) => ({ x: i, y: Math.round(Math.random() * 100) }))
  const width = 600
  const height = 300
  const padding = 40
  const maxY = Math.max(...pts.map(p => p.y), 100)
  const toX = (x: number) => padding + (x * (width - padding * 2)) / 11
  const toY = (y: number) => height - padding - (y * (height - padding * 2)) / maxY
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.x)} ${toY(p.y)}`).join(' ')

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>折线图（纯 SVG）</h3>
      <svg width={width} height={height}>
        <polyline
          fill="none"
          stroke="#52c41a"
          strokeWidth={2}
          points={pts.map(p => `${toX(p.x)},${toY(p.y)}`).join(' ')}
        />
        {pts.map((p, i) => (
          <circle key={i} cx={toX(p.x)} cy={toY(p.y)} r={3} fill="#52c41a" />
        ))}
        <path d={d} stroke="#52c41a" fill="none" opacity={0} />
      </svg>
    </div>
  )
}



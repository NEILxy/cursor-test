export default function PieChartPage() {
  const data = [
    { label: 'A', value: 27, color: '#52c41a' },
    { label: 'B', value: 25, color: '#95de64' },
    { label: 'C', value: 18, color: '#b7eb8f' },
    { label: 'D', value: 15, color: '#389e0d' },
    { label: 'E', value: 10, color: '#237804' },
    { label: 'F', value: 5, color: '#73d13d' },
  ]

  const width = 360
  const height = 360
  const r = 140
  const cx = width / 2
  const cy = height / 2
  const total = data.reduce((s, d) => s + d.value, 0)
  let start = -Math.PI / 2

  const arcs = data.map((d) => {
    const angle = (d.value / total) * Math.PI * 2
    const end = start + angle
    const x1 = cx + r * Math.cos(start)
    const y1 = cy + r * Math.sin(start)
    const x2 = cx + r * Math.cos(end)
    const y2 = cy + r * Math.sin(end)
    const large = angle > Math.PI ? 1 : 0
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`
    const mid = (start + end) / 2
    const lx = cx + (r + 16) * Math.cos(mid)
    const ly = cy + (r + 16) * Math.sin(mid)
    start = end
    return { path, color: d.color, label: d.label, lx, ly }
  })

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>饼图（纯 SVG）</h3>
      <svg width={width} height={height}>
        {arcs.map((a, i) => (
          <g key={i}>
            <path d={a.path} fill={a.color} />
            <text x={a.lx} y={a.ly} fontSize={12} textAnchor="middle" dominantBaseline="middle" fill="#666">
              {arcs[i].label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}



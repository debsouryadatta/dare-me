export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

function truncate(text: string, max: number): string {
  if (!text) return ''
  return text.length <= max ? text : text.slice(0, max - 1) + '…'
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const desc = truncate(searchParams.get('desc') || 'A bold new challenge', 90)
  const stake = String(searchParams.get('stake') || '20')
  const from = truncate(searchParams.get('from') || 'Someone', 24)
  const to = truncate(searchParams.get('to') || 'Friend', 24)
  const status = (searchParams.get('status') || 'pending').toUpperCase()

  const width = 1200
  const height = 630
  const centerX = width / 2

  function wrapLines(text: string, maxPerLine = 40): string[] {
    const words = text.split(' ')
    const lines: string[] = []
    let current = ''
    for (const w of words) {
      const next = current ? current + ' ' + w : w
      if (next.length > maxPerLine) {
        if (current) lines.push(current)
        current = w
      } else {
        current = next
      }
    }
    if (current) lines.push(current)
    if (lines.length > 2) {
      const first = lines[0]
      const rest = lines.slice(1).join(' ')
      const second = rest.length > maxPerLine ? rest.slice(0, maxPerLine - 1) + '…' : rest
      return [first, second]
    }
    return lines
  }

  const lines = wrapLines(desc, 40)

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b0b15"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <g fill="#fff" font-family="Inter, ui-sans-serif, system-ui, -apple-system">
    <text x="${centerX}" y="${lines.length === 1 ? 220 : 200}" text-anchor="middle" font-size="54" font-weight="900" style="letter-spacing:0.5px">
      ${lines
        .map((line, i) => `<tspan x="${centerX}" dy="${i === 0 ? 0 : 60}">${escapeHtml(line)}</tspan>`)
        .join('')}
    </text>
    <text x="${centerX}" y="${lines.length === 1 ? 300 : 340}" text-anchor="middle" font-size="28" opacity="0.85">From ${escapeHtml(
      from,
    )} → To ${escapeHtml(to)}</text>
    <text x="${centerX}" y="${lines.length === 1 ? 350 : 390}" text-anchor="middle" font-size="36" font-weight="800">$${escapeHtml(
      stake,
    )} • ${escapeHtml(status)}</text>
    <g transform="translate(${centerX - 100}, ${lines.length === 1 ? 420 : 460})">
      <rect x="0" y="0" rx="12" ry="12" width="200" height="64" fill="#7c3aed"/>
      <text x="100" y="43" text-anchor="middle" font-size="30" font-weight="900">Open</text>
    </g>
  </g>
</svg>`

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}



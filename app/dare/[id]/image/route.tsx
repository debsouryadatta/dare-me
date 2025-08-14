import { ImageResponse } from 'next/og'

export const runtime = 'edge'

function truncate(text: string, max: number): string {
  if (!text) return ''
  return text.length <= max ? text : text.slice(0, max - 1) + '…'
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { searchParams } = new URL(req.url)
  const desc = truncate(searchParams.get('desc') || 'A bold new challenge', 90)
  const stake = Number(searchParams.get('stake') || '20') || 20
  const from = truncate(searchParams.get('from') || 'Someone', 24)
  const to = truncate(searchParams.get('to') || 'Friend', 24)
  const status = (searchParams.get('status') || 'pending').toUpperCase()

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0b0b15',
          color: '#fff',
          padding: 64,
          fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 52, fontWeight: 900, lineHeight: '1.2', maxWidth: 900 }}>{desc}</div>
          <div style={{ background: '#22c55e', padding: '12px 20px', borderRadius: 12, fontSize: 24, fontWeight: 800 }}>
            ${stake}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 24, opacity: 0.95, fontSize: 28, alignItems: 'center' }}>
          <div style={{ background: '#151629', border: '1px solid #26263f', borderRadius: 14, padding: '16px 20px' }}>
            From {from}
          </div>
          <div style={{ background: '#151629', border: '1px solid #26263f', borderRadius: 14, padding: '16px 20px' }}>
            To {to}
          </div>
          <div style={{ background: '#7c3aed', border: '1px solid #4c1d95', borderRadius: 14, padding: '16px 20px', fontWeight: 900 }}>
            {status}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ opacity: 0.7, fontSize: 26 }}>Tap Open to view</div>
          <div style={{ background: '#7c3aed', padding: '16px 26px', borderRadius: 14, fontSize: 30, fontWeight: 900 }}>Open</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 800,
      headers: { 'Cache-Control': 'public, immutable, no-transform, max-age=300' },
    }
  )
}



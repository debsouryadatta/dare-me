 'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { sdk } from '@farcaster/miniapp-sdk'

export default function ShareClient({ id }: { id: string }) {
  const qp = useSearchParams()
  const [copied, setCopied] = useState(false)

  const desc = qp.get('desc') || 'A bold new challenge'
  const stake = qp.get('stake') || '20'
  const from = qp.get('from') || 'Someone'
  const to = qp.get('to') || 'Friend'
  const status = qp.get('status') || 'pending'

  const imageUrl = useMemo(() => {
    const sp = new URLSearchParams({ desc, stake, from, to, status })
    return `/dare/${id}/image?${sp.toString()}`
  }, [id, desc, stake, from, to, status])

  const fullLink = useMemo(() => {
    if (typeof window === 'undefined') return ''
    const sp = new URLSearchParams({ desc, stake, from, to, status })
    return `${window.location.origin}/dare/${id}?${sp.toString()}`
  }, [id, desc, stake, from, to, status])

  useEffect(() => {
    ;(async () => {
      await sdk.actions.ready()
    })()
  }, [])

  const share = async () => {
    try {
      await sdk.actions.composeCast({ text: fullLink })
      return
    } catch {}
    try {
      await navigator.clipboard.writeText(fullLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy link:', fullLink)
    }
  }

  return (
    <main className="min-h-dvh p-4 md:p-6 bg-background text-foreground">
      <div className="mx-auto w-full max-w-xl space-y-6">
        <Card className="bg-card border-border text-card-foreground">
          <CardContent className="p-4 space-y-4">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-md border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="Dare preview" className="h-full w-full object-cover" />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-foreground/70">Preview your dare</div>
              <div className="flex items-center gap-3">
                {copied && <span className="text-xs text-emerald-400">Link copied</span>}
                <Button onClick={share}>Share</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}



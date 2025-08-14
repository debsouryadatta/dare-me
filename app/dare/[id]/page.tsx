import type { Metadata } from "next"
import DareClient from "./DareClient"

const PROD = "https://polls-nikhil.vercel.app"

export async function generateMetadata({ params, searchParams }: { params: { id: string }, searchParams: { desc?: string, stake?: string, from?: string, to?: string, status?: string, t?: string } }): Promise<Metadata> {
  const url = `${PROD}/dare/${params.id}`
  const sp = new URLSearchParams()
  if (searchParams?.desc) sp.set('desc', searchParams.desc)
  if (searchParams?.stake) sp.set('stake', searchParams.stake)
  if (searchParams?.from) sp.set('from', searchParams.from)
  if (searchParams?.to) sp.set('to', searchParams.to)
  if (searchParams?.status) sp.set('status', searchParams.status)
  if (searchParams?.t) sp.set('t', searchParams.t)
  const qs = sp.toString()
  const miniapp = {
    version: "1",
    imageUrl: `${PROD}/dare/${params.id}/image${qs ? `?${qs}` : ''}`,
    button: {
      title: "Open Dare",
      action: {
        type: "launch_miniapp",
        name: "Dares",
        url,
        splashImageUrl: `${PROD}/splash-200.png`,
        splashBackgroundColor: "#0f0f23",
      },
    },
  }

  return {
    title: "Dares – Challenge",
    description: "Create and accept dares with stakes",
    other: {
      "fc:miniapp": JSON.stringify(miniapp),
    },
  }
}

export default function Page({ params }: { params: { id: string } }) {
  return <DareClient id={params.id} />
}



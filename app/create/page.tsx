"use client"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CreatePage() {
  const router = useRouter()
  const [betName, setBetName] = useState("")
  const [friend, setFriend] = useState("")
  const [amount, setAmount] = useState("")
  const [desc, setDesc] = useState("")
  const [date, setDate] = useState<string>("")
  const [time, setTime] = useState<string>("")
  const [creating, setCreating] = useState(false)

  const onCreate = async () => {
    if (!betName.trim() || !friend.trim() || !Number.isFinite(Number(amount))) return
    setCreating(true)
    const id = uuidv4()
    const sp = new URLSearchParams({
      desc: betName.trim(),
      stake: String(Number(amount)),
      from: "You",
      to: friend.trim(),
      status: "pending",
    })
    if (desc.trim()) sp.set("desc", desc.trim())
    if (date) sp.set("date", date)
    if (time) sp.set("time", time)
    router.push(`/dare/${id}/share?${sp.toString()}`)
  }

  return (
    <main className="min-h-dvh bg-background text-foreground pb-24">
      <div className="mx-auto w-full max-w-xl">
        <div className="relative overflow-hidden rounded-b-[32px] bg-[#6A33FF] text-white pt-8 pb-6 px-5 shadow-xl">
          <div className="text-center">
            <div className="font-display font-extrabold text-[24px]">Add Challenge Details</div>
          </div>
          {/* decorative fold removed */}
        </div>

        <div className="px-4 py-5 space-y-4">
          <div className="space-y-1.5">
            <div className="text-[13px] font-semibold">Bet Name</div>
            <Input value={betName} onChange={(e) => setBetName(e.target.value)} placeholder="Jump into the Pool" className="h-11 rounded-2xl bg-white focus-visible:ring-[#6A33FF] border-transparent shadow-sm" />
          </div>

          <div className="space-y-1.5">
            <div className="text-[13px] font-semibold">Add Friend to bet</div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <img src="https://api.dicebear.com/9.x/identicon/svg?seed=piyushxpj" alt="avatar" className="h-6 w-6 rounded-full" />
              </div>
              <Input value={friend} onChange={(e) => setFriend(e.target.value)} placeholder="@username" className="h-11 pl-11 rounded-2xl bg-white focus-visible:ring-[#6A33FF] border-transparent shadow-sm" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-[13px] font-semibold">Bet Amount</div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</div>
              <Input value={amount} inputMode="decimal" onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))} placeholder="1200" className="h-11 pl-8 rounded-2xl bg-white focus-visible:ring-[#6A33FF] border-transparent shadow-sm" />
            </div>
            <div className="text-xs text-foreground/60">Your share {Number(amount || 0) / 2} USDC to the pool</div>
          </div>

          <div className="space-y-1.5">
            <div className="text-[13px] font-semibold">Bet Description</div>
            <Input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Add Description" className="h-24 rounded-2xl bg-white focus-visible:ring-[#6A33FF] border-transparent shadow-sm" />
          </div>

          <div className="space-y-2.5">
            <div className="text-[13px] font-semibold">Set Time</div>
            <div className="grid grid-cols-2 gap-3">
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-11 rounded-2xl bg-white focus-visible:ring-[#6A33FF] border-transparent shadow-sm" />
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="h-11 rounded-2xl bg-white focus-visible:ring-[#6A33FF] border-transparent shadow-sm" />
            </div>
          </div>

          <div className="pt-2">
            <Button onClick={onCreate} disabled={creating} className="w-full h-12 rounded-2xl bg-black text-white text-base shadow-[0_4px_0_#2b2b2b] active:translate-y-[2px] active:shadow-[0_2px_0_#2b2b2b]">
              Create the Bet
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}



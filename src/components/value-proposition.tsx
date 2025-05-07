'use client'
import { CircleDollarSign, ShieldCheck, HeadphonesIcon } from "lucide-react"

interface ValuePropositionProps {
  icon: string
  title: string
  description: string
}

export default function ValueProposition({ icon, title, description }: ValuePropositionProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
        {icon === "compare" && <CircleDollarSign className="h-8 w-8" />}
        {icon === "suppliers" && <ShieldCheck className="h-8 w-8" />}
        {icon === "support" && <HeadphonesIcon className="h-8 w-8" />}
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

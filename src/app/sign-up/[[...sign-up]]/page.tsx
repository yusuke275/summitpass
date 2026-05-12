import { SignUp } from '@clerk/nextjs'
import { Mountain } from 'lucide-react'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4">
      <Link href="/" className="flex items-center gap-2 mb-8 text-white">
        <Mountain className="h-8 w-8 text-emerald-400" />
        <span className="text-2xl font-bold">SummitPass</span>
      </Link>
      <SignUp />
    </div>
  )
}

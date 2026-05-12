'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { huts } from '@/lib/huts'
import { Search, TrendingUp, Clock, Users, Calendar, ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'

const mountainNames: Record<string, string> = {
  mt_fuji: '富士山',
  mt_yari: '槍ヶ岳',
  mt_okuhotaka: '奥穂高岳',
  mt_kita: '北岳',
  mt_akadake: '赤岳',
  mt_takao: '高尾山',
  mt_kumotori: '雲取山',
}

const reservationLabels: Record<string, { label: string; color: string }> = {
  required: { label: '予約必須', color: 'bg-red-100 text-red-700 border-red-200' },
  recommended: { label: '予約推奨', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  optional: { label: '予約任意', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
}

const mountainFilters = [
  { id: 'all', label: '全ての山' },
  { id: 'mt_fuji', label: '富士山' },
  { id: 'mt_yari', label: '槍ヶ岳' },
  { id: 'mt_okuhotaka', label: '奥穂高岳' },
  { id: 'mt_kita', label: '北岳' },
  { id: 'mt_akadake', label: '赤岳' },
  { id: 'mt_takao', label: '高尾山' },
  { id: 'mt_kumotori', label: '雲取山' },
]

export default function HutsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMountain, setSelectedMountain] = useState('all')

  const filtered = huts.filter((hut) => {
    const matchesMountain = selectedMountain === 'all' || hut.mountainId === selectedMountain
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      q === '' ||
      hut.name.includes(q) ||
      (mountainNames[hut.mountainId] ?? '').includes(q) ||
      hut.openPeriod.includes(q) ||
      hut.description.includes(q)
    return matchesMountain && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#f0fdf4]">
      <Navbar />
      <main className="pt-20 pb-24 md:pb-8">
        {/* ヘッダー */}
        <div className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700 text-white py-10 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <Home className="h-8 w-8 text-emerald-200" />
              <h1 className="text-3xl font-bold">山小屋を探す</h1>
            </div>
            <p className="text-emerald-100 text-lg">全国の主要山小屋の営業情報・食事・設備を確認できます</p>
            <div className="mt-6 flex items-center gap-4 text-emerald-200 text-sm">
              <span>🏠 {huts.length}軒掲載中</span>
              <span>🍽️ メニュー詳細あり</span>
              <span>♨️ 近隣温泉情報あり</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {/* 検索バー */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="山小屋名・山名で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base bg-white border-slate-200 shadow-sm"
            />
          </div>

          {/* 山フィルター */}
          <div className="flex gap-2 flex-wrap">
            {mountainFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedMountain(f.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  selectedMountain === f.id
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* 件数 */}
          <div className="text-slate-500 text-sm">{filtered.length}件の山小屋が見つかりました</div>

          {/* カード一覧 */}
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((hut) => {
              const res = reservationLabels[hut.reservation]
              const isYearRound = hut.openPeriod.includes('通年')
              return (
                <Link key={hut.id} href={`/huts/${hut.id}`}>
                  <Card className="bg-white hover:shadow-md transition-shadow border border-slate-100 cursor-pointer h-full">
                    <CardContent className="p-5">
                      {/* 山名バッジ */}
                      <div className="flex items-start justify-between mb-3">
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                          🏔️ {mountainNames[hut.mountainId] ?? hut.mountainId}
                        </Badge>
                        <ChevronRight className="h-4 w-4 text-slate-300 mt-0.5" />
                      </div>

                      {/* 山小屋名 */}
                      <h2 className="text-lg font-bold text-slate-900 mb-1 leading-snug">{hut.name}</h2>

                      {/* 標高・収容 */}
                      <div className="flex items-center gap-3 text-slate-500 text-sm mb-3">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3.5 w-3.5" />
                          {hut.elevation.toLocaleString()}m
                        </span>
                        {hut.capacity > 0 && (
                          <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            {hut.capacity}名
                          </span>
                        )}
                      </div>

                      {/* 営業期間 */}
                      <div className="flex items-center gap-1.5 text-sm mb-4">
                        <Calendar className="h-4 w-4 text-amber-500" />
                        <span className={isYearRound ? 'text-emerald-600 font-medium' : 'text-slate-600'}>
                          {isYearRound ? '🟢 通年営業' : hut.openPeriod}
                        </span>
                      </div>

                      {/* 料金 */}
                      {hut.priceStay > 0 && (
                        <div className="bg-emerald-50 rounded-lg px-3 py-2 mb-4 flex items-center justify-between">
                          <span className="text-xs text-emerald-700">1泊2食</span>
                          <span className="font-bold text-emerald-700 text-lg">
                            ¥{hut.priceStay.toLocaleString()}
                          </span>
                        </div>
                      )}

                      {/* タグ */}
                      <div className="flex flex-wrap gap-1.5">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${res.color}`}>
                          {res.label}
                        </span>
                        {hut.checkIn !== '-' && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-50 text-slate-600 border border-slate-200 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            IN {hut.checkIn}
                          </span>
                        )}
                        {hut.menu.dinner.length > 0 && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            🍽️ 食事あり
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <Home className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-lg">山小屋が見つかりませんでした</p>
              <p className="text-sm mt-1">検索条件を変えてみてください</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

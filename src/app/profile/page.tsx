import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Mountain, Trophy, TrendingUp, Users, Settings } from 'lucide-react'
import Link from 'next/link'

const mockUser = {
  displayName: '山田 登',
  username: 'yamada_nobo',
  bio: '百名山チャレンジ中！週末はどこかの山にいます。',
  plan: 'premium',
  totalMountains: 12,
  totalElevation: 28450,
  followers: 89,
  following: 34,
}

const allBadges = [
  { id: '1', name: 'ファーストサミット', icon: '🏔️', rarity: 'common', earned: true, earnedAt: '2023-06-15' },
  { id: '2', name: 'ファイブピークス', icon: '⛰️', rarity: 'common', earned: true, earnedAt: '2023-09-22' },
  { id: '3', name: '富士登頂', icon: '🗻', rarity: 'rare', earned: true, earnedAt: '2024-07-20' },
  { id: '4', name: '3000m超え', icon: '❄️', rarity: 'rare', earned: true, earnedAt: '2024-07-20' },
  { id: '5', name: 'テンピークス', icon: '🗻', rarity: 'rare', earned: false },
  { id: '6', name: 'クォーターセンチュリー', icon: '🌟', rarity: 'rare', earned: false },
  { id: '7', name: 'ハーフセンチュリー', icon: '💫', rarity: 'epic', earned: false },
  { id: '8', name: 'ヒャクメイ', icon: '👑', rarity: 'legendary', earned: false },
  { id: '9', name: '累積標高10000m', icon: '📈', rarity: 'epic', earned: true, earnedAt: '2024-11-01' },
]

const rarityConfig: Record<string, { label: string; bg: string; text: string; border: string }> = {
  common: { label: 'コモン', bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' },
  rare: { label: 'レア', bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
  epic: { label: 'エピック', bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
  legendary: { label: 'レジェンダリー', bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300' },
}

const climbHistory = [
  { mountain: '富士山', elevation: 3776, date: '2025-05-03', emoji: '🗻' },
  { mountain: '北岳', elevation: 3193, date: '2025-04-20', emoji: '⛰️' },
  { mountain: '高尾山', elevation: 599, date: '2025-04-10', emoji: '🌿' },
  { mountain: '雲取山', elevation: 2017, date: '2025-03-15', emoji: '🏔️' },
  { mountain: '赤岳', elevation: 2899, date: '2025-02-28', emoji: '🗻' },
]

export default async function ProfilePage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const earnedCount = allBadges.filter(b => b.earned).length

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-20 pb-24 md:pb-8 px-4 max-w-3xl mx-auto">
        {/* プロフィールヘッダー */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-emerald-100 text-emerald-700 text-2xl font-bold">
                  {mockUser.displayName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold text-slate-900">{mockUser.displayName}</h1>
                  {mockUser.plan === 'premium' && (
                    <Badge className="bg-amber-100 text-amber-700 border-amber-300 text-xs">👑 プレミアム</Badge>
                  )}
                </div>
                <div className="text-sm text-slate-500 mb-2">@{mockUser.username}</div>
                <p className="text-sm text-slate-700 mb-3">{mockUser.bio}</p>
                <div className="flex gap-4 text-sm">
                  <span><strong>{mockUser.followers}</strong> <span className="text-slate-500">フォロワー</span></span>
                  <span><strong>{mockUser.following}</strong> <span className="text-slate-500">フォロー中</span></span>
                </div>
              </div>
              <Link href="/profile/settings">
                <button className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50">
                  <Settings className="h-4 w-4 text-slate-500" />
                </button>
              </Link>
            </div>

            {/* 統計 */}
            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100">
              <div className="text-center">
                <Mountain className="h-4 w-4 text-emerald-500 mx-auto mb-1" />
                <div className="text-xl font-bold">{mockUser.totalMountains}</div>
                <div className="text-xs text-slate-500">登頂した山</div>
              </div>
              <div className="text-center">
                <TrendingUp className="h-4 w-4 text-blue-500 mx-auto mb-1" />
                <div className="text-xl font-bold">{(mockUser.totalElevation / 1000).toFixed(1)}k</div>
                <div className="text-xs text-slate-500">累積標高(m)</div>
              </div>
              <div className="text-center">
                <Trophy className="h-4 w-4 text-amber-500 mx-auto mb-1" />
                <div className="text-xl font-bold">{earnedCount}</div>
                <div className="text-xs text-slate-500">バッジ数</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="badges">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="badges" className="flex-1">バッジ ({earnedCount}/{allBadges.length})</TabsTrigger>
            <TabsTrigger value="climbs" className="flex-1">登山履歴</TabsTrigger>
          </TabsList>

          {/* バッジタブ */}
          <TabsContent value="badges">
            <div className="grid grid-cols-3 gap-3">
              {allBadges.map((badge) => {
                const rarity = rarityConfig[badge.rarity]
                return (
                  <div
                    key={badge.id}
                    className={`relative p-3 rounded-xl border-2 text-center transition-all ${
                      badge.earned
                        ? `${rarity.bg} ${rarity.border}`
                        : 'bg-slate-100 border-slate-200 opacity-40 grayscale'
                    }`}
                  >
                    <div className="text-3xl mb-1">{badge.icon}</div>
                    <div className="text-xs font-medium text-slate-700 leading-tight">{badge.name}</div>
                    <div className={`text-xs mt-1 px-1.5 py-0.5 rounded-full inline-block ${rarity.bg} ${rarity.text}`}>
                      {rarity.label}
                    </div>
                    {badge.earned && badge.earnedAt && (
                      <div className="text-xs text-slate-400 mt-1">{badge.earnedAt}</div>
                    )}
                    {!badge.earned && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl">🔒</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </TabsContent>

          {/* 登山履歴タブ */}
          <TabsContent value="climbs">
            <Card>
              <CardContent className="divide-y divide-slate-100">
                {climbHistory.map((climb, i) => (
                  <div key={i} className="flex items-center gap-3 py-3 first:pt-4 last:pb-4">
                    <span className="text-2xl">{climb.emoji}</span>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{climb.mountain}</div>
                      <div className="text-sm text-slate-500">{climb.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">{climb.elevation.toLocaleString()}m</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

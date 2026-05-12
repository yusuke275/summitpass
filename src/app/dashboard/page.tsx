import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Mountain, Trophy, TrendingUp, Calendar, Users, Home, ChevronRight, Flame, Star } from 'lucide-react'
import Link from 'next/link'
import { db, generateId } from '@/lib/db'

const conditionColors: Record<string, string> = {
  excellent: 'bg-emerald-100 text-emerald-700',
  good: 'bg-blue-100 text-blue-700',
  fair: 'bg-amber-100 text-amber-700',
  poor: 'bg-red-100 text-red-700',
}
const conditionLabel: Record<string, string> = {
  excellent: '最高', good: '良好', fair: '普通', poor: '悪天候',
}
const rarityGradients: Record<string, string> = {
  common: 'from-slate-100 to-slate-50 border-slate-200',
  rare: 'from-blue-50 to-indigo-50 border-blue-200',
  epic: 'from-purple-50 to-pink-50 border-purple-200',
  legendary: 'from-amber-50 to-yellow-50 border-amber-300',
}
const mountainEmojis: Record<string, string> = {
  hyakumei: '⛰️', nihonarupusu: '🏔️', volcanic: '🌋', other: '🌿',
}

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  // ユーザーをDBに同期（初回サインイン時）
  const clerkUser = await currentUser()
  let dbUser = await db.queryOne<{
    id: string; plan: string; total_mountains: number; total_elevation: number; display_name: string
  }>('SELECT * FROM users WHERE clerk_id = ?', [userId])

  if (!dbUser && clerkUser) {
    const displayName = `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim() || clerkUser.username || 'ユーザー'
    const username = clerkUser.username || clerkUser.emailAddresses[0]?.emailAddress?.split('@')[0] || `user_${userId.slice(-8)}`
    await db.run(
      'INSERT INTO users (id, clerk_id, username, display_name, avatar_url) VALUES (?, ?, ?, ?, ?)',
      [generateId(), userId, username, displayName, clerkUser.imageUrl ?? '']
    )
    dbUser = await db.queryOne('SELECT * FROM users WHERE clerk_id = ?', [userId])
  }

  const user = dbUser!

  // 統計データを取得
  const [hyakumeiRow, badgeRow, followerRow, recentClimbs, earnedBadges, nextBadgeRow] = await Promise.all([
    db.queryOne<{ count: number }>(
      `SELECT COUNT(DISTINCT c.mountain_id) as count FROM climbs c JOIN mountains m ON c.mountain_id = m.id WHERE c.user_id = ? AND m.category = 'hyakumei'`,
      [user.id]
    ),
    db.queryOne<{ count: number }>('SELECT COUNT(*) as count FROM user_badges WHERE user_id = ?', [user.id]),
    db.queryOne<{ count: number }>('SELECT COUNT(*) as count FROM follows WHERE following_id = ?', [user.id]),
    db.query<{ id: string; mountain_name: string; elevation: number; climbed_at: string; condition: string; category: string }>(
      `SELECT c.id, m.name as mountain_name, m.elevation, m.category, c.climbed_at, c.condition
       FROM climbs c JOIN mountains m ON c.mountain_id = m.id
       WHERE c.user_id = ? ORDER BY c.climbed_at DESC LIMIT 4`,
      [user.id]
    ),
    db.query<{ icon: string; name: string; rarity: string; earned_at: string }>(
      `SELECT b.icon, b.name, b.rarity, ub.earned_at FROM user_badges ub JOIN badges b ON ub.badge_id = b.id WHERE ub.user_id = ? ORDER BY ub.earned_at DESC LIMIT 4`,
      [user.id]
    ),
    db.queryOne<{ icon: string; name: string; rarity: string; condition_value: string }>(
      `SELECT b.icon, b.name, b.rarity, b.condition_value FROM badges b
       WHERE b.condition_type = 'mountain_count'
       AND CAST(b.condition_value AS INTEGER) > ?
       AND b.id NOT IN (SELECT badge_id FROM user_badges WHERE user_id = ?)
       ORDER BY CAST(b.condition_value AS INTEGER) ASC LIMIT 1`,
      [user.total_mountains, user.id]
    ),
  ])

  const hyakumeiCount = hyakumeiRow?.count ?? 0
  const badgeCount = badgeRow?.count ?? 0
  const followerCount = followerRow?.count ?? 0
  const hyakumeiProgress = Math.round((hyakumeiCount / 100) * 100)

  const nextBadgeProgress = nextBadgeRow
    ? Math.round((user.total_mountains / parseInt(nextBadgeRow.condition_value)) * 100)
    : 0

  return (
    <div className="min-h-screen bg-[#f0fdf4]">
      <Navbar />
      <main className="pt-20 pb-28 md:pb-8 px-4 max-w-5xl mx-auto">

        <div className="py-6 mb-6">
          <p className="text-slate-500 text-sm mb-1">おかえりなさい！</p>
          <h1 className="text-2xl font-extrabold text-slate-900">ダッシュボード 🏔️</h1>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { icon: Mountain, label: '登頂した山', value: user.total_mountains, unit: '山', bg: 'bg-emerald-500', iconBg: 'bg-emerald-600' },
            { icon: TrendingUp, label: '累積標高', value: ((user.total_elevation ?? 0) / 1000).toFixed(1), unit: 'km', bg: 'bg-blue-500', iconBg: 'bg-blue-600' },
            { icon: Trophy, label: '獲得バッジ', value: badgeCount, unit: '個', bg: 'bg-amber-500', iconBg: 'bg-amber-600' },
            { icon: Users, label: 'フォロワー', value: followerCount, unit: '人', bg: 'bg-purple-500', iconBg: 'bg-purple-600' },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-4 text-white relative overflow-hidden`}>
              <div className={`${s.iconBg} rounded-xl p-2 inline-flex mb-3`}>
                <s.icon className="h-4 w-4 text-white" />
              </div>
              <div className="text-3xl font-extrabold leading-none mb-0.5">{s.value}</div>
              <div className="text-xs opacity-80">{s.unit}　{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-5 gap-5">
          {/* 百名山進捗 */}
          <Card className="md:col-span-3 bg-white border-0 shadow-sm rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-5 pt-5 pb-8">
              <div className="flex items-center gap-2 text-white mb-2">
                <Star className="h-4 w-4" />
                <span className="text-sm font-medium opacity-90">日本百名山チャレンジ</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-6xl font-extrabold text-white">{hyakumeiCount}</span>
                <span className="text-emerald-200 text-lg mb-1">/ 100山</span>
              </div>
            </div>
            <CardContent className="px-5 -mt-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <div className="flex justify-between text-xs text-slate-500 mb-2">
                  <span>達成率</span>
                  <span className="font-bold text-emerald-600">{hyakumeiProgress}%</span>
                </div>
                <Progress value={hyakumeiProgress} className="h-3 mb-3" />
                <p className="text-sm text-slate-600">あと <strong className="text-slate-900">{100 - hyakumeiCount}山</strong> で百名山制覇！</p>
                <Link href="/mountains?category=hyakumei">
                  <button className="mt-3 text-sm text-emerald-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    未登頂の百名山を見る <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* 次のバッジ */}
          <Card className="md:col-span-2 bg-white border-0 shadow-sm rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-slate-500 flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-orange-400" /> 次のバッジまで
              </CardTitle>
            </CardHeader>
            <CardContent>
              {nextBadgeRow ? (
                <>
                  <div className={`rounded-xl p-4 border bg-gradient-to-br ${rarityGradients[nextBadgeRow.rarity]} mb-3`}>
                    <div className="text-4xl mb-2">{nextBadgeRow.icon}</div>
                    <div className="font-bold text-slate-900">{nextBadgeRow.name}</div>
                    <div className="text-xs text-blue-600 font-medium mt-0.5">{nextBadgeRow.rarity.toUpperCase()}</div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                    <span>達成まで</span>
                    <span className="font-bold text-slate-700">{nextBadgeProgress}%</span>
                  </div>
                  <Progress value={nextBadgeProgress} className="h-2" />
                </>
              ) : (
                <div className="text-center py-4 text-slate-500 text-sm">
                  🎉 全バッジ獲得済み！
                </div>
              )}
              <Link href="/profile#badges">
                <button className="mt-3 w-full text-xs text-slate-500 hover:text-slate-700 flex items-center justify-center gap-1">
                  全バッジを見る <ChevronRight className="h-3 w-3" />
                </button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* 最近の登山記録 */}
        <Card className="mt-5 bg-white border-0 shadow-sm rounded-2xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4 text-slate-400" /> 最近の登山記録
              </CardTitle>
              <Link href="/profile">
                <button className="text-xs text-emerald-600 flex items-center gap-0.5 hover:gap-1 transition-all">
                  すべて見る <ChevronRight className="h-3 w-3" />
                </button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentClimbs.length === 0 ? (
              <p className="text-center text-slate-400 text-sm py-4">まだ登山記録がありません</p>
            ) : (
              recentClimbs.map((climb) => (
                <div key={climb.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="text-3xl">{mountainEmojis[climb.category] ?? '🏔️'}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-900">{climb.mountain_name}</div>
                    <div className="text-xs text-slate-500">{climb.climbed_at}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900 text-sm">{climb.elevation.toLocaleString()}m</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${conditionColors[climb.condition]}`}>
                      {conditionLabel[climb.condition]}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                </div>
              ))
            )}
            <Link href="/climbs/new">
              <div className="border-2 border-dashed border-slate-200 rounded-xl py-3.5 text-center text-sm text-slate-400 hover:border-emerald-300 hover:text-emerald-600 transition-colors cursor-pointer mt-2">
                ＋ 新しい登山を記録する
              </div>
            </Link>
          </CardContent>
        </Card>

        {/* クイックアクション */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          {[
            { href: '/climbs/new', emoji: '📝', label: '登山を記録', desc: 'AIレポート付き', color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200' },
            { href: '/mountains', emoji: '🔍', label: '山を探す', desc: '全国の山', color: 'bg-blue-50 hover:bg-blue-100 border-blue-200' },
            { href: '/huts', emoji: '🏠', label: '山小屋を探す', desc: 'メニュー・温泉付き', color: 'bg-amber-50 hover:bg-amber-100 border-amber-200' },
            { href: '/feed', emoji: '👥', label: 'タイムライン', desc: '仲間の記録を見る', color: 'bg-purple-50 hover:bg-purple-100 border-purple-200' },
          ].map((a) => (
            <Link key={a.href} href={a.href}>
              <div className={`p-4 rounded-2xl border transition-colors cursor-pointer ${a.color}`}>
                <div className="text-2xl mb-2">{a.emoji}</div>
                <div className="font-bold text-sm text-slate-900">{a.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{a.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

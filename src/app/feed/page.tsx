import Navbar from '@/components/layout/Navbar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Mountain, Heart, MessageCircle, Share2, CheckCircle, Sparkles, TrendingUp } from 'lucide-react'

const feedItems = [
  {
    id: '1',
    user: { name: '田中 登', username: 'tanaka_nobo', avatar: 'T', color: 'bg-emerald-500' },
    mountain: { name: '槍ヶ岳', elevation: 3180, prefecture: '長野県・岐阜県', emoji: '⛰️' },
    climbedAt: '2025年5月8日',
    condition: 'excellent',
    aiReport: '5月8日、北アルプスの名峰・槍ヶ岳（3,180m）に挑みました。早朝4時に上高地を発ち、横尾・槍沢ルートを経て10時間の行程。天候に恵まれ、山頂からは笠ヶ岳・穂高連峰・遠く富士山まで一望できる絶景が広がりました。',
    likes: 48,
    comments: 12,
    hasLiked: false,
    badge: '🏆 百名山72座目',
    hasAiReport: true,
  },
  {
    id: '2',
    user: { name: '鈴木 山子', username: 'suzuki_yamako', avatar: 'S', color: 'bg-blue-500' },
    mountain: { name: '丹沢山', elevation: 1567, prefecture: '神奈川県', emoji: '🌿' },
    climbedAt: '2025年5月7日',
    condition: 'good',
    aiReport: null,
    notes: 'ブナ林の新緑が本当に美しかった！ヤマレコで調べたルートで行ったら最高でした。下山後は鶴巻温泉でひとっ風呂。最高の一日でした😊',
    likes: 23,
    comments: 5,
    hasLiked: true,
    badge: null,
    hasAiReport: false,
  },
  {
    id: '3',
    user: { name: '山田 峰太', username: 'yamada_mine', avatar: 'Y', color: 'bg-amber-500' },
    mountain: { name: '富士山', elevation: 3776, prefecture: '静岡県・山梨県', emoji: '🗻' },
    climbedAt: '2025年5月5日',
    condition: 'good',
    aiReport: '5月5日、日本最高峰・富士山（3,776m）への登頂を達成しました。吉田ルートから深夜0時に出発し、ご来光を山頂で迎えました。真っ暗な登山道を数千の星が照らす中、懐中電灯の明かりを頼りに高度を稼ぎました。山頂からのご来光と眼下に広がる雲海は、言葉を失う美しさでした。',
    likes: 134,
    comments: 31,
    hasLiked: false,
    badge: '🗻 富士登頂',
    hasAiReport: true,
  },
]

const conditionConfig: Record<string, { label: string; color: string; emoji: string }> = {
  excellent: { label: '最高', color: 'bg-emerald-100 text-emerald-700', emoji: '😄' },
  good: { label: '良好', color: 'bg-blue-100 text-blue-700', emoji: '🙂' },
  fair: { label: 'まあまあ', color: 'bg-amber-100 text-amber-700', emoji: '😐' },
  poor: { label: '悪天候', color: 'bg-red-100 text-red-700', emoji: '😰' },
}

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-[#f0fdf4]">
      <Navbar />
      <main className="pt-20 pb-28 md:pb-8 px-4 max-w-xl mx-auto">

        {/* ヘッダー */}
        <div className="py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">タイムライン 📡</h1>
            <p className="text-slate-500 text-sm">みんなの登山記録</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-medium rounded-full shadow-sm">フォロー中</button>
            <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-full">全体</button>
          </div>
        </div>

        <div className="space-y-4">
          {feedItems.map((item) => {
            const cond = conditionConfig[item.condition]
            return (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">

                {/* ユーザーヘッダー */}
                <div className="flex items-center justify-between p-4 pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className={`${item.user.color} text-white font-bold text-sm`}>
                        {item.user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{item.user.name}</div>
                      <div className="text-xs text-slate-400">@{item.user.username} · {item.climbedAt}</div>
                    </div>
                  </div>
                  <button className="text-xs border border-emerald-300 text-emerald-600 px-3 py-1 rounded-full hover:bg-emerald-50 transition-colors font-medium">
                    フォロー
                  </button>
                </div>

                {/* 山情報バナー */}
                <div className="mx-4 mb-3 bg-gradient-to-r from-slate-800 to-emerald-900 rounded-xl p-3.5 flex items-center gap-3">
                  <div className="text-4xl">{item.mountain.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-extrabold text-white text-lg leading-tight">{item.mountain.name}</div>
                    <div className="text-emerald-300 text-xs mt-0.5 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {item.mountain.elevation.toLocaleString()}m · {item.mountain.prefecture}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-0.5 font-medium">
                      <CheckCircle className="h-3 w-3" /> 登頂
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cond.color}`}>
                      {cond.emoji} {cond.label}
                    </span>
                  </div>
                </div>

                {/* バッジ */}
                {item.badge && (
                  <div className="px-4 mb-2">
                    <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">{item.badge}</Badge>
                  </div>
                )}

                {/* テキスト */}
                <div className="px-4 mb-3">
                  {item.hasAiReport && item.aiReport ? (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-3">
                      <div className="flex items-center gap-1.5 text-xs text-purple-600 font-medium mb-2">
                        <Sparkles className="h-3.5 w-3.5" /> AI生成レポート
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed line-clamp-4">{item.aiReport}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-700 leading-relaxed">{(item as { notes?: string }).notes ?? ''}</p>
                  )}
                </div>

                {/* アクション */}
                <div className="px-4 pb-4 flex items-center gap-1 border-t border-slate-50 pt-3">
                  <button className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full transition-colors ${
                    item.hasLiked ? 'bg-red-50 text-red-500' : 'text-slate-500 hover:bg-slate-50'
                  }`}>
                    <Heart className={`h-4 w-4 ${item.hasLiked ? 'fill-red-500' : ''}`} />
                    {item.likes}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full text-slate-500 hover:bg-slate-50 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    {item.comments}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full text-slate-500 hover:bg-slate-50 transition-colors ml-auto">
                    <Share2 className="h-4 w-4" />
                    シェア
                  </button>
                </div>
              </div>
            )
          })}

          {/* もっと見る */}
          <button className="w-full py-4 text-sm text-slate-500 hover:text-emerald-600 font-medium transition-colors">
            もっと見る ↓
          </button>
        </div>
      </main>
    </div>
  )
}

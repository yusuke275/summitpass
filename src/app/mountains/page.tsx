import Navbar from '@/components/layout/Navbar'
import { Badge } from '@/components/ui/badge'
import { Mountain, CheckCircle, ChevronRight, TrendingUp, Filter } from 'lucide-react'
import Link from 'next/link'

const mountains = [
  { id: 'mt_fuji', name: '富士山', name_kana: 'ふじさん', elevation: 3776, prefecture: '静岡・山梨', category: 'hyakumei', difficulty: 'medium', climbed: true, emoji: '🗻' },
  { id: 'mt_kita', name: '北岳', name_kana: 'きただけ', elevation: 3193, prefecture: '山梨県', category: 'hyakumei', difficulty: 'hard', climbed: false, emoji: '⛰️' },
  { id: 'mt_okuhotaka', name: '奥穂高岳', name_kana: 'おくほたかだけ', elevation: 3190, prefecture: '長野・岐阜', category: 'hyakumei', difficulty: 'expert', climbed: false, emoji: '🏔️' },
  { id: 'mt_yari', name: '槍ヶ岳', name_kana: 'やりがたけ', elevation: 3180, prefecture: '長野・岐阜', category: 'hyakumei', difficulty: 'expert', climbed: false, emoji: '⛰️' },
  { id: 'mt_akadake', name: '赤岳', name_kana: 'あかだけ', elevation: 2899, prefecture: '長野・山梨', category: 'hyakumei', difficulty: 'hard', climbed: true, emoji: '🏔️' },
  { id: 'mt_tateyama', name: '立山', name_kana: 'たてやま', elevation: 3015, prefecture: '富山県', category: 'hyakumei', difficulty: 'medium', climbed: false, emoji: '🗻' },
  { id: 'mt_shirane', name: '白根山', name_kana: 'しらねさん', elevation: 2578, prefecture: '群馬県', category: 'hyakumei', difficulty: 'medium', climbed: false, emoji: '⛰️' },
  { id: 'mt_nantai', name: '男体山', name_kana: 'なんたいさん', elevation: 2486, prefecture: '栃木県', category: 'hyakumei', difficulty: 'medium', climbed: false, emoji: '🏔️' },
  { id: 'mt_kumotori', name: '雲取山', name_kana: 'くもとりやま', elevation: 2017, prefecture: '東京・埼玉', category: 'hyakumei', difficulty: 'medium', climbed: true, emoji: '🌿' },
  { id: 'mt_tanzawa', name: '丹沢山', name_kana: 'たんざわさん', elevation: 1567, prefecture: '神奈川県', category: 'hyakumei', difficulty: 'medium', climbed: false, emoji: '🌿' },
  { id: 'mt_takao', name: '高尾山', name_kana: 'たかおさん', elevation: 599, prefecture: '東京都', category: 'other', difficulty: 'easy', climbed: true, emoji: '🌳' },
  { id: 'mt_tsukuba', name: '筑波山', name_kana: 'つくばさん', elevation: 877, prefecture: '茨城県', category: 'hyakumei', difficulty: 'easy', climbed: true, emoji: '⛰️' },
]

const difficultyConfig: Record<string, { label: string; color: string; dot: string }> = {
  easy: { label: '初級', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  medium: { label: '中級', color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  hard: { label: '上級', color: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500' },
  expert: { label: '超上級', color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
}

const gradients = [
  'from-slate-700 to-emerald-800',
  'from-slate-800 to-blue-900',
  'from-slate-700 to-teal-800',
  'from-stone-700 to-emerald-900',
  'from-slate-800 to-indigo-900',
]

export default function MountainsPage() {
  return (
    <div className="min-h-screen bg-[#f0fdf4]">
      <Navbar />
      <main className="pt-20 pb-28 md:pb-8">

        {/* ヘッダー */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 text-white px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-extrabold mb-1">山を探す 🗻</h1>
            <p className="text-slate-300">日本全国15,000以上の山から探して記録しよう</p>
            <div className="mt-5 relative">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="山の名前・読み方で検索..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:bg-white/20 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-6">
          {/* フィルタータブ */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
            {[
              { label: 'すべて', active: true },
              { label: '🏆 日本百名山', active: false },
              { label: '🌿 関東', active: false },
              { label: '🏔️ 中部・北アルプス', active: false },
              { label: '❄️ 東北・北海道', active: false },
              { label: '☀️ 九州・沖縄', active: false },
            ].map((tab) => (
              <button
                key={tab.label}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  tab.active
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 件数・並び替え */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-500"><strong className="text-slate-900">{mountains.length}件</strong> の山が見つかりました</p>
            <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
              <Filter className="h-3.5 w-3.5" /> 並び替え
            </button>
          </div>

          {/* 山カード */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mountains.map((mountain, idx) => {
              const diff = difficultyConfig[mountain.difficulty]
              const grad = gradients[idx % gradients.length]
              return (
                <Link href={`/mountains/${mountain.id}`} key={mountain.id}>
                  <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md transition-all group cursor-pointer">
                    {/* 山ビジュアルヘッダー */}
                    <div className={`h-36 bg-gradient-to-br ${grad} relative flex flex-col justify-between p-4`}>
                      {/* 登頂済みバッジ */}
                      {mountain.climbed && (
                        <div className="self-end">
                          <span className="bg-emerald-500 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
                            <CheckCircle className="h-3 w-3" /> 登頂済
                          </span>
                        </div>
                      )}
                      {/* 絵文字 */}
                      <div className="text-5xl absolute bottom-3 right-4 opacity-80">{mountain.emoji}</div>
                      {/* 山名 */}
                      <div className="self-start mt-auto">
                        <div className="text-white font-extrabold text-xl leading-tight">{mountain.name}</div>
                        <div className="text-white/60 text-xs">{mountain.name_kana}</div>
                      </div>
                    </div>

                    {/* カード下部 */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="h-4 w-4 text-emerald-500" />
                          <span className="text-2xl font-extrabold text-slate-900">{mountain.elevation.toLocaleString()}</span>
                          <span className="text-slate-500 text-sm">m</span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${diff.color}`}>{diff.label}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">{mountain.prefecture}</span>
                        {mountain.category === 'hyakumei' && (
                          <Badge variant="outline" className="text-xs text-amber-600 border-amber-200 bg-amber-50 py-0">
                            🏆 百名山
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

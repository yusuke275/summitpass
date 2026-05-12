import Link from 'next/link'
import { Mountain, CheckCircle, ChevronRight } from 'lucide-react'

const features = [
  { icon: '🏔️', color: 'from-emerald-500 to-teal-500', title: '山コレクション', desc: '登頂した山を記録。日本百名山の達成度をリアルタイムで可視化。' },
  { icon: '🏆', color: 'from-amber-500 to-orange-500', title: 'バッジ・実績', desc: 'レア度別12種バッジ。伝説の「ヒャクメイ」バッジを目指せ！' },
  { icon: '✨', color: 'from-purple-500 to-pink-500', title: 'AIレポート生成', desc: 'メモを入力するだけでClaude AIが美しい登山レポートを自動生成。' },
  { icon: '📸', color: 'from-blue-500 to-cyan-500', title: 'AI山同定', desc: '写真をアップロードすると、どの山かをAIが自動識別。' },
  { icon: '👥', color: 'from-rose-500 to-pink-500', title: 'コミュニティSNS', desc: 'フォロー・タイムライン・いいね・コメントで登山仲間とつながろう。' },
  { icon: '🗺️', color: 'from-indigo-500 to-blue-500', title: 'GPXルート共有', desc: 'GPXファイルをアップロードしてルートを地図に表示・共有。' },
  { icon: '⛅', color: 'from-sky-500 to-blue-500', title: 'リアルタイム天気', desc: '各山の現在の天気・気温・風速・登山危険度を自動判定。' },
  { icon: '🏠', color: 'from-emerald-600 to-green-500', title: '山小屋・温泉情報', desc: '全国の山小屋の営業時間・食事メニュー・近隣温泉まで網羅。' },
]

const stats = [
  { value: '15,000+', label: '登録山数', icon: '🗻' },
  { value: '100', label: '日本百名山全収録', icon: '🏆' },
  { value: '500+', label: '全国の山小屋情報', icon: '🏠' },
  { value: '¥0', label: '基本機能は無料', icon: '🎉' },
]

const freeFeatures = ['山コレクション（無制限）', 'バッジ・実績システム', 'SNS・タイムライン', '写真アップロード（月20枚）', '天気・危険度情報', '山小屋・温泉情報']
const premiumFeatures = ['無料プランのすべて', 'AIレポート生成（無制限）', 'AI山同定（無制限）', '写真アップロード（無制限）', 'GPXルート共有', '広告なし', '優先サポート']

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ナビゲーション */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-1.5 rounded-lg">
              <Mountain className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">SummitPass</span>
          </div>
          <div className="flex gap-2">
            <Link href="/sign-in">
              <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">ログイン</button>
            </Link>
            <Link href="/sign-up">
              <button className="px-4 py-2 text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">無料で始める</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ヒーロー */}
      <section className="pt-28 pb-20 px-4 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-medium px-4 py-2 rounded-full mb-8">
            🏔️ 山コレクションの決定版アプリ
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-slate-900">
            登った山を、<br />
            <span className="text-emerald-500">思い出に残そう。</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            記録・コレクション・SNS・AIレポート・山小屋情報・近隣温泉まで。<br className="hidden md:block" />
            登山者のためのオールインワンプラットフォーム。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
            <Link href="/sign-up">
              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-bold rounded-xl transition-colors shadow-lg shadow-emerald-200">
                無料でアカウント作成
                <ChevronRight className="h-5 w-5" />
              </button>
            </Link>
            <Link href="/mountains">
              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 text-lg font-medium rounded-xl border border-slate-200 transition-colors">
                山を探す
              </button>
            </Link>
          </div>

          {/* プレビューカード */}
          <div className="flex justify-center gap-3 flex-wrap">
            {[
              { name: '富士山', elev: '3,776m', emoji: '🗻', done: true },
              { name: '槍ヶ岳', elev: '3,180m', emoji: '⛰️', done: true },
              { name: '北岳', elev: '3,193m', emoji: '🏔️', done: false },
            ].map((m) => (
              <div key={m.name} className="bg-white rounded-2xl p-4 shadow-md border border-slate-100 text-center min-w-[100px]">
                <div className="text-3xl mb-1">{m.emoji}</div>
                <div className="text-sm font-bold text-slate-900">{m.name}</div>
                <div className="text-xs text-slate-500 mb-2">{m.elev}</div>
                {m.done
                  ? <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">✓ 登頂済</span>
                  : <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">未登頂</span>
                }
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 統計バー */}
      <section className="py-10 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-3xl font-extrabold text-emerald-400">{s.value}</div>
              <div className="text-slate-400 text-sm mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 機能一覧 */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-slate-900">山コレを超える、全機能</h2>
            <p className="text-slate-500 text-lg">登山を記録するだけでなく、楽しみ・つながり・情報まで</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} text-2xl mb-4`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-base mb-1.5 text-slate-900">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 山小屋・温泉ハイライト */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-700 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">山小屋＆温泉情報も充実</h2>
            <p className="text-emerald-100 text-lg">下山後の楽しみまでぜんぶ SummitPass で</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { emoji: '🏠', title: '山小屋情報', items: ['営業期間・営業日', 'チェックイン/アウト時刻', '1泊2食・夕食・朝食料金', '夕食・朝食・昼食メニュー', '売店・軽食・飲み物情報', '予約方法・電話番号'] },
              { emoji: '♨️', title: '近隣温泉', items: ['営業時間・定休日', '入浴料金', '泉質・設備情報', '露天風呂・サウナ有無', '登山口からの距離', '公式サイトリンク'] },
              { emoji: '🍜', title: '周辺グルメ・施設', items: ['地元名物レストラン', 'B級グルメ情報', '道の駅・売店', '駐車場・バス停情報', '営業時間・定休日', 'アクセス情報'] },
            ].map((col) => (
              <div key={col.title} className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <div className="text-3xl mb-3">{col.emoji}</div>
                <h3 className="font-bold text-xl mb-4">{col.title}</h3>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-emerald-100">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-300 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/sign-up">
              <button className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-xl text-lg hover:bg-emerald-50 transition-colors">
                今すぐ無料で試す →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 料金プラン */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-slate-900">シンプルな料金プラン</h2>
            <p className="text-slate-500 text-lg">まずは無料で始めよう。いつでもアップグレード可能。</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-slate-200 rounded-2xl p-8">
              <div className="text-xl font-bold text-slate-900 mb-1">無料プラン</div>
              <div className="text-slate-500 text-sm mb-6">登山ライフをスタート</div>
              <div className="text-5xl font-extrabold text-slate-900 mb-8">¥0<span className="text-lg font-normal text-slate-400">/月</span></div>
              <ul className="space-y-3 mb-8">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-slate-700 text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/sign-up" className="block">
                <button className="w-full py-3.5 border-2 border-emerald-500 text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-colors">
                  無料で始める
                </button>
              </Link>
            </div>
            <div className="border-2 border-emerald-500 rounded-2xl p-8 bg-gradient-to-b from-emerald-50 to-white relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">おすすめ</div>
              <div className="text-xl font-bold text-slate-900 mb-1">プレミアム</div>
              <div className="text-slate-500 text-sm mb-6">AI機能を全解放</div>
              <div className="text-5xl font-extrabold text-emerald-600 mb-8">¥490<span className="text-lg font-normal text-slate-400">/月</span></div>
              <ul className="space-y-3 mb-8">
                {premiumFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-slate-700 text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/sign-up" className="block">
                <button className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-200">
                  プレミアムで始める
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 安全ガイドバナー */}
      <section className="py-12 px-4 bg-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium mb-3">
            <CheckCircle className="h-4 w-4" />
            遭難ゼロを目指して
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-3">初心者向け 安全・装備ガイド</h2>
          <p className="text-slate-400 mb-6">
            「何を持っていけばいい？」「もし道に迷ったら？」<br />
            装備の選び方・怪我の予防・緊急時の対応を丁寧に解説しています。
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/safety">
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm">
                🎒 装備ガイドを見る
              </button>
            </Link>
            <Link href="/safety/emergency">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm">
                🆘 緊急時の対応
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="py-10 px-4 bg-slate-900 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="bg-emerald-500 p-1.5 rounded-lg">
            <Mountain className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-white">SummitPass</span>
        </div>
        <p className="text-slate-500 text-sm">© 2025 SummitPass. All rights reserved.</p>
      </footer>
    </div>
  )
}

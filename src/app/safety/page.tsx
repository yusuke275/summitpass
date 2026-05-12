import Navbar from '@/components/layout/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  ShieldCheck, AlertTriangle, Phone, Heart, Thermometer, Wind,
  Backpack, CheckCircle, Info, ChevronRight, Star, Footprints,
  Sun, CloudRain, Snowflake, Clock, MapPin, Users, Zap
} from 'lucide-react'
import Link from 'next/link'

// ──────────────── 装備データ ────────────────

const gearCategories = [
  {
    id: 'shoes',
    emoji: '👟',
    title: '登山靴・足まわり',
    color: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50 border-amber-200',
    textColor: 'text-amber-700',
    importance: 'must',
    items: [
      {
        name: '登山靴（トレッキングシューズ）',
        why: '普通のスニーカーは滑りやすく、足首を痛めやすいです。防水で足首をしっかり固定できる登山靴が必須です。',
        beginner: '初心者は「ローカット〜ミドルカット」の軽量タイプがおすすめ。',
        price: '8,000円〜30,000円',
        brands: ['モンベル', 'サロモン', 'メレル', 'キャラバン'],
        tip: '必ず事前に履きならして靴ずれを防ごう！',
      },
      {
        name: '登山用靴下（ウールソックス）',
        why: '普通の綿ソックスは汗で濡れると乾きにくく、靴ずれや低体温症の原因になります。',
        beginner: 'メリノウール素材が蒸れにくくおすすめ。厚手タイプを選ぼう。',
        price: '1,500円〜3,000円',
        brands: ['ダーンタフ', 'スマートウール', 'モンベル'],
        tip: '必ず2足以上持参しよう！',
      },
      {
        name: 'ゲイター（スパッツ）',
        why: '雨や泥が靴の中に入るのを防ぎます。特に雨天・積雪時に必要。',
        beginner: '初心者は初めは不要ですが、雨の多い季節は持っていると安心。',
        price: '2,000円〜6,000円',
        brands: ['モンベル', 'アクシーズクイン'],
        tip: null,
      },
    ],
  },
  {
    id: 'clothes',
    emoji: '🧥',
    title: '服装・レイヤリング',
    color: 'from-blue-500 to-cyan-500',
    bgLight: 'bg-blue-50 border-blue-200',
    textColor: 'text-blue-700',
    importance: 'must',
    items: [
      {
        name: 'ベースレイヤー（速乾インナー）',
        why: '汗を素早く吸収して外に逃がします。綿は濡れると乾かず体温を奪うので絶対NG！',
        beginner: '「登山用」または「アウトドア用」と書かれたものを選んで。ユニクロのドライEXでも入門には可。',
        price: '2,000円〜8,000円',
        brands: ['パタゴニア', 'モンベル', 'ファイントラック'],
        tip: '綿100%のTシャツは山では危険！',
      },
      {
        name: 'ミドルレイヤー（フリース・ダウン）',
        why: '気温が下がったときに保温するための中間層。山の天気は変わりやすいので必須。',
        beginner: 'フリースジャケットが軽くて使いやすい。ダウンは圧縮できるものがコンパクトで便利。',
        price: '5,000円〜20,000円',
        brands: ['モンベル', 'パタゴニア', 'ノースフェイス'],
        tip: '山頂は平地より約6〜10℃低いので必ず持参！',
      },
      {
        name: 'レインウェア（上下セット）',
        why: '山の雨は突然来ます。雨に濡れると体温が一気に下がり命に関わることも。100均カッパは風で破れるので危険。',
        beginner: '「ゴアテックス」などの防水透湿素材が理想。最初は安めでも専用品を。',
        price: '15,000円〜50,000円',
        brands: ['モンベル', 'マムート', 'アーク\'テリクス'],
        tip: 'ザックの一番アクセスしやすい場所に入れておこう！',
      },
      {
        name: '帽子・グローブ・ネックウォーマー',
        why: '体の末端は体温を奪われやすい場所。特に稜線では強風で急速に体が冷えます。',
        beginner: '日差し対策の帽子と、防寒用の薄手グローブをセットで持とう。',
        price: '各1,000円〜5,000円',
        brands: ['各メーカー共通'],
        tip: '夏でも稜線では防寒具が必要です！',
      },
    ],
  },
  {
    id: 'bag',
    emoji: '🎒',
    title: 'ザック・バッグ',
    color: 'from-emerald-500 to-teal-500',
    bgLight: 'bg-emerald-50 border-emerald-200',
    textColor: 'text-emerald-700',
    importance: 'must',
    items: [
      {
        name: 'ザック（登山用バックパック）',
        why: '両手が空くリュック型が基本。日帰りなら20〜30L、1泊以上なら40L以上が目安。',
        beginner: '初心者の日帰り登山には25〜30Lが使いやすい。レインカバーがついたものを。',
        price: '8,000円〜30,000円',
        brands: ['グレゴリー', 'オスプレー', 'ドイター', 'モンベル'],
        tip: 'ウエストベルトを締めると腰で重さを受けられて楽になります！',
      },
      {
        name: 'ザックカバー（雨蓋）',
        why: '雨でザックが濡れると、中の衣類や食料が全部ぬれてしまいます。',
        beginner: 'ザックに付属していない場合は別途購入を。100円ショップのものは耐久性が低いので専用品を。',
        price: '1,500円〜4,000円',
        brands: ['各メーカー対応'],
        tip: null,
      },
    ],
  },
  {
    id: 'navigation',
    emoji: '🗺️',
    title: 'ナビゲーション・情報',
    color: 'from-purple-500 to-indigo-500',
    bgLight: 'bg-purple-50 border-purple-200',
    textColor: 'text-purple-700',
    importance: 'must',
    items: [
      {
        name: '地図・コンパス',
        why: 'スマホは電池切れ・電波なしになることがあります。紙の地図とコンパスは電池不要の最終手段。',
        beginner: 'まずは「山と高原地図」シリーズを購入しよう。スマホアプリ「ヤマップ」「ジオグラフィカ」も活用。',
        price: '地図600円〜1,000円 / コンパス1,500円〜',
        brands: ['昭文社（山と高原地図）', 'シルバ（コンパス）'],
        tip: 'スマホアプリは事前にオフラインで地図をダウンロードしておこう！',
      },
      {
        name: 'モバイルバッテリー（大容量）',
        why: 'スマホは低温下で電池の減りが早くなります。山では通常の3倍の消費を見込んで。',
        beginner: '10,000mAh以上のものを持参。防水タイプが安心。',
        price: '2,000円〜6,000円',
        brands: ['アンカー', 'モバイルバッテリー各社'],
        tip: '寝袋の中に入れると低温での電池切れを防げます！',
      },
      {
        name: 'ヘッドランプ',
        why: '山では日没が早い。暗くなると道を踏み外す危険があります。懐中電灯は両手がふさがるのでNG。',
        beginner: '予備電池も忘れずに。明るさ100〜300ルーメンあれば十分。',
        price: '2,000円〜8,000円',
        brands: ['ブラックダイヤモンド', 'ペツル', 'レッドレンザー'],
        tip: '予備電池を必ず持参！低温で電池は急速に消耗します。',
      },
    ],
  },
  {
    id: 'water_food',
    emoji: '🍙',
    title: '水・食料',
    color: 'from-rose-500 to-pink-500',
    bgLight: 'bg-rose-50 border-rose-200',
    textColor: 'text-rose-700',
    importance: 'must',
    items: [
      {
        name: '水（必要量より多めに）',
        why: '脱水は判断力の低下を引き起こします。下山後に余るくらい多めに持参が鉄則。',
        beginner: '目安：夏場は体重×行動時間×5ml。2〜3時間の日帰りなら最低1.5L。',
        price: '水筒500円〜3,000円',
        brands: ['ナルゲン', 'サーモス', 'ハイドレーション各社'],
        tip: '行動中はこまめに少しずつ飲もう。のどが渇いてからでは遅い！',
      },
      {
        name: '行動食（すぐ食べられる食料）',
        why: '低血糖は疲労・判断ミスの原因。こまめなエネルギー補給が安全登山の基本。',
        beginner: 'チョコ・ナッツ・ゼリー飲料・おにぎりがおすすめ。30〜60分に1回補給しよう。',
        price: '500円〜1,500円',
        brands: ['メダリスト', 'ヴァーム', '各コンビニ食品'],
        tip: '緊急用の予備食を1食分多く持とう！',
      },
      {
        name: '非常食（ビバーク対策）',
        why: '下山できなくなったとき、一晩過ごすための最低限の食料。山のもしもの備え。',
        beginner: 'カロリーメイト・レーション・スポーツジェルなど軽くて高カロリーのものを。',
        price: '500円〜1,000円',
        brands: ['カロリーメイト', 'クリフバー'],
        tip: 'ザックの奥にひとつ常備しておこう！',
      },
    ],
  },
  {
    id: 'safety_tools',
    emoji: '🏥',
    title: '安全グッズ・応急処置',
    color: 'from-red-500 to-rose-500',
    bgLight: 'bg-red-50 border-red-200',
    textColor: 'text-red-700',
    importance: 'must',
    items: [
      {
        name: '救急セット（ファーストエイドキット）',
        why: '擦り傷・捻挫・マメなどは山でよく起こります。自分で処置できると安心。',
        beginner: '絆創膏・テーピング・消毒液・痛み止め・胃薬・体温計をひとまとめに。',
        price: '2,000円〜5,000円',
        brands: ['モンベル', 'アウトドアファーストエイドキット各社'],
        tip: '使い方も事前に確認しておこう！',
      },
      {
        name: 'ツェルト（簡易テント）または エマージェンシーシート',
        why: 'ケガや天候悪化で動けなくなったとき、体温を守る最後の砦。',
        beginner: 'まずは軽量でコンパクトな「エマージェンシーシート」（保温ブランケット）から。',
        price: 'シート300円〜 / ツェルト5,000円〜',
        brands: ['モンベル', 'イスカ'],
        tip: '使い方を覚えてから持っていこう！',
      },
      {
        name: 'ホイッスル',
        why: '声よりも遠くまで届き、体力を使わずに助けを呼べます。霧や暗闇でも有効。',
        beginner: 'ストラップ付きのものをザックやウェアに常にくっつけておこう。',
        price: '500円〜1,500円',
        brands: ['フォックス40', 'ストームホイッスル'],
        tip: 'SOSは「3回繰り返し」が国際的な遭難信号！',
      },
      {
        name: '登山保険',
        why: '山岳救助はヘリコプター1回で50〜100万円以上かかることも。保険が命綱。',
        beginner: 'モンベルの「山岳保険」が年間2,000円〜で加入でき初心者に最適。',
        price: '年間2,000円〜10,000円',
        brands: ['モンベル', 'エイチ・エス損保', '国内旅行保険'],
        tip: '登山前日までに必ず加入！当日加入は不可の場合も。',
      },
    ],
  },
]

// ──────────────── 難易度別チェックリスト ────────────────

const levelGear = [
  {
    level: '初級（高尾山・筑波山クラス）',
    emoji: '🌿',
    color: 'bg-green-500',
    bg: 'bg-green-50 border-green-200',
    items: [
      '動きやすいスニーカーまたは軽トレッキングシューズ',
      '速乾インナー＋動きやすいパンツ',
      '薄手のフリースやウインドブレーカー',
      '20Lザック',
      '飲み水1L以上',
      '行動食・昼食',
      'スマホ（ヤマップ等アプリ入り）＋モバイルバッテリー',
      '救急セット（絆創膏・痛み止め）',
      'レインウェア（念のため）',
    ],
    caution: '整備された登山道でも油断禁物。雨の日は石が滑りやすくなります。',
  },
  {
    level: '中級（日本百名山・標高1,500m〜2,500m）',
    emoji: '⛰️',
    color: 'bg-amber-500',
    bg: 'bg-amber-50 border-amber-200',
    items: [
      'ミドルカット以上の登山靴（必須）',
      'レイヤリング3枚（ベース・ミドル・アウター）',
      'ゴアテックス製レインウェア（上下）',
      '30L以上のザック',
      '水1.5〜2L以上',
      '行動食・昼食・非常食',
      '地図・コンパス・ヘッドランプ',
      '救急セット・ホイッスル',
      'エマージェンシーシート',
      '登山保険（加入必須）',
    ],
    caution: '山の天気変化に注意。雷が鳴ったらすぐに稜線から離れること。',
  },
  {
    level: '上級〜超上級（3,000m級・岩稜帯）',
    emoji: '🏔️',
    color: 'bg-red-500',
    bg: 'bg-red-50 border-red-200',
    items: [
      'ハイカットの本格登山靴',
      '冬用・防寒ダウン',
      '高機能レインウェア必須',
      '40L以上のザック（日帰りでも35L以上）',
      '水2L〜3L以上',
      'ヘルメット（岩場・鎖場のある山）',
      'ハーネス・スリング（上級者向け）',
      'ツェルト（必携）',
      '地図・GPS・コンパス',
      '登山保険（必須）',
      'ストック2本（下りで膝を守る）',
    ],
    caution: '必ず経験者と同行するか、ガイドを雇うことを強くおすすめします。',
  },
]

// ──────────────── 季節別注意 ────────────────

const seasonalNotes = [
  {
    season: '春（3〜5月）',
    icon: '🌸',
    bg: 'bg-pink-50 border-pink-200',
    text: 'text-pink-700',
    notes: [
      '残雪が残る山では軽アイゼン・ピッケルが必要',
      '午後から天気が崩れやすい',
      '朝夕の気温差が激しい',
      '花粉症の方はマスク・薬を持参',
    ],
  },
  {
    season: '夏（6〜8月）',
    icon: '☀️',
    bg: 'bg-amber-50 border-amber-200',
    text: 'text-amber-700',
    notes: [
      '午後に雷雨が多発。早朝出発・早めの下山が鉄則',
      '熱中症対策（塩分タブレット・水分補給）',
      '虫対策（虫除けスプレー・長袖）',
      '日焼け止め・サングラス必須',
      '山小屋は事前予約が必要',
    ],
  },
  {
    season: '秋（9〜11月）',
    icon: '🍂',
    bg: 'bg-orange-50 border-orange-200',
    text: 'text-orange-700',
    notes: [
      '日没が早まる。行動時間を短くして早めの下山を',
      '紅葉シーズンは登山者が増え渋滞する場合も',
      '10月以降は高い山では積雪の可能性',
      '防寒着を多めに持参',
    ],
  },
  {
    season: '冬（12〜2月）',
    icon: '❄️',
    bg: 'bg-blue-50 border-blue-200',
    text: 'text-blue-700',
    notes: [
      '雪山は完全に別の競技。初心者は絶対に単独で行かない',
      'アイゼン・ピッケル・ビーコン（雪崩感知器）が必要',
      '低体温症に注意。濡れた衣類を即交換',
      '日照時間が短い。日の出〜日没を厳守',
      'まず低山の雪山経験から始めよう',
    ],
  },
]

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-[#f0fdf4]">
      <Navbar />
      <main className="pt-20 pb-28 md:pb-8">

        {/* ヒーローヘッダー */}
        <div className="bg-gradient-to-br from-emerald-700 via-teal-700 to-emerald-800 text-white px-4 py-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-4 py-2 rounded-full text-sm font-medium mb-5">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              みんなで目指そう 遭難ゼロ・事故ゼロ
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              安全に登山するための<br />
              <span className="text-emerald-300">装備＆安全ガイド</span>
            </h1>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto leading-relaxed">
              「何を持っていけばいいの？」「もし迷ったらどうする？」<br />
              初心者の方が安心して山を楽しめるよう、わかりやすく丁寧に解説します。
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-7">
              <Link href="#gear">
                <button className="bg-white text-emerald-700 font-bold px-5 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors text-sm">
                  🎒 装備ガイド
                </button>
              </Link>
              <Link href="#level">
                <button className="bg-white/15 backdrop-blur text-white font-medium px-5 py-2.5 rounded-xl hover:bg-white/25 transition-colors text-sm border border-white/30">
                  📋 レベル別チェックリスト
                </button>
              </Link>
              <Link href="/safety/emergency">
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm flex items-center gap-1.5">
                  🆘 緊急時の対応
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">

          {/* 登山の大原則 */}
          <section>
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <h2 className="text-lg font-extrabold text-amber-800">まず覚えてほしい「登山の大原則」</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { no: '01', text: '登山届を必ず提出する（家族にも行先を伝える）' },
                  { no: '02', text: '天気予報を複数チェックし、悪天候は迷わず引き返す' },
                  { no: '03', text: '単独登山は避ける（特に初心者は必ず複数人で）' },
                  { no: '04', text: '計画より早めに下山開始（山は下りで事故が多い）' },
                  { no: '05', text: '山の天気は変わりやすい。晴れでもレインウェア必携' },
                  { no: '06', text: '体調が悪い日は中止する勇気を持つ' },
                  { no: '07', text: '携帯の電波がない場所が多い。オフライン地図を準備' },
                  { no: '08', text: '自分の体力より少し短めのコースを選ぶ' },
                ].map((rule) => (
                  <div key={rule.no} className="flex items-start gap-3 bg-white rounded-xl p-3">
                    <span className="bg-amber-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{rule.no}</span>
                    <p className="text-sm text-slate-700 font-medium leading-snug">{rule.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 装備ガイド */}
          <section id="gear">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-emerald-500 p-2 rounded-xl">
                <Backpack className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">必要な装備ガイド</h2>
                <p className="text-slate-500 text-sm">カテゴリ別に何が必要か、なぜ必要かをわかりやすく解説</p>
              </div>
            </div>

            <div className="space-y-6">
              {gearCategories.map((cat) => (
                <Card key={cat.id} className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden">
                  <div className={`bg-gradient-to-r ${cat.color} px-5 py-4`}>
                    <div className="flex items-center gap-3 text-white">
                      <span className="text-3xl">{cat.emoji}</span>
                      <div>
                        <h3 className="font-extrabold text-lg">{cat.title}</h3>
                        <span className="text-white/80 text-xs">必須アイテム</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-5 space-y-5">
                    {cat.items.map((item, idx) => (
                      <div key={item.name}>
                        {idx > 0 && <Separator className="mb-5" />}
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <h4 className="font-bold text-slate-900">{item.name}</h4>
                              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{item.price}</span>
                            </div>
                            {/* なぜ必要か */}
                            <div className="bg-slate-50 rounded-xl p-3 mb-2.5">
                              <p className="text-sm text-slate-700 leading-relaxed">
                                <span className="font-semibold text-slate-900">なぜ必要？　</span>
                                {item.why}
                              </p>
                            </div>
                            {/* 初心者向けアドバイス */}
                            <div className={`${cat.bgLight} border rounded-xl p-3 mb-2.5`}>
                              <p className="text-sm leading-relaxed">
                                <span className={`font-semibold ${cat.textColor}`}>👶 初心者向け　</span>
                                <span className="text-slate-700">{item.beginner}</span>
                              </p>
                            </div>
                            {/* おすすめブランド */}
                            <div className="flex flex-wrap gap-1.5 mb-2">
                              {item.brands.map((b) => (
                                <span key={b} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{b}</span>
                              ))}
                            </div>
                            {/* ワンポイントTips */}
                            {item.tip && (
                              <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-200 rounded-xl p-2.5">
                                <Star className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <p className="text-xs text-emerald-700 font-medium">{item.tip}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* レベル別チェックリスト */}
          <section id="level">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-500 p-2 rounded-xl">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">難易度別チェックリスト</h2>
                <p className="text-slate-500 text-sm">登る山のレベルに合わせて持ち物を確認しよう</p>
              </div>
            </div>
            <div className="space-y-5">
              {levelGear.map((level) => (
                <Card key={level.level} className={`border ${level.bg} shadow-sm rounded-2xl`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{level.emoji}</span>
                      <div>
                        <CardTitle className="text-base text-slate-900">{level.level}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-2 mb-4">
                      {level.items.map((item) => (
                        <div key={item} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2.5 text-sm text-slate-700">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
                      <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-700 font-medium">{level.caution}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 季節別注意点 */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-amber-500 p-2 rounded-xl">
                <Sun className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">季節別の注意ポイント</h2>
                <p className="text-slate-500 text-sm">山の季節ごとの特徴と対策</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {seasonalNotes.map((s) => (
                <div key={s.season} className={`${s.bg} border rounded-2xl p-5`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{s.icon}</span>
                    <h3 className={`font-bold text-base ${s.text}`}>{s.season}</h3>
                  </div>
                  <ul className="space-y-2">
                    {s.notes.map((note) => (
                      <li key={note} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-slate-400 mt-0.5">▸</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 怪我のリスクと予防 */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-500 p-2 rounded-xl">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">よくある怪我とその予防法</h2>
                <p className="text-slate-500 text-sm">知っておくだけで防げる事故がたくさんあります</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                {
                  injury: '捻挫（ねんざ）',
                  rank: '最多',
                  rankColor: 'bg-red-100 text-red-700',
                  cause: '下り坂での着地ミス、疲労による足の乱れ',
                  prevention: [
                    'ハイカットの登山靴を着用して足首を固定',
                    '下りはゆっくり・足元をしっかり確認',
                    'ストックを使って重心を安定させる',
                    '疲れたら休憩！疲労時に事故が多発',
                  ],
                  first_aid: '動かさずに冷やす（アイシング20分）。重症なら搬送を。',
                },
                {
                  injury: '滑落・転倒',
                  rank: '危険度高',
                  rankColor: 'bg-orange-100 text-orange-700',
                  cause: '濡れた岩・落ち葉・急坂での油断',
                  prevention: [
                    'グリップのしっかりした登山靴を着用',
                    '雨後は岩・木の根・橋が特に滑りやすい',
                    '三点支持（両手両足のうち3点で体を支える）を意識',
                    '写真撮影は安全な場所に立ち止まってから',
                  ],
                  first_aid: '意識・呼吸を確認。動かさずに119番・ヘリを要請。',
                },
                {
                  injury: '低体温症（ていたいおんしょう）',
                  rank: '命に関わる',
                  rankColor: 'bg-purple-100 text-purple-700',
                  cause: '雨・汗で濡れた状態での風・冷気',
                  prevention: [
                    '濡れた衣類はすぐに着替える（コンビニ袋に防水）',
                    'レインウェアは雨が降ってから出すのでは遅い！事前に着用',
                    '行動食でエネルギーを補給し続ける',
                    '風が強いときはツェルト・エマージェンシーシートで防風',
                  ],
                  first_aid: '濡れた衣類を脱がせ乾いた服に。エマージェンシーシートで包む。温かい飲み物を少しずつ。すぐに下山・搬送。',
                },
                {
                  injury: '熱中症（ねっちゅうしょう）',
                  rank: '夏に多発',
                  rankColor: 'bg-amber-100 text-amber-700',
                  cause: '水分・塩分不足、日差しの強い稜線での活動',
                  prevention: [
                    '30〜60分に1回、少量の水分補給',
                    '塩分タブレット・スポーツドリンクで塩分も補給',
                    '帽子・日焼け止めで頭と体を守る',
                    'バテたら木陰で休憩してから行動',
                  ],
                  first_aid: '涼しい場所に移動・横にする。水分・塩分を補給。意識がなければ119番。',
                },
                {
                  injury: '高山病（こうざんびょう）',
                  rank: '2,500m以上に注意',
                  rankColor: 'bg-blue-100 text-blue-700',
                  cause: '急激な高度上昇による酸素不足',
                  prevention: [
                    'ゆっくりゆっくり登る（ハイペースは禁物）',
                    '水をたくさん飲む（脱水が高山病を悪化させる）',
                    '頭痛・吐き気・めまいを感じたらすぐ下山',
                    '無理に登り続けると脳浮腫・肺浮腫で死亡も',
                  ],
                  first_aid: '下山が唯一の治療。少し下るだけで劇的に改善することが多い。',
                },
              ].map((item) => (
                <div key={item.injury} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-50">
                    <span className="text-2xl">🩹</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-extrabold text-slate-900">{item.injury}</h3>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${item.rankColor}`}>{item.rank}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">原因：{item.cause}</p>
                    </div>
                  </div>
                  <div className="px-5 py-4 space-y-4">
                    <div>
                      <p className="text-xs font-bold text-emerald-700 mb-2 flex items-center gap-1">
                        <ShieldCheck className="h-3.5 w-3.5" /> 予防法
                      </p>
                      <ul className="space-y-1.5">
                        {item.prevention.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                      <p className="text-xs font-bold text-red-700 mb-1">🏥 応急処置</p>
                      <p className="text-sm text-red-800">{item.first_aid}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 緊急時バナー */}
          <section>
            <Link href="/safety/emergency">
              <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-6 text-white flex items-center justify-between hover:opacity-95 transition-opacity cursor-pointer">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-5 w-5" />
                    <span className="font-extrabold text-xl">緊急時の対応ガイドを見る</span>
                  </div>
                  <p className="text-red-100 text-sm">遭難・怪我・急病時の行動手順と緊急連絡先を確認</p>
                </div>
                <ChevronRight className="h-8 w-8 text-red-200 flex-shrink-0" />
              </div>
            </Link>
          </section>

          {/* 登山届 */}
          <section className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-emerald-700" />
              <h2 className="text-lg font-extrabold text-emerald-800">登山届を忘れずに！</h2>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              登山届（登山計画書）は、遭難したときに救助隊があなたを見つけるための大切な情報です。
              家族にも行き先・ルート・下山予定時間を必ず伝えてください。
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { name: 'コンパス（オンライン登山届）', url: 'https://www.mt-compass.com/', desc: '警察・消防署に直接届け出できる公式サービス' },
                { name: 'ヤマップ登山届', url: 'https://yamap.com/', desc: 'アプリから簡単に提出・家族に共有' },
                { name: '登山口の届出箱', url: '#', desc: '紙に書いてポストに入れるだけ。記念写真も撮っておこう' },
              ].map((srv) => (
                <div key={srv.name} className="bg-white rounded-xl p-3 border border-emerald-200">
                  <div className="font-bold text-sm text-slate-900 mb-1">{srv.name}</div>
                  <p className="text-xs text-slate-500">{srv.desc}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}

import Navbar from '@/components/layout/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Phone, AlertTriangle, MapPin, ChevronLeft, Radio, Navigation, Heart, Zap, Clock, CheckCircle, ShieldCheck, Users } from 'lucide-react'
import Link from 'next/link'

const emergencyContacts = [
  { name: '警察（遭難・救助）', number: '110', desc: '山岳救助の要請はまず警察へ。都道府県山岳遭難対策本部につないでもらえます。', color: 'bg-blue-600', emoji: '🚔' },
  { name: '救急・消防', number: '119', desc: 'ケガや急病で動けない場合。ヘリコプター出動もここから要請できます。', color: 'bg-red-600', emoji: '🚑' },
  { name: '海上保安庁', number: '118', desc: '沿岸・島の山岳地帯での遭難時（離島での登山など）。', color: 'bg-cyan-600', emoji: '⛵' },
  { name: 'ヤマップSOS機能', number: 'アプリから', desc: 'YAMAPアプリは電波がなくてもGPS位置を家族に送信できるSOS機能あり。', color: 'bg-emerald-600', emoji: '📱' },
]

const stepsByScene = [
  {
    scene: '道に迷った・遭難した',
    emoji: '🧭',
    color: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-300',
    bg: 'bg-amber-50',
    warning: '「もうちょっと歩けばわかる」は危険！迷ったと感じたら即停止が鉄則。',
    steps: [
      { step: 'まずその場で止まる', detail: '歩き続けると状況が悪化します。立ち止まって落ち着いて。パニックにならないことが最重要！', action: null },
      { step: '現在地を確認する', detail: '地図・スマホアプリ・GPSで位置を確認。スマホの電波がなくてもGPSは使えます。来た道を写真で振り返ろう。', action: null },
      { step: '知っている場所まで引き返す', detail: '分かれ道・山小屋など、確実に覚えている場所まで戻ります。「前に進む」より「確実に戻る」を選択。', action: null },
      { step: '連絡を試みる', detail: 'スマホで110番・119番に電話。電波が弱くても110番はつながりやすい。SMSや位置情報送信も試そう。', action: '📞 110番' },
      { step: '動けないなら待機する', detail: '天候悪化・夜・ケガで動けない場合は、安全な場所で待機。ツェルト・エマージェンシーシートで体を保温し、ホイッスルを吹いてレスキューを待つ。', action: null },
      { step: '位置情報を正確に伝える', detail: '山名・ルート名・最後に確認できた場所・現在の状況（ケガの有無）を伝える。スマホのGPS座標をスクリーンショットして共有も有効。', action: null },
    ],
  },
  {
    scene: '同行者がケガをした',
    emoji: '🩹',
    color: 'from-red-500 to-rose-500',
    borderColor: 'border-red-300',
    bg: 'bg-red-50',
    warning: '重傷者を無理に動かすと悪化することがあります。動かしてよいか判断してから行動を。',
    steps: [
      { step: '安全な場所に移動（可能な場合のみ）', detail: '落石・崖など危険なエリアにいる場合のみ、慎重に安全な場所へ。骨折・意識障害がある場合は動かさない。', action: null },
      { step: '意識・呼吸・脈を確認する', detail: '声をかけながら肩を軽くたたく。反応がなければ胸の動きで呼吸確認。脈は首の脈（頸動脈）で確認。', action: null },
      { step: '心肺停止なら心肺蘇生（CPR）', detail: '呼吸・脈がない場合：胸の真ん中を両手で強く・早く（100〜120回/分）圧迫。AEDがあれば使用。人が集まったら交代で続ける。', action: '🫀 胸骨圧迫継続' },
      { step: '出血がある場合は止血する', detail: '清潔な布・包帯で傷口を強く押さえて止血。手を離さず圧迫し続ける（直接圧迫止血法）。出血が多い四肢は止血帯も有効。', action: null },
      { step: '119番・110番に通報する', detail: 'ケガ人の状態・現在地・人数・状況を正確に伝える。オペレーターの指示に従って行動する。', action: '📞 119番' },
      { step: '保温して救助を待つ', detail: '衣類を重ね着させ、エマージェンシーシートで包む。地面の冷えを防ぐためにザックや荷物を敷く。意識がある場合は声をかけ続けて安心させる。', action: null },
    ],
  },
  {
    scene: '雷に遭遇した',
    emoji: '⚡',
    color: 'from-purple-500 to-indigo-500',
    borderColor: 'border-purple-300',
    bg: 'bg-purple-50',
    warning: '山での雷は非常に危険です。稜線・山頂にいる場合は直ちに下山開始！',
    steps: [
      { step: '即座に稜線・山頂から離れる', detail: '雷は高いところに落ちます。稜線・木の下・突き出た岩は特に危険。すぐに斜面の低い場所へ移動。', action: null },
      { step: '木・岩の近くから離れる', detail: '木に落ちた雷が「側撃雷」となって人を直撃することがある。木から最低4m以上離れる。', action: null },
      { step: '低い体勢をとる', detail: '「雷しゃがみ」の姿勢：しゃがんで足をそろえ、耳をふさぐ。地面に寝転がるのはNG（側撃を受けやすい）。金属は関係ないが、濡れないようにする。', action: null },
      { step: '複数人のときは距離をとる', detail: 'グループは散らばって5m以上距離をとる。全員が一度にやられるのを防ぐ。', action: null },
      { step: '雷鳴が聞こえなくなって30分待機', detail: '稲妻が見えてから30分以上、雷鳴が完全に聞こえなくなるまで安全な場所で待機。', action: null },
    ],
  },
  {
    scene: '天候が急変した',
    emoji: '🌩️',
    color: 'from-slate-600 to-slate-700',
    borderColor: 'border-slate-300',
    bg: 'bg-slate-50',
    warning: '「もうすぐ晴れるかも」と期待して登り続けることが最も危険な判断です。',
    steps: [
      { step: 'レインウェアをすぐに着る', detail: '雨が降ってからでは遅い！雨雲が近づいてきたら即着用。濡れてからでは体温を取り戻すのが大変。', action: null },
      { step: '下山を決断する', detail: '登頂にこだわらない。山は逃げません。安全に帰ることが次の登山への最大の準備。', action: null },
      { step: 'ルートを慎重に確認する', detail: '視界が悪い・濡れた岩は滑りやすい。地図とGPSで迷わないよう確認しながら下山。ペースを落とす。', action: null },
      { step: '山小屋に避難する', detail: '近くに山小屋がある場合は避難を検討。緊急時は宿泊予約なしでも受け入れてもらえることがあります。事前に小屋の場所を確認しておこう。', action: null },
    ],
  },
]

const phoneChecklist = [
  '登山届を提出済みか確認（コンパス・ヤマップ）',
  '現在地のGPS座標をスクリーンショット（圏外でも緯度・経度がわかる）',
  '地図をオフラインダウンロード済みか（電波なしでも使える）',
  'モバイルバッテリーの残量確認',
  '緊急連絡先（家族・山岳救助）を電話帳に登録済み',
  '保険証またはコピーをザックに入れている',
]

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-[#f0fdf4]">
      <Navbar />
      <main className="pt-20 pb-28 md:pb-8">

        {/* 緊急ヘッダー */}
        <div className="bg-gradient-to-br from-red-700 via-red-600 to-rose-700 text-white px-4 py-10">
          <div className="max-w-4xl mx-auto">
            <Link href="/safety" className="inline-flex items-center gap-1 text-red-200 hover:text-white text-sm mb-5 transition-colors">
              <ChevronLeft className="h-4 w-4" />
              安全・装備ガイドに戻る
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-3 rounded-2xl">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="text-red-200 text-sm font-medium mb-1">緊急時対応ガイド</div>
                <h1 className="text-3xl md:text-4xl font-extrabold">もしものときの行動マニュアル</h1>
              </div>
            </div>
            <p className="text-red-100 text-lg leading-relaxed max-w-2xl">
              冷静に・正確に・すばやく。緊急時こそ落ち着いた行動が命を救います。
              このページをスクリーンショットして保存しておくと安心です。
            </p>

            {/* 緊急電話番号バナー */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <a href="tel:110" className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-2xl p-4 text-center">
                <div className="text-3xl font-black mb-0.5">110</div>
                <div className="text-blue-200 text-sm">警察（遭難・救助）</div>
              </a>
              <a href="tel:119" className="bg-red-500 hover:bg-red-600 transition-colors rounded-2xl p-4 text-center">
                <div className="text-3xl font-black mb-0.5">119</div>
                <div className="text-red-200 text-sm">救急・消防</div>
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">

          {/* 緊急連絡先一覧 */}
          <section>
            <h2 className="text-xl font-extrabold text-slate-900 mb-4 flex items-center gap-2">
              <Phone className="h-5 w-5 text-red-500" />
              緊急連絡先
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {emergencyContacts.map((c) => (
                <div key={c.name} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className={`${c.color} px-4 py-3 flex items-center gap-3`}>
                    <span className="text-2xl">{c.emoji}</span>
                    <div>
                      <div className="text-white font-bold text-sm">{c.name}</div>
                      <div className="text-white/90 text-xl font-extrabold">{c.number}</div>
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-sm text-slate-600">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 重要：通報時に伝えること */}
          <section className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Radio className="h-5 w-5 text-amber-700" />
              <h2 className="text-lg font-extrabold text-amber-800">通報時に必ず伝える6項目</h2>
            </div>
            <p className="text-sm text-amber-700 mb-4">オペレーターに冷静に、この順番で伝えましょう。</p>
            <div className="space-y-2">
              {[
                { no: '①', text: '山の名前とルート名', sub: '例：「長野県の槍ヶ岳、槍沢ルートです」' },
                { no: '②', text: '現在地', sub: '例：「○○山荘から徒歩30分上の、△△岩の近く」/ GPSの緯度経度' },
                { no: '③', text: '状況（何が起きたか）', sub: '例：「仲間が転倒して右足を骨折、歩けない状態です」' },
                { no: '④', text: '人数と負傷者の状態', sub: '例：「3人パーティで1人が怪我、意識はあります」' },
                { no: '⑤', text: '天気・気温の状況', sub: '例：「曇り、風が強く気温は5度くらいです」' },
                { no: '⑥', text: 'あなたの連絡先', sub: '折り返し連絡を受けられる電話番号' },
              ].map((item) => (
                <div key={item.no} className="flex items-start gap-3 bg-white rounded-xl p-3">
                  <span className="bg-amber-500 text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">{item.no}</span>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{item.text}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* シーン別対応手順 */}
          <section>
            <h2 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              <Navigation className="h-5 w-5 text-emerald-500" />
              シーン別対応手順
            </h2>
            <div className="space-y-6">
              {stepsByScene.map((scene) => (
                <Card key={scene.scene} className="bg-white border-0 shadow-sm rounded-2xl overflow-hidden">
                  <div className={`bg-gradient-to-r ${scene.color} px-5 py-4`}>
                    <div className="flex items-center gap-3 text-white">
                      <span className="text-3xl">{scene.emoji}</span>
                      <h3 className="font-extrabold text-xl">{scene.scene}</h3>
                    </div>
                  </div>
                  <div className={`mx-5 mt-4 mb-1 ${scene.bg} border ${scene.borderColor} rounded-xl p-3`}>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-amber-800">{scene.warning}</p>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="space-y-3">
                      {scene.steps.map((s, idx) => (
                        <div key={s.step} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="bg-slate-800 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                              {idx + 1}
                            </div>
                            {idx < scene.steps.length - 1 && <div className="w-0.5 bg-slate-200 flex-1 my-1" />}
                          </div>
                          <div className="flex-1 pb-2">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="font-bold text-slate-900 text-sm">{s.step}</span>
                              {s.action && (
                                <span className="text-xs bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded-full font-bold">
                                  {s.action}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">{s.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 心肺蘇生（CPR）の手順 */}
          <section className="bg-red-50 border-2 border-red-300 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Heart className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-extrabold text-red-800">心肺蘇生法（CPR）の手順</h2>
            </div>
            <p className="text-sm text-red-700 mb-5">意識がなく呼吸が止まっている場合に行います。救急車が来るまで続けてください。</p>
            <div className="space-y-3">
              {[
                { icon: '🤙', title: '119番に通報・AEDを探す', detail: '周囲に人がいれば「あなたは119番」「あなたはAEDを持ってきて」と具体的に指示する。' },
                { icon: '🙋', title: '安全を確認して傷病者に近づく', detail: '周囲の安全を確認（落石・崖など）。仰向けにして胸の動きで呼吸を確認する（10秒以内）。' },
                { icon: '🤝', title: '胸骨圧迫（心臓マッサージ）を開始', detail: '両手を重ねて胸の真ん中（乳頭の間）に置く。肘を伸ばして体重をかけ、5〜6cm深く押す。1分間に100〜120回のペースで。' },
                { icon: '💨', title: '人工呼吸（できる場合）', detail: '30回の胸骨圧迫後に人工呼吸2回。顎を持ち上げて気道を確保し、口を密着させて息を吹き込む。（感染リスクが気になる場合は胸骨圧迫のみでも可）' },
                { icon: '⚡', title: 'AEDが届いたら使用する', detail: 'AEDの音声案内に従って操作。電気ショック後はすぐ胸骨圧迫を再開。救急隊員が来るまで継続。' },
              ].map((step, idx) => (
                <div key={step.title} className="flex items-start gap-3 bg-white rounded-xl p-4">
                  <span className="text-2xl flex-shrink-0">{step.icon}</span>
                  <div>
                    <div className="font-bold text-slate-900 text-sm mb-0.5">STEP {idx + 1}：{step.title}</div>
                    <p className="text-sm text-slate-600">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-red-100 rounded-xl p-3">
              <p className="text-sm text-red-800 font-medium">
                ⚠️ 「やりすぎてしまったらどうしよう」は不要です。心肺停止の人に胸骨圧迫は害になりません。勇気を持って行動してください。
              </p>
            </div>
          </section>

          {/* 事前チェックリスト */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <h2 className="text-xl font-extrabold text-slate-900">出発前チェックリスト</h2>
            </div>
            <p className="text-slate-500 text-sm mb-4">登山前日・当日の朝に必ず確認しよう</p>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="space-y-2.5">
                {[
                  { check: '天気予報を3つ以上のサイトで確認した（てんきとくらす・ヤマテン・気象庁）', important: true },
                  { check: '登山届を提出した（コンパスまたはヤマップ）', important: true },
                  { check: '家族・知人に行き先・下山予定時刻を伝えた', important: true },
                  { check: '登山保険に加入済み（またはカードの旅行保険を確認）', important: true },
                  { check: 'スマホに地図をオフラインダウンロードした', important: false },
                  { check: 'モバイルバッテリーを充電した', important: false },
                  { check: '水・行動食・非常食を十分に用意した', important: false },
                  { check: 'レインウェアをザックの取り出しやすい場所に入れた', important: false },
                  { check: '救急セット・ホイッスル・ヘッドランプを入れた', important: false },
                  { check: 'エマージェンシーシートを入れた', important: false },
                  { check: '体調は万全か（睡眠・食事・体の痛みなし）', important: true },
                  { check: '下山時間を逆算して出発時刻を決めた', important: false },
                ].map((item) => (
                  <div key={item.check} className={`flex items-center gap-3 p-3 rounded-xl ${item.important ? 'bg-red-50 border border-red-200' : 'bg-slate-50'}`}>
                    <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center ${item.important ? 'border-red-400' : 'border-slate-300'}`}>
                    </div>
                    <span className="text-sm text-slate-700 flex-1">{item.check}</span>
                    {item.important && <span className="text-xs text-red-600 font-bold bg-red-100 px-2 py-0.5 rounded-full flex-shrink-0">必須</span>}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ヘリコプター救助のサイン */}
          <section className="bg-slate-800 text-white rounded-2xl p-6">
            <h2 className="text-xl font-extrabold mb-2 flex items-center gap-2">
              🚁 ヘリコプターに気づいてもらうサイン
            </h2>
            <p className="text-slate-400 text-sm mb-5">上空のヘリに自分の位置を知らせるための方法</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { signal: '両腕をY字に広げる', desc: '「助けてください（YES）」の国際的なサイン。両腕を斜め上に上げる。', emoji: '🙋' },
                { signal: 'ホイッスルを3回繰り返す', desc: '国際遭難信号は「6回吹いて1分休む」の繰り返し。', emoji: '📯' },
                { signal: '鏡・光るものを反射させる', desc: 'スマホのフラッシュ・時計・アルミシートでヘリに光を反射させる。', emoji: '🔦' },
                { signal: '目立つ色のものを振る', desc: '赤・オレンジ・黄色など鮮やかな色のウェアやシートを振る。', emoji: '🚩' },
              ].map((s) => (
                <div key={s.signal} className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{s.emoji}</span>
                    <span className="font-bold text-sm">{s.signal}</span>
                  </div>
                  <p className="text-slate-400 text-xs">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 装備ガイドに戻る */}
          <div className="text-center">
            <Link href="/safety">
              <button className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl transition-colors">
                <ShieldCheck className="h-5 w-5" />
                装備ガイドに戻る
              </button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  )
}

'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Crown, Sparkles, Camera, MapPin, Zap, Image, CheckCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const features = [
  { icon: Sparkles, title: 'AIレポート生成（無制限）', desc: 'Claude AIが登山記録を美文に変換' },
  { icon: Camera, title: 'AI山同定（無制限）', desc: '写真から山名をAIが自動識別' },
  { icon: Image, title: '写真（無制限）', desc: '枚数制限なしで投稿可能' },
  { icon: MapPin, title: 'GPXルート共有', desc: 'ルートを地図で表示・共有' },
  { icon: Zap, title: '広告なし', desc: '快適な登山記録ライフ' },
]

export default function PremiumPage() {
  const [loading, setLoading] = useState(false)
  const [aiImage, setAiImage] = useState<File | null>(null)
  const [identifying, setIdentifying] = useState(false)
  const [identifyResult, setIdentifyResult] = useState('')

  const handleSubscribe = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      toast.error('決済の開始に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  const handleImageIdentify = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAiImage(file)
    setIdentifying(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      const res = await fetch('/api/ai/identify', { method: 'POST', body: formData })
      const data = await res.json()
      setIdentifyResult(data.result ?? '識別できませんでした')
    } catch {
      setIdentifyResult('エラーが発生しました')
    } finally {
      setIdentifying(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-20 pb-24 md:pb-8 px-4 max-w-3xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full mb-4">
            <Crown className="h-5 w-5" />
            <span className="font-bold">プレミアムプラン</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">AIで登山をもっと楽しく</h1>
          <p className="text-slate-500">プレミアムで全機能を解放しよう</p>
        </div>

        {/* 料金カード */}
        <Card className="mb-6 border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50">
          <CardContent className="p-6 text-center">
            <div className="text-5xl font-black text-slate-900 mb-1">
              ¥490<span className="text-xl font-normal text-slate-500">/月</span>
            </div>
            <div className="text-slate-500 mb-6">いつでもキャンセル可能</div>
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90 text-white py-4 rounded-xl font-bold text-lg transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Crown className="h-5 w-5" />}
              {loading ? '処理中...' : 'プレミアムを始める'}
            </button>
            <p className="text-xs text-slate-400 mt-3">Stripeの安全な決済画面へ移動します</p>
          </CardContent>
        </Card>

        {/* 機能一覧 */}
        <Card className="mb-6">
          <CardHeader><CardTitle>プレミアム機能</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {features.map((f) => (
              <div key={f.title} className="flex items-center gap-3">
                <div className="bg-amber-100 p-2 rounded-lg">
                  <f.icon className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <div className="font-medium text-slate-900 text-sm">{f.title}</div>
                  <div className="text-xs text-slate-500">{f.desc}</div>
                </div>
                <CheckCircle className="h-4 w-4 text-emerald-500 ml-auto" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI山同定デモ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-amber-500" />
              AI山同定を試す
              <Badge className="bg-amber-100 text-amber-700 border-0">デモ</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500 mb-4">山の写真をアップロードすると、AIがどの山か識別します</p>
            <label className="block border-2 border-dashed border-slate-200 rounded-lg p-6 text-center cursor-pointer hover:border-amber-300 transition-colors">
              <Camera className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-500">写真を選択</p>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageIdentify} />
            </label>
            {aiImage && (
              <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                {identifying ? (
                  <div className="flex items-center gap-2 text-amber-700">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    AIが山を識別中...
                  </div>
                ) : (
                  <div>
                    <div className="text-xs font-medium text-amber-700 mb-1">✨ AI識別結果</div>
                    <div className="text-slate-800 font-medium">{identifyResult}</div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Mountain, Loader2, Sparkles, Upload, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

const conditions = [
  { value: 'excellent', label: '最高', emoji: '😄' },
  { value: 'good', label: '良好', emoji: '🙂' },
  { value: 'fair', label: 'まあまあ', emoji: '😐' },
  { value: 'poor', label: '悪天候', emoji: '😰' },
]

const MOUNTAINS_LIST = [
  { id: 'mt_fuji', name: '富士山', elevation: 3776 },
  { id: 'mt_kita', name: '北岳', elevation: 3193 },
  { id: 'mt_okuhotaka', name: '奥穂高岳', elevation: 3190 },
  { id: 'mt_akadake', name: '赤岳', elevation: 2899 },
  { id: 'mt_takao', name: '高尾山', elevation: 599 },
  { id: 'mt_tsukuba', name: '筑波山', elevation: 877 },
]

export default function NewClimbPage() {
  const [selectedMountain, setSelectedMountain] = useState('')
  const [climbedAt, setClimbedAt] = useState('')
  const [duration, setDuration] = useState('')
  const [distance, setDistance] = useState('')
  const [elevationGain, setElevationGain] = useState('')
  const [weather, setWeather] = useState('')
  const [condition, setCondition] = useState('good')
  const [notes, setNotes] = useState('')
  const [aiReport, setAiReport] = useState('')
  const [generating, setGenerating] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const generateAiReport = async () => {
    if (!selectedMountain || !notes) {
      toast.error('山と感想メモを入力してください')
      return
    }
    setGenerating(true)
    try {
      const mountain = MOUNTAINS_LIST.find(m => m.id === selectedMountain)
      const res = await fetch('/api/ai/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mountainName: mountain?.name,
          elevation: mountain?.elevation,
          climbedAt,
          duration: parseInt(duration) || 0,
          distance: parseFloat(distance) || 0,
          weather,
          condition,
          notes,
        }),
      })
      const data = await res.json()
      if (res.status === 403 && data.upgrade) {
        toast.error('AIレポートはプレミアムプラン限定です', {
          action: { label: 'アップグレード', onClick: () => { window.location.href = '/premium' } },
        })
        return
      }
      if (data.report) {
        setAiReport(data.report)
        toast.success('AIレポートを生成しました！')
      }
    } catch {
      toast.error('AIレポートの生成に失敗しました')
    } finally {
      setGenerating(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMountain || !climbedAt) {
      toast.error('山と登山日を入力してください')
      return
    }
    try {
      const res = await fetch('/api/climbs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mountain_id: selectedMountain,
          climbed_at: climbedAt,
          duration_minutes: duration ? parseInt(duration) : null,
          distance_km: distance ? parseFloat(distance) : null,
          elevation_gain: elevationGain ? parseInt(elevationGain) : null,
          weather,
          condition,
          notes,
          ai_report: aiReport,
        }),
      })
      if (!res.ok) {
        const err = await res.json()
        toast.error(err.error ?? '保存に失敗しました')
        return
      }
      toast.success('登山記録を保存しました！')
      setSubmitted(true)
    } catch {
      toast.error('通信エラーが発生しました')
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">登山記録を保存しました！</h2>
            <p className="text-slate-500 mb-6">バッジが新たに解放されているかもしれません</p>
            <a href="/dashboard" className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors">
              ダッシュボードへ
            </a>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-20 pb-24 md:pb-8 px-4 max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">登山記録を追加</h1>
          <p className="text-slate-500">登頂した山を記録しよう</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 山の選択 */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Mountain className="h-5 w-5 text-emerald-500" /> 山を選ぶ</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {MOUNTAINS_LIST.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMountain(m.id)}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      selectedMountain === m.id
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="font-medium text-sm">{m.name}</div>
                    <div className="text-xs text-slate-500">{m.elevation.toLocaleString()}m</div>
                  </button>
                ))}
              </div>
              <Input className="mt-3" placeholder="他の山を検索..." />
            </CardContent>
          </Card>

          {/* 日時・データ */}
          <Card>
            <CardHeader><CardTitle>登山データ</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">登山日 *</label>
                <Input type="date" value={climbedAt} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClimbedAt(e.target.value)} required />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">所要時間(分)</label>
                  <Input type="number" placeholder="360" value={duration} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDuration(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">距離(km)</label>
                  <Input type="number" step="0.1" placeholder="12.5" value={distance} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDistance(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">標高差(m)</label>
                  <Input type="number" placeholder="1500" value={elevationGain} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setElevationGain(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">天気</label>
                <Input placeholder="例：快晴、強風" value={weather} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWeather(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">コンディション</label>
                <div className="flex gap-2">
                  {conditions.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setCondition(c.value)}
                      className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        condition === c.value ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div>{c.emoji}</div>
                      <div className="text-xs text-slate-600">{c.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* メモ・AIレポート */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>感想・メモ</span>
                <Badge className="bg-amber-100 text-amber-700 border-amber-200">✨ AIレポート生成</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                placeholder="登山の感想、ルートの様子、注意点などを自由に書いてください。AIが美しいレポートに変換します。"
                rows={4}
                value={notes}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
              />
              <button
                type="button"
                onClick={generateAiReport}
                disabled={generating}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {generating ? 'AIレポート生成中...' : 'AIでレポートを生成する'}
              </button>
              {aiReport && (
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="text-xs font-medium text-amber-700 mb-2 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> AIが生成したレポート
                  </div>
                  <div className="text-sm text-slate-700 whitespace-pre-wrap">{aiReport}</div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 写真アップロード */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Upload className="h-5 w-5" /> 写真をアップロード</CardTitle></CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center hover:border-emerald-300 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-500">クリックまたはドラッグ&ドロップ</p>
                <p className="text-xs text-slate-400 mt-1">AI山同定機能で山を自動識別します</p>
              </div>
            </CardContent>
          </Card>

          <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg transition-colors">
            登山記録を保存する
          </button>
        </form>
      </main>
    </div>
  )
}

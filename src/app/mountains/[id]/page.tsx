import Navbar from '@/components/layout/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mountain, MapPin, TrendingUp, CloudSun, AlertTriangle, CheckCircle, Users, Home, Clock, Calendar, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { getHutsByMountain } from '@/lib/huts'
import { getFacilitiesByMountain, facilityTypeEmoji, facilityTypeLabel } from '@/lib/facilities'

// ダミーデータ
const mountainData: Record<string, {
  id: string; name: string; name_kana: string; elevation: number
  prefecture: string; region: string; latitude: number; longitude: number
  category: string; difficulty: string; description: string
  weather: { temperature: number; windspeed: number; description: string; icon: string; dangerLevel: string; dangerReason: string }
  climbed: boolean; climbCount: number
  partners: { name: string; type: string; url: string }[]
}> = {
  mt_fuji: {
    id: 'mt_fuji', name: '富士山', name_kana: 'ふじさん', elevation: 3776,
    prefecture: '静岡県・山梨県', region: '中部', latitude: 35.3606, longitude: 138.7274,
    category: 'hyakumei', difficulty: 'medium',
    description: '日本最高峰。毎年夏になると多くの登山者が訪れる。世界文化遺産にも登録されており、日本の象徴的な山として世界中に知られる。開山期間は7月〜9月初旬。',
    weather: { temperature: -5, windspeed: 42, description: '晴れ', icon: '☀️', dangerLevel: 'caution', dangerReason: '強風に注意してください' },
    climbed: true, climbCount: 8923,
    partners: [
      { name: '富士山頂上富士館', type: 'hut', url: '#' },
      { name: 'モンベル富士吉田店', type: 'shop', url: '#' },
    ],
  },
}

const difficultyLabels: Record<string, string> = {
  easy: '初級', medium: '中級', hard: '上級', expert: '超上級',
}

const dangerColors: Record<string, { bg: string; text: string; icon: string }> = {
  safe: { bg: 'bg-green-50 border-green-200', text: 'text-green-700', icon: '✓' },
  caution: { bg: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-700', icon: '⚠️' },
  danger: { bg: 'bg-red-50 border-red-200', text: 'text-red-700', icon: '🚫' },
}

export default async function MountainDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const nearbyHuts = getHutsByMountain(id)
  const nearbyFacilities = getFacilitiesByMountain(id)
  const mountain = mountainData[id] ?? {
    id, name: '山', name_kana: 'やま', elevation: 1000,
    prefecture: '不明', region: '不明', latitude: 35, longitude: 137,
    category: 'other', difficulty: 'medium',
    description: 'この山の詳細情報は準備中です。',
    weather: { temperature: 10, windspeed: 10, description: '晴れ', icon: '☀️', dangerLevel: 'safe', dangerReason: '' },
    climbed: false, climbCount: 0, partners: [],
  }

  const danger = dangerColors[mountain.weather.dangerLevel]

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-20 pb-24 md:pb-8">
        {/* ヘッダー画像エリア */}
        <div className="h-56 bg-gradient-to-br from-slate-700 via-slate-600 to-emerald-800 relative">
          <Mountain className="absolute right-8 bottom-4 h-32 w-32 text-white/10" />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900/80">
            <div className="max-w-4xl mx-auto">
              {mountain.category === 'hyakumei' && (
                <Badge className="mb-2 bg-amber-500/90 text-white border-0">🏆 日本百名山</Badge>
              )}
              <h1 className="text-3xl font-bold text-white">{mountain.name}</h1>
              <p className="text-emerald-200">{mountain.name_kana} · {mountain.prefecture}</p>
            </div>
          </div>
          {mountain.climbed && (
            <div className="absolute top-4 right-4">
              <span className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                <CheckCircle className="h-4 w-4" /> 登頂済み
              </span>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {/* 基本情報 */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
                <div className="text-2xl font-bold">{mountain.elevation.toLocaleString()}m</div>
                <div className="text-xs text-slate-500">標高</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Mountain className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                <div className="text-2xl font-bold">{difficultyLabels[mountain.difficulty]}</div>
                <div className="text-xs text-slate-500">難易度</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-5 w-5 text-purple-500 mx-auto mb-1" />
                <div className="text-2xl font-bold">{mountain.climbCount.toLocaleString()}</div>
                <div className="text-xs text-slate-500">登頂記録数</div>
              </CardContent>
            </Card>
          </div>

          {/* 天気・危険度 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudSun className="h-5 w-5 text-blue-500" /> 現在の天気・登山危険度
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 mb-4">
                <span className="text-4xl">{mountain.weather.icon}</span>
                <div>
                  <div className="text-2xl font-bold">{mountain.weather.temperature}°C</div>
                  <div className="text-slate-500">{mountain.weather.description} · 風速{mountain.weather.windspeed}km/h</div>
                </div>
              </div>
              {mountain.weather.dangerReason && (
                <div className={`p-3 rounded-lg border ${danger.bg}`}>
                  <div className={`flex items-center gap-2 font-medium ${danger.text}`}>
                    <AlertTriangle className="h-4 w-4" />
                    {mountain.weather.dangerReason}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 説明 */}
          <Card>
            <CardHeader><CardTitle>山の情報</CardTitle></CardHeader>
            <CardContent>
              <p className="text-slate-700 leading-relaxed">{mountain.description}</p>
              <div className="mt-4 flex items-center gap-2 text-slate-500 text-sm">
                <MapPin className="h-4 w-4" />
                {mountain.prefecture} · 座標: {mountain.latitude.toFixed(4)}, {mountain.longitude.toFixed(4)}
              </div>
            </CardContent>
          </Card>

          {/* 近隣の山小屋 */}
          {nearbyHuts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-emerald-500" />
                  近隣の山小屋
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {nearbyHuts.map((hut) => (
                  <Link key={hut.id} href={`/huts/${hut.id}`}>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-transparent transition-colors cursor-pointer">
                      <span className="text-2xl">🏠</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-900 text-sm">{hut.name}</div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                          <span className="flex items-center gap-0.5">
                            <TrendingUp className="h-3 w-3" />
                            {hut.elevation.toLocaleString()}m
                          </span>
                          <span className="flex items-center gap-0.5">
                            <Calendar className="h-3 w-3" />
                            {hut.openPeriod}
                          </span>
                          {hut.checkIn !== '-' && (
                            <span className="flex items-center gap-0.5">
                              <Clock className="h-3 w-3" />
                              IN {hut.checkIn}
                            </span>
                          )}
                        </div>
                      </div>
                      {hut.priceStay > 0 && (
                        <div className="text-right flex-shrink-0">
                          <div className="text-emerald-700 font-bold text-sm">¥{hut.priceStay.toLocaleString()}</div>
                          <div className="text-xs text-slate-400">1泊2食</div>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
                <Link href={`/huts?mountain=${id}`}>
                  <div className="text-center text-sm text-emerald-600 hover:text-emerald-700 pt-1 font-medium">
                    山小屋をもっと見る →
                  </div>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* 近隣のおすすめ施設・温泉 */}
          {nearbyFacilities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ♨️ 近隣のおすすめ施設・温泉
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {nearbyFacilities.map((facility) => (
                  <div key={facility.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-transparent hover:border-slate-200 transition-colors">
                    <span className="text-2xl flex-shrink-0">{facilityTypeEmoji[facility.type]}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="font-semibold text-slate-900 text-sm">{facility.name}</span>
                        <Badge className="bg-slate-100 text-slate-600 border-0 text-xs">{facilityTypeLabel[facility.type]}</Badge>
                      </div>
                      {facility.price && (
                        <div className="text-emerald-700 font-medium text-xs mb-1">💴 {facility.price}</div>
                      )}
                      <div className="text-xs text-slate-500 space-y-0.5">
                        <div>🕐 {facility.hours}　🚫 定休: {facility.closedDays}</div>
                        <div>📍 {facility.distance}</div>
                      </div>
                      {facility.features.slice(0, 3).length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {facility.features.slice(0, 3).map((feat) => (
                            <span key={feat} className="text-xs bg-white text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                              {feat}
                            </span>
                          ))}
                        </div>
                      )}
                      {facility.url && (
                        <a
                          href={facility.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:underline mt-1.5"
                        >
                          <ExternalLink className="h-3 w-3" />
                          公式サイト
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* パートナー（山小屋・ショップ） */}
          {mountain.partners.length > 0 && nearbyHuts.length === 0 && (
            <Card>
              <CardHeader><CardTitle>関連情報・パートナー</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {mountain.partners.map((p) => (
                  <a key={p.name} href={p.url} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <span>{p.type === 'hut' ? '🏠' : p.type === 'shop' ? '🏪' : '🧭'}</span>
                    <div>
                      <div className="font-medium text-slate-900">{p.name}</div>
                      <div className="text-xs text-slate-500">{p.type === 'hut' ? '山小屋' : p.type === 'shop' ? 'ショップ' : 'ガイド'}</div>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>
          )}

          {/* 登山記録ボタン */}
          <Link href={`/climbs/new?mountain=${id}`}>
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg transition-colors">
              この山の登山を記録する
            </button>
          </Link>
        </div>
      </main>
    </div>
  )
}

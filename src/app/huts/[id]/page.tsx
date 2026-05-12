import Navbar from '@/components/layout/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { getHutById } from '@/lib/huts'
import { getFacilitiesByMountain, facilityTypeEmoji, facilityTypeLabel } from '@/lib/facilities'
import {
  TrendingUp, Users, Phone, MapPin, Calendar, Clock,
  Home, Utensils, Coffee, ShoppingBag, Wine, Wifi,
  ExternalLink, ChevronLeft,
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const mountainNames: Record<string, string> = {
  mt_fuji: '富士山',
  mt_yari: '槍ヶ岳',
  mt_okuhotaka: '奥穂高岳',
  mt_kita: '北岳',
  mt_akadake: '赤岳',
  mt_takao: '高尾山',
  mt_kumotori: '雲取山',
}

const reservationLabels: Record<string, { label: string; color: string; bg: string }> = {
  required: { label: '予約必須', color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
  recommended: { label: '予約推奨', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  optional: { label: '予約任意', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
}

function MenuSection({ title, icon, items, price }: {
  title: string
  icon: React.ReactNode
  items: string[]
  price?: string
}) {
  if (items.length === 0) return null
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-semibold text-slate-800 text-base">{title}</h3>
        {price && (
          <span className="ml-auto text-sm font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            ¥{price}
          </span>
        )}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function HutDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const hut = getHutById(id)
  if (!hut) notFound()

  const nearbyFacilities = getFacilitiesByMountain(hut.mountainId)
  const res = reservationLabels[hut.reservation]
  const mountainName = mountainNames[hut.mountainId] ?? hut.mountainId
  const isYearRound = hut.openPeriod.includes('通年')

  return (
    <div className="min-h-screen bg-[#f0fdf4]">
      <Navbar />
      <main className="pt-20 pb-24 md:pb-8">
        {/* ヘッダー */}
        <div className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700 text-white">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <Link
              href="/huts"
              className="inline-flex items-center gap-1 text-emerald-200 hover:text-white text-sm mb-5 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              山小屋一覧に戻る
            </Link>

            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-white/20 text-white border-white/30 text-sm">🏔️ {mountainName}</Badge>
              {isYearRound ? (
                <Badge className="bg-emerald-400/80 text-white border-0 text-sm">🟢 通年営業</Badge>
              ) : (
                <Badge className="bg-amber-400/80 text-white border-0 text-sm">📅 {hut.openPeriod}</Badge>
              )}
            </div>

            <h1 className="text-3xl font-bold mb-2">{hut.name}</h1>
            <p className="text-emerald-100 mb-6">{hut.description}</p>

            {/* クイックスタット */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                <TrendingUp className="h-5 w-5 text-emerald-200 mx-auto mb-1" />
                <div className="text-xl font-bold">{hut.elevation.toLocaleString()}m</div>
                <div className="text-emerald-200 text-xs">標高</div>
              </div>
              {hut.capacity > 0 && (
                <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                  <Users className="h-5 w-5 text-emerald-200 mx-auto mb-1" />
                  <div className="text-xl font-bold">{hut.capacity}名</div>
                  <div className="text-emerald-200 text-xs">収容人数</div>
                </div>
              )}
              {hut.priceStay > 0 && (
                <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                  <Home className="h-5 w-5 text-emerald-200 mx-auto mb-1" />
                  <div className="text-xl font-bold">¥{hut.priceStay.toLocaleString()}</div>
                  <div className="text-emerald-200 text-xs">1泊2食</div>
                </div>
              )}
              <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                <Clock className="h-5 w-5 text-emerald-200 mx-auto mb-1" />
                <div className="text-xl font-bold">{hut.checkIn !== '-' ? hut.checkIn : '-'}</div>
                <div className="text-emerald-200 text-xs">チェックイン</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {/* タブ */}
          <Tabs defaultValue="info">
            <TabsList className="grid grid-cols-3 bg-white border border-slate-200 shadow-sm h-12">
              <TabsTrigger value="info" className="text-sm font-medium data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                📋 基本情報
              </TabsTrigger>
              <TabsTrigger value="menu" className="text-sm font-medium data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                🍽️ 食事メニュー
              </TabsTrigger>
              <TabsTrigger value="facilities" className="text-sm font-medium data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                🏠 設備・アクセス
              </TabsTrigger>
            </TabsList>

            {/* ── 基本情報タブ ── */}
            <TabsContent value="info" className="mt-4 space-y-4">
              <Card className="bg-white border-slate-100">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-emerald-500" />
                    営業情報
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-slate-500 text-sm">営業期間</span>
                    <span className="font-medium text-slate-800">{hut.openPeriod}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-slate-500 text-sm">営業日</span>
                    <span className="font-medium text-slate-800">{hut.openDays}</span>
                  </div>
                  {hut.checkIn !== '-' && (
                    <>
                      <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-slate-500 text-sm">チェックイン</span>
                        <span className="font-medium text-slate-800">{hut.checkIn}〜</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-500 text-sm">チェックアウト</span>
                        <span className="font-medium text-slate-800">〜{hut.checkOut}</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white border-slate-100">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Home className="h-4 w-4 text-emerald-500" />
                    料金
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {hut.priceStay > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-slate-500 text-sm">1泊2食</span>
                      <span className="font-bold text-emerald-700 text-lg">¥{hut.priceStay.toLocaleString()}</span>
                    </div>
                  )}
                  {hut.priceDinner > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-slate-500 text-sm">夕食のみ</span>
                      <span className="font-medium text-slate-800">¥{hut.priceDinner.toLocaleString()}</span>
                    </div>
                  )}
                  {hut.priceBreakfast > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-slate-500 text-sm">朝食のみ</span>
                      <span className="font-medium text-slate-800">¥{hut.priceBreakfast.toLocaleString()}</span>
                    </div>
                  )}
                  {hut.priceBento > 0 && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-500 text-sm">弁当</span>
                      <span className="font-medium text-slate-800">¥{hut.priceBento.toLocaleString()}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white border-slate-100">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Phone className="h-4 w-4 text-emerald-500" />
                    予約・連絡先
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className={`p-3 rounded-lg border ${res.bg} flex items-center justify-between`}>
                    <span className={`font-medium ${res.color}`}>予約状況</span>
                    <span className={`font-bold ${res.color}`}>{res.label}</span>
                  </div>
                  {hut.phone && (
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-slate-500 text-sm">電話番号</span>
                      <a href={`tel:${hut.phone}`} className="font-medium text-emerald-600 hover:underline">
                        {hut.phone}
                      </a>
                    </div>
                  )}
                  {hut.address && (
                    <div className="flex gap-2 py-2">
                      <MapPin className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm">{hut.address}</span>
                    </div>
                  )}
                  {hut.reservationUrl && (
                    <a
                      href={hut.reservationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      公式サイトで予約する
                    </a>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* ── 食事メニュータブ ── */}
            <TabsContent value="menu" className="mt-4">
              <Card className="bg-white border-slate-100">
                <CardContent className="pt-6 space-y-7">
                  <MenuSection
                    title="夕食メニュー"
                    icon={<Utensils className="h-5 w-5 text-amber-500" />}
                    items={hut.menu.dinner}
                    price={hut.priceDinner > 0 ? hut.priceDinner.toLocaleString() : undefined}
                  />
                  {hut.menu.dinner.length > 0 && hut.menu.breakfast.length > 0 && <Separator />}
                  <MenuSection
                    title="朝食メニュー"
                    icon={<Coffee className="h-5 w-5 text-amber-400" />}
                    items={hut.menu.breakfast}
                    price={hut.priceBreakfast > 0 ? hut.priceBreakfast.toLocaleString() : undefined}
                  />
                  {hut.menu.breakfast.length > 0 && hut.menu.lunch.length > 0 && <Separator />}
                  <MenuSection
                    title="昼食・売店メニュー"
                    icon={<ShoppingBag className="h-5 w-5 text-emerald-500" />}
                    items={hut.menu.lunch}
                  />
                  {hut.menu.lunch.length > 0 && hut.menu.snacks.length > 0 && <Separator />}
                  <MenuSection
                    title="軽食・おやつ"
                    icon={<ShoppingBag className="h-5 w-5 text-pink-400" />}
                    items={hut.menu.snacks}
                  />
                  {hut.menu.snacks.length > 0 && hut.menu.drinks.length > 0 && <Separator />}
                  <MenuSection
                    title="飲み物"
                    icon={<Wine className="h-5 w-5 text-purple-400" />}
                    items={hut.menu.drinks}
                  />

                  {hut.menu.dinner.length === 0 &&
                    hut.menu.breakfast.length === 0 &&
                    hut.menu.lunch.length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      <Utensils className="h-10 w-10 mx-auto mb-2 opacity-30" />
                      <p>食事情報は準備中です</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* ── 設備タブ ── */}
            <TabsContent value="facilities" className="mt-4 space-y-4">
              <Card className="bg-white border-slate-100">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-emerald-500" />
                    設備・サービス
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {hut.facilities.length > 0 ? (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {hut.facilities.map((f) => (
                        <div key={f} className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2.5 text-sm text-slate-700">
                          <span className="text-emerald-400">✓</span>
                          {f}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 text-sm">設備情報は準備中です</p>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white border-slate-100">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-emerald-500" />
                    場所・アクセス
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-slate-500 text-sm">山名</span>
                    <span className="font-medium text-slate-800">{mountainName}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-slate-500 text-sm">標高</span>
                    <span className="font-medium text-slate-800">{hut.elevation.toLocaleString()}m</span>
                  </div>
                  {hut.address && (
                    <div className="flex gap-2 py-2">
                      <MapPin className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm">{hut.address}</span>
                    </div>
                  )}
                  <a
                    href={`https://maps.google.com/?q=${hut.lat},${hut.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full border border-emerald-300 text-emerald-700 hover:bg-emerald-50 py-3 rounded-lg font-medium transition-colors text-sm"
                  >
                    <MapPin className="h-4 w-4" />
                    Googleマップで見る
                  </a>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* 近隣施設 */}
          {nearbyFacilities.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                ♨️ 近隣のおすすめ施設・温泉
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {nearbyFacilities.map((facility) => (
                  <Card key={facility.id} className="bg-white border-slate-100 hover:shadow-sm transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl flex-shrink-0 mt-0.5">
                          {facilityTypeEmoji[facility.type]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-slate-900 text-sm leading-snug">{facility.name}</h3>
                          </div>
                          <Badge className="bg-slate-100 text-slate-600 border-0 text-xs mb-2">
                            {facilityTypeLabel[facility.type]}
                          </Badge>
                          {facility.price && (
                            <div className="text-emerald-700 font-medium text-sm mb-1">💴 {facility.price}</div>
                          )}
                          <div className="text-slate-500 text-xs space-y-0.5">
                            <div>🕐 {facility.hours}</div>
                            <div>🚫 定休: {facility.closedDays}</div>
                            <div>📍 {facility.distance}</div>
                          </div>
                          {facility.features.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {facility.features.slice(0, 3).map((feat) => (
                                <span key={feat} className="text-xs bg-slate-50 text-slate-600 px-2 py-0.5 rounded-full border border-slate-100">
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
                              className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:underline mt-2"
                            >
                              <ExternalLink className="h-3 w-3" />
                              公式サイト
                            </a>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* CTAボタン */}
          <Link href={`/climbs/new?mountain=${hut.mountainId}`}>
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg transition-colors">
              {mountainName}の登山を記録する
            </button>
          </Link>
        </div>
      </main>
    </div>
  )
}

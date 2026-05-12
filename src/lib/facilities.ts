export interface NearbyFacility {
  id: string
  mountainId: string
  name: string
  type: 'onsen' | 'restaurant' | 'parking' | 'station' | 'shop' | 'campsite'
  address: string
  phone?: string
  hours: string
  closedDays: string
  price?: string
  description: string
  distance: string
  features: string[]
  lat?: number
  lng?: number
  url?: string
}

export const facilities: NearbyFacility[] = [
  // ── 富士山 ──────────────────────────────────
  {
    id: 'fuji_onsen_sensui',
    mountainId: 'mt_fuji',
    name: '富士山天然温泉 富士山溶岩の湯 泉水',
    type: 'onsen',
    address: '山梨県富士吉田市上吉田5235-1',
    phone: '0555-22-1126',
    hours: '10:00〜23:00（最終受付22:30）',
    closedDays: '木曜日（祝日の場合は翌日）',
    price: '大人900円・子ども450円',
    description: '富士山溶岩を使用した天然温泉。登山後の疲れをしっかり癒せる露天風呂とサウナが自慢。富士山を眺めながら入浴できる絶景の湯。',
    distance: '富士吉田口登山口から車で約15分',
    features: ['露天風呂', 'サウナ', '内湯', 'タオル販売', '食事処'],
    lat: 35.4877,
    lng: 138.7870,
    url: 'https://fujisan-onsen.com',
  },
  {
    id: 'fuji_michinoeki',
    mountainId: 'mt_fuji',
    name: '道の駅 富士吉田',
    type: 'shop',
    address: '山梨県富士吉田市新屋1936-6',
    phone: '0555-21-1225',
    hours: '8:00〜17:00',
    closedDays: '無休',
    description: '富士山麓の特産品が揃う道の駅。地元産の野菜・加工品・お土産が豊富。吉田のうどんも食べられる。',
    distance: '富士吉田口登山口から車で約10分',
    features: ['地場野菜', '土産物', '吉田うどん', '無料駐車場'],
    lat: 35.4908,
    lng: 138.7869,
  },
  {
    id: 'fuji_udon_sakurai',
    mountainId: 'mt_fuji',
    name: '吉田のうどん 桜井うどん',
    type: 'restaurant',
    address: '山梨県富士吉田市下吉田6-21-12',
    phone: '0555-22-5033',
    hours: '11:00〜14:00（売切れ次第終了）',
    closedDays: '水・木曜日',
    price: '1杯350円〜',
    description: '富士吉田名物「吉田のうどん」の名店。コシが強くもちもちの麺に甘辛の馬肉・キャベツのトッピングが特徴のB級グルメ。',
    distance: '富士吉田口登山口から車で約15分',
    features: ['吉田のうどん', '馬肉トッピング', '地元民に人気', '安い'],
    lat: 35.4784,
    lng: 138.7855,
  },

  // ── 槍ヶ岳 ──────────────────────────────────
  {
    id: 'yari_kamikochi_onsen',
    mountainId: 'mt_yari',
    name: '上高地温泉ホテル',
    type: 'onsen',
    address: '長野県松本市安曇上高地4469',
    phone: '0263-95-2311',
    hours: '11:00〜15:00（日帰り入浴）',
    closedDays: '不定休（要確認）',
    price: '大人1,000円',
    description: '上高地に立つリゾートホテル。梓川と北アルプスを望む絶好のロケーション。登山後の日帰り入浴も受付。',
    distance: '上高地バスターミナルから徒歩約15分',
    features: ['日帰り入浴可', '露天風呂', '絶景', '食事処'],
    lat: 36.2399,
    lng: 137.6271,
    url: 'https://www.kamikochihotels.com',
  },
  {
    id: 'yari_sawando_onsen',
    mountainId: 'mt_yari',
    name: '沢渡温泉 梓湖畔の湯',
    type: 'onsen',
    address: '長野県松本市安曇沢渡4181-1',
    phone: '0263-93-2380',
    hours: '9:00〜21:00（最終受付20:30）',
    closedDays: '無休',
    price: '大人700円・子ども350円',
    description: '上高地の入口・沢渡地区にある日帰り温泉。登山帰りに立ち寄りやすく地元の人にも人気。シンプルで清潔な湯。',
    distance: '沢渡駐車場から徒歩約5分',
    features: ['露天風呂', '内湯', 'コインロッカー', '登山者に人気'],
    lat: 36.2191,
    lng: 137.6478,
  },
  {
    id: 'yari_bus_terminal',
    mountainId: 'mt_yari',
    name: '上高地バスターミナル',
    type: 'station',
    address: '長野県松本市安曇上高地',
    phone: '0263-95-2405',
    hours: '始発便〜最終便',
    closedDays: '閉山期間（11月中旬〜4月中旬）は閉鎖',
    description: '上高地の玄関口。松本・沢渡方面へのバスが発着。コインロッカー・売店・案内所完備。',
    distance: '上高地入口（河童橋の近く）',
    features: ['バス乗り場', 'コインロッカー', '売店', '案内所', 'トイレ'],
    lat: 36.2390,
    lng: 137.6194,
  },
  {
    id: 'yari_sawando_parking',
    mountainId: 'mt_yari',
    name: '沢渡駐車場',
    type: 'parking',
    address: '長野県松本市安曇沢渡',
    hours: '24時間',
    closedDays: '無休',
    price: '700円/日（普通車）',
    description: '上高地への入口となる駐車場。マイカー規制のため、ここに駐車してシャトルバスや乗合タクシーで上高地へ。',
    distance: '上高地バスターミナルからバスで約30分',
    features: ['24時間利用可', 'シャトルバス乗り場', '無料トイレ', '複数駐車場あり'],
    lat: 36.2177,
    lng: 137.6488,
  },

  // ── 高尾山 ──────────────────────────────────
  {
    id: 'takao_gokurakuyu',
    mountainId: 'mt_takao',
    name: '高尾山温泉 極楽湯',
    type: 'onsen',
    address: '東京都八王子市高尾町2229-7',
    phone: '042-663-4126',
    hours: '8:00〜23:00（最終受付22:30）',
    closedDays: '無休',
    price: '大人1,000円・子ども700円（平日）/ 大人1,200円・子ども700円（土日祝）',
    description: '高尾山口駅から徒歩1分の好立地。露天風呂・炭酸泉・サウナが揃い、登山後に最高のリラックスタイムを提供。食事処も充実。',
    distance: '高尾山口駅から徒歩1分',
    features: ['露天風呂', '炭酸泉', 'サウナ', '食事処', 'アカスリ', 'マッサージ'],
    lat: 35.6307,
    lng: 139.2683,
    url: 'https://www.gokurakuyu.ne.jp/tempo/takaosan',
  },
  {
    id: 'takao_ukai',
    mountainId: 'mt_takao',
    name: '高尾山口 手打ちそば うかい竹亭',
    type: 'restaurant',
    address: '東京都八王子市高尾町2844',
    phone: '042-661-0012',
    hours: '11:00〜19:00（L.O.18:00）',
    closedDays: '水曜日（祝日の場合は翌日）',
    price: '1,500円〜（コース料理3,000円〜）',
    description: '高尾山名物の天ぷらそばが味わえる老舗名店。竹林の中の静かな和風庭園で食事ができる贅沢な空間。手打ちそばは絶品。',
    distance: '高尾山口駅から徒歩約3分',
    features: ['手打ちそば', '天ぷら', '和風庭園', '個室あり', '要予約（週末）'],
    lat: 35.6311,
    lng: 139.2625,
    url: 'https://www.ukai.co.jp/takaosan',
  },

  // ── 赤岳（八ヶ岳） ──────────────────────────────────
  {
    id: 'akadake_momi_onsen',
    mountainId: 'mt_akadake',
    name: 'もみの湯',
    type: 'onsen',
    address: '山梨県北杜市高根町清里3545',
    phone: '0551-45-2681',
    hours: '10:00〜21:00（最終受付20:30）',
    closedDays: '水曜日（祝日の場合は翌日）',
    price: '大人700円・子ども400円',
    description: '清里高原に佇む日帰り温泉。八ヶ岳の自然に囲まれたシンプルで落ち着いた湯。アルカリ性の湯は肌がつるつるになると評判。',
    distance: '美濃戸口登山口から車で約20分',
    features: ['露天風呂', '内湯', '休憩室', '登山者利用多い', '清潔'],
    lat: 35.8989,
    lng: 138.3940,
  },
  {
    id: 'akadake_kiyosato',
    mountainId: 'mt_akadake',
    name: '清里清泉寮',
    type: 'restaurant',
    address: '山梨県北杜市高根町清里3545',
    phone: '0551-48-2111',
    hours: '10:00〜17:00（売店・カフェ）',
    closedDays: '無休',
    price: 'ソフトクリーム500円〜',
    description: '清里を代表するリゾート施設。名物のジャージー牛乳ソフトクリームは濃厚で絶品。八ヶ岳を望む高台のテラスでいただける。',
    distance: '美濃戸口登山口から車で約25分',
    features: ['ジャージー牛乳ソフトクリーム', '八ヶ岳の絶景', 'カフェ', 'お土産', '宿泊可能'],
    lat: 35.9112,
    lng: 138.4032,
    url: 'https://www.seisenryo.jp',
  },
]

export function getFacilitiesByMountain(mountainId: string): NearbyFacility[] {
  return facilities.filter((f) => f.mountainId === mountainId)
}

export const facilityTypeLabel: Record<NearbyFacility['type'], string> = {
  onsen: '温泉',
  restaurant: '飲食',
  parking: '駐車場',
  station: '交通',
  shop: 'ショップ',
  campsite: 'キャンプ場',
}

export const facilityTypeEmoji: Record<NearbyFacility['type'], string> = {
  onsen: '♨️',
  restaurant: '🍜',
  parking: '🅿️',
  station: '🚌',
  shop: '🛍️',
  campsite: '⛺',
}

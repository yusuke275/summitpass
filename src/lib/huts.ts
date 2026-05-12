export interface MountainHut {
  id: string
  name: string
  mountainId: string
  elevation: number
  capacity: number
  phone: string
  address: string
  openPeriod: string
  openDays: string
  checkIn: string
  checkOut: string
  priceStay: number
  priceDinner: number
  priceBreakfast: number
  priceBento: number
  menu: {
    dinner: string[]
    breakfast: string[]
    lunch: string[]
    snacks: string[]
    drinks: string[]
  }
  facilities: string[]
  reservation: 'required' | 'recommended' | 'optional'
  reservationUrl?: string
  lat: number
  lng: number
  description: string
}

export const huts: MountainHut[] = [
  {
    id: 'fuji_chojo',
    name: '富士山頂上富士館',
    mountainId: 'mt_fuji',
    elevation: 3720,
    capacity: 150,
    phone: '0555-22-1948',
    address: '山梨県南都留郡富士河口湖町富士山頂上',
    openPeriod: '7月上旬〜8月下旬',
    openDays: '期間中無休',
    checkIn: '13:00',
    checkOut: '6:00',
    priceStay: 12000,
    priceDinner: 1500,
    priceBreakfast: 1200,
    priceBento: 1000,
    menu: {
      dinner: ['カレーライス', '豚汁定食', 'きのこ汁定食'],
      breakfast: ['ご飯セット（味噌汁・漬物付き）', '卵かけご飯セット'],
      lunch: ['カップラーメン', 'おにぎり（梅・昆布・鮭）', '山菜おこわ'],
      snacks: ['チョコレートバー', 'エネルギーゼリー', '羊羹', '金剛杖（記念品）'],
      drinks: ['お茶', 'コーヒー', 'コーラ', '日本酒', '富士山焼酎', 'スポーツドリンク'],
    },
    facilities: ['トイレ（有料）', '売店', '休憩室', '宿泊設備', '救護室'],
    reservation: 'required',
    reservationUrl: 'https://www.fujisan-climb.jp',
    lat: 35.3606,
    lng: 138.7274,
    description: '富士山最高峰・剣ヶ峰直下に位置する山小屋。御来光を望む絶景スポットとして有名。混雑期は早めの予約が必須。',
  },
  {
    id: 'fuji_gogome',
    name: '富士山五合目レストハウス',
    mountainId: 'mt_fuji',
    elevation: 2305,
    capacity: 300,
    phone: '0555-72-1223',
    address: '山梨県南都留郡富士河口湖町富士山吉田口五合目',
    openPeriod: '通年（冬季一部休業）',
    openDays: '期間中無休（冬季休業あり）',
    checkIn: '-',
    checkOut: '-',
    priceStay: 0,
    priceDinner: 0,
    priceBreakfast: 0,
    priceBento: 900,
    menu: {
      dinner: [],
      breakfast: [],
      lunch: ['富士宮やきそば', 'カレーライス', 'ほうとう', 'うどん'],
      snacks: ['ソフトクリーム（富士山ソフト）', 'お土産菓子', 'おにぎり'],
      drinks: ['コーヒー', 'ジュース', '富士山天然水', 'お茶'],
    },
    facilities: ['トイレ（無料）', '売店・土産店', '観光案内所', '駐車場', '休憩所'],
    reservation: 'optional',
    lat: 35.3800,
    lng: 138.7279,
    description: '富士山登山の出発地点。観光客・登山者双方が利用するレストハウス。富士宮やきそばと富士山ソフトクリームが名物。',
  },
  {
    id: 'yari_sanso',
    name: '槍ヶ岳山荘',
    mountainId: 'mt_yari',
    elevation: 3080,
    capacity: 500,
    phone: '0263-35-7200',
    address: '長野県松本市安曇槍ヶ岳',
    openPeriod: '7月上旬〜10月中旬',
    openDays: '期間中無休',
    checkIn: '14:00',
    checkOut: '6:00',
    priceStay: 13500,
    priceDinner: 2000,
    priceBreakfast: 1500,
    priceBento: 1200,
    menu: {
      dinner: ['ハンバーグ定食', '山菜そば', 'カレーライス（特製スパイスカレー）', 'チキンソテー定食'],
      breakfast: ['ご飯・味噌汁・焼き魚・漬物', '和定食（小鉢3品付き）'],
      lunch: ['カレーライス', 'ラーメン', 'うどん', 'そば'],
      snacks: ['カップ麺', 'チョコレート', '串団子', 'おでん（秋季）'],
      drinks: ['ビール（生・缶）', 'ジュース', 'コーヒー', '日本酒', 'スポーツドリンク'],
    },
    facilities: ['トイレ（有料）', '売店', '手ぬぐい・Tシャツ販売', '充電サービス（有料）', '宿泊設備（2段ベッド）'],
    reservation: 'required',
    reservationUrl: 'https://www.yarigatake.co.jp',
    lat: 36.3417,
    lng: 137.6469,
    description: '槍ヶ岳山頂直下（標高3080m）の大型山荘。北アルプスを代表する山小屋で、設備が充実。夏季は大変混雑するため予約必須。',
  },
  {
    id: 'hotaka_sanso',
    name: '穂高岳山荘',
    mountainId: 'mt_okuhotaka',
    elevation: 2996,
    capacity: 300,
    phone: '090-7869-0045',
    address: '長野県松本市安曇奥穂高岳',
    openPeriod: '7月中旬〜10月中旬',
    openDays: '期間中無休',
    checkIn: '14:00',
    checkOut: '6:00',
    priceStay: 14000,
    priceDinner: 2200,
    priceBreakfast: 1600,
    priceBento: 1300,
    menu: {
      dinner: ['チキンカレー（自家製スパイス）', '豚の生姜焼き定食', '山菜そば', 'ビーフシチュー（週末限定）'],
      breakfast: ['和定食（焼き魚・味噌汁・漬物・ご飯）', '卵焼き定食'],
      lunch: ['カレーライス', 'うどん', 'カップラーメン', 'おにぎり'],
      snacks: ['チョコレート', 'あんぱん', 'エネルギーバー'],
      drinks: ['ビール', 'コーヒー', 'ジュース', '日本酒', 'ホットレモン'],
    },
    facilities: ['トイレ（有料）', '売店', 'シャワー（有料・5分）', '乾燥室', '宿泊設備', 'ヘリポート'],
    reservation: 'required',
    reservationUrl: 'https://www.hotakadake-sanso.com',
    lat: 36.2858,
    lng: 137.6491,
    description: '奥穂高岳山頂直下に立つ名山荘。シャワーが使える数少ない3000m級山小屋のひとつ。穂高岳登頂の拠点として人気。',
  },
  {
    id: 'kitadake_kata',
    name: '北岳肩ノ小屋',
    mountainId: 'mt_kita',
    elevation: 3000,
    capacity: 100,
    phone: '055-285-1944',
    address: '山梨県南アルプス市芦安芦倉北岳',
    openPeriod: '7月上旬〜9月下旬',
    openDays: '期間中無休',
    checkIn: '14:00',
    checkOut: '6:00',
    priceStay: 13000,
    priceDinner: 1800,
    priceBreakfast: 1400,
    priceBento: 1100,
    menu: {
      dinner: ['カレーライス', '山菜定食', '豚汁定食'],
      breakfast: ['和定食', 'みそ汁・ご飯セット'],
      lunch: ['カップラーメン', 'おにぎり', 'パン'],
      snacks: ['チョコ', '羊羹', 'クッキー'],
      drinks: ['お茶', 'コーヒー', 'ジュース', 'ビール'],
    },
    facilities: ['トイレ（有料）', '売店', '休憩スペース', '宿泊設備'],
    reservation: 'recommended',
    lat: 35.6747,
    lng: 138.2381,
    description: '日本第2位の高峰・北岳の山頂直下3000mに位置する山小屋。南アルプスの大自然に囲まれた静かな山荘。',
  },
  {
    id: 'akadake_tenboso',
    name: '赤岳展望荘',
    mountainId: 'mt_akadake',
    elevation: 2720,
    capacity: 120,
    phone: '0266-74-2734',
    address: '長野県茅野市金沢赤岳',
    openPeriod: '通年営業',
    openDays: '無休（冬季要確認）',
    checkIn: '14:00',
    checkOut: '7:00',
    priceStay: 12000,
    priceDinner: 2000,
    priceBreakfast: 1500,
    priceBento: 1200,
    menu: {
      dinner: ['信州牛のすき焼き（特製）', '山賊焼き（信州名物鶏の唐揚げ）', '山菜定食', 'きのこ鍋（冬季）'],
      breakfast: ['和定食（焼き魚・のり・玉子焼き）', '洋定食（パン・スープ・サラダ）'],
      lunch: ['カレーライス', 'うどん・そば', 'カップラーメン', 'おにぎり'],
      snacks: ['ソフトドリンク', 'チョコ', 'クッキー', '信州みそ汁（温まる）'],
      drinks: ['ビール（八ヶ岳ラガー）', 'ワイン（信州産）', 'コーヒー', 'お茶', '甘酒'],
    },
    facilities: ['トイレ（有料）', '売店', '展望テラス', '暖房完備の食堂', '宿泊設備（個室あり）', 'シャワー（有料・夏季のみ）'],
    reservation: 'recommended',
    reservationUrl: 'https://www.akadake.com',
    lat: 35.9692,
    lng: 138.3706,
    description: '八ヶ岳主峰・赤岳直下の通年営業山荘。信州牛すき焼きと山賊焼きが人気の食事、展望テラスからは南北アルプスを一望できる。',
  },
  {
    id: 'takao_yakuoin',
    name: '高尾山薬王院宿坊',
    mountainId: 'mt_takao',
    elevation: 500,
    capacity: 80,
    phone: '042-661-1115',
    address: '東京都八王子市高尾町2177',
    openPeriod: '通年営業',
    openDays: '無休',
    checkIn: '15:00',
    checkOut: '10:00',
    priceStay: 15000,
    priceDinner: 3500,
    priceBreakfast: 2000,
    priceBento: 1500,
    menu: {
      dinner: ['精進料理フルコース（旬の野菜・豆腐・山菜を使った本格精進料理）', '天ぷら精進膳', '懐石風精進料理'],
      breakfast: ['精進料理朝食（ご飯・味噌汁・おひたし・漬物・豆腐）', 'お粥と精進おかず'],
      lunch: ['とろろそば（名物）', '精進うどん', '天ぷらそば'],
      snacks: ['天狗焼き（小豆入り大判焼き）', '高尾山サブレ', 'まんじゅう'],
      drinks: ['抹茶', 'ほうじ茶', 'コーヒー', '甘酒'],
    },
    facilities: ['トイレ（清潔・無料）', '大浴場', '売店・お守り', '御護摩体験', '駐車場（参拝者用）', '法話・朝の勤行体験'],
    reservation: 'required',
    reservationUrl: 'https://www.takaosan.or.jp',
    lat: 35.6256,
    lng: 139.2438,
    description: '薬王院の宿坊として1200年以上の歴史を誇る。精進料理と御護摩体験が名物。都心から最も近い本格的な山寺体験ができる。',
  },
  {
    id: 'kumotori_sanso',
    name: '雲取山荘',
    mountainId: 'mt_kumotori',
    elevation: 1830,
    capacity: 100,
    phone: '090-8815-1597',
    address: '東京都西多摩郡奥多摩町日原雲取山',
    openPeriod: '通年営業',
    openDays: '無休',
    checkIn: '14:00',
    checkOut: '7:00',
    priceStay: 11000,
    priceDinner: 1600,
    priceBreakfast: 1200,
    priceBento: 1000,
    menu: {
      dinner: ['山菜定食', 'カレーライス', '鍋定食（冬季）', 'きのこ汁定食'],
      breakfast: ['和定食（味噌汁・漬物・のり）', 'ご飯とみそ汁'],
      lunch: ['カップラーメン', 'おにぎり', 'パン類'],
      snacks: ['チョコ', 'クッキー', '飴'],
      drinks: ['お茶', 'コーヒー', 'ビール', '日本酒'],
    },
    facilities: ['トイレ（有料）', '売店', '乾燥室', '宿泊設備（毛布・枕付き）'],
    reservation: 'recommended',
    lat: 35.8573,
    lng: 138.9454,
    description: '東京都の最高峰・雲取山の山頂近くに建つ通年営業の山荘。東京・埼玉・山梨の3都県境に位置し、奥多摩縦走の拠点として人気。',
  },
]

export function getHutsByMountain(mountainId: string): MountainHut[] {
  return huts.filter((h) => h.mountainId === mountainId)
}

export function getHutById(id: string): MountainHut | undefined {
  return huts.find((h) => h.id === id)
}

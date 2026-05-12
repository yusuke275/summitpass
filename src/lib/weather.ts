export interface WeatherInfo {
  temperature: number
  windspeed: number
  weathercode: number
  description: string
  icon: string
  dangerLevel: 'safe' | 'caution' | 'danger'
  dangerReason: string
}

const WEATHER_CODES: Record<number, { description: string; icon: string }> = {
  0: { description: '快晴', icon: '☀️' },
  1: { description: 'おおむね晴れ', icon: '🌤️' },
  2: { description: '一部曇り', icon: '⛅' },
  3: { description: '曇り', icon: '☁️' },
  45: { description: '霧', icon: '🌫️' },
  48: { description: '着氷性の霧', icon: '🌫️' },
  51: { description: '小雨', icon: '🌦️' },
  53: { description: '雨', icon: '🌧️' },
  55: { description: '強雨', icon: '🌧️' },
  61: { description: '小雨', icon: '🌦️' },
  63: { description: '雨', icon: '🌧️' },
  65: { description: '強雨', icon: '🌧️' },
  71: { description: '小雪', icon: '🌨️' },
  73: { description: '雪', icon: '❄️' },
  75: { description: '大雪', icon: '❄️' },
  80: { description: 'にわか雨', icon: '🌦️' },
  81: { description: '雨', icon: '🌧️' },
  82: { description: '強雨', icon: '⛈️' },
  95: { description: '雷雨', icon: '⛈️' },
  96: { description: '雷を伴う強雨', icon: '⛈️' },
  99: { description: '激しい雷雨', icon: '⛈️' },
}

export async function fetchMountainWeather(lat: number, lon: number): Promise<WeatherInfo | null> {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,windspeed_10m,weathercode,is_day&timezone=Asia/Tokyo`
    )
    if (!res.ok) return null
    const json = await res.json()
    const current = json.current

    const weatherCode = current.weathercode
    const windspeed = current.windspeed_10m
    const temperature = current.temperature_2m
    const info = WEATHER_CODES[weatherCode] ?? { description: '不明', icon: '❓' }

    let dangerLevel: WeatherInfo['dangerLevel'] = 'safe'
    let dangerReason = ''

    if (weatherCode >= 95 || windspeed > 50) {
      dangerLevel = 'danger'
      dangerReason = weatherCode >= 95 ? '雷雨のため登山は非常に危険です' : '強風のため稜線は危険です'
    } else if (weatherCode >= 61 || windspeed > 30 || temperature < 0) {
      dangerLevel = 'caution'
      dangerReason = weatherCode >= 61 ? '雨天のため滑落に注意' : windspeed > 30 ? '強風に注意' : '低温に注意、防寒対策を'
    }

    return { temperature, windspeed, weathercode: weatherCode, description: info.description, icon: info.icon, dangerLevel, dangerReason }
  } catch {
    return null
  }
}

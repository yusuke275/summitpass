export type Plan = 'free' | 'premium'
export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert'
export type Condition = 'excellent' | 'good' | 'fair' | 'poor'
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary'
export type PartnerType = 'hut' | 'shop' | 'guide'

export interface User {
  id: string
  clerk_id: string
  username: string
  display_name: string
  bio: string
  avatar_url: string
  plan: Plan
  stripe_customer_id?: string
  stripe_subscription_id?: string
  total_mountains: number
  total_elevation: number
  created_at: string
  updated_at: string
}

export interface Mountain {
  id: string
  name: string
  name_kana: string
  elevation: number
  prefecture: string
  region: string
  latitude: number
  longitude: number
  category: string
  difficulty: Difficulty
  description: string
  image_url: string
  created_at: string
  climbed?: boolean
}

export interface Climb {
  id: string
  user_id: string
  mountain_id: string
  mountain?: Mountain
  user?: User
  climbed_at: string
  duration_minutes?: number
  distance_km?: number
  elevation_gain?: number
  weather: string
  condition: Condition
  notes: string
  ai_report: string
  gpx_url: string
  is_public: number
  photos?: ClimbPhoto[]
  likes_count?: number
  comments_count?: number
  user_liked?: boolean
  created_at: string
}

export interface ClimbPhoto {
  id: string
  climb_id: string
  user_id: string
  url: string
  caption: string
  ai_identified_mountain: string
  taken_at?: string
  created_at: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  condition_type: string
  condition_value: string
  rarity: Rarity
  earned?: boolean
  earned_at?: string
}

export interface Follow {
  follower_id: string
  following_id: string
  created_at: string
}

export interface Comment {
  id: string
  climb_id: string
  user_id: string
  user?: User
  content: string
  created_at: string
}

export interface Partner {
  id: string
  name: string
  type: PartnerType
  description: string
  url: string
  mountain_id?: string
  mountain?: Mountain
  image_url: string
  commission_rate: number
  created_at: string
}

export interface WeatherData {
  temperature: number
  windspeed: number
  weathercode: number
  is_day: number
}

export interface ApiResponse<T> {
  data?: T
  error?: string
}

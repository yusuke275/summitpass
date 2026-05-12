import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db, generateId } from '@/lib/db'

// ログインユーザーの登山記録一覧を取得
export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await db.queryOne<{ id: string }>('SELECT id FROM users WHERE clerk_id = ?', [userId])
  if (!user) return NextResponse.json({ climbs: [] })

  const climbs = await db.query(
    `SELECT c.*, m.name as mountain_name, m.elevation, m.prefecture, m.category
     FROM climbs c
     JOIN mountains m ON c.mountain_id = m.id
     WHERE c.user_id = ?
     ORDER BY c.climbed_at DESC`,
    [user.id]
  )

  return NextResponse.json({ climbs })
}

// 新しい登山記録を保存
export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await db.queryOne<{ id: string }>('SELECT id FROM users WHERE clerk_id = ?', [userId])
  if (!user) return NextResponse.json({ error: 'User not found. Please sync first.' }, { status: 404 })

  const body = await req.json()
  const { mountain_id, climbed_at, duration_minutes, distance_km, elevation_gain, weather, condition, notes, ai_report } = body

  if (!mountain_id || !climbed_at) {
    return NextResponse.json({ error: 'mountain_id and climbed_at are required' }, { status: 400 })
  }

  const id = generateId()
  await db.run(
    `INSERT INTO climbs (id, user_id, mountain_id, climbed_at, duration_minutes, distance_km, elevation_gain, weather, condition, notes, ai_report)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, user.id, mountain_id, climbed_at, duration_minutes ?? null, distance_km ?? null, elevation_gain ?? null, weather ?? '', condition ?? 'good', notes ?? '', ai_report ?? '']
  )

  // ユーザーの統計を更新
  await db.run(
    `UPDATE users SET
       total_mountains = (SELECT COUNT(DISTINCT mountain_id) FROM climbs WHERE user_id = ?),
       total_elevation = (SELECT COALESCE(SUM(elevation_gain), 0) FROM climbs WHERE user_id = ?),
       updated_at = datetime('now')
     WHERE id = ?`,
    [user.id, user.id, user.id]
  )

  const climb = await db.queryOne('SELECT * FROM climbs WHERE id = ?', [id])
  return NextResponse.json({ climb }, { status: 201 })
}

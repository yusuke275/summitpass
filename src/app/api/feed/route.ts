import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = 20
  const offset = (page - 1) * limit

  const items = await db.query(
    `SELECT
       c.id, c.climbed_at, c.condition, c.notes, c.ai_report, c.duration_minutes, c.distance_km,
       u.id as user_id, u.display_name, u.username, u.avatar_url,
       m.id as mountain_id, m.name as mountain_name, m.elevation, m.prefecture, m.category,
       (SELECT COUNT(*) FROM likes WHERE climb_id = c.id) as like_count,
       (SELECT COUNT(*) FROM comments WHERE climb_id = c.id) as comment_count
     FROM climbs c
     JOIN users u ON c.user_id = u.id
     JOIN mountains m ON c.mountain_id = m.id
     WHERE c.is_public = 1
     ORDER BY c.climbed_at DESC
     LIMIT ? OFFSET ?`,
    [limit, offset]
  )

  return NextResponse.json({ items, page, hasMore: items.length === limit })
}

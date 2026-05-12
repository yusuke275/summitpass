import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await db.queryOne<{ id: string; plan: string; total_mountains: number; total_elevation: number }>(
    'SELECT * FROM users WHERE clerk_id = ?',
    [userId]
  )
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const recentClimbs = await db.query(
    `SELECT c.*, m.name as mountain_name, m.elevation, m.prefecture, m.category
     FROM climbs c
     JOIN mountains m ON c.mountain_id = m.id
     WHERE c.user_id = ?
     ORDER BY c.climbed_at DESC
     LIMIT 10`,
    [user.id]
  )

  const hyakumeiCount = await db.queryOne<{ count: number }>(
    `SELECT COUNT(DISTINCT c.mountain_id) as count
     FROM climbs c
     JOIN mountains m ON c.mountain_id = m.id
     WHERE c.user_id = ? AND m.category = 'hyakumei'`,
    [user.id]
  )

  const earnedBadges = await db.query(
    `SELECT b.*, ub.earned_at
     FROM user_badges ub
     JOIN badges b ON ub.badge_id = b.id
     WHERE ub.user_id = ?
     ORDER BY ub.earned_at DESC`,
    [user.id]
  )

  return NextResponse.json({
    user,
    recentClimbs,
    hyakumeiCount: hyakumeiCount?.count ?? 0,
    earnedBadges,
  })
}

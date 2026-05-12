import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db, generateId } from '@/lib/db'

// ClerkでサインインしたユーザーをDBに同期する
export async function POST() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const clerkUser = await currentUser()
  if (!clerkUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const displayName =
    `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim() ||
    clerkUser.username ||
    'ユーザー'

  const username =
    clerkUser.username ||
    clerkUser.emailAddresses[0]?.emailAddress?.split('@')[0] ||
    `user_${userId.slice(-8)}`

  const existing = await db.queryOne('SELECT id FROM users WHERE clerk_id = ?', [userId])

  if (!existing) {
    await db.run(
      `INSERT INTO users (id, clerk_id, username, display_name, avatar_url)
       VALUES (?, ?, ?, ?, ?)`,
      [generateId(), userId, username, displayName, clerkUser.imageUrl ?? '']
    )
  }

  const user = await db.queryOne('SELECT * FROM users WHERE clerk_id = ?', [userId])
  return NextResponse.json({ user })
}

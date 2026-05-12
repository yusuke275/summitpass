import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const region = searchParams.get('region')
  const difficulty = searchParams.get('difficulty')
  const q = searchParams.get('q')

  let sql = 'SELECT * FROM mountains WHERE 1=1'
  const params: unknown[] = []

  if (region) {
    sql += ' AND region = ?'
    params.push(region)
  }
  if (difficulty) {
    sql += ' AND difficulty = ?'
    params.push(difficulty)
  }
  if (q) {
    sql += ' AND (name LIKE ? OR name_kana LIKE ? OR prefecture LIKE ?)'
    params.push(`%${q}%`, `%${q}%`, `%${q}%`)
  }

  sql += ' ORDER BY elevation DESC'

  const mountains = await db.query(sql, params)
  return NextResponse.json({ mountains })
}

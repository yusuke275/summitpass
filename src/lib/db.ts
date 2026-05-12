import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

// ? プレースホルダーを $1,$2... に変換（SQLite→PostgreSQL）
function convertPlaceholders(sql: string): string {
  let i = 0
  return sql.replace(/\?/g, () => `$${++i}`)
}

// Neon（PostgreSQL）実装
class NeonDB {
  private sql: NeonQueryFunction<false, false>

  constructor(url: string) {
    this.sql = neon(url)
  }

  async query<T = Record<string, unknown>>(sql: string, params: unknown[] = []): Promise<T[]> {
    const pgSql = convertPlaceholders(sql)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rows = await (this.sql as any)(pgSql, params)
    return rows as T[]
  }

  async queryOne<T = Record<string, unknown>>(sql: string, params: unknown[] = []): Promise<T | null> {
    const rows = await this.query<T>(sql, params)
    return rows[0] ?? null
  }

  async run(sql: string, params: unknown[] = []): Promise<{ lastInsertRowid: number | bigint; changes: number }> {
    const pgSql = convertPlaceholders(sql)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (this.sql as any)(pgSql, params)
    return { lastInsertRowid: 0, changes: 1 }
  }
}

// SQLite（ローカル開発）実装
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _localDb: any = null

async function getLocalDB() {
  if (!_localDb) {
    const Database = (await import('better-sqlite3')).default
    const path = (await import('path')).default
    const dbPath = path.join(process.cwd(), 'dev.db')
    const db = new Database(dbPath)
    db.pragma('journal_mode = WAL')
    db.pragma('foreign_keys = ON')
    _localDb = {
      async query<T>(sql: string, params: unknown[]): Promise<T[]> {
        return db.prepare(sql).all(...params) as T[]
      },
      async queryOne<T>(sql: string, params: unknown[]): Promise<T | null> {
        return (db.prepare(sql).get(...params) as T) ?? null
      },
      async run(sql: string, params: unknown[]) {
        return db.prepare(sql).run(...params)
      },
    }
  }
  return _localDb
}

let _neonDb: NeonDB | null = null

function getNeonDB(): NeonDB {
  if (!_neonDb) {
    _neonDb = new NeonDB(process.env.DATABASE_URL!)
  }
  return _neonDb
}

export const db = {
  async query<T = Record<string, unknown>>(sql: string, params: unknown[] = []): Promise<T[]> {
    if (process.env.DATABASE_URL) {
      return getNeonDB().query<T>(sql, params)
    }
    return (await getLocalDB()).query<T>(sql, params)
  },

  async queryOne<T = Record<string, unknown>>(sql: string, params: unknown[] = []): Promise<T | null> {
    if (process.env.DATABASE_URL) {
      return getNeonDB().queryOne<T>(sql, params)
    }
    return (await getLocalDB()).queryOne<T>(sql, params)
  },

  async run(sql: string, params: unknown[] = []): Promise<{ lastInsertRowid: number | bigint; changes: number }> {
    if (process.env.DATABASE_URL) {
      return getNeonDB().run(sql, params)
    }
    return (await getLocalDB()).run(sql, params)
  },
}

export function generateId(): string {
  return crypto.randomUUID()
}

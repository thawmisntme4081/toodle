import { Pool, QueryResult } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL as string,
})

export const query = async (
  text: string,
  params?: any[],
  type: keyof QueryResult = 'rows',
) => {
  const client = await pool.connect()
  try {
    const res = await client.query(text, params)

    return res[type]
  } finally {
    client.release()
  }
}

export const initAdmin = async () => {
  try {
    const res = await query('SELECT COUNT(*) FROM users')
    const [{ count }] = res as any[]

    if (+count > 0) return

    await query(
      `INSERT INTO users (lastName, email, password, roles) VALUES ($1, $2, $3, $4)`,
      ['Admin', process.env.ADMIN_EMAIL, 'admin', 'admin'],
    )
  } catch (error) {
    console.log(error)
  }
}

import { Pool, QueryResult } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL as string,
  max: 100,
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

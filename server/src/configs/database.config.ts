import { config } from 'dotenv'
import { Sequelize } from 'sequelize'

// To do, connect
config()

class Database {
  private static instance: Database | undefined
  public sequelize: Sequelize | undefined

  private constructor() {
    this.connect()
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  private async connect() {
    this.sequelize = new Sequelize({
      database: process.env.PGDATABASE as string,
      username: process.env.PGUSER as string,
      password: process.env.PGPASSWORD as string,
      host: process.env.PGHOST as string,
      port: 5305,
      dialect: 'postgres',
    })

    this.sequelize
      .authenticate()
      .then(() => {
        console.log('Connected')
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

const instanceConnect = Database.getInstance()

export default instanceConnect

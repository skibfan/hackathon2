import knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT} = process.env

export const db = knex({
    client: 'pg',
    connection: {
        host: PGHOST,
        port: PGPORT,
        user: PGUSER,
        database: PGDATABASE,
        password: PGPASSWORD,
        ssl: { rejectUnauthorized: false },
    }
})

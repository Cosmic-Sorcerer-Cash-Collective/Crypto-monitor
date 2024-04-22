import express from 'express'
import { CryptoDataPostgresql } from '../repository/CryptoDataPosqresql'
import { resolverGetCryptoSpecificData } from '../api/resolver'

const routesGetDataCrypto = express.Router()
const database = new CryptoDataPostgresql({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) ?? 5432,
  user: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'password',
  database: process.env.DB_DATABASE ?? 'crypto'
})

routesGetDataCrypto.get('/info/:pair', (req: express.Request, res: express.Response) => {
  const pair = req.params.pair

  resolverGetCryptoSpecificData(database, pair, '1h', 50)
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ error }))
})

export default routesGetDataCrypto

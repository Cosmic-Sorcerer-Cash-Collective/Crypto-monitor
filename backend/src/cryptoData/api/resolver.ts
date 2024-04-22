import { type CryptoData } from './domain'

export async function resolverGetCryptoSpecificData (db: CryptoData, pair: string, interval: string, limit: number): Promise<any> {
  return await db.getCryptoSpecificData(pair, interval, limit)
}

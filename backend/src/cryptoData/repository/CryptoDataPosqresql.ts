import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { type CryptoData, type CryptoDataResponse } from '../api/domain'
import { type dataBinance, type configDatabase } from '../../utils/types'
import { FavoritePairEntity } from '../../entities'
import { GetDataBinance } from '../../utils/GetDataBinance'
import { TechnicalIndicator } from '../../utils/TechnicalIndicator'

export class CryptoDataPostgresql implements CryptoData {
  private readonly client: DataSource
  private readonly binance: GetDataBinance
  private readonly technicalIndicator: TechnicalIndicator
  constructor (config: configDatabase) {
    this.client = new DataSource({
      type: 'postgres',
      host: config.host,
      port: config.port,
      username: config.user,
      password: config.password,
      database: config.database,
      entities: [FavoritePairEntity],
      synchronize: true
    })
    this.binance = new GetDataBinance()

    this.client.initialize().catch((error) => {
      console.error('Error connecting to the database', error)
    })
    this.technicalIndicator = new TechnicalIndicator()
  }

  async getCryptoSpecificData (pair: string = 'BTCUSDT', interval: string = '1h', limit: number = 50): Promise<CryptoDataResponse> {
    const data: dataBinance[] = await this.binance.getInfoPair(pair, interval, limit)
    const volume = data.reduce((acc: any, curr: dataBinance) => acc + parseFloat(curr.volume), 0)
    return {
      pair,
      volume,
      data: data[data.length - 1],
      technicalAnalysis: {
        sma: this.technicalIndicator.calculateSMA(data.slice(data.length - 26), 25),
        rsi: this.technicalIndicator.calculateRSI(data.slice(data.length - 15), 14),
        macd: this.technicalIndicator.calculateMACD(data.slice(data.length - 26)),
        fibonacci: {
          support: this.technicalIndicator.calculateFan(data.slice(data.length - 21)),
          resistance: this.technicalIndicator.calculateRetracement(data.slice(data.length - 21))
        }
      }
    }
  }

  async getCryptoListData (): Promise<CryptoDataResponse[]> {
    const pairs = await this.client.getRepository(FavoritePairEntity).find()
    return await Promise.all(pairs.map(async (pair) => {
      const data: dataBinance[] = await this.binance.getInfoPair(pair.pair, '1h', 50)
      const volume = data.reduce((acc: any, curr: dataBinance) => acc + parseFloat(curr.volume), 0)
      return {
        pair: pair.pair,
        volume,
        data: data[data.length - 1],
        technicalAnalysis: {
          sma: this.technicalIndicator.calculateSMA(data, 25),
          rsi: this.technicalIndicator.calculateRSI(data, 14),
          macd: this.technicalIndicator.calculateMACD(data),
          fibonacci: {
            support: this.technicalIndicator.calculateFan(data),
            resistance: this.technicalIndicator.calculateRetracement(data)
          }
        }
      }
    }))
  }
}

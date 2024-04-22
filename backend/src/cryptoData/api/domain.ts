import { type typeFibonacci, type dataBinance } from '../../utils/types'

export interface macdIndicator {
  macd: number
  signal: number
  histogram: number
}

export interface CryptoDataResponse {
  pair: string
  volume: number
  data: dataBinance
  technicalAnalysis: {
    sma: number
    rsi: number
    macd: macdIndicator
    fibonacci: {
      support: typeFibonacci
      resistance: typeFibonacci
    }
  }
}

export interface CryptoData {
  getCryptoSpecificData: (pair: string, interval: string, limit: number) => Promise<CryptoDataResponse>
  getCryptoListData: () => Promise<CryptoDataResponse[]>
}
